<template>
    <div class="horizontal-feed" v-show="show">
        <div class="header">
            <span v-text="header"></span>
        </div>
        <div class="body" v-bind:class="swappingClass"
        v-on:mouseover="pause()"
        v-on:mouseout="resume()">
            <div>
                <p v-for="(item, index) in items"
                    v-bind:class="activeClass(index)"
                >
                    <a v-bind:href="item.href">{{ item.title }}&nbsp;<span>{{ item.body }}</span></a>
                </p>
            </div>
            <div class="cover"></div>
        </div>
        <div class="buttons">
            <span class="previous" v-on:click="goPrevious()">
                <i class="fa fa-angle-left"></i>
            </span>
            <span class="play" v-on:click="play()"
                v-bind:class="playClass">
                <i class="fa fa-play"></i>
            </span>
            <span class="next" v-on:click="goNext()">
                <i class="fa fa-angle-right"></i>
            </span>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        duration: {
            type: Number,
            required: false,
            default: 7000,
        },
        header: {
            type: String,
            required: true,
        },
        collection: {
            type: [Array, String],
            required: true
        }
    },
    data(){
        return {
            items: [],
            max: 0,
            show: false,
            current: 0,
            interval: null,
            paused: false,
            swapping: false,
        }
    },
    computed: {
        swappingClass(){
            return {
                'swapping': this.swapping
            }
        },
        playClass(){
            return {
                'active' : !this.interval
            }
        }
    },
    mounted(){
        if (this.duration <= 2000) {
            throw new Error('Duration must be higher than 2000ms')
        }

        if(typeof this.collection === 'string'){
            this.getItems()
        }else {
            this.items = this.collection;
            this.initialise()
        }
    },
    methods: {
        initialise(){
            if (this.items.length === 0) {
                return;
            }

            this.max = this.items.length - 1;
            this.show = true;
            this.swap();
        },
        getItems(){
            if(this.collection === ''){
                throw new Error('Invalid Endpoint')
            }

            window.axios.get(this.collection)
                .then(this.fetchSuccess)
                .catch(this.fetchError)
        },
        fetchSuccess(response){
            this.items = response.data;
            this.initialise();
        },
        fetchError(error){
            throw new Error(error)
        },
        activeClass(index){
            return {
                'active' : index === this.current
            }
        },
        swap(){
            this.interval = window.setInterval(() => {
                if(!this.paused){
                    this.nextSlide()
                }
            }, this.duration)
        },
        progress(direction){
            this.swapping = true
            window.setTimeout(() =>{
                this.current = this.next()
                this.swapping = false
            }, 1000)
        },
         nextSlide(){
            this.progress('next')
        },
        next(){
            if (this.current === this.max) {
                return 0
            }
            return this.current + 1;
        },
        previousSlide(){
            this.progress('previous')
        },
        previous(){
            if (this.current === 0) {
                return this.max
            }
            return this.current - 1
        },
        goPrevious(){
           this.stop()
           this.previousSlide()
        },
        goNext(){
            this.stop()
            this.nextSlide()
        },
        stop(){
             window.clearInterval(this.interval)
            this.interval = null
        },
        pause(){
            this.paused = true
        },
        resume(){
            this.paused = false
        },
        play(){
            if(this.interval){
                return
            }
            this.swap()
        }
    },
}
</script>