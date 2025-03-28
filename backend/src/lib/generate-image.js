import Replicate from "replicate";
import { writeFile } from "node:fs/promises";
import Cloudinary from "../config/cloudinary.js";

export default async function generateImage(prompt) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_AUTH,
    });

    const input = {
        prompt: prompt,
        output_format: "png",
        guidance: 3.5,
        aspect_ratio: "1:1",
    };

    try {
        const [output] = await replicate.run("black-forest-labs/flux-dev", { input });
        console.log("Output URL: ", output);

        if (!output) return null;

        // 1️⃣ Fetch image data from the output URL
        const response = await fetch(output);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 2️⃣ Convert to Base64 correctly
        const base64Image = buffer.toString("base64");
        const dataUrl = `data:image/png;base64,${base64Image}`;

        console.log("dataUrl", dataUrl);

        // 3️⃣ Upload the Base64 image to Cloudinary
        const cloudinaryResponse = await Cloudinary.uploader.upload(dataUrl, {
            folder: "story-yetu/stories",
            resource_type: "image",
        });

        console.log("Cloudinary response: ", cloudinaryResponse);

        if (!cloudinaryResponse) return null;

        return {
            url: cloudinaryResponse.secure_url,
            public_id: cloudinaryResponse.public_id,
        };

    } catch (err) {
        console.error("Error processing image:", err);
        return null;
    }
}
