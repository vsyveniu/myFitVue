<template>
  <header class="header">
    <nav class="navbar is-light">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/"
          ><img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"
        /></router-link>

        <a role="button" class="navbar-burger" v-bind:class="{ 'is-active': isBurgerActive }" @click="toggleBurger">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" v-bind:class="{ 'is-active': isBurgerActive }">
        <div class="navbar-start" v-show="isLoggedIn">
          <router-link class="navbar-item" to="/myday">My day</router-link>
          <router-link class="navbar-item" to="/chain">Full chain</router-link>

          <a class="navbar-item">
            Profile
          </a>
        </div>

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
          <div class="navbar-item" v-show="isLoggedIn">
            <p class="user__name">
              {{ this.user.name }}
            </p>
            <div class="buttons">
              <button class="button is-warning" @click="logout">logout</button>
            </div>
          </div>
        </div>
      </div>
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
