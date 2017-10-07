<template>
    <div id="app" class="container">
        <div class="notification" :class="notification.type" v-if="notification.show">
            <button class="delete" @click="notification.show=false"></button>
            {{notification.text}}
        </div>
        <div class="tabs is-centered">
            <ul>
                <li :class="{'is-active': currentView===views.PATH}" @click="currentView=views.PATH"><a>Path</a></li>
                <li :class="{'is-active': currentView===views.USER}" @click="currentView=views.USER"><a>Usuario</a></li>
                <li :class="{'is-active': currentView===views.SYSTEM}" @click="currentView=views.SYSTEM"><a>Sistema</a>
                </li>
            </ul>
        </div>
        <div class="content">
            <transition name="fade" appear mode="out-in">
                <component :is="currentView" keep-alive @notificate="notificated"></component>
            </transition>
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
            return {
                currentView: 'full-path',
                views: {PATH: 'full-path', USER: 'user-variables', SYSTEM: 'system-variables'},
                notification: {show: false, type: '', text: ''}
            }
        },
        mounted() {
            if (ErrorPlatform) {
                console.error(ErrorPlatform);
                this.error = ErrorPlatform;
            }
        },
        methods: {
            notificated({type, text}){
                console.log('notificated!');
                this.notification.show = true;
                this.notification.type = type;
                this.notification.text = text;
            }
        }
    }
</script>

<style>
    .fade-enter-to, .fade-leave {
        transition: all .3s ease;
        opacity: 0.7;
    }
    .fade-enter, .fade-leave-to {
        transform: translateX(100px);
        opacity: 0;
    }

    .card{
        background-color: whitesmoke;
    }
    .notification {
        position: absolute;
        top: 4px;
        right: 0;
        z-index: 10;
    }

    .content ul {
        list-style: none;
    }

    .content div.card > div:hover {
        background-color: rgba(0, 209, 178, 0.09);
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
