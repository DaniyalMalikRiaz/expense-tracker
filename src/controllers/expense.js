const Expense = require('../models/expense')

exports.createExpense = async(req,res) =>{
const {title,amount,category,date} = req.body;
try {
const expense = new Expense({
    title,
    amount,
    category,
    date
})
await expense.save();
res.status(200).json({
    message: 'Expense Created'
})
} catch (error) {
res.status(500).json({ error: error.message });

}
}

exports.getAll = async(req,res)=>{
try {
const expense = await Expense.find();
    res.status(200).json({
    details: expense
})
} catch (error) {
res.status(500).json({ error: error.message });

}
}


exports.get = async(req,res)=>{
const {title,amount,category,date} = req.body;
let filter = {};
try {

    if(category) filter.category = { $regex: category, $options: 'i' };

    const expenses = await Expense.find(filter);
    const expenseTotal = expenses.reduce((sum, exp) => sum + parseInt(exp.amount), 0);
    const expenseCount = await Expense.countDocuments(filter);

        res.status(200).json({
        Count: expenseCount,
        TotalExpense: expenseTotal,
        details: expenses
    })
} catch (error) {
    res.status(500).json({ error: error.message });

}
}

exports.updateExpense = async(req,res)=>{
    const {title,amount,category,date} = req.body;

try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.body.id,{
        title,
        amount,
        category,
        date
    },
    { new: true, runValidators: true }
)

    if (!updatedExpense) return res.status(404).json({ error: 'Expense not found' });
    res.json(updatedExpense);
} catch (error) {
    res.status(500).json({ error: "Error updating expense" });

}
}


exports.deleteExpense = async(req,res)=>{

    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.body.id)
    
        if (!deletedExpense) return res.status(404).json({ error: 'Expense not found' });
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: "Expense Deleted"});
    
    }
    }