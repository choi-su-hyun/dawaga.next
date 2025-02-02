import { NextPage } from "next";
import RegisterInvitePageBody from "@/page-bodies/register-invite";
import ClientSideWrapper from "@/components/common/client-side-wrapper";

interface Props {
  d: string;
}

const RegisterInvite: NextPage<Props> = ({}) => {
  return (
    <ClientSideWrapper>
      <RegisterInvitePageBody />
    </ClientSideWrapper>
  );
};

export default RegisterInvite;
