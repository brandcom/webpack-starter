const chokidar = require('chokidar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
    entry: {
        main: './src/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].min.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['autoprefixer']],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.svg$/i,
                issuer: {
                    test: /\.scss$/i,
                },
                loader: 'url-loader',
            },
            {
                test: /\.svg$/i,
                include: __dirname + '/src/img/sprites',
                use: ['svg-sprite-loader', 'svgo-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
    ],
    devServer: {
        index: '',
        contentBase: false,
        open: true,
        before: (app, server) => {
            chokidar.watch(['./path/to/php/tempaltes/**/*.php']).on('all', () => {
                server.sockWrite(server.sockets, 'content-changed');
            });
        },
        proxy: {
            context: () => true,
            target: 'https://example.test',
            secure: false,
            changeOrigin: true,
            onError(err) {
                console.log('Suppressing WDS proxy upgrade error:', err);
            },
        },
        https: true,
        port: 3000,
        hot: true,
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};
