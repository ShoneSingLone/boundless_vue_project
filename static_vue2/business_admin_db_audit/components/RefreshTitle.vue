<style lang="less">
.RefreshTitle {
	.mess {
		font-weight: 400;
		font-size: 12px;
		color: #888888;
	}
}
</style>
<template>
	<div class="flex middle RefreshTitle">
		<span class="title chart-card-header mr">{{ title }} </span>
		<span class="mess mr">刷新于 {{ time }}</span>
		<xBtn preset="text" icon="_refresh" @click="onRefresh">刷新</xBtn>
		<xGap f />
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		props: ["title", "refresh"],
		mounted() {
			this.onRefresh();
		},
		data() {
			return { time: "" };
		},
		methods: {
			async onRefresh() {
				await this.cptRefresh();
				this.time = _.$dateFormat();
			}
		},
		computed: {
			cptRefresh() {
				return this.refresh || (() => null);
			}
		}
	});
}
</script>
