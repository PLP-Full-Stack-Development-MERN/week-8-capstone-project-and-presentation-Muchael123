import Cloudinary from "../config/cloudinary.js";

async function convertToBase64(imgdata) {
  try {
    const response = await fetch(imgdata.url);
    const buffer = await response.arrayBuffer(); // Fetch image as buffer
    const base64Image = Buffer.from(buffer).toString("base64"); // Convert to Base64
    return `data:image/png;base64,${base64Image}`; // Ensure correct format
  } catch (e) {
    console.error("Error converting to Base64:", e);
    return null;
  }
}

export default async function saveImageToCloudinary(imageData) {
  console.log("imageData", imageData);

  const baseimg = await convertToBase64(imageData);
  if (!baseimg) return null; 

  try {
    const cloudinaryResponse = await Cloudinary.uploader.upload(baseimg, {
      folder: "story-yetu/stories",
      resource_type: "image",
    });

    console.log("Cloudinary response: ", cloudinaryResponse);

    return {
      url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
    };
  } catch (e) {
    console.error("Error uploading to Cloudinary:", e);
    return null;
  }
}
