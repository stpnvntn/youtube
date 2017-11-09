const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;

const config = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'scripts/scripts.bundle.js',
    },
    devtool: NODE_ENV ? 'production' : 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2'],
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader',
            },
        ],
    },
    eslint: {
        configFile: __dirname + '/.eslintrc.json',
    },
};

if (NODE_ENV === 'production') {
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
        }),
    ];
}

module.exports = config;
