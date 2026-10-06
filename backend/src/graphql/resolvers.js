const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Account = require('../models/Account');
const Category = require('../models/Category');

const resolvers = {
  Query: {
    getDashboardSummary: async (_, args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      const userId = context.user.id;

      // Calculate totals from Mongo directly
      const transactions = await Transaction.find({ user: userId }).populate('category');
      const budgets = await Budget.find({ user: userId });

      let totalIn = 0;
      let totalOut = 0;
      
      const expenseMap = {};

      transactions.forEach(t => {
        if (t.type === 'in') totalIn += t.value;
        if (t.type === 'out') {
          totalOut += t.value;
          
          if (t.category) {
            const catName = (t.category.icon ? t.category.icon + ' ' : '') + t.category.name;
            if (!expenseMap[catName]) {
              expenseMap[catName] = 0;
            }
            expenseMap[catName] += t.value;
          }
        }
      });

      const balance = totalIn - totalOut;
      const totalBudget = budgets.reduce((acc, curr) => acc + curr.limit, 0);
      const availableBudget = totalBudget > 0 ? totalBudget - totalOut : 0;
      let progressPct = 0;
      if (totalBudget > 0) {
        progressPct = (totalOut / totalBudget) * 100;
        if (progressPct > 100) progressPct = 100;
      }
      
      const colors = ['#00C16E', '#005F73', '#1A202C', '#7EC8E3', '#F56565', '#ED8936', '#ECC94B', '#48BB78', '#38B2AC', '#4299E1', '#667EEA', '#9F7AEA', '#ED64A6'];
      
      let expensesByCategory = Object.keys(expenseMap).map((name, index) => ({
        name,
        value: expenseMap[name],
        color: colors[index % colors.length]
      })).sort((a, b) => b.value - a.value);

      return {
        totals: {
          totalIn,
          totalOut,
          balance,
          totalBudget,
          availableBudget,
          progressPct
        },
        expensesByCategory
      };
    }
  },
  Mutation: {
    createTransaction: async (_, args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      const userId = context.user.id;

      const { description, value, type, date, category, account, paymentMethod, tags } = args;

      if (!description || !value || !type || !date || !category) {
        throw new Error('Preencha os campos obrigatórios');
      }

      // Valida categoria
      const catExists = await Category.findOne({ _id: category, user: userId });
      if (!catExists) {
        throw new Error('Categoria inválida ou não pertence ao usuário');
      }

      // Valida conta (se fornecida)
      let acc;
      if (account) {
        acc = await Account.findOne({ _id: account, user: userId });
        if (!acc) {
          throw new Error('Conta inválida ou não pertence ao usuário');
        }
      }

      const transaction = await Transaction.create({
        description,
        value,
        type,
        date,
        category,
        account,
        paymentMethod,
        tags,
        user: userId
      });

      if (acc) {
        if (type === 'in') acc.balance += value;
        else acc.balance -= value;
        await acc.save();
      }

      return transaction;
    },

    updateTransaction: async (_, args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      const userId = context.user.id;

      const { id, description, value, type, date, category, account, paymentMethod, tags } = args;

      let transaction = await Transaction.findById(id);
      if (!transaction) {
        throw new Error('Transação não encontrada');
      }
      if (transaction.user.toString() !== userId) {
        throw new Error('Não autorizado');
      }

      // Revert old account balance if exists
      if (transaction.account) {
        const oldAcc = await Account.findById(transaction.account);
        if (oldAcc) {
          if (transaction.type === 'in') oldAcc.balance -= transaction.value;
          else oldAcc.balance += transaction.value;
          await oldAcc.save();
        }
      }

      // Update fields
      if (description !== undefined) transaction.description = description;
      if (value !== undefined) transaction.value = value;
      if (type !== undefined) transaction.type = type;
      if (date !== undefined) transaction.date = date;
      if (category !== undefined) {
        const catExists = await Category.findOne({ _id: category, user: userId });
        if (!catExists) throw new Error('Categoria inválida ou não pertence ao usuário');
        transaction.category = category;
      }
      if (account !== undefined) {
        if (account) {
          const accExists = await Account.findOne({ _id: account, user: userId });
          if (!accExists) throw new Error('Conta inválida ou não pertence ao usuário');
        }
        transaction.account = account;
      }
      if (paymentMethod !== undefined) transaction.paymentMethod = paymentMethod;
      if (tags !== undefined) transaction.tags = tags;

      await transaction.save();

      // Apply new account balance
      if (transaction.account) {
        const newAcc = await Account.findOne({ _id: transaction.account, user: userId });
        if (newAcc) {
          if (transaction.type === 'in') newAcc.balance += transaction.value;
          else newAcc.balance -= transaction.value;
          await newAcc.save();
        }
      }

      return transaction;
    },

    deleteTransaction: async (_, args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      const userId = context.user.id;
      const { id } = args;

      const transaction = await Transaction.findById(id);
      if (!transaction) {
        throw new Error('Transação não encontrada');
      }
      if (transaction.user.toString() !== userId) {
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

      await transaction.deleteOne();
      return id;
    }
  }
};

module.exports = resolvers;
