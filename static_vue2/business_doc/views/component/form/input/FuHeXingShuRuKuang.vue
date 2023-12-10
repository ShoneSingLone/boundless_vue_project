<template>
	<div class="FuHeXingShuRuKuang">
		<Md :md="md" />
		<div>
			<xInput placeholder="请输入内容" v-model="input1">
				<template slot="prepend">Http://</template>
			</xInput>
		</div>
		<div style="margin-top: 15px">
			<xInput placeholder="请输入内容" v-model="input2">
				<template slot="append">.com</template>
			</xInput>
		</div>
		<div style="margin-top: 15px">
			<xInput placeholder="请输入内容" v-model="input3" class="input-with-select">
				<xSelect v-model="select" slot="prepend" placeholder="请选择">
					<xOption label="餐厅名" value="1"></xOption>
					<xOption label="订单号" value="2"></xOption>
					<xOption label="用户电话" value="3"></xOption>
				</xSelect>
				<xBtn slot="append" icon="el-icon-search"></xBtn>
			</xInput>
		</div>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				input1: "",
				input2: "",
				input3: "",
				select: "",
				md: "可前置或后置元素，一般为标签或按钮\n可通过 slot 来指定在 input 中前置或者后置内容。"
			};
		}
	});
}
</script>
<style lang="less">
.FuHeXingShuRuKuang {
	.el-select .el-input {
		width: 130px;
	}
	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
}
</style>
