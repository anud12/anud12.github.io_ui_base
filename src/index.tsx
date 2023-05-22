import React, { CSSProperties } from "react";
import { Page } from "./Page";
import { Header } from "./Header";
import { Comment } from "./Comment";
import { Container } from "./Container";
const time = new Date().toISOString();
module.exports = (
    <html>
        <head>
            <link href={"../src/index.css"} type="text/css" rel="stylesheet" />
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