import React, { PropsWithChildren } from "react";
type Props<T> = {
    name: keyof T;
    type?: HTMLInputElement['type'];
    accept?: string;
    isOptional?: boolean;
    value?: string;
    capture?: "environment" | "user";
};
export declare const Input: <T extends unknown>(props: Props<T>) => React.JSX.Element;
export declare const Select: <T extends unknown>(props: React.PropsWithChildren<Omit<Props<T>, "type" | "accept" | "capture">>) => React.JSX.Element;
export {};
