import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import './NewCategoryModal.css';

const EMOJI_OPTIONS = ['🏠', '🛒', '🎓', '🚗', '🎮', '💡', '💰', '🏥', '✈️', '🐶', '🍔', '📱'];

const NewCategoryModal = ({ isOpen, onClose }) => {
  const { addCategory } = useFinancial();
  const [name, setName] = useState('');
  const [type, setType] = useState('Ambos');
  const [icon, setIcon] = useState('🏠');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory({
      name: name.trim(),
      type: 'Ambos',
      icon,
      moves: 0,
      value: 'R$ 0,00'
    });

    // Reset and close
    setName('');
    setType('Ambos');
    setIcon('🏠');
    onClose();
  };

  return (
    <div className="gf-modal-overlay">
      <div className="gf-modal-content">
        <div className="gf-modal-header">
          <h2>Nova Categoria</h2>
          <button className="gf-modal-close" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="gf-modal-form">
          <Input 
            label="Nome da categoria" 
            placeholder="Ex: Assinaturas"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="gf-form-group">
            <label className="gf-input-label">Ícone</label>
            <div className="gf-emoji-picker">
              {EMOJI_OPTIONS.map(e => (
                <button 
                  key={e} 
                  type="button" 
                  className={`gf-emoji-btn ${icon === e ? 'selected' : ''}`}
                  onClick={() => setIcon(e)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="gf-modal-footer">
            <Button variant="outline" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Salvar categoria</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategoryModal;
