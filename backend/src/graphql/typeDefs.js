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

  type DashboardSummary {
    totals: DashboardTotals!
  }

  type Query {
    getDashboardSummary: DashboardSummary
  }
`;

module.exports = typeDefs;
