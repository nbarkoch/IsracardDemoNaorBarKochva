import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Book } from "./types";

dayjs.extend(customParseFormat); // Extend dayjs with the customParseFormat plugin

export type SortingOption = "title" | "releaseDate" | "pages";
export type SortDirection = "asc" | "desc";

export function sortBookOption(sortOption: SortingOption) {
  switch (sortOption) {
    case "title":
      return (a: Book, b: Book) => a.title.localeCompare(b.title);
    case "releaseDate":
      return (a: Book, b: Book) => {
        const dateA = dayjs(a.releaseDate, "MMM D, YYYY");
        const dateB = dayjs(b.releaseDate, "MMM D, YYYY");

        // Compare valid dates
        if (dateA.isValid() && dateB.isValid()) {
          return dateA.diff(dateB);
        }

        // Handle invalid dates (optional)
        if (!dateA.isValid() && !dateB.isValid()) return 0;
        return dateA.isValid() ? -1 : 1;
      };
    case "pages":
      return (a: Book, b: Book) => a.pages - b.pages;
  }
}
