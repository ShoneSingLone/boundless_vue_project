# COMMONJS_API_DOC
[此项目说明-内网在线文档](http://10.143.133.216:3001/wiki/#/wiki_all?wiki_id=329)
------
> 本文自动生成，直接修改会被覆盖，可以修改内网在线文档
------

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 多少时间以前
	 * @param {*} timestamp 
	 * @returns 
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 浅-判断对象值是否相同
	 * @param {*} a
	 * @param {*} b
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/***
	 *  pathname search
	 * @param urlLike
	 * @param query
	 */</code> </pre>
</details>

<details>
<summary> _.$ajax </summary>
<br>
<pre> <code>/**
	 * @name _.$ajax
	 * 请求API的工具函数
	 * _.$ajax.get
	 * _.$ajax.post
	 *
	 */</code> </pre>
</details>

<details>
<summary> _.$ajax.get </summary>
<br>
<pre> <code>/**
	 * @name _.$ajax.get
	 * @param {any} { url, options, success: resolve, error: reject }
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary> _.$genId </summary>
<br>
<pre> <code>/**
		 * @name _.$genId
		 * 生成一串随机数，category作为前缀
		 * @param {string} category
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary> _.$dateFormat </summary>
<br>
<pre> <code>/**
	 * @name _.$dateFormat
	 * 日期格式化
	 * @param {any} date 为long类型
	 * @param {any} type 为格式化参数
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * value to label
	 * @param {*} value
	 * @param {*} options
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary> _.$randomName </summary>
<br>
<pre> <code>/**
	 * @name _.$randomName
	 * name作为前缀的符合name要求的字符串
	 * @param {string} name
	 * @returns string
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 判断是否为200，转换为字符串来判断
	 * @param {any} val
	 * @returns boolean
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 默认检测obj上每一个属性都能通过isInput，如果给定keys，	则只检测keys中的属性
	 * @param {object} obj
	 * @param {string[]} keys
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary> _.$isInput </summary>
<br>
<pre> <code>/**
	 * @name _.$isInput
	 * 是否已输入
	 * false 0 为真 空数组[]为false
	 * @param {any} val
	 * @returns boolean
	 */</code> </pre>
</details>

<details>
<summary> _.$doNoting </summary>
<br>
<pre> <code>/**
	 * @name _.$doNoting
	 * 啥都不干的函数
	 */</code> </pre>
</details>

<details>
<summary> _.$sleep </summary>
<br>
<pre> <code>/**
	 * @name _.$sleep
	 * 异步函数，延时 记得用await
	 * @param {any} timeout
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 *
	 * @param {*} vm 绑定当前实例
	 * @param {*} fn
	 * @param {*} wait time
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary> _.$isArrayFill </summary>
<br>
<pre> <code>/**
	 * @name _.$isArrayFill
	 * @param {any} val
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 开发模式下才会在console打印日志
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 全局loading单例
	 * true 为loaidng false关闭
	 * 注意，一定要保证成对出现，不然一直loading
	 * @param {any} isLoading
	 * TODO: 超时关闭并提示
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 
		 * @param {*} title 
		 * @param {*} WindowVueCtor 
		 * @param {*} options 
		 * @returns 
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * @deprecated _.$appendScript可以缓存，不用每次都重新加载
	 * @description 动态方式添加js，在pendding阶段的调用都会等待
	 * @param {any} globalName
	 * @param {any} url
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 *
		 * @param {any} resolvedURL
		 * @param {any} param1
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 全局单例：同步
		 * @param {*} prop win doc
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 *
		 * @returns { scritpSourceCode, templateSourceCode, styleSourceCode }
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 利用less添加样式,独立处理资源路径
		 *
		 * @param {any} styleSourceCode
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 加载自定义的SFC vue 文件
		 * @param {*} url
		 * @param {*} payload
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary> _.$newRoute </summary>
<br>
<pre> <code>/**
		 * @name _.$newRoute
		 * 生成VueRouter 的 route
		 * path 与name相同，也不要使用 /:id这种不方便找对应的组件
		 * @param {*} path 必须是完成路径 比如 /a /a/b /a/b/c
		 * @param {*} componentPath
		 * @param {*} options
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * TODO: isHide的元素不需要校验
	 *
	 * @param {any} selector  满足jQuery能选出来就行 form#表单的包裹元素，校验元素内的所有控件
	 * @returns 如果都通过返回空数组，否则返回
	 * [
	 *  [msg,vm],
	 *  [msg,vm],
	 *  ...
	 * ]的数组元素
	 *  @example
	 * const [error] = await _.$validateForm("this.$el");//这个范围就是整个组件
	 * if (error) {
	 *  return;
	 * }
	 *
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 修改xItem的属性
	 * @param {*} selector
	 * @param {*} attrs
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 从指定selector范围的xTable 表中获取rowIndex colProp 对应xItem的实例
	 * @param selector
	 * @param rowIndex
	 * @param colProp
	 * @returns {*|{}}
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 适用于xItem不使用v-mode，form的configs带有value form.xxx.value, {xxx:"value"}
	 * @param {any} form xItem 配置信息，config带有value属性
	 * @param {any} values
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 从 cofnigs 中获取value 返回 {xxx:value,...}形式的对象
	 * @param {any} configs
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 国际化
		 * @param {*} key
		 * @param {*} payload
		 * @returns
		 */</code> </pre>
</details>
