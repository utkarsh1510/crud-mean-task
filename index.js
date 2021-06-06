const app = require('express')();
const DBConnector = require('./config/db-connection');
const TaskRoutes = require('./routes/task-routes');
const cors = require('cors');

const bodyParser = require('body-parser');
// app.set('trust proxy', true);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({urlencode: true}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET, PATCH, OPTIONS");
  next();
});

app.use('/task', TaskRoutes);

app.listen(3000, () => {
    console.log('server started');
})