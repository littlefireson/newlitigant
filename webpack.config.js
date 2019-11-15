var path = require ('path');
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin  = require("copy-webpack-plugin");
module.exports={
    mode: 'development',
    entry:[
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            'webpack-dev-server/client?http://0.0.0.0:3000',
            './src/index.js'
        ],
    // devtool: 'source-map',
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, 'litigant'),
        filename: 'js/[name].[hash:8].js',//以文件内容的MD5生成Hash名称的script来防止缓存
        chunkFilename:'js/[name].[hash:8].js',
        publicPath: '/',//生成的html里的引用路径用 publicPath
    },
    devServer: {
        contentBase: path.join(__dirname, "litigant"),
        compress: true,
        hot: true,
        https:true,
        port: 3000,
        publicPath:'/',
        historyApiFallback: true,
        disableHostCheck: true,
        host: "0.0.0.0"
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ['babel-loader'],
                exclude: [path.resolve(__dirname, 'node_modules')]
            },
            {
                test: /\.(css|less)$/,
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[{
                        loader:'css-loader',
                        options: {sourceMap: true}
                    },{
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('cssgrace'),
                                    require('autoprefixer')(),
                                    // require('postcss-flexibility'),
                                ];
                            },
                        }
                    },{
                        loader: 'less-loader',
                        options: {
                            modifyVars:{'@primary-color':'#20c1dc'},
                        }
                    }]
                })
            },{
                test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf)\??.*$/,
                use: ['url-loader?limit=8192&name=font/[hash:8].[name].[ext]']
            }]

    },
    plugins: [
        new webpack.DefinePlugin({
            // 'SERVER_BASE': JSON.stringify('http://192.168.2.13:8280/api-core-service/api/')
            // 'SERVER_BASE': JSON.stringify('https://cloud.zhac.org.cn/api-core-service/api/')
            'SERVER_BASE': JSON.stringify('https://arbi-hn-test.seata.cn/api-core-service/api/')
        }),
        new OpenBrowserPlugin({url: 'https://localhost:3000'}), 
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true, // 自动注入
        }),
        new ExtractTextPlugin({
            filename: 'app.[hash].css',
            allChunks: true,
            disable: false
        }),
        new CopyWebpackPlugin([
            {from: './src/static/',to: path.resolve(__dirname, 'litigant/static/')}
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}