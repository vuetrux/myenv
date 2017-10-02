<template src="./path.html"></template>

<script>
    import EnvVar from '../../../env-var/index'
    import PathMixin from '../mixins/PathMixin'
    import TiBtn from '../../TiBtn.vue'
    export default {
        mixins: [PathMixin],
        components:{TiBtn},
        created() {
            this.Environment = EnvVar.UserPath;
        },
    }
</script>
