import { Button, FormInstance, Modal } from "antd";
import { Else, If, Then } from "react-if";
import { LoadingOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";

import styles from "./PassionsSelect.module.scss";
import usePassionsSelect from "./PassionsSelectHook";
import PassionItem from "@/components/PassionsSelect/PassionItem";

const cln = classNames.bind(styles);

export type PassionsSelectProps = {
  form: FormInstance;
  field: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
  loading?: boolean;
};

const PassionsSelect = (props: PassionsSelectProps) => {
  const { form, field, open, loading = false, handleSubmit } = props;

  const { passions, getPassionsLoading, handleCancel } = usePassionsSelect(props);

  return (
    <Modal open={open} footer={false} onCancel={handleCancel}>
      <div className={cln("wrapper")}>
        <h3 className={cln("title")}>My Passions</h3>
        <p className={cln("description")}>
          Let everyone know what you&rsquo;re passionate about by adding it to your profile (Choose
          minimum 3 passions)
        </p>

        <If condition={getPassionsLoading}>
          <Then>
            <div className={cln("loading__wrapper")}>
              <LoadingOutlined />
            </div>
          </Then>

          <Else>
            <ul className={cln("custom__scroll", "custom__scroll--tiny", "passion__list")}>
              {passions?.map((passion) => (
                <PassionItem key={passion.id} form={form} field={field} passion={passion} />
              ))}
            </ul>
          </Else>
        </If>

        <div className={cln("btn__wrapper")}>
          <Button
            type="primary"
            shape="round"
            loading={loading}
            disabled={form.getFieldValue(field)?.length < 3 || loading}
            onClick={handleSubmit}
          >
            DONE ({form.getFieldValue(field)?.length || 0}/5)
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PassionsSelect;
