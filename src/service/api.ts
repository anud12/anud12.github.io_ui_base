export type FileMetadata = {
  getId: () => string;
};

export type Request = {
  parent?: string;
  name?: string;
  size?: number;
  fixed?: boolean;
};

export type Request = {
  name?: string;
  size?: number;
  fixed?: boolean;
  parent?: string;
};

export type FolderQuery<ChildQuery> = FileMetadata & {
  query: (queryRequest: Request) => Promise<ChildQuery[]>;
  findAll: () => Promise<ChildQuery[]>;
  findByName: (name: string) => Promise<ChildQuery[]>;
  findOneByName: (name: string) => Promise<ChildQuery>;
};

export type RootQuery<ChildQuery extends FolderQuery<ChildQuery>> = {
  query: (queryRequest: Request) => Promise<ChildQuery[]>;
  findAll: () => Promise<ChildQuery[]>;
  findByName: (name: string) => Promise<ChildQuery[]>;
  findOneByName: (name: string) => Promise<ChildQuery>;
};