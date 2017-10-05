/**
 * Botones especificos para esta app
 * */

const DEFAULT_SIZE = 24;

export default {
    props: {
        icon: {
            type: String,
            required: true,
            validator(value) {
                return value.startsWith('ti')
            },
        },
        color: {
            type: String,
            required: false
        },
        size: {
            type: Number,
            required: false,
            default: DEFAULT_SIZE
        }
    },
    computed: {
        fontSize() {
            return `${this.size}px`;
        }
    }
}