const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // date: {
    //   type: Date,
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String
  },
  { timestamps: true }
);



const picSchema = new Schema({
  piccontent: { type: String, required :true},
  caption: { type: String, required: true},
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, },
  comments: [commentSchema],
});

module.exports = mongoose.model("Picture", picSchema);

