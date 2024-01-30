<style lang="less"></style>
<template>
	<div>
		<xForm col="3" style="--xdesc-item-width: 100px">
			<xDescItem v-for="(item, index) in items" :key="index" :item="item" />
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return {
				items: [
					{ label: "Username", content: "kooriookami" },
					{ label: "Telephone", content: "18100000000" },
					{ label: "Place", content: "Suzhou" },
					{ label: "Remarks", content: () => h("xTag", { size: "small" }, ["School"]) },
					{ label: "Address", content: "No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province" }
				]
			};
		}
	});
}
</script>
