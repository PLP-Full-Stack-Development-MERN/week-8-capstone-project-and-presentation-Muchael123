import Joi from "joi";
// storySubject, storyType, ageGroup, imageStyle
const schema = Joi.object({
    storySubject: Joi.string().required(),
    storyType: Joi.string().valid('Folktale', 'Trickster', 'Heroic', 'Mythology', 'Moral', 'Supernatural').required(),
    ageGroup: Joi.string().valid('3 - 5 Years', '5 - 7 Years', '8 - 12 Years', '13 - 15 Years').required(),
    imageStyle: Joi.string().valid('3D Cartoon', 'Pixel Art', 'Paper Cut', 'Watercolor', 'Flat Illustration', 'Hand-Drawn Sketch').required()
})
export default function validateStory(req,res,next){
    const {error} = schema.validate(req.body, { abortEarly: false });
    console.log("error",error); 
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
      }
    next();
}