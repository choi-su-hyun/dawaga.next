import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ClientSideWrapper: React.FC<Props> = ({ children }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div />;
  }

  return <>{children}</>;
};

export default ClientSideWrapper;
