const webpack   = require('webpack');
const path      = require('path');
const fs        = require('fs');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const TranslationPlugin     = require('../scripts/webpack/translations_plugin.js');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const VersionPlugin         = require('../scripts/webpack/version_plugin.js');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');

module.exports = function (env) {

    const geoPath = env.geoLocal ?
                        env.geoLocal.length > 0 ?
                            env.geoLocal :
                            path.resolve(__dirname, '../', 'geoApi') :
                        path.resolve(__dirname, '../node_modules/geoApi');

    const config = {
        entry: {
            'av-main': path.resolve(__dirname, '../src/app/main.js'),
            // TODO: 'ie-polyfills': path.resolve(__dirname, '../src/polyfill/polyfill-loader.ts')
        },

        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [ "ts-loader?configFileName=config/tsconfig.json", "angular2-template-loader" ]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: ['style-loader', 'css-loader']
                    })
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
                    })
                },
                {
                    test: /\.html$/,
                    use: ['ngtemplate-loader?relativeTo=' + (path.resolve(__dirname, './src/app')), 'html-loader?minimize=false']
                },
                {
                    test: /\.(png|svg)$/,
                    use: 'url-loader'
                }
            ]
        },

        plugins: [
            new webpack.PrefetchPlugin(geoPath),
            new webpack.PrefetchPlugin(path.resolve(__dirname, 'src/app/app-loader.js')),

            // TODO: fix
            // new webpack.optimize.ModuleConcatenationPlugin(),

            new CopyWebpackPlugin([{
                context: 'src/content/samples',
                from: '**/*.json',
                to: 'samples'
            },{
                context: 'src/content/samples',
                from: '**/*.html',
                to: 'samples'
            },{
                from: 'src/locales/help',
                to: 'samples/help'
            }]),

            new ExtractTextPlugin('av-styles.css'),

            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),

            new TranslationPlugin('./src/locales/translations.csv'),

            new VersionPlugin(),

            new CleanWebpackPlugin(['./build'])
        ],

        resolve: {
            modules: [path.resolve(__dirname, 'node_modules'), path.resolve(geoPath, 'node_modules')]
        },

        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        },

        devServer: {
            host: '0.0.0.0',
            publicPath: '/',
            historyApiFallback: {
                index: '/samples/webpack-note.html',
                verbose: true
            },
            disableHostCheck: true,
            contentBase: false,
            port: 6001,
            stats: { colors: true },
            compress: true
        }
    };

    config.plugins.push(...htmlInjectPlugins());

    if (env.geoLocal) {
        config.resolve.alias = config.resolve.alias ? config.resolve.alias : {};
        config.resolve.alias['geoApi$'] = geoPath;
    }

    return config;
}

function htmlInjectPlugins() {
    return fs.readdirSync('src/content/samples').map(file => {
        if (/\.tpl$/.test(file)) {
            return new HtmlWebpackPlugin({
                inject: false,
                filename: `samples/${file.replace(/\.[^/.]+$/, '.html')}`,
                template: `src/content/samples/${file}`,
                excludeChunks: ['ie-polyfills']
            });
        }
    }).filter(x => typeof x !== 'undefined');
}
