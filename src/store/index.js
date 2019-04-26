if(process.env.NODE_ENV === 'production'){
    module.exports = require('./initStore.prod');
}else{
    module.exports = require('./initStore.dev');
}