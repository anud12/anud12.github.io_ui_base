import React, { PropsWithChildren } from "react";
type Props = PropsWithChildren<{}> & {
    className?: string
}
export const Container = (props: Props) => {
    return <div className="container-container">
        <div className={`container ${props.className ?? ""}`.trim()}>
            {props.children}
        </div>
    </div>
}