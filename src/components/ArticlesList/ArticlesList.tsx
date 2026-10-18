import type { Article } from '../types/Article';

interface ArticlesListProps {
  articles: Article[];
}
export default function ArticlesList({ articles }: ArticlesListProps) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.objectID}>
          <a href={article.url} target="blank">
            {article.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
