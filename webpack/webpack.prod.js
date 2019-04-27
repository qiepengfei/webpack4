const path = require('./path-variables');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	mode: 'none',
    entry: './src/static/js/homepage/main.js',
    output: {
        filename: 'dist/static/js/bundle.js',
        path: path.DIST_PATH 
    },
    module: {
        rules: [
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
        ],
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
        new MiniCssExtractPlugin(),
    ],
    optimization: {
        minimizer: [
        	// todo：不起作用
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
    }
};