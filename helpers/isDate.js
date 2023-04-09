const moment = require('moment') // para trabajar con fechas npm i moment

const isDate = (value, { req, location, path }) => {

    if (!value) {
        return false;// esto le dira al express-validator que si esta funxion regresa false quiere decir que ese campo no es correcto y por lo tanto la validacion va a fallar
    }
    const fecha = moment(value);
    if (fecha.isValid()) { // is valid es una funcion propia de moment
        return true;
    }else{
        return false;
    }
}

module.exports = {
    isDate
};