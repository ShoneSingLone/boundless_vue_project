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

declare module "./index" {
	interface LoDashStatic {
		$previewImgs: previewImgs;
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
