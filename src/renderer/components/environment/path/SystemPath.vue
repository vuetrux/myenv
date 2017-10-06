<template src="./path.html"></template>

<script>
    import EnvVar from '../../../env-var/index'
    import PathMixin from '../mixins/PathMixin'

    export default {
        mixins: [PathMixin],
        data() {
            return {title: 'Path del sistema'}
        },
        created() {
            this.Environment = EnvVar.SystemPath;
        },
    }
</script>
