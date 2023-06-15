import React, { PropsWithChildren } from "react";
type Props = PropsWithChildren<{}> & {
    className?: string
}
export const CardContainer = (props: Props) => {
    return <div className="container-container">
        <div className={`container card-container border ${props.className ?? ""}`.trim()}>
            {props.children}
        </div>
    </div>
}

export const Container = (props: PropsWithChildren) => {
    return <div className="container-container">
        <div className={`container`}>
            {props.children}
        </div>
    </div>
}