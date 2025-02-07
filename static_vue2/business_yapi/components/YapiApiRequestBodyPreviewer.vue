<style lang="less">
.YapiApiRequestBodyPreviewer-prop-name {
	width: 166px;
	&.required {
		color: var(--ui-danger);
	}
}
</style>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: {
			item: {
				type: Object,
				default() {
					return {};
				}
			},
			propName: {
				type: [String, Number]
			}
		},
		inject: {
			YapiApiRequestBodyPreviewer: {
				default() {
					return {};
				}
			}
		},
		provide() {
			return {
				YapiApiRequestBodyPreviewer: this
			};
		},
		data() {
			return {};
		},
		computed: {
			isRequired() {
				return _.includes(this.YapiApiRequestBodyPreviewer.required, this.propName);
			},
			cptTitle() {
				return h(
					"div",
					{
						class: {
							"YapiApiRequestBodyPreviewer-prop-name mr": true,
							required: this.isRequired
						}
					},
					[this.propName]
				);
			},
			cptType() {
				if (this.item.type === "array") {
					return hDiv({ class: "YapiApiRequestBodyPreviewer-prop-name mr" }, [
						`${this.item.items.type}[]`
					]);
				}
				return hDiv({ class: "YapiApiRequestBodyPreviewer-prop-name mr" }, [
					this.item.type
				]);
			}
		},
		render() {
			if (this.item.type === "object") {
				this.required = this.item.required;
				return hDiv({ col: 2 }, [
					hDiv({ class: "flex middle" }, [this.item.title]),
					..._.map(this.item.properties, (property, prop) => {
						return h("YapiApiRequestBodyPreviewer", { item: property, propName: prop });
					})
				]);
			}
			return hDiv({ class: "flex middle" }, [
				this.cptTitle,
				this.cptType,
				this.item.description
			]);
		}
	});
}
</script>
