import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackFavicons from 'webpack-favicons';
import json5 from 'json5';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default  {
    entry: {
        app: './public/app/index.js',
        staff: './public/staff/index.js'
    },
    mode: 'production',
    devtool: false,
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: 'auto'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/app/index.html',
            filename: "index.html",
            chunks: ["app"],
            title: "FCN Bar",
	        minify: {
        	    collapseWhitespace: true,
        	    removeComments: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/staff/index.html',
            filename: "staff/index.html",
            chunks: ["staff"],
            title: "FCN Bar Staff",
	        minify: {
        	    collapseWhitespace: true,
        	    removeComments: true,
            },
        }),
        new WebpackFavicons({
            src: './public/favicon.svg',
            path: 'img',
	        cache: true,
	        mode: 'light',
            background: '#000',
            theme_color: '#f00',
            icons: { favicons: true }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                type: 'asset/inline'
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                }
            },
        ],
    },
};
