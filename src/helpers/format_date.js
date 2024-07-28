import { format } from "date-fns";

export const formatDate = dateString => {
  if (!dateString) return;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return;
  }
  return format(date, "dd MMM yyyy");
};
