const Category = require('../models/Category');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, type, icon } = req.body;
    if (!name) {
      res.status(400);
      throw new Error('Nome é obrigatório');
    }

    const category = await Category.create({
      name,
      type,
      icon,
      user: req.user.id
    });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error('Categoria não encontrada');
    }
    if (category.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Não autorizado');
    }
    await category.deleteOne();
    res.json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { name, type, icon } = req.body;
    
    let category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error('Categoria não encontrada');
    }
    if (category.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Não autorizado');
    }

    category.name = name || category.name;
    category.type = type || category.type;
    category.icon = icon !== undefined ? icon : category.icon;

    await category.save();
    res.json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, createCategory, deleteCategory, updateCategory };
