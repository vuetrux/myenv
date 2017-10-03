/**
 * Trabaja con las variables directamente desd el SO
 * */
import Registry from 'winreg'
import {exec} from 'child_process'
import _ from 'lodash'

export const REG_KEY = {
    User: '\\Environment',
    System: '\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment'
};

const UserEnvRegKey = new Registry({
    hive: Registry.HKCU,
    key: REG_KEY.User
});
const SystemEnvRegKey = new Registry({
    hive: Registry.HKLM,
    key: REG_KEY.System
});

class Variables {
    variables = undefined;
    path = [];
    isSystem = undefined;
    regKeyRef = undefined;

    list(cb) {
        this.regKeyRef.values((err, items) => {
            const cleanedItems = items.map(RegistryItem => {
                return {name: RegistryItem.name, value: RegistryItem.value}
            });
            this.variables = cleanedItems.filter(V => V.name.toUpperCase() !== 'PATH');
            this.path = cleanedItems.find(V => V.name.toUpperCase() === 'PATH').value.split(';');
            return cb(err)
        })
    }

    getVariables(cb) {
        if (!this.variables) {
            return this.list((err) => {
                cb(err, this.variables)
            });
        }
        return cb(null, this.variables);
    }

    set(varData, cb) {
        let cmd = `setx ${varData.name} "${varData.value}"`;
        console.log('wregistry.Variables.set.cmd', cmd);
        if (this.isSystem) cmd += ' /M';
        exec(cmd, (err, stdout, stderr) => {
            return cb(err, stdout, stderr)
        });
    }

    remove(varName, cb) {
        console.log('wregistry.remove.isSystem', this.isSystem);
        this.regKeyRef.remove(varName, err => cb(err))
    }

    removeDirectlyFromRegedit(varName, cb) {
        let key = this.isSystem ? "HKEY_LOCAL_MACHINE" + REG_KEY.System : "HKEY_CURRENT_USER" + REG_KEY.User;
        let cmd = `reg delete ${key} /v ${varName} /f`;
        exec(cmd, (err, stdout, stderr) => {
            cb(err, stdout, stderr)
        })
    }

}

export class UserEnv extends Variables {
    constructor() {
        super();
        this.isSystem = false;
        this.regKeyRef = UserEnvRegKey;
    }
}

export class SystemEnv extends Variables {
    constructor() {
        super();
        this.isSystem = true;
        this.regKeyRef = SystemEnvRegKey;
    }
}

class Path extends Variables {
    name = 'Path';

    getPath(cb) {
        if (!this.path.length) {
            console.log('path setear por 1ra vez.', 'sistema?', this.isSystem);
            return this.list((err) => {
                console.log('getPath.List seteando', this.path);
                cb(err, this.path)
            });
        }
        console.log('getPath.List YA seteandas', this.path);
        return cb(null, this.path);
    }

    addPath(newValue, cb) {
        // se hace copia de this.path pq es una property reactiva, si se actualiza la lista y luego da error al adicionar al path queda la lista con el valor q no se pudo adicionar al path
        let path = _.flatten(this.path);
        path.push(newValue);
        this.setPath(path, err => {
            if (err) {
                return cb(err)
            }
            this.path.push(newValue);
            cb()
        });
    }

    delPath(index, cb) {
        let path = _.flatten(this.path);
        path.splice(index, 1);
        this.setPath(path, err => {
            if (err) return cb(err);
            this.path.splice(index, 1);
            cb()
        })
    }

    editPath(varValue, index, cb) {
        let path = _.flatten(this.path);
        path[index] = varValue;
        this.setPath(path, err => {
            if (err) return cb(err);
            this.path[index] = varValue;
            // ahora hay q reflejar el cambio en la lista. si se pone this.path[index] = varValue;
            // fuera de este callback vue actualiza solo, pero dentro del callback el reactivity no se entera
            // de q un indice fue actualizado, hay q obligar la actualizacion haciendo push a un elemento
            // cualq y luego eliminando el valor
            this.path.push('xx') && this.path.splice(this.path.length - 1, 1);
            cb()
        });
    }

    setPath(path_, cb) {
        let path = path_ || this.path;
        let newPathStr = path.join(';');
        this.set({name: this.name, value: newPathStr}, (err, stdout, stderr) => cb(stderr))
    }
}

export class SystemPath extends Path {
    constructor() {
        super();
        this.isSystem = true;
        this.regKeyRef = SystemEnvRegKey;
    }
}

export class UserPath extends Path {
    constructor() {
        super();
        this.isSystem = false;
        this.regKeyRef = UserEnvRegKey;
    }
}