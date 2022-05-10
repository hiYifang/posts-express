const { getHttpResponse, getErrorMessage } = require('../service/handle');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');

const posts = {
  getPosts: async (req, res) => {
    /**
      * #swagger.tags = ['Posts']
      * #swagger.summary = '取得全部貼文'
    */
    /**
      * #swagger.parameters['q'] = {
        in: 'query',
        description: '關鍵字',
        type: 'string',
      }
      #swagger.parameters['sort'] = {
        in: 'query',
        description: '排序方式，desc 由新到舊，asc 由舊到新',
        type: 'string',
      }
    */
    try {
      const { q, sort = 'desc' } = req.query;
      const filter = q ? { content: new RegExp(q) } : {};
      const posts = await Post.find(filter)
        .populate({
          path: "editor",
          select: "nickName avatar"
        })
        .sort({ createdAt: sort === 'desc' ? -1 : 1 });
      /**
        * #swagger.responses[200] = {
          description: '成功取得資料',
          schema: { $ref: '#/definitions/Posts' }
        }
      */
      res.status(200).json(getHttpResponse({ data: posts }));
    } catch (err) {
      /**
        * #swagger.responses[400] = {
          description: '取得資料失敗',
          schema: { $ref: '#/definitions/Error' }
        }
     */
      res
        .status(400)
        .json(getHttpResponse({ success: false, data: err }));
    }
  },
  insertPost: async (req, res) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '新增一則貼文'
    */
    /**
     * #swagger.parameters['parameters_name'] = {
        in: 'body',
        description: '貼文資訊',
        schema: {
          $content: '貼文內容',
          image: '貼文圖片來源'
        }
      }
    */
    try {
      let { content, image } = req.body;
      if (!content) {
        throw getErrorMessage({ field: 'content', msg: '新增失敗，請確認貼文的內容欄位' });
      } else if (image && !image.startsWith('https')) {
        throw getErrorMessage({ field: 'image', msg: '新增失敗，請確認貼文的圖片網址' });
      } else {
        // 新增至 model，先固定使用者 ID
        const editorId = '627711de7054bea4d2447408';
        const post = await Post.create({ content, image, editor: editorId });
        /**
         * #swagger.responses[200] = {
            description: '成功新增貼文',
            schema: { $ref: '#/definitions/Posts' }
          }
        */
        res.status(200).json(getHttpResponse({ data: post }));
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

module.exports = posts;