import classNames from "classnames/bind";
import { Dispatch, SetStateAction } from "react";
import { Else, If, Then } from "react-if";
import { Form, Input, Modal } from "antd";

import styles from "./ModalSelect.module.scss";
import { GenderType, UserGenderType } from "@/types";
import useModalSelect from "./ModalSelectHook";
import SpecialGenders from "./SpecialGenders";
import GenderConfig from "./GenderConfig";

const cln = classNames.bind(styles);

export type ModalSelectProps = {
  interestedInGender?: boolean;
  open: boolean;
  genderSpecialSelected?: GenderType | UserGenderType;
  setGenderSpecialSelected: Dispatch<SetStateAction<GenderType | UserGenderType | undefined>>;
  onCancel: (_genderSpecialSelected?: GenderType | UserGenderType) => void;
};

const ModalSelect = (props: ModalSelectProps) => {
  const {
    interestedInGender,
    open,
    genderSpecialSelected,
    setGenderSpecialSelected,
    onCancel,
  } = props;

  const {
    search,
    gendersFiltered,
    nextConfig,
    setNextConfig,
    handleChangeSearch,
  } = useModalSelect();

  return (
    <Modal
      open={open}
      onCancel={() => onCancel()}
      footer={false}
      className={cln("modal")}
      width={400}
    >
      <div className={cln("wrapper")}>
        <If condition={!nextConfig}>
          <Then>
            <div className={cln("header")}>
              <h3 className={cln("title")}>Select gender</h3>

              <Form>
                <Input
                  size="large"
                  placeholder="Search..."
                  value={search}
                  onChange={handleChangeSearch}
                />
              </Form>
            </div>

            <div className={cln("gender__list")}>
              <SpecialGenders
                gendersFiltered={gendersFiltered}
                interestedInGender={interestedInGender}
                setNextConfig={setNextConfig}
                setGenderSpecialSelected={setGenderSpecialSelected}
                onCancel={onCancel}
              />
            </div>
          </Then>

          <Else>
            <GenderConfig
              genderSpecialSelected={genderSpecialSelected}
              setNextConfig={setNextConfig}
              setGenderSpecialSelected={setGenderSpecialSelected}
              onCancel={onCancel}
            />
          </Else>
        </If>
      </div>
    </Modal>
  );
};

export default ModalSelect;
