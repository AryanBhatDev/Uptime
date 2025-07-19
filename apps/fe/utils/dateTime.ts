import dayjs from 'dayjs'
export const formatDateTime = (time?: string) => {
  if (!time) return "Improper time format";
  return dayjs(time).format('MMM D, h:mm A'); 
};