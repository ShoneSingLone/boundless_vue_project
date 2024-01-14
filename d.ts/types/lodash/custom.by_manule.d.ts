import { Notify } from "../component/notification";
import _ = require("./index");

type t_injector = {
	[prop: string]: any;
};

declare module "./index" {
	interface LoDashStatic {
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
