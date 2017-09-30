<template>
    <div id="app">
        <!--<user-variables></user-variables>-->
        <!--<system-variables></system-variables>-->
        <user-path></user-path>
        <system-path></system-path>
    </div>
</template>

<script>
    import EnvVar from "./env-var"
    import {ErrorPlatform, VAR_TYPE} from "./env-var"
    import EnvPath from './components/Path.vue'
    import UserVariables from './components/environment/variables/UserVariables.vue'
    import SystemVariables from './components/environment/variables/SystemVariables.vue'
    import SystemPath from './components/environment/path/SystemPath.vue'
    import UserPath from './components/environment/path/UserPath.vue'

    export default {
        name: 'myenv',
        data() {
            return {
                System: [],
                Path: [],
                error: '',
                'newPathValue': '',
                'editPathValue': '',
                VAR_TYPE: VAR_TYPE
            }
        },
        components: {EnvPath, UserVariables, SystemVariables, SystemPath, UserPath},
        mounted() {
            if (ErrorPlatform) {
                console.error(ErrorPlatform);
                this.error = ErrorPlatform;
                return
            }
        },
        methods: {
            newPath() {
                this.Path.push(this.newPathValue);
                this.setPath();
            },
            delPath(index) {
                this.Path.splice(index, 1);
                this.setPath();
            },
            editPath(index) {
                this.editPathValue = this.Path[index];
            },
            confirmEditPath(index) {
                this.Path[index] = this.editPathValue;
                this.setPath();
                this.editPathValue = ''
            },
            setPath() {
                console.log(this.Path);
                EnvVar.Set({name: 'Path', value: this.Path.join(';')}, VAR_TYPE.Path, (err, stdout, stderr) => {
                    console.log(stdout);
                    console.error(stderr);
                    console.error(err);
                })
            },
        }
    }
</script>

<style>
    /* CSS */
    input[type=text], button {
        border: 1px solid black
    }

</style>
