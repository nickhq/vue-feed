<template>
    <div class="horizontal-feed" v-show="show">
        <div class="header">
            <span v-text="header"></span>
        </div>
        <div class="body">
            <div>
                <p>
                    <a href="#">Title
                        <span>Content</span>
                    </a>
                </p>
            </div>
            <div class="cover"></div>
        </div>
        <div class="buttons">
            <span class="previous">
                <i class="fa fa-angle-left"></i>
            </span>
            <span class="play">
                <i class="fa fa-play"></i>
            </span>
            <span class="next">
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
            show: false
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
        swap(){
            
        }
    },
}
</script>