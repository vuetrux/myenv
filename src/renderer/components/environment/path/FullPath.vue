<template>
    <div>
        <user-path @notificate="emitNotification"></user-path>
        <hr>
        <system-path @notificate="emitNotification"></system-path>
    </div>
</template>

<script>
    import UserPath from './UserPath.vue'
    import SystemPath from './SystemPath.vue'

    export default {
        components: {SystemPath, UserPath},
        methods:{
            /**
             * Este metodo es un receiver para los comp hijos user-path y system-path que lo emiten cuando hay
             * error. aqui se propaga la notificacion hasta el comp App q es el q lo muestra. Se usa este enfoque
             * y no el del Bus pq es un solo evento de este tipo el q se maneja en toda la app.
             * */
            emitNotification(payload){this.$emit('notificate', payload)}
        }
    }
</script>

<style>

</style>
