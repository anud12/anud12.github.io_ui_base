import React, { CSSProperties } from "react";
import { Page } from "./components/Page";
import { Header } from "./components/Header";
import { Comment } from "./components/Comment";
import { CardContainer } from "./components/Container";
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { Input, Select } from "./components/atoms/Input";
const time = new Date().toISOString();
module.exports = (

    <Page title="Add boxes">
        <Form folderId="1DwTbUSWf5kzNq84Kc08bJ9Wyw9ijfBuS">
            <Input name="camelCase" type="text" />
            <Input name="kebab-case" type="text" />
            <Input name="snake_case" type="text" />
            <Input name="snake_case file" type="file" />
            <Select name="camelCase demo">
                <option>Value</option>
            </Select>
        </Form>
    </Page>
)