import React, { CSSProperties } from "react";
import { Page } from "./components/Page";
import { Header } from "./components/Header";
import { Comment } from "./components/Comment";
import { Container } from "./components/Container";
const time = new Date().toISOString();
module.exports = (

    <html>
        <head>
            <link href={"../src/main.css"} type="text/css" rel="stylesheet" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,100,0,0" />

            <link href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap" rel="stylesheet" />

        </head>
        <body style={{ "--primary": "#70a3c7" } as CSSProperties}>
            <Comment>{time}</Comment>
            <Page>
                <Header backHref={"../"}>Hello world</Header>
                <Container> Content</Container>
            </Page>
        </body>
    </html>
)