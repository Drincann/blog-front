import { useEffect, useMemo, useRef, useState } from "react";
import { Cover } from "./Article";
import './List.css'
import { ArticleDuck } from "../types/ducks";
import { api } from "../common/api";

interface ListProps {
  filter?: {
    labels?: string[];
    type?: 'card' | 'normal' | 'about';
  };
}

export const List = ({ filter }: ListProps) => {
  const { current: articlesContentCache } = useRef<{ [_id: string]: string }>({});
  const [articles, setArticles] = useState<ArticleDuck[]>([]);
  useEffect(
    () => {
      api.call('getArticles', { ...filter, addBrief: true, pick: ['_id', 'title', 'createAt', 'updateAt',] }).then(res => setArticles(res.data));
    }, [filter]);
  return (
    <div className="articles-root">
      {articles.map((article) => <Item key={article._id} data={article} onClick={() => {
        if (articlesContentCache[article._id]) {
          Cover.open(articlesContentCache[article._id])
        } else {
          api.call('getArticles', { _id: article._id, pick: ['content'] }).then(res => {
            const article = res.data?.[0];
            if (article) {
              Cover.open(article?.content);
            } else {
              Cover.open('# Not Found');
            }
          })
        }
      }
      } />)}
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
      <p className="articles-item-content">{limit(data.brief, 99)
      /**
       * 列表默认请求 content 摘要, 后端会返回长度为 100 的 brief,
       * limit 的行为在超过给定长度时会截断并在末尾添加 '...', 所以这
       * 里若填写 100 则一定不会显示 '...', 若填写 99 则保证省略号的
       * 出现时机是一定正确的。
       */}</p>
      <div className="articles-item-time">
        <span className="articles-item-time-item" style={{ marginRight: '0.5rem' }}>{formatDate(data.updateAt)}</span>
        <span className="articles-item-time-item" style={{ marginRight: '0.5rem' }}>/</span>
        <span className="articles-item-time-item" >{formatDate(data.createAt)}</span>
      </div>

    </div>
  )
}