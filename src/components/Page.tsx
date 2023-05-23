import React, { PropsWithChildren } from "react";
type Props = PropsWithChildren<{}>;
export const Page = (props: Props) => {
    return <div className="page">
        {props.children}
    </div>
}