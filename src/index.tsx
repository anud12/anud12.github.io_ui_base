import React from "react";
import { Page } from "./components/Page";
import { Table } from "./components/Table";
import { Link } from "./components/atoms/Link";
import { DividerH } from "./components/DividerH";
module.exports = (
    <Page title="Hello world" theme={{
        "--primary": "#70a3c7"
    }}>
        <Link href={"add"}>Add</Link>
        <Table source="1mcnVFYPtTMt-UV0ZvaXs6R2MfSfcSbsMpKhp4dFW6DE"
            title={
                <Link href={"add"}>Add</Link>
            } />
        <DividerH />
        <Table source="1mcnVFYPtTMt-UV0ZvaXs6R2MfSfcSbsMpKhp4dFW6DE" />
    </Page>
)