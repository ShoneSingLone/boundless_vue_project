<style lang="less">
.test {
	display: none;
}
</style>
<template>
	<div>
		{{ Date.now() }}
		{{ THIS_FILE_URL }}
		<div>{{ i18n("sys_config", { configs: 1 }) }}</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	const a = {
		b: {
			c: {
				d: {
					e: [
						{
							f: {
								g: 0,
								a(...args) {
									console.log("success", args);
								}
							}
						}
					]
				}
			}
		}
	};

	const prop = 0;
	console.log(a?.b?.[prop || 1]?.g);
	// console.log(_.$val(a, `b.${prop || 1}.g`));

	console.log(a?.b?.c?.d?.e?.[0]?.f?.g);
	// console.log(_.$val(a, "b.c.d.e.0.f.g"));

	console.log(a?.b?.c?.d?.e?.[0]?.f?.a?.(1, 2, 3, 4, 5));
	// console.log(_.$callFn(a, "b.c.d.e.0.f.a")(1, 2, 3, 4, 5));

	return defineComponent({
		data() {
			return {
				THIS_FILE_URL,
				prop: 0,
				a: {
					b: {
						c: {
							d: {
								e: [
									{
										f: {
											g: 0,
											a(...args) {
												console.log(args);
												return "success";
											}
										}
									}
								]
							}
						}
					}
				}
			};
		}
	});
}
</script>
