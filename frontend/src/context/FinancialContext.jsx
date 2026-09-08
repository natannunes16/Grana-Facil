import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const { user, api } = useAuth();
  
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const formatCurrency = (val) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      const [txRes, catRes, budRes] = await Promise.all([
        api.get('/transacoes'),
        api.get('/categorias'),
        api.get('/orcamentos')
      ]);
      setTransactions(txRes.data.map(t => ({
        id: t._id,
        name: t.description,
        date: t.date,
        cat: t.category?.name || 'Geral',
        val: t.value,
        type: t.type,
        method: t.paymentMethod
      })));
      setCategories(catRes.data.map(c => ({
        id: c._id,
        name: c.name,
        type: c.type,
        icon: c.icon,
        moves: 0, // Should calculate
        value: 0
      })));
      setBudgets(budRes.data.map(b => ({
        id: b._id,
        category: b.category?.name,
        limit: b.limit,
        period: b.period
      })));
    } catch (err) {
      console.error(err);
    }
  }, [user, api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTransaction = async (newTx) => {
    try {
      if (!newTx.val || Number(newTx.val) <= 0) {
        alert("O valor da movimentação deve ser maior que zero.");
        return;
      }
      
      const categoryObj = categories.find(c => c.name === newTx.cat);
      if (!categoryObj) return alert("Categoria inválida");

      await api.post('/transacoes', {
        description: newTx.name,
        value: Number(newTx.val),
        type: newTx.type,
        date: newTx.date,
        category: categoryObj.id,
        paymentMethod: newTx.method
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transacoes/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const addCategory = async (newCat) => {
    try {
      await api.post('/categorias', newCat);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (catName) => {
    try {
      const cat = categories.find(c => c.name === catName);
      if (cat) {
        await api.delete(`/categorias/${cat.id}`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateBudgetLimit = async (categoryName, newLimit) => {
    try {
      const cat = categories.find(c => c.name === categoryName);
      if (!cat) return;
      const budget = budgets.find(b => b.category === categoryName);
      if (budget) {
        // Since we don't have PUT on budget in this simplified frontend context, ideally we'd PUT /orcamentos/:id
      } else {
        await api.post('/orcamentos', {
          limit: newLimit,
          period: '2026-09',
          category: cat.id
        });
      }
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Keep derived state to not break current UI
  const totals = useMemo(() => {
    const totalIn = transactions.filter(t => t.type === 'in').reduce((acc, curr) => acc + curr.val, 0);
    const totalOut = transactions.filter(t => t.type === 'out').reduce((acc, curr) => acc + curr.val, 0);
    const balance = totalIn - totalOut;
    
    const totalBudget = budgets.reduce((acc, val) => acc + val.limit, 0);
    const availableBudget = totalBudget - totalOut;
    const progressPct = totalBudget > 0 ? (totalOut / totalBudget) * 100 : 0;

    return { totalIn, totalOut, balance, totalBudget, availableBudget, progressPct };
  }, [transactions, budgets]);

  const expensesByCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'out');
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.cat] = (acc[curr.cat] || 0) + curr.val;
      return acc;
    }, {});
    
    return Object.keys(grouped).map(key => {
      const budget = budgets.find(b => b.category === key);
      const limit = budget ? budget.limit : 0;
      const value = grouped[key];
      return {
        name: key,
        value,
        limit,
        pct: limit > 0 ? (value / limit) * 100 : 0
      };
    }).sort((a, b) => b.value - a.value);
  }, [transactions, budgets]);

  const contextValue = {
    transactions,
    totals,
    expensesByCategory,
    categories,
    budgetLimits: budgets, // Simplified mapping to prevent breaking old UI
    addTransaction,
    deleteTransaction,
    addCategory,
    deleteCategory,
    updateBudgetLimit,
    formatCurrency
  };

  return (
    <FinancialContext.Provider value={contextValue}>
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => {
  return useContext(FinancialContext);
};
