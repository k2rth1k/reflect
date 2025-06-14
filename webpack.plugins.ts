import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "src/data"),
        to: path.resolve(__dirname, ".webpack/main/data"),
        globOptions: {
          ignore: ["**/.DS_Store"],
        },
      },
    ],
  }),
];
