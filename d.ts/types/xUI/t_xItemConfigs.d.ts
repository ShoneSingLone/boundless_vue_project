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
	options?: any[] | Function;
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

type t_options = {
	[prop: string]: t_xItemConfigsOptions;
};

export declare type t_xItemConfigsFn = (options: t_options) => t_options;

export interface i_defItems extends t_xItemConfigsFn {
	/* methods */
}
