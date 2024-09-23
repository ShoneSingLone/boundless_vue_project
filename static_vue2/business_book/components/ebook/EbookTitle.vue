<template>
	<transition name="slide-down">
		<div class="title-wrapper" v-show="menuVisible">
			<div class="left">
				<span class="icon-back" @click="back"></span>
			</div>
			<div class="right">
				<div class="icon-wrapper">
					<div class="icon-shelf"></div>
				</div>
				<div class="icon-wrapper">
					<div class="icon-cart"></div>
				</div>
				<div class="icon-wrapper">
					<div class="icon-more"></div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
export default async function () {
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");
	return {
		mixins: [ebookMixin],
		methods: {
			back() {
				this.$router.go(-1);
			}
		}
	};
}
</script>
