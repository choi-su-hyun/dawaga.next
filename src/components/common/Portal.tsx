import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: Props) => {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    const $element = document.querySelector(selector);
    setElement($element);
  }, [selector]);

  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
