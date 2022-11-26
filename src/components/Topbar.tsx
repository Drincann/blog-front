import React from 'react';
import './Topbar.css'

interface TopbarProps {
  onSelect?: (page: 'cards' | 'articles' | 'about') => void;
}
export const Topbar = ({ onSelect }: TopbarProps) => {
  return (
    <div className="topbar-root" >
      <span className='topbar-text' onClick={() => onSelect?.('cards')}> cards </span>
      <span className='topbar-text' onClick={() => onSelect?.('articles')}> articles </span>
      <span className='topbar-text' onClick={() => onSelect?.('about')}> about </span>
    </div>
  );
};