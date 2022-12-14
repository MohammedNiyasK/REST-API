const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const db = require("./db");


const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.set("view engine", "ejs");

app.use(express.static("public"));

const Article = db.Article;

    ////////////////////       Targetting All articles       /////////////////////

    


app
  .route("/articles")

  .get((req, res) => {
    Article.find((err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log(err);
      }
    });
  })

  .post((req, res) => {
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      if (!err) {
        res.send("succesfull");
      } else {
        res.send(err);
      }
    });
  })

  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("deleted succesfully");
      } else {
        res.send(err);
      }
    });
  });


  /////////////////       Targetting a specific articles ////////////////////////

app.route("/articles/:articleTitle")

.get(async (req,res) =>{
  
  try {
    const foundArticle =await Article.findOne({title:req.params.articleTitle})
    res.send(foundArticle)
  } catch (error) {
    res.send('Article not found on the matching title')
  }
  
})

.put((req,res) =>{
    Article.updateOne(
        {title:req.params.articleTitle},
        {$set :{title:req.body.title , content: req.body.content}},
        
        (err)=>{
            if(!err){
                res.send(' Article updated succesfully')
            }
            else{
                res.send(`error found : ${err}`)
            }
        }
        )
})

.patch(async (req,res) =>{
    try {
      const updateContent= await Article.updateOne({title:req.params.articleTitle},{$set :req.body})
      res.send('Article updated succesfully')
    } catch (error) {
      res.send(`error found : ${error}`)
    }
})

.delete(async (req,res) =>{

  try {
    await Article.deleteOne({title:req.params.articleTitle})
    res.send('Article deleted succesfully')
  } catch (error) {
    res.send(`Error found : ${error}`)
  }
  
})

app.post('/sample',(req,res) =>{
console.log(req.body)
})


app.listen(3000, () => {
  console.log("server running at port 3000");
});
