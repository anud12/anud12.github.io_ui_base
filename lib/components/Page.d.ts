import React, { PropsWithChildren, ReactNode } from "react";
type Props = PropsWithChildren<{
    title?: ReactNode;
    theme?: {
        "--primary"?: string;
        "--background-color"?: string;
        "--border-color"?: string;
    };
}>;
export declare const Page: (props: Props) => React.JSX.Element;
export {};
