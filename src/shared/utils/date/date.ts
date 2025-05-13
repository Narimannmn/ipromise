import dayjs from "dayjs";
import { DateFormatType, dateFormatTypes } from "../../config/date/format";

export const formatDate = (
  date: Date | string,
  formatType: DateFormatType = "dotted",
) => {
  return dayjs(date).format(dateFormatTypes[formatType]);
};
