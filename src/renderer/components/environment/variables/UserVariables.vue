<template src="./variables.html"></template>

<script>
    import EnvVar from '../../../env-var/index'
    import EnvironmentMixin from '../mixins/EnvironmentMixin'
    import TiBtn from '../../buttons/TiBtn.vue'
    import TiBtnInverse from '../../buttons/TiBtnInverse.vue'


    export default {
        mixins: [EnvironmentMixin],
        created() {
            this.Environment = EnvVar.User;
        },
        components: {TiBtn, TiBtnInverse},
    }
</script>
