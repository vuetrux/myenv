<template>
    <i :class="icon" :style="{color, fontSize}"></i>
</template>

<script>
    import btnMixin from './btnMixin'
    //#22c65b
    export default {
        name: 'ti-btn',
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
        transition: border-radius .2s ease;
    }
    i:active{
        background-color: #777;
        border-radius: 5px;
        transition: all .5s ease;
    }
</style>
