<template>
	<div>
		count.value.length:{{ count.length }}
		<ul
			v-infinite-scroll="load"
			infinite-scroll-up="true"
			class="infinite-list demo-infinite-scroll"
			style="overflow: auto; height: 300px; padding: 0; margin: 0; list-style: none">
			<li
				v-for="i in count"
				:key="i.label"
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
				{{ i.label }}
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup() {
			const a = [...new Array(10)].map((i, ii) => {
				return {
					label: ii
				};
			});
			const add = () => {
				count.value = [
					...count.value,
					..._.map(new Array(10), (i, ii) => {
						return {
							label: _.last(count.value).label + (ii + 1)
						};
					})
				];
			};

			const sub = () => {
				count.value = [
					..._.map(new Array(10), (i, ii) => {
						return {
							label: _.first(count.value).label + (ii - count.value.length - 1)
						};
					}),
					...count.value
				];
			};
			const count = ref(a);
			const load = ({ delta }) => {
				if (delta > 0) {
					add();
				} else {
					sub();
				}
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
