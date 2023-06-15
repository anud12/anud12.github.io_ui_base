import React, { PropsWithChildren } from "react";
type Props = PropsWithChildren<{}> & {
    href: string,
}
export const Link = (props: Props) => <a className="link" href={props.href}>
    {props.children}
</a>