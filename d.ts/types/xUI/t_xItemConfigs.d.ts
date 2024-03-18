import { VNode } from "../vue";

type t_itemType = "xItemInput" | "xItemSelect" | "xItemRadioGroup" | "xItemCheckboxGroup" | "xItemCheckBox" | "xItemSwitch" | "xItemCheck" | (() => VNode);
export type t_xItemConfigsOptions = {
	label?: string | Function;
	/*** xSelect 是否多选 */
	multiple?: boolean;
	/**
	 * xItemInput 数字输入框
	 */
	clearable?: boolean;
	/*** xInput 是否为密码框 */
	isPwd?: boolean;
	/*** xInput 是否为数字框 */
	isNumber?: boolean;
	/*** xItemRadioGroup 是否使用按钮组 */
	isButton?: boolean;
	type?: "textarea";
	value?: any;
	itemType?: t_itemType;
	/**
	 * xItemRadioGroup 最小宽度，方便计算每一行排多少个元素
	 */
	minWidth?: number;
	/*** 自定义显示效果,如果效果与xItemSelect一样，就用字符串xItemSelect，不然就用render函数 */
	readonlyAs?: t_itemType;
	disabled?: boolean | Function;
	isHide?: boolean | Function;
	options?: any[] | Function;
	onEmitValue?: ({ val: any }) => void;
	once?: Function;
	tips?: string | Function;
	msg?: string | Function;
	rules?: any[];
	attrs?: any;
	itemSlots?: any;
	onEnter?: Function;
};

type t_options = {
	[prop: string]: t_xItemConfigsOptions;
};

export declare type t_xItemConfigsFn = (options: t_options) => t_options;

export interface i_defItems extends t_xItemConfigsFn {
	/* methods */
}
