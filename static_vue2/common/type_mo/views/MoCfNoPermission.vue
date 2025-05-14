<template>
	<div class="x-page-view MoCfNoPermission">
		<xPageContent>
			<div class="console-content-nopermission">
				<div class="content-nopermission">
					<div class="content-top-image">
						<img src="/static/framework/1.0.4/theme/default/images/no-permission.svg" />
					</div>
					<div class="content-bottom-content">
						<p
							class="common-font-size-big4 common-color-title"
							ng-bind="i18n.console_term_accessDeclined_label"></p>
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
.MoCfNoPermission {
	.console-content-nopermission {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
	}
	.content-nopermission {
		text-align: center;
		width: 460px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -110px 0 0 -230px;
	}
}
</style>
