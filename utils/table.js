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

export const getCouponsTableColumns = () => {
  return [
    {
      id: "coupon",
      numeric: false,
      disablePadding: true,
      label: "Coupon",
    },
    {
      id: "discount",
      numeric: true,
      disablePadding: false,
      label: "Discount",
    },
    {
      id: "startDate",
      numberic: false,
      disablePadding: false,
      label: "Start date",
    },
    {
      id: "endDate",
      numberic: false,
      disablePadding: false,
      label: "End date",
    },
  ];
};

export const getProductsTableColumns = () => {
  return [
    {
      id: "coupon",
      numeric: false,
      disablePadding: true,
      label: "Coupon",
    },
    {
      id: "discount",
      numeric: true,
      disablePadding: false,
      label: "Discount",
    },
    {
      id: "startDate",
      numberic: false,
      disablePadding: false,
      label: "Start date",
    },
    {
      id: "endDate",
      numberic: false,
      disablePadding: false,
      label: "End date",
    },
  ];
};
