const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        load_users: "./src/assets/scripts/load_users.js",
        change_user: "./src/assets/scripts/change_user.js",
        alertBox: "./src/assets/scripts/common/alertBox.js"
    },
    output: {
        filename: "[name].bundle.js"
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
