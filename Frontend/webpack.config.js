const webpack = require("webpack");

module.exports = {
    resolve: {
        fallback: {
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            zlib: require.resolve("browserify-zlib"),
            url: require.resolve("url"),
            process: require.resolve('process/browser'),
            buffer: require.resolve('buffer/'),
        },
    },
    plugins: [
        new (require('webpack')).ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};
