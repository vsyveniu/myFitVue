<template>
  <div>
    <Day :day="this.day" :exercises="this.exercises" />
  </div>
</template>
<script>

import axios from 'axios';

export default {
  name: 'UpdateDay',
  components: {
    Day: () => import('@/components/Day'),
  },
  data: function() {
    return {
      day: {},
      exercises: ['bitch', 'dick'],
      dayId: this.$route.params.id,
    };
  },
  mounted (){
    console.log(this.dayId);
    this.fetchDay();
  },
  methods: {
    fetchDay() {
      axios.get(`${process.env.VUE_APP_API_HOST}/day/${this.dayId}`).then(res => {
        console.log('fuck');
        console.log(res);
        this.day = res.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
