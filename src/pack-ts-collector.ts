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

  constructor() {
    this.items = [];
  }

  getAll(): T[] {
    return this.items;
  }

  get(name: string): T | undefined {
    return this.items.find((item) => item.name === name);
  }

  add(item: T): void {
    if (!this.has(item)) {
      this.items.push(item);
    }
  }

  remove(item: T): void {
    const index = this.items.findIndex((existingItem) =>
      existingItem.name === item.name
    );
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  has(item: T): boolean {
    return this.items.some((existingItem) => existingItem.name === item.name);
  }

  search(searchTerm: string): T[] {
    return this.items.filter((item) => item.name.includes(searchTerm));
  }
}

export { IItemCollection, IItemWithName, ItemCollection };
