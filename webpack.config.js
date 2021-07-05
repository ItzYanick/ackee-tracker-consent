const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'ackee-tracker-consent.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'AckeeTrackerOptIn',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimize: true,
    },
};