const os = require('os');
const path = require('./path-variables');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HappyPack = require('happypack');

// 根据系统的内核数量指定线程池个数
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', './src/static/js/homepage/main.js'],
    output: {
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].js',
        path: path.DIST_PATH ,
        publicPath: '/'
    },
    module: {
        rules: [
            // js和jsx
            {
                test: /\.(js|jsx)$/,
                loader: 'happypack/loader',
                exclude: /node_modules/,
                // include: [`${path.STATIC_PATH}/js`, `${path.STATIC_PATH}/sw.js`]
            },
            // css和scss
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss',
                            plugins: [
                                autoprefixer({
                                    browsers: ['Android >= 7.0', 'ios >= 8']
                                })
                            ]
                        }
                    }
                ]
            },
            // img
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: 'file-loader',
                            limit: 20480, // 20kb
                            name: `static/img/[name].[ext]`
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true // webpack@2.x and newer
                        }
                    }
                ],
                // include: [`${path.STATIC_PATH}/img`]
            },
            // font
            {
                test: /\.(woff|eot|ttf|svg)(\?(\w|#)+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/css/fonts/[name].[ext]'
                        }
                    }
                ],
                // include: [`${path.STATIC_PATH}/css/fonts`]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        mainFields: ['jsnext:main', 'browser', 'main'], // 优先采用的第三方模块的语法
        alias: {
            css: `${path.STATIC_PATH}/css`,
            util: `${path.STATIC_PATH}/js/util/main.js`,
            widget: `${path.STATIC_PATH}/js/widget`,
            commonComponents: `${path.STATIC_PATH}/js/commonComponents`
        }
        // modules: [`${path.STATIC_PATH}/js`, 'node_modules'] 基本没影响
    },
    plugins: [
        new CleanWebpackPlugin('./dist/*', {
            root: path.ROOT_PATH,
            verbose: true,
            dry: false          
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/views/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        // todo: 不能指定输入路径
        new MiniCssExtractPlugin({
            // filename: 'static/css/[name].css"',
            // chunkFilename: 'static/css/[name].css'
        }),
        new HappyPack({
            loaders: ['babel-loader?cacheDirectory'],
            threadPool: happyThreadPool,
            verbose: false
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: { disable: true }, // 避免autoprefixer的前缀被移除
                    discardComments: {
                        removeAll: true // 移除注释
                    }
                },
                canPrint: true
            })    
        ]
    },
    devServer: {
        hot: true,
        contentBase: path.DIST_PATH,
        compress: true,
        port: 7777,
        host: 'localhost',
        historyApiFallback: {
            rewrites: [
                { from: /^\/m1\/tmplogin/, to: '/views/templogin.html' },
                { from: /^\/m1?\/noauth/, to: '/views/noauth.html' },
                { from: /^\/m1\/.*/, to: '/views/index.html' }
            ]
        },
        open: true,
        openPage: 'aceshi1',
        // https: true,
        proxy: [
            {
                context: ['/api/**', '**/*.ajax'],
                // target: 'http://yf.msz.jd.com/', // 预发
                target: 'http://bpp-api.jd.com/bppapi/msz/', // 本地mock数据
                secure: true,
                changeOrigin: true
            }
        ],
        stats: {
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
            colors: true,
            performance: true
        }
    }
};