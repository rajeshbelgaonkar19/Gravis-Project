// console.log("Jai Shree Ram");
const express = require('express');
const app = express();
let port = 4000;
const path = require('path');
const pubCollection = require('./src/model/model');
const { log } = require('console');
const templatePath = path.join(__dirname,'./template/views');

app.use(express.urlencoded({extended : false}));

app.set('view engine','hbs');
app.set ('views',templatePath);


require('./src/db/db');

app.get('/',(req,resp) => {
    resp.render('index');
})

app.post('/pubData', async (req,resp) => {
        try{
            const password = req.body.password;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        const conpassword = req.body.conpassword; 
        if(password===conpassword) {
            const pubdata = new pubCollection({
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                password : req.body.password,
                conpassword : req.body.conpassword
            });
            const postData = await pubdata.save();
            resp.send(postData);
        }  
        else {
            resp.send("Password are not matching");
        } 
        } catch(error) {
            resp.send(error);
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
})

app.listen(port,() => {
    console.log(`listing to the port ${port}`);
});