<script>
export default async function () {
	return [
		_.$newRoute("/all-project", "@/views/ViewAllProject.vue"),
		/* 指令 */
		_.$newRoute("/directive", "@/views/directive/directive.vue", {
			children: [_.$newRoute("/directive/ripple", "@/views/directive/directive/ripple.vue")]
		}),
		/* 组件 */
		_.$newRoute("/component", "@/views/component/component.vue", {
			children: [
				_.$newRoute("/component/form", "@/views/component/form/form.vue", {
					children: [
						_.$newRoute("/component/form/input", "@/views/component/form/input/input.vue"),
						_.$newRoute("/component/form/select", "@/views/component/form/select/select.vue"),
						_.$newRoute("/component/form/ip-address", "@/views/component/form/ipAddress/ipAddress.vue"),
						_.$newRoute("/component/form/select", "@/views/component/form/select/select.vue")
					]
				}),
				_.$newRoute("/component/data", "@/views/component/data/data.vue", {
					children: [
						_.$newRoute("/component/data/icon", "@/views/component/data/icon/icon.vue"),
						_.$newRoute("/component/data/card", "@/views/component/data/card/card.vue"),
						_.$newRoute("/component/data/tag", "@/views/component/data/tag/tag.vue"),
						_.$newRoute("/component/data/virtualized-table", "@/views/component/data/virtualizedTable/virtualizedTable.vue")
					]
				}),
				/* Navigation */
				_.$newRoute("/component/navigation", "@/views/component/navigation/navigation.vue", {
					children: [_.$newRoute("/component/navigation/tabs", "@/views/component/navigation/tabs/tabs.vue")]
				})
			]
		}),
		/* other */
		_.$newRoute("/other", "@/views/other/other.vue", {
			children: [_.$newRoute("/other/open_window", "@/views/other/other/OpenWindow.vue"), _.$newRoute("/other/x-form-item-wrapper", "@/views/other/other/xFormItemWrapper/xFormItemWrapper.vue")]
		}),
		_.$newRoute("/dev", "@/views/dev/dev.vue", {
			children: [
				_.$newRoute("/dev/template", "@/views/dev/template.vue"),
				_.$newRoute("/dev/render", "@/views/dev/render.vue"),
				_.$newRoute("/dev/io", "@/views/dev/io.vue"),
				_.$newRoute("/dev/rule", "@/views/dev/testRule.vue")
			]
		}),
		_.$newRoute("/dev", "@/views/template/template.vue", {
			children: [_.$newRoute("/template/list", "@/views/template/list/list.vue")]
		}),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/all-project"
		}
	];
}
</script>
