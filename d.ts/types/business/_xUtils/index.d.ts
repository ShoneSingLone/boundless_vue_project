import { PopoverPlacement } from "../../component/popover";
import { VNode } from "../../vue";

export type t_xTableVirNewGroupSortedRows = {
	/** 由数组根据相同字段已经分好组的对象 */
	groupedRowObj: object;
	/** 需要合并的列的prop */
	mergeProp: string;
};

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

type t_ActionAndMoreChildrenConfirm = {
	tips: String | Function | Object;
	onOk: () => Promise<any>;
	onCancel?: () => Promise<any>;
};

type t_ActionAndMoreChildren = {
	label: string;
	onClick?: () => Promise<any>;
	confirm?: t_ActionAndMoreChildrenConfirm;
};

export type t_ActionAndMore = {
	col?: number;
	children: t_ActionAndMoreChildren[];
};

export type t_options = {
	label: string;
	value: any;
};

export type t_xUtils = {
	/**
	 * 该函数是一个用于构建Vue组件的方法，接收多个参数，包括组件的脚本、渲染函数、静态渲染函数、模板类型、样式注入函数、作用域ID、模块标识符和阴影模式等。根据参数的不同，对组件进行配置和处理，最后返回一个包含组件脚本和选项的对象。
	 */
	normalizeComponent: t_normalizeComponent;
	virtualizedListProps: any;
	globalConfigs: any;
	resolveUnref: any;
	identity: any;
	tryOnScopeDispose: any;
	tryOnMounted: any;
	unrefElement: any;
	autoResizerProps: any;
	tableV2HeaderRowProps: any;
	isEqual: any;
	areInputsEqual: any;
	memoizeOne: any;
	getScrollDir: any;
	isRTL: any;
	rAF: any;
	cAF: any;
	isClient: any;
	castArray: any;
	sumReducer: any;
	sum: any;
	tryCall: any;
	enforceUnit: any;
	componentToSlot: any;
	TableV2InjectionKey: any;
	isStringNumber: any;
	throwError: any;
	addUnit: any;
	noop: any;
	ScrollbarDirKey: any;
	renderThumbStyle: any;
	definePropType: any;
	buildProp: any;
	buildProps: any;
	getStyle: any;
	isScroll: any;
	columns: any;
	virtualizedScrollbarProps: any;
	virtualizedGridProps: any;
	tableV2HeaderProps: any;
	tableV2GridProps: any;
	tableV2Props: any;
	ITEM_RENDER_EVT: any;
	SCROLLBAR_MIN_SIZE: any;
	DEFAULT_DYNAMIC_LIST_ITEM_SIZE: any;
	SCROLL_EVT: any;
	FORWARD: any;
	BACKWARD: any;
	AUTO_ALIGNMENT: any;
	SMART_ALIGNMENT: any;
	START_ALIGNMENT: any;
	CENTERED_ALIGNMENT: any;
	END_ALIGNMENT: any;
	HORIZONTAL: any;
	VERTICAL: any;
	BAR_MAP: any;
	RTL: any;
	RTL_OFFSET_NAG: any;
	RTL_OFFSET_POS_ASC: any;
	RTL_OFFSET_POS_DESC: any;
	useGetDerivedNamespace: any;
	useEventListener: any;
	useSupported: any;
	useAutoResize: any;
	useTableRow: any;
	useTableGrid: any;
	useGridWheel: any;
	useCache: any;
	useNamespace: any;
	useWindowSize: any;
	useElementBounding: any;
	useResizeObserver: any;
	DEFAULT_DELAY: number;
	DEFAULT_DISTANCE: number;
	getScrollOptions: Function;
	getScrollContainer: Function;
	getOffsetTopDistance: Function;
};

type t_xTipsHover = { msg?: string; placement?: PopoverPlacement; content?: () => VNode };
