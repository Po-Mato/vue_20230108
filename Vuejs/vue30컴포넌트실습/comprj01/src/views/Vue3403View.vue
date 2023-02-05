<style scoped></style>

<template>
  <div id="app">
    자식 컴포넌트에서 받은 값: {{ mesg }}
    <child-component v-on:show-log="printText"></child-component>
  </div>
</template>

<script>
// vuex 라이브러리에서 mapActions, mapMutations, mapState, mapGetters 함를 가져옵니다.
// import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import Vue3403Comp from '../components/vue3403/Vue3403Comp.vue';

export default {
  /* pdtmc^2w */
  props: [],
  data() {
    /* 컴포넌트 안에서 사용되는 변수 등록. 개별 변수 */
    return {
      mesg: null,
    };
  },
  //template: ``,
  methods: {
    printText(a, b) {
      // 매개변수를 넘길 수 있는 방법: 매개변수 지정, arguments, rest 연산자, 분해할당 사용
      console.log(a, b);
      this.mesg = `param1 = ${a}, param2 = ${b}`;
    },
  },
  components: {
    childComponent: Vue3403Comp,
  },
};
</script>
