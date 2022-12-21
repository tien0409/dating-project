import classNames from "classnames/bind";
import { FormInstance } from "antd";

import styles from "./PassionItem.module.scss";
import usePassionItem from "./PassionItemHook";
import PassionType from "@/types/passion/PassionType";

const cln = classNames.bind(styles);

export type PassionItemProps = {
  form: FormInstance;
  field: string;
  passion: PassionType;
};

const PassionItem = (props: PassionItemProps) => {
  const { passion, form, field } = props;

  const { handleClickPassion } = usePassionItem(props);

  return (
    <li
      className={cln("wrapper", {
        "is-active": form.getFieldValue(field)?.includes(passion.id),
        disabled:
          form.getFieldValue(field)?.length >= 5 &&
          !form.getFieldValue(field)?.includes(passion.id),
      })}
      key={passion.id}
      onClick={handleClickPassion(passion)}
    >
      {passion.name}
    </li>
  );
};

export default PassionItem;
