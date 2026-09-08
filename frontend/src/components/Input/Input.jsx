import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './Input.css';

const Input = ({ label, icon: Icon, type = 'text', rightIcon, onRightIconClick, className = '', ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordType = type === 'password';
  const inputType = isPasswordType && isPasswordVisible ? 'text' : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={`gf-input-container ${className}`}>
      {label && <label className="gf-input-label">{label}</label>}
      <div className="gf-input-wrapper">
        {Icon && <Icon className="gf-input-icon left" size={20} color="var(--color-text-muted)" />}
        <input 
          className={`gf-input ${Icon ? 'with-left-icon' : ''} ${(rightIcon || isPasswordType) ? 'with-right-icon' : ''}`} 
          type={inputType} 
          {...props} 
        />
        {isPasswordType && (
          <button type="button" className="gf-input-icon-btn right" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <EyeOff size={20} color="var(--color-text-muted)" /> : <Eye size={20} color="var(--color-text-muted)" />}
          </button>
        )}
        {!isPasswordType && rightIcon && (
          <button type="button" className="gf-input-icon-btn right" onClick={onRightIconClick}>
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
