import React, { useEffect } from 'react';
import './Blog.css';
import { Topbar } from './components/Topbar';
import { List } from './components/List';
import { AboutPage } from './components/AboutPage';
import { useQuerys } from './hooks/useQuerys';

function Blog() {
  const [querys, setQuerys] = useQuerys<{ page?: string }>();
  const [page, setPage] = React.useState<'cards' | 'articles' | 'about'>(typeof querys.page === 'string' ? querys.page as any : 'cards');

  useEffect(() => setQuerys({ page: page ?? 'articles' }), [page]);
  useEffect(() => setPage(querys?.page ?? 'articles' as any), [querys.page]);

  return (
    <div className="back">
      <div className="topbar">
        <Topbar onSelect={page => setQuerys({ page })} init={page} />
      </div>

      <div className="main">
        {page !== 'about' && <div className="filter"></div>}
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
