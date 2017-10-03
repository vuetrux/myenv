<template src="./path.html"></template>

<script>
    import EnvVar from '../../../env-var/index'
    import PathMixin from '../mixins/PathMixin'
    import TiBtn from '../../buttons/TiBtn.vue'
    import TiBtnInverse from '../../buttons/TiBtnInverse.vue'

    export default {
        mixins: [PathMixin],
        components: {TiBtn, TiBtnInverse},
        data(){return {title: 'Path del usuario'}},
        created() {
            this.Environment = EnvVar.UserPath;
        },
    }
</script>
