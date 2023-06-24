import React from "react";
import { PropsWithChildren } from "react";

export const Title = (props: PropsWithChildren<{}>) => <div className="title">{props.children}</div>