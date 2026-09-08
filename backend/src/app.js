const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

// Routes will be added here
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/contas', accountRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/transacoes', transactionRoutes);
app.use('/api/orcamentos', budgetRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.use(errorHandler);

module.exports = app;
