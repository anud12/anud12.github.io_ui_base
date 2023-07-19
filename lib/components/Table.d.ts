import React, { ReactNode } from "react";
type Props<T> = {
    title?: ReactNode;
    source: string;
    columnOrder?: Array<keyof T>;
    cellValues?: Record<keyof T, (row: T) => ReactNode>;
};
export declare const Table: <T extends unknown>(props: Props<T>) => React.JSX.Element;
export {};
