<template>
    <!--<ti-btn-inverse icon="ti-more-alt" @click.native="openDialog"></ti-btn-inverse>-->
    <ti-btn icon="ti-more-alt" :size="size" @click.native="openDialog"></ti-btn>
</template>

<script>
    import TiBtnInverse from './buttons/TiBtnInverse.vue'
    import TiBtn from './buttons/TiBtn.vue'
    export default {
        props: ['size'],
        components: {TiBtnInverse, TiBtn},
        methods:{
            openDialog(){
                this.$native.dialog.showOpenDialog({properties: ['openDirectory']}, files => {
                    files && this.$emit('selected-folder', files[0])
                })
            }
        }
    }
</script>

<style>

</style>
