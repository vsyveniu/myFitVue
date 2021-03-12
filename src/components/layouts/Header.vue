<template>
  <header class="header">
    <div>here is logo</div>
    <div>{{ authStatus.status }}</div>
    <div v-show="!isLoggedIn">
      <button>login</button>
      <div v-show="isLoginVisible">
        <Login />
      </div>
      <div>
        <button>register</button>
        <!-- <Register /> -->
      </div>
    </div>
    {{ isLoggedIn }}
    <button v-show="isLoggedIn">logout</button>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  components: {
    Login: () => import('@/components/auth/Login'),
  },
  data: function() {
    return {
      isLoginVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      user: 'user',
      authStatus: 'authStatus',
      isLoggedIn: 'isLoggedIn',
    }),
  },
  methods: {
    logout: () => {
       this.$store.dispatch('logout', )
        .then(() => {console.log('logged out')})
        .catch(err => console.log(err));
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  border: 3px solid blue;
}
</style>
