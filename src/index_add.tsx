import React, { CSSProperties } from "react";
import { Page } from "./components/Page";
import { Header } from "./components/Header";
import { Comment } from "./components/Comment";
import { CardContainer } from "./components/Container";
import { Table } from "./components/Table";
const time = new Date().toISOString();
module.exports = (

    <html>
        <head>
            <link href={"./src/main.css"} type="text/css" rel="stylesheet" />
            <link href={"../src/main.css"} type="text/css" rel="stylesheet" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,-25" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap" rel="stylesheet" />

        </head>
        <body style={{ "--primary": "#70a3c7", "--background-color": "white" } as CSSProperties}>
            <Comment>{time}</Comment>
            <Page>
                <Header>Add data</Header>
            </Page>
        </body>
    </html>
)