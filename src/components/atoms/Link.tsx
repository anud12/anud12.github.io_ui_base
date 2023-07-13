import React, { PropsWithChildren, useEffect, useState } from "react";
import {newApi} from "../../service/impl/newApi";
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
        const subscription = newApi.onChange(() => {
            fn()
        })
        window.addEventListener('hashchange', fn);
        return () => {
            window.removeEventListener('hashchange', fn);
            subscription();
        }
    }, []);
    return <a className="link" href={props.href + searchParams}>
        {props.children}
    </a>
}