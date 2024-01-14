<style lang="less">
.el-DocContentOfDemo {
	&-left {
		display: flex;
		flex-flow: column nowrap;
		flex: 1;
		width: 1px;
	}
}
</style>
<template>
	<div class="flex">
		<div :class="ns.b('left')">
			<slot> </slot>
		</div>
		<xAffix :offset="100">
			<xCard :style="xCardStyle" v-xloading="isLoading">
				<ul>
					<li v-for="(item, index) in contents" :key="index" class="mb pointer" @click="scrollTo(item)">
						<xTag>
							{{ item[0] }}
						</xTag>
					</li>
				</ul>
			</xCard>
		</xAffix>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup(props) {
			return {
				ns: _useXui.useNamespace("DocContentOfDemo"),
				xCardStyle: `min-width: 200px;
margin: var(--ui-one);
max-height:calc(100vh - 200px);
overflow:auto;`
			};
		},
		data() {
			const vm = this;
			vm.handleUpdate = _.debounce(() => {
				const contents = _.map($(vm.$el).find("[data-path]"), el => {
					return [$(el).text(), el];
				});
				vm.contents = contents;
			}, 200);
			return {
				isLoading: true,
				contents: []
			};
		},
		mounted() {
			this.handleUpdate();
			setTimeout(() => {
				this.isLoading = false;
			}, 1000);
		},
		methods: {
			scrollTo(item) {
				setTimeout(() => {
					try {
						item[1].scrollIntoView({ behavior: "smooth", block: "center" });
					} catch (error) {}
				}, 200);
			}
		}
	});
}
</script>
