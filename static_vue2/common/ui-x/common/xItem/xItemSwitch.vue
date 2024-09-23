<template>
	<div class="flex">
		<xSwitch v-model="mixin_value" v-bind="mixin_attrs" v-on="mixin_listeners" />
		<xGap f />
	</div>
</template>

<script lang="ts">
export default async function () {
	const { mixins: ItemMixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [ItemMixins]
	});
}
</script>

<style lang="less"></style>
