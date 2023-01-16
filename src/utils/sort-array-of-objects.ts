export function sortArrayOfObjects<T>(array: T[], field: keyof T, direction: Direction, format: FormatData) {
  switch (format) {
    case "string":
      return [...array].sort((a, b) => String(a[field]).localeCompare(String(b[field])));
    case "number":
    case "price":
      return [...array].sort((a, b) => Number(a[field]) - Number(b[field]));
    case "date":
      return [...array].sort(
        (a, b) =>
          new Date(String(a[field])).getTime() -
          new Date(String(b[field])).getTime()
      );
    default: return array;
  }
};

//types
export type FormatData = "string" | "number" | "date" | "price";
type Direction = "ascending" | "descending" | "none";

