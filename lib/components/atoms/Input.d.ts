import React, { PropsWithChildren } from "react";
type Props = {
    name: string;
    type?: HTMLInputElement['type'];
    accept?: string;
    isOptional?: boolean;
    capture?: "environment" | "user";
};
export declare const Input: (props: Props) => React.JSX.Element;
export declare const Select: (props: PropsWithChildren<{
    name: string;
    isOptional: boolean;
}>) => React.JSX.Element;
export {};
