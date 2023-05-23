import React from "react";

export const Comment = ({ children }) => {
    return <div dangerouslySetInnerHTML={{ __html: `<!-- ${children} -->` }} />
}