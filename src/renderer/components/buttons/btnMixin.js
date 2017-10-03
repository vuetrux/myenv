/**
 * Botones especificos para esta app
 * */

const DEFAULT_SIZE = '24px';

export default {
    props: ['icon', 'color', 'size'],
    computed: {
        fontSize() {
            return this.size ? `${this.size}px` : DEFAULT_SIZE;
        }
    }
}