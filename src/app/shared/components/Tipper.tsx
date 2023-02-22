import classnames from "classnames";
import * as React from "react";
import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";
import { Placement } from "react-bootstrap/esm/types";
import styles from "app/styles/shared/TipperStyle.scss";

interface TipperProps {
  children: React.ReactElement,
  className?: string,
  content: string | React.ReactElement,
  placement?: Placement,
}

type NonTipperProps = JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>;
type FullTipperProps = NonTipperProps & TipperProps;

export const Tipper = ({children, className, content, placement = 'auto', ...otherProps}: FullTipperProps) => (
  <OverlayTrigger
    placement={placement}
    overlay={
      <Tooltip className={classnames(className, styles.tipper)} {...otherProps as NonTipperProps} show={true}>
        <span>{content}</span>
      </Tooltip>
    }
  >
    { children }
  </OverlayTrigger>
);