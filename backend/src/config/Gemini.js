import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "Generate a 5 chapter lively and vivid story reflecting on moral values and life lessons. The story should be suitable for ${ageGroup} readers. The story should be a ${storyType} story about ${storySubject}. The story should be engaging and thought-provoking. Also generate the image prompt for each chapter of the story. The image prompt should be in ${imageStyle} style. The story should be in English.if the title is English, respond in English, else respond in Swahiili. The story should be in a JSON format with the following structure: {title: string, cover_image_prompt: string, chapters: [{chapter_title: string, chapter_text: string}]}",
  });
  

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "storyType:  Trickster, storySubject: The hare and the hyena , imageStyle:  3d, ageGroup: 8-12 years\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"title\": \"Hare's Wits vs. Hyena's Hunger\",\n  \"cover_image_prompt\": \"A vibrant 3D scene of a clever hare with bright eyes mischievously grinning, standing before a menacing hyena with sharp teeth in a lush African savanna. Golden sunlight bathes the scene, highlighting the contrast between the two characters. The background features acacia trees and tall grass.\",\n  \"chapters\": [\n    {\n      \"chapter_title\": \"The Hyena's Empty Belly\",\n      \"chapter_text\": \"Hyena, with a tummy rumbling louder than a thunderstorm, stomped through the savanna. 'Oh, woe is me!' he groaned. 'I haven't eaten a decent meal in days! A juicy zebra, a plump wildebeest… even a small field mouse would do!' He sniffed the air, his nose twitching. The aroma of ripe mangoes drifted by. 'Mangoes?' he scoffed. 'Rabbit food! I need meat!' Just then, he spotted Hare, looking as innocent as a daisy, nibbling on a blade of grass.\",\n      \"image_prompt\": \"A 3D image depicting a skinny, sad-looking hyena with a hollow belly, stomping through dry savanna grass. Dust swirls around his feet. His ribs are visible, and his expression is one of desperate hunger. In the background, a single mango tree is visible, laden with ripe fruit.\"\n    },\n    {\n      \"chapter_title\": \"Hare's 'Secret' Garden\",\n      \"chapter_text\": \"Hyena licked his lips. 'Hare!' he bellowed. 'You look rather… tasty.' Hare, without a flicker of fear, hopped closer. 'Tasty? Oh, dear Hyena, you wound me! I'm just bones and fur. But,' he lowered his voice conspiratorially, 'I know where the juiciest, fattest… caterpillars… are hiding. In Farmer Giles's garden! They're bigger than your paw!' Hyena's eyes widened. 'Caterpillars that big? Lead the way!' He completely forgot about eating Hare.\",\n      \"image_prompt\": \"A 3D rendering of Hare looking up at a towering Hyena. Hare is positioned as if he is revealing a secret. His eyes are wide and innocent, and he gestures with his paw towards an unseen location. Hyena is drooling slightly, with a look of greedy anticipation on his face.\"\n    },\n    {\n      \"chapter_title\": \"The Chili Pepper Patch\",\n      \"chapter_text\": \"Hare led Hyena to Farmer Giles's garden, which was surrounded by a tall, thorny fence. 'The caterpillars are just beyond that fence,' Hare said, pointing to a vibrant patch of plants. 'But be warned! They're guarded by… prickly leaves!' Hyena, blinded by hunger, didn't notice the plants were covered in bright red chili peppers. He charged through the fence, landing right in the middle of the chili patch. 'Achoo! Achoo! Aaaaaaah!' He roared, his mouth burning like fire.\",\n      \"image_prompt\": \"A dynamic 3D shot of Hyena bursting through a wooden fence into a garden patch. The garden is filled with bright green plants covered in vibrant red chili peppers. Hyena's face is contorted in surprise and pain, with smoke and tiny flames emanating from his mouth.\"\n    },\n    {\n      \"chapter_title\": \"The Great Escape\",\n      \"chapter_text\": \"Hare watched Hyena's fiery dance with amusement. 'Perhaps they were too spicy for you!' he chuckled. Farmer Giles, alerted by the commotion, came running with a watering can. 'Get out of my garden, you beast!' he yelled, drenching Hyena with water. The water only made the chili burn worse. Hyena, tears streaming down his face, scrambled out of the garden and ran away as fast as his legs could carry him. 'Caterpillars!' he howled. 'I'll never eat another caterpillar again!'\",\n      \"image_prompt\": \"A 3D scene of Hyena running away from a farm garden, his face red and swollen. Farmer Giles is chasing him with a watering can, spraying him with water. Hare sits on a nearby rock, watching the scene with a mischievous grin. The garden is in disarray, with broken plants and scattered chili peppers.\"\n    },\n    {\n      \"chapter_title\": \"A Lesson Learned (Maybe)\",\n      \"chapter_text\": \"Hare watched Hyena disappear over the horizon. He knew Hyena hadn't learned his lesson about bullying. But he'd learned that cleverness could overcome even the biggest, hungriest bully. And maybe, just maybe, Hyena would think twice before trying to eat a seemingly small and innocent hare. Hare hopped off, whistling a merry tune, ready for his next adventure. He reminded himself that even though tricks can be fun, honesty and kindness are always the best way.\",\n      \"image_prompt\": \"A wide 3D shot of Hare sitting on a hilltop, overlooking the savanna. He is silhouetted against a setting sun, with a thoughtful expression on his face. In the distance, a tiny figure of Hyena can be seen disappearing over the horizon. The scene conveys a sense of peace and reflection.\"\n    }\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

export default chatSession;