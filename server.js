
var express = require("express");
var app = express();
var db = require("./dbase.js");
var bodyParser = require("body-parser");
var $ = require("jquery");

app.use(express.static('ui'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000; 

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


app.get("/api/athletes/", (req, res, next) => {
    var sql = "SELECT * FROM athletes"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        } else
        res.send(rows);
      });
});

app.get("/api/athletes/:id", (req, res, next) => {
    var sql = "SELECT * FROM athletes WHERE id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        } else
        res.send(row);
      });
});

app.get("/api/athletes/:name", (req, res, next) => {
    var sql = "SELECT * FROM athletes WHERE name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        } else
        res.send(row);
      });
});

app.get("/api/athletes/:discipline", (req, res, next) => {
    var sql = "SELECT * FROM athletes WHERE discipline = ?"
    var params = [req.params.discipline]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        } else
        res.send(row);
      });
});

app.get("/api/athletes/:sex", (req, res, next) => {
    var sql = "SELECT * FROM athletes WHERE sex = ?"
    var params = [req.params.sex]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        } else
        res.send(row);
      });
});

app.post("/api/athletes/", (req, res, next) => {
    var errors=[];
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        sex: req.body.sex,
        age: req.body.age,
        discipline: req.body.discipline
    };
    var sql ='INSERT INTO athletes (name, sex, age, discipline) VALUES (?,?,?,?)';
    var params =[data.name, data.sex, data.age, data.discipline];
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message});
            return;
        } else {
        res.status(200).redirect('index.html');
        }
    });
})

app.delete("/api/athletes/:id", (req, res, next) => {
    db.run('DELETE FROM athletes WHERE id = ?', req.params.id, function (err, result) {
            if (err){
                res.status(400).json({"error": res.message});
                return;
            }
            res.json({"message":"deleted", changes: this.changes});
    });
})


app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});
