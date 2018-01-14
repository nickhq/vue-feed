import 'babel-polyfill'
import Vue from 'vue'

import Home from './components/Home.vue'
import HorizontalFeed from './components/HorizontalFeed.vue'

window.axios = require('axios')

Vue.component('horizontal-feed', HorizontalFeed)
Vue.component('nick-home', Home)

new Vue({
    el: '#app',
})