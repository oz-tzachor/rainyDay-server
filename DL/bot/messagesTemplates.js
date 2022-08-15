const { model } = require("mongoose");
const { dealWithMessage } = require("./bot");
const { emojis } = require("./emojis");
let oneLine = "\n";
let twoLine = "\n\n";
let threeLine = "\n\n\n";

//General

exports.followTheInstructions = () => {
  const message = `שלחת מספר שאינו נכלל באופציות ששלחנו כאן למעלה ${twoLine}תשתדל להקפיד על ההוקראות ${emojis.fix}`;
  return message;
};
exports.followTheInstructionsNumbers = () => {
  const message = `בבקשה לשלוח מספרים בלבד ${emojis.numbers}`;
  return message;
};

//login process
exports.loginMessage = () => {
  const message = `היי, נראה שעוד לא התחברת למערכת שלנו ${emojis.sad}${twoLine}אם ברצונך להתחבר - אנא שלח 1 `;
  return message;
};
exports.inputEmailMessage = () => {
  const message = `מעולה! ${emojis.smiley}${twoLine}אנחנו נשמח מאד שתצטרף אלינו! ככה נוכל לעזור לך לנהל כמו שצריךאת החסכון ליום גשום!${twoLine}
  להמשך התהליך אנא שלח את כתובת המייל שלך ${emojis.email}`;
  return message;
};

exports.emailExist = () => {
  const message = `אוי יש לנו בעיה ${emojis.warning}${twoLine}משתמש אחר כבר נרשם עם המייל הזה.${twoLine}מה אפשר לעשות?${oneLine}1.שליחה של מייל אחר${oneLine}2.עדכון של המייל הזה לחשבון הטלגרם הזה שאנחנו מתכתבים בו עכשיו`;
  return message;
};
exports.retypeEmail = () => {
  const message = `אוקיי,בוא ננסה שוב ${emojis.restart}${twoLine}בבקשה שלח לנו את כתובת המייל החדשה שאיתה תרצה להירשם ${emojis.email}`;
  return message;
};
exports.resetEmail = (email) => {
  const message = `יאללה בוא נעדכן את המייל שלך לחשבון הטלגרם הזה!${twoLine}שלחנו אל המייל הזה:${oneLine}${email}${twoLine} קוד בן 4 ספרות שישמש לאיפוס החשבון והגדרת המייל הזה בתור מייל ברירת המחדל${threeLine}הקוד בתוקף ל-5 דקות בלבד!${twoLine}אז מה הקוד שקיבלת?`;
  return message;
};

exports.signedUpSuuccessfully = () => {
  const message = `מצוין! נרשמת למערכת שלנו! כן, זה עד כדי כך פשוט! ${emojis.coolGuy}`;
  return message;
};

//Main proccess
exports.mainMessage = (user) => {
  const message = `מה ברצונך לעשות? ${emojis.hugs}${twoLine}1.קבלת תמונת מצב של החסכונות שלי ${emojis.dashboard}${twoLine}2.הפקדה לאחד מהיעדים ${emojis.plus}${twoLine}3.משיכה מאחד מהיעדים ${emojis.minus}${twoLine}4.תנועות אחרונות ביעדים שלי ${emojis.money}${twoLine}5.הוספת יעד חדש ${emojis.target}`;
  return message;
};
exports.targetNameMessage = () => {
  let message = `יאללה יוצרים יעד! ${emojis.target}${twoLine}הדבר הראשון שאנחנו צריכים בשביל יעד זה את השם שלו.${twoLine}אז איך היית קורא ליעד שלך?`;
  return message;
};
exports.targetGoalMessage = (targetName) => {
  const message = `השם שבחרת ליעד שלך הוא:${targetName}${twoLine}הדבר השני שצריך כדי ליצור יעד הוא לבחור את הסכום שאליו אנחנו שואפים ${emojis.money}${threeLine}שלח לי את סכום היעד שאליו אתה שואף ונתקדם ${emojis.plus}${twoLine}בבקשה לשלוח רק מספרים- ככה זה עובד ${emojis.claps}`;
  return message;
};
exports.newTargetCompleted = (targetName, targetGoal) => {
  const message = `ישש! ${emojis.smiley}${twoLine}היעד נוצר בהצלחה ${emojis.target} ${emojis.confirm}${threeLine}שם: ${targetName} ${emojis.saved}${twoLine}יעד: ${targetGoal}${emojis.creditCard}${threeLine}בהצלחה ${emojis.prayingHands}`;
  return message;
};

///get targets
exports.showAllTargets = (targets) => {
  let message = `הנה היעדים שלך :${twoLine}`;
  let totalAmount = 0;
  let totalGoal = 0;
  targets.map((target, index) => {
    let { name, amount, goal } = target;
    totalAmount += amount;
    totalGoal += goal;
    message += `${index + 1}.${name} ${
      emojis.redFlag
    }${twoLine}סכום שנחסך: ${amount}₪ ${emojis.money}${oneLine}יעד: ${goal}₪ ${
      emojis.target
    }${oneLine}אחוזי השלמה של היעד: ${Math.ceil((amount / goal) * 100)}% ${
      emojis.sandClock
    }${twoLine}\n`;
  });
  message += `חסכת סך הכל ${totalAmount}₪${oneLine}שזה כבר ${Math.ceil(
    (totalAmount / totalGoal) * 100
  )}% מסך כל היעדים שהצבת!${twoLine}כל הכבוד! ${emojis.claps} ${emojis.crown}`;
  return message;
};
exports.chooseTarget = (targets, type) => {
  let message =
    type === "plus"
      ? `לאיזה מהיעדים תרצה להפקיד? ${emojis.plus}${twoLine}`
      : `מאיזה מהיעדים תרצה למשוך? ${emojis.minus}${twoLine}`;
  if (type === "last") {
    message = `בחר יעד כדי לראות את התנועות האחרונות בו ${emojis.dashboard}${twoLine}`;
  }
  targets.map((target, index) => {
    let { name, amount, goal } = target;
    message += `${index + 1}.${name} ${
      emojis.redFlag
    }${twoLine}סכום שנחסך: ${amount}₪ ${emojis.money}${oneLine}יעד: ${goal}₪ ${
      emojis.target
    }${oneLine}אחוזי השלמה של היעד: ${Math.ceil((amount / goal) * 100)}% ${
      emojis.sandClock
    }${twoLine}`;
  });
  return message;
};
exports.noTargetsYet = () => {
  let message = `אוי, נראה שעוד לא יצרת יעד ${emojis.sad}${twoLine}אבל לא נורא! תוכל לעשות את זה בקלות בתפריט הראשי באופציה מספר : 5 ${emojis.coolGuy}`;
  return message;
};
///

//Add new income
exports.addIncomeAmount = (targetName) => {
  const message = `בחרת להפקיד ליעד: ${targetName}${twoLine}מה הסכום שברצונך להוסיף? ${emojis.money}(מספרים בלבד ${emojis.numbers})`;
  return message;
};
exports.addIncomeDescription = (targetName, incomeAmount) => {
  const message = `מעולה! בחרת להוסיף ליעד ${targetName} סכום של : ${incomeAmount}₪${twoLine}עכשיו אפשר להוסיף טקסט להפקדה הזו כדי שתמיד נזכור במה מדובר!${twoLine}מה התיאור שתרצה לכתוב להפקדה זו?${threeLine}אם אתה לא רוצה לשמור שום תיאור אנא שלח :"לא"`;
  return message;
};
exports.addIncomeCompleted = (targetName, incomeAmount, targetProgress) => {
  console.log("targetProgress", targetProgress);
  const message = `אליפות! ${
    emojis.claps
  }${twoLine}הפקדת ${incomeAmount}₪ ליעד: ${targetName}! ${
    emojis.coolGuy
  }${twoLine}חסכת כבר ${Math.ceil(targetProgress)}% מהיעד הזה! ${emojis.fix}${
    emojis.confirm
  }`;
  return message;
};

//add new expense
exports.addExpenseAmount = (targetName) => {
  const message = `בחרת למשוך מהיעד: ${targetName}${twoLine}מה הסכום שברצונך למשוך? ${emojis.money}(מספרים בלבד ${emojis.numbers})`;
  return message;
};
exports.addExpenseDescription = (targetName, expenseAmount) => {
  const message = `אוקיי! בחרת למשוך מהיעד: ${targetName} סכום של : ${expenseAmount}₪${twoLine}עכשיו צריך להוסיף טקסט למשיכה הזו הזו כדי שתמיד נזכור במה מדובר ונוכל לעקוב אחרי החסכונות שלנו ${emojis.saved}!${twoLine}מה התיאור שתרצה לכתוב למשיכה זו?`;
  return message;
};
exports.addExpenseCompleted = (targetName, expenseAmount) => {
  const message = `סיימנו! ${emojis.confirm}${twoLine}משכת ${expenseAmount}₪ מהיעד: ${targetName}! ${emojis.minus}${emojis.money}`;
  return message;
};

//last activities

exports.showLastActivities = (targetName, activities, user) => {
  let message;
  if (!activities.length > 0) {
    return (message = `עוד אין תנועות ביעד: ${targetName} ${emojis.hugs}${twoLine}אז קדימה! זה הזמן להתחיל לחסוך! ${emojis.password} ${emojis.money}`);
  }
  message = `הנה התנועות האחרונות של היעד :${targetName}${twoLine}`;
  let totalIncomes = 0;
  let totalExpenses = 0;
  activities.map((activity) => {
    let { type, amount, createdAt, description } = activity;
    if (type === "income") {
      message += `הפקדה ${emojis.greenCircle} ${emojis.plus}${twoLine}`;
      totalIncomes += amount;
    } else {
      message += `משיכה ${emojis.orangeCircle} ${emojis.minus}${twoLine}`;
      totalExpenses += amount;
    }
    message += `סכום: ${amount}₪ ${emojis.money}${oneLine}${
      description ? `תיאור: ${description}${oneLine}` : ``
    }תאריך:${new Date(createdAt).toLocaleDateString(
      "en-GB"
    )}${oneLine}שעה: ${new Date(createdAt).toLocaleTimeString(
      "en-GB"
    )}${oneLine}על ידי: ${user}${threeLine}`;
  });
  message += `סך כל ההפקדות :${totalIncomes}₪${oneLine}סך כל המשיכות: ${totalExpenses}₪${oneLine}מצב הקופה כרגע: ${
    totalIncomes - totalExpenses
  }₪ ${emojis.money}${twoLine}אתה בדרך הנכונה! ${emojis.claps}`;
  return message;
};
// ₪