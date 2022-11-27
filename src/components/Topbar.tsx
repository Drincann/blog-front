import React from 'react';
import './Topbar.css'

interface TopbarProps {
  onSelect?: (page: 'cards' | 'articles' | 'about') => void;
  init?: 'cards' | 'articles' | 'about';
}
export const Topbar = ({ onSelect, init }: TopbarProps) => {
  const [active, setActive] = React.useState<'cards' | 'articles' | 'about'>(init ?? 'articles');

  return (
    <div className="topbar-root" >
      {(['cards', 'articles', 'about'] as const)
        .map(itemStr =>
          <span
            className={'topbar-text' + (active === itemStr ? ' active' : '')}
            onClick={() => onSelect?.(itemStr) || setActive(itemStr)}>
            {itemStr}
          </span>
        )}
    </div>
  );
};