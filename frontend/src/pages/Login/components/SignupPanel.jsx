import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/Card/Card';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { User, Mail, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import './SignupPanel.css';

const SignupPanel = ({ onToggleLogin }) => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    try {
      await register(name, email, password);
      navigate('/overview');
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao criar conta');
    }
  };

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

        <form className="gf-signup-form" onSubmit={handleRegister}>
          <Input 
            label="Nome completo" 
            placeholder="Mariana Duarte" 
            icon={User} 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input 
            label="E-mail corporativo ou pessoal" 
            placeholder="mariana.duarte@granafacil.com.br" 
            type="email"
            icon={Mail} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <div className="gf-password-field">
            <Input 
              label="Criar senha segura" 
              placeholder="••••••••••••" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <label className="gf-checkbox-label">
            <input type="checkbox" defaultChecked required />
            <span className="checkmark"><Check size={14} color="white" /></span>
            <span className="text">Concordo com os Termos de Uso e a Política de Privacidade do GranaFácil.</span>
          </label>

          <Button type="submit" className="w-100">Criar minha conta &rarr;</Button>
          
          <div className="gf-login-link">
            Já possui uma conta? <button type="button" onClick={onToggleLogin} style={{background:'none', border:'none', color:'var(--color-primary)', fontWeight:'600', cursor:'pointer'}}>Entrar</button>
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
