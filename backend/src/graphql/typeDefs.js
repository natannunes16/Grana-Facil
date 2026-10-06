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

  type Transaction {
    id: ID!
    description: String!
    value: Float!
    type: String!
    date: String!
    category: ID!
    account: ID
    user: ID!
    paymentMethod: String
    tags: String
  }

  type Query {
    getDashboardSummary: DashboardSummary
  }

  type Mutation {
    createTransaction(description: String!, value: Float!, type: String!, date: String!, category: ID!, account: ID, paymentMethod: String, tags: String): Transaction!
    updateTransaction(id: ID!, description: String, value: Float, type: String, date: String, category: ID, account: ID, paymentMethod: String, tags: String): Transaction!
    deleteTransaction(id: ID!): ID!
  }
`;

module.exports = typeDefs;
