const express = require("express");
const app = express();
const pool = require("./index.js")
const fetch = require('node-fetch');
const hateoasLinker = require('express-hateoas-links');
const request = require('request');
var fs = require('fs');
var http = require('http');

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   if ('OPTIONS' == req.method) {
      res.sendStatus(200);
   } else {
      next();
   }
});

var download = function (uri, filename, callback) {
   request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
   });
};

app.use(express.json());

app.get("/teamsList", async (req, res) => {
   try {
      const teamsList = await pool.query("SELECT * FROM data");

      var responseTeamsList = {
         "status": "OK",
         "message": "Dohvaćeni svi timovi.",
         "response": {
            "ekipe": teamsList.rows,
         }
      }
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(responseTeamsList);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.get("/teamsList/:id", async (req, res) => {
   const {
      id
   } = req.params;
   try {
      const ekipa = await pool.query("SELECT * FROM data WHERE id = " + req.params.id + "")
      var responseTeam;

      if (ekipa.rowCount == 0) {
         responseTeam = {
            "status": "Not Found",
            "message": "Ekipa sa zadanim id-em ne postoji",
            "response": null
         }
         res.status(404);
      } else {
         var responseTeam = {
            "status": "OK",
            "message": "Ekipa je dohvaćena",
            "response": {
               "ekipa": ekipa.rows[0],
               "slika": "http://localhost:3000/teamsList/" + req.params.id + "/picture",
               "links": [{
                  "href": "/teamsList",
                  "rel": "ekipe",
                  "type": "GET"
               }]
            }
         }
         res.status(200);
         res.setHeader("Content-Type", "application/json");
      }
      res.json(responseTeam);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.get("/oldestTeams/:broj", async (req, res) => {
   const {
      broj
   } = req.params;
   try {
      const teamsListOld = await pool.query("SELECT * from data ORDER BY god_osnutka LIMIT '" + req.params.broj + "'");

      var responseTeamsListOld = {
         "status": "OK",
         "message": "Dohvaćeni svi timovi.",
         "response": {
            "ekipe": teamsListOld.rows,
            "links": [{
               "href": "/teamsList",
               "rel": "ekipe",
               "type": "GET"
            }]
         }
      }
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(responseTeamsListOld);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.get("/teamsList/:state", async (req, res) => {
   const {
      state
   } = req.params;
   try {
      const ekipe = await pool.query("SELECT * FROM data WHERE savezna_drzava LIKE '%" + req.params.state + "%'")
      var responseTeams;

      if (ekipe.rowCount == 0) {
         responseTeams = {
            "status": "Not Found",
            "message": "Ekipe u zadanoj saveznoj drzavi ne postoje",
            "response": null
         }
         res.status(404);
      } else {
         var responseTeams = {
            "status": "OK",
            "message": "Ekipe su dohvaćene",
            "response": {
               "ekipe": ekipe.rows,
               "links": [{
                  "href": "/teamsList",
                  "rel": "ekipe",
                  "type": "GET"
               }]
            }
         }
         res.status(200);
         res.setHeader("Content-Type", "application/json");
      }
      res.json(responseTeams);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.get("/teamsList/:grad", async (req, res) => {
   const {
      grad
   } = req.params;
   try {
      const ekipe = await pool.query("SELECT * FROM data WHERE grad LIKE '%" + req.params.grad + "%'")
      var responseTeams;

      if (ekipe.rowCount == 0) {
         responseTeams = {
            "status": "Not Found",
            "message": "Ekipe u zadanom gradu ne postoje",
            "response": null
         }
         res.status(404);
      } else {
         var responseTeams = {
            "status": "OK",
            "message": "Ekipe su dohvaćene",
            "response": {
               "ekipe": ekipe.rows,
               "links": [{
                  "href": "/teamsList",
                  "rel": "ekipe",
                  "type": "GET"
               }]
            }
         }
         res.status(200);
         res.setHeader("Content-Type", "application/json");
      }
      res.json(responseTeams);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.delete("/teamsList/:ime", async (req, res) => {
   const {
      ime
   } = req.params;
   try {
      const ekipa = await pool.query("SELECT * FROM data WHERE ime_ekipe LIKE '%" + req.params.ime + "%'")
      var responseTeam;

      if (ekipa.rowCount == 0) {
         responseTeam = {
            "status": "Not Found",
            "message": "Ekipa sa zadanim imenom ne postoji",
            "response": null
         }
         res.status(404);
      } else {
         const deleteTeam = await pool.query("DELETE FROM data WHERE ime_ekipe LIKE '%" + req.params.ime + "%'");
      }
      res.json(responseTeam);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.post("/teamsList", async (req, res) => {
   try {
      const ime = req.body.ime;
      const grad = req.body.grad;
      const state = req.body.state;
      const stranica = req.body.stranica;

      if (ime == undefined || grad == undefined || state == undefined || stranica == undefined) {
         res.sendStatus(400);
      } else {
         const newTeam = await pool.query("INSERT INTO data (ime_ekipe, grad, savezna_drzava, wiki_str) VALUES ('" + ime + "', '%" + grad + "', '" + state + "', '" + stranica + "') RETURNING *");

         var responseTeamNew = {
            "status": "Kreirano",
            "message": "Ekipa je dodana.",
            "response": {
               "ekipa": newTeam.rows[0],
               "links": [{
                  "href": "/teamsList",
                  "rel": "ekipe",
                  "type": "GET"
               }]
            }
         }
         res.status(200);
         res.setHeader("Content-Type", "application/json");
         res.json(responseTeamNew);
      }
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.put("/teamsList/:ime", async (req, res) => {
   const {
      ime
   } = req.params;
   try {
      const arena = req.body.arena;
      const kapacitet = req.body.kapacitet;
      const trener = req.body.trener;
      const vlasnistvo = req.body.vlasnistvo;

      if (arena == undefined && kapacitet == undefined && trener == undefined && vlasnistvo == undefined) {
         res.sendStatus(400);
      } else {

         const ekipa = await pool.query("SELECT * FROM data WHERE ime_ekipe LIKE '%" + req.params.ime + "%'")
         var responseTeam;

         if (ekipa.rowCount == 0) {
            responseTeam = {
               "status": "Not Found",
               "message": "Ekipa sa zadanim imenom ne postoji",
               "response": null
            }
            res.status(404);
         } else {
            var updateTeam;

            if (arena != undefined) {
               updateTeam = await pool.query("UPDATE data SET arena = '" + arena + "' WHERE ime_ekipe LIKE '%" + req.params.ime + "%'");
            }

            if (kapacitet != undefined) {
               updateTeam = await pool.query("UPDATE data SET kapacitet = '" + kapacitet + "' WHERE ime_ekipe LIKE '%" + req.params.ime + "%'");
            }

            if (trener != undefined) {
               updateTeam = await pool.query("UPDATE data SET trener = '" + trener + "' WHERE ime_ekipe LIKE '%" + req.params.ime + "%'");
            }

            if (arena != undefined) {
               updateTeam = await pool.query("UPDATE data SET vlasnistvo = '" + vlasnistvo + "' WHERE ime_ekipe LIKE '%" + req.params.ime + "%'");
            }

            var responseTeam = {
               "status": "OK",
               "message": "Ekipa je ažurirana",
               "response": {
                  "ekipa": ekipa.rows[0],
                  "links": [{
                     "href": "/teamsList",
                     "rel": "ekipe",
                     "type": "GET"
                  }]
               }
            }
            res.status(200);
         }
      }
      res.setHeader("Content-Type", "application/json");
      res.json(responseTeam);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.get("/teamsList/:id/picture", async (req, res) => {
   const {
      id
   } = req.params;
   try {
      const ekipa = await pool.query("SELECT * FROM data WHERE id = " + req.params.id + "")
      const wiki = await pool.query("select wiki_str from data where id = " + req.params.id + "")
      const pics = await pool.query("select * from pictures where id = " + req.params.id + "")

      var responseTeam;

      const time = await pool.query("select * from pictures where id = " + req.params.id + " and duration > CURRENT_TIMESTAMP::TIMESTAMP(0)  - '7 DAYS'::interval")

      var justAdded = false;
      if (ekipa.rowCount == 0) {
         responseTeam = {
            "status": "Not Found",
            "message": "Ekipa sa zadanim id ne postoji",
            "response": null
         }
         res.json(responseTeam);
         res.status(404);
      } else {

         var wiki1 = JSON.stringify(wiki.rows[0])
         wiki1 = wiki1.split(":")
         const handle = wiki1[1].substring(1, wiki1[1].length - 2)

         if (pics.rowCount == 0) {
            const newPic = await pool.query("INSERT INTO pictures (id, path, duration) VALUES (" + req.params.id + ", 'C:/Users/Kniwy/Desktop/Otvoreno računarstvo/or-labosi/4. lab/slike/" + handle + ".jpg', CURRENT_TIMESTAMP)")
            justAdded = true
         }

         if (time.rowCount == 0 || justAdded) {

            if (time.rowCount == 0) {
               const newTime = await pool.query("UPDATE pictures SET duration = CURRENT_TIMESTAMP WHERE id = " + req.params.id + "")
            }


            const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + handle;
            let pic = await (await fetch(url)).json();
            pic = JSON.parse(JSON.stringify(pic));

            const source = pic.originalimage.source
            const path = 'C:/Users/Kniwy/Desktop/Otvoreno računarstvo/or-labosi/4. lab/slike/' + handle + '.jpg'

            download(source, path, () => {
               console.log('Picture is downloaded!');
               res.sendFile('C:/Users/Kniwy/Desktop/Otvoreno računarstvo/or-labosi/4. lab/slike/' + handle + '.jpg');
            })

         } else {
            console.log("Nisam isao na wiki za ovu sliku.")
            res.sendFile('C:/Users/Kniwy/Desktop/Otvoreno računarstvo/or-labosi/4. lab/slike/' + handle + '.jpg');
         }
         res.setHeader("Content-Type", "image/jpeg")
      }
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.use((req, response, next) => {
   response.status(501)
   response.json({
      status: 'Nije implemntirano',
      message: 'Nije implementirana metoda za zadani zahtjev',
      response: null
   });
});

app.listen(3000);