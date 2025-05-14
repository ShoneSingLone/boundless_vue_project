import { Message } from "../component/Message";
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
	/* mask的样式 */
	styleViewerMask?: {
		/** 背景色*/
		backgroundColor?: string;
		/** 透明度*/
		opacity?: number;
	};
};

declare type previewImgs = {
	(options: t_previewImgsOptions): Vue;
};

type t_openModalOptions = {
	/**弹窗的title */
	title: any;
	/** 弹窗组件的url*/
	url: string;
	isHideHeader?: false | true;
	/** 非必填项 默认root节点，如果使用inject，可以明确指定父节点 */
	parent?: Vue;
	onCancel?: (options?: any) => void;
	[prop: string]: any;
	/** @deprecated 兼容以前Layer的写法,可以用，但是没必要 */
	_VueCtor?: Vue;
};

type t_modalConfigs = {
	/** 全屏 */
	fullscreen?: boolean;
};
declare class openModalComponent extends Vue {}

declare module "./index" {
	interface LoDashStatic {
		/**
		 * 常用于列表columns信息复用，将数组变为对象，默认key为prop
		 * @param columns [{prop: "value", label: string},{prop: "label", label: string}]
		 * @param propsArray ["prop", "label"]
		 * @param prop 可选，默认 "prop"
		 * @returns object {prop:{prop: "prop", label: string},value:{prop: "value", label: string}}
		 */
		$pickFromArray<T extends object, U extends keyof T>(
			object: T,
			props: Array<Many<U>>,
			key?: string
		): Pick<T, U>;
		$previewImgs: previewImgs;
		$openModal: (options: t_openModalOptions, modalConfigs?: t_modalConfigs) => Promise<Vue>;
		$notify: Notify;
		$msg: Message;
		/* @description 请求API的工具函数*/
		$ajax: {
			upload: (options: {
				method?: "post" | "get";
				url: string;
				formData: FormData;
				callback?: (...args) => void;
			}) => Promise<any>;
			downloadOctetStream: (args: {
				url: string;
				method?: "get" | "post";
				beforeSend?: Function;
				handleResult?: Function;
				onProgress?: Function;
				payload?: object;
			}) => Promise<any>;
			post: (url: string, options?: { data: object }) => Promise<any>;
			get: (url: string, options?: { data: object }) => Promise<any>;
			put: (url: string, options?: { data: object }) => Promise<any>;
			delete: (url: string, options?: { data: object }) => Promise<any>;
			requestInjector: (request: t_injector) => t_injector;
			responseInjector: (response: t_injector) => t_injector;
		};
	}
}
