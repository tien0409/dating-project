import { Button, Modal } from "antd";
import classNames from "classnames/bind";

import styles from "./DeleteAccountModal.module.scss";
import useDeleteAccountModal from "./DeleteAccountModalHook";

const cln = classNames.bind(styles);

const DeleteAccountModal = () => {
  const { open, setOpen } = useDeleteAccountModal();

  return (
    <div className={cln("wrapper")}>
      <Button
        block
        shape={"round"}
        onClick={() => setOpen(true)}
        size="large"
        className={cln("delete__action")}
      >
        Delete account
      </Button>

      <Modal open={open} closable={false} footer={false} onCancel={() => setOpen(false)}>
        <div className={cln("modal__wrapper")}>
          <h3 className={cln("title")}>Are you sure?</h3>
          <p className={cln("description")}>
            Deleting your profile to create a new account may affect who you see on the platform,
            and we want you to have the best experience possible,
          </p>

          <div className={cln("actions")}>
            <Button type="primary" shape="round" size="large">
              Delete account
            </Button>
            <Button shape="round" size="large">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteAccountModal;
