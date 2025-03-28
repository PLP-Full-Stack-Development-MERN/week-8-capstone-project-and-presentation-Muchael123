import mongoose from "mongoose";


const storySchema = new mongoose.Schema({
    title: {type: String, required: true},
    ownerid: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    state: {type: String, enum: ['draft', 'published'], default: 'draft'},
    chapters: [
        {
            chapter_title: {type: String, required: true},
            chapter_textt: {type: String, required: true},
            chapter: {type: Number, required: true},
        }
    ],
    coverimage: {
        url: {type: String, required: true},
        public_id: {type: String, required: true},
    }
}, {versionKey: false, timestamps: true});

const Story = mongoose.model('Story', storySchema);
export default Story;