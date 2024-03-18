<script lang="ts">
export default async function ({ _URL_PREFIX_MO }) {
	let [region, locale, agencyId] = _.$urlSearch(["region", "locale", "agencyId"]);

	let regionChanged = false;
	(function () {
		$("html").addClass("mo-common");
		_.$single.doc.on(
			"click",
			".modules-service-list-service-list-drawer-service-content-service-nav-item",
			_.debounce(async function (event) {
				if (regionChanged) {
					window.location.reload();
				}
			}, 100)
		);
		/* 显示region selector */
		// setTimeout(() => { $("#mo-cf-modules-region .modules-region-cf-header-region").css("display", ""); }, 1000 * 2);
		window.appWebPath = _URL_PREFIX_MO;
		const moLang = locale || $("html").lang || "zh-CN";
		const i18nMap = {
			"zh-cn": "zh-CN",
			"en-us": "en-US"
		};
		const xLanguage = i18nMap[moLang] || "en-US";
		localStorage["X-Language"] = xLanguage;
		window.I18N_LANGUAGE = xLanguage;

		const domHtml = document.querySelector("html");
		domHtml.dataset.lang = xLanguage;
		domHtml.dataset.moLang = moLang;
	})();

	await (async function () {
		const i18n = await _.$newI18n({ lang: I18N_LANGUAGE });
		window.i18n = i18n;
		Vue.prototype.i18n = i18n;
	})();
	/* mo console ui 基座 */
	/* 需要以script src 的形式引入，才能获取 baseURI = "/static/framework/2.0" */
	await _.$appendScript("/static/framework/2.0/mo.console.ui.js", "", true);
	/* mo API */
	window._MoCfContext = { ...window.getMoCfContext() };

	/* mo common components */
	_.each(
		{
			xMoBuyLayer: "/common/utils/useMoCommon/xMoBuyLayer.vue",
			xMoCurrentConfigurations: "/common/utils/useMoCommon/xMoCurrentConfigurations.vue"
		},
		(url, name) => {
			Vue.component(name, () => _.$importVue(url));
		}
	);

	/* 基础参数 */
	const [userInfo, appConfigs, regionsData, moContextLocale] = await Promise.all([_MoCfContext.getUser(), _MoCfContext.getGlobalConfig(), _MoCfContext.getRegions(), _MoCfContext.getLocale()]);
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
			regionChanged = true;
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
		const subPage = $(`.page-view[hide-sidebar]`);
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
			/*
begin_time, : ""
currency, : "CNY"
end_time, : "20240223183659"
price, : "0.0"
symbol, : "¥"
type, : "spec"
*/

			//EVS采用原子计价
			const atomCost = _.find(res, r => r.type === "atom");

			//计价未开启时，默认总价0.00
			if (!isNaN(parseFloat(atomCost && atomCost.price))) {
				priceInfo.value = parseFloat(atomCost.price).toFixed(2);
				priceInfo.singleValue = parseFloat(atomCost.price).toFixed(2);
				priceInfo.measureUnit = i18n("小时");
				priceInfo.currency = atomCost.currency;
				priceInfo.symbol = atomCost.symbol || "";
			} else {
				priceInfo.value = "0.00";
				priceInfo.singleValue = "0.00";
				priceInfo.measureUnit = i18n("小时");
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
				const DialogTypeVueSFC = await _.$importVue("/common/mo/components/DialogProductServiceList.vue", {
					parent: Vue.forceUpdate.getVM(),
					service_type,
					icon,
					onSelect(serviceId) {
						resolve(serviceId);
					}
				});
				_.$openWindow_deprecated(i18n("选择服务"), DialogTypeVueSFC, {
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
		return displayArray.reduce((target, info) => {
			target.zh_CN.push({
				label: info.label[0],
				value: info.value[0],
				type: info.type
			});
			target.en_US.push({
				label: info.label[1],
				value: info.value[1],
				type: info.type
			});
			return target;
		}, orderDisplay);
	};
	_MoCfContext.BuylayerConfigs = function (options) {
		return _.merge(
			{
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
		if (moBuyLayerConfigs?.isShowBtn) {
			moBuyLayerConfigs.isShowBtn = false;
		}
		if (!response?.purchases?.[0]) {
			return;
		}
		return new Promise(async (resolve, reject) => {
			const vm = await _.$openModal({
				title: i18n("跳转"),
				url: "/common/ui-x/msg/WindowConfirm.vue",
				content: () => {
					return h("div", { style: `height:220px;`, staticClass: "flex middle center" }, [
						h("div", { staticClass: "flex middle center vertical" }, [
							h("i", {
								staticClass: "el-message__icon el-icon-success",
								style: "font-size:64px;color:var(--ui-success);"
							}),
							h(
								"div",
								{
									style: "font-size: 22px;margin: 20px 0"
								},
								[i18n("提交成功")]
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
								h("xBtn", {
									staticClass: "mr",
									configs: {
										label: i18n("查看订单"),
										preset: "blue",
										onClick() {
											location.href = `/motenantconsolehomewebsite#/userCenter/manager/applyDetail?orderId=${response?.purchases?.[0].subscription_id}`;
										}
									}
								}),
								h("xBtn", {
									configs: {
										label: i18n("返回列表"),
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

	window._URL_PREFIX_4_DEV = `${window._URL_PREFIX_4_DEV || ""}${_URL_PREFIX_MO}`;

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
