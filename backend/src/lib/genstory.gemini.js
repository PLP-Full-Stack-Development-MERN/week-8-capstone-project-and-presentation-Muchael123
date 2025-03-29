import chatSession from "../config/Gemini.js";

export default async function GenAiStory(storySubject, storyType, ageGroup, imageStyle) {
    try {
        const storyPrompt = `Age group: ${ageGroup}, Story type: ${storyType}, Subject: ${storySubject}, image style: ${imageStyle}`;

        // 🛠️ Ensure we await the response text
        const result = await chatSession.sendMessage(storyPrompt);
        const responseText = result?.response?.text();

        console.log("responseText", responseText);

        // 🛠️ Ensure responseText is valid
        if (!responseText || !responseText.includes("```json")) return null;

        // 🛠️ Extract JSON part correctly
        let jsonString = responseText.split("```json")[1] || responseText.split("```json")[0];
        jsonString = jsonString.split("```")[0];

        // 🛠️ Clean up unwanted markdown formatting
        const cleanJsonString = jsonString.replace(/```json\n?/g, "").replace(/```/g, "");

        // 🛠️ Parse JSON safely
        const jsonObject = JSON.parse(cleanJsonString);
        console.log("jsonObject", jsonObject);

        return jsonObject;
    } catch (e) {
        console.error("An error occurred while generating the story:", e);
        return null;
    }
}
