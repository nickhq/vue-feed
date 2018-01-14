<template>
    <div class="home-container">
        <h1>A Horizontal news feed</h1>
        <p>Made with <a href="https://vuejs.org/" target="_blank">Vue.js</a></p>
        <div class="links">
            <a href="https://github.com/nickhq/vue-feed" ><i class="fa fa-code"></i></a>
            <a href="https://twitter.com/nickhq6" class="icon-twitter"><i class="fa fa-twitter"></i></a>
            <a href="https://github.com/nickhq" class="icon-github"><i class="fa fa-github"></i></a>
            <a href="https://www.facebook.com/nickhq6" class="icon-fb"><i class="fa fa-facebook"></i></a>
            <a href="https://www.instagram.com/nickhq6/" class="icon-ig"><i class="fa fa-instagram"></i></a>
        </div>
        <footer class="footer">
            Created By Nixon Kosgey &copy; 2018
        </footer>
    </div>
</template>

<script>

export default {
    
}

</script>

<style>
.home-container{
        display: flex;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        padding: 2rem 0;
    }

.links a{
    font-size: 1.5rem;
    padding: 1rem;
}

.links .icon-twitter{
    color: #00aced;
}
.links .icon-github{
    color: #171516;
}
.links .icon-fb{
    color: #3b5998;
}
.links .icon-ig{
    color: #ec5249;
}


.footer{
    bottom: 0;
    text-align: center;
    background-color: #333;
    position: fixed;
    padding: 1rem;
    margin-top: 1rem;
    left: 0;
    right: 0;
}

</style>