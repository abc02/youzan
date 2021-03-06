import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'


import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

new Vue({
    el: '#app',
    data: {
        bannerLists: null,
        lists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false, //是否继续加载
        allLoaded: false,
    },
    created() {
        this.gethotLists()
        this.getBanner()
    },
    methods: {
        gethotLists() {
            let obj = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }
            console.log(url.hotLists)

            if (this.allLoaded) return
            this.loading = true
            axios.post(url.hotLists, obj).then(res => {
                let curLists = res.data.lists
                curLists  = this.replaceHttp(curLists)
                if (curLists.length < this.pageSize) { //判断所有数据是否加载完毕
                    this.allLoaded = true
                }
                if (this.lists) {
                    this.lists.push(...curLists)
                } else {
                    this.lists = curLists //初始化数据
                }
                this.pageNum++
                this.loading = false
            })
        },
        getBanner() {
            axios.get(url.banner).then(res => {
                let lists = res.data.lists
                console.log(lists)
                lists  = this.replaceHttp(lists)
                this.bannerLists = lists
            })
        }
    },
    mixins: [mixin]
})