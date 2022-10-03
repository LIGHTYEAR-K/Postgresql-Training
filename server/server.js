const express=require('express');
const app=express();
const db = require("./db");
const cors = require("cors");



app.use(cors());
app.use(express.json());


app.get("/api",async(req, res) => {
    try {
        const result=await db.query("SELECT * FROM year");
        res.json(result.rows);
        
    } catch (err){
        console.error(err.message)
    }

})
app.get("/api/:log_id",async(req, res) => {
    try {
        console.log(req.params.logid)
        const result=await db.query('select * from year where logid=$1' ,[req.params.logid]);

    } catch (err){
        console.log("error")
    }

})
app.post("/api",async(req, res) => {
    try {
        const result=await db.query('insert into year (logs,status)values($1,$2) RETURNING *',[req.body.logs,req.body.status]);
        console.log(result)
        res.status(200).json({
            status:'Good',
            body:{
               data: result.rows[0],
            }
        })

    } catch (err){
        console.error(err.message)
    }

})
app.delete("/api/:logid", async (req, res) => {
    try {
      const { logid } = req.params;
      const result = await db.query("DELETE FROM year WHERE logid = $1", [
        logid
      ]);
      res.json("Log was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  app.put("/api/:logid", async (req, res) => {
    try {
      const { logid } = req.params;
      const { logs} = req.body;
      const updateTodo = await db.query(
        "UPDATE year SET logs = $1 WHERE logid = $2",
        [logs, logid]
      );
  
      res.json("LOg was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
    

 app.listen(4000,()=>console.log('server started at 4000'))