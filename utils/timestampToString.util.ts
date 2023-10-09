import { Timestamp } from "firebase/firestore";
/**
 * converts firebase timstamp to JSDate
 * @param timestamp
 * @returns formattedJSDate
 */
export function timestampToDate(timestamp: Timestamp) {
  try {
    const date = timestamp.toDate();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  } catch (error) {
    console.error(error);
    return "00-00-00";
  }
}
