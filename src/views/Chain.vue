<template>
  <div class="hello">
    <draggable v-model="chain" group="fullchain" @start="drag = true" @end="drag = false" @change="updateChain" class="chain__container">
      <div v-for="(value, key) in chain" :key="key" class="box chain__item">
        <div>{{ value.daily_id }}</div>
        <div>{{ value.meta.type }}</div>
      </div>
    </draggable>

    this is full chain boy
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex';
export default {
  name: 'Chain',
  components: {
    draggable,
  },
  computed: {
    ...mapGetters({
      chainStore: 'chain',
    }), 
    chain: {
        get() {
          console.log('feck chain get');
          console.log(this.chainStore);
            return this.chainStore;
        },
        set(val) {
          console.log(val);
          console.log('in set');
            this.$store.dispatch('update', val);
        }
    } 
  },
  data: function() {
    return {
      //chain: [],
    };
  },
  created() {
    this.fetchChain();
  },
  methods: {
    fetchChain() {
      this.$store
        .dispatch('fetch')
        .then(() => {
          console.log('called inside created');
          setTimeout(() => this.hideMessage(), 3000);
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => this.hideMessage(), 3000);
        });
    },
    updateChain() {
     
      //this.$store.dispatch('update', this.chain).then(() => console.log('updated'));
    },
    hideMessage() {
      this.$store.dispatch('hideChainMessage');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/styles/components/chain.scss';
</style>

