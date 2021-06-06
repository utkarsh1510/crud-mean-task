const mongooseConnection = require('mongoose');
const hostAdddress = '127.0.0.1:27017/mean-tasks';

mongooseConnection.connect(`mongodb://${hostAdddress}`, {useUnifiedTopology: true , useNewUrlParser: true}).then(() => {
}).catch((err) => {
    console.log('Error occured -> ', err);
})

module.exports = mongooseConnection;