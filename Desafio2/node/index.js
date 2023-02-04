const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreate = `CREATE TABLE IF NOT EXISTS people(id int AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`
connection.query(sqlCreate)

app.get('/', (req,res) => {
    createRow()
    getRows(rows =>  {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Full Cycle Rocks!</h1>')
        
        let names = ""

        Object.keys(rows).forEach(function(key) {
            var row = rows[key];
            names += `\n - ${row.name}<br>`
        })
        res.write(names)
    
        res.end()
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

function createRow() {
    const name = "Rafa" + Math.floor(
        Math.random() * (100 - 1) + 1
      )
    const sql = `INSERT INTO people(name) values(?)`
    connection.query(sql, name)
}

function getRows(cb) {
    const sql = `SELECT * FROM people`
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log("Error in query : " + err)
        }

        cb(rows);
    });
}