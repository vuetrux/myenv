<template src="./variables.html"></template>

<script>
    import EnvVar from '../../../env-var/index'
    import EnvironmentMixin from '../mixins/EnvironmentMixin'

    export default {
        mixins: [EnvironmentMixin],
        created() {
            this.Environment = EnvVar.System;
        },
    }
</script>
