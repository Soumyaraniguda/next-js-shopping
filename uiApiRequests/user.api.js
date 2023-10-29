import axios from "axios";

export const saveCart = async (cart, user_id) => {
  try {
    const { data } = await axios.post("api/cart/save", {
      cart,
      user_id,
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

export const getCart = async (userId) => {
  return await axios.get(`api/cart?userId=${userId}`);
};

export const saveAddress = async (shippingAddress, userId) => {
  try {
    const data = await axios.post("/api/user/shipping-address", {
      shippingAddress,
      userId,
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

export const updateActiveAddress = async (id) => {
  try {
    const data = await axios.put("/api/user/shipping-address", {
      addressId: id,
    });
    return data;
  } catch (error) {
    return error.response;
  }
};

export const deleteAddress = async (id) => {
  try {
    const data = await axios.delete(`/api/user/shipping-address?id=${id}`);
    return data;
  } catch (error) {
    return error.response;
  }
};

export const applyCoupon = async (coupon) => {
  try {
    const data = await axios.post(`/api/user/apply-coupon`, { coupon });
    console.log("data =", data);
    return data;
  } catch (error) {
    return error.response;
  }
};

export const placeOrder = async (payload) => {
  try {
    const data = await axios.post(`/api/user/place-order`, { ...payload });
    console.log("data =", data);
    return data;
  } catch (error) {
    return error.response;
  }
};
