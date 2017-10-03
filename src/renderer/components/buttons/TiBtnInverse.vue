<template>
    <i :class="icon"
       :style="{color: fontColor, backgroundColor, fontSize}"
       @mouseleave="leave"
       @mouseover="over"></i>
</template>

<script>
    import btnMixin from './btnMixin'
    //#22c65b
    export default {
        name: 'ti-inverse',
        mixins: [btnMixin],
        data() {
            return {backgroundColor: '', fontColor: this.color}
        },
        methods: {
            over() {
                this.backgroundColor = this.color;
                this.fontColor = '#fff';
            },
            leave() {
                this.backgroundColor = '#fff';
                this.fontColor = this.color;
            }
        }
    }
</script>

<style scoped="true">
    i {
        font-size: 24px;
        cursor: pointer;
        padding: 5px;
        transition: all 0.5s ease-out;
    }

    i:hover {
        border-radius: 20px;
        background-color: #bababa;
        transition: all 0.1s ease-in;
    }
</style>
