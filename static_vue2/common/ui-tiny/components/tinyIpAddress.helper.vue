<script>
export default async function () {
	const IPTHRESHOLD = { Min: 0, Max: 255, NonNumeric: 25 };
	/* https://opentiny.design/tiny-vue/zh-CN/os-theme/components/ip-address#API */

	const isIP6 = str => /^IPv6$/i.test(str);

	const isIP4 = str => /^IPv4$/i.test(str);

	const ipValidator =
		({ props, api }) =>
		value => {
			let result = true;

			if (props.type) {
				/* istanbul ignore else */
				if (api.isIP6(props.type)) {
					result =
						/^(((([\da-fA-F]{1,4}):){7}([\da-fA-F]{1,4}))|(((([\da-fA-F]{1,4}):){1,7}:)|((([\da-fA-F]{1,4}):){6}:([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){5}:(([\da-fA-F]{1,4}):)?([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){4}:(([\da-fA-F]{1,4}):){0,2}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){3}:(([\da-fA-F]{1,4}):){0,3}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){2}:(([\da-fA-F]{1,4}):){0,4}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){1}:(([\da-fA-F]{1,4}):){0,5}([\da-fA-F]{1,4}))|(::(([\da-fA-F]{1,4}):){0,6}([\da-fA-F]{1,4}))|(::([\da-fA-F]{1,4})?))|(((([\da-fA-F]{1,4}):){6}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){5}:(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){4}:(([\da-fA-F]{1,4}):)?(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){3}:(([\da-fA-F]{1,4}):){0,2}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){2}:(([\da-fA-F]{1,4}):){0,3}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(([\da-fA-F]{1,4})::(([\da-fA-F]{1,4}):){0,4}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(::(([\da-fA-F]{1,4}):){0,5}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))))$/.test(
							value
						);
				} else if (api.isIP4(props.type)) {
					result =
						/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(
							value
						);
				}
			}

			return result;
		};

	const getCursorPosition = el => {
		let cursorPos = 0;
		let selectRange = null;
		/* istanbul ignore if */
		if (document.selection) {
			selectRange = document.selection.createRange();
			selectRange.moveStart("character", -el.value.length);
			cursorPos = selectRange.text.length;
		}
		/* istanbul ignore if */
		if (el.selectionStart || el.selectionStart === "0") {
			cursorPos = el.selectionStart;
		}

		return cursorPos;
	};

	const getValue =
		({ api, props, state }) =>
		() => {
			const valueArr = [];
			let result = "";

			if (api.isIP6(props.type)) {
				state.address.forEach(item => {
					if (item.value) {
						item.value = item.value.replace(/[^a-fA-F\d]/g, "");
					}

					item.value && valueArr.push(item.value);
				});

				result =
					state.address.filter(item => item.value).length === 8
						? valueArr.join(":")
						: "";
			} else {
				state.address.forEach(item => {
					if (api.isIP4(props.type) && item.value) {
						item.value = item.value.replace(/\D/g, "");
					}

					item.value && valueArr.push(item.value);
				});

				result =
					state.address.filter(item => item.value).length === 4
						? valueArr.join(".")
						: "";
			}

			return result;
		};

	const setValue =
		({ api, props, state }) =>
		value => {
			if (value) {
				/* istanbul ignore else */
				if (api.ipValidator(value)) {
					if (api.isIP6(props.type)) {
						state.address = value.split(":").map(item => ({ value: item }));
						if (state.address.length < 8) {
							let insertIndex = 0;
							state.address.forEach((item, index) => {
								if (item.value === "") {
									item.value = "0000";
									insertIndex = index;
								}
							});
							for (var i = 0; i <= 8 - state.address.length; i++) {
								state.address.splice(insertIndex, 0, { value: "0000" });
							}
						}
					} else {
						state.address = value.split(".").map(item => ({ value: item }));
					}
				}
			} else {
				state.address = api.isIP6(props.type)
					? new Array(8).fill({ value: "" })
					: new Array(4).fill({ value: "" });
			}
		};

	const activeEvent = ({ emit, parent, state, index, event, type }) => {
		const target =
			event && event.target
				? event.target
				: parent.$el.querySelectorAll("input")[index || 0];

		type === "focus" && (state.active = true);

		if (!event) {
			if (target && !state.isSelected) {
				state.isSelected = true;
				target[type]();

				setTimeout(() => {
					state.isSelected = false;
				}, 10);

				emit(type, target.value, index);
			}
		} else {
			!state.isSelected && emit(type, target.value, index);
		}
	};

	const focus =
		({ emit, parent, state }) =>
		({ index, event }) => {
			activeEvent({ emit, parent, state, index, event, type: "focus" });
		};

	const select =
		({ emit, parent, state }) =>
		({ index, event }) => {
			activeEvent({ emit, parent, state, index, event, type: "select" });
		};

	const inputEvent =
		({ api, componentName, emit, eventName, props }) =>
		({ item, index }) => {
			const val = item.value.trim();
			let value = "";

			if (api.isIP4(props.type)) {
				if (!index && api.ipValidator(val)) {
					api.setValue(val);
				} else if (
					isNaN(val) ||
					val < IPTHRESHOLD.Min ||
					val > IPTHRESHOLD.Max
				) {
					item.value = "";
				}
			} else {
				if (!index && api.ipValidator(val)) {
					api.setValue(val);
				} else if (val.length > 4) {
					item.value = item.value.slice(0, 4);
				}
			}

			value = api.getValue();

			emit("update:modelValue", value, index);
			api.dispatch(componentName, eventName, [value]);
		};

	const change =
		({ api, emit }) =>
		() => {
			const value = api.getValue();
			emit("change", value);
		};

	const blur =
		({ api, componentName, emit, eventName, props, state }) =>
		({ item, index }) => {
			state.active = false;
			state.isDel = false;

			if (api.isIP4(props.type)) {
				item.value = item.value.replace(/\D/g, "");
			}

			emit("blur", item.value, index);
			api.dispatch(componentName, eventName, [item.value]);
		};

	const keyup =
		({ api, props }) =>
		({ item, index, event }) => {
			const { keyCode } = event;
			const value = item.value.trim();
			const nextIndex = index + 1;

			if (api.isIP4(props.type)) {
				if (isNaN(item.value)) {
					item.value = item.value.replace(/\D/g, "");
					return false;
				}

				if (
					[
						KEY_CODE.Tab,
						KEY_CODE.Space,
						KEY_CODE.NumpadDecimal,
						KEY_CODE.NumpadComma
					].includes(keyCode) &&
					value
				) {
					api.select({ index: nextIndex });
					return false;
				}

				/* istanbul ignore next */
				if (
					(value === "0" ||
						value > IPTHRESHOLD.NonNumeric ||
						value.length === 3) &&
					!isNaN(event.key)
				) {
					api.focus({ index: nextIndex });
					api.select({ index: nextIndex });

					return false;
				}
			}
			if (api.isIP6(props.type)) {
				if (
					[
						KEY_CODE.Tab,
						KEY_CODE.Space,
						KEY_CODE.NumpadDecimal,
						KEY_CODE.NumpadComma
					].includes(keyCode) &&
					value
				) {
					api.select({ index: nextIndex });

					return false;
				}
				if (
					(value.length === 4 || value === "0000") &&
					(!isNaN(event.key) ||
						(keyCode >= KEY_CODE.KeyA && keyCode <= KEY_CODE.KeyF))
				) {
					api.focus({ index: nextIndex });
					api.select({ index: nextIndex });

					return false;
				}
			}
		};

	const checkError1 = ({
		Tab,
		Space,
		NumpadDecimal,
		NumpadComma,
		keyCode,
		value
	}) => [Tab, Space, NumpadDecimal, NumpadComma].includes(keyCode) && value;

	// NEXT 屏蔽选中时，替换值大于255
	const checkError2 = newValue =>
		newValue && (isNaN(newValue) || newValue > IPTHRESHOLD.Max);

	// NEXT 当内容为"0"时，屏蔽输入
	const checkError3 = ({ isfilterKeyCodes, isSelected, value }) =>
		!isfilterKeyCodes && !isSelected && value === "0";

	// NEXT 当内容加输入的数字大于255时，屏蔽输入
	const checkError4 = ({ isfilterKeyCodes, isSelected, value, key }) =>
		!isfilterKeyCodes && !isSelected && value + key > IPTHRESHOLD.Max;

	// NEXT 屏蔽非数字键
	const checkError5 = ({
		key,
		isfilterKeyCodes,
		value,
		ctrlKey,
		keyCode,
		KeyV
	}) =>
		isNaN(key) && !isfilterKeyCodes && !(!value && ctrlKey && keyCode === KeyV);

	const isError = ({
		key,
		value,
		isSelected,
		isfilterKeyCodes,
		ctrlKey,
		keyCode,
		newValue
	}) => {
		const { Tab, Space, NumpadDecimal, NumpadComma, KeyV } = KEY_CODE;

		return (
			checkError1({ Tab, Space, NumpadDecimal, NumpadComma, keyCode, value }) ||
			checkError2(newValue) ||
			checkError3({ isfilterKeyCodes, isSelected, value }) ||
			checkError4({ isfilterKeyCodes, isSelected, value, key }) ||
			checkError5({ key, isfilterKeyCodes, value, ctrlKey, keyCode, KeyV })
		);
	};

	const keydown =
		({ api, props, state }) =>
		({ item, index, event }) => {
			const { target, key, keyCode, ctrlKey } = event;
			const value = item.value;
			const selectionStart = target.selectionStart;
			const selectionEnd = target.selectionEnd;
			const isSelected = selectionStart !== selectionEnd;
			const cursorPosition = api.getCursorPosition(target);
			const isfilterKeyCodes = state.filterKeyCodes.includes(keyCode);
			const nextIndex = index + 1;
			const lastIndex = index - 1;
			const newValue =
				isSelected &&
				!isfilterKeyCodes &&
				value.substr(0, selectionStart) + key + value.substr(selectionEnd);
			state.isDel =
				keyCode === KEY_CODE.Backspace || keyCode === KEY_CODE.Delete;

			if (
				keyCode === KEY_CODE.Backspace &&
				cursorPosition === 0 &&
				!selectionEnd
			) {
				api.focus({ index: lastIndex });

				return false;
			}

			if (keyCode === KEY_CODE.ArrowLeft && cursorPosition === 0) {
				api.focus({ index: lastIndex });
				event.preventDefault();

				return false;
			}

			// NEXT 光标在最后位置时，按右方向键跳到下一个输入框
			if (keyCode === KEY_CODE.ArrowRight && cursorPosition === value.length) {
				api.focus({ index: nextIndex });
				event.preventDefault();

				return false;
			}

			if (
				isError({
					key,
					value,
					isSelected,
					isfilterKeyCodes,
					ctrlKey,
					keyCode,
					newValue,
					api,
					props
				})
			) {
				event.preventDefault();
				return false;
			}
		};

	const getHeightOfSize = (size, isLineHeight = "height") => {
		const sizeMap = {
			medium: "42px",
			small: "36px",
			mini: "24px"
		};

		const sizePX = sizeMap[size];

		return sizePX ? isLineHeight + ":" + sizePX + ";" : "";
	};

	const api = [
		"state",
		"focus",
		"inputEvent",
		"blur",
		"keyup",
		"keydown",
		"change",
		"select"
	];

	const initState = ({ reactive, computed, handleValue, parent, props }) => {
		const state = reactive({
			...handleValue.state,
			active: false,
			isSelected: false,

			filterKeyCodes: [
				KEY_CODE.AtMark,
				KEY_CODE.Backspace,
				KEY_CODE.ArrowLeft,
				KEY_CODE.ArrowRight,
				KEY_CODE.Tab,
				KEY_CODE.Delete
			],

			formDisabled: computed(() => (parent.tinyForm || {}).disabled),
			disabled: computed(() => props.disabled || state.formDisabled),
			heightStyle: computed(() => getHeightOfSize(props.size)),
			lineHeightStyle: computed(() =>
				getHeightOfSize(props.size, "line-height")
			),
			allHeightStyle: computed(
				() => `${state.heightStyle}${state.lineHeightStyle}`
			)
		});

		return state;
	};

	const initApi = ({
		state,
		api,
		dispatch,
		handleValue,
		emit,
		broadcast,
		parent,
		componentName,
		props,
		eventName
	}) => {
		Object.assign(api, {
			...handleValue.api,
			state,
			dispatch,
			broadcast,
			getCursorPosition,
			focus: focus({ emit, props, parent, state }),
			select: select({ emit, props, parent, state }),
			blur: blur({
				api,
				componentName,
				emit,
				eventName: eventName.blur,
				props,
				state
			}),
			keyup: keyup({ api, props, parent }),
			change: change({ api, emit }),
			keydown: keydown({ api, props, state }),
			inputEvent: inputEvent({
				api,
				emit,
				props,
				componentName,
				eventName: eventName.change
			})
		});
	};

	const useHandleValue = ({
		componentName,
		dispatch,
		eventName,
		props,
		reactive,
		toRefs,
		watch
	}) => {
		const state = reactive({
			address: [],
			isDel: false
		});

		const api = {
			isIP6,
			isIP4
		};

		api.getValue = getValue({ api, props, state });
		api.setValue = setValue({ api, props, state });
		api.ipValidator = ipValidator({ api, props });

		watch(
			() => props.modelValue,
			value => {
				if (!state.isDel) {
					api.setValue(value);
					dispatch(componentName, eventName, [value]);
				}
			},
			{ immediate: true }
		);

		return {
			state: toRefs(state),
			api
		};
	};

	const renderless = (
		props,
		{ reactive, toRefs, watch, inject, computed },
		{ $prefix, emit, parent, broadcast, dispatch }
	) => {
		const api = {};
		const componentName = "FormItem";
		const eventName = {
			change: "form.change",
			blur: "form.blur"
		};

		parent.tinyForm = parent.tinyForm || inject("form", null);

		const handleValue = useHandleValue({
			componentName,
			dispatch,
			eventName: eventName.change,
			props,
			reactive,
			toRefs,
			watch
		});

		const state = initState({ reactive, computed, handleValue, parent, props });

		initApi({
			api,
			state,
			handleValue,
			dispatch,
			broadcast,
			emit,
			props,
			parent,
			componentName,
			eventName
		});

		return api;
	};

	return {
		isIP6,
		isIP4,
		ipValidator,
		getCursorPosition,
		getValue,
		setValue,
		focus,
		select,
		inputEvent,
		change,
		blur,
		keyup,
		keydown,
		getHeightOfSize,
		renderless,
		resolveMode(props2, context) {
			var isRightMode = function isRightMode2(mode) {
				return ~["pc", "mobile", "mobile-first"].indexOf(mode);
			};
			var config = rootConfig(context);
			var tinyModeProp =
				typeof props2.tiny_mode === "string" ? props2.tiny_mode : null;
			var tinyModeInject = hooks__namespace.inject("TinyMode", null);
			var tinyModeGlobal = config.tiny_mode && config.tiny_mode.value;
			if (!isRightMode(tinyModeProp)) tinyModeProp = null;
			if (!isRightMode(tinyModeInject)) tinyModeInject = null;
			if (!isRightMode(tinyModeGlobal)) tinyModeGlobal = null;
			var tinyMode = tinyModeProp || tinyModeInject || tinyModeGlobal || "pc";
			if (props2.tiny_mode_root) {
				hooks__namespace.provide("TinyMode", tinyMode);
			}
			var instance = hooks__namespace.getCurrentInstance();
			Object.defineProperty(instance, "_tiny_mode", {
				value: tinyMode
			});
			return tinyMode;
		}
	};
}
</script>
<style lang="less"></style>
