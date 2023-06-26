import React, { PropsWithChildren, useEffect, useState } from "react";
type Props = PropsWithChildren<{}> & {
    href: string,
}

export const Link = (props: Props) => {
    const [searchParams, setSearchParams] = useState<string>("");
    useEffect(() => {
        setSearchParams(window.location.hash);
        const fn = () => {
            setSearchParams(window.location.hash);
        }
        window.addEventListener('hashchange', fn);
        return () => {
            window.removeEventListener('hashchange', fn);
        }
    }, []);
    return <a className="link" href={props.href + searchParams}>
        {props.children}
    </a>
}