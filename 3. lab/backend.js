const express = require("express");
const app = express();
const pool = require("./index.js")
const hateoasLinker = require('express-hateoas-links');

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

app.get("/teamsList/:ime", async (req, res) => {
   const {
      ime
   } = req.params;
   try {
      const ekipa = await pool.query("SELECT * FROM data WHERE 'Ime ekipe' LIKE '%"+ req.params.ime+ "%'")
      var responseTeam;
      
      if (ekipa.rowCount == 0) {
        responseTeam = {
            "status": "Not Found",
            "message": "Ekipa sa zadanim imenom ne postoji",
            "response": null
        }
         res.status(404);
      }
      else {
         var responseTeam = {
            "status": "OK",
            "message": "Ekipa je dohvaćena",
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
    const teamsListOld = await pool.query("SELECT * from data ORDER BY 'Godina osnutka' LIMIT '%"+ req.params.broj + "%'");

    var responseTeamsListOld = {
        "status": "OK",
        "message": "Dohvaćeni svi timovi.",
        "response": {
            "ekipe": teamsListOld.rows,
            "links": [
                {
                  "href": "/teamsList",
                  "rel": "ekipe",
                  "type": "GET"
               }
            ]
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
      const ekipe = await pool.query("SELECT * FROM data WHERE 'Savezna drzava' LIKE '%"+ req.params.state+ "%'")
      var responseTeams;
      
      if (ekipe.rowCount == 0) {
        responseTeams = {
            "status": "Not Found",
            "message": "Ekipe u zadanoj saveznoj drzavi ne postoje",
            "response": null
        }
         res.status(404);
      }
      else {
         var responseTeams= {
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
      const ekipe = await pool.query("SELECT * FROM data WHERE 'Savezna drzava' LIKE '%"+ req.params.grad+ "%'")
      var responseTeams;
      
      if (ekipe.rowCount == 0) {
        responseTeams = {
            "status": "Not Found",
            "message": "Ekipe u zadanom gradu ne postoje",
            "response": null
        }
         res.status(404);
      }
      else {
         var responseTeams= {
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
      const ekipa = await pool.query("SELECT * FROM data WHERE 'Ime ekipe' LIKE '%"+ req.params.ime+ "%'")
      var responseTeam;
      
      if (ekipa.rowCount == 0) {
        responseTeam = {
            "status": "Not Found",
            "message": "Ekipa sa zadanim imenom ne postoji",
            "response": null
        }
         res.status(404);
      }
      else {
        const deleteTeam = await pool.query("DELETE FROM data WHERE 'Ime ekipe' LIKE '%"+ req.params.ime+ "%'");
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
            const newTeam = await pool.query("INSERT INTO data ('Ime ekipe', 'Grad', 'Savezna drzava', 'Wikipedia Stranica') VALUES ('"+ ime+ "', '%"+ grad+ "', '"+ state+ "', '"+ stranica+ "') RETURNING *");

            var responseTeamNew = {
                "status": "Kreirano",
                "message": "Ekipa je dodana.",
                "response": {
                "ekipa": newTeam.rows[0],
                "links": [
                    {
                     "href": "/teamsList",
                     "rel": "ekipe",
                     "type": "GET"
                   }
                ]
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
        
        
        
        const ekipa = await pool.query("SELECT * FROM data WHERE 'Ime ekipe' LIKE '%"+ req.params.ime+ "%'")
        var responseTeam;
      
         if (ekipa.rowCount == 0) {
          responseTeam = {
             "status": "Not Found",
             "message": "Ekipa sa zadanim imenom ne postoji",
            "response": null
         }
         res.status(404);
         }
         else {
             var updateTeam;
             
            if (arena != undefined) {
                updateTeam = await pool.query("UPDATE data SET 'Arena' = '"+ arena+ "' WHERE 'Ime ekipe' LIKE '%"+ req.params.ime+ "%'");
            }
             
            if (kapacitet != undefined) {
                updateTeam = await pool.query("UPDATE data SET 'Kapacitet' = '"+ kapacitet+ "' WHERE 'Ime ekipe' LIKE '%"+ req.params.ime+ "%'");
            }
             
            if (trener != undefined) {
                updateTeam = await pool.query("UPDATE data SET 'Trener' = '"+ trener+ "' WHERE 'Ime ekipe' LIKE '%"+ req.params.ime+ "%'");
            }
             
            if (arena != undefined) {
                updateTeam = await pool.query("UPDATE data SET 'Vlasnistvo' = '"+ vlasnistvo+ "' WHERE 'Ime ekipe' LIKE '%"+ req.params.ime+ "%'");
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

app.use((req, response, next) => {
    response.status(501)
    response.json({
        status: 'Nije implemntirano',
        message: 'Nije implementirana metoda za zadani zahtjev',
        response: null
    });
});

app.listen(3000, '127.0.0.1');