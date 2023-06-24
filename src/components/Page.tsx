import React, { CSSProperties, PropsWithChildren } from "react";
import { Divider } from "./Divider";
type Props = PropsWithChildren<{
    theme?: {
        "--primary"?: string,
        "--background-color"?: string,
        "--border-color"?: string,
    }
}>;
export const Page = (props: Props) => {
    const theme = props.theme ?? {};
    return <div className="page" style={{
        "--primary": theme["--primary"] ?? "#0074cc",
        "--background-color": theme["--background-color"] ?? "white",
        "--border-color": theme['--border-color'] ?? "#c4c4c4",
    } as CSSProperties}>
        {props.children}
        <Divider />
    </div>
}