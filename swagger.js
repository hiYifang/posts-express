const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'MetaWall API',
    description: 'MetaWall API 文件',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
  tags: [
    {
      name: 'Posts',
      description: '貼文'
    },
    {
      name: 'Users',
      description: '會員'
    },
  ],
  definitions: {}
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);