<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>Email</label>
      <input required v-model="email" type="email" placeholder="Name" />
      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <hr />
      <button type="submit">submit</button>
    </form>
    <div v-show="this.authStatus.isLoading">Loading...</div>
    <div v-show="this.authStatus.status">{{ this.authStatus.status }}</div>
    username {{ user.name }}
    is loggedin {{ isLoggedIn }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters({
      user: 'user',
      authStatus: 'authStatus',
      isLoggedIn: 'isLoggedIn',
    }),
  },
  mounted(){
    console.log('before auth');
    console.log(localStorage.getItem('authorization'));
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch('login', { email, password })
        .then(() => {
          setTimeout(
            () => this.$store.dispatch('changeStatusNotification', false),
            1000
          );
        })
        .catch(err => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  border: 1px solid red;
}
</style>
