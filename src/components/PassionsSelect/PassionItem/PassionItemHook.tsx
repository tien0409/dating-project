import { PassionType } from "@/types";
import { PassionItemProps } from ".";

const usePassionItem = (props: PassionItemProps) => {
  const { form, field } = props;

  const handleClickPassion = (passion: PassionType) => () => {
    if (form.getFieldValue(field)?.includes(passion.id)) {
      form.setFieldValue(
        field,
        form.getFieldValue(field)?.filter((id: string) => id !== passion.id),
      );
    } else if (form.getFieldValue(field)?.length < 5) {
      form.setFieldValue(field, [...form.getFieldValue(field), passion.id]);
    }
  };
  return { handleClickPassion };
};

export default usePassionItem;
