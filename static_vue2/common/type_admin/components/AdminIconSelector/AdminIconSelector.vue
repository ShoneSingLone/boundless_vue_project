<template>
	<xSelect v-model="mixin_value" placeholder="请选择" @resize="handleSelectorResize">
		<template #prepend>
			<div class="flex middle" v-if="mixin_value">
				<xIcon :icon="mixin_value | iconName" style="height: 18px; width: 18px" />
				<xGap l="8" />
			</div>
		</template>
		<xForm :col="cptColNum">
			<xOption
				v-for="item in icons"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				<div class="flex middle">
					<xIcon :icon="item.label | iconName" style="height: 18px; width: 18px" />
					<span class="ml">{{ item.label }}</span>
					{{ item.visiblechange ? "item.visiblechange" : "false" }}
				</div>
			</xOption>
		</xForm>
	</xSelect>
</template>
<script lang="ts">
export default async function () {
	const [
		{ icons },
		{ mixins },
		{
			methods: { getCol }
		}
	] = await _.$importVue([
		"@/assets/svg/icons.vue",
		"/common/ui-x/common/ItemMixins.vue",
		"/common/ui-x/common/xItem/xItemCheck.vue"
	]);

	const WIDTH = 200;
	return defineComponent({
		mixins: [mixins],
		props: ["value", "configs"],
		data() {
			return {
				minWidth: WIDTH,
				icons,
				inputWidth: 0
			};
		},
		filters: {
			iconName(icon) {
				return `_${icon}`;
			}
		},
		computed: {
			formStyle() {
				return {
					width: `${this.inputWidth}px`
				};
			},
			cptColNum() {
				return this.getCol(this.inputWidth, 10);
			}
		},
		methods: {
			getCol,
			handleSelectorResize({ inputWidth }) {
				this.inputWidth = inputWidth;
			}
		}
	});
}
</script>
