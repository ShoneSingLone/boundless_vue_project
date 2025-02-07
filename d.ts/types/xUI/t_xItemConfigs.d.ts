import { VNode } from "../vue";

type t_itemType =
	| "xItemInput"
	| "xItemSelect"
	| "xItemSlider"
	| "xItemRadioGroup"
	| "xItemCheckboxGroup"
	| "xItemCheck"
	| "xItemSwitch"
	| "xItemCheck"
	| (() => VNode);
export type t_xItemConfigsOptions = {
	/*** xItem 的label */
	label?: string | Function;
	/*** xItemSelect 是否多选 */
	multiple?: boolean;
	/**
	 * xItemInput 数字输入框
	 */
	clearable?: boolean;
	/*** xInput 是否为密码框 */
	isPwd?: boolean;
	/*** xInput 是否为数字框 */
	isNumber?: boolean;
	/*** xInput 带有下拉框的Input 特型控件 */
	inputType?: "select_input";
	/*** xInput 带有下拉框的Input 特型控件 下拉的值 */
	selectValue?: string | boolean | number;
	/*** xInput 带有下拉框的Input 特型控件 下拉项 */
	selectOptions?: any[];
	/*** xInput 带有下拉框的Input 特型控件 下拉的值改变时的回调函数 */
	onSelectChange?: Function;
	/*** xInputNumber 步长 */
	step?: number;
	/*** xInputNumber 是否只能输入 step 的倍数 */
	stepStrictly?: boolean;
	/*** xInputNumber min */
	min?: number;
	/*** xInputNumber max */
	max?: number;
	/*** xItemSlider 是否显示输入框 */
	showInput?: boolean;
	/*** xItemRadioGroup 是否使用按钮组 */
	isButton?: boolean;
	/* xItemCheck 是否使用组,value为数组 */
	xItemCheckUse?: "blockCheck";
	/* xItem placeholder */
	placeholder?: string;
	/**
	 * xItemRadioGroup 最小宽度，方便计算每一行排多少个元素
	 */
	minWidth?: number;
	isGroup?: boolean;
	type?: "textarea";
	value?: any;
	resetValue?: any;
	itemType?: t_itemType;
	/*** 自定义显示效果,如果效果与xItemSelect一样，就用字符串xItemSelect，不然就用render函数 */
	xItemRender?: t_itemType;
	/*** 订单需要的 国际化数组 */
	i18nMany?: Function;
	disabled?: boolean | Function;
	isHide?: boolean | Function;
	/*** xItemDesc 是否在应用此组件的时候隐藏 */
	isHideWhenDesc?: boolean | Function;
	options?: any[];
	/*** xItemSelect 渲染自定义项 */
	optonsRender?: Function;
	onEmitValue?: ({ val: any }) => void;
	once?: Function;
	tips?: string | Function;
	msg?: string | Function;
	rules?: any[];
	attrs?: any;
	itemSlots?: {
		beforeController?: Function;
		afterController?: Function;
	};
	onEnter?: Function;
};

type t_xItems = {
	[prop: string]: t_xItemConfigsOptions;
};

export declare type t_defItemsFn = (options: t_xItems) => t_xItems;

export interface i_defItems extends t_defItemsFn {
	/* methods */
}
export declare type t_defItemFn = (options: t_xItemConfigsOptions) => t_xItemConfigsOptions;
export interface i_defItem extends t_defItemFn {
	/* methods */
}
