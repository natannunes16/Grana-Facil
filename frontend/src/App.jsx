import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinancialProvider } from './context/FinancialContext';
import Login from './pages/Login/Login';
import DashboardLayout from './components/Layout/DashboardLayout';
import Entradas from './pages/Entradas/Entradas';
import NovaMovimentacao from './pages/NovaMovimentacao/NovaMovimentacao';
import Categorias from './pages/Categorias/Categorias';
import Orcamento from './pages/Orcamento/Orcamento';
import Overview from './pages/Overview/Overview';
import Saidas from './pages/Saidas/Saidas';
import Relatorios from './pages/Relatorios/Relatorios';
import Configuracoes from './pages/Configuracoes/Configuracoes';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const savedUser = localStorage.getItem('gf_user');
  const user = savedUser ? JSON.parse(savedUser) : null;
  return {
    headers: {
      ...headers,
      authorization: user?.token ? `Bearer ${user.token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <FinancialProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              
              <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route path="/overview" element={<Overview />} />
                <Route path="/entradas" element={<Entradas />} />
                <Route path="/nova-movimentacao" element={<NovaMovimentacao />} />
                <Route path="/saidas" element={<Saidas />} />
                <Route path="/orcamento" element={<Orcamento />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FinancialProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
