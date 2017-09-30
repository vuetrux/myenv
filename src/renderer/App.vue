<template>
    <div id="app">
        <!--<user-variables></user-variables>-->
        <!--<system-variables></system-variables>-->
        <user-path></user-path>
        <!--<system-path></system-path>-->
        <!--<open-dialog></open-dialog>-->
    </div>
</template>

<script>
    import EnvVar from "./env-var"
    import {ErrorPlatform, VAR_TYPE} from "./env-var"
    import UserVariables from './components/environment/variables/UserVariables.vue'
    import SystemVariables from './components/environment/variables/SystemVariables.vue'
    import SystemPath from './components/environment/path/SystemPath.vue'
    import UserPath from './components/environment/path/UserPath.vue'
    import OpenDialog from './components/OpenDialog.vue'

    export default {
        name: 'myenv',
        components: {OpenDialog, UserVariables, SystemVariables, SystemPath, UserPath},
        mounted() {
            if (ErrorPlatform) {
                console.error(ErrorPlatform);
                this.error = ErrorPlatform;
            }
        },
    }
</script>

<style>
    /* CSS */
    input[type=text], button {
        border: 1px solid black
    }

</style>
