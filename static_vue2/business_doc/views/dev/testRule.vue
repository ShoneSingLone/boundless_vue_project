<template>
	<div class="x-page-view">
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
		async mounted() {
			_.$ensure(
				() => {
					console.log("try");
					return false;
				},
				1000 * 10,
				1000 * 1
			);
		},
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
