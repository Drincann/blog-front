import { useEffect, useState } from "react";
import { Cover } from "./Article";
import './List.css'
import { ArticleDuck } from "./types";
interface ListProps {
  filter?: {
    labels?: string[];
    type?: 'card' | 'normal' | 'about';
  };
}

export const List = ({ filter }: ListProps) => {
  const [articles, setArticles] = useState<ArticleDuck[]>([]);
  useEffect(
    () => {
      fetch("/api/v1/getArticles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
      })
        .then((res) => res.json())
        .then((json) => setArticles(json.data));
    }
    , []);
  return (
    <div className="articles-root">
      {articles.map((article) => <Item key={article._id} data={article} onClick={() => Cover.open(article.content)} />)}
    </div>
  )
};

const formatDate = (stamp: string) => {
  const date = new Date(stamp);
  return typeof stamp !== 'string' ? '' : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const limit = (str: string, len: number) => {
  return str?.length > len ? str.slice(0, len) + '...' : str;
}

const Item = ({ data, onClick }: { data: ArticleDuck, onClick: () => void }) => {
  return (
    <div className="articles-item" onClick={onClick}>
      <div style={{ color: '#fff', fontSize: '1.5rem' }}>{limit(data.title, 50)}</div>
      <span style={{ float: 'right', color: '#666' }}>{formatDate(data.updateAt)}</span>
      <p style={{ color: '#999', fontStyle: 'italic', padding: '0 0.5rem', fontSize: '0.5rem' }}>{limit(data.content, 100)}</p>
    </div>
  )
}