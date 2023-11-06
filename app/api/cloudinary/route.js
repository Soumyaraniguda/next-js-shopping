import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
const streamifier = require("streamifier");
import fs from "fs";

// Multiple file upload and create buffer
// https://reacthustle.com/blog/how-to-create-react-multiple-file-upload-using-nextjs-and-typescript

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true, // Works only with https
});

export const POST = async (request) => {
  try {
    const responseImages = [];
    const formData = await request.formData();

    // EXTRACT FILES FROM FORMDATA
    const formDataEntryValues = Array.from(formData.values());
    const files = [];
    for (const formDataEntryValue of formDataEntryValues) {
      if (
        typeof formDataEntryValue === "object" &&
        "arrayBuffer" in formDataEntryValue
      ) {
        files.push(formDataEntryValue);
      }
    }

    // CHECK FOR EMPTY FILES
    if (!files.length) {
      return NextResponse.json(
        { message: "No files chosen" },
        {
          status: 500,
        }
      );
    }

    // CHECK FOR NOT SUPPORTED FILES
    const validFileTypes = ["image/jpeg", "image/png", "image/webp"];
    const hasUnSupportedFile = files.find(
      (file) => !validFileTypes.includes(file.type)
    );
    if (hasUnSupportedFile) {
      return NextResponse.json(
        {
          message:
            "File type not supported. Please upload JPEG, PNG or WEBP files.",
        },
        {
          status: 400,
        }
      );
    }

    // CHECK FOR FILE SIZE
    const maxFileSize = 1024 * 1024 * 1; // 1Mb
    const hasLargeFiles = files.find((file) => file.size > maxFileSize);
    if (hasLargeFiles) {
      return NextResponse.json(
        {
          message: "File size is too large. Select file less than 1Mb.",
        },
        {
          status: 400,
        }
      );
    }

    // CONVERT THE FILE TO BUFFER FORMAT AND UPLOAD TO CLOUDINARY
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buffer = Buffer.from(await file.arrayBuffer());
      // Save to working directory public
      // fs.writeFileSync(`public/${file.name}`, buffer);
      const image = await uploadToCloudinaryHandler(buffer);
      responseImages.push(image);
    }

    return NextResponse.json(responseImages, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

// Upload image with buffer in cloudinary
// https://support.cloudinary.com/hc/en-us/community/posts/360007581379-Correct-way-of-uploading-from-buffer-
const uploadToCloudinaryHandler = async (buffer) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "praveen",
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};

export const DELETE = async (request) => {
  const url = new URL(request.url);
  const imageId = url.searchParams.get("id");
  try {
    const response = await deleteFilesInCloudinary(imageId);
    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

// Upload image with buffer in cloudinary
// https://support.cloudinary.com/hc/en-us/community/posts/360007581379-Correct-way-of-uploading-from-buffer-
const deleteFilesInCloudinary = async (imageId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(imageId, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
