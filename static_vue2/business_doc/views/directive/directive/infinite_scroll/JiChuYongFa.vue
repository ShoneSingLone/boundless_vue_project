<template>
	<ul
		v-infinite-scroll="load"
		class="infinite-list demo-infinite-scroll"
		style="overflow: auto; height: 300px; padding: 0; margin: 0; list-style: none">
		<li
			v-for="i in count"
			:key="i"
			class="infinite-list-item"
			style="
				display: flex;
				align-items: center;
				justify-content: center;
				height: 50px;
				background: var(--el-color-primary-light-9);
				margin: 10px;
				color: var(--el-color-primary);
				margin-top: 10px;
			">
			{{ i }}
		</li>
	</ul>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup() {
			const count = ref(10);
			const load = () => {
				count.value += 2;
			};
			return { count, load };
		}
	});
}
</script>
<style lang="less">
.demo-infinite-scroll {
	&.infinite-list {
		height: 300px;
		padding: 0;
		margin: 0;
		list-style: none;
		.infinite-list-item {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 50px;
			background: var(--el-color-primary-light-9);
			margin: 10px;
			color: var(--el-color-primary);
			& + .list-item {
				margin-top: 10px;
			}
		}
	}
}
</style>
