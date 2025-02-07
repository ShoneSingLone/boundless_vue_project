import { VNode } from "../vue";

type t_pagination = {
	page: number;
	total: number;
	size: number;
	pageSizes?: number[];
};
type t_data = {
	set?: Set<string>;
	selected?: any[];
	expandedRowKeys?: any[];
	list: any[];
};
type t_column = {
	isShow?: boolean;
	prop: string;
	/* 必填，用于filter过滤展示 */
	label: string;
	cellRenderer?: (params: t_cellRendererParams) => VNode | string | number;
	headerCellRenderer?: (params: t_header_cellRendererParams) => VNode | string | number;
};
type t_colMultiple = {
	/**
	 * 从行数据里面获取数据,指定的字段
	 */
	by: string;
	/**
	 * 获取当前列表的配置项，可以获取 data pagination 等信息，用于内部判断逻辑
	 */
	getConfigs: () => object;
	disabled?: (params: t_cellRendererParams) => boolean | string;
	isHide?: (params: t_cellRendererParams) => boolean;
};
type t_cellRendererParams = {
	class: string;
	columns: any[];
	column: object;
	columnIndex: number;
	cellData: any;
	isScrolling: false;
	rowData: object;
	rowIndex: number;
};
type t_header_cellRendererParams = {
	columns: any[];
	column: object;
	columnIndex: number;
	headerIndex: number;
	style: any;
	ns: any;
	sortBy: any;
	sortState: any;
	headerCellProps: any;
	onColumnSorted: any;
	attrs: any;
	on: any;
	scopedSlots: any;
	class: any;
};

type t_colOprations = {
	prop?: "COL_ACTIONS";
	fixed?: "left" | "right";
	width: number;
	cellRenderer: (params: t_cellRendererParams) => VNode;
};

export type t_tableOptions = {
	isHideFilter?: boolean;
	isHideQuery?: boolean;
	isShowReset?: boolean;
	pagination?: t_pagination;
	onQuery: (pagination: t_pagination) => void;
	onSelectedChange?: (newValue: string[], oldValue: string[]) => void;
	data: t_data;
	columns: t_column[];
};

export declare type t_defTableFn = (options: t_tableOptions) => t_tableOptions;

/** window.defTable.*/
export interface t_defTable extends t_defTableFn {
	colSingle(options: t_colMultiple): any;
	colExpandArrow(options?: t_colOprations): any;
	colMultiple(options: t_colMultiple): any;
	colActions(options: t_colOprations): any;
}
