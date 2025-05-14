# COMMONJS_API_DOC
[此项目说明-内网在线文档](http://10.143.133.216:3001/wiki/#/wiki_all?wiki_id=329)
------
> 本文自动生成，直接修改会被覆盖，可以修改内网在线文档
------

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 构造树型结构数据
	 * @param {*} data 数据源
	 * @param {*} idProp id字段 默认 'id'
	 * @param {*} pidProp 父节点字段 默认 'parentId'
	 * @param {*} childrenProp 孩子节点字段 默认 'children'
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 倒序遍历树结构，可以用pop移除节点
	 * @param tree traverse
	 * @param handler(currentNode,nodeParenteList) 返回false则break
	 * @param options
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 获取文件MD5，注意这里谷歌浏览器有最大文件限制当文件大于2G时浏览器无法读取文件
	 * @param {*} file
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 该函数用于将字节大小转换为可读性更好的格式，如KB、MB、GB等
	 * @param {*} bytes
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * requestAnimationFrame Throttle
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 复制到剪贴板
	 * @param textToCopy
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 名字随机
	 * @param e
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 打开文件选择器
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 读取文件为文本
	 * @param {*} file
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 下载文本为文件
		 * @param {*} dataString
		 * @param {*} filename
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 获取对象的值
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * //将空字符串转换为null
	 * @param str
	 * @return {null|*}
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 *
	 * @param {*} timestamp 多少时间以前
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
<pre> <code>/** 全局工具函数，共享lodash的全局变量_
	 *  $前缀的是自定义函数
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 数组至少有一个元素
		 * @param {*} val
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 *
		 * @param {*} path
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 判断两个值是否相等,转换为字符串比较
		 * @param {*} a
		 * @param {*} b
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 从jQuery对象中，获取leftTop的数值
	 * @param {*} $ele
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/***
	 * pathname search
	 * @param urlLike
	 * @param query
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 将一个url转换为VueRouter使用的a标签href
	 * @param {*} urlLike
	 * @param {*} query
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 设置主题
	 * @param {*} theme
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 首字母大写
	 * @param {*} str
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 判断是否是Mac
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 数字 非 NaN
	 * @param {*} value
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 该函数_$trylog接受一个异步函数asyncFn作为参数，通过try-catch语句执行asyncFn并返回结果。如果发生错误，将错误信息和asyncFn的调用信息打印到控制台
	 * @param {*} asyncFn
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 生成一串随机数，category作为前缀
		 * @param {*} category
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 日期格式化
	 * @param {*} date {date|number}日期或者时间戳
	 * @param {number} type {number} 0:默认YYYY-MM-DD HH:mm:ss 1:YYYY-MM-DD
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * value to label
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
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
<summary>  </summary>
<br>
<pre> <code>/**
	 * 如果fn是可执行的函数，则执行：用call方法
	 * @param fn
	 * @param params
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 是否已输入
	 * false 0 为真 空数组[]为false
	 * @param {any} val
	 * @returns boolean
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 什么都不干的函数
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
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
	 * - 注意，一定要保证成对出现，不然一直loading
	 * @param {boolean} isLoading true 为loaidng false关闭
	 * @param {string} selector 目标选择器，不指定就默认为body
	 *
	 * @TODO: 超时关闭并提示
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 确认信息
	 * @param {*} options
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * 删除前的弹窗提示
	 * @param {*} options
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * notify 弹窗，成功提示，可复写
	 * @param {*} title
	 * @param {*} options
	 * @returns
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * notify 弹窗，错误提示，可复写
		 * @param {*} title
		 * @param {*} options
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * @deprecated 推荐使用_.$openModal
		 * @param {*} title：{stirng}dialog标题
		 * @param {*} WindowVueCtor:Vue组件,通常用_.$importVue引入
		 * @param {*} options:{layer的参数，但是一般用不到，有需要可以自己看源码}
		 * @returns Vue组件实例
		 * hooks vm.onWindowClose事件
		 * @example const vm = await _.$openWindow_deprecated(...)
		 * vm.onWindowClose = callBackFunction
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 *
		 * @param {*} fnGetValue 执行此函数，直到返回真值
		 * @param {*} duration 默认为0即不断尝试；若给定时间，未在给定时间内完成，则失败
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
	 * 从location.search  get val
	 * @param {*} key[]
	 * @returns val[]
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
		 * 用less 处理css样式
		 * @param styleSourceCode
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 利用less添加样式,独立处理资源路径
		 * @param {any} styleSourceCode
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * @deprecated 用h函数吧
		 * @param {*} tpl
		 * @param {*} scope
		 * @param  {...any} args
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 加载自定义的SFC vue 文件
		 * @param {*} url 文件地址：@为当前app目录，/common为通用目录
		 * @param {*} payload {parent是一个保留字，用于Vue实例的继承关系，这样才可以使用provier和inject}
		 * @example
		 * export default async function ({parent,row,index,otherAnyParams}) {
		 * //这里是_.$importVue引入的SFC文件
		 * 	......
		 * }
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
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
	 * 设置列表信息
	 * @param {*} tableConfigs
	 * @param {*} param1 如果不是特意保留，每次会清空已选
	 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
	 * TODO: isHide的元素不需要校验
	 *
	 * @param {any} selector  满足jQuery能选出来就行 form#表单的包裹元素，校验元素内的所有控件
	 * @returns 如果都通过，则返回空数组，否则返回
	 * [
	 *  [msg,vm],
	 *  [msg,vm],
	 *  ...
	 * ]的数组元素
	 *  @example
	 * const [error] = await _.$validateForm(this.$el);//这个范围就是整个组件
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
	 * 从Table 中获取xItem的vm
	 * @param {*} rowIndex
	 * @param {*} colProp
	 * @param {*} selector
	 * @returns
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
		 * 数据回填，
		 * @param {*} form {object} xItem formconfigs
		 * @param {*} data {object} 回填数据
		 * @param {*} order {array} 有依赖关系（联动）回填顺序
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 重置表单的值，前提是configs里面有resetValue
		 * @param xItemFormConfigsArray
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 适用于xItem不使用v-mode，form的configs带有value form.xxx.value, {xxx:"value"}
		 * @param {any} xItemFormConfigs xItem 配置信息，config带有value属性
		 * @param {any} values
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 从 cofnigs 中获取value 返回 {xxx:value,...}形式的对象
		 * @param {any} xItemFormConfigs
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 获取多个国际化label
		 * @param {*} langArray
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 从xItemConfigs 获取value对应的options item
		 * @param {*} xItemConfigs
		 * @returns
		 */</code> </pre>
</details>

<details>
<summary>  </summary>
<br>
<pre> <code>/**
		 * 从数组中取第一个元素的value，如果数组为空则返回defaultValue
		 * @param {*} options
		 * @param {*} defaultValue
		 * @returns
		 */</code> </pre>
</details>
