/**
 * mixin entendido para compartir la misma api entre variables de entorno y usuario.
 * despues de tod ambas tienen la misma estructura, lo unico q las diferencia es el lugar de regedt
 * en donde se almacenan.
 * Este especificamente maneja solo en Path de sist y del user
 * */

export default {
    data(){
        return {
            Path: [],
            editing: {id: -1, value: ''},
            varValue: ''
        }
    },
    mounted() {
        this.Environment.getPath((err, path) => this.Path = path);
    },
    methods:{
        addPath(){
            this.Environment.addPath(this.varValue, err => {
                err && new Notification(err)
            })
        },
        delPath(index){
            this.Environment.delPath(index, err => {
                err && new Notification(err)
            })
        },
        showEditor(index, varValue){
            this.editing.id = index;
            this.editing.value = varValue;
        },
        cancelEdit(){
            this.editing.id = -1;
            this.editing.value = '';
        },
        editPath(oldValue, index){
            let valueChange = oldValue !== this.editing.value;
            if(valueChange){
                this.Environment.editPath(this.editing.value, index, err => {
                    err && new Notification(err)
                });
            }
            this.cancelEdit()
        }
    }
}