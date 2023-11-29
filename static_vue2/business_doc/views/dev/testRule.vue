<template>
	<div class="page-view">
		<ElCard class="mt10" :header="i18n('xxxxxxxx')">
			<form ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" />
			</form>
		</ElCard>
	</div>
</template>

<script>
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
						rules: [Vue._rules.portRange(1, 111111)]
					}
				}
			};
		},
		computed: {}
	};
}
</script>

<style lang="less"></style>
