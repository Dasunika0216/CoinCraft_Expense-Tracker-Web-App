import express from 'express';
import authUser from '../middleware/auth.js';
import {addIncome, deleteIncome, addBudget, deleteBudget, addExpense, deleteExpense} from '../controllers/dashboardController.js';

const dashboardRouter = express.Router();

dashboardRouter.post('/add-income', authUser, addIncome);
dashboardRouter.post('/delete-income', authUser, deleteIncome);
dashboardRouter.post('/add-budget', authUser, addBudget);
dashboardRouter.post('/delete-budget', authUser, deleteBudget);
dashboardRouter.post('/add-expense', authUser, addExpense);
dashboardRouter.post('/delete-expense', authUser, deleteExpense);   

export default dashboardRouter;