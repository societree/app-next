import { ReactNode } from "react";

interface IProps {
  showIf: boolean;
  children: ReactNode;
}

export default function Show({ showIf, children }: IProps) {
  return <>{showIf ? children : null}</>;
}
