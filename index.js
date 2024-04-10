const express = require('express');
const path = require('path');
const app = express();
//for graphs
const multer = require('multer');
const XLSX = require('xlsx');
const map = require('map')
const split = require('split')

const pubPath = path.join(__dirname,'public')
app.use(express.static(pubPath));


app.get('/about',(req,resp) => {
    resp.sendFile(`${pubPath}/about.html`);
})
app.get('/help',(req,resp) => {
    resp.sendFile(`${pubPath}/help.html`);
})
app.get('/graphs',(req,resp) => {
    resp.sendFile(`${pubPath}/graphs.html`);
})


// ------------for registration-------------
// console.log("Jai Shree Ram");
// const express = require('express');
// const app = express();
// let port = 5000;
// const path = require('path');
const pubCollection = require('./src/model/model');
const { log } = require('console');
const templatePath = path.join(__dirname,'./template/views');

app.use(express.urlencoded({extended : false}));

app.set('view engine','hbs');
app.set ('views',templatePath);


require('./src/db/db');

app.get('/register',(req,resp) => {
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

// app.listen(port,() => {
//     console.log(`listing to the port ${port}`);
// });


// Set storage for uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve HTML form
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// Handle file upload and generate plot
app.post('/upload', upload.single('excelFile'), (req, res) => {
  if (req.file) {
    const fileBuffer = req.file.buffer;
  
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const plotData = parseExcelData(jsonData);
    res.send(plotData);
  } else {
    res.status(400).send('No file uploaded.');
  }
});


// Handle direct data input and generate plot

function parseExcelData(data) {
  // Assuming the data is in the format: [['X1', 'Y1', 'X2', 'Y2'], [1, 10, 2, 15], [2, 15, 4, 20], ...]
  const trace1 = {
    x: data.slice(1).map(row => row[0]),
    y: data.slice(1).map(row => row[1]),
    type: 'scatter',
    name: 'Trace 1'
  };

  const trace2 = {
    x: data.slice(1).map(row => row[2]),
    y: data.slice(1).map(row => row[3]),
    type: 'scatter',
    name: 'Trace 2'
  };
  const trace3 = {
    x: data.slice(1).map(row => row[4]),
    y: data.slice(1).map(row => row[5]),
    type: 'scatter',
    name: 'Trace 3'
  };

  return [trace1, trace2, trace3];
}

function parseDirectInput(trace1Data, trace2Data) {
  const trace1 = {
    x: trace1Data,
    y: trace2Data,
    type: 'scatter',
    name: 'Trace 1'
  };

  const trace2 = {
    x: trace1Data, // Assuming both traces have the same X values
    y: trace2Data,
    type: 'scatter',
    name: 'Trace 2'
  };

  return [trace1, trace2];
}




app.listen(4500);