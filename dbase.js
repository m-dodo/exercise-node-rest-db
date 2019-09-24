var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE athletes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            sex TEXT,
            age INTEGER, 
            discipline TEXT
            )`,
        (err) => {
            if (err) {     
            } else {
                var insert = 'INSERT INTO athletes (name, sex, age, discipline) VALUES (?,?,?,?)';
                db.run(insert, ["Eliud Kipchoge","M",1984,"marathon"]);
                db.run(insert, ["Sandra Perkovic","F",1990,"discus throw"]);
                db.run(insert, ["Ivan Milinkovic","M",1981,"marathon"]);
                db.run(insert, ["Tea Faber","F",1989,"marathon"]);
                db.run(insert, ["Usain Bolt","M",1986,"100m"]);
                db.run(insert, ["Semenya Caster","F",1988,"800m"]);
                db.run(insert, ["Paul Tergat","M",1962,"800m"]);
                db.run(insert, ["Biljana Cvijanovic","F",1987,"800m"]);
                db.run(insert, ["Goran Grdenic","M",1990,"marathon"]);
                db.run(insert, ["Anna Calos","F",1991,"100m"]);
                db.run(insert, ["Vladimir Putin","M",1984,"discus throw"]);
                db.run(insert, ["Svetlana Medvedev","F",1997,"discus throw"]);
                db.run(insert, ["Sage Canaday","M",1989,"100m"]);
                db.run(insert, ["Sofia Loren","F",1994,"100m"]);
            }
        });  
    }
});


module.exports = db;