import _ = require("./index");
			declare module "./index" {
				interface LoDashStatic {/**
	 * document.getElementsByTagName
	 * @param {*} tagName
	 * @returns
	 */
$$tags:   (tagName: string)=> HTMLElement[] ;
/**
	 * document.getElementsByTagName
	 * @param {*} tagName
	 * @returns
	 */
$$id:   (tagName: string)=> HTMLElement[] ;
$val: any;
$ensure:any;
/**
	 * 该函数用于在网页中动态添加脚本文件。它接受一个URL参数和一个全局名称参数，根据URL创建一个id，并检查是否已存在具有该id的script元素。如果不存在，它会创建一个新的script元素，设置其id和src属性，并添加到页面的body元素中。如果URL参数中包含路径，则使用该路径作为src属性值；否则，通过调用另一个函数获取脚本内容。无论使用哪种方式，加载脚本的过程都是异步的。如果指定了全局名称参数，则返回通过该名称访问到的值。
	 *
	 * @param {any} url
	 * @param {string} [globalName=""]
	 * @returns
	 */
$appendScript:   (url:string,globalName:string)=>any ;
/**
	 * @param {any} url
	 * @param {any} styleSourceCode
	 * @param {any} options {userLink:Boolean 如果为true，则使用Link方式引入，这样文件里面的相对路径是相对css文件，否则会缓存文本放在style元素里面，路径是相对页面，有这个差异}
	 * @returns
	 */
$appendStyle:   (url:string,styleSourceCode?:string,options?:any)=>any ;
/**
	 * @param {any} url
	 * @param {any} styleSourceCode
	 * @param {any} options {userLink:Boolean 如果为true，则使用Link方式引入，这样文件里面的相对路径是相对css文件，否则会缓存文本放在style元素里面，路径是相对页面，有这个差异}
	 * @returns
	 */
$resolveCssAssetsPath:   (url:string,styleSourceCode?:string,options?:any)=>any ;
$idb:any;
/**
	 * 依赖全局变量SRC_ROOT_PATH
	 * 返回静态资源路径
	 * @param {any} url
	 * @returns
	 */
$resolveSvgIcon:   (url: string)=>string ;
$resolvePath: any;
$loadText:any;
$asyncLoadOrderAppendScrips:any;
/**
						 * 创建i18n 函数，可同时存在不同语言options的i18n对象
						 * @param {*} lang zh-CN,对应i18n文件夹下的文件
						 * @returns
						 */
$newI18n:   (options: { lang: "zh-CN" | "en-US" }) => Promise<any> ;
$callFn:any;
/**
	 * base64编码 原生不支持字符，需要用$.base64 插件
	 * */
$base64:   { decode(str: string): string; encode(str: string): string; is(str: string): boolean; };
$reloadWindow:any;
/**
	 * 字符串脱敏处理函数
	 * @param {string} str - 需要脱敏的字符串
	 * @param {string} type - 脱敏类型：'phone'|'email'|'idcard'|'name'|'custom'
	 * @param {object} options - 自定义脱敏选项
	 * @param {number} options.start - 保留开始位数
	 * @param {number} options.end - 保留结束位数
	 * @param {string} options.mask - 掩码字符
	 * @returns {string} 脱敏后的字符串
	 */
$desensitize:   (str: any, type?: string, options?: object)=>string;
$getRawQueryParamFromSearch:any;
/**
	 * 构造树型结构数据
	 * @param {*} data 数据源
	 * @param {*} idProp id字段 默认 'id'
	 * @param {*} pidProp 父节点字段 默认 'parentId'
	 * @param {*} childrenProp 孩子节点字段 默认 'children'
	 */
$arrayToTree:   (params: { data: any[]; id?: string; pid?: string; children?: string; label?: string; value?: string; rootId?: any }) => { TREE: any[]; CHILDREN_MAP: any; NODES_OBJ: any } ;
$updateCol:any;
$percent:any;
$coerceTruthyValueToArray:any;
$flatNodes:any;
$isDef:any;
/**
	 * 倒序遍历树结构，可以用pop移除节点
	 * @param tree traverse
	 * @param handler(currentNode,nodeParenteList) 返回false则break
	 * @param options
	 */
$traverse:   (tree:any[],handler:any,options?:{children:string})=>void ;
$setDocTitle:any;
/**
	 * 获取文件MD5，注意这里谷歌浏览器有最大文件限制当文件大于2G时浏览器无法读取文件
	 * @param {*} file
	 * @returns
	 */
$md5:   (file:File)=>Promise<string> ;
/**
	 * 该函数用于将字节大小转换为可读性更好的格式，如KB、MB、GB等
	 * @param {*} bytes
	 * @returns
	 */
$bytesToSize:   (bytes:number)=>string ;
$rafThrottle:any;
/**
	 * 复制到剪贴板
	 * @param textToCopy
	 */
$copyToClipboard:   (textToCopy:string)=>Promise<void> ;
/**
	 * 名字随机
	 * @param e
	 */
$ramdomStr:   (e:number)=>string ;
/**
	 * 打开文件选择器
	 * @returns
	 */
$openFileSelector:   (options:{accept?:string,multiple?:boolean})=>Promise<File[]> ;
/**
	 * 读取文件为文本
	 * @param {*} file
	 */
$readFileAsText:   (obj:object)=>Promise<string> ;
/**
		 * 下载文本为文件
		 * @param {*} dataString
		 * @param {*} filename
		 */
$downloadTextAsBlob:   (obj:object, filename:string)=>Promise<void> ;
/**
	 * //将空字符串转换为null
	 * @param str
	 * @return {null|*}
	 */
$translateStrByNull:   (str:string)=>null|string ;
/**
	 *
	 * @param {*} timestamp 多少时间以前
	 * @returns
	 */
$timeAgo:   (timestamp:string)=>string ;
/**
	 * 判断对象值是否相同,将Function转为字符串比较
	 * 执行深比较来确定两个值是否相等。对于对象和数组，它会递归地比较它们的属性和元素，而不仅仅是检查引用是否相同。
	 * @param {*} a
	 * @param {*} b
	 * @returns
	 */
$isEqualByObjVal:   (a:object,b:object)=>boolean ;
$isHttp:any;
/**
		 * 数组至少有一个元素
		 * @param {*} val
		 * @returns
		 */
$isArrayFill:   (val:any[])=>boolean ;
$isExternal:any;
/**
		 * 判断两个值是否相等,转换为字符串比较
		 * @param {*} a
		 * @param {*} b
		 * @returns
		 */
$isSame:    (a:any,b:any)=>boolean ;
$isIE:any;
$isEdge:any;
$isFirefox:any;
/**
	 * 从jQuery对象中，获取leftTop的数值
	 * @param {*} $ele
	 * @returns
	 */
$getLeftTopFromAbsolute:   ($ele:jQuery)=>object ;
$getLeftTopFromTranslate:any;
/**
		 * 将一个url转换为VueRouter使用的a标签href
		 * @param {*} urlLike
		 * @param {*} query
		 * @returns
		 */
$aHashLink:   (urlLike:string, query?:object) => string ;
/**
	 * 设置主题
	 * @param {*} theme
	 */
$setAppTheme:   (theme:string)=>void ;
$valueEquals:any;
$scrollIntoView:any;
/**
	 * 首字母大写
	 * @param {*} str
	 * @returns
	 */
$firstUpperCase:   (str:string)=>string ;
/**
	 * 判断是否是Mac
	 * @returns
	 */
$isMac:   ()=>boolean ;
/**
	 * 数字 非 NaN
	 * @param {*} value
	 * @returns
	 */
$isNumber:   (value:any)=>boolean ;
$isKorean:any;
$filterSomeInput:any;
$filterAllInput:any;
/**
	 * 该函数_$trylog接受一个异步函数asyncFn作为参数，通过try-catch语句执行asyncFn并返回结果。如果发生错误，将错误信息和asyncFn的调用信息打印到控制台
	 * @param {*} asyncFn
	 * @returns
	 */
$trylog:   (asyncFn:()=>Promise<any>)=>Promise<any> ;
$lStorage:any;
/**
		 * 生成一串随机数，category作为前缀
		 * @param {*} category
		 * @returns
		 */
$genId:   (category?:string)=>string  ;
/**
	 * 日期格式化
	 * @param {*} date {date|number}日期或者时间戳
	 * @param {number} type {number} 0:默认YYYY-MM-DD HH:mm:ss 1:YYYY-MM-DD
	 * @returns
	 */
$dateFormat:   (date?:string|number, type?:number)=>string ;
/**
	 * value to label
	 */
$val2L:   (value:any, options:any, defaultValue?: any)=>string ;
/**
	 * name作为前缀的符合name要求的字符串
	 * @param {string} name
	 * @returns string
	 */
$randomName:   (name:string)=>string ;
/**
	 * 判断是否为200，转换为字符串来判断
	 * @param {any} val
	 * @returns boolean
	 */
$is200:   (val:any)=>boolean ;
/**
	 * 默认检测obj上每一个属性都能通过isInput，如果给定keys，	则只检测keys中的属性
	 * @param {object} obj
	 * @param {string[]} keys
	 * @returns
	 */
$isEveryInput:   (obj:object, keys:string[])=>boolean ;
/**
	 * 如果fn是可执行的函数，则执行：用call方法
	 * @param fn
	 * @param params
	 * @returns
	 */
$execfnify:   (fn: any, params: any) => any ;
/**
	 * 是否已输入
	 * false 0 为真 空数组[]为false
	 * @param {any} val
	 * @returns boolean
	 */
$isInput:   (val:any)=>boolean ;
/**
	 * 什么都不干的函数
	 * @returns
	 */
$doNoting:   ()=>void ;
$sleep:any;
/**
	 *
	 * @param {*} vm 绑定当前实例
	 * @param {*} fn
	 * @param {*} wait time
	 * @returns
	 */
$asyncDebounce:   (vm:any, fn:Function, wait:number)=>any ;
/**
	 * 全局loading单例
	 * - 注意，一定要保证成对出现，不然一直loading
	 * @param {boolean} isLoading true 为loaidng false关闭
	 * @param {string} selector 目标选择器，不指定就默认为body
	 *
	 * @TODO: 超时关闭并提示
	 */
$loading:    (isLoading?:boolean,selector?:string)=>void;
/**
	 * 确认信息
	 * @param {*} options {
	 * title:string,
	 * content:vNode or string
	 * }
	 * @returns
	 */
$confirm:   (options?:any)=>Promise<any> ;
/**
	 * 删除前的弹窗提示
	 * @param {*} options
	 * @returns
	 */
$confirm_important:   (options?:any)=>Promise<any> ;
/**
	 * notify 弹窗，成功提示，可复写
	 * @param {*} title
	 * @param {*} options
	 * @returns
	 */
$msgSuccess:   (title:string,options?:any)=>Promise<any> ;
/**
		 * notify 弹窗，错误提示，可复写
		 * @param {*} title
		 * @param {*} options
		 * @returns
		 */
$msgError:   (title:string,options?:any)=>Promise<any> ;
/**
		 * @deprecated 推荐使用_.$openModal
		 * @param {*} title：{stirng}dialog标题
		 * @param {*} WindowVueCtor:Vue组件,通常用_.$importVue引入
		 * @param {*} options:{layer的参数，但是一般用不到，有需要可以自己看源码}
		 * @returns Vue组件实例
		 * hooks vm.onWindowClose事件
		 * @example const vm = await _.$openWindow_deprecated(...)
		 * vm.onWindowClose = callBackFunction
		 */
$openWindow_deprecated:   (title:string, WindowVueCtor:Vue, options?:object)=>void ;
$globalVar: any;
/**
	 * 从location.search  get val
	 * @param {*} key[]
	 * @returns val[]
	 */
$urlSearch:   (key:string[])=>string[] ;
$location:any;
$GenComponentOptions:any;
$single:any;
$preprocessCssByless:any;
$sourceCodeSFC:any;
$vNode:any;
/**
		 * 加载自定义的SFC vue 文件
		 * @param {*} url 文件地址：@为当前app目录，/common为通用目录
		 * @param {*} payload {parent是一个保留字，用于Vue实例的继承关系，这样才可以使用provier和inject}
		 * @example
		 * export default async function ({parent,row,index,otherAnyParams}) {
		 * //这里是_.$importVue引入的SFC文件
		 * 	......
		 * }
		 * @returns
		 */
$importVue:   (url:object|string|any[], payload?:object)=>any|any[] ;
$sfcVueObject:any;
$newRoute:any;
$setPagination:any;
/**
	 * 设置列表信息
	 * @param {*} tableConfigs
	 * @param {*} param1 如果不是特意保留，每次会清空已选
	 */
$setTableData:   (tableConfigs: any, { list, total:number, selected, set: Set }: any)=>void ;
/**
	 * 通过ID获取xItem的vm实例
	 * @param id
	 * @returns Vue实例
	 */
$xItemVmById:   (idName:string)=>Promise<[msg,vm][]> ;
/**
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
	 */
$validateForm:   (selector:string)=>Promise<[msg,vm][]> ;
$hideRow:any;
/**
	 * 修改xItem的属性
	 * @param {*} selector
	 * @param {*} attrs
	 */
$modifyItemsAttrs:   (selector:string, attrs:object)=>void ;
$getVmById:any;
/**
	 * 从Table 中获取xItem的vm
	 * @param {*} rowIndex
	 * @param {*} colProp
	 * @param {*} selector
	 * @returns
	 */
$getCellItemVm:   (rowIndex:number,colProp:string,selector:string)=>object ;
$CellItem:any;
/**
		 * 数据回填，
		 * @param {*} form {object} xItem formconfigs
		 * @param {*} data {object} 回填数据
		 * @param {*} order {array} 有依赖关系（联动）回填顺序
		 */
$fillBackData:   ({form,data,order})=>Promise<void> ;
$resetFormValues:any;
/**
		 * 适用于xItem不使用v-mode，form的configs带有value form.xxx.value, {xxx:"value"}
		 * @param {any} xItemFormConfigs xItem 配置信息，config带有value属性
		 * @param {any} values
		 */
$setFormValues:   (form:object,values:object)=>void ;
$setFormValuesDelay:any;
/**
		 * 从 cofnigs 中获取value 返回 {xxx:value,...}形式的对象
		 * @param {any} xItemFormConfigs
		 * @returns
		 */
$pickFormValues:   (configs:object)=>object ;
$newI18nMany:any;
$getSelectedItemFrom:any;
/**
		 * 只要value不是undefined，就返回value，否则用默认值
		 * @param value
		 * @param defaultValue
		 * @returns
		 */
$valOrDefault:   (value: any, defaultValue: any) => any ;
$valuInArrayOrFirst:any;
$getFirstOrDefaultValue:any;
$getIpInRangeAndUseable:any;
$intToIp4:any;
$ip4ToInt:any;
$isIp4InCidr:any;
$intToBin:any;
$calculateCidrRange:any
            }
        }