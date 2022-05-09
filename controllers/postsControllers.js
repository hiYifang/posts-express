const { successHandle, errorHandle } = require('../service/handle');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');

module.exports = {
  /* GET */
  async getPosts(req, res) {
    try {
      const { q, sort = 'desc' } = req.query;
      console.log(req.query.sort)
      const filter = q ? { content: new RegExp(q) } : {};
      const postData = await Post.find(filter)
        .populate({
          path: "editor",
          select: "nickName avatar"
        })
        .sort({createdAt: sort === 'desc' ? -1 : 1});
      successHandle(res, "取得資料成功", postData);
    } catch (err) {
      errorHandle(res, err.message);
    }
  },
  /* Post */
  async insertPost(req, res) {
    try {
      let { content, image } = req.body;
      if (!content) {
        errorHandle(res, "新增失敗，請確認貼文的內容欄位");
      } else if (image && !image.startsWith('https')) {
        errorHandle(res, "新增失敗，請確認貼文的圖片網址");
      } else {
        // 新增至 model，先固定使用者 ID
        const editorId = '627711de7054bea4d2447408';
        await Post.create({ content, image, editor: editorId });
        // 回傳成功
        successHandle(res, "成功新增一則貼文", `由 ${editorId} 發文`)
      }
    } catch (err) {
      // 回傳失敗
      errorHandle(res, err.message);
    }
  }
}