/**
 * Interfaz para tratar una misma api para cambiar las variables de entorno en Linux y Win.
 * Se exporta el obj EnvVar que tendra los mismos metodos sea el SO que sea
 * */
const ALLOWED_PLATFORMS = ['linux', 'win32'];
const os = require('os');
const yourPlatform = os.platform();
import {UserEnv, SystemEnv, SystemPath, UserPath} from './wregistry';

const WinEnvVar = {
    "User": new UserEnv(),
    "System": new SystemEnv(),
    "SystemPath": new SystemPath(),
    "UserPath": new UserPath()
};

let EnvVar = undefined;
let ErrorPlatform_ = '';
if (!ALLOWED_PLATFORMS.includes(yourPlatform)) {
    ErrorPlatform_ = "Esta app no soporta la plataforma";
    // throw new Error("Esta app no soporta la plataforma")
} else {
    switch (yourPlatform) {
        case ALLOWED_PLATFORMS[0]:
            break;
        case ALLOWED_PLATFORMS[1]:
            EnvVar = WinEnvVar;
        // console.log(EnvVar);
    }
}
export const VAR_TYPE = {
    System: 1, User: 2, Path: 3
};
export const ErrorPlatform = ErrorPlatform_;
export default EnvVar
