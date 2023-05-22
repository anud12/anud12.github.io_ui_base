import React, { PropsWithChildren } from "react";
import { Container } from "./Container";
type Props = PropsWithChildren<{}> & {
    backHref: string
}
export const Header = (props: Props) => {
    return <Container className={"header-content"}>
        <div className="header-return">
            <a href={props.backHref}>Back</a>
        </div>
        <div className="header-title">
            {props.children}
        </div>
    </Container>
}