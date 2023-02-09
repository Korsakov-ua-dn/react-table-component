import * as XLSX from "xlsx";
import { ViewDataFormatScheme } from "../../../components/table-component/table.types";

export const onDownloadXlsx = <T extends object>(items: T[], scheme: ViewDataFormatScheme<T>) => {
  const schemaKeys = Object.keys(scheme);
  const itemKeys = Object.keys(items[0] as {});
  const needToExcludeKeys = itemKeys.filter((key) => !schemaKeys.includes(key));

  const preparedData = items.map((row) => {
    const obj = { ...row };
    needToExcludeKeys.forEach((key) => delete obj[key as keyof typeof obj]);
    return obj;
  });

  const workSheet = XLSX.utils.json_to_sheet(preparedData);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "table");
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, "table.xlsx");
};
