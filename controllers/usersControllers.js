const { successHandle, errorHandle } = require('../service/handle');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');

module.exports = {
  /* Post */
  async register(req, res) {
    try {
      let { nickName, email, password } = req.body;
      const emailExist = await User.findOne({email});
      if (!nickName) {
        errorHandle(res, "註冊失敗，請填寫暱稱欄位");
      } else if (nickName && nickName.length < 2) {
        errorHandle(res, "暱稱至少 2 個字元以上");
      } else if (!email) {
        errorHandle(res, "註冊失敗，請填寫 Email 欄位");
      } else if (emailExist) {
        errorHandle(res, "Email 已被註冊，請替換新的 Email");
      } else if (!password) {
        errorHandle(res, "註冊失敗，請填寫 Password 欄位");
      }else if (password && password.length < 8) {
        errorHandle(res, "密碼需至少 8 碼以上，並英數混合");
      } else {
        // 新增至 model
        await User.create({ nickName, email, password });
        // 回傳成功
        successHandle(res, "註冊會員成功", `${nickName} 歡迎加入`)
      }
    } catch (err) {
      // 回傳失敗
      errorHandle(res, err.message);
    }
  }
}