<template>
	<router-view />
</template>

<script>
export default function () {
	return {
		NEED_HMR: localStorage.isDev,
		data() {
			return {};
		},
		mounted() {},
		methods: {}
	};
}
</script>
