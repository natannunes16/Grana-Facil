import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/overview');
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao autenticar');
    }
  };

  return (
    <div className="gf-login-page">
      <div className="gf-login-wave-bg"></div>
      <Card className="gf-login-card">
        <div className="gf-login-header">
          <img src="/logo.png" alt="GranaFácil" className="gf-login-logo-img" />
          <h1>{isLogin ? 'Bem-vindo ao GranaFácil' : 'Crie sua conta'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="gf-login-form">
          {!isLogin && (
            <Input 
              label="Nome completo" 
              type="text" 
              placeholder="Seu nome" 
              icon={User} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          )}
          <Input 
            label="E-mail" 
            type="email" 
            placeholder="exemplo@email.com" 
            icon={Mail} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          
          <div className="gf-password-wrapper">
            <div className="gf-password-header">
              <label className="gf-input-label">Senha</label>
              {isLogin && <a href="#" className="gf-forgot-password">Esqueci minha senha</a>}
            </div>
            <Input 
              type="password" 
              placeholder="••••••••" 
              icon={Lock} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <Button type="submit" className="gf-login-btn">
            {isLogin ? 'Entrar \u2192' : 'Cadastrar \u2192'}
          </Button>

          <div className="gf-login-toggle">
            {isLogin ? 'Ainda não tem conta? ' : 'Já tem uma conta? '}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="gf-login-toggle-btn">
              {isLogin ? 'Crie agora' : 'Entre'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
