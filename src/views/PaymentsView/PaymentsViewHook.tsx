import { useState } from "react";

const usePaymentsView = () => {
  const [segmentSelected, setSegmentSelected] = useState<"credit-card" | "paypal">("credit-card");

  const handleChangeSegment = (value: any) => {
    setSegmentSelected(value);
  };

  return {
    segmentSelected,
    handleChangeSegment,
  };
};

export default usePaymentsView;
