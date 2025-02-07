import { LoDashStatic as t_lodash } from "./types/lodash/index.d";
import { t_api } from "./types/business/_api";
import { t_opts } from "./types/business/_opts";
import { t_rules } from "./types/business/_rules";
import { t_reg } from "./types/business/_reg";
import {
	t_ActionAndMore,
	t_xTipsHover,
	t_options,
	t_xUtils,
	t_xTableVirNewGroupSortedRows
} from "./types/business/_xUtils/index.d";
import { i_defItem, i_defItems } from "./types/xUI/t_xItemConfigs.d";
import { t_adminTools } from "./types/business/_AdminConsole";

import {
	reactive as t_reactive,
	// VueConstructor as t_Vue,
	CreateElement,
	h_CreateElement,
	defineComponent as t_defineComponent,
	onMounted as t_onMounted,
	onUnmounted as t_onUnmounted,
	onBeforeMount as t_onBeforeMount,
	onBeforeUnmount as t_onBeforeUnmount,
	ref as t_ref,
	toRef as t_toRef,
	WatchEffect as t_WatchEffect,
	shallowRef as t_shallowRef,
	computed as t_computed,
	unref as t_unref,
	watch as t_watch,
	getCurrentInstance as t_getCurrentInstance,
	isRef as t_isRef,
	inject as t_inject,
	nextTick as t_nextTick,
	markRaw as t_markRaw,
	VNode
} from "./types/vue";
import { t_defTable } from "./types/xUI/t_tableConfigs";

declare global {
	// const Vue: t_Vue;
	const $: any;
	const _: t_lodash;
	const _api: t_api;
	const _opts: t_opts;
	const _rules: t_rules;
	const _reg: t_reg;
	const _xUtils: t_xUtils;
	const _helper: any;

	/* window */
	const defItems: i_defItems;
	const defItem: i_defItem;
	const defTable: t_defTable;

	/* 国际化 */
	const i18nMany: (prop: string, options?: object) => string[];
	const i18n: (prop: string, options?: object) => string;
	/* window */

	/**
	 * 实际上是挂载在Vue上
	 * ∵在sfc文件中使用了with
	 * ∴可以直接使用
	 */

	/**
	 * 判断是否是vNode Vue.js里面TYPE_IS_VNODE
	 */
	const isVNode: (obj: object) => boolean;
	const cloneVNode: (obj: VNode, options: object) => VNode;
	const reactive: typeof t_reactive;
	const isRef: typeof t_isRef;
	const ref: typeof t_ref;
	const toRef: typeof t_toRef;
	const watch: typeof t_watch;
	const inject: typeof t_inject;
	const getCurrentInstance: typeof t_getCurrentInstance;
	const shallowRef: typeof t_shallowRef;
	const watchEffect: t_WatchEffect;
	const unref: typeof t_unref;
	const computed: typeof t_computed;
	const defineComponent: typeof t_defineComponent;
	const onMounted: typeof t_onMounted;
	const markRaw: typeof t_markRaw;
	const onUnmounted: typeof t_onUnmounted;
	const nextTick: typeof t_nextTick;
	const onBeforeUnmount: typeof t_onBeforeUnmount;
	const onBeforeMount: typeof t_onBeforeMount;
	const isObject: (obj: any) => boolean;
	/** 查找vm叫componentName的祖先 */
	const injectVm: (vm: object, componentName: string) => object;
	/**
	 * 判断对象是否有属性
	 */
	const hasOwn: (obj: object, prop: string) => boolean;

	/* h 函数 start */
	const h: CreateElement;
	/** html tag:xTableVir 扩展行的包裹元素，有特定的样式类 x-table-vir-expand-row */
	const hTableExpandRow: h_CreateElement;
	/** html tag:div */
	const hDiv: h_CreateElement;
	/** html tag:span */
	const hSpan: h_CreateElement;
	/** xUI tag:xBtn */
	const hxBtn: h_CreateElement;
	/** xUI tag:xIcon */
	const hxIcon: h_CreateElement;
	/** xUI tag:xTag */
	const hxTag: h_CreateElement;
	/** xUI tag:xItem */
	const hxItem: h_CreateElement;
	/*
	 * 在组件生命周期内，涉及循环渲染，用于隔离循环渲染的VNode,(Code Hacks xTableVir设计待优化)
	 */
	const hVmSingleNode: (vm, prop: string, node: VNode) => VNode;
	/*
	 * v-xtips的h渲染函数简写方法，支持hover
	 */
	const hTipsHover: (options: t_xTipsHover) => object;
	/**
	 * 根据value从options里获取label，用xTag展示，如果options里面提供xTag配置信息，会用对应的形式展示
	 */
	const hVal2Tag: (value: string, options: t_options[]) => VNode;
	/**
	 * 字符串 多余的有省略号
	 *
	 * @param {string} content
	 * @returns {VNode}
	 */
	const hEllipsis: (content: string) => VNode;
	/**
	 * 列表，超出限定竖向显示更多下来的操作类render
	 */
	const hBtnWithMore: (options: t_ActionAndMore) => VNode;
	/**
	 * 按钮，confirm在按钮之上的confirm提示
	 */
	const hTipsDel: (tips: string) => VNode;
	/**
	 * 列表， link a 标签 render
	 */
	const hLink: (options: any) => VNode;
	/* h 函数 end */

	/**
	 * xTableVir合并row的数据必须经过预处理，得到rowspan相关数据
	 * 其余每一列的合并项以递归的方式处理
	 */
	const xTableVirNewGroupSortedRows: (options: t_xTableVirNewGroupSortedRows) => object[];
	/**
	 * 修改xTableVir合并row的高度
	 */
	const xTableVirModifyCellsHeight: (options: any) => VNode[];

	const mergeProps4h: any;

	/* 基础框架 */
	const I18N_LANGUAGE: string;
	const _adminTools: t_adminTools;
}
