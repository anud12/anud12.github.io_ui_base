import React, { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { Comment } from "./Comment";
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
                <link href={"https://anud.ro/ui_base/src/main.css"} type="text/css" rel="stylesheet" />
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
                    <div className="page-content">
                        <Header>{props.title}</Header>
                        {props.children}
                    </div>
                </div>
            </body>
        </html>

    )
}