import generateImage from "../../lib/generate-image.js";
import GenAiStory from "../../lib/genstory.gemini.js";
import saveImageToCloudinary from "../../lib/saveimage.js";
import Story from "../../models/story.js";
import User from "../../models/user.js";

export default async function createStory(req, res){
    const {storySubject, storyType, ageGroup, imageStyle} =req.body;
    console.log("req.body", req.body, req.userId);
   try{
    const user = await User.findById(req.userId);
    if(!user) return res.status(404).json({message: "User not found"});
    if(user.coins < 1) return res.status(400).json({message: "Not enough coins"});
     const story = await GenAiStory(storySubject, storyType, ageGroup, imageStyle);
     console.log("story", story);
     if(!story) return res.status(500).json({message: "Our model is currently down. Try again later"});
     //TODO:use the image prompt to create the image in replicate
     const imagedata =  await generateImage(`Generate an African landscape book cover for a book wit the title ${story.title} and "Wabunifu Labs" as the publishers at the bottom right of the cover from the prompt  "${story?.cover_image_prompt}"`);
        if(!imagedata) return res.status(500).json({message: "An error occured while generating the image. Try again later"});
        const {url, public_id} = imagedata;
    
    //TODO:store story in mongo database
    const newStory = await Story.create({
        title: story.title,
        ownerid: user._id,
        cover_image: {url, public_id},
        chapters: story?.chapters?.map((chapter, index) => ({
            chapter_textt: chapter.chapter_text,
            chapter_title: chapter.chapter_title,
            chapter: index + 1,
        })),
    })
    console.log("newStory", newStory);
    if(!newStory) return res.status(500).json({message: "An error occured while storing the story"});
    user.coins -= 1;
    await user.save();
    res.status(200).json({message: "Story created successfully", story: newStory._id});
    
   } catch(e){
       console.log("An error occured", e.message);
       res.status(500).json({error: "An error occured. Try again later"})
   }

}