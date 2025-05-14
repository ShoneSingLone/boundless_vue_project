import { t_MoCfContext } from "./types/business/_MoCfContext";

declare global {
	/* 华为mo 2.0框架 */
	const appWebPath: string;
	const getMoCfContext: t_MoCfContext;
	const _MoCfContext: t_MoCfContext;
}
