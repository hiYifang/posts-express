const { getHttpResponse, getErrorMessage } = require('../service/handle');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');

const users = {
  register: async (req, res) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = '註冊一位會員'
    */
    /**
     * #swagger.parameters['parameters_name'] = {
        in: 'body',
        description: '會員資訊',
        schema: {
          $nickName: '會員暱稱',
          $email: 'name@gmail.com',
          $password: 'name1234'
        }
      }
    */
    try {
      let { nickName, email, password } = req.body;
      const emailExist = await User.findOne({email});
      if (!nickName) {
        throw getErrorMessage({ field: 'nickName', msg: '註冊失敗，請填寫暱稱欄位' });
      } else if (nickName && nickName.length < 2) {
        throw getErrorMessage({ field: 'nickName', msg: '暱稱至少 2 個字元以上' });
      } else if (!email) {
        throw getErrorMessage({ field: 'email', msg: '註冊失敗，請填寫 Email 欄位' });
      } else if (emailExist) {
        throw getErrorMessage({ field: 'email', msg: 'Email 已被註冊，請替換新的 Email' });
      } else if (!password) {
        throw getErrorMessage({ field: 'password', msg: '註冊失敗，請填寫 Password 欄位' });
      }else if (password && password.length < 8) {
        throw getErrorMessage({ field: 'password', msg: '密碼需至少 8 碼以上，並英數混合' });
      } else {
        // 新增至 model
        const user = await User.create({ nickName, email, password });
        /**
         * #swagger.responses[200] = {
            description: '成功註冊會員',
            schema: { $ref: '#/definitions/Users' }
          }
        */
        res.status(200).json(getHttpResponse({ data: user }));
      }
    } catch (err) {
      /**
        #swagger.responses[400] = {
          description: '新增貼文失敗',
          schema: { $ref: '#/definitions/Error' }
        }
     */
        res
        .status(400)
        .json(getHttpResponse({ success: false, data: err }));
    }
  }
}

module.exports = users;