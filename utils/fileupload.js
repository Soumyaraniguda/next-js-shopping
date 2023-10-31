// "use server";

// //https://www.youtube.com/watch?v=gW7DSJ2a6pg&ab_channel=HamedBahram

// import { v2 as cloudinary } from "cloudinary";

// //IMPORTANT: This file should be under app and name should be _actions.js
// //Check the video

// const cloudinaryConfig = cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
//   secure: true,
// });

// export async function getSignature() {
//   const timestamp = Math.round(new Date().getTime() / 1000);

//   const signature = cloudinary.utils.api_sign_request(
//     { timestamp, folder: "praveen" },
//     cloudinaryConfig.api_secret
//   );

//   return { timestamp, signature };
// }

// export async function saveToDatabase({ public_id, version, signature }) {
//   // verify the data
//   const expectedSignature = cloudinary.utils.api_sign_request(
//     { public_id, version },
//     cloudinaryConfig.api_secret
//   );

//   if (expectedSignature === signature) {
//     // safe to write to database
//     console.log({ public_id });
//   }
// }
