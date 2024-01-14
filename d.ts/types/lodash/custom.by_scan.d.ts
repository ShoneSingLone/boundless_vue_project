import _ = require("./index");
			declare module "./index" {
				interface LoDashStatic {/**
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
$val2L:any;
$randomName:any;
$is200:any;
$isEveryInput:any;
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
	 * 数组至少有一个元素
	 * @param {*} val
	 * @returns
	 */
$isArrayFill:   (val:any[])=>boolean ;
/**
	 * 全局loading单例
	 * true 为loaidng false关闭
	 * 注意，一定要保证成对出现，不然一直loading
	 * @param {any} isLoading
	 * TODO: 超时关闭并提示
	 */
$loading:    (isLoading?:boolean)=>void;
/**
	 * 确认信息
	 * @param {*} options
	 * @returns
	 */
$confirm:   (options?:any)=>Promise<any> ;
$delConfirm:any;
$msgInfo:any;
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
$privateLayerSuccessThenMountVueComponent:any;
/**
		 *
		 * @param {*} title：{stirng}dialog标题
		 * @param {*} WindowVueCtor:Vue组件,通常用_.$importVue引入
		 * @param {*} options:{layer的参数，但是一般用不到，有需要可以自己看源码}
		 * @returns
		 */
$openWindow:   (title:string, WindowVueCtor:Vue, options?:object)=>void ;
/**
	 *
	 * @param {*} fnGetValue 执行此函数，直到返回真值
	 * @param {*} duration 默认为0即不断尝试；若给定时间，未在给定时间内完成，则失败
	 * @returns
	 */
$ensure:   (fnGetValue:()=>Promise<any>, duration:number) =>Promise<any> ;
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
$setTableData:any;
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
/**
	 * 适用于xItem不使用v-mode，form的configs带有value form.xxx.value, {xxx:"value"}
	 * @param {any} form xItem 配置信息，config带有value属性
	 * @param {any} values
	 */
$setValToForm:   (form:object,values:object)=>void ;
/**
	 * 从 cofnigs 中获取value 返回 {xxx:value,...}形式的对象
	 * @param {any} configs
	 * @returns
	 */
$pickValueFromConfigs:   (configs:object)=>object ;
$valFirstOrDefault:any;
$firstIpFrom:any;
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
/**
	 * 依赖全局变量SRC_ROOT_PATH
	 * 返回静态资源路径
	 * @param {any} url
	 * @returns
	 */
$val:   (url: string)=>string ;
$appendScript: any;
$appendStyle: any;
$resolveCssAssetsPath: any;
$idb:any;
/**
	 * 依赖全局变量SRC_ROOT_PATH
	 * 返回静态资源路径
	 * @param {any} url
	 * @returns
	 */
$resolvePath:   (url: string)=>string ;
$loadText:any
            }
        }