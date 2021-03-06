/**
 * mixin entendido para compartir la misma api entre variables de entorno y usuario.
 * despues de tod ambas tienen la misma estructura, lo unico q las diferencia es el lugar de regedt
 * en donde se almacenan
 * */
import OpenDialog from '../../buttons/OpenDialog.vue'
import uxMixin from './uxMixin'
import TiBtn from '../../buttons/TiBtn.vue'
import TiBtnInverse from '../../buttons/TiBtnInverse.vue'
import GreenLoader from '../../GreenLoader.vue'

export default {
    mixins: [uxMixin],
    components: {OpenDialog, TiBtn, TiBtnInverse, GreenLoader},
    mounted() {
        this.Environment.getVariables((err, Variables) => this.Variables = Variables);
    },
    data() {
        return {
            Variables: [],
            varName: '',
            varValue: '',
            editing: {id: -1, name: '', value: '', blocked: false},
        }
    },
    methods: {
        setVar(varName, varValue, addToList = true) {
            const newVarData = {
                name: varName || this.varName,
                value: varValue || this.varValue
            };
            if (!newVarData.name || !newVarData.value) return;
            if (addToList) this.isInputLoading = true;
            else this.thisRowIsBusy = varName;
            return new Promise((res, rej) => {
                this.Environment.set(newVarData, (err, stdout, stderr) => {
                    this.cleanInputs();
                    if (stderr || err) {
                        console.error(stderr);
                        this.$emit('notificate', {type: 'is-danger', text: stderr});
                        return rej(stderr)
                    }
                    console.log(stdout);
                    addToList && this.Variables.push(newVarData);
                    res()
                })
            });
        },
        delVar(varName, updateList = true) {
            // console.log('EnviromentsVariables.delVar.Enviroment.isSystem', this.Environment.isSystem);
            return new Promise((res, rej) => {
                this.thisRowIsBusy = varName;
                this.Environment.remove(varName, err => {
                    this.thisRowIsBusy = -1;
                    if (err) {
                        // console.log('EnviromentsVariables.vue deleting', varName, err.message);
                        // new Notification(err.message);
                        this.$emit('notificate', {type: 'is-danger', text: err.message});
                        return rej(err.message)
                    }
                    if (!updateList) return res();
                    let index = this.Variables.findIndex(V => V.name === varName);
                    if (index !== -1)
                        this.Variables.splice(index, 1);
                    res()
                })
            });
        },
        selectedFolderByAdding(folder) {
            this.varValue = folder;
            if(this.varName) this.setVar()
        },
        selectedFolderByEditing(folder){
            let oldVar = this.Variables[this.editing.id];
            this.editing.value = folder;
            this.editVar(oldVar.name, oldVar.value);
        },
        showEditor({name, value}, index) {
            console.log(name, value, index);
            this.editing.id = index;
            this.editing.name = name;
            this.editing.value = value;
            this.editing.blocked = true;
        },
        cancelEdit() {
            this.editing.id = -1;
            this.editing.name = '';
            this.editing.value = '';
            this.editing.blocked = false;
        },
        cleanInputs(){
            this.varValue = '';
            this.varName = '';
            this.isInputLoading = false;
            this.thisRowIsBusy = -1;
        },
        editVar(oldName, oldValue) {
            let nameChanged = oldName !== this.editing.name;
            let valueChange = oldValue !== this.editing.value;
            let varName = this.editing.name;
            let varValue = this.editing.value;
            if (nameChanged) {
                this.delVar(oldName, false)
                    .then(this.setVar(varName, varValue, false))
                    .then(() => {
                        console.log('update  index');
                        let index = this.Variables.findIndex(V => V.name === oldName);
                        if (index !== -1) {
                            this.Variables[index].name = varName;
                            this.Variables[index].value = varValue;
                        }
                    })
                    .catch(err => {
                        console.log('algun error', err);
                    });
            } else {
                if (valueChange) {
                    // si no se cambio el name tiene q cambiarse obligao el value
                    this.setVar(varName, varValue, false)
                        .then(() => {
                            let index = this.Variables.findIndex(V => V.name === varName);
                            if (index !== -1)
                                this.Variables[index].value = varValue;
                        })
                        .catch(err => {
                            console.log('algun error', err);
                        })
                }
            }
            this.cancelEdit();
        },
    }
}