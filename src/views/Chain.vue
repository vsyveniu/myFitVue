<template>
  <div>
    <draggable
      v-model="chain"
      group="fullchain"
      @start="drag = true"
      @end="drag = false"
      class="chain__container container"
    >
      <div v-for="(value, key) in chain" :key="key" class="box chain__item">
        <div>{{ value.daily_id }}</div>
        <div>{{ value.meta.type }}</div>
      </div>
    </draggable>
    <div
      class="notification is-light"
      v-bind:class="[!chainErr.serverFucked && !chainErr.badOrder ? 'is-success' : 'is-danger']"
      v-show="chainMessage"
    >
      <button role="button" type="button" class="delete" @click="hideMessage"></button>{{ chainMessage }}
    </div>
    <div v-show="chainIsLoading">fuck</div>
    <div class="buttons">
      <button class="navbar-item" @click="createDay">create new day</button>
      <button class="add_daily button" @click="showExList">
        <font-awesome-icon icon="plus" :style="{ color: 'coral', opacity: 0.5 }" />
      </button>
      <div v-click-outside="hideHelp">
        <button class="button help_button" @click="toggleHelp" v-bind:class="{ 'is-active': this.help }">
          help me...
        </button>
        <div class="help box" v-show="this.help">
          <div class="content block">
            <p>I'm consider myself as Negro and will stick with King's chain</p>
            <button role="button" type="button" class="delete" @click="hideHelp"></button>
          </div>
          <button class="button wisdom_button">get wisdom</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import ClickOutside from 'vue-click-outside';
import axios from 'axios';
import { mapGetters } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add([faPlus]);

export default {
  name: 'Chain',
  components: {
    draggable,
  },
  computed: {
    ...mapGetters({
      chainStore: 'chain',
      chainMessage: 'chainMessage',
      chainIsLoading: 'chainIsLoading',
      chainErr: 'chainErr',
    }),
    chain: {
      get() {
        return this.chainStore;
      },
      set(val) {
        console.log(val);
        console.log('in set');
        this.$store.dispatch('update', val);
      },
    },
  },
  directives: {
    ClickOutside,
  },
  data: function() {
    return {
      //chain: [],
      help: false,
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
          // setTimeout(() => this.hideMessage(), 3000);
        })
        .catch(() => {
          //setTimeout(() => this.hideMessage(), 3000);
        });
    },
    hideMessage() {
      this.$store.dispatch('hideChainMessage');
    },
    showExList() {
      console.log('daymn show exlist unfinished metdod');
    },
    toggleHelp() {
      this.help = !this.help;
    },
    hideHelp() {
      this.help = false;
    },
    createDay(){
      axios.post(process.env.VUE_APP_API_HOST + '/day').then(res => {
        console.log('fuck');
        console.log(res);
        this.$router.go(`/day/${res.id}`);
      }).catch(err => { console.log(err)});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/styles/components/chain.scss';
</style>
