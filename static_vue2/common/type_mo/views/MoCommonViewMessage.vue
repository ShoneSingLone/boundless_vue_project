<template>
	<div class="x-page-view MoCommonViewMessage">
		<xPageContent>
			<div class="flex vertical center middle height100">
				<div class="flex vertical center middle">
					<xIcon icon="icon_mo_notice" class="MoCommonViewMessage-icon" />
					<div class="mt MoCommonViewMessage-title">{{ cptTitle }}</div>
					<div class="mt">{{ cptTips }}</div>
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
.xIcon.MoCommonViewMessage-icon {
	fill: var(--ti-base-color-warn-4);
	width: 64px;
	height: 64px;
}
.MoCommonViewMessage-title {
	font-size: large;
	font-weight: 600;
}
</style>
