<template>
<!--<button @click="openDialog">...</button>-->
    <a class="button" @click="openDialog"><i class="ti-more-alt"></i></a>
</template>

<script>
    export default {
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
