import React from 'react';
import { Search, Bell, Download, Plus } from 'lucide-react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './Header.css';

const Header = ({ title, subtitle, breadcrumb, primaryActionLabel = "Adicionar entrada", onPrimaryAction }) => {
  return (
    <header className="gf-header">
      <div className="gf-header-top">
        <div className="gf-header-left">
          {/* Seletor de Mês and Status would go here in a real app, keeping it simple as per mockup */}
        </div>
        <div className="gf-header-right">
          <div className="gf-header-search">
            <Search size={18} color="var(--color-text-muted)" className="search-icon" />
            <input type="text" placeholder="Buscar transações, tags..." className="search-input" />
          </div>
          <button className="gf-notification-btn">
            <Bell size={20} />
            <span className="gf-notification-dot"></span>
          </button>
          <div className="gf-header-avatar">
            <span className="gf-header-logo-icon">Grana</span>
          </div>
        </div>
      </div>
      
      <div className="gf-header-main">
        <div className="gf-header-title-area">
          {breadcrumb && <div className="gf-breadcrumb">{breadcrumb}</div>}
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="gf-header-actions">
          <Button variant="outline" className="export-btn" onClick={() => alert('Exportação em desenvolvimento.')}>
            <Download size={18} /> Exportar CSV
          </Button>
          <Button className="add-btn" onClick={onPrimaryAction}>
            <Plus size={18} /> {primaryActionLabel}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
