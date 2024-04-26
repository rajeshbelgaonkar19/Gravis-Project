const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pubRegistration').then(() => {
    console.log('connect');
}).catch((e) => {
    console.log(console.error());
});
