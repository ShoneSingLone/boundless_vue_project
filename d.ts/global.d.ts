import { LoDashStatic as t_lodash } from "./types/lodash/index.d";
import { t_MoCfContext } from "./types/business/_MoCfContext";
import { t_api } from "./types/business/_api";
import { t_opts } from "./types/business/_opts";
import { t_rules } from "./types/business/_rules";
import { t_reg } from "./types/business/_reg";
import { t_useXui } from "./types/business/_useXui/index.d";
import {
	reactive as t_reactive,
	VueConstructor as t_Vue,
	CreateElement,
	defineComponent as t_defineComponent,
	onMounted as t_onMounted,
	onBeforeUnmount as t_onBeforeUnmount,
	ref as t_ref,
	toRef as t_toRef,
	shallowRef as t_shallowRef,
	computed as t_computed,
	unref as t_unref,
	watch as t_watch,
	getCurrentInstance as t_getCurrentInstance,
	isRef as t_isRef,
	inject as t_inject
	nextTick as t_nextTick,
} from "./types/vue";

type t_normalizeComponent = (
	scriptExports: any,
	render: any,
	staticRenderFns: any,
	functionalTemplate: any,
	injectStyles: any,
	scopeId: any,
	moduleIdentifier: any,
	shadowMode: any
) => {
	exports: any;
	options: any;
};

declare global {
	const _MoCfContext: t_MoCfContext;
	const Vue: t_Vue;
	const $: any;
	const _: t_lodash;
	const _api: t_api;
	const _opts: t_opts;
	const _rules: t_rules;
	const _reg: t_reg;
	const _useXui: t_useXui;

	interface Window {
		/* 基础框架 */
		I18N_LANGUAGE: string;
		_api: t_api;
		_opts: t_opts;
		_rules: t_rules;
		_reg: t_reg;
		_useXui: t_useXui;
		i18n: (prop: string, options?: object) => string;
		defItem: (obj: object) => any;

		/* 华为mo 2.0框架 */
		appWebPath: string;
		getMoCfContext(): t_MoCfContext;
		_MoCfContext: t_MoCfContext;
	}

	/* window */
	/**
	 * 判断是否是vNode Vue.js里面TYPE_IS_VNODE
	 */
	const defItem: (obj: object) => any;
	/* 国际化 */
	const i18n: (prop: string, options?: object) => string;
	/* window */

	/**
	 * 实际上是挂载在Vue上
	 * ∵在sfc文件中使用了with
	 * ∴可以直接使用
	 */
	const isVNode: (obj: object) => boolean;
	const h: CreateElement;
	const reactive: typeof t_reactive;
	const isRef: typeof t_isRef;
	const ref: typeof t_ref;
	const toRef: typeof t_toRef;
	const watch: typeof t_watch;
	const inject: typeof t_inject;
	const getCurrentInstance: typeof t_getCurrentInstance;
	const shallowRef: typeof t_shallowRef;
	const unref: typeof t_unref;
	const computed: typeof t_computed;
	const defineComponent: typeof t_defineComponent;
	const onMounted: typeof t_onMounted;
	const nextTick: typeof t_nextTick;
	const onBeforeUnmount: typeof t_onBeforeUnmount;
	const isObject: (obj: any) => boolean;
	/**
	 * 该函数是一个用于构建Vue组件的方法，接收多个参数，包括组件的脚本、渲染函数、静态渲染函数、模板类型、样式注入函数、作用域ID、模块标识符和阴影模式等。根据参数的不同，对组件进行配置和处理，最后返回一个包含组件脚本和选项的对象。
	 */
	const normalizeComponent: t_normalizeComponent;

	/**
	 * 判断对象是否有属性
	 */
	const hasOwn: (obj: object, prop: string) => boolean;
	const merge_hFnProps: any;
}
