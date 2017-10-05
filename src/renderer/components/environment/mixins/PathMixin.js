/**
 * mixin entendido para compartir la misma api entre variables de entorno y usuario.
 * despues de tod ambas tienen la misma estructura, lo unico q las diferencia es el lugar de regedt
 * en donde se almacenan.
 * Este especificamente maneja solo en Path de sist y del user
 * */

import OpenDialog from '../../buttons/OpenDialog.vue'
import uxMixin from './uxMixin'

export default {
    mixins: [uxMixin],
    data() {
        return {
            Path: [],
            editing: {id: -1, value: '', blocked: false},
            varValue: '',
        }
    },
    components: {OpenDialog},
    mounted() {
        this.Environment.getPath((err, path) => this.Path = path);
    },
    methods: {
        selectedFolderByAdding(folder) {
            this.varValue = folder;
            this.addPath();
        },
        selectedFolderByEditing(folder) {
            let index = this.editing.id;
            let oldValue = this.Path[this.editing.id];
            if (oldValue !== folder) {
                this.editing.value = folder;
                this.editPath(oldValue, index);
            }
            console.log(index, oldValue, folder);
        },
        addPath() {
            if (!this.varValue) return;
            this.isInputLoading = true;
            this.Environment.addPath(this.varValue, err => {
                err && this.$emit('notificate', {type: 'is-danger', text: err});
                this.varValue = '';
                this.isInputLoading = false;
            })
        },
        delPath(index) {
            this.isLoading = true;
            this.Environment.delPath(index, err => {
                // err && new Notification(err)
                err && this.$emit('notificate', {type: 'is-danger', text: err});
                this.isLoading = false;
            })
        },
        showEditor(index, varValue) {
            this.editing.id = index;
            this.editing.value = varValue;
            this.editing.blocked = true;
        },
        cancelEdit() {
            this.editing.id = -1;
            this.editing.value = '';
            this.editing.blocked = false;
        },
        editPath(oldValue, index) {
            let valueChange = oldValue !== this.editing.value;
            if (valueChange) {
                this.isLoading = true;
                this.Environment.editPath(this.editing.value, index, err => {
                    // err && new Notification(err)
                    err && this.$emit('notificate', {type: 'is-danger', text: err});
                    this.isLoading = false;
                });
            }
            this.cancelEdit()
        }
    }
}