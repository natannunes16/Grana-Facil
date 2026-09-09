const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

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
  }
};

module.exports = resolvers;
