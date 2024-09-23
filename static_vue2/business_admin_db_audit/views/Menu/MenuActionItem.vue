<style lang="less"></style>
<template>
	<xCard class="width100" style="position: relative">
		<xIcon
			icon="close"
			style="position: absolute; right: 4px; top: 4px; color: red"
			class="pointer"
			@click="$emit('remove')" />
		<div class="flex width100" style="--xItem-wrapper-width: 600px">
			<xItem :configs="form.name" v-model="cptName" />
			<xGap f />
			<xItem :configs="form.code" v-model="cptId" />
		</div>
	</xCard>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["item", "index"],
		data() {
			return {
				form: defItems({
					name: {
						label: "操作名称",
						rules: [_rules.required()]
					},
					code: {
						label: "唯一值",
						rules: [_rules.required()]
					}
				})
			};
		},
		computed: {
			cptId: {
				get() {
					return this.item.code || "";
				},
				set(code) {
					return this.$emit("update:item", { ...this.item, code: code });
				}
			},
			cptName: {
				get() {
					return this.item.name || "";
				},
				set(name) {
					return this.$emit("update:item", { ...this.item, name: name });
				}
			}
		}
	});
}
</script>
