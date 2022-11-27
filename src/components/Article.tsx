import './Article.css'
import { marked } from 'marked'
import ReactDOM from 'react-dom/client';
import 'github-markdown-css/github-markdown-dark.css'

const CoverArticle = ({ markdown }: { markdown: string }) => {
  const tokens = marked.lexer(markdown);
  console.log(tokens);
  return (
    <div className="cover-root markdown-body" dangerouslySetInnerHTML={{
      __html: marked.parse(markdown)
    }}>
    </div >
  )
};

export const Cover: { root: null | ReactDOM.Root, [key: string]: any } = {
  _handleEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') Cover.close();
  },
  _handleOutsideClick(e: MouseEvent) {
    console.log(e)
    const isUnderCoverRoot = (node: HTMLElement | null): boolean => {
      if (node === null) return false;
      if (node.classList.contains('cover-root')) return true;
      return isUnderCoverRoot(node.parentElement);
    };
    if (!isUnderCoverRoot(e.target as HTMLElement)) Cover.close();
  },
  root: null,
  open(markdown: string) {
    if (!this.root) {
      const ele = document.createElement('div');
      ele.id = 'cover-container';
      document.body.append(ele);
      this.root = ReactDOM.createRoot(document.querySelector('#cover-container') as any);
    }
    this.root.render(<CoverArticle markdown={markdown} />);
    setTimeout(() => {
      document.addEventListener('click', this._handleOutsideClick);
      document.addEventListener('keyup', this._handleEscape);
    });
  },
  close() {
    this.root?.render(null);
    document.removeEventListener('click', this._handleOutsideClick);
    document.removeEventListener('keyup', this._handleEscape);
  }
}

