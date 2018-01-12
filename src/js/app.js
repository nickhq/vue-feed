import 'babel-polyfill'
import Vue from 'vue'

window.axios = require('axios')

Vue.component('horizontal-feed', require('./components/HorizontalFeed.vue'))
new Vue({
    el: '#app'
})