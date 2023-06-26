import React from "react";
import { Comment } from "./components/Comment";
import { Header } from "./components/Header";
import { Page } from "./components/Page";
import { Table } from "./components/Table";
import { Link } from "./components/atoms/Link";
const time = new Date().toISOString();

module.exports = (

    <html>
        <head>
            <link href={"src/main.css"} type="text/css" rel="stylesheet" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,-25" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap" rel="stylesheet" />

        </head>
        <body>
            <Comment>{time}</Comment>
            <Page theme={{
                "--primary": "#70a3c7"
            }}>
                <Header>Hello world</Header>
                <Table title={
                    <Link href={"add"}>Add</Link>
                } source="1mcnVFYPtTMt-UV0ZvaXs6R2MfSfcSbsMpKhp4dFW6DE" />
            </Page>
        </body>
    </html>
)