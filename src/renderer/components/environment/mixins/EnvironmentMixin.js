/**
 * mixin entendido para compartir la misma api entre variables de entorno y usuario.
 * despues de tod ambas tienen la misma estructura, lo unico q las diferencia es el lugar de regedt
 * en donde se almacenan
 * */

export default {
    mounted() {
        this.Environment.getVariables((err, Variables) => this.Variables = Variables);
    },
    data() {
        return {
            Variables: [],
            varName: '',
            varValue: '',
            editing: {id: '', name: '', value: ''}
        }
    },
    methods: {
        setVar(varName, varValue, updateList = true) {
            const newVarData = {
                name: varName || this.varName,
                value: varValue || this.varValue
            };
            return new Promise((res, rej) => {
                this.Environment.set(newVarData, (err, stdout, stderr) => {
                    if (stderr || err) {
                        console.error(stderr);
                        new Notification(stderr);
                        return rej(stderr)
                    }
                    console.log(stdout);
                    updateList && this.Variables.push(newVarData);
                    res()
                })
            });
        },
        delVar(varName, updateList = true) {
            // console.log('EnviromentsVariables.delVar.Enviroment.isSystem', this.Environment.isSystem);
            return new Promise((res, rej) => {
                this.Environment.remove(varName, err => {
                    if (err) {
                        // console.log('EnviromentsVariables.vue deleting', varName, err.message);
                        new Notification(err.message);
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
        showEditor(varName, varValue) {
            this.editing.id = varName;
            this.editing.name = varName;
            this.editing.value = varValue;
        },
        cancelEdit() {
            this.editing.id = '';
            this.editing.name = '';
            this.editing.value = '';
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