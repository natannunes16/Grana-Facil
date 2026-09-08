import React from 'react';
import Card from '../../../components/Card/Card';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { User, Mail, ShieldCheck, Check } from 'lucide-react';
import './SignupPanel.css';

const SignupPanel = () => {
  return (
    <div className="gf-signup-panel-area">
      <Card className="gf-signup-card">
        <div className="gf-signup-header">
          <div className="gf-signup-title">
            <div className="icon">
              <User size={20} color="white" />
            </div>
            <div>
              <span className="subtitle">VISUALIZAÇÃO DE FLUXO</span>
              <h2>Crie sua conta</h2>
            </div>
          </div>
          <div className="gf-step-badge">
            Passo<br/>1/2
          </div>
        </div>
        
        <p className="gf-signup-desc">
          Inicie sua jornada no GranaFácil e consolide todas as contas em um só painel intuitivo.
        </p>

        <form className="gf-signup-form">
          <Input 
            label="Nome completo" 
            placeholder="Mariana Duarte" 
            icon={User} 
          />
          <Input 
            label="E-mail corporativo ou pessoal" 
            placeholder="mariana.duarte@granafacil.com.br" 
            type="email"
            icon={Mail} 
          />
          
          <div className="gf-password-field">
            <Input 
              label="Criar senha segura" 
              placeholder="••••••••••••" 
              type="password"
            />
            <div className="password-strength">
              <div className="bars">
                <div className="bar green"></div>
                <div className="bar green"></div>
                <div className="bar green"></div>
                <div className="bar"></div>
              </div>
              <span className="strength-text">Forte</span>
            </div>
          </div>

          <Input 
            label="Confirmar senha" 
            placeholder="••••••••••••" 
            type="password"
          />

          <label className="gf-checkbox-label">
            <input type="checkbox" defaultChecked />
            <span className="checkmark"><Check size={14} color="white" /></span>
            <span className="text">Concordo com os Termos de Uso e a Política de Privacidade do GranaFácil.</span>
          </label>

          <Button className="w-100">Criar minha conta &rarr;</Button>
          
          <div className="gf-login-link">
            Já possui uma conta? <a href="#">Entrar</a>
          </div>
        </form>
      </Card>

      <Card className="gf-privacy-card">
        <div className="gf-privacy-header">
          <ShieldCheck size={20} color="var(--color-primary)" />
          <strong>Privacidade & Segurança Bancária</strong>
        </div>
        <p>Criptografia de ponta a ponta com certificados bancários TLS 1.3 e conformidade rigorosa com a LGPD.</p>
        <div className="gf-privacy-badges">
          <span><Check size={14} color="var(--color-text-main)"/> Sem spam</span>
          <span><Check size={14} color="var(--color-text-main)"/> Backup contínuo</span>
        </div>
      </Card>
    </div>
  );
};

export default SignupPanel;
