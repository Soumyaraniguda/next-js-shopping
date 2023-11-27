export const getInitialProductDetails = () => {
  return {
    name: "",
    description: "",
    brand: "",
    sku: "",
    discount: 0,
    images: [],
    description_images: [],
    parent: "",
    category: "",
    subCategories: [],
    color: {
      color: "",
      image: "",
    },
    sizes: [
      {
        size: "",
        qty: "",
        price: "",
      },
    ],
    details: [
      {
        name: "",
        value: "",
      },
    ],
    questions: [
      {
        name: "",
        value: "",
      },
    ],
    shippingFee: "",
  };
};
