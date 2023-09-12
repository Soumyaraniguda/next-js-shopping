import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please enter your full name",
    },
    email: {
      type: String,
      unique: [true, "Email already exist!"],
      required: [true, "Email is required!"],
      trim: true, // Remove spaces
    },
    password: {
      type: String,
      rquired: "Please enter a password",
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png",
    },
    emailVerfified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// The "models" object is provided by the Mongoose Library and stores all the registered models.
// If a model named "User" already exist in the "models" object, it assigns that exisiting model
// to the "User" variable
// This prevents redefining the model and ensures that the exisiting model is reused.

// If a model named "User" does not exist in the "models" object, the "model" function from
// Mongoose is called to create a new model
// This newly created model is then assigned to the "User" variable

// This route is called every time when the connection is established every single time from scratch
// So we need to make this additional check

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
