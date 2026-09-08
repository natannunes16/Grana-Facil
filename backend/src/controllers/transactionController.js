const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('category', 'name icon')
      .sort('-date');
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    const { description, value, type, date, category, account, paymentMethod } = req.body;
    
    if (!description || !value || !type || !date || !category) {
      res.status(400);
      throw new Error('Preencha os campos obrigatórios');
    }

    const transaction = await Transaction.create({
      description,
      value,
      type,
      date,
      category,
      account,
      paymentMethod,
      user: req.user.id
    });

    if (account) {
      const acc = await Account.findOne({ _id: account, user: req.user.id });
      if (acc) {
        if (type === 'in') acc.balance += value;
        else acc.balance -= value;
        await acc.save();
      }
    }

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      res.status(404);
      throw new Error('Transação não encontrada');
    }
    if (transaction.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Não autorizado');
    }

    if (transaction.account) {
      const acc = await Account.findById(transaction.account);
      if (acc) {
        if (transaction.type === 'in') acc.balance -= transaction.value;
        else acc.balance += transaction.value;
        await acc.save();
      }
    }

    await transaction.remove();
    res.json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTransactions, createTransaction, deleteTransaction };
