import { useEffect, useState } from "react";
import { Cover } from "./Article";
import './List.css'
import { ArticleDuck } from "../types/ducks";
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
    , [filter]);
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
      <div className="articles-item-title">{limit(data.title, 50)}</div>
      <p className="articles-item-content">{limit(data.content, 100)}</p>
      <div className="articles-item-time">
        <span className="articles-item-time-item" style={{ marginRight: '0.5rem' }}>{formatDate(data.updateAt)}</span>
        <span className="articles-item-time-item" style={{ marginRight: '0.5rem' }}>/</span>
        <span className="articles-item-time-item" >{formatDate(data.createAt)}</span>
      </div>

    </div>
  )
}