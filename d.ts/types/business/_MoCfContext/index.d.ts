import { t_xItemConfigsOptions } from "../../xUI/t_xItemConfigs";

type t_ProductService = {
	service_type: string;
	/**
	 *  安全组 sg
	 * vpc
	 * 云硬盘、云硬盘 evs */
	icon: "sg" | "vpc" | "evs" | "ecs";
};
type t_ProductServiceResponse = {
	region_id: string;
	service_type: string;
	start: number;
	limit: number;
	name: string;
};

type t_BuylayerConfigs = {
	isHideCost?: boolean;
	isShowBtn?: boolean;
	btnArray?: any[];
	onOk?: () => Promise<any>;
	onCancel?: () => Promise<any>;
	btnOk?: any;
	btnCancel?: any;
};

type t_OrderDisplay = {
	/**
	 *  用于展示的label，[中文，英文]
	 */
	label: string[];
	/**
	 *  用于展示的value，[中文，英文]	 */
	type?: string;
	xItem: t_xItemConfigsOptions;
};

export type t_MoCfContext = {
	locale: "zh-cn" | "en-us";
	BuylayerConfigs: (opt_BuylayerConfigsions: t_BuylayerConfigs) => t_BuylayerConfigs;
	OrderDisplay: (displayArray: t_OrderDisplay[]) => { zh_CN: any[]; en_US: any[] };
	getFirstServiceId(service_type: string): Promise<string>;
	/**
	 * mo 通用请求参数添加 header
	 */
	AjaxRequestInjector<T>(options: T): T;
	_api: {
		getProductListFn: (params: t_ProductServiceResponse) => Promise<any>;
		/**
		 * 获取价格
		 */
		priceRate: (params: any) => Promise<any>;
		order: (params: { subscriptions: object[] }) => Promise<any>;
		getProjectDetailByProjectId: (params: any) => Promise<any>;
	};
	/**
	 * 订单申请后，提示查看订单进度或者返回列表页面
	 * moBuyLayerConfigs 用于订单提交后禁止 再次提交，hide 按钮
	 * @param {{ response: object; moBuyLayerConfigs: object; goBack: Function }} options
	 * @returns {Promise<string>}
	 */
	ensureApplyResponse(options: {
		response: object;
		moBuyLayerConfigs: object;
		goBack: Function;
	}): Promise<string>;
	/*
	 * 申请服务 必要的productId
	 * url 与当前产品有关
	 * @returns {Promise<string>}
	 * */
	openProductServiceDialog(options: t_ProductService): Promise<string>;
	commonParams: () => {
		projectId: string;
		tenantId: string;
		regionId: string;
		cloudInfraId?: string;
	};
	getActions(): Promise<any>;
	getGlobalConfig(): Promise<any>;
	getLocale(): Promise<any>;
	getProjectActions(): Promise<any>;
	getRegionLinks(e?: any): Promise<any>;
	getRegions(): Promise<any>;
	getSamlDatas(): Promise<any>;
	getUser(): Promise<any>;
	activeMenu$(): any;
	getCollectedEndpoints$(): any;
	getCurrentService$(): any;
	getEndpoints$(): any;
	getLinks$(): any;
	getSafeArea$(): any;
	getSelectedRegionId$(): any;
	isChangeRegionReload$(): any;
	isCheckMoLicense$(): any;
	isDisplayAllRegions$(): any;
	isLanguageSwitchDisplay$(): any;
	isMainMenuDisplay$(): any;
	isRegionDisplay$(): any;
	isSidebarDisplay$(): any;
	version: string;
	userInfo: {
		assumedInfo: undefined;
		cftk: "ea5ac9625b6eb2f37b0cfbc14238b132";
		displayName: "";
		domainId: "b2a213969f4847baa0d02843b35e578b";
		domainName: "光华测试租户";
		extProjects: {};
		hasAssumeRoleFlag: false;
		isLoginUserFlag: true;
		name: "ghca_fe_xxl";
		projectId: "3dd16975cb0d4e9e821353f2097eea3f";
		projectName: "dg-gh-1_dsdsa";
		sm_tag: "all";
		topVdcId: "00dfa18e-fbed-499d-a35e-79bfb435bd9f";
		userId: "571ff67ffefe4249965b79bdd349e831";
		userRoles: ["vdc_adm", "vdc_owner", "tag_adm", "approv_adm", "te_admin"];
		vdcId: "00dfa18e-fbed-499d-a35e-79bfb435bd9f";
		vdcLevel: "1";
	};
	appConfigs: {
		extProjectsProjectsRoles: ["te_admin", "readonly", "vpc_netadm", "elbadm"];
		gotoServiceConsole: true;
		manageOneOnline: "";
		moScale: "MO200VM";
		resourceManagerEndpoints: [
			"home",
			"vpc",
			"obs",
			"ims",
			"nfviecs",
			"nfvievs",
			"nfvivpc",
			"nfvivpn"
		];
		scenario: "";
		showHuaweicloudConsole: false;
		showVDCService: false;
		workScene: "HuaweiCloudStack";
	};
	regionsData: {
		regions: [
			{
				seqId: 1;
				id: "dg-gh-1";
				name: "东莞";
				created: "2023-09-17 21:58:01.0";
				lastModified: "2024-01-15 16:47:34.0";
				locale: "zh-cn";
				active: true;
				domainType: "SC";
				type: "private";
				deployType: null;
				authUrl: null;
				iamId: null;
				globalId: "dg-gh-1";
				projects: [
					{
						id: "1b90e12d46c34697bb817ba027fcffe3";
						name: "cloud";
						displayName: "cloud_test";
						disable: false;
						userProjectNameFlag: false;
						tenantId: "a5a35f00-8460-4720-955f-1ae16d82cc6e";
					},
					{
						id: "d0b194c69371472eb6c37b5433ef7a29";
						name: "dg-gh-1_ah";
						displayName: "dg-gh-1_ah";
						disable: false;
						userProjectNameFlag: false;
						tenantId: "55a47138-45d7-43c5-b2ee-96425adaa756";
					},
					{
						id: "2d9b8576c2d04a5e9f38827c78ca4f59";
						name: "dg-gh-1_pro2023";
						displayName: "dg-gh-1_pro2023";
						disable: false;
						userProjectNameFlag: false;
						tenantId: "55a47138-45d7-43c5-b2ee-96425adaa756";
					},
					{
						id: "cbb606230b634baaba5e22d515458831";
						name: "测试资源池test";
						displayName: "测试资源池test";
						disable: false;
						userProjectNameFlag: false;
						tenantId: "a5a35f00-8460-4720-955f-1ae16d82cc6e";
					}
				];
				disable: true;
			},
			{
				seqId: 7;
				id: "cn-shanghai";
				name: "阿里云_华东2_上海";
				created: "2023-09-19 10:31:44.0";
				lastModified: "2023-09-19 10:57:32.0";
				locale: "zh-cn";
				active: true;
				domainType: "SC";
				type: null;
				deployType: null;
				authUrl: null;
				iamId: null;
				globalId: "cn-shanghai";
				projects: [
					{
						id: "3ffcc32188324438a7be719b2c434a7c";
						name: "阿里公有云";
						displayName: "阿里公有云";
						disable: false;
						userProjectNameFlag: false;
						tenantId: "55a47138-45d7-43c5-b2ee-96425adaa756";
					}
				];
				disable: true;
			},
			{
				seqId: 9;
				id: "ap-chengdu";
				name: "腾讯云_西南地区_成都";
				created: "2023-09-19 11:16:42.0";
				lastModified: "2023-09-19 11:16:42.0";
				locale: "zh-cn";
				active: true;
				domainType: "SC";
				type: null;
				deployType: null;
				authUrl: null;
				iamId: null;
				globalId: "ap-chengdu";
				projects: [
					{
						id: "adad750b7ad44533adf3824b94e615c5";
						name: "hyper-v";
						displayName: "hyper-v";
						disable: false;
						userProjectNameFlag: false;
						tenantId: "55a47138-45d7-43c5-b2ee-96425adaa756";
					},
					{
						id: "06581217adbe463e89af78278907e1f7";
						name: "腾旭公有云";
						displayName: "腾旭公有云";
						disable: false;
						userProjectNameFlag: false;
						tenantId: "55a47138-45d7-43c5-b2ee-96425adaa756";
					}
				];
				disable: true;
			},
			{
				seqId: 202;
				id: "ghca-fc";
				name: "光华冠群FusionCompute";
				created: "2023-12-06 15:42:17.0";
				lastModified: "2024-01-05 17:27:48.0";
				locale: "zh-cn";
				active: true;
				domainType: "SC";
				type: null;
				deployType: null;
				authUrl: null;
				iamId: null;
				globalId: "ghca-fc";
				projects: [
					{
						id: "9895575c422f46f6803f8869b0fd075c";
						name: "FC";
						displayName: "FC";
						disable: false;
						userProjectNameFlag: false;
						tenantId: "55a47138-45d7-43c5-b2ee-96425adaa756";
					}
				];
				disable: true;
			},
			{
				seqId: 15;
				id: "hw-cn-north-4";
				name: "华为公有云_华北-北京四";
				created: "2023-09-25 16:47:05.0";
				lastModified: "2023-09-25 16:47:05.0";
				locale: "zh-cn";
				active: true;
				domainType: "SC";
				type: null;
				deployType: null;
				authUrl: null;
				iamId: null;
				globalId: "hw-cn-north-4";
				projects: [
					{
						id: "600f2ed4a40f49318e293a61325273e0";
						name: "华为公有云";
						displayName: "华为公有云";
						disable: false;
						userProjectNameFlag: false;
						tenantId: "55a47138-45d7-43c5-b2ee-96425adaa756";
					}
				];
				disable: true;
			},
			{
				seqId: 226;
				id: "cty-chengdou4";
				name: "天翼公有云_成都4";
				created: "2023-12-21 16:46:59.0";
				lastModified: "2024-01-15 11:07:06.0";
				locale: "zh-cn";
				active: true;
				domainType: "SC";
				type: null;
				deployType: null;
				authUrl: null;
				iamId: null;
				globalId: "cty-chengdou4";
				projects: [
					{
						id: "c8e3e7079c6843c38202c2a73df31ac9";
						name: "cty天翼云";
						displayName: "cty天翼云";
						disable: false;
						userProjectNameFlag: false;
						tenantId: "55a47138-45d7-43c5-b2ee-96425adaa756";
					}
				];
				disable: false;
			}
		];
		projectList: [
			{
				regions: [
					{
						region_id: "ghca-fc";
						region_status: "normal";
						region_name: {
							zh_cn: "光华冠群FusionCompute";
							en_us: "GHCA FusionCompute";
						};
					}
				];
				id: "9895575c422f46f6803f8869b0fd075c";
				name: "FC";
				iam_project_name: "FC";
				display_name: "FC";
				description: "";
				enabled: true;
				domain_id: "100661a6860d46c695bdb7f39bd37b66";
				tenant_id: "55a47138-45d7-43c5-b2ee-96425adaa756";
				tenant_name: "ghca_n2one";
				level: "1";
				role_id: null;
				role_name: null;
				is_shared: "false";
			},
			{
				regions: [
					{
						region_id: "dg-gh-1";
						region_status: "normal";
						region_name: {
							zh_cn: "东莞";
							en_us: "东莞";
						};
					}
				];
				id: "1b90e12d46c34697bb817ba027fcffe3";
				name: "cloud";
				iam_project_name: "cloud";
				display_name: "cloud_test";
				description: "";
				enabled: true;
				domain_id: "100661a6860d46c695bdb7f39bd37b66";
				tenant_id: "a5a35f00-8460-4720-955f-1ae16d82cc6e";
				tenant_name: "cloud_admin";
				level: "2";
				role_id: null;
				role_name: null;
				is_shared: "false";
			},
			{
				regions: [
					{
						region_id: "cty-chengdou4";
						region_status: "normal";
						region_name: {
							zh_cn: "天翼公有云_成都4";
							en_us: "Ctyun chengdou4";
						};
					}
				];
				id: "c8e3e7079c6843c38202c2a73df31ac9";
				name: "cty天翼云";
				iam_project_name: "cty天翼云";
				display_name: "cty天翼云";
				description: "";
				enabled: true;
				domain_id: "100661a6860d46c695bdb7f39bd37b66";
				tenant_id: "55a47138-45d7-43c5-b2ee-96425adaa756";
				tenant_name: "ghca_n2one";
				level: "1";
				role_id: null;
				role_name: null;
				is_shared: "false";
			},
			{
				regions: [
					{
						region_id: "dg-gh-1";
						region_status: "normal";
						region_name: {
							zh_cn: "东莞";
							en_us: "东莞";
						};
					}
				];
				id: "d0b194c69371472eb6c37b5433ef7a29";
				name: "dg-gh-1_ah";
				iam_project_name: "dg-gh-1_ah";
				display_name: "dg-gh-1_ah";
				description: "ah最小权限测试";
				enabled: true;
				domain_id: "100661a6860d46c695bdb7f39bd37b66";
				tenant_id: "55a47138-45d7-43c5-b2ee-96425adaa756";
				tenant_name: "ghca_n2one";
				level: "1";
				role_id: null;
				role_name: null;
				is_shared: "false";
			},
			{
				regions: [
					{
						region_id: "dg-gh-1";
						region_status: "normal";
						region_name: {
							zh_cn: "东莞";
							en_us: "东莞";
						};
					}
				];
				id: "2d9b8576c2d04a5e9f38827c78ca4f59";
				name: "dg-gh-1_pro2023";
				iam_project_name: "dg-gh-1_pro2023";
				display_name: "dg-gh-1_pro2023";
				description: "";
				enabled: true;
				domain_id: "100661a6860d46c695bdb7f39bd37b66";
				tenant_id: "55a47138-45d7-43c5-b2ee-96425adaa756";
				tenant_name: "ghca_n2one";
				level: "1";
				role_id: null;
				role_name: null;
				is_shared: "false";
			},
			{
				regions: [
					{
						region_id: "ap-chengdu";
						region_status: "normal";
						region_name: {
							zh_cn: "腾讯云_西南地区_成都";
							en_us: "TencentCloud_SouthwestChina_Chengdu";
						};
					}
				];
				id: "adad750b7ad44533adf3824b94e615c5";
				name: "hyper-v";
				iam_project_name: "hyper-v";
				display_name: "hyper-v";
				description: "";
				enabled: true;
				domain_id: "100661a6860d46c695bdb7f39bd37b66";
				tenant_id: "55a47138-45d7-43c5-b2ee-96425adaa756";
				tenant_name: "ghca_n2one";
				level: "1";
				role_id: null;
				role_name: null;
				is_shared: "false";
			},
			{
				regions: [
					{
						region_id: "hw-cn-north-4";
						region_status: "normal";
						region_name: {
							zh_cn: "华为公有云_华北-北京四";
							en_us: "Huawei Cloud CN North-Beijing4";
						};
					}
				];
				id: "600f2ed4a40f49318e293a61325273e0";
				name: "华为公有云";
				iam_project_name: "华为公有云";
				display_name: "华为公有云";
				description: "";
				enabled: true;
				domain_id: "100661a6860d46c695bdb7f39bd37b66";
				tenant_id: "55a47138-45d7-43c5-b2ee-96425adaa756";
				tenant_name: "ghca_n2one";
				level: "1";
				role_id: null;
				role_name: null;
				is_shared: "false";
			},
			{
				regions: [
					{
						region_id: "dg-gh-1";
						region_status: "normal";
						region_name: {
							zh_cn: "东莞";
							en_us: "东莞";
						};
					}
				];
				id: "cbb606230b634baaba5e22d515458831";
				name: "测试资源池test";
				iam_project_name: "测试资源池test";
				display_name: "";
				description: "";
				enabled: true;
				domain_id: "100661a6860d46c695bdb7f39bd37b66";
				tenant_id: "a5a35f00-8460-4720-955f-1ae16d82cc6e";
				tenant_name: "cloud_admin";
				level: "2";
				role_id: null;
				role_name: null;
				is_shared: "false";
			},
			{
				regions: [
					{
						region_id: "ap-chengdu";
						region_status: "normal";
						region_name: {
							zh_cn: "腾讯云_西南地区_成都";
							en_us: "TencentCloud_SouthwestChina_Chengdu";
						};
					}
				];
				id: "06581217adbe463e89af78278907e1f7";
				name: "腾旭公有云";
				iam_project_name: "腾旭公有云";
				display_name: "腾旭公有云";
				description: "";
				enabled: true;
				domain_id: "100661a6860d46c695bdb7f39bd37b66";
				tenant_id: "55a47138-45d7-43c5-b2ee-96425adaa756";
				tenant_name: "ghca_n2one";
				level: "1";
				role_id: null;
				role_name: null;
				is_shared: "false";
			},
			{
				regions: [
					{
						region_id: "cn-shanghai";
						region_status: "normal";
						region_name: {
							zh_cn: "阿里云_华东2_上海";
							en_us: "AliCloud_China_Shanghai";
						};
					}
				];
				id: "3ffcc32188324438a7be719b2c434a7c";
				name: "阿里公有云";
				iam_project_name: "阿里公有云";
				display_name: "阿里公有云";
				description: "";
				enabled: true;
				domain_id: "100661a6860d46c695bdb7f39bd37b66";
				tenant_id: "55a47138-45d7-43c5-b2ee-96425adaa756";
				tenant_name: "ghca_n2one";
				level: "1";
				role_id: null;
				role_name: null;
				is_shared: "false";
			}
		];
		selectRegionId: "cty-chengdou4";
		regionName: "天翼公有云_成都4";
		displayRegionName: "天翼公有云_成都4(cty天翼云)";
		isMultiCloudScene: false;
		hwsRegions: [];
	};
	checkAsidebarStatus(callback: Function): void;
	queryPrice(params: any): void;
	/**
	 * @description订单发生错误，处理订单错误信息
	 * @param response
	 */
	handleOrderError(response: any): void;
	getOneHourBeginEndTime(): {
		begin_time: string;
		end_time: string;
	};
};
