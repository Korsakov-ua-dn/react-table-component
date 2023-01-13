import { Transaction } from "../api";

export const sortByKey = (articles: Transaction[], key: string) => {
  const arr = [...articles];

  switch (key) {
    case "name":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    // case "status":
    //   return arr.sort((a, b) => a.status.localeCompare(b.status));
    // case "sum":
    //   return arr.sort((a, b) => a.sum - b.sum);
    // case "qty":
    //   return arr.sort((a, b) => a.qty - b.qty);
    // case "volume":
    //   return arr.sort((a, b) => a.volume - b.volume);
    // case "currency":
    //   return arr.sort((a, b) => a.currency.localeCompare(b.currency));
    // case "delivery_date":
    // default:
    //   return arr.sort(
    //     (a, b) =>
    //       new Date(a.delivery_date).getTime() -
    //       new Date(b.delivery_date).getTime()
    //   );
  }
};
