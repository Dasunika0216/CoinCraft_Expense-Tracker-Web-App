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

        res.json({success: true, messege: "Income added successfully"});
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
        res.json({success: true, messege: "Selected income is removed successfully"});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const addBudget = async (req, res) => {

}

const listBudget = async (res, req) => {

}

const deleteBudget = async (req, res) => {

}

const addExpense = async (req, res) => {

}

const listExpense = async (res, req) => {

}

const deleteExpense = async (req, res) => {

}

export {addIncome, listIncome, deleteIncome, addBudget, deleteBudget, addExpense, deleteExpense, listExpense, listBudget};