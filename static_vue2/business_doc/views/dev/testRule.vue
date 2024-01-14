<template>
	<div class="page-view">
		<xCard class="mt10" :header="i18n('xxxxxxxx')">
			<form ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" />
			</form>
		</xCard>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		beforeDestroy() {},
		components: {},
		async mounted() {},
		methods: {},
		watch: {},
		data() {
			return {
				form: {
					url2: {
						value: "",
						label: i18n("url2"),
						rules: [_rules.keyVal()]
					}
				}
			};
		},
		computed: {}
	};
}
</script>

<style lang="less"></style>
