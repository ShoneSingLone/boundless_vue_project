<template>
	<div class="flex middle">
		<div v-for="item in configs.colInfo" :key="item.prop" :data-prop="item.prop">
			{{ item.label }}
		</div>
		<div v-for="(row, index) in data" :key="index" :data-row-index="index">
			<div v-for="col in configs.colInfo" :key="col.prop" :data-prop="col.prop">
				{{ row[col.prop] }}
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	/* table disabled */
	/* 行数据disabled */
	/* 独立的data数据 */
	/* 独立的配置数据 */
	return defineComponent({
		props: ["configs", "data"],
		data() {
			return {};
		}
	});
}
</script>
