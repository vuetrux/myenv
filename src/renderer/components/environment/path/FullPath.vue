<template>
    <div>
        <user-path></user-path>
        <hr>
        <system-path></system-path>
    </div>
</template>

<script>
    import UserPath from './UserPath.vue'
    import SystemPath from './SystemPath.vue'

    export default {
        components: {
            SystemPath, UserPath
        }
    }
</script>

<style>

</style>
