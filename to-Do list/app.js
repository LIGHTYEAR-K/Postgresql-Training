let express = require('express');
let bodyparser= require('body-parser')
let app = express();

let datas=[];

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
let options = { weekday: 'short', month: 'short', day: 'numeric' ,year:'numeric'};
let today  = new Date();
 let day=(today.toLocaleDateString("en-US", options))
  res.render('list', {http: day,inpots:datas});
});
app.post('/',(req,res)=>{
    let data=req.body.todoItem;
    datas.push(data)
    console.log(datas);
    res.redirect("/");
})


app.listen(4000, () => console.log('listening on port 4000'));





