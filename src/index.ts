import React from "react";
import { Page } from "./components/Page";
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { Link } from "./components/atoms/Link";
import { Input } from "./components/atoms/Input";
import { Button } from "./components/atoms/Button";

declare global {
    let google: any;
    let iziToast: any;
    let gapi: any;
}
export default {
    Page,
    Table,
    Link,
    Form,
    Input,
    Button,
}