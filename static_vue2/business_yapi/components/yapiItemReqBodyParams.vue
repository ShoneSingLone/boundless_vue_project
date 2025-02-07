<template>
	<xBlock class="width100">
		<xTabs v-model="activeName">
			<xTabPane label="Query" name="first">
				<!-- cptReqQuery:{{ cptReqQuery }} -->
				<PanelReqQuery v-model="cptReqQuery" />
			</xTabPane>
			<xTabPane label="Body" name="second">
				<xItem :configs="form.configs_type" v-model="cptReqBodyType" />
				<!-- cptReqBodyForm:{{ cptReqBodyForm }} -->
				<!-- <pre>
					<code>
						{{ cptReqBodyOther }}
					</code>
				 </pre> -->
				<PanelReqBodyForm v-if="cptReqBodyType === 'form'" v-model="cptReqBodyForm" />
				<PanelReqBodyUrlencoded
					v-if="cptReqBodyType === 'x-www-form-urlencoded'"
					v-model="cptReqBodyForm" />
				<PanelReqBodyJson v-if="cptReqBodyType === 'json'" v-model="cptReqBodyOther" />
			</xTabPane>
			<xTabPane label="Headers" name="third"> Headers </xTabPane>
			<xTabPane label="Cookies" name="fourth"> Cookies </xTabPane>
		</xTabs>
	</xBlock>
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	/* query 参数 */

	/* body 参数 */
	/* - form-data */
	/*
	就是http请求中的 multipart/form-data ,它会将表单的数据处理为一条消息，
	以标签为单元，用分隔符分开。
	既可以上传键值对，也可以上传文件。
	当上传的字段是文件时，会有Content-Type来说明文件类型；content-disposition，用来说明字段的一些信息；
	由于有boundary隔离，所以multipart/form-data既可以上传文件，也可以上传键值对，它采用了键值对的方式，所以可以上传多个文件。
 	*/

	/* - x-www-form-urlencoded */

	/*  就是application/x-www-from-urlencoded,会将表单内的数据转换为键值对，比如,name=java&age = 23 */

	/*

| 类型                  | Content-Type 值                          | 作用                                                              |
|-----------------------|------------------------------------------|-------------------------------------------------------------------|
| form-data             | multipart/form-data                      | 以 key-value 的形式组织数据，用分隔符 boundary 隔开，可以上传文件 |
| x-www-form-urlencoded | application/x-www-from-urlencoded        | 以 key-value 的形式组织数据，用&拼接，不能上传文件                |
| raw                   | application/json,text/plain,text/html 等 | 上传文本                                                          |
| binary                | application/octet-stream                 | 只能上传一个二进制文件，没有 key-value 对                         |
	*/

	return defineComponent({
		components: {
			PanelReqBodyForm: () => _.$importVue("@/components/PanelReqBodyForm.vue"),
			PanelReqQuery: () => _.$importVue("@/components/PanelReqQuery.vue"),
			PanelReqBodyUrlencoded: () => _.$importVue("@/components/PanelReqBodyUrlencoded.vue"),
			PanelReqBodyJson: () => _.$importVue("@/components/PanelReqBodyJson.vue")
		},
		mixins: [mixins],
		data(vm) {
			return {
				activeName: "first",
				form: defItems({
					configs_type: {
						value: "form",
						itemType: "xItemRadioGroup",
						isButton: true,
						minWidth: 400,
						options: [
							{
								label: "json(application/json)",
								value: "json"
							},
							{
								label: "form(multipart/form-data)",
								value: "form"
							},
							{
								label: "urlencoded(application/x-www-from-urlencoded)",
								value: "x-www-form-urlencoded"
							}
						]
					}
				})
			};
		},
		computed: {
			/* url 参数 */
			cptReqQuery: {
				get() {
					return this.$xItemAttr("reqQuery");
				},
				set(val) {
					this.xItem.$emit("update:reqQuery", val);
				}
			},
			cptReqBodyType: {
				get() {
					return this.$xItemAttr("reqBodyType");
				},
				set(val) {
					this.xItem.$emit("update:reqBodyType", val);
				}
			},
			cptReqBodyForm: {
				get() {
					return this.$xItemAttr("reqBodyForm");
				},
				set(val) {
					this.xItem.$emit("update:reqBodyForm", val);
				}
			},
			cptReqBodyOther: {
				get() {
					return this.$xItemAttr("reqBodyOther");
				},
				set(val) {
					this.xItem.$emit("update:reqBodyOther", val);
				}
			}
		},
		methods: {
			async addNewQuery() {
				const [error] = await _.$validateForm(this.$refs.columns_query);
				if (error) {
					return;
				}
				this.cptReqQuery.push({
					name: "",
					value: "string",
					example: "",
					desc: ""
				});
			}
		}
	});
}
</script>

<style lang="less">
.yapiItemReqBodyParams-table-height {
	height: 300px;
}
</style>
