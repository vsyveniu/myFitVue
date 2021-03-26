<template>
  <div class="hello">
    <draggable v-model="chain" group="fullchain" @start="drag = true" @end="drag = false">
      <div v-for="(value, key) in chain" :key="key">{{ value.id }}</div>
    </draggable>

    this is full chain boy
  </div>
</template>

<script>
//import Day from './Day.vue';
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex';
export default {
  name: 'Chain',
  components: {
    draggable,
  },
  computed: {
    ...mapGetters({
      chain: 'chain',
    }),
  },
  data: function() {
    return {
      chain: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    };
  },
  methods: {
    fetchChain() {
      this.$store
        .dispatch('fetch', 1)
        .then(() => {
          setTimeout(() => this.hideMessage(), 3000);
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => this.hideMessage(), 3000);
        });
    },
    hideMessage(){
      this.$store.data('hideChainMessage');
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
