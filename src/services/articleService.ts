import axios from 'axios';
import type {
  Article,
  ArticlesHttpResponse,
} from '../components/types/Article';

interface fetchArticlesProps {
  topic: string;
}

export async function fetchArticles({
  topic,
}: fetchArticlesProps): Promise<Article[]> {
  const response = await axios.get<ArticlesHttpResponse>(
    `https://hn.algolia.com/api/v1/search?query=${topic}`,
  );
  return response.data.hits;
}
