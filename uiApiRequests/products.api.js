import axios from "axios";

export const getProducts = async () => {
  return await axios.get(`/api/product`);
};

export const getProductDetails = async (productId) => {
  return await axios.get(`/api/product/${productId}`);
};

export const getProductsWithFilteredData = async (filteredDataToFetch) => {
  return await axios.post(`/api/product/filter-data`, {
    filterData: filteredDataToFetch,
  });
};
