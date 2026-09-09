const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type DashboardTotals {
    totalIn: Float!
    totalOut: Float!
    balance: Float!
    totalBudget: Float!
    availableBudget: Float!
    progressPct: Float!
  }

  type ExpenseCategory {
    name: String!
    value: Float!
    color: String!
  }

  type DashboardSummary {
    totals: DashboardTotals!
    expensesByCategory: [ExpenseCategory!]!
  }

  type Query {
    getDashboardSummary: DashboardSummary
  }
`;

module.exports = typeDefs;
