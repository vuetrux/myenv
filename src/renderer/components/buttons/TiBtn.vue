<template>
    <i :class="icon" :style="{color, fontSize}"></i>
</template>

<script>
    import btnMixin from './btnMixin'
    //#22c65b
    export default {
        mixins: [btnMixin],
    }
</script>

<style scoped="true">
    i {
        cursor: pointer;
        padding: 5px;
        transition: all 0.5s ease-out;
    }

    i:hover {
        border-radius: 20px;
        background-color: #bababa;
        transition: all 0.1s ease-in;
    }
</style>
