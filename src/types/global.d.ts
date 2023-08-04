declare module "collector" {
  export interface IItemWithName {
    name: string;
  }

  export interface IItemCollection<T> {
    getAll(): T[];
    get(name: string): T | undefined;
    add(item: T): void;
    remove(item: T): void;
    has(item: T): boolean;
    search(searchTerm: string): T[];
  }

  export class ItemCollection<T extends IItemWithName>
    implements IItemCollection<T> {
    private items: T[];

    constructor();

    getAll(): T[];
    get(name: string): T | undefined;
    add(item: T): void;
    remove(item: T): void;
    has(item: T): boolean;
    search(searchTerm: string): T[];
  }
}

export {};
