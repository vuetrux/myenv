<template>
    <div id="app" class="container">
        <div class="tabs is-centered">
            <ul>
                <li class="is-active"><a>Path</a></li>
                <li><a>Usuario</a></li>
                <li><a>Sistema</a></li>
            </ul>
        </div>
        <!--<user-variables></user-variables>-->
        <!--<system-variables></system-variables>-->
        <div class="content">
            <user-path></user-path>
            <system-path></system-path>

        </div>
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
    import OpenDialog from './components/buttons/OpenDialog.vue'

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
    button {
        border: 1px solid black
    }
    .content ul{
        list-style: none;
    }
    .content ul li:hover, div.card > div:hover{
        background-color: whitesmoke;
    }
    .content ul li, div.card > div{
        padding: 5px;
        /*border: 1px solid blue;*/
        /*border-bottom: 1px solid whitesmoke;*/
    }
    .content input[type=text]{
        border-radius: 0;
    }

    .content{
        padding: 10px;
    }

</style>
