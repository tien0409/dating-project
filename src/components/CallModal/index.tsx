import { Modal } from "antd";
import { Case, Switch } from "react-if";

import useCallModal from "./CallModalHook";
import ReceivingCallContent from "./ReceivingCallContent";
import CallingContent from "./CallingContent";
import UserCallUnavailableContent from "./UserCallUnavailableContent";
import CallRejectedContent from "./CallRejectedContent";

const CallModal = () => {
  const { open, callStatus } = useCallModal();

  return (
    <Modal open={open} closable={false} footer={false}>
      <Switch>
        <Case condition={callStatus === "calling"}>
          <CallingContent />
        </Case>
        <Case condition={callStatus === "unavailable"}>
          <UserCallUnavailableContent />
        </Case>
        <Case condition={callStatus === "rejected"}>
          <CallRejectedContent />
        </Case>
        <Case condition={callStatus === "receiving-call"}>
          <ReceivingCallContent />
        </Case>
      </Switch>
    </Modal>
  );
};

export default CallModal;
