const mongoose = require('mongoose');
const secret = 'mysecretsshhh';
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const exjwt = require('express-jwt');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// authentication middlware
// const jwtMW = require('./middleware');
const app = express();

/*========= Here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization' ============*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// mongoose models    .
const { Sacco, Rider, UserModel } = require('./db.models.js');

const _eval = require('eval');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// require('babel-polyfill');

const ObjectId = require('mongodb').ObjectID;

const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever',
});

// an instance of express

const db = require('./keys').mongodbURI;

// admin login endpoint
app.post('/api/register', async (request, response) => {
  try {
    const user = new UserModel(request.body);
    const result = await user.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error.message);
  }
});
// check our token if it is true
app.get('/checkToken', jwtMW, function(req, res) {
  res.sendStatus(200);
});

// admin login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('User submitted: ', email, password);

  UserModel.findOne({ email: email }).then(user => {
    console.log('User Found: ', user);
    if (user === null) {
      res.json(false);
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        console.log('Valid!');
        let token = jwt.sign({ email: user.email }, 'keyboard cat 4 ever', {
          expiresIn: 129600,
        }); // Signing the token
        res.json({
          sucess: true,
          err: null,
          token,
        });
      } else {
        console.log('Entered Password and Hash do not match!');
        res.status(401).json({
          sucess: false,
          token: null,
          err: 'Entered Password and Hash do not match!',
        });
      }
    });
  });
});

app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
  console.log('Web Token Checked.');
  res.send('You are authenticated'); //Sending some response when authenticated
});

// app.get('/checkToken', jwtMW, function (req, res) {
//   res.sendStatus(200);
// });

app.get('/', (req, res) => {
  res.json('this is our first server page');
});

app.post('/api/riders', (req, res) => {
  if (req.body.insurance.issue_date)
    req.body.insurance.issue_date = new Date(req.body.insurance.issue_date);
  const newRider = new Rider(req.body);
  newRider
    .save()
    .then(rider => {
      console.log({ message: 'The rider was added successfully' });
      res.status(200).json({ rider });
    })
    .catch(error => {
      res.status(400).send({ message: `Unable to add the rider: ${error}` });
    });
});

/* GET ALL RIDERS */
app.get('/api/riders', (req, res) => {
  Rider.find()
    .then(rider => {
      if (!rider)
        res.status(404).json({ message: 'No avilable Riders in the system' });
      else res.json(rider);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

/* GET SINGLE RIDER BY ID */
app.get('api/riders/:id', (req, res) => {
  let ridersId;
  try {
    ridersId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(400).send({ message: `Invalid riders ID:${ridersId}` });
  }
  Rider.findById({ _id: ridersId })
    .then(rider => {
      if (!rider)
        res.status(404).json({ message: `No such Rider: ${ridersId}` });
      else res.json(rider);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

/* SAVE RIDERS */
app.post('api/riders', (req, res) => {
  const newRider = req.body;

  Rider.create(newRider)
    .then(result => {
      Rider.findById({ _id: result.insertedId }).then(addedRider => {
        res.json(addedRider);
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

/* UPDATE PRODUCT */
app.put('api/riders/:id', (req, res) => {
  let ridersId;
  try {
    ridersId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(400).send({ message: `Invalid riders ID:${ridersId}` });
  }
  const newRider = req.body;
  Rider.findByIdAndUpdate({ _id: ridersId }, newRider)
    .find({ _id: ridersId })
    .then(updatedRider => {
      res.json(updatedRider);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: `Unable to update the riders information ${err}` });
    });
});

/* DELETE PRODUCT */
app.delete('api/riders/:id', (req, res) => {
  let ridersId;
  try {
    ridersId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(400).send({ message: `Invalid riders ID:${ridersId}` });
  }
  // THE REQ.BODY IS OPTIONAL INTHE FINDBYIDANREMOVE METHOD
  Rider.findByIdAndRemove({ _id: ridersId }, req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log({ message: `Unable to delelete the riders profile ${err}` });
    });
});
// THIS IS THE SACCOS APIS
// get all saccos
app.get('/api/saccos', (req, res) => {
  const { status, dateLte, dateGte } = req.query; // destructuring
  console.log(new Date(dateLte));
  console.log(new Date(dateGte));
  if (status) {
    Sacco.find()
      .where('status')
      .equals(status)
      .sort({ created: -1 })
      .exec()
      .then(saccos => {
        res.status(200).json(saccos);
        console.log(saccos);
      })
      .catch(err => {
        res.send(`Internal server error${err.stack}`).status(400);
      });
  } else if (dateGte && dateLte) {
    Sacco.find()
      .where('created')
      .gt(new Date(dateGte))
      .lt(new Date(dateLte))
      .sort({ created: -1 })
      .exec()
      .then(saccos => {
        res.status(200).json(saccos);
        console.log(saccos);
      })
      .catch(err => {
        res.send(`Internal server error${err.stack}`).status(400);
      });
  } else {
    Sacco.find()
      .sort({ created: -1 })
      .exec()
      .then(saccos => {
        res.status(200).json(saccos);
        console.log(saccos);
      })
      .catch(err => {
        res.send(`Internal server error${err.stack}`).status(400);
      });
  }
});
app.get('/api/saccos/:id', (req, res) => {
  // parameter
  let saccoId;
  try {
    saccoId = req.params.id;
    console.log(saccoId);
  } catch (error) {
    res.json({ message: `Invalid sacco id ${error}` });
  }

  Sacco.findById({ _id: saccoId })
    .then(sacco => {
      res.json(sacco).status(200); // this a single object rbeing returned
    })
    .catch(err => {
      res.send(`Internal server error${err}`).status(400);
    });
});

// post api
app.post('/api/saccos', (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  const newSacco = new Sacco(req.body);
  // if (!new_sacco._id) new_sacco._id = Schema.Types.ObjectId;
  newSacco
    .save()
    .then(sacco => {
      console.log({ message: 'The sacco was added successfully' });

      // creating a nodemailer test account
      nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
<h3>Login Details</h3>
<ul>
<li>email:${email}</li>
<li>password:${password}</li>
</ul>
`;
        // the accoutn that will be sending the mails
        let transporter = nodemailer.createTransport({
          host: 'stmp.gmail.com',
          port:465,
          secure:false,
          service: 'gmail',
          auth: {
            user: '#######@gmail.com',
            pass: '#######',
          },
        });

        // mail options
        let mailOptions = {
          from: `#######@gmail.com`,
          to: email,
          subject: 'Fika-Safe',
          html: htmlEmail,
        };

        // initiating the nodemailer sending options
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) throw err;
          console.log(info);
        });
      });

      res.status(200).json({ sacco });
    })
    .catch(err => {
      res.status(400).send({ message: `Unable to add the sacco: ${err}` });
    });
});

app.delete('/api/saccos/:id', jwtMW, (req, res) => {
  let saccosId;
  try {
    saccosId = req.params.id;
    console.log(saccosId);
  } catch (error) {
    res.status(400).send({ message: `Invalid saccos ID:${saccosId}` });
  }
  // THE REQ.BODY IS OPTIONAL INTHE FINDBYIDANREMOVE METHOD
  Sacco.findByIdAndRemove({ _id: saccosId })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log({ message: `Unable to delelete the saccos profile ${err}` });
    });
});

app.put('/api/saccos/:id', (req, res) => {
  let saccosId;
  console.log(req.params.id);
  try {
    saccosId = req.params.id;
  } catch (error) {
    res.status(400).send({ message: `Invalid saccos ID:${saccosId}` });
  }
  const newSacco = req.body;

  Sacco.findByIdAndUpdate({ _id: saccosId }, newSacco, {
    returnNewDocument: true,
    new: true,
    strict: false,
  })
    .find({ _id: saccosId })
    .then(updatedSacco => {
      res.json(updatedSacco);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: `Unable to update the saccos information ${err}` });
    });
});

// creating a connection to mongoose
// 'mongodb://localhost/fika-safe'
mongoose
  .connect('mongodb://localhost/fika-safe', { useNewUrlParser: true })
  .then(() => {
    app.listen(4000, () => {
      console.log('Listening on port 4000');
    });
  })
  .catch(error => {
    console.log({
      message: `Unable to establish a connection to the server ${error}`,
    });
  });
