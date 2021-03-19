<template>
  <div>
    <form class="login box" @submit.prevent="login" v-bind:class="{ 'is-danger': this.authErr.password }">
      <div class="field login__title">
        <p class="title is-4">Sign in</p>
        <button role="button" type="button" class="delete" @click="$emit('hide', $event)"></button>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            required
            v-model="email"
            type="email"
            placeholder="Email"
            class="input"
            @input="checkFill"
            v-bind:class="{ 'is-danger': this.authErr.mail }"
          />
          <span class="icon is-left">
            <font-awesome-icon icon="envelope" />
          </span>
          <span v-show="this.authErr.mail" class="icon is-right">
            <font-awesome-icon icon="skull-crossbones" :style="{ color: 'red', opacity: 0.6 }" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            required
            v-model="password"
            type="password"
            placeholder="Password"
            class="input"
            @input="checkFill"
            v-bind:class="{ 'is-danger': this.authErr.password }"
          />
          <span class="icon is-left">
            <font-awesome-icon icon="fingerprint" />
          </span>
          <span v-show="this.authErr.password" class="icon is-right">
            <font-awesome-icon icon="skull-crossbones" :style="{ color: 'red', opacity: 0.5 }" />
          </span>
        </p>
      </div>
      <button class="button is-primary" type="submit" v-bind:disabled="this.isSubmitDisabled">submit</button>
      <div class="notification is-danger is-light" v-show="this.authMessage">
        <button
          role="button"
          type="button"
          class="delete"
          @click="hideMessage"
          v-bind:class="{ 'is-loading': this.loginIsLoading }"
        ></button
        >{{ this.authMessage }}
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faFingerprint, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

//import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
//import { faFingerprint } from '@fortawesome/free-solid-svg-icons/faFingerprint';
//import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons/faSkullCrossbones';

library.add([faEnvelope, faFingerprint, faSkullCrossbones]);

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isSubmitDisabled: true,
    };
  },
  computed: {
    ...mapGetters({
      authErr: 'authErr',
      authMessage: 'authMessage',
      loginIsLoading: 'loginIsLoading',
    }),
  },
  mounted() {
    console.log(localStorage.getItem('authorization'));
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch('login', { email, password })
        .then(() => {
          setTimeout(() => this.hideMessage(), 3000);
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => this.hideMessage(), 3000);
        });
    },
    hideMessage: function() {
      this.$store.dispatch('hideAuthMessage');
    },
    checkFill: function() {
      if (this.email != '' && this.password != '') {
        this.isSubmitDisabled = false;
      } else {
        this.isSubmitDisabled = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/styles/components/auth/login.scss';
</style>
