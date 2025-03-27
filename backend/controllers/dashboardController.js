import incomeModel from '../models/incomeModel.js';
import budgetModel from '../models/budgetModel.js';
import expenseModel from '../models/expenseModel.js';
import userModel from '../models/userModel.js';

const addIncome = async (req, res) => {
    try {
        const {userId, icon, source, amount, date} = req.body;

        const incomeDetails = {
            userId,
            icon,
            source,
            amount,
            date
        }

        const newIncome = new incomeModel(incomeDetails);
        await newIncome.save();

        res.json({success: true, message: "Income added successfully"});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, messege: error.message});
    }
}

const listIncome = async (req, res) => {
    try {
        const {userId} = req.body;

        const incomes = await incomeModel.find({userId}).sort({ date: 1 });
        res.json({success: true, data: incomes});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

const deleteIncome = async (req, res) => {
    const {id} = req.body;

    try {
        await incomeModel.findByIdAndDelete(id);
        res.json({success: true, message: "Selected income is removed successfully"});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const addBudget = async (req, res) => {
    try {
        const {userId, icon, name, allocatedAmount } = req.body;

        const budgetDetails = {
            userId,
            icon, 
            name, 
            allocatedAmount
        }

        const newBudget = new budgetModel(budgetDetails);
        await newBudget.save();

        res.json({success: true, message: "Budget added successfully"});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const listBudget = async (req, res) => {
    try {
        const {userId} = req.body;

        const budgets = await budgetModel.find({userId});
        res.json({success: true, data: budgets});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const updateBudget = async (req, res) => {
    const {budgetId, icon, name, allocatedAmount} = req.body;

    try {
        await budgetModel.findByIdAndUpdate(budgetId, {icon, name, allocatedAmount});
        res.json({success: true, message: "Budget updated successfully"});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const deleteBudget = async (req, res) => {
    const {budgetId} = req.body;

    try {
        await budgetModel.findByIdAndDelete(budgetId);
        res.json({success: true, messege: "Budget deleted successfully"});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const addExpense = async (req, res) => {
    try {
        const {userId, budgetId, name, amount, date} = req.body;

        const expenseDetails = {
            userId,
            budgetId,
            name,
            amount,
            date
        }

        const newExpense = new expenseModel(expenseDetails);
        await newExpense.save();

        // Update budget's item count and spent amount
        await budgetModel.findByIdAndUpdate(budgetId, {
            $inc: {
                itemCount: 1,
                spentAmount: amount
            }
        });

        res.json({success: true, message: "Expense added successfully"});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const listExpense = async (req, res) => {
    try {
        const {userId, budgetId} = req.body;

        const expenses = await expenseModel.find({userId, budgetId});
        res.json({success: true, data: expenses});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const deleteExpense = async (req, res) => {
    const {expenseId} = req.body;

    try {
        await expenseModel.findByIdAndDelete(expenseId);
        res.json({success: true, message: "Expense deleted successfully"});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export {addIncome, listIncome, deleteIncome, addBudget, deleteBudget, addExpense, deleteExpense, listExpense, listBudget, updateBudget};