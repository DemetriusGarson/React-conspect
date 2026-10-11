export interface Article {
  objectID: string;
  title: string;
  url: string;
}

export interface ArticlesHttpResponse {
  hits: Article[];
}
