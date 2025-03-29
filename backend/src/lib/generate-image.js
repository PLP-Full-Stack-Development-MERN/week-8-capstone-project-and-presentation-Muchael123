import Replicate from "replicate";
import { writeFile } from "node:fs/promises";
import Cloudinary from "../config/cloudinary.js";

export default async function generateImage(prompt) {
    const replicate = new Replicate({ auth: process.env.REPLICATE_AUTH });

    const input = {
        prompt: prompt,
        output_format: "png",
        guidance: 3.5,
        aspect_ratio: "1:1",
    };

    try {
        const output = await replicate.run("black-forest-labs/flux-dev", { input });
        console.log("output", output);

        // 🛠️ Ensure the output is a valid URL
        if (!output) return null;

        // 🛠️ Download the image and upload it to Cloudinary
        const response = await fetch(output);
        console.log("response", response);
        if (!response.ok) {
            console.rror(`Failed to fetch image: ${response.statusText}`);
        }
        const buffer = await response.buffer();
        const fileName = `image-${Date.now()}.png`;
        await writeFile(fileName, buffer);


        const cloudinaryResponse = await Cloudinary.uploader.upload(fileName, {
            folder: "images",
            public_id: fileName,
            overwrite: true,
        });

        // 🛠️ Clean up the local file after uploading
        await unlink(fileName);
        console.log("Cloudinary response:", cloudinaryResponse);

        return {url:cloudinaryResponse.secure_url, public_id: cloudinaryResponse.public_id};
    } catch (err) {
        console.log("Error:", err);
        return null;
    }
}
