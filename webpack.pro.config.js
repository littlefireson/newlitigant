var path = require ('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CopyWebpackPlugin  = require("copy-webpack-plugin");
var baseURL = '';
switch (process.env.BDTYPE){
    case 'arbi-test-hn':
        // baseURL = 'http://www.1v1.one:8121/api-core-service/api/';
        // baseURL = 'https://www.1v1.one:8126/api-core-service/api/';
        // baseURL = 'http://192.168.2.3:8121/api-core-service/api/';
        // baseURL = 'https://192.168.2.3:8126/api-core-service/api/';
        // baseURL = 'https://www.1v1.one:1301/api-core-service/api/';
        baseURL = 'https://arbi-hn-test.seata.cn/api-core-service/api/';
        break;
    case 'uat':
        baseURL = 'http://192.168.2.8:8117/api-core-service/api/';
        break;
    case 'arbi-prod-hn':
        baseURL = 'https://fiac.hnac.org.cn/api-core-service/api/';
        break;
    default:
        baseURL = 'https://fiac.hnac.org.cn/api-core-service/api/';
        // baseURL = 'https://www.e-arbitral.org.cn/api-core-service/api/';
        // baseURL = 'https://arbitest.speedjustice.com/api-core-service/api/';
}
module.exports={
    entry: {
        app: ['babel-polyfill','./src/index.js'],
        vendor: ['react','react-dom','prop-types','react-router-dom','redux','react-redux'],
        // flexibility: ['./src/utils/flexibility.js'],
    },
    output: {
        path: path.resolve(__dirname, 'litigant'),
        filename: 'js/[name].[hash:8].js',//以文件内容的MD5生成Hash名称的script来防止缓存
        chunkFilename:'js/[name].[hash:8].js',
        publicPath: '',//生成的html里的引用路径用 publicPath
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ['babel-loader'],
                exclude: [path.resolve(__dirname, 'node_modules'),path.resolve(__dirname, './assets')]
            },
            {
                test: /\.(css|less)$/,
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[{
                        loader:'css-loader',
                        options: {
                           minimize: true
                        }
                    },{
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('cssgrace'),
                                    require('autoprefixer')(),
                                    // require('postcss-flexibility'),
                                ];
                            }
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
                use: ['url-loader?limit=8192&name=assets/[hash:8].[name].[ext]']
            }]

    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 name: "vendor",
    //                 chunks: "initial",
    //                 minChunks: 2
    //             }
    //         }
    //     }
    // },
    // optimization: {
    //     runtimeChunk: {
    //       name: 'manifest'
    //     },
    //     minimizer: [new UglifyJsPlugin({
    //         test: /\.js($|\?)/i
    //     })], // [new UglifyJsPlugin({...})]
    //     splitChunks:{
    //       chunks: 'all',
    //       minSize: 30000,
    //       minChunks: 1,
    //       maxAsyncRequests: 5,
    //       maxInitialRequests: 3,
    //       name: false,
    //       cacheGroups: {
    //         vendor: {
    //           name: 'vendor',
    //           chunks: 'initial',
    //           priority: -10,
    //           reuseExistingChunk: false,
    //           test: /node_modules\/(.*)\.js/
    //         },
    //         styles: {
    //           name: 'styles',
    //           test: /\.(less|css)$/,
    //           chunks: 'all',
    //           minChunks: 1,
    //           reuseExistingChunk: true,
    //           enforce: true
    //         }
    //       }
    //     }
    //   },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('production'),
            'SERVER_BASE': JSON.stringify(baseURL)
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor'],//将公共模块提出
        //     minChunks: Infinity//提取所有entry共同依赖的模块
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: false,
        //     }
        // }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true, // 自动注入
            minify: {
                removeComments: true,        //去注释
                collapseWhitespace: true,    //压缩空格
                removeAttributeQuotes: true  //去除属性引用
            },
        }),
        new CopyWebpackPlugin([
            {from: './src/static/',to: path.resolve(__dirname, 'litigant/static/')}
        ]),
        new ExtractTextPlugin({
            filename: 'app.[hash].css',
            allChunks: true,
            disable: false
        }),
    ]
}