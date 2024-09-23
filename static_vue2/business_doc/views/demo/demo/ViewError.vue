<template>
	<div class="x-page-view view-message">
		<xPageContent>
			<div v-if="APP.appErrorTitle" class="height100 flex middle center vertical">
				<div class="flex center" style="font-size: 64px">
					<xIcon icon="alert" class="view-message-alert" />
				</div>
				<div class="flex center view-message-title">{{ APP.appErrorTitle }}</div>
				<div class="view-message-tips">{{ APP.appErrorTips }}</div>
			</div>
			<div class="loader" v-else>
				<div class="item1"></div>
				<div class="item2"></div>
				<div class="item3"></div>
			</div>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		async mounted() {},
		methods: {},
		data(vm, isReuse) {
			return {};
		},
		computed: {}
	};
}
</script>

<style lang="less">
.view-message {
	.view-message-alert {
		width: 70px;
		height: 70px;
		color: var(--el-color-warning);
	}
	.view-message-title {
		font-size: 20px;
		// color: var(--el-color-warning);
	}
	.view-message-tips {
		margin-top: var(--ui-one);
		// color: var(--el-color-warning);
	}
	.item1,
	.item2,
	.item3 {
		position: absolute;
		background-color: transparent;
		left: calc(50% - (var(--size) / 2));
		top: calc(50% - (var(--size) / 2));
		height: var(--size);
		width: var(--size);
		border-radius: 50%;
	}

	.loader .item1 {
		--size: 90px;
		animation: size1_1 2.5s infinite alternate;
		z-index: 1;
	}

	.loader .item2 {
		--size: 60px;
		animation: size1_2 2.5s infinite alternate;
		z-index: 2;
	}

	.loader .item3 {
		--size: 30px;
		animation: size1_3 2.5s infinite alternate;
		z-index: 3;
	}

	@keyframes size1_1 {
		0%,
		10% {
			transform: scale(0);
		}

		100% {
			transform: scale(1);
			box-shadow:
				8px 8px 14px #c5c5c5,
				-8px -8px 14px #ffffff;
		}
	}

	@keyframes size1_2 {
		0%,
		40% {
			transform: scale(0);
		}

		100% {
			transform: scale(1);
			box-shadow:
				8px 8px 14px #c5c5c5,
				-8px -8px 14px #ffffff;
		}
	}

	@keyframes size1_3 {
		0%,
		70% {
			transform: scale(0);
		}

		100% {
			transform: scale(1);
			box-shadow:
				8px 8px 14px #c5c5c5,
				-8px -8px 14px #ffffff;
		}
	}
}
</style>
