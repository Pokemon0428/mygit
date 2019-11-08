const path = require('path')
// 启用热更新的 第二步
const webpack = require('webpack')
//导入在内存生成 HTML 页面的插件
//只要是插件，都要放到plugins节点中去
//这个插件的两个作用
// 1. 自动在内存中根据指定页面生成内存页面
// 2. 自动把打包好的 bundle.js 追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');


//这个配置文件, 其实就是一个JS文件, 通过Node中的模块操作, 向外暴露了一个配置对象
module.exports = {
	// 在配置文件中， 需要手动指定 入口 和 出口 文件
	
	entry: path.join(__dirname, './src/main.js'),//入口， 表示要用webpack打包哪个文件
	
	output:{
		path:path.join(__dirname, './dist'), //出口， 指定打包好的文件，输出到哪个路径下
		filename: 'bundle.js' // 输出文件的名称
	},
	devServer:{ //这是配置dev-server命令参数的第二种昂形式
		
		open:true, //自动打开浏览器
		port:3000, //设置启动时的运行端口
		contentBase:'src', //指定托管的根目录
		hot:true //启用热更新的 第一步
	
	},
	plugins:[//配置插件的节点
		new htmlWebpackPlugin({
			template:path.join(__dirname, './src/index.html'),//指定模板页面， 将来会根据指定的页面路径， 去生成内存中的页面
			filename:'index.html'
		}),
		new VueLoaderPlugin()
	],
	module:{//这个节点用于配置 所有第三方模块 加载器
		rules:[//所有第三方模块的匹配规则
			{ test: /\.css$/, use: ['style-loader', 'css-loader']},//配置处理css文件的第三方文件
			{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},//配置处理less文件的第三方文件
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},//配置处理scss文件的第三方文件
			{ test: /\.(png|jpg|gif|bmp|jpeg)$/, use: 'url-loader?limit=313001&name=[name].[ext]'},//处理图片路径的 loader
			
			//limit 给定的值是图片大小， 但该值大于或等于图片的真正大小， 图片回转换程base64字符串
			
			{ test: /\.(ttf|eot|woff|woff2|svg|otf)$/, use: 'url-loader'},//处理字体文件的loader
			
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},//配置Babel转换高级语法
			
			{ test: /\.vue$/, use: 'vue-loader'},//处理 .vue 文件
			
		]
	},
	resolve:{
		alias:{ // 设置 vue 这个包被导入时，包的路径
			// vue$:"vue/dist/vue.js"
		}
	}
		
}


// 当我们在控制台 直接输入 webpack 命令执行的时候, webpack做了什么
 // 1. webpack并没有发现,我们没有给它指定 入口 和 出口
 // 2. webpack回去项目的根目录中 查找一个 叫 'webpack.config.js' 的配置文件
 // 3. 当找到配置文件后, webpack会解析该配置文件, 解析完成后, 就得到了配置文件中导出的配置对象
 // 4. webpack拿到配置对象后, 就得到了配置对象中指定的 出口 和 入口, 进行打包