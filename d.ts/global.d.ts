import { LoDashStatic as t_lodash } from "./types/lodash/index.d";
import { t_MoCfContext } from "./types/business/_MoCfContext";
import { t_api } from "./types/business/_api";
import { t_opts } from "./types/business/_opts";
import { t_rules } from "./types/business/_rules";
import { t_reg } from "./types/business/_reg";
import { t_useXui } from "./types/business/_useXui/index.d";
import { i_defItems } from "./types/xUI/t_xItemConfigs.d";

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
	inject as t_inject,
	nextTick as t_nextTick
} from "./types/vue";
import { t_defTable } from "./types/xUI/t_tableConfigs";

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
	const defItems: i_defItems;
	const defItem: any;
	const defTable: t_defTable;

	/* 国际化 */
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
	 * 判断对象是否有属性
	 */
	const hasOwn: (obj: object, prop: string) => boolean;
	const merge_hFnProps: any;
}
