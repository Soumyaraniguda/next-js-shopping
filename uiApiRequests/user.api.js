import axios from "axios";

export const saveCart = async (cart, user_id) => {
  try {
    const { data } = await axios.post("api/cart/save", {
      cart,
      user_id,
    });
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getCart = async (userId) => {
  return await axios.get(`api/cart?userId=${userId}`);
};
