// import { getSignature, saveToDatabase } from "@/utils/fileupload";
// import { useState } from "react";

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   // const [filename, setFilename] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files);
//     // setFilename(event.target.files[0].name);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!file) return;

//     // get a signature using server action
//     const { timestamp, signature } = await getSignature();

//     // upload to cloudinary using the signature
//     const formData = new FormData();

//     console.log(file);

//     Array.from(file).forEach((f) => {
//       formData.append("file", f);
//     });

//     formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
//     formData.append("signature", signature);
//     formData.append("timestamp", timestamp);
//     formData.append("folder", "praveen");

//     const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
//     const data = await fetch(endpoint, {
//       method: "POST",
//       body: formData,
//     }).then((res) => res.json());

//     // write to database using server actions
//     await saveToDatabase({
//       version: data?.version,
//       signature: data?.signature,
//       public_id: data?.public_id,
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input type="file" multiple onChange={handleFileChange} />
//         </div>
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// }

// export default FileUpload;
