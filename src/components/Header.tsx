import React, { Fragment, PropsWithChildren } from "react";
import { CardContainer } from "./Container";
import { Link } from "./Link";
import { Divider } from "./Divider";
type Props = PropsWithChildren<{}>;

const buildBack = index => new Array(index + 1).fill("..").join("/")
const buildPath = () => {
    const href = globalThis?.window?.location.href
    const url: URL | undefined = href ? new URL(href) : undefined;
    const path = url?.pathname?.split("/").filter(e => e) ?? [];
    path.reverse();
    path.splice(0, 1);
    path.reverse();
    return path;
}
export const Header = (props: Props) => {
    const path = buildPath();
    return <Fragment>
        <Divider />
        <CardContainer>
            <div className={"header-content"}>
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
            </div>
            <div className="border-top header-url-chips">
                <div>
                    <Link href="/">
                        Home
                    </Link>
                </div>
                {path.reverse().map((e, index) =>
                    <div key={e}>
                        <Link href={buildBack(index)}>{e}</Link>
                    </div>
                ).reverse()}
            </div>
        </CardContainer>
    </Fragment>
}