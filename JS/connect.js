const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('../DB/main.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});
db.serialize(() => {
  db.each(`SELECT numper as id,
                  name as name,
                  password as password
           FROM admins`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name + "\t" + row.password);
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});