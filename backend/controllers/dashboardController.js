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

const deleteIncome = async (req, res) => {

}

const addBudget = async (req, res) => {

}

const deleteBudget = async (req, res) => {

}

const addExpense = async (req, res) => {

}

const deleteExpense = async (req, res) => {

}

export {addIncome, deleteIncome, addBudget, deleteBudget, addExpense, deleteExpense};