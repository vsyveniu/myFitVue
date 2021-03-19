<template>
    <div id="app" class="container">
        <Header />
        <router-view />
    </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
    name: 'App',
    components: {
        Header: () => import('@/components/layouts/Header'),
    },
};
</script>

<style lang="sass">
 @import './styles/style.scss'
</style>
