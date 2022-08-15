const express = require("express");
const { auth } = require("../Middleware/auth");
const mainRouter = express.Router();

const userRouter = require("./userRouter");
const dashboardRouter = require("./dashboardRouter");
// const expenseRouter = require("./expenseRouter");
const testRouter = require("./testRouter");
//new
const targetRouter = require("./targetRouter");
const incomeRouter = require("./incomeRouter");
const expenseRouter = require("./expenseRouter");
//
mainRouter.use("/user", userRouter);
mainRouter.use("/dashboard", auth, dashboardRouter);
//new without auth
mainRouter.use("/target", targetRouter);
mainRouter.use("/income", incomeRouter);
mainRouter.use("/expense", expenseRouter);

mainRouter.use("/test", testRouter);

module.exports = mainRouter;
