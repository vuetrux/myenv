<template>
    <i :class="icon"
       :style="{color: fontColor, backgroundColor, fontSize}"
       @mouseleave="leave"
       @mouseover="over"></i>
</template>

<script>
    import btnMixin from './btnMixin'
    const BACK_COLOR_DEFAULT = 'rgba(0,0,0,0)';
    //#22c65b
    export default {
        name: 'ti-inverse',
        mixins: [btnMixin],
        data() {
            return {backgroundColor: BACK_COLOR_DEFAULT, fontColor: this.color}
        },
        methods: {
            over() {
                this.backgroundColor = this.color;
                this.fontColor = '#fff';
            },
            leave() {
                this.backgroundColor = BACK_COLOR_DEFAULT;
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
