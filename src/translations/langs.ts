type TranslationValue = string;

export type BaseTranslation = {
  common: {
    search: TranslationValue;
    noBooks: TranslationValue;
    tryAgain: TranslationValue;
    error: TranslationValue;
    oops: TranslationValue;
    bookInfo: TranslationValue;
  };
  sort: {
    title: TranslationValue;
    releaseDate: TranslationValue;
    pages: TranslationValue;
  };
  bookDetails: {
    releaseDate: TranslationValue;
    pages: TranslationValue;
  };
  tabs: {
    home: TranslationValue;
    favorites: TranslationValue;
  };
};

export const en: BaseTranslation = {
  common: {
    search: "Search books...",
    noBooks: "No Books Are Currently Available",
    tryAgain: "Try again later..",
    error: "Something went wrong",
    oops: "Oops",
    bookInfo: "Book Details",
  },
  sort: {
    title: "Title",
    releaseDate: "Date",
    pages: "Pages",
  },
  bookDetails: {
    releaseDate: "Release Date",
    pages: "Pages",
  },
  tabs: {
    home: "Home",
    favorites: "Favorites",
  },
} as const;

export const he: BaseTranslation = {
  common: {
    search: "...חיפוש ספרים",
    noBooks: "אין ספרים זמינים כרגע",
    tryAgain: "..נסה שוב מאוחר יותר",
    error: "משהו השתבש",
    oops: "אופס",
    bookInfo: "פרטי הספר",
  },
  sort: {
    title: "כותרת",
    releaseDate: "תאריך",
    pages: "עמודים",
  },
  bookDetails: {
    releaseDate: "תאריך הוצאה",
    pages: "עמודים",
  },
  tabs: {
    home: "בית",
    favorites: "מועדפים",
  },
} as const;

export const es: BaseTranslation = {
  common: {
    search: "Buscar libros...",
    noBooks: "No Hay Libros Disponibles Actualmente",
    tryAgain: "Inténtalo más tarde..",
    error: "Algo salió mal",
    oops: "Ups",
    bookInfo: "Detalles del Libro",
  },
  sort: {
    title: "Título",
    releaseDate: "Fecha",
    pages: "Páginas",
  },
  bookDetails: {
    releaseDate: "Fecha de Publicación",
    pages: "Páginas",
  },
  tabs: {
    home: "Inicio",
    favorites: "Favoritos",
  },
} as const;

export const zh: BaseTranslation = {
  common: {
    search: "搜索图书...",
    noBooks: "当前没有可用的图书",
    tryAgain: "请稍后再试..",
    error: "出错了",
    oops: "糟糕",
    bookInfo: "图书详情",
  },
  sort: {
    title: "标题",
    releaseDate: "日期",
    pages: "页数",
  },
  bookDetails: {
    releaseDate: "发布日期",
    pages: "页数",
  },
  tabs: {
    home: "首页",
    favorites: "收藏",
  },
} as const;
