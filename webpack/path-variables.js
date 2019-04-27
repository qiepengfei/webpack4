const path = require('path');
// 定义路径
module.exports = {
    ROOT_PATH: path.resolve(__dirname, '../'),
    SRC_PATH: path.resolve(__dirname, '../src'), // src路径
    DIST_PATH: path.resolve(__dirname, '../dist'), // 输出文件夹
    NODE_MODULES: path.resolve(__dirname, '../node_modules'), // node目录
    STATIC_PATH: path.resolve(__dirname, '../src/static'), // 静态资源路径
    VIEW_PATH: path.resolve(__dirname, '../src/views'), // 页面资源路径
    PUBLIC_PATH: '/'
};
