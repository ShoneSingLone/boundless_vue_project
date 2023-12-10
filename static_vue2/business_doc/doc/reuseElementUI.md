```js
import Focus from "element-ui/src/mixins/focus";
Focus("reference")
//====>
const { useFocus } = await _.$importVue("/common/utils/compositionAPI.vue");
setup() {
    const { focus } = useFocus(this, "reference");
    return { focus };
}
```

template当中不可以使用 `

Emitter - Emitter 是 Vue1 的dispatch 和 broadcast 已经内置

isHide 普通的属性用法可以直接使用v-if，configs里面用isHide来控制是否显示，默认false
