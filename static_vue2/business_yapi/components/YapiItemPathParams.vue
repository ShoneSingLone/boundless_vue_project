<template>
	<div class="flex middle vertical">
		<div v-for="(item, index) in value" :key="index" class="flex middle mt8">
			<xInput :value="item.name" class="mr" />
			<xInput
				:value="item.example"
				placeholder="参数实例"
				@input="$event => changeExample($event, index)"
				class="mr" />
			<xInput
				:value="item.desc"
				placeholder="备注"
				@input="$event => changeDesc($event, index)"
				class="mr" />
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		inject: ["APP"],
		props: ["value", "options", "configs"],
		computed: {},
		methods: {
			changeExample(example, index) {
				this.value[index].example = example;
				this.mixin_value = [...this.value];
			},
			changeDesc(desc, index) {
				this.value[index].desc = desc;
				this.mixin_value = [...this.value];
			}
		}
	});
}
</script>

<style lang="less"></style>
