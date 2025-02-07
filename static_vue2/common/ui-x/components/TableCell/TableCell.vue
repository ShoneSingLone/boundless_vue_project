<template>
	<div class="table-cell-wrap" :class="classComputed">
		<slot />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "TableCell",
		props: {
			limit: {
				type: Number,
				default: 3
			},
			labelWidth: {
				type: String,
				default: "80px"
			}
		},
		computed: {
			classComputed() {
				return `limit${this.limit}`;
			}
		}
	};
}
</script>

<style lang="less" scoped>
.table-cell-wrap {
	display: flex;
	flex-wrap: wrap;
	.cell-wrap {
		width: 33%;
	}
}
.limit1 {
	.cell-wrap {
		width: 100%;
	}
}
.limit2 {
	.cell-wrap {
		width: 50%;
	}
}
.limit3 {
	.cell-wrap {
		width: 33%;
	}
}
.limit4 {
	.cell-wrap {
		width: 25%;
	}
}
.limit5 {
	.cell-wrap {
		width: 20%;
	}
}
</style>
