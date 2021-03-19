<template>
  <div>
    <form
      class="register box"
      @submit.prevent="register"
      v-bind:class="{ 'is-danger': this.regErr.password }"
    >
      <div class="field register__title">
        <p class="title is-4">Register</p>
        <button role="button" type="button" class="delete" @click="$emit('hide', $event)"></button>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            required
            v-model="name"
            type="text"
            placeholder="Name"
            class="input"
            @input="checkFill"
            v-bind:class="{ 'is-danger': this.regErr.name }"
          />
          <span class="icon is-left">
            <font-awesome-icon icon="id-card" />
          </span>
          <span v-show="this.regErr.mail" class="icon is-right">
            <font-awesome-icon icon="skull-crossbones" :style="{ color: 'red', opacity: 0.6 }" />
          </span>
        </p>
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
            v-bind:class="{ 'is-danger': this.regErr.mail }"
          />
          <span class="icon is-left">
            <font-awesome-icon icon="envelope" />
          </span>
          <span v-show="this.regErr.mail" class="icon is-right">
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
            v-bind:class="{ 'is-danger': this.regErr.password }"
          />
          <span class="icon is-left">
            <font-awesome-icon icon="fingerprint" />
          </span>
          <span v-show="this.regErr.password" class="icon is-right">
            <font-awesome-icon icon="skull-crossbones" :style="{ color: 'red', opacity: 0.5 }" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            required
            v-model="passwordConfirm"
            type="password"
            placeholder="Confirm password"
            class="input"
            @input="checkFill"
            v-bind:class="{ 'is-danger': this.regErr.password }"
          />
          <span class="icon is-left">
            <font-awesome-icon icon="fingerprint" />
          </span>
          <span v-show="this.regErr.password" class="icon is-right">
            <font-awesome-icon icon="skull-crossbones" :style="{ color: 'red', opacity: 0.5 }" />
          </span>
        </p>
      </div>
      <button class="button is-primary" type="submit" v-bind:disabled="this.isSubmitDisabled">submit</button>
      <div class="notification is-danger is-light" v-show="this.regMessage">
        <button
          role="button"
          type="button"
          class="delete"
          @click="hideMessage"
          v-bind:class="{ 'is-loading': this.regIsLoading }"
        ></button
        >{{ this.regMessage }}
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faFingerprint, faSkullCrossbones, faIdCard } from '@fortawesome/free-solid-svg-icons';

library.add([faEnvelope, faFingerprint, faSkullCrossbones, faIdCard]);

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      isSubmitDisabled: true,
    };
  },
  computed: {
    ...mapGetters({
      regMessage: 'regMessage',
      regErr: 'regErr',
      regIsLoading: 'regIsLoading',
    }),
  },
  mounted() {
    console.log(localStorage.getItem('authorization'));
  },
  methods: {
    register: function() {
      let name = this.name;
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch('register', { name, email, password })
        .then(() => {
          setTimeout(() => this.hideMessage(), 3000);
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => this.hideMessage(), 3000);
        });
    },
    hideMessage: function() {
      this.$store.dispatch('hideRegMessage', false);
    },
    checkFill: function() {
      if (this.name != '' && this.email != '' && this.password != '' && this.passwordConfirm != '') {
        this.isSubmitDisabled = false;
      } else {
        this.isSubmitDisabled = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/styles/components/auth/register.scss';
</style>
