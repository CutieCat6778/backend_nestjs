export interface User {
  readonly _id: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly tables: string[];
  readonly createdAt: Date;
}

export interface Table {
  readonly _id: string;
  readonly title: string;
  readonly type: number;
  readonly colums: Column[];
  readonly position: number;
  readonly createdAt: Date;
}

export interface Column {
  readonly _id: string;
  readonly content: string;
  readonly position: number;
  readonly createdAt: Date;
}
