import _ = require("./index");
			declare module "./index" {
				interface LoDashStatic {/**
	 * 构造树型结构数据
	 * @param {*} data 数据源
	 * @param {*} idProp id字段 默认 'id'
	 * @param {*} pidProp 父节点字段 默认 'parentId'
	 * @param {*} childrenProp 孩子节点字段 默认 'children'
	 */
$arrayToTree:   (params: { data: any[]; id?: string; pid?: string; children?: string; label?: string; value?: string; rootId?: any }) => { TREE: any[]; CHILDREN_MAP: any; NODES_OBJ: any } ;
$updateCol:any;
$pickFromArray:any;
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
$openFileSelector:   ()=>Promise<File[]> ;
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
	 * 获取对象的值
	 */
$handleSetFormValue:  (obj:object,key:string)=>string ;
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
	 * 浅-判断对象值是否相同
	 * @param {*} a
	 * @param {*} b
	 * @returns
	 */
$eqObj:   (a:object,b:object)=>boolean ;
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
$aHashLink:   (urlLike:string, query:object) => string ;
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
$dateFormat:   (date:string|number, type?:number)=>string ;
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
$asyncDebounce:any;
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
	 * @param {*} options
	 * @returns
	 */
$confirm:   (options?:any)=>Promise<any> ;
$confirm_important:any;
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
/**
		 *
		 * @param {*} fnGetValue 执行此函数，直到返回真值
		 * @param {*} duration 默认为0即不断尝试；若给定时间，未在给定时间内完成，则失败
		 * @returns
		 */
$ensure:   (fnGetValue:(()=>Promise<any>)|(()=>any), duration?:number) =>Promise<any> ;
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
$getFirstOrDefaultValue:any;
$getIpInRangeAndUseable:any;
$intToIp4:any;
$ip4ToInt:any;
$isIp4InCidr:any;
$intToBin:any;
$calculateCidrRange:any;
/**
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
$appendScript: any;
$appendStyle: any;
$resolveCssAssetsPath: any;
$idb:any;
$resolvePath: any;
$loadText:any;
$asyncLoadOrderAppendScrips:any;
/**
			 * 创建i18n 函数，可同时存在不同语言options的i18n对象
			 * @param {*} lang zh-CN,对应i18n文件夹下的文件
			 * @returns
			 */
$newI18n:   (options: { lang: "zh-CN" | "en-US" }) => Promise<any> 
            }
        }