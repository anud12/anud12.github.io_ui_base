type TableQuery = {
    size?: number;
    skip?: number;
};

type TableRow<IdType> = {
    id: IdType | null;
    data: Map<string, string>;
};

type Table<IdType> = {
    save_all: (data: TableRow<IdType>[]) => Promise<void>;
    find_by_query: (query: TableQuery) => Promise<TableRow<IdType>[]>;
    find_by: () => TableQueryBuilder<IdType>;
};

type TableQueryBuilder<IdType> = {
    size: (size: number) => TableQueryBuilder<IdType>;
    clear_size: () => TableQueryBuilder<IdType>;
    skip: (skip: number) => TableQueryBuilder<IdType>;
    clear_skip: () => TableQueryBuilder<IdType>;
    query: () => Promise<TableRow<IdType>[]>;
};

type HashMap<K extends string | number, V> = {
    insert: <Key extends K, Value extends V>(key: Key, value: Value) => void;
    get: <Key extends K>(key: Key) => V | undefined;
};

type TableRowImpl<IdType> = {
    id: IdType | null;
    data: Map<string, string>;
    get_data: () => Map<string, string>;
    get_id: () => IdType | null;
    insert: <Key extends string, Value extends string>(
        this: TableRowImpl<IdType>,
        k: Key,
        v: Value
    ) => TableRowImpl<IdType>;
    get: (k: string) => string | undefined;
};

type TableQueryBuilderImpl<IdType> = {
    tableQuery: TableQuery;
    table: Table<IdType>;
    new(value: Table<IdType>): TableQueryBuilderImpl<IdType>;
    size: (size: number) => TableQueryBuilderImpl<IdType>;
    clear_size: () => TableQueryBuilderImpl<IdType>;
    skip: (skip: number) => TableQueryBuilderImpl<IdType>;
    clear_skip: () => TableQueryBuilderImpl<IdType>;
    query: () => Promise<TableRow<IdType>[]>;
};

type TableQueryImpl = {
    size?: number;
    skip?: number;
    new(size?: number, skip?: number): TableQueryImpl;
};

type IntoTable<TableType extends Table<any>> = {
    into_table: () => TableType;
};

type Into<T> = {
    into: () => T;
};