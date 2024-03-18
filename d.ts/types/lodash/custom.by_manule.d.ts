import { Notify } from "../component/notification";
import Vue, { VNode } from "../vue/index";

import _ = require("./index");

type t_injector = {
	[prop: string]: any;
};
type t_previewImgsOptions = {
	/** 需要预览的图片的url地址*/
	urlList: string[];
	/** 初始展示图片的下标*/
	index?: number;
	/** 初始展示图片的地址*/
	currentUrl?: string;
};

declare type previewImgs = {
	(options: t_previewImgsOptions): Vue;
};

type t_openModalOptions = {
	title: any;
	/** 弹窗组件的url*/
	url: string;
	/** 非必填项 默认root节点，如果使用inject，可以明确指定父节点 */
	parent?: Vue;
	/** @deprecated 兼容以前Layer的写法,可以用，但是没必要 */
	_VueCtor?: Vue;
	[prop: string]: any;
	onCancel?: (options?: any) => void;
};
declare class openModalComponent extends Vue {}

declare module "./index" {
	interface LoDashStatic {
		$previewImgs: previewImgs;
		$openModal: (options: t_openModalOptions) => Promise<Vue>;
		$notify: Notify;
		/* @description 请求API的工具函数*/
		$ajax: {
			post: (url: string, options?: { data: object }) => Promise<any>;
			get: (url: string, options?: { data: object }) => Promise<any>;
			put: (url: string, options?: { data: object }) => Promise<any>;
			delete: (url: string, options?: { data: object }) => Promise<any>;
			requestInjector: (request: t_injector) => t_injector;
			responseInjector: (response: t_injector) => t_injector;
		};
	}
}
