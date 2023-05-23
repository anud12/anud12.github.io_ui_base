import React, { CSSProperties } from "react";
import { Page } from "./components/Page";
import { Header } from "./components/Header";
import { Comment } from "./components/Comment";
import { Container } from "./components/Container";
import { Table } from "./components/Table";
import { Action } from "./components/Action";
const time = new Date().toISOString();
module.exports = (

    <html>
        <head>
            <link href={"./src/main.css"} type="text/css" rel="stylesheet" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,100,0,0" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap" rel="stylesheet" />

        </head>
        <body style={{ "--primary": "#70a3c7", "--primary-text": "white" } as CSSProperties}>
            <Comment>{time}</Comment>
            <Page>
                <Container>
                    <Header backHref={"./"}>Hello world</Header>
                    <Table />
                </Container>
                <Container>
                    <Table />
                </Container>
            </Page>
        </body>
    </html>
)