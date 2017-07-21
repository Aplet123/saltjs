declare namespace saltjs {

  type FindIsh<K, V, T, R> = {
    (test: (val: V, key: K, storage: T) => boolean): R;
    (test: string, value: any, caseSensitive?: boolean, strict?: boolean): R;
  }

  export function ExportEvent <T extends Function> (event: string, handler: T): {
    type: "event",
    name: string,
    value: T
  };

  export function ExportVariable <T> (name: string, value: T): {
    type: "variable",
    name: string,
    value: T
  };

  export function Flatten(depth?: number): any[];

  export function LoadEvents <T extends EventEmitter> (array: string[], emitter: T, thisArg: any): void;

  export function LoadVariables <T> (array: string[], store: T): T;

  export class Storage<K, V> extends Map<K, V> {
    constructor(iterable?: Iterable<[K, V]>);

    static fromObject<T extends { [key: string]: any }, k extends keyof T>(obj: T): Storage<keyof T, T[k]>;

    public valuesArray(): V[];
    public keysArray(): K[];
    public keyArray(): K[];
    public array(): [K, V][];

    public find: FindIsh<K, V, this, V>;
    public findLast: typeof Storage.prototype.find;

    public findKey: FindIsh<K, V, this, K>;
    public findKeyLast: typeof Storage.prototype.findKey;

    public findAll: FindIsh<K, V, this, V[]>;
    public findKeyAll: FindIsh<K, V, this, K[]>;

    public findStorage: FindIsh<K, V, this, Storage<V, K>>;
    public findStorageLast: typeof Storage.prototype.findStorage;

    public findStorageAll: FindIsh<K, V, this, Storage<V, K>[]>;

    public concat <k, v>(...iterables: Iterable<[k, v]>[]): Storage<K | k, V | v>;
    public concatOverwrite: typeof Storage.prototype.concat;

    public first(): V;
    public firstKey(): K;

    public last(): V;
    public lastKey(): K;

    public nth(n?: number): V;
    public nthKey(n?: number): K;
    public nthRight(n?: number): V;
    public nthKeyRight(n?: number): K;

    public random(): V;
    public randomKey(): K;
    public randomStorage(): Storage<K, V>;

    public exists: FindIsh<K, V, this, boolean>;

    public reverse(): Storage<K, V>;

    public equals(storage: Storage<K, V>, order?: boolean, strict?: boolean): boolean;

    public every: typeof Storage.prototype.exists;

    public some: typeof Storage.prototype.exists;

    public fill <T>(value: T): Storage<K, T>;
    public fill <T>(value: T, start: number, end: number): Storage<K, V | T>;

    public map <T>(callback: ((val: V, key: K, storage: this) => T)): Storage<K, T>;
    public map <TResult>(path: string): Storage<K, TResult>;

    // public forEach(callback: ((val: V, key: K, storage: this) => any)): void;
    public forEach: typeof Storage.prototype.map;

    public includes(value: V, fromIndex?: number, caseSensitive?: boolean, strict?: boolean): boolean;

    public keyOf(value: V, caseSensitive?: boolean, strict?: boolean): K;
    public keyOfLast: typeof Storage.prototype.keyOf;

    public pop(): V;
    public unshift(): V;

    public filter: FindIsh<K, V, this, Storage<K, V>>;

    public reduce(callback: (accumulator: V, key: K, val: V, storage: this) => V, initialValue?: V): V;
    public reduce <T>(callback: (accumulator: T, key: K, val: V, storage: this) => T, initialValue: T): T;
    public reduceRight: typeof Storage.prototype.reduce;

    public slice(begin?: number, end?: number): Storage<K, V>;

    public sort(func: (previous: V, next: V) => boolean): Storage<K, V>;

    public splice(start?: number, delcount?: number, ...items: V[]): Storage<K, V>;

    public join(char?: string): string;

    public chunk(num?: number): Storage<K, V>[];

    public compact(): Storage<K, V>;

    public difference(
      values: Iterable<[any, any]>, caseSensitive?: boolean, strict?: boolean
    ): Storage<K, V>;

    public differenceBy <R>(
      values: Iterable<[any, any]>, iteratee: (val: V) => R, caseSensitive?: boolean,
      strict?: boolean
    ): Storage<K, R>;
    public differenceBy <k extends keyof V>(
      values: Iterable<[any, any]>, iteratee: k, caseSensitive?: boolean,
      strict?: boolean
    ): Storage<K, V[k]>

    public differenceWith <T>(
      values: Iterable<[any, T]>, comparator: (val: V, outVal: T) => boolean
    ): Storage<K, V>;

    public drop(num?: number): Storage<K, V>;
    public dropRight: typeof Storage.prototype.drop;

    public dropRightWhile(predicate?: (val: V, key: K, storage: this) => boolean): Storage<K, V>;
    public dropWhile: typeof Storage.prototype.dropRightWhile;

    public head(): Storage<K, V>;

    public initial(): Storage<K, V>;

    public intersection: typeof Storage.prototype.difference;
    public intersectionBy: typeof Storage.prototype.differenceBy;
    public intersectionWith: typeof Storage.prototype.differenceWith;

    public end(): Storage<K, V>;

    public pull: typeof Storage.prototype.difference;
    public pullAll: typeof Storage.prototype.difference;
    public pullAllBy: typeof Storage.prototype.differenceBy;
    public pullAllWith: typeof Storage.prototype.differenceWith;

    public at(indexes: K[]): Storage<K, V>;
    public pullAt: typeof Storage.prototype.at;

    public remove: typeof Storage.prototype.filter;

    public sortedIndex(val: any): number;
    public sortedIndexBy <T>(val: T, iteratee: (val: T) => any): number;

    public sortedLastIndex: typeof Storage.prototype.sortedIndex;
    public sortedLastIndexBy: typeof Storage.prototype.sortedIndexBy;

    public uniq(caseSensitive?: boolean, strict?: boolean): Storage<K, V>;
    public uniqBy(
      iteratee: ((val: V) => boolean) | keyof V, caseSensitive?: boolean, strict?: boolean
    ): Storage<K, V>;
    public uniqWith(comparator: (val1: V, val2: V) => boolean): Storage<K, V>;

    public tail(): Storage<K, V>;

    public take(num?: number): Storage<K, V>;
    public takeRight: typeof Storage.prototype.take;

    public takeRightWhile: typeof Storage.prototype.dropRightWhile;
    public takeWhile: typeof Storage.prototype.dropWhile;

    public union: typeof Storage.prototype.concat;

    /* I had to do each possibility from 1 to 6 because TypeScript doesn't support backwards
    variable arguments */

    public unionBy <k1, v1, R>(
      iter1: Iterable<[k1, v1]>, iteratee: (val: V | v1) => R,
    ): Storage<K | k1, R>;
    public unionBy <k1, v1, P extends keyof (V | v1)>(
      iter1: Iterable<[k1, v1]>, iteratee: P,
    ): Storage<K | k1, (V | v1)[P]>;

    public unionBy <k1, v1, k2, v2, R>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iteratee: (val: V | v1) => R,
    ): Storage<K | k1 | k2, R>;
    public unionBy <k1, v1, k2, v2, P extends keyof (V | v1 | v2)>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iteratee: P,
    ): Storage<K | k1 | k2, (V | v1 | v2)[P]>;

    public unionBy <k1, v1, k2, v2, k3, v3, R>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iteratee: (val: V | v1) => R,
    ): Storage<K | k1 | k2 | k3, R>;
    public unionBy <k1, v1, k2, v2, k3, v3, P extends keyof (V | v1 | v2 | v3)>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>, iteratee: P,
    ): Storage<K | k1 | k2 | k3, (V | v1 | v2 | v3)[P]>;

    public unionBy <k1, v1, k2, v2, k3, v3, k4, v4, R>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iteratee: (val: V | v1) => R,
    ): Storage<K | k1 | k2 | k3 | k4, R>;
    public unionBy <k1, v1, k2, v2, k3, v3, k4, v4, P extends keyof (V | v1 | v2 | v3 | v4)>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iteratee: P,
    ): Storage<K | k1 | k2 | k3 | k4, (V | v1 | v2 | v3 | v4)[P]>;

    public unionBy <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5, R>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>, iteratee: (val: V | v1) => R,
    ): Storage<K | k1 | k2 | k3 | k4 | k5, R>;
    public unionBy <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5, P extends keyof (V | v1 | v2 | v3 | v4 | v5)>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>, iteratee: P,
    ): Storage<K | k1 | k2 | k3 | k4 | k5, (V | v1 | v2 | v3 | v4 | v5)[P]>;

    public unionBy <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5, k6, v6, R>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>, iteratee: (val: V | v1) => R,
    ): Storage<K | k1 | k2 | k3 | k4 | k5, R>;
    public unionBy <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5, k6, v6,
    P extends keyof (V | v1 | v2 | v3 | v4 | v5 | v6)>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>, iter6: Iterable<[k6, v6]>, iteratee: P,
    ): Storage<K | k1 | k2 | k3 | k4 | k5 | k6, (V | v1 | v2 | v3 | v4 | v5 | v6)[P]>;
    // did up to 6

    /* same for unionWith */

    public unionWith <k1, v1>(
      iter1: Iterable<[k1, v1]>,
      comparator: (key1: K | k1, key2: K | k1, val1: V | v1, val2: V | v1) => boolean,
    ): Storage<K | k1, V | v1>;
    public unionWith <k1, v1, k2, v2>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>,
      comparator: (key1: K | k1 | k2, key2: K | k1 | k2, val1: V | v1 | v2, val2: V | v1 | v2) => boolean,
    ): Storage<K | k1 | k2, V | v1 | v2>;
    public unionWith <k1, v1, k2, v2, k3, v3>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      comparator: (
        key1: K | k1 | k2 | k3, key2: K | k1 | k2 | k3, val1: V | v1 | v2 | v3, val2: V | v1 | v2 | v3
      ) => boolean,
    ): Storage<K | k1 | k2 | k3, V | v1 | v2 | v3>;
    public unionWith <k1, v1, k2, v2, k3, v3, k4, v4>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>,
      comparator: (
        key1: K | k1 | k2 | k3 | k4, key2: K | k1 | k2 | k3 | k4,
        val1: V | v1 | v2 | v3 | v4, val2: V | v1 | v2 | v3 | v4
      ) => boolean,
    ): Storage<K | k1 | k2 | k3 | k4, V | v1 | v2 | v3 | v4>;
    public unionWith <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>,
      comparator: (
        key1: K | k1 | k2 | k3 | k4 | k5, key2: K | k1 | k2 | k3 | k4 | k5,
        val1: V | v1 | v2 | v3 | v4 | v5, val2: V | v1 | v2 | v3 | v4 | v5
      ) => boolean,
    ): Storage<K | k1 | k2 | k3 | k4 | k5, V | v1 | v2 | v3 | v4 | v5>;
    public unionWith <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5, k6, v6>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>, iter6: Iterable<[k6, v6]>,
      comparator: (
        key1: K | k1 | k2 | k3 | k4 | k5 | k6, key2: K | k1 | k2 | k3 | k4 | k5 | k6,
        val1: V | v1 | v2 | v3 | v4 | v5 | v6, val2: V | v1 | v2 | v3 | v4 | v5 | v6
      ) => boolean,
    ): Storage<K | k1 | k2 | k3 | k4 | k5 | k6, V | v1 | v2 | v3 | v4 | v5 | v6>;

    /* same with xor() */

    public xor <k1, v1>(
      iter1: Iterable<[k1, v1]>,
      caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1, V | v1>;
    public xor <k1, v1, k2, v2>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>,
      caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1 | k2, V | v1 | v2>;
    public xor <k1, v1, k2, v2, k3, v3>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1 | k2 | k3, V | v1 | v2 | v3>;
    public xor <k1, v1, k2, v2, k3, v3, k4, v4>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>,
      caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1 | k2 | k3 | k4, V | v1 | v2 | v3 | v4>;
    public xor <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>,
      caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1 | k2 | k3 | k4 | k5, V | v1 | v2 | v3 | v4 | v5>;
    public xor <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5, k6, v6>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>, iter6: Iterable<[k6, v6]>,
      caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1 | k2 | k3 | k4 | k5 | k6, V | v1 | v2 | v3 | v4 | v5 | v6>;

    /* same with xorBy() */

    public xorBy <k1, v1, R>(
      iter1: Iterable<[k1, v1]>,
      iteratee?: (val: V | v1) => R, caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1, R>;
    public xorBy <k1, v1, k2, v2, R>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>,
      iteratee?: (val: V | v1 | v2) => R, caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1 | k2, R>;
    public xorBy <k1, v1, k2, v2, k3, v3, R>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iteratee?: (val: V | v1 | v2 | v3) => R, caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1 | k2 | k3, R>;
    public xorBy <k1, v1, k2, v2, k3, v3, k4, v4, R>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>,
      iteratee?: (val: V | v1 | v2 | v3 | v4) => R, caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1 | k2 | k3 | k4, R>;
    public xorBy <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5, R>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>,
      iteratee?: (val: V | v1 | v2 | v3 | v4 | v5) => R, caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1 | k2 | k3 | k4 | k5, R>;
    public xorBy <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5, k6, v6, R>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>, iter6: Iterable<[k6, v6]>,
      iteratee?: (val: V | v1 | v2 | v3 | v4 | v5 | v6) => R, caseSensitive?: boolean, strict?: boolean
    ): Storage<K | k1 | k2 | k3 | k4 | k5 | k6, R>;

    /* same with xorWith() */

    public xorWith <k1, v1>(
      iter1: Iterable<[k1, v1]>,
      comparator?: (key1: K | k1, key2: K | k1, val1: V | v1, val2: V | v1) => boolean,
    ): Storage<K | k1, V | v1>;
    public xorWith <k1, v1, k2, v2>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>,
      comparator?: (key1: K | k1 | k2, key2: K | k1 | k2, val1: V | v1 | v2, val2: V | v1 | v2) => boolean,
    ): Storage<K | k1 | k2, V | v1 | v2>;
    public xorWith <k1, v1, k2, v2, k3, v3>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      comparator?: (
        key1: K | k1 | k2 | k3, key2: K | k1 | k2 | k3,
        val1: V | v1 | v2 | v3, val2: V | v1 | v2 | v3
      ) => boolean,
    ): Storage<K | k1 | k2 | k3, V | v1 | v2 | v3>;
    public xorWith <k1, v1, k2, v2, k3, v3, k4, v4>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>,
      comparator?: (
        key1: K | k1 | k2 | k3 | k4, key2: K | k1 | k2 | k3 | k4,
        val1: V | v1 | v2 | v3 | v4, val2: V | v1 | v2 | v3 | v4
      ) => boolean,
    ): Storage<K | k1 | k2 | k3 | k4, V | v1 | v2 | v3 | v4>;
    public xorWith <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>,
      comparator?: (
        key1: K | k1 | k2 | k3 | k4 | k5, key2: K | k1 | k2 | k3 | k4 | k5,
        val1: V | v1 | v2 | v3 | v4 | v5, val2: V | v1 | v2 | v3 | v4 | v5
      ) => boolean,
    ): Storage<K | k1 | k2 | k3 | k4 | k5, V | v1 | v2 | v3 | v4 | v5>;
    public xorWith <k1, v1, k2, v2, k3, v3, k4, v4, k5, v5, k6, v6>(
      iter1: Iterable<[k1, v1]>, iter2: Iterable<[k2, v2]>, iter3: Iterable<[k3, v3]>,
      iter4: Iterable<[k4, v4]>, iter5: Iterable<[k5, v5]>, iter6: Iterable<[k6, v6]>,
      comparator?: (
        key1: K | k1 | k2 | k3 | k4 | k5 | k6, key2: K | k1 | k2 | k3 | k4 | k5 | k6,
        val1: V | v1 | v2 | v3 | v4 | v5 | v6, val2: V | v1 | v2 | v3 | v4 | v5 | v6
      ) => boolean,
    ): Storage<K | k1 | k2 | k3 | k4 | k5 | k6, V | v1 | v2 | v3 | v4 | v5 | v6>;

    public shuffle(): Storage<K, V>;

    public sample(): Storage<K, V>;
    public sampleSize(num?: number): Storage<K, V>;

    public reject: typeof Storage.prototype.filter;

    public countBy(iteratee?: (val: V) => any): Storage<string, number>;

    public groupBy(iteratee?: (val: V) => any): Storage<string, V[]>;

    public partition(predicate?: (val: V) => boolean): Storage<boolean, Storage<K, V>>;

    public toString(): string;

    public toObject: {[prop: string]: V};

    public identity(): this;
  }
}

export = saltjs;
