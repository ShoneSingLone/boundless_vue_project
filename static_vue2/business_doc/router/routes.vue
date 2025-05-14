<script lang="ts">
export default async function () {
	const ComponentPageRouterView = {
		render(h) {
			return hDiv({ class: "x-page-view Demo-view" }, [
				h("xPageContent", [h("router-view")])
			]);
		}
	};
	const ComponentRouterView = {
		render(h) {
			return h("router-view");
		}
	};

	return [
		_.$newRoute("/all", "@/views/ViewAllProject.vue"),
		_.$newRoute("/test", ComponentRouterView, {
			redirect: "/test/babel",
			children: [_.$newRoute("/test/babel", "@/views/test/test/UseBabel.vue")]
		}),
		_.$newRoute("/demo", ComponentRouterView, {
			redirect: "/demo/config",
			children: [
				_.$newRoute("/demo/config", "@/views/demo/demo/configList.vue"),
				_.$newRoute("/demo/error", "@/views/demo/demo/ViewError.vue")
			]
		}),
		_.$newRoute("/guide", ComponentPageRouterView, {
			children: [
				_.$newRoute("/guide/i18n", "@/views/guide/guide/ViewI18n.vue"),
				_.$newRoute("/guide/class", "@/views/common/css/ClassName.vue")
			]
		}),
		/* 指令 */
		_.$newRoute("/directive", ComponentPageRouterView, {
			children: [
				_.$newRoute("/directive/ripple", "@/views/directive/directive/ripple/ripple.vue"),
				_.$newRoute(
					"/directive/infinite_scroll",
					"@/views/directive/directive/infinite_scroll/infinite_scroll.vue"
				)
			]
		}),
		/* 聚合类 */
		_.$newRoute("/x-component", ComponentPageRouterView, {
			children: [
				_.$newRoute("/x-component/x-item", "@/views/xComponent/DemoxItem/DemoxItem.vue"),
				_.$newRoute(
					"/x-component/x-item-input",
					"@/views/xComponent/DemoxItemInput/DemoxItemInput.vue"
				),
				_.$newRoute(
					"/x-component/x-item-switch",
					"@/views/xComponent/DemoxItemSwitch/DemoxItemSwitch.vue"
				),
				_.$newRoute(
					"/x-component/x-item-check",
					"@/views/xComponent/DemoxItemCheck/DemoxItemCheck.vue"
				),
				_.$newRoute(
					"/x-component/x-item-cron-expression",
					"@/views/xComponent/DemoxItemCronExpression/DemoxItemCronExpression.vue"
				),
				_.$newRoute(
					"/x-component/x-item-cidr",
					"@/views/xComponent/DemoxItemCidr/DemoxItemCidr.vue"
				),
				_.$newRoute(
					"/x-component/x-item-checkbox-group",
					"@/views/xComponent/DemoxItemCheckboxGroup.vue"
				),
				_.$newRoute("/x-component/x-form", "@/views/xComponent/DemoxForm/DemoxForm.vue")
			]
		}),
		/* 组件 */
		_.$newRoute("/component", ComponentPageRouterView, {
			children: [
				_.$newRoute("/component/base", ComponentRouterView, {
					children: [
						_.$newRoute("/component/base/button", "@/views/base/button/button.vue"),
						_.$newRoute(
							"/component/base/layout",
							"@/views/component/base/layout/layout.vue"
						)
					]
				}),
				_.$newRoute("/component/form", ComponentRouterView, {
					children: [
						_.$newRoute(
							"/component/form/advanced-search",
							"@/views/component/form/advancedSearch/DemoAdvancedSearch.vue"
						),
						_.$newRoute(
							"/component/form/input",
							"@/views/component/form/input/input.vue"
						),
						_.$newRoute(
							"/component/form/input-number",
							"@/views/component/form/inputNumber/inputNumber.vue"
						),
						_.$newRoute(
							"/component/form/radio",
							"@/views/component/form/radio/radio.vue"
						),
						_.$newRoute(
							"/component/form/checkbox",
							"@/views/component/form/checkbox/checkbox.vue"
						),
						_.$newRoute(
							"/component/form/switch",
							"@/views/component/form/switch/switch.vue"
						),
						_.$newRoute(
							"/component/form/slider",
							"@/views/component/form/slider/DemoSlider.vue"
						),
						_.$newRoute(
							"/component/form/select",
							"@/views/component/form/select/select.vue"
						),
						_.$newRoute(
							"/component/form/cascader",
							"@/views/component/form/cascader/DemoCascader.vue"
						),
						_.$newRoute(
							"/component/form/time-picker",
							"@/views/component/form/TimePicker/DemoTimePicker.vue"
						),
						_.$newRoute(
							"/component/form/date-picker",
							"@/views/component/form/DatePicker/DemoDatePicker.vue"
						),
						_.$newRoute(
							"/component/form/date-time-picker",
							"@/views/component/form/DateTimePicker/DemoDateTimePicker.vue"
						),
						_.$newRoute(
							"/component/form/ip-address",
							"@/views/component/form/ipAddress/DemoIpAddress.vue"
						)
					]
				}),
				_.$newRoute("/component/data", ComponentRouterView, {
					children: [
						_.$newRoute(
							"/component/data/chart",
							"@/views/component/data/chart/demo_chart.vue"
						),
						_.$newRoute("/component/data/icon", "@/views/component/data/icon/icon.vue"),
						_.$newRoute(
							"/component/data/avatar",
							"@/views/component/data/avatar/DemoAvatar.vue"
						),
						_.$newRoute(
							"/component/data/image",
							"@/views/component/data/image/image.vue"
						),
						_.$newRoute("/component/data/card", "@/views/component/data/card/card.vue"),
						_.$newRoute("/component/data/tag", "@/views/component/data/tag/tag.vue"),
						_.$newRoute(
							"/component/data/tree",
							"@/views/component/data/tree/DemoTree.vue"
						),
						_.$newRoute(
							"/component/data/descriptions",
							"@/views/component/data/descriptions/DemoDescriptions.vue"
						),
						_.$newRoute(
							"/component/data/virtualized-table",
							"@/views/component/data/virtualizedTable/virtualizedTable.vue"
						),
						_.$newRoute(
							"/component/data/pagination",
							"@/views/component/data/pagination/pagination.vue"
						),
						_.$newRoute(
							"/component/data/badge",
							"@/views/component/data/badge/DemoBadge.vue"
						),
						_.$newRoute(
							"/component/data/excalidraw",
							"@/views/component/data/xExcalidraw/DemoExcalidraw.vue"
						)
					]
				}),
				/* Navigation */
				_.$newRoute("/component/navigation", ComponentRouterView, {
					children: [
						_.$newRoute(
							"/component/navigation/menu",
							"@/views/component/navigation/menu/DemoMenu.vue"
						),
						_.$newRoute(
							"/component/navigation/tabs",
							"@/views/component/navigation/tabs/tabs.vue"
						),
						_.$newRoute(
							"/component/navigation/step",
							"@/views/component/navigation/step/demo_step.vue"
						),
						_.$newRoute(
							"/component/navigation/dropdown",
							"@/views/component/navigation/dropdown/dropdown.vue"
						),
						_.$newRoute(
							"/component/navigation/breadcrumb",
							"@/views/component/navigation/breadcrumb/breadcrumb.vue"
						),
						_.$newRoute(
							"/component/navigation/pageheader",
							"@/views/component/navigation/pageheader/pageheader.vue"
						)
					]
				})
			]
		}),
		/* other */
		_.$newRoute("/other", ComponentPageRouterView, {
			children: [
				_.$newRoute("/other/affix", "@/views/other/affix/DemoAffix.vue"),
				_.$newRoute("/other/message", "@/views/other/message/DemoMessage.vue"),
				_.$newRoute("/other/notification", "@/views/other/notification/Notification.vue"),
				_.$newRoute("/other/alert", "@/views/other/alert/DemoAlert.vue"),
				_.$newRoute("/other/progress", "@/views/other/progress/DemoProgress.vue"),
				_.$newRoute("/other/collapse", "@/views/other/collapse/DemoCollapse.vue"),
				_.$newRoute("/other/layer", "@/views/other/layer/layer.vue"),
				_.$newRoute("/other/move", "@/views/other/move/move.vue"),
				_.$newRoute("/other/popover", "@/views/other/popover/popover.vue"),
				_.$newRoute("/other/tooltip", "@/views/other/tooltip/tooltip.vue"),
				_.$newRoute("/other/timeline", "@/views/other/timeline/DemoTimeline.vue"),
				_.$newRoute("/other/calendar", "@/views/other/calendar/DemoCalendar.vue"),
				_.$newRoute("/other/divider", "@/views/other/divider/DemoDivider.vue"),
				_.$newRoute("/other/open_window", "@/views/other/dialog/dialog.vue"),
				_.$newRoute("/other/drawer", "@/views/other/drawer/DemoDrawer.vue")
			]
		}),
		_.$newRoute("/dev", ComponentPageRouterView, {
			children: [
				_.$newRoute("/dev/template", "@/views/dev/template.vue"),
				_.$newRoute("/dev/render", "@/views/dev/render.vue"),
				_.$newRoute("/dev/io", "@/views/dev/io.vue"),
				_.$newRoute("/dev/rule", "@/views/dev/testRule.vue")
			]
		}),
		_.$newRoute("/template", ComponentPageRouterView, {
			children: [_.$newRoute("/template/list", "@/views/template/list/list.vue")]
		}),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/demo"
		}
	];
}
</script>
