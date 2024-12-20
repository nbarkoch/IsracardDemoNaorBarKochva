import { Book } from "./types";

export type SortingOption = "title" | "releaseDate" | "pages";
export type SortDirection = "asc" | "desc";

const MONTH_TO_NUM: { [key: string]: number } = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

function getDateParts(dateStr: string) {
  const [month, dayStr, yearStr] = dateStr.split(" ");
  return {
    month: MONTH_TO_NUM[month],
    day: parseInt(dayStr.replace(",", "")),
    year: parseInt(yearStr),
  };
}

export function sortBookOption(sortOption: SortingOption) {
  switch (sortOption) {
    case "title":
      return (a: Book, b: Book) => a.title.localeCompare(b.title);
    case "releaseDate":
      return (a: Book, b: Book) => {
        const dateA = getDateParts(a.releaseDate);
        const dateB = getDateParts(b.releaseDate);
        if (dateA.year !== dateB.year) return dateA.year - dateB.year;
        if (dateA.month !== dateB.month) return dateA.month - dateB.month;
        return dateA.day - dateB.day;
      };
    case "pages":
      return (a: Book, b: Book) => a.pages - b.pages;
  }
}
