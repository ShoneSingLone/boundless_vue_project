<template>
	<div class="layer-demo">
		<xMd md="# 生成规则" />
		<xMd md="应用独有的i18n" />
		<xIcon img="@/assets/img/gen_i18n.png" />
		<xMd md="通用的i18n，一般是公用组件使用，比如：确认、取消、年、月、日" />
		<xIcon img="@/assets/img/i18n_common.png" />
		<xMd :md="md" />
		<xMd>
			<pre>

- 通用的组件用x开头的小驼峰命名
- 禁止使用index.vue这种没有语义的命名

			</pre
			>
		</xMd>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: `运行 \`pnpm i18n 对应的APP_NAME\` 即可生成对应的i18n文件，
如： \`pnpm i18n doc\`,
**不要**加前面的 \`business_\`
>注意：应用里面的i18n优先级更高，会覆盖common里面的同名字段
`
			};
		}
	};
}
</script>

<style lang="less"></style>
