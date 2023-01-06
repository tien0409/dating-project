import { Button, Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";
import { TiTick } from "react-icons/ti";

import styles from "./DateStatusModal.module.scss";
import useDateStatusModal from "./DateStatusModalHook";
import { When } from "react-if";

const cln = classNames.bind(styles);

export type DateStatusModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DateStatusModal = (props: DateStatusModalProps) => {
  const { open, setOpen } = props;

  const {
    loading,
    relationshipTypes,
    relationshipTypeSelected,
    handleChangeRelationshipType,
    handleSubmit,
  } = useDateStatusModal(props);

  return (
    <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
      <div className={cln("wrapper")}>
        <h3 className={cln("title")}>I&rsquo;m here to</h3>

        <ul className={cln("status__list")}>
          {relationshipTypes.map((relationshipType) => (
            <li
              key={relationshipType.id}
              className={cln("status__item", {
                "is-active": relationshipType.id === relationshipTypeSelected?.id,
              })}
              onClick={handleChangeRelationshipType(relationshipType)}
            >
              <div className={cln("status__item-info")}>
                <h5>{relationshipType.name}</h5>
                <p>{relationshipType.description}</p>
              </div>

              <When condition={relationshipTypeSelected?.id === relationshipType.id}>
                <TiTick size={23} className={cln("status__item-icon")} />
              </When>
            </li>
          ))}
        </ul>

        <When condition={!!relationshipTypeSelected}>
          <div className={cln("btn")}>
            <Button
              type="primary"
              shape="round"
              size="large"
              loading={loading}
              onClick={handleSubmit}
            >
              Continue with {relationshipTypeSelected?.name}
            </Button>
          </div>
        </When>
      </div>
    </Modal>
  );
};

export default DateStatusModal;
