const path = require('path');

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'temp/'
    },
    devServer: {
        contentBase: './',
        host: '127.0.0.1',
        compress: true,
        port: 9999
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loaders:'babel-loader',
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //处理css
            },
        ],
       
    }
}
