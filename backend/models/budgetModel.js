import mongoose from 'mongoose'

const budgetSchema = new mongoose.Schema ({
    userId: {type:String, required:true},
    name: {type:String, required:true},
    allocatedAmount: {type:Number, required:true}
}, {minimize: false})

const budgeteModel = mongoose.models.budget || mongoose.model('budget', budgetSchema);

export default budgeteModel;