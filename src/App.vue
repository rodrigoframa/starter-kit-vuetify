<template>
  <v-app>
    <Loading :loading="loading"></Loading>
    <SnackBar :show="snack.show" :text="snack.msg" :type="snack.type" @dismissed="onDismissed"/>
    <Menu v-model="drawer"/>
    <Header @drawer="drawer = !drawer"/>
    <Content/>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/template/TheHeader'
import Footer from './components/template/TheFooter'
import Content from './components/template/TheContent'
import Menu from './components/template/TheMenu'
import SnackBar from './components/SnackBar'
import { mapGetters, mapActions } from 'vuex'
import Loading from './components/Loading'

export default {
  name: 'App',
  components: { Loading, SnackBar, Menu, Content, Header, Footer },
  computed: {
    ...mapGetters(['snack', 'loading'])
  },
  data () {
    return {
      drawer: false
      //
    }
  },
  methods: {
    ...mapActions(['clearSnack']),
    onDismissed () {
      this.clearSnack()
    }
  }
}
</script>
