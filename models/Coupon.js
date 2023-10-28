import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    coupon: {
      type: String,
      trim: true,
      unique: true,
      uppercast: true,
      required: true,
      minLength: 6,
      maxLength: 12,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;
