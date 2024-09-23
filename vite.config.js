import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";
import vue2Jsx from "@vitejs/plugin-vue2-jsx";

console.log("process.argv", process.argv);

export default defineConfig({
	resolve: {
		alias: {
			"@": __dirname
		}
	},
	build: {
		output: {
			format: "umd"
		},
		target: "es2022",
		minify: false,
		lib: {
			entry: "./preprocess/ES2UMD/make.tsx", // 设置入口文件
			name: "XXXXNeedRenameThisXXXX", // 起个名字，安装、引入用
			fileName: (format) => `XXXXNeedRenameThisXXXX.${format}.js` // 打包后的文件名
		},
		sourcemap: true, // 输出.map文件
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: [
				"lodash",
				"vue",
				"@vue/babel-helper-vue-jsx-merge-props"
			],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: "Vue",
					lodash: "_"
				}
			}
		}
	},
	plugins: [
		vue2(),
		vue2Jsx()
	]
});
