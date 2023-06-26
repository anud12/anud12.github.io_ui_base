import React, { CSSProperties, PropsWithChildren } from "react";
import { Divider } from "./Divider";
import { Comment } from "./Comment";
import { ReactNode } from "react";
import { Header } from "./Header";

type Props = PropsWithChildren<{
    title?: ReactNode,
    theme?: {
        "--primary"?: string,
        "--background-color"?: string,
        "--border-color"?: string,
    }
}>;
const time = new Date().toISOString();
export const Page = (props: Props) => {
    const theme = props.theme ?? {};
    return (
        <html>
            <head>
                <link href={"/src/main.css"} type="text/css" rel="stylesheet" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,-25" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap" rel="stylesheet" />

            </head>
            <body>
                <Comment>{time}</Comment>
                <div className="page" style={{
                    "--primary": theme["--primary"] ?? "#0074cc",
                    "--background-color": theme["--background-color"] ?? "white",
                    "--border-color": theme['--border-color'] ?? "#c4c4c4",
                } as CSSProperties}>
                    <Header>{props.title}</Header>
                    {props.children}
                    <Divider />
                </div>
            </body>
        </html>

    )
}