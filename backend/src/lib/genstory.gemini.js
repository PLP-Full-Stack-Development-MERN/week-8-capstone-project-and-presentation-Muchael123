import chatSession from "../config/Gemini.js";

export default async function GenAiStory (storySubject, storyType, ageGroup, imageStyle) {
    try{
        const storyPrompt = `Age group: ${ageGroup}, Story type: ${storyType}, Subject: ${storySubject}, image style: ${imageStyle}`;
    const result = await chatSession.sendMessage(storyPrompt);
    const responseText = result?.response.text();
    console.log("responseText", responseText);
    // cut to where ```json and upto ```
    const jsonString = responseText.split("```json")[1];
    const jsonString2 = jsonString.split("```")[0];
    // remove the ```json\n and ``` from the string
    const jsonString3 = jsonString2.replace(/```json\n/, "").replace(/```/, "");
    // parse the json string to json object
    const jsonObject = JSON.parse(jsonString3);
    console.log("jsonObject", jsonObject);
    return jsonObject;
    } catch (e) {
        console.log("An error occured while generating the story", e);
        return null;
    }
}