<style lang="less"></style>
<template>
	<xForm>
		<div>
			<pre>
            <code>
                {{ JSON.stringify(form.xItemCheck.value,null,2) }}
            </code>
        </pre>
		</div>
		<xItem :configs="form.xItemCheck" />
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				form: defItems({
					xItemCheck: {
						value: [1, 3, 5],
						label: "xItemCheck",
						itemType: "xItemCheck",
						minWidth: 90,
						options: [...new Array(20)].map((i, ii) => {
							return {
								label: `text_${ii}`,
								value: ii
							};
						})
					}
				})
			};
		}
	});
}
</script>
