<template>
<button @click="openDialog">...</button>
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
