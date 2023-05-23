import React, { PropsWithChildren } from "react";
import { Container } from "./Container";
type Props = PropsWithChildren<{}> & {
    backHref: string
}
export const Header = (props: Props) => {
    return <Container className={"header-content"}>
        <div className="header-return">
            <a href={props.backHref}>
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </a>
        </div>
        <div className="header-title">
            {props.children}
        </div>
        <div className="header-login">
            <button>
                <span className="material-symbols-outlined">
                    login
                </span>
            </button>
        </div>
    </Container>
}