const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    devServer: {
        watchContentBase: true,
        contentBase: "dist",
        watchOptions: {
            ignored: ["node_modules", "spec"],
        },
    },
    resolve: {
        extensions: [".ts", ".scss", ".js", ".json"],
    },
    output: {
        path: path.resolve(__dirname, "dist/app"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Isocycler",
            meta: {viewport: "width=device-width, height=device-height, initial-scale=1, maximum-scale=1"},
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        module: "esnext",
                    },
                    transpileOnly: true,
                },
            },
        ],
    },
}
