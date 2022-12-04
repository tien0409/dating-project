import moment from "moment/moment";

export const formatDate = (date?: Date, format = "DD/MM/YYYY") => {
  return date ? moment(date).format(format) : "";
};
