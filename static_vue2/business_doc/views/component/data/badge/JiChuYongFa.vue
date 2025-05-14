<template>
	<div class="card-JiChuYongFa">
		<xMd :md="mdTitle" />
		<span class="mr">
			<xBtn size="small">评论</xBtn>
			<xBadge :value="12" class="item" />
		</span>
		<span class="mr">
			<xBtn size="small" class="position relative">回复</xBtn
			><xBadge value="自定义" class="info" />
		</span>
		<span class="mr">
			<xBtn size="small" class="position relative">评论</xBtn
			><xBadge :value="renderIcon" class="primary" />
		</span>
		<span class="mr">
			<xBtn size="small" class="position relative">回复</xBtn
			><xBadge :value="2" class="warning" />
		</span>
		<span class="mr">
			<xBtn size="small" class="position relative">最大值</xBtn
			><xBadge :value="7" class="warning" :max="6" />
		</span>
		<span class="mr">
			<xBtn size="small" class="position relative">小圆点 </xBtn
			><xBadge :value="7" class="warning" is-dot />
		</span>

		<xDropdown trigger="click">
			<span class="xDropdown-link">
				点我查看<i class="el-icon-caret-bottom el-icon--right"></i>
			</span>
			<xDropdownMenu slot="dropdown">
				<xDropdownItem class="clearfix">
					评论
					<xBadge class="ml" :value="12" />
				</xDropdownItem>
				<xDropdownItem class="clearfix">
					回复
					<xBadge class="ml" :value="3" />
				</xDropdownItem>
			</xDropdownMenu>
		</xDropdown>

		<span class="mr">
			<xBtn size="small" class="position relative">偏移量 </xBtn
			><xBadge
				value="自定义偏移量['100%', '60px']"
				class="warning"
				:offset="['100%', '60px']" />
		</span>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: "展示新消息数量。"
			};
		},
		methods: {
			renderIcon() {
				return hxIcon({ icon: "save" });
			}
		}
	});
}
</script>
<style lang="less">
.card-JiChuYongFa {
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.box-card {
		width: 480px;
	}
}
</style>
