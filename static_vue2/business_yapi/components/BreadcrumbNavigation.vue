<template>
	<h1>{{ $route.path }}</h1>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				title: "BreadcrumbNavigation"
			};
		}
	});
}
</script>
