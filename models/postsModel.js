const mongoose = require('mongoose');

// 建立 Schema
const postsSchema = new mongoose.Schema(
  {
    editor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "請填寫創作者 ID"]
    },
    content: {
      type: String,
      required: [true, '請填寫貼文內容'],
    },
    image: {
      type: String,
      default: ""
    },
    // 設計稿 8.我按讚的貼文
    likes: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  {
    versionKey: false
  }
);

// 建立 Model
const Post = mongoose.model('Post', postsSchema);

module.exports = Post;