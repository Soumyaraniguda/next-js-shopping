import axios from "axios";

export const getCoupons = async () => {
  return await axios.get(`/api/coupons`);
};

const addCoupon = async (data) => {
  return await axios.post(`/api/coupons`, { ...data });
};

const updateCoupons = async (data) => {
  return await axios.put("/api/coupons", { ...data });
};

export const deleteCoupons = async (id) => {
  return await axios.delete(`/api/coupons?id=${id}`);
};

export const saveCoupon = async (data) => {
  if (data.id) {
    return updateCoupons(data);
  } else {
    return addCoupon(data);
  }
};
