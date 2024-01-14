<template>
	<div class="page-view view-ripple">
		<xPageContent>
			<ul class="demo-ripple">
				<li
					v-ripple="{ duration: 300 }"
					v-for="item in [
						{ color: '#409EFF', text: '这是一条 Primary 涟漪' },
						{ color: 'var(--el-color-success)', text: '这是一条 Success 涟漪' },
						{ color: '#E6A23C', text: '这是一条 Warning 涟漪' },
						{ color: '#F56C6C', text: '这是一条 Danger 涟漪' },
						{ color: '#909399', text: '这是一条 Info 涟漪' }
					]"
					class="flex middle center"
					:style="{ color: item.color }">
					<div class="ripple-change-text-color">
						{{ item.text }}
					</div>
				</li>
			</ul>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		setup() {}
	};
}
</script>

<style lang="less">
.view-ripple {
	ul {
		li {
			height: 48px;
			padding: 10px;
		}
	}
}
</style>
