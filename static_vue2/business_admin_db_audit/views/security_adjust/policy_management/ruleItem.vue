<style lang="less"></style>
<template>
	<xCard style="position: relative; margin: 0 auto">
		<xIcon
			v-if="!isUpdates"
			icon="close"
			style="position: absolute; right: 4px; top: 4px; color: red"
			class="pointer"
			@click="$emit('remove')" />
		<xForm col="1">
			<xItem :configs="form.featureName" v-model="featureName" />
			<xItem :configs="form.featureValue" v-model="featureValue" />
			<xItem :configs="form.predicate" v-model="predicate" />
			<xItem :configs="form.joint" v-model="joint" />
		</xForm>
	</xCard>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["item", "index", "predicateList", "JointList", "isUpdates", "FeatureList"],
		data() {
			const vm = this;
			return {
				form: defItems({
					featureName: {
						value: "",
						itemType: "xItemSelect",
						label: i18n("特征名"),
						options: vm.FeatureList,
						rules: [_rules.required()]
					},
					featureValue: {
						value: "",
						label: i18n("特征值"),
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					predicate: {
						value: "",
						label: i18n("谓词"),
						itemType: "xItemSelect",
						options: vm.predicateList,
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					joint: {
						value: "",
						label: i18n("连接词"),
						itemType: "xItemSelect",
						options: vm.JointList,
						rules: [_rules.required(), _rules.lessThan(50)]
					}
				})
			};
		},
		computed: {
			joint: {
				get() {
					return this.item.joint || "";
				},
				set(code) {
					return this.$emit("update:item", { ...this.item, joint: code });
				}
			},
			predicate: {
				get() {
					return this.item.predicate || "";
				},
				set(name) {
					return this.$emit("update:item", { ...this.item, predicate: name });
				}
			},
			featureValue: {
				get() {
					return this.item.featureValue || "";
				},
				set(name) {
					return this.$emit("update:item", { ...this.item, featureValue: name });
				}
			},
			featureName: {
				get() {
					return this.item.featureName || "";
				},
				set(name) {
					return this.$emit("update:item", { ...this.item, featureName: name });
				}
			}
		}
	});
}
</script>
