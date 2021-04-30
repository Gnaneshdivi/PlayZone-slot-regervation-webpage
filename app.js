const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { nanoid } = require("nanoid");
const mysql = require("./src/sql");
const response = require("./src/responce");
const app = express();
app.use(express.static(path.join(__dirname, "/src")));
app.use(bodyParser.json({ limit: "3mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.all("/", (req, res) => {
  res.status(404).send({
    code: 404,
    message: "Request doesn't exist, check url or try changing http method",
  });
});

//////signup   
app.all('/usersignup', function (req, res) {
  if (req.body.name == '' || req.body.phone == '' || req.body.password == '' || req.body.id == '' || req.body.name == null || req.body.phone == null || req.body.password == null || req.body.id == null) {
    response(res, 200, "Bad Call");
  }
  else {
    console.log('success');
    mysql.query("insert into user(name,phone_no,age,password,address,bookings,mailid) VALUES(?,?,?,?,?,?,?)", [req.body.name, req.body.phone, 0, req.body.password, '', '', req.body.id], function (err, result) {

      if (err) {
        response(res, 200, false);
        throw err
      }
      else {
        response(res, 200, true);
        console.log('User Created');
      };

    });
  }
});
///////
app.all('/msignup', function (req, res) {
  if (req.body.name == '' || req.body.phone == '' || req.body.password == '' || req.body.id == '' || req.body.address == '' || req.body.name == null || req.body.phone == null || req.body.password == null || req.body.id == null || req.body.address == null) {
    response(res, 200, "Bad Call");
  }
  else {
    console.log('success');
    mysql.query("insert into courtm(courtname,address,types,mailid,password,phone) VALUES(?,?,?,?,?,?)", [req.body.name, req.body.address, '', req.body.id, req.body.password, req.body.phone], function (err, result) {

      if (err) {
        response(res, 200, false);
        throw err;

      }
      else {
        console.log('User Created');
        response(res, 200, true);
      };

    });

  }
});
///////
app.all('/addcourt', function (req, res) {
  mysql.query("Create Table " + req.body.name + req.body.id + " (date int not null,10AM_11AM BIT DEFAULT 0,11AM_12PM BIT DEFAULT 0,12PM_1PM BIT DEFAULT 0,2PM_3PM BIT DEFAULT 0,3PM_4PM BIT DEFAULT 0,4PM_5PM BIT DEFAULT 0)", function (err, result) {
    if (err) {
      response(res, 200, false);
      throw err;

    }
    else {
      for (var i = 1; i <= 30; i++) {
        mysql.query("insert into " + req.body.name + req.body.id + " values(" + i + ",0,0,0,0,0,0);", function (err, result) {
        });
      }
      mysql.query(`update courtm set types='${req.body.name + req.body.id}' where mailid='${req.body.email}'`, function (err, result) {
        if (err) {

          throw err;

        }
      });
      mysql.query("insert into courts(courtid,mailid,type,address,phonenumber) VALUES(?,?,?,?,?)", [req.body.name + req.body.id, req.body.email, req.body.type, req.body.address, req.body.phone], function (err, result) {
        if (err) {

          throw err;

        }

      });
      console.log('done');

      response(res, 200, true);

    }
  });
});
/////
app.all('/userlogin', function (req, res) {
  if (req.body.password == '' || req.body.id == '' || req.body.password == null || req.body.id == null) {
    response(res, 200, false);
  }
  else {
    mysql.query("SELECT password FROM user WHERE mailid='" + req.body.id + "'", function (err, result) {

      if (err) {
        response(res, 200, false);
        throw err;

      }
      else {
        console.log(result);
        response(res, 200, result);
      };

    });
  }
});
app.all('/mlogin', function (req, res) {
  if (req.body.password == '' || req.body.id == '' || req.body.password == null || req.body.id == null) {
    response(res, 200, false);
  }
  else {
    mysql.query("SELECT password FROM courtm WHERE mailid='" + req.body.id + "'", function (err, result) {

      if (err) {
        response(res, 200, false);
        throw err;

      }
      else {
        console.log(result);
        response(res, 200, result);
      };

    });
  }
});
app.all('/search', function (req, res) {
  if (req.body.type == '' || req.body.type == null) {
    mysql.query("SELECT * FROM courts", function (err, result) {

      if (err) {
        response(res, 200, false);
        throw err;

      }
      else {
        console.log(result);
        response(res, 200, result);
      };

    });
    
  }
  else {
    mysql.query("SELECT * FROM courts WHERE type='" + req.body.type + "'", function (err, result) {

      if (err) {
        response(res, 200, false);
        throw err;

      }
      else {
        console.log(result);
        response(res, 200, result);
      };

    });
  }
});
app.all('/slotsearch', function (req, res) {
  if (req.body.date == '' || req.body.id == '' || req.body.date == null || req.body.id == null) {
    response(res, 200, "slipped");
  }
  else {
    mysql.query(`select * from ${req.body.id} where date=${req.body.date} `, function (err, result) {

      if (err) {
        response(res, 200, false);
        throw err;

      }
      else {
        console.log(result);
        response(res, 200, result);
      };

    });
  }
});
app.all('/msearch', function (req, res) {
  if (req.body.id == '' || req.body.id == null) {
    response(res, 200, "slipped");
  }
  else {
    mysql.query(`select * from courts where mailid='${req.body.id}' `, function (err, result) {

      if (err) {
        response(res, 200, false);
        throw err;

      }
      else {
        console.log(result);
        response(res, 200, result);
      };

    });
  }
});
app.all('/bookslot', function (req, res) {
  if (req.body.date == '' || req.body.id == '' ||req.body.slot == '' || req.body.slot == null|| req.body.date == null || req.body.id == null) {
    response(res, 200, "slipped");
  }
  else {
    mysql.query(`update ${req.body.id} set ${req.body.slot}=1 where date =${req.body.date}`, function (err, result) {

      if (err) {
        response(res, 200, false);
        throw err;

      }
      else {
        response(res, 200, true);
      };

    });
  }
});
app.all('/edit', function (req, res) {
  if (req.body.tname == '' || req.body.id == '' || req.body.idd == '' || req.body.field==''||req.body.value == '' ||req.body.tname == null || req.body.id == null || req.body.idd == null || req.body.field==null||req.body.value == null) {
    response(res, 200, "slipped");
  }
  else {
    mysql.query(`update ${req.body.tname} set ${req.body.field}='${req.body.value}' where ${req.body.idd} ='${req.body.id}'`, function (err, result) {

      if (err) {
        response(res, 200, false);
        throw err;

      }
      else {
        response(res, 200, true);
      };

    });
  }
});

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server is up and running on port " + PORT);
});