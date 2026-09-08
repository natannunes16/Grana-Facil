const Account = require('../models/Account');

const getAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    res.json(accounts);
  } catch (error) {
    next(error);
  }
};

const createAccount = async (req, res, next) => {
  try {
    const { name, type, balance } = req.body;
    if (!name) {
      res.status(400);
      throw new Error('O nome da conta é obrigatório');
    }

    const account = await Account.create({
      name,
      type,
      balance: balance || 0,
      user: req.user.id
    });
    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      res.status(404);
      throw new Error('Conta não encontrada');
    }
    if (account.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Não autorizado');
    }
    await account.remove();
    res.json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAccounts, createAccount, deleteAccount };
