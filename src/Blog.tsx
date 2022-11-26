import React from 'react';
import './Blog.css';
import { Topbar } from './components/Topbar';
import { List } from './components/List';
import { AboutPage } from './components/AboutPage';

function Blog() {
  const [page, setPage] = React.useState<'cards' | 'articles' | 'about'>('articles');

  return (
    <div className="back">
      <div className="topbar">
        <Topbar onSelect={page => setPage(page)} />
      </div>

      <div className="main">
        <div className="filter"></div>
        <div className="view">
          {page === 'cards' && <List filter={{ type: 'card' }} />}
          {page === 'articles' && <List filter={{ type: 'normal' }} />}
          {page === 'about' && <AboutPage />}
        </div>
      </div>
    </div>
  );
}

export default Blog;
