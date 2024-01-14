<script lang="ts">
export default async function ({ APP_WEB_PATH }) {
	window.appWebPath = APP_WEB_PATH;
	window._MoCfContext = { ...window.getMoCfContext() };

	const [userInfo, appConfigs, regionsData] = await Promise.all([_MoCfContext.getUser(), _MoCfContext.getGlobalConfig(), _MoCfContext.getRegions()]);
	_MoCfContext.userInfo = userInfo;
	_MoCfContext.appConfigs = appConfigs;
	_MoCfContext.regionsData = regionsData;
	console.log("_MoCfContext.regionsData", _MoCfContext.regionsData);
	function trigger(type, event) {
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
		_MoCfContext.getLocale().then(a => {
			console.log("getLocale", a);
		});
		_MoCfContext.getProjectActions().then(a => {
			console.log("getProjectActions", a);
		});
		_MoCfContext.getRegionLinks().then(a => {
			console.log("getRegionLinks", a);
		});
		_MoCfContext.getRegions().then(a => {
			return a;
		});
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
	} catch (error) {}

	return _MoCfContext;
}
</script>
<style lang="less"></style>
