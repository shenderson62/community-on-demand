

const { Connection, Request } = require("tedious");
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.json())

// Create connection to database
const config = {
    authentication: {
        options: {
        userName: "sroy326", // update me
        password: "Floppyfish1" // update me
        },
        type: "default"
    },
    server: "codserver.database.windows.net", // update me
    options: {
        database: "cod", //update me
        encrypt: true,
        rowCollectionOnRequestCompletion: true
    }
};
  
const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
if (err) {
    console.error(err.message);
} else {
    console.log("connection made")
}
});

connection.connect();

app.get('/', (req, res) => {
    res.send("HIT")
})

app.get('/cards', async (req, res) => {

    await selectValues("select * from [dbo].[Card];").then(rows=>{
        return res.send(rows);
      })
      .catch(error=>{
        console.log(error)
      })
})

app.get('/domains', async (req, res) => {

    await selectValues("select * from [dbo].[Domain];").then(rows=>{
        return res.send(rows);
      })
      .catch(error=>{
        console.log(error)
      })
})

function selectValues(query){

  // Read all rows from table
  const request = new Request(
    query,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  return new Promise((resolve,reject)=>{
    const result = [];
  
    request.on("row", (columns) => {
      const entry = {};
      columns.forEach((column) => {
        entry[column.metadata.colName] = column.value;
      });
      result.push(entry);
    });

    request.on('error',error=>reject(error));// some error happened, reject the promise
    request.on('doneProc',()=>resolve(result)); // resolve the promise with the result rows.

    connection.execSql(request);

  });

}

app.get('/user', async (req, res) => {

  await selectValues("select * from [dbo].[User];").then(rows=>{
      return res.send(rows);
    })
    .catch(error=>{
      console.log(error)
    })
})

app.post("/game", (req, res) => {
  let body = req.body;
  // if the user doesnt already exist, then add it to db
  let queryString = 
      `insert into [dbo].[Game] (Results, Email, TimePlayed) 
          values ('${body.Results}', '${body.Email}', CURRENT_TIMESTAMP);`
  const request = new Request(
      queryString,
      (err, rowCount) => {
          if (err) {
          } else {
              console.log(`${rowCount} row(s) returned`);
          }
      }
  );
  connection.execSql(request);
  res.send("Successfully posted game")
})

app.post("/user", (req, res) => {
  console.log("reached user")
  let body = req.body;
  console.log(body)
  let FirstName = body.name?.substring(0, body.name.indexOf(" "));
  let LastName = body.name?.substring(body.name.indexOf(" ") + 1);
  // if the user doesnt already exist, then add it to db
  let queryString = 
      `insert into [dbo].[User] (FirstName, LastName, Email, PhotoURL)  
          values ('${FirstName}', '${LastName}','${body.email}', '${body.photoURL}') `
  const request = new Request(
      queryString,
      (err, rowCount) => {
          if (err) {
            console.error(err.message);
          } else {
              console.log(`${rowCount} row(s) returned`);
          }
      }
  );
  connection.execSql(request);
  res.send("Successfully added user")
})

app.post("/project", async (req, res) => {
  let body = req.body;
  let photo = body.photo;
  let queryString; 
  if(body.projectId) {
    queryString = 
      `UPDATE [dbo].[Project]
      SET name='${body.name}', description='${body.description}', notes='${body.notes}',DomainID='${body.DomainID}' WHERE ProjID= '${body.projectId}' `
  } else {
    queryString = 
      `insert into [dbo].[Project] (name, description, photo, notes, userId, DomainID)  
          values ('${body.name}', '${body.description}','${photo.uri}', '${body.notes}', '${body.userId}', '${body.DomainID}') `
  }

  const request = new Request(
    queryString,
    (err, rowCount) => {
      if (err) {
        console.log(err.message);
      } else {
          console.log(`${rowCount} row(s) returned`);
      }
    }
  );
  connection.execSql(request);
  res.send("Successfully added Project")
})



app.post("/projectdel", async (req, res) => {
  let body = req.body;
  let photo = body.photo;
  let queryString; 
  if(body.projectId) {
    queryString = 
      `DELETE from [dbo].[Project]
      WHERE ProjID = '${body.projectId}' `
  } else {
    console.log("No project existed with that name")
  }
  // console.log(queryString)
  const request = new Request(
    queryString,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
          console.log(`${rowCount} row(s) returned`);
      }
    }
  );
  connection.execSql(request);
  res.send("Successfully deleted Project")
})


app.get('/project', async (req, res) => {
  console.log("GET PROJ ", req.query.userId)
  await selectValues("select * from [dbo].[Project] where userId = '"+ req.query.userId +"';").then(rows=>{
      console.log("helo")
      return res.send(rows);
    })
    .catch(error=>{
      console.log(error)
    })
})

app.get('/game', async (req, res) => {

  await selectValues("select * from [dbo].[Game];").then(rows=>{
      return res.send(rows);
    })
    .catch(error=>{
      console.log(error)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})