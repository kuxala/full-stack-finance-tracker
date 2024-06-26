const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const income = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });
  try {
    if (!title || !category   || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({
        message: "Amount must be positive number",
      });
    }
    await income.save();
    res.status(200).json({ message: "Expense added" });
  } catch (error) {
    console.log(error);
  }
  
};

exports.getExpenses = async (req,res) =>{
    try{
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    }catch (error){
        console.log(error)
    }
}

exports.deleteExpense = async (req,res) =>{
    const {id} = req.params
    try {
        ExpenseSchema.findByIdAndDelete(id).then((income) => {
            res.status(200).json({message: "Expense deleted"})
        })
    }catch (error){
        res.status(error)
    }
}