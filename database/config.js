// para el lado del back con mongoDB tambien es sumamente necesario instalar mongoose) npm i mongoose

const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        //mongoose.set('strictQuery', true)
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD')
    }
}

module.exports = {
    dbConnection
}