<template>
	<div class="el-button-group">
		<slot></slot>
	</div>
</template>
<script lang="ts">
export default async function () {
	return {
		name: "xBtnGroup"
	};
}
</script>
