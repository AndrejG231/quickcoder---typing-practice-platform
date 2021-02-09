import React from "react";

export type ReactChild = React.ReactChild | React.ReactChild[] | never[];

export type Errors = {
  info: string,
  message: string,
  action: string,
}
