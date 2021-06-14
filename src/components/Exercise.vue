<template>
  <div class="day_container">
    this is exercise
  </div>
</template>

<script>
export default {
  name: 'Exercise',
  props: {
    day: Object,
    exercises: Array,
  },
  components: {},
  data: function() {
    return {};
  },
  mounted: function() {
    //console.log(this.day);
    //console.log(this.exercises);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import 'src/styles/components/exercise.scss';
</style>
