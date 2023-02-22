import * as React from "react";
import { BrowserRouter, Link } from "react-router-dom";

interface MyLinkProperties {
  link: string,
  children: React.ReactElement,
}

export const MyLink = ({link, children}: MyLinkProperties) => {
  return (<BrowserRouter>
    <Link to={link}>
      { children }
    </Link>
  </BrowserRouter>);
}