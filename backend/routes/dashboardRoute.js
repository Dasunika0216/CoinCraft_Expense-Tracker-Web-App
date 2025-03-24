import express from 'express';
import authUser from '../middleware/auth.js';
import {addIncome, listIncome, deleteIncome, addBudget, deleteBudget, addExpense, deleteExpense, listBudget, listExpense} from '../controllers/dashboardController.js';

const dashboardRouter = express.Router();

dashboardRouter.post('/add-income', authUser, addIncome);
dashboardRouter.post('/list-income', authUser, listIncome);
dashboardRouter.post('/delete-income', authUser, deleteIncome);
dashboardRouter.post('/add-budget', authUser, addBudget);
dashboardRouter.post('/list-budget', authUser, listBudget);
dashboardRouter.post('/delete-budget', authUser, deleteBudget);
dashboardRouter.post('/add-expense', authUser, addExpense);
dashboardRouter.post('/list-expense', authUser, listExpense);
dashboardRouter.post('/delete-expense', authUser, deleteExpense);   

export default dashboardRouter;