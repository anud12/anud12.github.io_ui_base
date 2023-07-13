import React from "react";
declare global {
    let google: any;
    let iziToast: any;
    let gapi: any;
}
declare const _default: {
    Page: (props: {
        title?: React.ReactNode;
        theme?: {
            "--primary"?: string;
            "--background-color"?: string;
            "--border-color"?: string;
        };
    } & {
        children?: React.ReactNode;
    }) => React.JSX.Element;
    Table: (props: {
        title?: React.ReactNode;
        source: string;
    }) => React.JSX.Element;
    Link: (props: {
        children?: React.ReactNode;
    } & {
        href: string;
    }) => React.JSX.Element;
    Form: (props: {
        children?: React.ReactNode;
    } & {
        title?: React.ReactNode;
        folderId: string;
    }) => React.JSX.Element;
    Input: (props: {
        name: string;
        type?: string;
        accept?: string;
        isOptional?: boolean;
        capture?: "environment" | "user";
    }) => React.JSX.Element;
    Button: (props: React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>) => React.JSX.Element;
};
export = _default;
