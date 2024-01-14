<template>
	<button class="el-button" @click="handleClick" :disabled="buttonDisabled || loading" :autofocus="autofocus" :type="nativeType" :class="cptClassName">
		<i class="el-icon-loading" v-if="loading"></i>
		<i :class="icon" v-if="icon && !loading"></i>
		<span v-if="$slots.default">
			<slot></slot>
		</span>
	</button>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElButton",
		inject: {
			elForm: {
				default: ""
			},
			elFormItem: {
				default: ""
			}
		},
		props: {
			type: {
				type: String,
				default: "default"
			},
			size: String,
			icon: {
				type: String,
				default: ""
			},
			nativeType: {
				type: String,
				default: "button"
			},
			loading: Boolean,
			disabled: Boolean,
			plain: Boolean,
			autofocus: Boolean,
			round: Boolean,
			circle: Boolean
		},
		computed: {
			cptClassName() {
				return [
					this.type ? "el-button--" + this.type : "",
					this.buttonSize ? "el-button--" + this.buttonSize : "",
					{
						"is-disabled": this.buttonDisabled,
						"is-loading": this.loading,
						"is-plain": this.plain,
						"is-round": this.round,
						"is-circle": this.circle
					}
				];
			},
			_elFormItemSize() {
				return (this.elFormItem || {}).elFormItemSize;
			},
			buttonSize() {
				return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
			},
			buttonDisabled() {
				return this.$options.propsData.hasOwnProperty("disabled") ? this.disabled : (this.elForm || {}).disabled;
			}
		},
		methods: {
			handleClick(evt) {
				this.$emit("click", evt);
			}
		}
	});
}
</script>
<style lang="less"></style>
