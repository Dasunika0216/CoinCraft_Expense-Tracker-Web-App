import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema ({
    userId: {type:String, required:true},
    source: {type:String, required:true},
    icon: {type:String, required:true},
    amount: {type:Number, required:true},
    date: {type:Date, required:true}
}, {minimize: false})

const incomeModel = mongoose.models.income || mongoose.model('income', incomeSchema);

export default incomeModel;