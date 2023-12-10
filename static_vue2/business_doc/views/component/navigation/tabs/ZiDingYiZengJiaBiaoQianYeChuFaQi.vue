<template>
	<div>
		<div style="margin-bottom: 20px">
			<xBtn size="small" @click="addTab(editableTabsValue)"> add tab </xBtn>
		</div>
		<xTabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
			<xTabPane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
				{{ item.content }}
			</xTabPane>
		</xTabs>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				editableTabsValue: "2",
				editableTabs: [
					{
						title: "Tab 1",
						name: "1",
						content: "Tab 1 content"
					},
					{
						title: "Tab 2",
						name: "2",
						content: "Tab 2 content"
					}
				],
				tabIndex: 2
			};
		},
		methods: {
			addTab(targetName) {
				let newTabName = ++this.tabIndex + "";
				this.editableTabs.push({
					title: "New Tab",
					name: newTabName,
					content: "New Tab content"
				});
				this.editableTabsValue = newTabName;
			},
			removeTab(targetName) {
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}

				this.editableTabsValue = activeName;
				this.editableTabs = tabs.filter(tab => tab.name !== targetName);
			}
		}
	});
}
</script>
<style lang="less"></style>
