const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

const resolvers = {
  Query: {
    getDashboardSummary: async (_, args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      const userId = context.user.id;

      // Calculate totals from Mongo directly
      const transactions = await Transaction.find({ user: userId });
      const budgets = await Budget.find({ user: userId });

      let totalIn = 0;
      let totalOut = 0;

      transactions.forEach(t => {
        if (t.type === 'in') totalIn += t.value;
        if (t.type === 'out') totalOut += t.value;
      });

      const balance = totalIn - totalOut;
      const totalBudget = budgets.reduce((acc, curr) => acc + curr.limit, 0);
      const availableBudget = totalBudget > 0 ? totalBudget - totalOut : 0;
      let progressPct = 0;
      if (totalBudget > 0) {
        progressPct = (totalOut / totalBudget) * 100;
        if (progressPct > 100) progressPct = 100;
      }

      return {
        totals: {
          totalIn,
          totalOut,
          balance,
          totalBudget,
          availableBudget,
          progressPct
        }
      };
    }
  }
};

module.exports = resolvers;
