<template>
	<div class="xDialog xDialog-wrapper" v-bind="$attrs">
		<div class="xDialog-body">
			<slot />
		</div>
		<div class="xDialog-footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: ["title"]
	};
}
</script>

<style lang="less">
.xDialog {
	--xDialog-padding: var(--ui-one);
	--xDialog-min-width: 600px;

	min-width: var(--xDialog-min-width);

	&.xDialog-wrapper {
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
		max-height: calc(100vh - 200px);
	}

	&.xDialog-wrapper.xDialog-list-view {
		max-height: 100%;

		.xDialog-body {
			padding-top: 0;
			padding-left: 0;
			padding-right: 0;
		}

		.page-content-wrapper {
			// padding: 0;
		}
	}
}

.xDialog-body {
	width: 100%;
	height: 1px;
	flex: 1;
	overflow: auto;
	padding: var(--xDialog-padding);
	display: flex;
	flex-flow: column nowrap;

	.xCard {
		// overflow: auto;
	}
}

.xDialog-footer {
	padding: 0 var(--xDialog-padding) var(--xDialog-padding);
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
}
</style>
