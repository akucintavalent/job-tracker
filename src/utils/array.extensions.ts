declare global {
  interface Array<T> {
    containsDuplicates(): boolean;
    equals(arrayTarget: T[]): boolean;
  }
}

if (!Array.prototype.containsDuplicates) {
  Array.prototype.containsDuplicates = function <T>(this: Array<T>) {
    const uniqueSet = new Set(this);
    return this.length !== uniqueSet.size;
  };
  Array.prototype.equals = function <T>(this: Array<T>, arrayTarget: Array<T>) {
    const set1 = new Set(this);
    const set2 = new Set(arrayTarget);
    return set1.size === set2.size && [...set1].every((x) => set2.has(x));
  };
}

export {};
