<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-20 14:52:55
 * @LastEditTime: 2020-11-20 15:43:16
-->
<template>
  <div>
    <h2>reactive, toRefs</h2>
    <div>
      <h2>toRefs</h2>
      <button
        v-for="(item, index) in girls"
        :key="index"
        @click="selectGirlFun(index)"
      >
        {{ index }} : {{ item }}
      </button>
      <div>你选择了【{{ selectGirl }}】</div>
      <p>{{ readersNumber }}</p>

      <p>{{ data }}</p>
    </div>

    <hr />

    <div>
      <h2>reactive</h2>
      <button
        v-for="(item, index) in data.girls"
        :key="index"
        @click="data.selectGirlFun(index)"
      >
        {{ index }} : {{ item }}
      </button>
      <div>你选择了【{{ data.selectGirl }}】</div>
      <p>{{ readersNumber }}</p>
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref } from "vue";
export default {
  name: "Home",
  setup() {
    const readersNumber = ref(0);

    const data = reactive({
      girls: ["大脚", "刘英", "晓红"],
      selectGirl: "",
      selectGirlFun: (index: number) => {
        data.selectGirl = data.girls[index];
        readersNumber.value = index;
      }
    });

    return {
      ...toRefs(data), // toRefs: 可以直接使用各个属性
      data, // reactive // 相当于把各个属性包装成一个对象
      readersNumber
    };
  }
};
</script>

<style></style>
