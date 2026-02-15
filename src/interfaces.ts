export interface IPaginator<T> {
  items: T[];
  limit: number;
  offset: number;
  total: number;
}

