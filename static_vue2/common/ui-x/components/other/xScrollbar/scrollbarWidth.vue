<template>
	<h1 class="MUST_MODIFY">{{ title }}</h1>
</template>
<script>
export default async function () {
	let scrollBarWidth;

	return function () {
		if (scrollBarWidth !== undefined) return scrollBarWidth;
		const outer = document.createElement("div");
		outer.className = "el-scrollbar__wrap";
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		outer.style.position = "absolute";
		outer.style.top = "-9999px";
		document.body.appendChild(outer);

		const widthNoScroll = outer.offsetWidth;
		outer.style.overflow = "scroll";

		const inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner);

		const widthWithScroll = inner.offsetWidth;
		outer.parentNode.removeChild(outer);
		scrollBarWidth = widthNoScroll - widthWithScroll;

		return scrollBarWidth;
	};
}
</script>
<style lang="less">
.MUST_MODIFY {
	color: red;
}
</style>
