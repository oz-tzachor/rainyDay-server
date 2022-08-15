const telegramUserLogic = require("../../BL/telegramUserLogic");
const targetLogic = require("../../BL/targetLogic");
const incomeLogic = require("../../BL/incomeLogic");
const expenseLogic = require("../../BL/expenseLogic");
const sendMessage = require("./bot");
const {
  loginMessage,
  greetingMessage,
  inputEmailMessage,
  inputPassword,
  repeatPassword,
  signedUpSuuccessfully,
  emailExist,
  resetEmail,
  retypeEmail,
  followTheInstructions,
  mainMessage,
  targetNameMessage,
  targetGoalMessage,
  followTheInstructionsNumbers,
  showAllTargets,
  chooseTarget,
  addIncomeAmount,
  addIncomeDescription,
  addIncomeCompleted,
  addExpenseAmount,
  addExpenseDescription,
  addExpenseCompleted,
  noTargetsYet,
  newTargetCompleted,
  showLastActivities,
} = require("./messagesTemplates");
const { get } = require("mongoose");
///
let currentChatId;
let currentMessage;
let localSendMessage;
let currentUser;

const newMessage = (chatId, message, sendFunc) => {
  currentChatId = chatId;
  currentMessage = message;
  localSendMessage = sendFunc;
  checkUser();
};
const changeTelegramState = async (state) => {
  return await telegramUserLogic.changeTelegramState(currentChatId, state);
};
const getTargets = async () => {
  return await targetLogic.getAllTargets({ createdBy: currentUser._id });
};
const getLastActs = async (target) => {
  console.log("klast acts");
  let incomes = await incomeLogic.getIncomes(target);
  let expenses = await expenseLogic.getExpenses(target);
  for (
    let index = 0;
    index <
    (incomes.length > expenses.length ? incomes.length : expenses.length);
    index++
  ) {
    if (incomes[index]) {
      incomes[index].type = "income";
    }
    if (expenses[index]) {
      expenses[index].type = "expense";
    }
  }
  let combinedArray = [...incomes, ...expenses];
  combinedArray.sort((a, b) => {
    console.log("type", a.type, b.type);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return combinedArray.reverse();
};
const checkUser = async () => {
  currentUser = await telegramUserLogic.getTelegramUser({
    chatId: currentChatId,
  });
  if (currentMessage.toLowerCase() === "reset") {
    changeTelegramState("initial");
    telegramUserLogic.updateUserDetails(currentChatId, {
      authenticated: false,
      email: "",
    });
    localSendMessage(currentChatId, "reset");
    return;
  }
  if (currentMessage.toLowerCase() === "setup") {
    localSendMessage(currentChatId, mainMessage());
    changeTelegramState("main_userChoise");
    return;
  }
  if (!currentUser || !currentUser.authenticated) {
    if (!currentUser) {
      localSendMessage(currentChatId, loginMessage());
      let newTelegramUser = await telegramUserLogic.newTelegramUser({
        chatId: currentChatId,
      });
    } else {
      loginFlow(currentUser.state);
    }
  } else {
    if (currentUser.state === "initial") {
      loginFlow(currentUser.state);
    } else {
      mainFlow(currentUser.state);
    }
  }
};

let loginFlow = async (state) => {
  console.log("login flow state", state);
  switch (state) {
    case "initial":
      if (currentMessage === "1") {
        localSendMessage(currentChatId, inputEmailMessage());
        changeTelegramState("login_sendMail");
        break;
      }
      localSendMessage(currentChatId, loginMessage());
      break;
    case "login_sendMail":
      let user = await telegramUserLogic.getTelegramUser({
        email: currentMessage,
      });
      console.log("user", user, currentMessage);
      if (user) {
        localSendMessage(currentChatId, emailExist());
        changeTelegramState("login_emailExist");
        return;
      }

      user = await telegramUserLogic.updateUserDetails(currentChatId, {
        email: currentMessage,
        authenticated: true,
      });
      localSendMessage(currentChatId, signedUpSuuccessfully());
      changeTelegramState("main_userChoise");
      setTimeout(() => {
        localSendMessage(currentChatId, mainMessage());
      }, 2000);

      break;
    case "login_emailExist":
      if (currentMessage === "1") {
        //
        localSendMessage(currentChatId, retypeEmail());
        changeTelegramState("login_sendMail");
      } else if (currentMessage === "2") {
        //timer for the 5 minutes valid
        localSendMessage(currentChatId, resetEmail(currentUser.email));
        //send mail with 4 digit verification
        changeTelegramState("login_resetMail");
        //
      } else {
        localSendMessage(currentChatId, followTheInstructions());
        setTimeout(() => {
          localSendMessage(currentChatId, emailExist());
        }, 2000);
      }
      break;
    default:
      break;
  }
};

let mainFlow = async (state) => {
  let res;
  let selectedTarget;
  switch (state) {
    case "main_initial":
      localSendMessage(currentChatId, mainMessage());
      changeTelegramState("main_userChoise");

      break;
    case "main_userChoise":
      switch (currentMessage) {
        case "1":
          res = await getTargets();
          if (res.length > 0) {
            localSendMessage(currentChatId, showAllTargets(res));
            setTimeout(() => {
              localSendMessage(currentChatId, mainMessage());
              changeTelegramState("main_userChoise");
            }, 2000);
          } else {
            localSendMessage(currentChatId, noTargetsYet());
            setTimeout(() => {
              localSendMessage(currentChatId, mainMessage());
            }, 2000);
            changeTelegramState("main_userChoise");
          }
          break;
        case "2":
          res = await getTargets();
          localSendMessage(currentChatId, chooseTarget(res, "plus"));
          changeTelegramState("main_chooseTargetIncome");
          break;
        case "3":
          res = await getTargets();
          localSendMessage(currentChatId, chooseTarget(res, "minus"));
          changeTelegramState("main_chooseTargetExpense");
          break;
        case "4":
          res = await getTargets();
          localSendMessage(currentChatId, chooseTarget(res, "last"));
          changeTelegramState("main_lastActivities");
          break;
        case "5":
          localSendMessage(currentChatId, targetNameMessage());
          changeTelegramState("main_targetName");
          break;

        default:
          localSendMessage(currentChatId, followTheInstructions());
          setTimeout(() => {
            localSendMessage(currentChatId, mainMessage());
          }, 1000);
          break;
      }
      break;
    //define new traget
    case "main_targetName":
      telegramUserLogic.saveTempData(currentChatId, "targetDetails", {
        name: currentMessage,
      });
      localSendMessage(currentChatId, targetGoalMessage(currentMessage));
      changeTelegramState("main_targetGoal");
      break;
    case "main_targetGoal":
      if (!isNaN(currentMessage)) {
        parseInt(currentMessage);
        let newTarget = await targetLogic.createNewTarget({
          name: currentUser.targetDetails.name,
          goal: currentMessage,
          createdBy: currentUser._id,
        });
        if (newTarget) {
          localSendMessage(
            currentChatId,
            newTargetCompleted(currentUser.targetDetails.name, currentMessage)
          );
          setTimeout(() => {
            localSendMessage(currentChatId, mainMessage());
          }, 2000);
          changeTelegramState("main_userChoise");
        }
      } else {
        localSendMessage(currentChatId, followTheInstructionsNumbers());
      }
      //
      break;
    //create new income
    case "main_chooseTargetIncome":
      if (!isNaN(currentMessage)) {
        parseInt(currentMessage);
        res = await getTargets();

        console.log(currentMessage - 1, res.length - 1);
        if (currentMessage - 1 > res.length - 1) {
          localSendMessage(currentChatId, followTheInstructions());
          setTimeout(() => {
            localSendMessage(currentChatId, chooseTarget(res, "plus"));
          }, 2000);
          break;
        }
        telegramUserLogic.saveTempData(currentChatId, "incomeDetails", {
          target: res[currentMessage - 1]._id,
        });
        localSendMessage(
          currentChatId,
          addIncomeAmount(res[currentMessage - 1].name)
        );
        changeTelegramState("main_chooseIncomeAmount");
      } else {
        localSendMessage(currentChatId, followTheInstructionsNumbers());
      }
      break;
    case "main_chooseIncomeAmount":
      res = await getTargets();
      selectedTarget = res.find((elem) => {
        return (
          elem._id.toString() == currentUser.incomeDetails.target.toString()
        );
      });
      if (!isNaN(currentMessage)) {
        await telegramUserLogic.saveTempData(currentChatId, "incomeDetails", {
          amount: currentMessage,
        });
        localSendMessage(
          currentChatId,
          addIncomeDescription(selectedTarget.name, currentMessage)
        );
        changeTelegramState("main_chooseIncomeDescription");
      } else {
        localSendMessage(currentChatId, followTheInstructionsNumbers());
        setTimeout(() => {
          localSendMessage(currentChatId, addIncomeAmount(selectedTarget.name));
        }, 2000);
      }
      break;

    case "main_chooseIncomeDescription":
      res = await getTargets();
      selectedTarget = res.find((elem) => {
        return (
          elem._id.toString() == currentUser.incomeDetails.target.toString()
        );
      });
      await incomeLogic.createNewIncome({
        amount: currentUser.incomeDetails.amount,
        target: currentUser.incomeDetails.target,
        createdBy: currentUser._id,
        description: currentMessage === "לא" ? null : currentMessage,
      });
      console.log("selected", selectedTarget.amount, selectedTarget.goal);
      localSendMessage(
        currentChatId,
        addIncomeCompleted(
          selectedTarget.name,
          currentUser.incomeDetails.amount,
          ((selectedTarget.amount + currentUser.incomeDetails.amount) /
            selectedTarget.goal) *
            100
        )
      );
      setTimeout(() => {
        localSendMessage(currentChatId, mainMessage());
        changeTelegramState("main_userChoise");
      }, 2000);

      break;
    ///

    //create new expense
    case "main_chooseTargetExpense":
      if (!isNaN(currentMessage)) {
        parseInt(currentMessage);
        res = await getTargets();
        console.log(currentMessage - 1, res.length - 1);
        if (currentMessage - 1 > res.length - 1) {
          localSendMessage(currentChatId, followTheInstructions());
          setTimeout(() => {
            localSendMessage(currentChatId, chooseTarget(res, "minus"));
          }, 2000);
          break;
        }
        telegramUserLogic.saveTempData(currentChatId, "expenseDetails", {
          target: res[currentMessage - 1]._id,
        });
        localSendMessage(
          currentChatId,
          addExpenseAmount(res[currentMessage - 1].name)
        );
        changeTelegramState("main_chooseExpenseAmount");
      } else {
        localSendMessage(currentChatId, followTheInstructionsNumbers());
      }
      break;
    case "main_chooseExpenseAmount":
      res = await getTargets();
      selectedTarget = res.find((elem) => {
        return (
          elem._id.toString() == currentUser.expenseDetails.target.toString()
        );
      });
      if (!isNaN(currentMessage)) {
        await telegramUserLogic.saveTempData(currentChatId, "expenseDetails", {
          amount: currentMessage,
        });
        localSendMessage(
          currentChatId,
          addExpenseDescription(selectedTarget.name, currentMessage)
        );
        changeTelegramState("main_chooseExpenseDescription");
      } else {
        localSendMessage(currentChatId, followTheInstructionsNumbers());
        setTimeout(() => {
          localSendMessage(
            currentChatId,
            addExpenseAmount(selectedTarget.name)
          );
        }, 2000);
      }
      break;

    case "main_chooseExpenseDescription":
      res = await getTargets();
      selectedTarget = res.find((elem) => {
        return (
          elem._id.toString() == currentUser.expenseDetails.target.toString()
        );
      });
      await expenseLogic.createNewExpense({
        amount: currentUser.expenseDetails.amount,
        target: currentUser.expenseDetails.target,
        createdBy: currentUser._id,
        description: currentMessage === "לא" ? null : currentMessage,
      });
      localSendMessage(
        currentChatId,
        addExpenseCompleted(
          selectedTarget.name,
          currentUser.expenseDetails.amount
        )
      );
      setTimeout(() => {
        localSendMessage(currentChatId, mainMessage());
        changeTelegramState("main_userChoise");
      }, 2000);

      break;
    ///
    case "main_lastActivities":
      if (!isNaN(currentMessage)) {
        parseInt(currentMessage);
        res = await getTargets();
        console.log(currentMessage - 1, res.length - 1);
        if (currentMessage - 1 > res.length - 1) {
          localSendMessage(currentChatId, followTheInstructions());
          setTimeout(() => {
            localSendMessage(currentChatId, chooseTarget(res, "last"));
          }, 2000);
          break;
        }
        selectedTarget = res[currentMessage - 1]._id;
        let lastActs = await getLastActs(selectedTarget);

        localSendMessage(
          currentChatId,
          showLastActivities(
            res[currentMessage - 1].name,
            lastActs,
            currentUser.email
          )
        );
        setTimeout(() => {
          localSendMessage(currentChatId, mainMessage());
          changeTelegramState("main_userChoise");
        }, 3500);
      } else {
        localSendMessage(currentChatId, followTheInstructionsNumbers());
        setTimeout(() => {
          localSendMessage(currentChatId, chooseTarget(res, "last"));
        }, 2000);
      }

      // localSendMessage(
      //   currentChatId,
      //   showLastActivities("test", array, currentUser.email)
      // );

      break;
    case "general":
      break;
    default:
      break;
  }
};

module.exports = { newMessage, checkUser };
