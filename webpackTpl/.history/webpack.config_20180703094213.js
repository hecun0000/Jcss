const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入html-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入
const webpack = require("webpack");

module.exports = {
    entry: './src/js/main.js',
    output: {                        //出口文件
        filename: "[name].bundle.[hash].js", //[hash]会在后面生成随机hash值
        path: path.join(__dirname, "dist")
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader','postcss-loader']
            },
            {
                test:/\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/', //输出到images文件夹
                        limit: 500 //是把小于500B的文件打成Base64的格式，写入JS
                    }
                }]
            }

        ],
    },
    plugins: [ // 对应的插件
        new HtmlWebpackPlugin({ //配置
            filename: 'index.html', //输出文件名
            template: './index.html', //以当前目录下的index.html文件为模板生成dist/index.html文件
        }),
        new CleanWebpackPlugin(['dist']), //传入数组,指定要删除的目录
        // 热更新，热更新不是刷新
        new webpack.HotModuleReplacementPlugin(),
        
    ],
    devServer: {
        inline: true, //打包后加入一个websocket客户端
        hot: true, //热加载
        contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
        host: 'localhost', //主机地址
        port: 9090, //端口号
        compress: true //开发服务器是否启动gzip等压缩
    },
   
}


