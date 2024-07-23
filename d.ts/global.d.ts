import { LoDashStatic as t_lodash } from "./types/lodash/index.d";
import { t_MoCfContext } from "./types/business/_MoCfContext";
import { t_adminTools } from "./types/business/_AdminConsole";
import { t_api } from "./types/business/_api";
import { t_opts } from "./types/business/_opts";
import { t_rules } from "./types/business/_rules";
import { t_reg } from "./types/business/_reg";
import { t_xUtils, t_jsxFns } from "./types/business/_xUtils/index.d";
import { i_defItems } from "./types/xUI/t_xItemConfigs.d";

import {
	reactive as t_reactive,
	VueConstructor as t_Vue,
	CreateElement,
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
	nextTick as t_nextTick
} from "./types/vue";
import { t_defTable } from "./types/xUI/t_tableConfigs";
import * as dayjs from "./types/dayjs";

declare global {
	// const Vue: t_Vue;
	const $: any;
	const dayjs: dayjs;
	const _: t_lodash;
	const _api: t_api;
	const _opts: t_opts;
	const _rules: t_rules;
	const _jsxFns: t_jsxFns;
	const _reg: t_reg;
	const _xUtils: t_xUtils;
	const _helper: any;

	/* window */
	const defItems: i_defItems;
	const defItem: any;
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
	const h: CreateElement;
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
	const onUnmounted: typeof t_onUnmounted;
	const nextTick: typeof t_nextTick;
	const onBeforeUnmount: typeof t_onBeforeUnmount;
	const onBeforeMount: typeof t_onBeforeMount;
	const isObject: (obj: any) => boolean;
	/**
	 * 判断对象是否有属性
	 */
	const hasOwn: (obj: object, prop: string) => boolean;
	const merge_hFnProps: any;

	/* 基础框架 */
	const I18N_LANGUAGE: string;

	/* 华为mo 2.0框架 */
	const appWebPath: string;
	const getMoCfContext: t_MoCfContext;
	const _MoCfContext: t_MoCfContext;
	const _adminTools: t_adminTools;
}
