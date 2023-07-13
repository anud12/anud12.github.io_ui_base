import React, { PropsWithChildren, ReactNode } from "react";
type Props = PropsWithChildren & {
    title?: ReactNode;
    folderId: string;
};
export declare const FormContext: React.Context<{
    state: Record<string, string | File>;
    setState: (...args: any[]) => void;
}>;
export declare const Form: (props: Props) => React.JSX.Element;
export {};
