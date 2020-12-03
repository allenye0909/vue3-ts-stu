### 01-Vue 3.0开篇-理解

#### 一、为什么现在才讲Vue3.0?

- 因为昨天才发布正式版本
- 正式版之前API不稳定（白学）
- 正式版之前企业开发用不上（不稳定）

#### 二、为什么现在要讲Vue3.0?

- 正式版已经发布，已经基本稳定
- 预计2021年企业开发用得上 
  - 学习是一个渐进的过程

#### 三、如何学习Vue3.0?

- 不用全力以赴 
  - 因为上线项目暂时还不会用
  - 因为相关生态还有待完善
- 先学习vue2.x 
  - Vue3.0并不是推到重来，很多2.x内容依然被保留
- 先学习TypeScript 
  - Vue3.0采用TS重写，想知其然知其所以然必须学习TS

### 02-Vue3.0-diff算法-理解&&03-Vue3.0-静态提升和监听缓存-理解

#### 一、Vue3.0六大亮点

- Performance: 性能比Vue 2.x快1.2~2倍
- Tree shaking support: 按需编译，体积比vue2.x更小
- Composition API: 组合API（类似React Hooks）
- Better TypeScript support: 更好的Ts支持
- Custom Renderer API: 暴露了自定义渲染API
- Fragment, Teleport(Protal), Suspense: 更先进的组件

#### 二、Vue3.0是如何变快的

##### 1. diff方法优化

- Vue2中的虚拟dom是进行全量比对
- Vue3新增了静态标记（PatchFlag）
   在与上次虚拟节点进行比对时候，只对比带有patch flag的节点
   并且可以通过flag的信息 得知当前节点要比对的具体内容

###### (1) Vue2 diff算法



![img](https:////upload-images.jianshu.io/upload_images/1907212-34c8dce1042291f4.png?imageMogr2/auto-orient/strip|imageView2/2/w/1137/format/webp)

image.png

#### (2) Vue3 diff算法



![img](https:////upload-images.jianshu.io/upload_images/1907212-84816620346e4d72.png?imageMogr2/auto-orient/strip|imageView2/2/w/1130/format/webp)

image.png

###### (3) Vue编译demo

```html
<div>
  <p>我是段落</p>
  <p>{{msg}}</p>
</div>
import {
  createVNode as _createVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createBlock as _createBlock
} from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("p", null, "我是段落"),
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}
```

###### (4) 附录 PatchFlags

```js
export const enum PatchFlags {
  TEXT = 1, // 动态文本节点
  CLASS = 1 << 1, // 2 动态class
  STYLE = 1 << 2, // 4 动态style
  PROPS = 1 << 3, // 8 动态属性，但不包含类名和样式
  FULL_PROPS = 1 << 4, // 16 具有动态 key 属性，当 key 改变时，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5, // 32 带有监听事件的节点
  STABLE_FRAGMENT = 1 << 6, // 64 一个不会改变子节点顺序的 fragment
  KEYED_FRAGMENT = 1 << 7, // 128 带有key属性的 fragment 或部分带有 key
  UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 fragment
  NEED_PATCH = 1 << 9, // 512 一个节点只会进行非 props 比较
  DYNAMIC_SLOTS = 1 << 10, // 1024
  HOISTED = -1,
  BAIL = -2
}
```

##### 2. 静态提升（hoistStatic）

- Vue2中无论元素是否参与更新，每次都会重新创建，然后再渲染
- Vue3中对于不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可

###### (1) Vue编译demo

```html
<div>
  <p>我是段落</p>
  <p>{{msg}}</p>
</div>
import {
  createVNode as _createVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createBlock as _createBlock
} from "vue"

const _hoisted_1 = /*#__PURE__*/_createVNode("p", null, "我是段落", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _hoisted_1,
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}
```

##### 3. 事件侦听器缓存（cacheHandlers）

- 默认情况下onClick会被视为动态绑定，所以每次都会去追踪它的变化
   但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可

###### (1) Vue编译demo

```html
<div>
  <button @click="onClick">按钮</button>
</div>
```

关闭事件侦听器缓存

```js
import {
  createVNode as _createVNode,
  openBlock as _openBlock,
  createBlock as _createBlock
} from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", { onClick: _ctx.onClick }, "按钮", 8 /* PROPS */, ["onClick"])
  ]))
}
```

开启事件侦听器缓存

```js
import {
  createVNode as _createVNode,
  openBlock as _openBlock,
  createBlock as _createBlock
} from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick(...args)))
    }, "按钮")
  ]))
}
```

**注意点：**转换之后的代码，大家可能还看不懂，但是不要紧，我们只需要观察有没有静态标记即可，因为我们知道在Vue3的diff算法中，只有有静态标记的才会进行比较，才会进行追踪

##### 4. ssr渲染

- 当有大量静态内容时候，这些内容会被当做纯字符串推进一个buffer里面，
   即使存在动态绑定，会通过模板插值嵌入进去。这样会比通过虚拟dom来渲染的快上很多很多。
- 当静态内容大到一定量级时候，会用_createStaticVNode方法在客户端生成一个static node，这些静态node，会被直接innerHTML，就不需要创建对象，然后根据对象渲染。

### 04-Vue3.0-项目创建-理解

#### 一、创建Vue3的三种方式

##### 1. Vue-CLI

```bash
npm install -g @vue/cli
vue create projectName
cd projectName
npm run serve
```

##### 2. Webpack

```bash
git clone https://github.com/vuejs/vue-next-webpack-preview.git projectName
cd projectName
npm install
npm run dev
```

##### 3. Vite

#### 二、 什么是Vite?

- Vite是Vue作者开发的一款意图取代webpack的工具
- 其实现原理是利用ES6的import会发送请求去加载文件的特性，拦截这些请求，做一些预编译，省去webpack冗长的打包时间

#### 三、 利用Vite创建Vue3项目

##### 1. 安装Vite

```bash
npm install -g create-vite-app
```

##### 2. 创建Vue3项目

```bash
create-vite-app projectName
```

##### 3. 安装依赖运行项目

```bash
cd projectName
npm install
npm run dev
```

#### 四、Vue3.0 demo

- 修改App.vue文件

```xml
<template>
  <div>
    <p>{{msg}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: '智播渔',
    }
  },
  methods: {
    myFn() {
      alert('www.it666.com')
    },
  },
}
</script>
```



![img](https:////upload-images.jianshu.io/upload_images/1907212-f639ab96f5596a95.png?imageMogr2/auto-orient/strip|imageView2/2/w/431/format/webp)

image.png



![img](https:////upload-images.jianshu.io/upload_images/1907212-c7a649c28ea8c7e8.png?imageMogr2/auto-orient/strip|imageView2/2/w/455/format/webp)

image.png

### 05-Vue2.x-存在的问题-理解

#### 一、todolist demo

```xml
<template>
  <div>
    <form>
      <input
        type="text"
        v-model="stu.id"
      />
      <input
        type="text"
        v-model="stu.name"
      />
      <input
        type="text"
        v-model="stu.age"
      />
      <input
        type="submit"
        @click="addStu"
      />
    </form>
    <ul>
      <li
        v-for="(stu,index) in stus"
        :key="stu.id"
        @click="remStu(index)"
      >
        {{stu.name}} -- {{stu.age}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      stus: [
        { id: 1, name: 'zs', age: 10 },
        { id: 2, name: 'ls', age: 20 },
        { id: 3, name: 'ww', age: 30 },
      ],
      stu: {
        id: '',
        name: '',
        age: '',
      },
    }
    // 新增功能1的数据
    // 新增功能2的数据
  },
  methods: {
    remStu(index) {
      this.stus = this.stus.filter((stu, idx) => idx != index)
    },
    addStu(e) {
      e.preventDefault()
      const stu = Object.assign({}, this.stu)
      this.stus.push(stu)
      this.stu = {
        id: '',
        name: '',
        age: '',
      }
    },
    // 新增功能1的业务逻辑
    // 新增功能2的业务逻辑
  },
  computed: {
    // 新增功能1的业务逻辑
    // 新增功能2的业务逻辑
  },
  watch: {
    // 新增功能1的业务逻辑
    // 新增功能2的业务逻辑
  },
}
</script>
```

#### 二、 问题

数据和业务逻辑分散，不利于管理维护

### 06-Vue3.0-组合API上-理解

#### 一、组合API初体验 demo

```xml
<template>
  <div>
    <p>{{count}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  // setup函数是组合API的入口函数
  setup() {
    // 定义了一个名称叫做count的变量，这个变量的初始值是0
    // 这个变量发生改变之后，Vue会自动更新UI
    let count = ref(0)

    // 在组合API中，如果想定义方法，不用定义到methods中，直接定义即可
    function myFn() {
      count.value += 1
    }

    // 注意点
    // 在组合API中定义的变量/方法，要想在外界使用，必须通过return {xxx, xxx}暴露出去
    return {
      count,
      myFn,
    }
  },
}
</script>
```

#### 二、注意点

- setup函数是组合API的入口函数
- 使用ref定义一个变量并设置初始值，这个变量发生改变之后，Vue会自动更新UI
- ref函数只能监听简单类型的变化，不能监听复杂类型的变化（对象/数组）
- 在组合API中，如果想定义方法，不用定义到methods中，直接定义即可
- 在组合API中定义的变量/方法，要想在外界使用，必须通过return {xxx, xxx}暴露出去

### 07-Vue3.0-组合API中-理解

#### 一、业务抽离demo

```xml
<template>
  <div>
    <ul>
      <li
        v-for="(stu,index) in state.stus"
        :key="stu.id"
        @click="remStu(index)"
      >
        {{stu.name}} -- {{stu.age}}
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'

function useRemoveStudent() {
  let state = reactive({
    stus: [
      { id: 1, name: 'zs', age: 10 },
      { id: 2, name: 'ls', age: 20 },
      { id: 3, name: 'ww', age: 30 },
    ],
  })

  function remStu(index) {
    state.stus = state.stus.filter((stu, idx) => idx != index)
  }

  return { state, remStu }
}

export default {
  name: 'App',
  setup() {

    let { state, remStu } = useRemoveStudent()

    return {
      state,
      remStu,
    }
  },
}
</script>
```

#### 二、 理解

删除用户的业务代码被抽离到了useRemoveStudent中，利于之后的管理和维护

### 08-Vue3.0-组合API下-理解

#### 一、多文件demo

```xml
<template>
  <div>
    <form>
      <input
        type="text"
        v-model="state2.stu.id"
      />
      <input
        type="text"
        v-model="state2.stu.name"
      />
      <input
        type="text"
        v-model="state2.stu.age"
      />
      <input
        type="submit"
        @click="addStu"
      />
    </form>
    <ul>
      <li
        v-for="(stu,index) in state.stus"
        :key="stu.id"
        @click="remStu(index)"
      >
        {{stu.name}} -- {{stu.age}}
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
import useAddStudent from './js/add'
import useRemoveStudent from './js/remove'
export default {
  name: 'App',
  setup() {
    let { state, remStu } = useRemoveStudent()
    let { state2, addStu } = useAddStudent(state)

    return {
      state,
      remStu,
      state2,
      addStu,
    }
  },
}
</script>
import { reactive } from 'vue'

function useRemoveStudent() {
  let state = reactive({
    stus: [
      { id: 1, name: 'zs', age: 10 },
      { id: 2, name: 'ls', age: 20 },
      { id: 3, name: 'ww', age: 30 },
    ],
  })

  function remStu(index) {
    state.stus = state.stus.filter((stu, idx) => idx != index)
  }

  return { state, remStu }
}

export default useRemoveStudent
import { reactive } from 'vue'

function useAddStudent (state) {
  let state2 = reactive({
    stu: {
      id: '',
      name: '',
      age: '',
    },
  })

  function addStu (e) {
    e.preventDefault()
    const stu = Object.assign({}, state2.stu)
    state.stus.push(stu)
    state2.stu = {
      id: '',
      name: '',
      age: '',
    }
  }

  return { state2, addStu }
}

export default useAddStudent
```

#### 二、理解

- 所有的功能都可以放到独立的模块中去管理

### 09-Vue3.0-来点动力-理解

Vue2.0 按照操作划分代码块，Vue3.0 按业务划分代码块



![img](https:////upload-images.jianshu.io/upload_images/1907212-12d6db19ecfafa9f.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image

### 10-Vue3.0-组合API本质-理解&&11-Vue3.0-setup执行时机和注意点-理解

#### 一、 Composition API 和 Option API 混合使用

Composition API 和 Option API可以混合使用

#### 1. 混合使用demo

```xml
<template>
  <div>
    <p>{{name}}</p>
    <button @click="myFn1">按钮</button>
    <p>{{age}}</p>
    <button @click="myFn2">按钮</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  data() {
    return {
      name: 'lnj',
    }
  },
  methods: {
    myFn1() {
      alert('abc')
    },
  },
  setup() {
    let age = ref(18)
    function myFn2() {
      alert('sxx')
    }
    return {
      age,
      myFn2,
    }
  },
}
</script>
```

#### 二、 Composition API本质（组合API/注入API）

Composition API的本质就是在运行的时候将暴露出去的数据注入到option api中，如将数据注入到data中，将方法注入到methods中。

#### 三、 setup执行时机

setup在beforeCreate和created两个生命周期之间执行

- beforeCreate: 表示组件刚刚被创建出来，组件的data和methods还没有初始化好
- setup
- created: data和methods已经初始化好

#### 四、 setup注意点

- 由于在执行setup函数的时候，还没有执行created生命周期方法，所以在setup函数中，是无法使用data和methods
- 由于我们不能在setup函数中无法使用data和methods，所以Vue为了避免我们错误的使用，它直接将函数中的this修改成了**undefined** 
- setup函数只能是同步的，不能是异步的

### 12-Vue3.0-reactive-理解

#### 一、什么是reactive

- reactive是Vue3中提供的实现响应式数据的方法
- 在Vue2中响应式数据是通过defineProperty来实现的，而在Vue3中响应式数据是通过ES6的Proxy来实现的

#### 二、reactiv注意点

- reactive参数必须是对象（json/arr）
- 如果给reactive传递了其他对象 
  - 默认情况下修改对象，界面不会自动更新
  - 如果想更新，可以通过重新赋值的方式

##### 1. 给reactive传递非对象无法实现响应式

点击按钮值发生变化但页面将不会发生变化

```xml
<template>
  <div>
    <p>{{state}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    // 创建一个响应式数据
    // 本质：就是将传入的数据包装成一个Proxy对象
    let state = reactive(123)

    function myFn() {
      state = 666 // 由于在创建响应式数据的时候传递的不是一个对象，所以无法实现响应式
      console.log(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

##### 2. 需要传递一个对象才可以实现响应式

点击按钮页面将发生变化

```xml
<template>
  <div>
    <p>{{state.age}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = reactive({
      age: 123,
    })

    function myFn() {
      state.age = 666
      console.log(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

##### 3. 数组也可以监听

点击按钮修改数组的值将发现页面发生变化

```xml
<template>
  <div>
    <p>{{state}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = reactive([1, 3, 5])

    function myFn() {
      state[0] = 666
      console.log(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

##### 4. 其他对象不能实现响应式，需要重新赋值

调用Date自带的方法不能实现响应式，需要使用注释的方法实现

```xml
<template>
  <div>
    <p>{{state.time}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = reactive({
      time: new Date(),
    })

    function myFn() {
      // const newTime = new Date(state.time.getTime())
      // newTime.setDate(newTime.getDate() + 1)
      // state.time = newTime
      state.time.setDate(state.time.getDate() + 1)
      console.log(state.time)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

### 13-Vue3.0-ref-理解

#### 一、什么是ref

- ref和reactive一样，也是用来实现响应式数据的方法
- 由于reactive必须传递一个对象，所以导致在企业开发中如果我们只想让某个变量实现响应式的时候会非常麻烦，所以Vue3就给我们提供了ref方法，实现对简单值的监听

#### 二、ref本质

- ref底层的本质其实还是reactive，系统会自动根据我们给ref传入的值将它转换成`ref(xx) -> reactive({value: xx})` 

#### 三、ref注意点

- 在template中使用ref的值不用通过value获取
- 在js中使用ref的值必须通过value获取

1. js中加value，template中不需要加value

```xml
<template>
  <div>
    <p>{{age}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {
    let age = ref(18)

    function myFn() {
      age.value = 666
    }

    return {
      age,
      myFn,
    }
  },
}
</script>
```

### 14-Vue3.0-ref和reactive区别-理解

#### 一、Vue在处理的时候会先判断数据是什么类型的

- 如果在template里面使用的是ref类型的数据，那么Vue会自动帮我们添加.value
- 如果template里使用的是reactive类型的数据，那么Vue不会自动帮我们添加.value

#### 二、Vue是如何判断数据类型的呢

##### 1. 打印ref数据的结果

```csharp
RefImpl {_rawValue: 18, _shallow: false, __v_isRef: true, _value: 18}
__v_isRef: true
_rawValue: 18
_shallow: false
_value: 18
value: 18
```

##### 2. 解释

- Vue在解析数据之前，会自动判断这个数据是否是 ref 类型的，如果是就自动添加 .value ，如果不是就不自动添加 .value
- 通过当前数据的 __v_isRef 来判断，如果有这个私有属性，并且取值为true，那么就代表是一个ref类型的数据

#### 三、isRef和isReactive

通过 isRef 和 isReactive 可以判断数据是 ref 还是 reactive

```xml
<template>
  <div>
    <p>{{age}}</p>
    <p>{{state}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { ref, isRef, isReactive, reactive } from 'vue'

export default {
  name: 'App',
  setup() {
    let age = ref(18)
    let state = reactive({ age: 18 })

    function myFn() {
      console.log(isRef(age))
      console.log(isRef(state))
      console.log(isReactive(age))
      console.log(isReactive(state))
    }

    return {
      age,
      state,
      myFn,
    }
  },
}
</script>
```

### 15-Vue3.0-递归监听理解

#### 一、递归监听

默认情况下，无论是通过ref还是通过reactive都是递归监听

##### 1. reactive递归监听

```xml
<template>
  <div>
    <p>{{state.a}}</p>
    <p>{{state.gf.b}}</p>
    <p>{{state.gf.f.c}}</p>
    <p>{{state.gf.f.s.d}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = reactive({
      a: 'a',
      gf: {
        b: 'b',
        f: {
          c: 'c',
          s: {
            d: 'd',
          },
        },
      },
    })

    function myFn() {
      state.a = '1'
      state.gf.b = '2'
      state.gf.f.c = '3'
      state.gf.f.s.d = '4'
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

##### 2. ref递归监听

```xml
<template>
  <div>
    <p>{{state.a}}</p>
    <p>{{state.gf.b}}</p>
    <p>{{state.gf.f.c}}</p>
    <p>{{state.gf.f.s.d}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = ref({
      a: 'a',
      gf: {
        b: 'b',
        f: {
          c: 'c',
          s: {
            d: 'd',
          },
        },
      },
    })

    function myFn() {
      state.value.a = '1'
      state.value.gf.b = '2'
      state.value.gf.f.c = '3'
      state.value.gf.f.s.d = '4'
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

#### 二、递归监听存在的问题

如果数据量比较大，非常消耗性能
 因为递归监听将使每一层都被包装成一个Proxy

##### 1. 递归监听验证

```xml
<template>
  <div>
    <p>{{state.a}}</p>
    <p>{{state.gf.b}}</p>
    <p>{{state.gf.f.c}}</p>
    <p>{{state.gf.f.s.d}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = reactive({
      a: 'a',
      gf: {
        b: 'b',
        f: {
          c: 'c',
          s: {
            d: 'd',
          },
        },
      },
    })

    function myFn() {
      console.log(state)
      console.log(state.gf)
      console.log(state.gf.f)
      console.log(state.gf.f.s)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

点击按钮看到控制台的输出



![img](https:////upload-images.jianshu.io/upload_images/1907212-11a2115947c5003f.png?imageMogr2/auto-orient/strip|imageView2/2/w/282/format/webp)

image.png

### 16-Vue3.0-非递归监听-掌握

#### 一、非递归监听

##### 1. shallowReactive

```xml
<template>
  <div>
    <p>{{state.a}}</p>
    <p>{{state.gf.b}}</p>
    <p>{{state.gf.f.c}}</p>
    <p>{{state.gf.f.s.d}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { shallowReactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = shallowReactive({
      a: 'a',
      gf: {
        b: 'b',
        f: {
          c: 'c',
          s: {
            d: 'd',
          },
        },
      },
    })

    function myFn() {
      // state.a = '1'
      state.gf.b = '2'
      state.gf.f.c = '3'
      state.gf.f.s.d = '4'

      console.log(state)
      console.log(state.gf)
      console.log(state.gf.f)
      console.log(state.gf.f.s)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

点击按钮页面将不会发生变化，查看控制台将看到以下打印结果



![img](https:////upload-images.jianshu.io/upload_images/1907212-c4b69db8d51a9467.png?imageMogr2/auto-orient/strip|imageView2/2/w/262/format/webp)

image.png

发现除了第一层之外其它层没有被包装成Proxy

##### 2. shallowRef

```xml
<template>
  <div>
    <p>{{state.a}}</p>
    <p>{{state.gf.b}}</p>
    <p>{{state.gf.f.c}}</p>
    <p>{{state.gf.f.s.d}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = shallowRef({
      a: 'a',
      gf: {
        b: 'b',
        f: {
          c: 'c',
          s: {
            d: 'd',
          },
        },
      },
    })

    function myFn() {
      state.value.a = '1'
      state.value.gf.b = '2'
      state.value.gf.f.c = '3'
      state.value.gf.f.s.d = '4'

      console.log(state)
      console.log(state.value)
      console.log(state.value.gf)
      console.log(state.value.gf.f)
      console.log(state.value.gf.f.s)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

点击按钮页面将不会发生变化，查看控制台将看到以下打印结果
 



![img](https:////upload-images.jianshu.io/upload_images/1907212-edef292c0e152c7d.png?imageMogr2/auto-orient/strip|imageView2/2/w/508/format/webp)

image.png

 发现除了第一层之外所有层均没有被包装

注意：

  如果是通过shallowRef创建数据，nameVue监听的是.value的变化，并不是第一层的变化



```xml
<template>
  <div>
    <p>{{state.a}}</p>
    <p>{{state.gf.b}}</p>
    <p>{{state.gf.f.c}}</p>
    <p>{{state.gf.f.s.d}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = shallowRef({
      a: 'a',
      gf: {
        b: 'b',
        f: {
          c: 'c',
          s: {
            d: 'd',
          },
        },
      },
    })

    function myFn() {
      state.value = {
        a: '1',
        gf: {
          b: '2',
          f: {
            c: '3',
            s: {
              d: '4',
            },
          },
        },
      }
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

点击按钮发现页面发生变化了

##### 3. triggerRef

采用非递归监听如果想监听第四层的数据，可以使用triggerRef根据传入的数据主动更新界面

```xml
<template>
  <div>
    <p>{{state.a}}</p>
    <p>{{state.gf.b}}</p>
    <p>{{state.gf.f.c}}</p>
    <p>{{state.gf.f.s.d}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { shallowRef, triggerRef } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = shallowRef({
      a: 'a',
      gf: {
        b: 'b',
        f: {
          c: 'c',
          s: {
            d: 'd',
          },
        },
      },
    })

    function myFn() {
      state.value.gf.f.s.d = '4'
      triggerRef(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

点击按钮发现第四层的数据发生了变化
 **注意：** Vue3只提供了triggerRef方法，没有提供triggerReactive方法，所以如果是reactive类型的数据，那么是无法主动触发界面更新的

### 17-Vue3.0-shallowRef本质

`ref->reactive`
 `ref(10)->reactive({value: 10})`
 `shallowRef->shallowReactive`
 `shallowRef(10)->shallowReactive({value: 10})`
 所以如果是通过shallowRef创建的数据，它监听的是.value的变化，因为底层本质上value才是第一层

### 18-Vue3.0-toRaw && 19-Vue3.0-toRaw

```xml
<template>
  <div>
    <p>{{state}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'lnj',
      age: 18,
    }
    let state = reactive(obj)

    console.log(obj === state) // false

    // state和obj的关系
    // 引用关系，state的本质是一个Proxy对象，在这个Proxy对象引用了obj

    function myFn() {
      // 如果直接修改obj，那么是无法触发界面更新的，只有通过包装之后的对象来修改，才会触发界面的更新
      obj.name = 'zs'
      console.log(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

#### 一、toRaw

从reactive或ref中得到原始数据

```xml
<template>
  <div>
    <p>{{state}}</p>
  </div>
</template>

<script>
import { reactive, toRaw } from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'lnj',
      age: 18,
    }
    let state = reactive(obj)
    let obj2 = toRaw(state)

    console.log(obj === obj2)

    return {
      state,
    }
  },
}
</script>
```

控制台打印true

#### 二、toRaw作用

做一些不想被监听的事情（提升性能）

ref/reactive数据类型的特点：每次修改都会被追踪，都会更新UI界面，但是这样其实是非常消耗性能的，所以如果我们有一些操作不需要追踪，不需要更新UI界面，那么这个时候，我们就可以通过toRaw方法拿到它的原始数据，对原始数据进行修改，这样就不会被追踪，这样就不会更新UI界面，这样性能就好了

```xml
<template>
  <div>
    <p>{{state}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { reactive, toRaw } from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'lnj',
      age: 18,
    }
    let state = reactive(obj)
    let obj2 = toRaw(state)

    console.log(obj === obj2)

    function myFn() {
      obj2.name = 'zs'
      console.log(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

点击按钮发现数据发生了改变，但界面没有发生改变

#### 三、ref的toRaw

如果想通过toRaw拿到ref类型的原始数据（创建时传入的那个数据），那么就必须明确告诉toRaw方法，要获取的是.value的值，因为经过Vue处理之后.value中保存的才是当初创建时传入的那个原始数据

```xml
<template>
  <div>
    <p>{{state}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { ref, toRaw } from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'lnj',
      age: 18,
    }
    // ref本质：reactive
    // ref(obj) -> reactive({value: obj})
    
    let state = ref(obj)
    let obj2 = toRaw(state.value)

    console.log(obj === obj2)

    function myFn() {
      obj2.name = 'zs'
      console.log(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

### 20-Vue3.0-markRaw

markRaw标记某个数据永远不会被追踪

```xml
<template>
  <div>
    <p>{{state}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { markRaw, reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'lnj',
      age: 18,
    }

    obj = markRaw(obj)

    let state = reactive(obj)

    function myFn() {
      state.name = 'zs'
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

点击按钮数据不会发生变化

### 21-Vue3.0-toRef-理解

#### 一、toRef的理解

- 如果利用ref将某一个对象中的属性变成响应式的数据， 我们修改响应式数据是不会影响到原始数据的。
- 如果利用toRef将某一个对象中的属性变成响应式的数据，我们修改响应式数据是会影响到原始数据的
- 但是如果响应式数据是通过toRef创建的，那么修改了数据并不会触发UI界面的更新

```xml
<template>
  <div>
    <p>{{state}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { toRef } from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'lnj',
    }

    let state = toRef(obj, 'name')

    function myFn() {
      state.value = 'zs'

      console.log(state)
      console.log(obj)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

点击按钮发现数据与原始数据都发生了变化

#### 二、ref和toRef区别

- ref->复制，修改响应式数据不会影响以前的数据
- toRef->引用，修改响应式数据会影响以前的数据
- ref->数据发生改变，界面就会自动更新
- toRef->数据发生改变，界面也不会自动更新

#### 三、toRef引用场景

如果想让响应式数据和以前的数据关联起来，并且更新响应式数据之后还不想更新UI，name就可以使用toRef。

### 22-Vue3.0-toRefs-理解

将对象中所有的属性全部追踪

```xml
<template>
  <div>
    <p>{{state}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'lnj',
      age:18
    }

    let state = toRefs(obj)

    function myFn() {
      state.name.value = 'zs'
      state.age.value = 666

      console.log(state)
      console.log(obj)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

点击按钮发现数据和原始数据都发生了变化

### 23-Vue3.0-customRef 上-理解 && 24-Vue3.0-customRef 下-理解

#### 一、customRef

返回一个ref对象，可以显式地控制依赖追踪和触发响应

```xml
<template>
  <div>
    <p>{{age}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { customRef } from 'vue'

function myRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track() // 告诉Vue这个数据需要追踪变化
        console.log('get', value)
        return value
      },
      set(newValue) {
        console.log('set', newValue)
        value = newValue
        trigger() // 告诉Vue触发界面更新
      },
    }
  })
}

export default {
  name: 'App',
  setup() {
    let age = myRef(18)

    function myFn() {
      age.value += 1
    }

    return {
      age,
      myFn,
    }
  },
}
</script>
```

#### 二、为什么要使用customRef

一个使用customRef的场景，根据数据的请求路径进行追踪

```xml
<template>
  <ul>
    <li
      v-for="item in state"
      :key="item.id"
    >
      {{item.name}}
    </li>
  </ul>
</template>

<script>
import { customRef } from 'vue'

function myRef(path, initValue) {
  let value = initValue
  return customRef((track, trigger) => {
    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        value = data
        trigger()
      })
      .catch((err) => {
        console.log(err)
      })
    return {
      get() {
        // 这个数据是需要追中变化的
        track()
        console.log('get', value)
        return value
      },
      set(newValue) {
        console.log('set', newValue)
        value = newValue
        // 告诉Vue触发界面更新
        trigger()
      },
    }
  })
}

export default {
  name: 'App',
  setup() {
    let state = myRef('/data.json', [])

    return {
      state,
    }
  },
}
</script>
```

### 25-Vue3.0-ref-获取元素-理解

在vue3.x中我们也可以通过ref来获取元素

```xml
<template>
  <div ref="box">
    我是div
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  name: 'App',
  setup() {
    let box = ref(null) // reactive({value: null})

    onMounted(() => {
      console.log('onMounted', box.value)
    })

    return {
      box,
    }
  },
}
</script>
```

### 26-Vue3.0-readonly家族-理解

用于创建一个只读的数据，并且是递归只读

#### 一、readonly

```xml
<template>
  <div>
    <p>{{state.name}}</p>
    <p>{{state.attr.age}}</p>
    <p>{{state.attr.height}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { readonly, isReadonly, shallowReadonly } from 'vue'
export default {
  name: 'App',
  setup() {
    // 用于创建一个只读的数据，并且是递归只读
    let state = readonly({
      name: 'lnj',
      attr: {
        age: 18,
        height: 1.88,
      },
    })

    function myFn() {
      state.name = '知播渔'
      state.attr.age = 666
      state.attr.height = 1.66
      console.log(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

#### 二、shallowReadonly

用于创建一个只读的数据，但不是递归只读的

```xml
<template>
  <div>
    <p>{{state.name}}</p>
    <p>{{state.attr.age}}</p>
    <p>{{state.attr.height}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { readonly, isReadonly, shallowReadonly } from 'vue'
export default {
  name: 'App',
  setup() {
    // 用于创建一个只读的数据，并且是递归只读
    let state = shallowReadonly({
      name: 'lnj',
      attr: {
        age: 18,
        height: 1.88,
      },
    })

    function myFn() {
      state.name = '知播渔'
      state.attr.age = 666
      state.attr.height = 1.66
      console.log(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

#### 三、isReadonly

判断一个数据是否是只读的

```xml
<template>
  <div>
    <p>{{state.name}}</p>
    <p>{{state.attr.age}}</p>
    <p>{{state.attr.height}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { readonly, isReadonly, shallowReadonly } from 'vue'
export default {
  name: 'App',
  setup() {
    // 用于创建一个只读的数据，并且是递归只读
    let state = shallowReadonly({
      name: 'lnj',
      attr: {
        age: 18,
        height: 1.88,
      },
    })

    function myFn() {
      state.name = '知播渔'
      state.attr.age = 666
      state.attr.height = 1.66
      console.log(state)
      console.log(isReadonly(state))
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
```

#### 四、readonly 和 const 的区别

const：赋值保护，不能给变量重新赋值
 readonly：属性保护，不能给属性重新赋值

### 27-Vue3.0-V3响应式数据本质上-理解 && 28-Vue3.0-V3响应式数据本质下-理解

#### 一、Vue3.0响应式数据本质

- 在Vue2.x中是通过defineProperty来实现响应式数据的
   详见：手写Vue全家桶
- 在Vue3.x中是通过Proxy来实现响应式数据的

```jsx
let obj = { name: 'lng', age: 18 }

let state = new Proxy(obj, {
  get (obj, key) {
    console.log(obj, key)
    return obj[key]
  },
  set (obj, key, value) {
    obj[key] = value
    console.log('更新界面', obj, key, value)
  }
})

console.log(state.name) // lng
state.name = '直播'
console.log(state.name)
```

#### 二、 Proxy注意点

- set方法必须通过返回值告诉Proxy此次操作是否成功

```jsx
let arr = [1, 3, 5]

let state = new Proxy(arr, {
  get (obj, key) {
    console.log(obj, key)
    return obj[key]
  },
  set (obj, key, value) {
    obj[key] = value
    console.log('更新界面', obj, key, value)
    // 没有会报错
    return true
  }
})

console.log(state[1])
state.push(7)
```

### 29-Vue3.0-手写 shallowReactive-shallowRef-理解

```jsx
function shallowReactive (obj) {
  return new Proxy(obj, {
    get (obj, key) {
      return obj[key]
    },
    set (obj, key, value) {
      obj[key] = value
      console.log('更新界面', obj, key, value)
      return true
    }
  })
}

function shallowRef (val) {
  return shallowReactive({
    value: val
  })
}
```

### 30-Vue3.0-手写reactive-ref-理解

```jsx
function reactive (obj) {
  if (typeof obj === 'object') {
    if (obj instanceof Array) {
      // 如果是一个数组，那么取出数组中的某一个元素
      // 判断每一个元素是否又是一个对象，如果又是一个对象，如果又是一个对象，那么也需要包装成一个Proxy
      obj.forEach((item, index) => {
        if (typeof item === 'object') {
          obj[index] = reactive(item)
        }
      })
    } else {
      // 如果是一个对象，那么取出对象属性的取值
      // 判断每一个元素是否又是一个对象，如果又是一个对象，如果又是一个对象，那么也需要包装成一个Proxy
      for (let key in obj) {
        let item = obj[key]
        if (typeof item === 'object') {
          obj[key] = reactive(item)
        }
      }
    }
    return new Proxy(obj, {
      get (obj, key) {
        return obj[key]
      },
      set (obj, key, value) {
        obj[key] = value
        console.log('更新界面', JSON.stringify(obj), key, value)
        return true
      }
    })
  } else {
    console.warn('不是一个对象')
  }
}

function ref (val) {
  return reactive({
    value: val
  })
}
```

### 31-Vue3.0-手写readonly-shallowReadonly-理解

```jsx
function shallowReadonly (obj) {
  return new Proxy(obj, {
    get (obj, key) {
      return obj[key]
    },
    set (obj, key, value) {
      console.log('只读')
    }
  })
}

function readonly (obj) {
  if (typeof obj === 'object') {
    if (obj instanceof Array) {
      // 如果是一个数组，那么取出数组中的某一个元素
      // 判断每一个元素是否又是一个对象，如果又是一个对象，如果又是一个对象，那么也需要包装成一个Proxy
      obj.forEach((item, index) => {
        if (typeof item === 'object') {
          obj[index] = readonly(item)
        }
      })
    } else {
      // 如果是一个对象，那么取出对象属性的取值
      // 判断每一个元素是否又是一个对象，如果又是一个对象，如果又是一个对象，那么也需要包装成一个Proxy
      for (let key in obj) {
        let item = obj[key]
        if (typeof item === 'object') {
          obj[key] = readonly(item)
        }
      }
    }
    return new Proxy(obj, {
      get (obj, key) {
        return obj[key]
      },
      set (obj, key, value) {
        console.log('只读')
      }
    })
  } else {
    console.warn('不是一个对象')
  }
}
```





10人点赞



Vue学习笔记





"小礼物走一走，来简书关注我"

还没有人赞赏，支持一下

作者：六寸光阴丶

链接：https://www.jianshu.com/p/4725441aff5f

来源：简书

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。