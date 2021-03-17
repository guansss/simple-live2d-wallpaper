const path = require('path');
const merge = require('lodash/merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = {
    entry: './src/index.ts',
    devServer: {
        contentBase: './wallpaper',
        hot: true,

        // see https://webpack.js.org/configuration/dev-server/#devserverbefore
        before(app) {
            // handle the transfer of Wallpaper Engine properties
            // see "/assets/bridge.html"

            // I MUST BE CRAZY TO DO THIS

            const props = {
                userProps: {},
                generalProps: {},
                files: {},
            };

            // receive properties by POST
            app.post('/props', require('body-parser').json(), (req, res, next) => {
                // save props to local variables
                merge(props.userProps, req.body.userProps);
                merge(props.generalProps, req.body.generalProps);

                // DON'T use merge on files because merging will keep the removed files!
                Object.assign(props.files, req.body.files);

                res.json(props);
            });

            // return properties by GET
            app.get('/props', (req, res, next) => {
                res.json(props);
            });
        },

        after(app) {
            // override default 404 behaviour so it won't send us an HTML 404 page
            app.use((req, res, next) => {
                res.status(404).end();
            });
        },
    },
    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(vert|frag)$/,
                use: [
                    'raw-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.ts', '.js'],
    },
    output: {
        publicPath: '', // use empty path to make generated files be able to load by 'file://' scheme
        filename: '[name].[hash:4].js',
        path: path.resolve(__dirname, 'dist'),
    },
};

module.exports = (env, argv) => {
    config.mode = argv.mode;

    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
    }

    return config;
};
