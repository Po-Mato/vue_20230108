<style module>
.hand {
  cursor: pointer;
  background-color: purple;
  color: yellow;
}
.box {
  width: 100px;
  height: 100px;
  background-color: aqua;
}
.border {
  border: solid 1px orange;
}
</style>

<template>
  <div>
    <button v-bind:class="$style.hand">CSS Module을 적용한 버튼</button>
    <div :class="[$style.box, $style.border]">Hello World</div>
  </div>
</template>

<script>
// vuex 라이브러리에서 mapActions, mapMutations, mapState, mapGetters 함를 가져옵니다.
// import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';

export default {
  /* pdtmc^2w */
  props: [],
  data() {
    /* 컴포넌트 안에서 사용되는 변수 등록. 개별 변수 */
    return {};
  },
};
</script>
