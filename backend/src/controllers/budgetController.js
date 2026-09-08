const Budget = require('../models/Budget');

const getBudgets = async (req, res, next) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }).populate('category', 'name icon');
    res.json(budgets);
  } catch (error) {
    next(error);
  }
};

const createBudget = async (req, res, next) => {
  try {
    const { limit, period, category } = req.body;
    if (!limit || !period || !category) {
      res.status(400);
      throw new Error('Preencha os campos obrigatórios');
    }

    const budget = await Budget.create({
      limit,
      period,
      category,
      user: req.user.id
    });
    res.status(201).json(budget);
  } catch (error) {
    next(error);
  }
};

const deleteBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      res.status(404);
      throw new Error('Orçamento não encontrado');
    }
    if (budget.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Não autorizado');
    }
    await budget.remove();
    res.json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBudgets, createBudget, deleteBudget };
