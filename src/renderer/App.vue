<template>
    <div id="app" class="container">
        <div class="tabs is-centered">
            <ul>
                <li :class="{'is-active': currentView===views.PATH}" @click="currentView=views.PATH"><a>Path</a></li>
                <li :class="{'is-active': currentView===views.USER}" @click="currentView=views.USER"><a>Usuario</a></li>
                <li :class="{'is-active': currentView===views.SYSTEM}" @click="currentView=views.SYSTEM"><a>Sistema</a></li>
            </ul>
        </div>
        <div class="content">
            <component :is="currentView" keep-alive transition="fade" transition-mode="out-in"></component>
        </div>
    </div>
</template>

<script>
    import EnvVar from "./env-var"
    import {ErrorPlatform, VAR_TYPE} from "./env-var"
    import UserVariables from './components/environment/variables/UserVariables.vue'
    import SystemVariables from './components/environment/variables/SystemVariables.vue'
    import FullPath from './components/environment/path/FullPath.vue'
    import OpenDialog from './components/buttons/OpenDialog.vue'

    export default {
        name: 'myenv',
        components: {OpenDialog, UserVariables, SystemVariables, FullPath},
        data() {
            return {currentView: 'full-path', views: {PATH: 'full-path', USER: 'user-variables', SYSTEM: 'system-variables'}}
        },
        mounted() {
            if (ErrorPlatform) {
                console.error(ErrorPlatform);
                this.error = ErrorPlatform;
            }
        },
//        computed: {
//            isActive(){
//                return this.
//            }
//        }
    }
</script>

<style>
    .fade-transition {
        transition: opacity 2s ease;
    }

    .fade-enter, .fade-leave {
        opacity: 0;
    }

    .content ul {
        list-style: none;
    }

    .content ul li:hover, div.card > div:hover {
        background-color: whitesmoke;
    }

    .content ul li, div.card > div {
        padding: 5px;
        /*border: 1px solid blue;*/
        /*border-bottom: 1px solid whitesmoke;*/
    }

    .content input[type=text] {
        border-radius: 0;
    }

    .content {
        padding: 10px;
    }

</style>
