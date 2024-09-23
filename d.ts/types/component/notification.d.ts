import Vue, { VNode } from "../vue/index";
import { MessageType } from "./message";

export type NotificationPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

/** Notification Component */
export declare class ElNotificationComponent extends Vue {
	/** Close the Notification instance */
	close(): void;
}

export interface ElNotificationOptions {
	/** Title */
	title: string;

	/** Description text */
	message: string | (() => VNode | VNode[]);

	/** Notification type */
	type?: MessageType;

	/** Custom icon's class. It will be overridden by type */
	iconClass?: string;

	/** Custom class name for Notification */
	customClass?: string;

	/** Duration before close. It will not automatically close if set 0 */
	duration?: number;

	/** Whether to show a close button */
	showClose?: boolean;

	/** Whether message is treated as HTML string */
	dangerouslyUseHTMLString?: boolean;

	/** Callback function when closed */
	onClose?: () => void;

	/** Callback function when notification clicked */
	onClick?: () => void;

	/** Offset from the top edge of the screen. Every Notification instance of the same moment should have the same offset */
	offset?: number;

	/** custom position */
	position?: NotificationPosition;
}

export declare type ElNotificationFn = {
	/** Show a notification */
	(options: ElNotificationOptions): ElNotificationComponent;
} & {
	closeAll: () => void;
	/**
	 * @description
	 * @param id
	 * @param onClick 用户自定义onClose
	 */
	close: (id: string, onClose?: () => void) => void;
};

export interface Notify extends ElNotificationFn {
	/** Show a success notification */
	success(message: string | VNode): Promise<ElNotificationComponent>;

	/** Show a success notification */
	success(options: ElNotificationOptions): Promise<ElNotificationComponent>;

	/** Show a warning notification */
	warning(message: string | VNode): Promise<ElNotificationComponent>;

	/** Show a warning notification */
	warning(options: ElNotificationOptions): Promise<ElNotificationComponent>;

	/** Show an info notification */
	info(message: string | VNode): Promise<ElNotificationComponent>;

	/** Show an info notification */
	info(options: ElNotificationOptions): Promise<ElNotificationComponent>;

	/** Show an error notification */
	error(message: string | VNode): Promise<ElNotificationComponent>;

	/** Show an error notification */
	error(options: ElNotificationOptions): Promise<ElNotificationComponent>;
}
