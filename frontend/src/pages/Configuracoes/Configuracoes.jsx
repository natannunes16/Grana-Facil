import React, { useState } from 'react';
import Header from '../../components/Layout/Header';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { User, Lock, Landmark, Shield, CheckCircle, Smartphone, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Configuracoes.css';

const Configuracoes = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('perfil');

  return (
    <div className="gf-config-page">
      <Header 
        breadcrumb="PREFERÊNCIAS DA CONTA"
        title="Configurações" 
        subtitle="Gerencie seus dados pessoais, segurança e integrações bancárias."
      />

      <div className="gf-config-content">
        <div className="gf-config-sidebar">
          <button 
            className={`gf-config-tab ${activeTab === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveTab('perfil')}
          >
            <User size={18} /> Dados do Perfil
          </button>
          <button 
            className={`gf-config-tab ${activeTab === 'seguranca' ? 'active' : ''}`}
            onClick={() => setActiveTab('seguranca')}
          >
            <Lock size={18} /> Senha e Segurança
          </button>
          <button 
            className={`gf-config-tab ${activeTab === 'conexoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('conexoes')}
          >
            <Landmark size={18} /> Conexões Bancárias
          </button>
        </div>

        <div className="gf-config-main">
          {activeTab === 'perfil' && (
            <Card className="gf-config-card">
              <h3 className="gf-config-section-title">Informações Pessoais</h3>
              <p className="gf-config-section-subtitle">Atualize os dados básicos da sua conta no GranaFácil.</p>
              
              <form className="gf-config-form" onSubmit={(e) => { e.preventDefault(); alert('Perfil atualizado com sucesso!'); }}>
                <Input 
                  label="NOME COMPLETO" 
                  defaultValue={user?.name || 'Usuário'}
                  required
                />
                <Input 
                  label="E-MAIL DE ACESSO" 
                  defaultValue={user?.email || 'email@exemplo.com'}
                  type="email"
                  disabled
                />
                
                <div className="gf-config-actions">
                  <Button variant="primary" type="submit">Salvar alterações</Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'seguranca' && (
            <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>
              <Card className="gf-config-card">
                <h3 className="gf-config-section-title">Alterar Senha</h3>
                <p className="gf-config-section-subtitle">Mantenha sua conta segura trocando a senha regularmente.</p>
                
                <form className="gf-config-form" onSubmit={(e) => { e.preventDefault(); alert('Senha alterada com sucesso!'); }}>
                  <Input 
                    label="SENHA ATUAL" 
                    type="password"
                    required
                  />
                  <div className="gf-config-row">
                    <Input 
                      label="NOVA SENHA" 
                      type="password"
                      required
                    />
                    <Input 
                      label="CONFIRMAR NOVA SENHA" 
                      type="password"
                      required
                    />
                  </div>
                  
                  <div className="gf-config-actions">
                    <Button variant="primary" type="submit">Atualizar senha</Button>
                  </div>
                </form>
              </Card>

              <Card className="gf-config-card">
                <h3 className="gf-config-section-title">Central de Segurança</h3>
                <p className="gf-config-section-subtitle">Opções avançadas de proteção da sua carteira.</p>
                
                <div className="gf-security-list">
                  <div className="gf-security-item">
                    <div className="gf-security-item-info">
                      <div className="gf-security-item-icon"><Smartphone size={20} color="var(--color-primary)"/></div>
                      <div className="gf-security-item-text">
                        <strong>Autenticação em Duas Etapas (2FA)</strong>
                        <p>Aumente a segurança exigindo um código no seu celular ao fazer login.</p>
                      </div>
                    </div>
                    <Button variant="outline">Ativar</Button>
                  </div>
                  <div className="gf-security-item">
                    <div className="gf-security-item-info">
                      <div className="gf-security-item-icon"><Key size={20} color="var(--color-text-main)"/></div>
                      <div className="gf-security-item-text">
                        <strong>Dispositivos Conectados</strong>
                        <p>Você tem 2 dispositivos logados na sua conta atualmente.</p>
                      </div>
                    </div>
                    <Button variant="outline">Gerenciar</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'conexoes' && (
            <Card className="gf-config-card">
              <h3 className="gf-config-section-title">Integração Open Finance</h3>
              <p className="gf-config-section-subtitle">Sincronize automaticamente suas entradas e saídas diretamente das suas contas bancárias através da tecnologia Open Finance (Seguro e Criptografado).</p>
              
              <div className="gf-bank-list">
                <div className="gf-bank-card">
                  <div className="gf-bank-info">
                    <div className="gf-bank-icon nubank">N</div>
                    <div className="gf-bank-details">
                      <strong>Nubank</strong>
                      <span>Conta Corrente e Cartão de Crédito</span>
                    </div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
                    <div className="gf-bank-status connected">
                      <CheckCircle size={14}/> Sincronizado
                    </div>
                    <Button variant="outline" style={{color:'var(--color-text-muted)', border:'none'}}>Desconectar</Button>
                  </div>
                </div>

                <div className="gf-bank-card">
                  <div className="gf-bank-info">
                    <div className="gf-bank-icon itau">I</div>
                    <div className="gf-bank-details">
                      <strong>Itaú</strong>
                      <span>Não conectado</span>
                    </div>
                  </div>
                  <Button variant="primary">Conectar Conta</Button>
                </div>

                <div className="gf-bank-card">
                  <div className="gf-bank-info">
                    <div className="gf-bank-icon inter">IN</div>
                    <div className="gf-bank-details">
                      <strong>Banco Inter</strong>
                      <span>Não conectado</span>
                    </div>
                  </div>
                  <Button variant="primary">Conectar Conta</Button>
                </div>
              </div>
              
              <div style={{marginTop: '24px', padding: '16px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '8px', display: 'flex', gap: '16px', alignItems: 'center'}}>
                <Shield size={24} color="var(--color-success)"/>
                <p style={{fontSize: '0.85rem', color: 'var(--color-text-light)', margin: 0}}>
                  O GranaFácil usa protocolo padrão do Banco Central. Nós só temos <strong>acesso de leitura</strong> às suas transações, sendo impossível realizar transferências ou movimentar seu dinheiro.
                </p>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
