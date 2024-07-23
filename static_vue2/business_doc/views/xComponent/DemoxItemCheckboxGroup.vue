<style lang="less"></style>
<template>
	<div>
		<xForm>
			<xItem :configs="form.xItemCheckboxGroup" />
			<xItem :configs="form.xItemCheck" />
			<div>xItemCheckboxGroup{{ form.xItemCheckboxGroup.value }}</div>
			<div>eventName{{ eventName }}</div>
		</xForm>
		<xBtn @click="check">check</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	await _.$importVue("/common/utils/rules.vue");

	return defineComponent({
		data() {
			const vm = this;
			return {
				eventName: "",
				form: defItems({
					xItemCheckboxGroup: {
						value: [],
						label: "xItemCheckboxGroup",
						itemType: "xItemCheckboxGroup",
						minWidth: 120,
						options: [...new Array(20)].map((i, ii) => {
							return {
								label: ii,
								value: ii
							};
						}),
						rules: [_rules.required()],
						onChange() {
							vm.eventName = "onChange";
						}
					},
					xItemCheck: {
						value: "",
						label: "xItemCheck",
						itemType: "xItemCheck",
						minWidth: 90,
						onChange() {
							vm.eventName = "onChange";
						},
						options: [...new Array(20)].map((i, ii) => {
							return {
								label: ii,
								value: ii
							};
						}),
						rules: [_rules.required()]
					}
				})
			};
		},
		methods: {
			check() {
				_.$validateForm(this.$el);
			}
		}
	});
}
</script>
