import React from "react";
import {Page} from "./components/Page";
import {Form} from "./components/Form";
import {Input, Select} from "./components/atoms/Input";

const time = new Date().toISOString();
type Obj = {
  "camelCase":"",
  "kebab-case":"",
  "snake_case":"",
  "snake_case file":"",
  "camelCase demo":"",
}
module.exports = (
    <Page title="Add boxes">
        <Form folderId="1DwTbUSWf5kzNq84Kc08bJ9Wyw9ijfBuS">
            <Input<Obj> name="camelCase" type="text" />
            <Input<Obj> name="kebab-case" type="text" />
            <Input<Obj> name="snake_case" type="text" />
            <Input<Obj> name="snake_case file" type="file" accept="image/*" />
            <Select<Obj> name="camelCase demo">
                <option>Value</option>
            </Select>
        </Form>
    </Page>
)