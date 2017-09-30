<template src="./path.html"></template>

<script>
    import EnvVar from '../../../env-var/index'
    import PathMixin from '../mixins/PathMixin'

    export default {
        mixins: [PathMixin],
        created() {
            this.Environment = EnvVar.UserPath;
        },
    }
</script>
