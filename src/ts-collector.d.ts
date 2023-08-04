declare module "ts-collector" {
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

  class ItemCollection<T extends IItemWithName> implements IItemCollection<T> {
    private items: T[];

    constructor();

    getAll(): T[];
    get(name: string): T | undefined;
    add(item: T): void;
    remove(item: T): void;
    has(item: T): boolean;
    search(searchTerm: string): T[];
  }

  export { IItemCollection, IItemWithName, ItemCollection };
}

export {};
