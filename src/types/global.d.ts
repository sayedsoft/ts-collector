interface IItemWithName {
  name: string;
}

interface IItemCollection<T> {
  getAll(): T[];
  get(name: string): T | undefined;
  add(item: T): void;
  remove(item: T): void;
  has(item: T): boolean;
  search(searchTerm: string): T[];
}
