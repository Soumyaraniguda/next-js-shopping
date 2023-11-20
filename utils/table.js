export const getSubCategoriesTableColumns = () => {
  return [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "parentCategory",
      numeric: false,
      disablePadding: false,
      label: "Parent category",
    },
  ];
};
