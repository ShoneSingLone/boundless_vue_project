<template>
	<div>
		{{ file }}
		<xGap t />
		<xInput placeholder="请输入内容" v-model="state.input4">
			<i slot="prefix" class="el-input__icon el-icon-search"></i>
		</xInput>
		<xGap t />
		<!-- <xItem :configs="form.xItemInputNumber" /> -->
		<xGap t />
		<xItem :configs="form.xItemInput" />
	</div>
</template>

<script>
export default async function () {
	const file = this.THIS_FILE_URL;
	return defineComponent({
		setup() {
			const vm = this;
			const state = reactive({
				input4: ""
			});
			const form = reactive({
				xItemInput: {
					value: "",
					label: "xItemInput",
					on: {
						focus(...args) {
							console.log("🚀 ~ file: base.vue:30 ~ focus ~ args:", args);
						}
					},
					$vSlots: {
						prefix() {
							return h("xIcon", { icon: "icon_table_filter" });
						}
					}
				},
				xItemInputNumber: {
					value: null,
					isNumber: true
				}
			});

			const formData = computed(() => JSON.stringify(_.$pickValueFromConfigs(form), null, 2));

			function handleFocus(...args) {}
			return {
				state,
				file,
				form,
				formData,
				handleFocus
			};
		}
	});
}
</script>

<style lang="less"></style>
