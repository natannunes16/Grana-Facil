import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, Wallet, Tags, BarChart2, Settings, PlusCircle, LogOut } from 'lucide-react';
import Button from '../Button/Button';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };
  const menuItems = [
    { path: '/overview', name: 'Overview', icon: LayoutDashboard },
    { path: '/entradas', name: 'Entradas', icon: ArrowDownCircle },
    { path: '/saidas', name: 'Saídas', icon: ArrowUpCircle },
    { path: '/orcamento', name: 'Orçamento', icon: Wallet },
    { path: '/categorias', name: 'Categorias', icon: Tags },
    { path: '/relatorios', name: 'Relatórios', icon: BarChart2 },
    { path: '/configuracoes', name: 'Configurações', icon: Settings },
  ];

  return (
    <>
      <aside className="gf-sidebar">
      <div className="gf-sidebar-logo">
        <span className="gf-sidebar-logo-icon">📊</span>
        <div className="gf-sidebar-logo-text">
          <span className="title">GranaFácil</span>
          <span className="subtitle">FINTECH</span>
        </div>
      </div>

      <nav className="gf-sidebar-nav">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => `gf-sidebar-link ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} className="gf-sidebar-link-icon" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="gf-sidebar-footer">
        <NavLink to="/nova-movimentacao" className="gf-sidebar-new-btn gf-button gf-button--primary">
          <PlusCircle size={18} /> Nova movimentação
        </NavLink>

        <div className="gf-sidebar-profile">
          <div className="gf-profile-avatar">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'NN'}</div>
          <div className="gf-profile-info">
            <span className="gf-profile-name">{user?.name || 'Carregando...'}</span>
            <span className="gf-profile-plan">Plano Pessoal</span>
          </div>
          <button className="gf-logout-btn" title="Sair" onClick={handleLogout}>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>

      {showLogoutModal && (
        <div className="gf-logout-overlay">
          <div className="gf-logout-modal">
            <h3>Você tem certeza disso?</h3>
            <div className="gf-logout-actions">
              <button onClick={confirmLogout} className="gf-btn-sim">Sim</button>
              <button onClick={cancelLogout} className="gf-btn-nao">Não</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
