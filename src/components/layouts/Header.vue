<template>
  <header class="header">
    <nav class="navbar is-light">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>
        <a role="button" class="navbar-burger" v-bind:class="{ 'is-active': isBurgerActive }" @click="toggleBurger">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" v-bind:class="{ 'is-active': isBurgerActive }">
        <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>

          <a class="navbar-item">
            Documentation
          </a>
        </div>
        {{ this.user.name }}
        <div class="navbar-end header_auth">
          <div v-show="!isLoggedIn" class="navbar-item">
            <div class="buttons">
              <button @click="showLoginForm" class="login__button button is-info">login</button>
              <div class="login__container" v-show="isLoginVisible" v-click-outside="hideLoginForm">
                <Login @hide="hideLoginForm" />
              </div>
              <div>
                <button @click="showRegisterForm" class="register__button button is-primary">register</button>
                <div class="login__container" v-show="isRegisterVisible" v-click-outside="hideRegisterForm">
                  <Register @hide="hideRegisterForm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="button is-warning" v-show="isLoggedIn" @click="logout">logout</button>
    </nav>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';
import ClickOutside from 'vue-click-outside';

export default {
  name: 'Header',
  components: {
    Login: () => import('@/components/auth/Login'),
    Register: () => import('@/components/auth/Register'),
  },
  data: function() {
    return {
      isLoginVisible: false,
      isRegisterVisible: false,
      isClickedOutside: true,
      isBurgerActive: false,
    };
  },
  directives: {
    ClickOutside,
  },
  computed: {
    ...mapGetters({
      user: 'user',
      isLoggedIn: 'isLoggedIn',
    }),
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch('logout')
        .then(() => {
          console.log('logged out');
        })
        .catch(err => console.log(err));
    },
    showLoginForm: function() {
      this.isLoginVisible = !this.isLoginVisible;
    },
    showRegisterForm: function() {
      this.isRegisterVisible = !this.isRegisterVisible;
    },
    hideLoginForm(e) {
      if (!e.target.classList.contains('login__button')) {
        this.isLoginVisible = false;
      }
    },
    hideRegisterForm(e) {
      if (!e.target.classList.contains('register__button')) {
        this.isRegisterVisible = false;
      }
    },
    toggleBurger() {
      this.isBurgerActive = !this.isBurgerActive;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/styles/components/layouts/header.scss';
</style>
