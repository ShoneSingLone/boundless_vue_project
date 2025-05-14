<template>
	<div class="x-page-view MoAccessDeclined">
		<xPageContent>
			<div class="console-content-padding">
				<div class="special-content">
					<div class="special-content-left-image">
						<img
							src="/static/framework/1.0.4/theme/default/images/nonsupport-small.png" />
					</div>
					<div class="special-content-right-content">
						<p
							class="common-font-size-big4 common-color-title"
							ng-bind="i18n.console_term_accessDeclined_label"></p>
						<p class="common-color-content">
							<span ng-bind="i18n.console_term_accessOpen_label"></span>
						</p>
						<p class="common-color-content">
							<span
								style="margin: 15px 0"
								ng-bind="i18nReplace (accessBackHome,{\'0\':lastSecond});"></span>
							<span
								ng-click="gohomeFn()"
								style="color: #39f; cursor: pointer"
								ng-bind="i18n.console_term_goToHomepage_button"></span>
						</p>
					</div>
				</div>
			</div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		computed: {
			cptTips() {
				return i18n("longTipsLicenseExpired", { date: this.$route.query.result });
			},
			cptTitle() {
				return i18n("licenseExpired");
			}
		}
	});
}
</script>
<style lang="less">
.xIcon.MoAccessDeclined-icon {
	fill: var(--ti-base-color-warn-4);
	width: 64px;
	height: 64px;
}
.MoAccessDeclined-title {
	font-size: large;
	font-weight: 600;
}
</style>
