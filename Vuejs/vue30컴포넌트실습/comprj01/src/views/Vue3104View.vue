<style scoped></style>

<template>
  <div id="app">
    <p>
      <button v-on:click="clickAddBox">박스 추가</button>
    </p>
    <p>
      <b v-for="(val, i) in arr" v-bind:key="i">
        {{ val }}
        <component-box v-bind:num="val"></component-box>
      </b>
    </p>
  </div>
</template>

<script>
// vuex 라이브러리에서 mapActions, mapMutations, mapState, mapGetters 함를 가져옵니다.
// import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import Vue3104Counter from '../components/vue3104/Vue3104Counter.vue';

export default {
  /* pdtmc^2w */
  props: [],
  data() {
    /* 컴포넌트 안에서 사용되는 변수 등록. 개별 변수 */
    return {
      arr: [1, 2, 3, 4, 5],
    };
  },
  components: {
    componentBox: Vue3104Counter,
  },
  methods: {
    clickAddBox() {
      this.arr = [...this.arr, this.arr.length + 1];
    },
  },
};
</script>
