<template>
  <div>
    <Day :day="this.day" :exercises="this.exercises" />
  </div>
</template>
<script>

export default {
  name: 'UpdateDay',
  components: {
    Day: () => import('@/components/Day'),
  },
  data: function() {
    return {
      day: [],
      exercises: ['bitch', 'dick'],
    };
  },
/*   methods: {
    fetchDay() {
      axios.get(process.env.VUE_APP_API_HOST + '/day').then(res => {
        console.log('fuck');
        console.log(res);
      });
    },
  }, */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
