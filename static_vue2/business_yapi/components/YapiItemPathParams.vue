<template>
	<xBlock class="width100">
		<div v-for="(item, index) in value" :key="index" class="flex middle mt8">
			<xInput :value="item.name" class="mr" />
			<xInput
				:value="item.example || ''"
				placeholder="参数实例"
				@input="$event => changeExample($event, index)"
				class="mr" />
			<xInput
				:value="item.desc || ''"
				placeholder="备注"
				@input="$event => changeDesc($event, index)"
				class="mr" />
		</div>
	</xBlock>
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		methods: {
			changeExample(example, index) {
				const _value = _.cloneDeep(this.mixin_value);
				_value[index].example = example;
				this.mixin_value = [..._value];
			},
			changeDesc(desc, index) {
				const _value = _.cloneDeep(this.mixin_value);
				_value[index].desc = desc;
				this.mixin_value = [..._value];
			}
		}
	});
}
</script>

<style lang="less"></style>
