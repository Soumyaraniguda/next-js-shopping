import jwt from "jsonwebtoken";

export const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "2d", // expires in 2 days
  });
};

export const createResetPasswordToken = (payload) => {
  return jwt.sign(payload, process.env.RESET_PASSWORD_TOKEN_SECRET, {
    expiresIn: "6h", // expires in 6 hours
  });
};

export const verifyResetPasswordToken = (token) => {
  const validToken = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);
  return validToken;
};

export const verifyJwtToken = (token) => {
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  return verifyToken;
};

export const getPaypalKeys = () => {
  return {
    id: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  };
};
