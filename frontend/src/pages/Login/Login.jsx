import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import SignupPanel from './components/SignupPanel';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
        navigate('/overview');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao autenticar');
    }
  };

  return (
    <div className="gf-login-page">
      <div className="gf-login-wave-bg"></div>
      
      {isLogin ? (
        <Card className="gf-login-card">
          <div className="gf-login-header">
            <img src="/logo.png" alt="GranaFácil" className="gf-login-logo-img" />
            <h1>Bem-vindo ao GranaFácil</h1>
          </div>

          <form onSubmit={handleSubmit} className="gf-login-form">
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
                <a href="#" className="gf-forgot-password">Esqueci minha senha</a>
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
              Entrar &rarr;
            </Button>

            <div className="gf-login-toggle">
              Ainda não tem conta? 
              <button type="button" onClick={() => setIsLogin(false)} className="gf-login-toggle-btn">
                Crie agora
              </button>
            </div>
          </form>
        </Card>
      ) : (
        <div style={{zIndex: 1, position: 'relative'}}>
          <SignupPanel onToggleLogin={() => setIsLogin(true)} />
        </div>
      )}
    </div>
  );
};

export default Login;
