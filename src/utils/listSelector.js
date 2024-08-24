export const listSelector = (list = [], filter = "") => {
  switch (filter) {
    case "asc":
      return list.toSorted((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    case "desc":
      return list.toSorted((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
    case "less18":
      return list.filter((item) => item.price_per_hour < 18);
    case "greater18":
      return list.filter((item) => item.price_per_hour >= 18);
    case "popular":
      return list.toSorted((a, b) => b.rating - a.rating);
    case "unpopular":
      return list.toSorted((a, b) => a.rating - b.rating);
    case "all":
      return list;
    default:
      return list;
  }
};
