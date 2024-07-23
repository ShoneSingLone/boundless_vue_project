<style lang="less"></style>
<template>
	<div class="el-collapse-item" :class="{ 'is-active': isActive, 'is-disabled': disabled }">
		<div
			role="tab"
			:aria-expanded="isActive"
			:aria-controls="id('content')"
			:aria-describedby="id('content')">
			<div
				class="el-collapse-item__header"
				@click="handleHeaderClick"
				role="button"
				:id="id('head')"
				:tabindex="disabled ? undefined : 0"
				@keyup.space.enter.stop="handleEnterClick"
				:class="{
					focusing: focusing,
					'is-active': isActive
				}"
				@focus="handleFocus"
				@blur="focusing = false">
				<slot name="title">{{ title }}</slot>
				<i
					class="el-collapse-item__arrow el-icon-arrow-right"
					:class="{ 'is-active': isActive }">
				</i>
			</div>
		</div>
		<xCollapseTransition>
			<div
				class="el-collapse-item__wrap"
				v-show="isActive"
				role="tabpanel"
				:aria-hidden="!isActive"
				:aria-labelledby="id('head')"
				:id="id('content')">
				<div class="el-collapse-item__content">
					<slot></slot>
				</div>
			</div>
		</xCollapseTransition>
	</div>
</template>
<script lang="ts">
export default async function () {
	const [{ Transition }] = await Promise.all([_.$importVue("/common/utils/hooks.vue")]);

	return defineComponent({
		name: "xCollapseItem",
		componentName: "xCollapseItem",
		components: {
			xCollapseTransition: {
				name: "ElCollapseTransition",
				functional: true,
				render(h, { children }) {
					const data = {
						on: new Transition()
					};

					return h("transition", data, children);
				}
			}
		},
		data() {
			return {
				contentWrapStyle: {
					height: "auto",
					display: "block"
				},
				contentHeight: 0,
				focusing: false,
				isClick: false
			};
		},

		inject: ["collapse"],

		props: {
			title: String,
			name: {
				type: [String, Number],
				default() {
					return this._uid;
				}
			},
			disabled: Boolean
		},

		computed: {
			isActive() {
				return this.collapse.activeNames.indexOf(this.name) > -1;
			}
		},

		methods: {
			id(prefix) {
				return `el-collapse-${prefix}-${this._uid}`;
			},
			handleFocus() {
				setTimeout(() => {
					if (!this.isClick) {
						this.focusing = true;
					} else {
						this.isClick = false;
					}
				}, 50);
			},
			handleHeaderClick() {
				if (this.disabled) return;
				this.dispatch("xCollapse", "item-click", this);
				this.focusing = false;
				this.isClick = true;
			},
			handleEnterClick() {
				this.dispatch("xCollapse", "item-click", this);
			}
		}
	});
}
</script>
