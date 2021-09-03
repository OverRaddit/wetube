import mongoose from "mongoose";

export const formatHashtags = (hashtags) =>
	hashtags.split(",").map((word) => word.startsWith('#') ? word : `#${word}`);

const videoSchema = new mongoose.Schema({
	title: {type: String, required:true },
	fileUrl: {type:String, required: true},
	description: {type: String, required:true },
	createdAt: {type: Date, required:true, default: Date.now },
	hashtags: [{type: String}],
	meta: {
		views: {type: Number, default:0, required:true },
		rating: {type: Number, default:0, required:true },
	},
	owner: {type: mongoose.Schema.Types.ObjectId, required:true, ref: "User"}	// 굉장히 중요한 줄이다.
});

// Video.formatHashtags(hashtags) 로 사용할 수 있음!!!
videoSchema.static('formatHashtags', function(hashtags) {
	return hashtags.split(",").map((word) => word.startsWith('#') ? word : `#${word}`)
})
const movieModel = mongoose.model("Video", videoSchema);
export default movieModel;
