import { useEffect, useMemo, useState } from "react";
import { marked } from 'marked';
import { api } from "../common/api";

export const AboutPage = () => {
  const [markdown, setMarkdown] = useState('');
  useEffect(() => {
    api.call('getArticles', { type: 'about' }).then(
      json => {
        if (json?.code === 0) {
          const article = json.data?.[0];
          if (typeof article?.content === 'string') {
            setMarkdown(article.content);
          } else {
            setMarkdown('# Not Found');
          }
        }
      }
    )
  }, [])
  const html = useMemo(() => marked.parse(markdown), [markdown]);


  return (
    <div className="markdown-body" style={{
      padding: '1rem',
      width: '100%',
      minHeight: '100%',
      boxSizing: 'border-box',
    }} dangerouslySetInnerHTML={{
      __html: html
    }}>
    </div>
  );
};
