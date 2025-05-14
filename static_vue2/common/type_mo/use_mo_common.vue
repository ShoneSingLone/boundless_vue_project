<script lang="ts">
export default async function ({ _URL_PREFIX_MO }) {
	let [region, locale, agencyId] = _.$urlSearch(["region", "locale", "agencyId"]);

	_.each(
		{
			MoItemRegionId: "/common/type_mo/components/MoItemRegionId.vue",
			MoItemCloudInfra: "/common/type_mo/components/MoItemCloudInfra.vue"
		},
		(url, name) => {
			Vue.component(name, () => _.$importVue(url));
		}
	);

	window.i18nMany = await _.$newI18nMany();

	const _MoCfContext = await (async () => /* mo console ui 基座 */ {
		/* 需要以script src 的形式引入，才能获取 baseURI = "/static/framework/2.0" */
		await _.$appendScript("/static/framework/2.0/mo.console.ui.js", "", true);
		/* mo API */
		window._MoCfContext = { ...window.getMoCfContext() };
		return window._MoCfContext;
	})();

	(function setI18nConfigs() {
		$("html").addClass("mo-common");
		/*  _.$single.doc.on( "click", ".modules-service-list-service-list-drawer-service-content-service-nav-item", _.debounce(async function (event) { }, 100) ); */

		window.appWebPath = _URL_PREFIX_MO;
		const moLang = locale || $("html").lang || "zh-CN";
		const i18nMap = {
			zhCn: "zh-CN",
			enUs: "en-US"
		};
		const key = _.camelCase(moLang);
		const xLanguage = i18nMap[key] || "en-US";
		localStorage["X-Language"] = xLanguage;
		window.I18N_LANGUAGE = xLanguage;

		const domHtml = document.querySelector("html");
		domHtml.dataset.lang = xLanguage;
		domHtml.dataset.moLang = moLang;
	})();

	await (async function setI18nToVueSFCScope() {
		const i18n = await _.$newI18n({ lang: I18N_LANGUAGE });
		window.i18n = i18n;
		Vue.prototype.i18n = i18n;
	})();

	(async () => {
		/*  显示header导航栏region selector */
		const $ModulesRegionCfHeaderRegion = await _.$ensure(() => {
			if ($(".modules-region-cf-header-region").length) {
				return $(".modules-region-cf-header-region");
			} else {
				return false;
			}
		});
		/* 等待图标加载 */
		await _.$sleep(1000);
		const showHeaderRegion = () => {
			$ModulesRegionCfHeaderRegion.css("display", "");
			// 监听Region变化，刷新页面
			var elementToObserve = $("#mo-cf-modules-region")[0];
			var observerOptions = {
				childList: true, // 观察目标子节点的变化，是否有添加或者删除
				attributes: true, // 观察属性变动
				subtree: true // 观察后代节点，默认为 false
			};
			var observer = new MutationObserver(mutationList => {
				_.some(mutationList, mutation => {
					if ("attributes" === mutation.type) {
						if (mutation.attributeName === "class") {
							if (
								$(mutation.target).hasClass(
									"modules-region-region-list-cf-header-region-list-selected"
								)
							) {
								_.$reloadWindow("mo region change, refresh page");
							}
						}
					}
				});
			});
			observer.observe(elementToObserve, observerOptions);
		};

		showHeaderRegion();
	})();

	/* mo common components */
	_.each(
		{
			xMoBuyLayer: "/common/type_mo/components/xMoBuyLayer.vue",
			xMoCurrentConfigurations: "/common/type_mo/components/xMoCurrentConfigurations.vue"
		},
		(url, name) => {
			Vue.component(name, () => _.$importVue(url));
		}
	);

	/* 基础参数 */
	const [userInfo, appConfigs, regionsData, moContextLocale] = await Promise.all([
		_MoCfContext.getUser(),
		_MoCfContext.getGlobalConfig(),
		_MoCfContext.getRegions(),
		_MoCfContext.getLocale()
	]);

	_MoCfContext.userInfo = userInfo;
	_MoCfContext.appConfigs = appConfigs;
	_MoCfContext.regionsData = regionsData;
	_MoCfContext.locale = moContextLocale;

	function trigger(type, event) {
		console.log("🚀 ~ trigger ~ type, event:", type, event);
		$(window).trigger("moChange", {
			type,
			event
		});
	}

	try {
		_MoCfContext.getActions().then(a => {
			console.log("getActions", a);
		});
		_MoCfContext.getGlobalConfig().then(a => {
			console.log("getGlobalConfig", a);
		});
		// _MoCfContext.getLocale().then(a => { console.log("getLocale", a); });
		_MoCfContext.getProjectActions().then(a => {
			console.log("getProjectActions", a);
		});
		_MoCfContext.getRegionLinks().then(a => {
			console.log("getRegionLinks", a);
		});
		// _MoCfContext.getRegions().then(a => { return a; });
		_MoCfContext.getSamlDatas().then(a => {
			console.log("getSamlDatas", a);
		});

		_MoCfContext.activeMenu$()._subscribe(e => {
			trigger("activeMenu", e);
		});
		_MoCfContext.getCollectedEndpoints$()._subscribe(e => {
			trigger("getCollectedEndpoints", e);
		});
		_MoCfContext.getCurrentService$()._subscribe(e => {
			trigger("getCurrentService", e);
		});

		_MoCfContext.getEndpoints$()._subscribe(e => {
			trigger("getEndpoints", e);
		});

		_MoCfContext.getLinks$()._subscribe(e => {
			trigger("getLinks", e);
		});

		_MoCfContext.getSafeArea$()._subscribe(e => {
			trigger("getSafeArea", e);
		});

		_MoCfContext.getSelectedRegionId$()._subscribe(e => {
			trigger("getSelectedRegionId", e);
		});

		_MoCfContext.isChangeRegionReload$()._subscribe(e => {
			trigger("isChangeRegionReload", e);
		});

		_MoCfContext.isCheckMoLicense$()._subscribe(e => {
			trigger("isCheckMoLicense", e);
		});

		_MoCfContext.isDisplayAllRegions$()._subscribe(e => {
			trigger("isDisplayAllRegions", e);
		});

		_MoCfContext.isLanguageSwitchDisplay$()._subscribe(e => {
			trigger("isLanguageSwitchDisplay", e);
		});

		_MoCfContext.isMainMenuDisplay$()._subscribe(e => {
			trigger("isMainMenuDisplay", e);
		});

		_MoCfContext.isRegionDisplay$()._subscribe(e => {
			trigger("isRegionDisplay", e);
		});

		_MoCfContext.isSidebarDisplay$()._subscribe(e => {
			trigger("isSidebarDisplay", e);
		});
	} catch (error) {
		console.error(error);
	}

	_MoCfContext.checkAsidebarStatus = _.debounce(function (callbackFn) {
		const subPage = $(`.x-page-view[hide-sidebar]`);
		const isSubPage = subPage.length > 0;
		callbackFn && callbackFn(isSubPage);
	}, 600);

	_MoCfContext.getOneHourBeginEndTime = function () {
		const currentTime = dayjs();
		return {
			begin_time: _.$dateFormat(currentTime.valueOf(), 2),
			end_time: _.$dateFormat(currentTime.add(1, "hour").valueOf(), 2)
		};
	};
	_MoCfContext.handleOrderError = function (response) {
		if (response && response.code === 500 && response.message) {
			return _.$msgError(response.message);
		}
		/* 
    {
    "exceptionId": "mosub-00013",
    "exceptionType": "ROA_EXFRAME_EXCEPTION",
    "descArgs": [
    "申请服务失败。"
    ],
    "reasonArgs": [
    "服务未上线。"
    ],
    "detailArgs": [
    "VDC中上线的服务才可以申请，当VDC中没有某个服务或者服务未上线，不能申请。"
    ],
    "adviceArgs": [
    "请检查指定VDC下的指定服务是否已经上线。"
    ]
    }
    */
		try {
			const { exceptionId, exceptionType, descArgs, reasonArgs, detailArgs, adviceArgs } =
				_.$val(response, "responseJSON");

			_.$notify.error({
				title: descArgs[0],
				message: () =>
					hDiv([...detailArgs.map(i => hDiv(i)), ...adviceArgs.map(i => hDiv(i))])
			});
		} catch (error) {
			_.$msgError(error);
		} finally {
			console.error(response);
		}
	};

	_MoCfContext.queryPrice = async function (params) {
		const priceInfo = {
			value: "",
			singleValue: "",
			measureUnit: "",
			currency: "",
			symbol: ""
		};
		try {
			const res = await _MoCfContext._api.priceRate(params);
			/* begin_time, : "" currency, : "CNY" end_time, : "20240223183659" price, : "0.0" symbol, : "¥" type, : "spec" */
			/* EVS采用原子计价 */
			const atomCost = _.find(res, r => r.type === "atom");

			//计价未开启时，默认总价0.00
			if (!isNaN(parseFloat(atomCost && atomCost.price))) {
				priceInfo.value = parseFloat(atomCost.price).toFixed(2);
				priceInfo.singleValue = parseFloat(atomCost.price).toFixed(2);
				priceInfo.measureUnit = i18n("hour_unit");
				priceInfo.currency = atomCost.currency;
				priceInfo.symbol = atomCost.symbol || "";
			} else {
				priceInfo.value = "0.00";
				priceInfo.singleValue = "0.00";
				priceInfo.measureUnit = i18n("hour_unit");
				priceInfo.symbol = "";
			}
		} catch (e) {
			console.error(e);
		} finally {
			return priceInfo;
		}
	};

	_MoCfContext.openProductServiceDialog = async function ({ service_type, icon }) {
		let serviceId = "";
		try {
			serviceId = await new Promise(async (resolve, reject) => {
				const DialogTypeVueSFC = await _.$importVue(
					"/common/type_mo/components/DialogProductServiceList.vue",
					{
						parent: Vue.forceUpdate.getVM(),
						service_type,
						icon,
						onSelect(serviceId) {
							resolve(serviceId);
						}
					}
				);
				_.$openWindow_deprecated(i18n("select_service_item"), DialogTypeVueSFC, {
					cancel() {
						setTimeout(() => {
							reject("");
						}, 100);
					}
				});
			});
		} catch (error) {
			console.log("openProductServiceDialog error:", error);
		}
		return serviceId;
	};

	_MoCfContext.OrderDisplay = function (displayArray) {
		const orderDisplay = {
			zh_CN: [],
			en_US: []
		};
		return _.reduce(
			displayArray,
			(target, info) => {
				try {
					/* @ts-ignore */
					if (_.isFunction(info.xItem && info.xItem.isHide)) {
						/* @ts-ignore */
						if (info.xItem.isHide()) {
							return target;
						}
					}
					/* @ts-ignore */
					const valueArray = (() => {
						if (_.isArray(info.valueI18nMany)) {
							return info.valueI18nMany;
						}

						if (info.xItem && info.xItem.i18nMany) {
							return info.xItem.i18nMany();
						}
						return ["--", "--"];
					})();

					target.zh_CN.push({
						label: info.label[0],
						value: valueArray[0],
						type: info.type || "string"
					});
					target.en_US.push({
						label: info.label[1],
						value: valueArray[1],
						type: info.type || "string"
					});
					return target;
				} catch (error) {
					console.error(error);
				}
			},
			orderDisplay
		);
	};
	_MoCfContext.BuylayerConfigs = function (options) {
		return _.merge(
			{
				priceInfo: {},
				isShowBtn: true
			},
			options
		);
	};

	_MoCfContext.getFirstServiceId = async function (service_type) {
		var params = {
			/* 不能有多余的参数 */
			region_id: _MoCfContext.commonParams().regionId,
			service_type,
			start: 1,
			limit: 4,
			name: ""
		};

		let data = await _MoCfContext._api.getProductListFn(params);
		if (data.total) {
			return data.products[0].product_id;
		} else {
			return false;
		}
	};

	_MoCfContext.AjaxRequestInjector = function (reqConfigs) {
		let [region, locale, agencyId] = _.$urlSearch(["region", "locale", "agencyId"]);
		region = encodeURIComponent(region);
		reqConfigs.headers["x-requested-with"] = "XMLHttpRequest";
		reqConfigs.headers["x-request-from"] = "Framework";
		reqConfigs.headers["cftk"] = _MoCfContext.userInfo.cftk;
		reqConfigs.headers["X-Language"] = locale;
		// reqConfigs.headers["region"] = _MoCfContext.regionsData.selectRegionId;
		reqConfigs.headers["Region"] = _MoCfContext.regionsData.selectRegionId;
		reqConfigs.headers["ProjectName"] = region;
		reqConfigs.headers["AgencyId"] = (() => {
			return reqConfigs.headers.AgencyId || agencyId;
		})();
		return reqConfigs;
	};

	/**
	 *
	 */
	_MoCfContext.ensureApplyResponse = function ({ response, moBuyLayerConfigs, goBack }) {
		moBuyLayerConfigs = moBuyLayerConfigs || {};
		if (_.$val(moBuyLayerConfigs, "isShowBtn")) {
			moBuyLayerConfigs.isShowBtn = false;
		}
		if (!response || !response.purchases || !response.purchases[0]) {
			return;
		}
		return new Promise(async (resolve, reject) => {
			const vm = await _.$openModal({
				title: i18n("jump_action"),
				url: "/common/ui-x/msg/WindowConfirm.vue",
				content: () => {
					return hDiv({ style: `height:220px;`, staticClass: "flex middle center" }, [
						hDiv({ staticClass: "flex middle center vertical" }, [
							h("i", {
								staticClass: "el-message__icon el-icon-success",
								style: "font-size:64px;color:var(--ui-success);"
							}),
							h(
								"div",
								{
									style: "font-size: 22px;margin: 20px 0"
								},
								[i18n("submit_success")]
							)
						])
					]);
				},
				renderFooter(vm) {
					return () => {
						return h(
							"div",
							{
								style: `border-top: 1px solid var(--el-border-color);padding-top:var(--ui-one);width:100%;text-align:center;`
							},
							[
								hxBtn({
									staticClass: "mr",
									configs: {
										label: i18n("view_order"),
										preset: "blue",
										onClick() {
											location.href = `/motenantconsolehomewebsite#/userCenter/manager/applyDetail?orderId=${response && response.purchases && response.purchases[0] && response.purchases[0].subscription_id}`;
										}
									}
								}),
								hxBtn({
									configs: {
										label: i18n("return_to_list_action"),
										onClick() {
											goBack();
											vm.closeModal();
										}
									}
								})
							]
						);
					};
				}
			});

			resolve(vm);
		});
	};

	window._AJAX_URL_PREFIX = `${window._AJAX_URL_PREFIX || ""}${_URL_PREFIX_MO}`;

	_MoCfContext._api = {
		async priceRate(data) {
			return _.$ajax.post("/goku/rest/price/v3.0/rate", {
				data
			});
		},
		async getProductListFn(data) {
			return _.$ajax.get("/rest/product/v3.0/apply/products", {
				// return _.$ajax.get("rest/product/v3.0/products", {
				data
			});
		},
		async order(data) {
			return _.$ajax.post(`/goku/rest/subscription/v3.0/subscriptions`, {
				data
			});
		},
		async getProjectDetailByProjectId(project_id) {
			return _.$ajax.get(`/goku/rest/vdc/v3.1/projects/${project_id}`);
		}
	};

	return _MoCfContext;
}
</script>
<style lang="less">
.mo-common {
	--xMoCurrentConfigurations-width: 356px;

	.modules-sidebar-cf-sidebar {
		z-index: 10;
	}
}
</style>
