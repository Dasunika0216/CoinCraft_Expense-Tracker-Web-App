import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema ({
    userId: {type:String, required:true},
    budgetId: {type:String, required:true},
    name: {type:String, required:true},
    icon: {type:String, required:true},
    amount: {type:Number, required:true},
    date: {type:Number, required:true}
}, {minimize: false})

const expenseModel = mongoose.models.expense || mongoose.model('expense', expenseSchema);

export default expenseModel;