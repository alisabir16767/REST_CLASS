const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const metodeOverride=require("method-override")

// Remove redundant express.urlencoded() middleware
app.use(express.urlencoded({ extended: true }));
app.use(metodeOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Correct the use of express.static() method
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
      id:uuidv4(),
        username: "sabir",
        content: "i love codding"
    },
    {   id:uuidv4(),
        username: "ali",
        content: "i love singing"
    },
    {
        id:uuidv4(),
        username: "rahul",
        content: "i got selected for my first internship"
    }
];

// Fix the order of parameters in the callback function for the "/" route
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new",(req,res)=>{
   res.render("new.ejs",)
});

app.post("/posts", (req, res) => {
   let {username,content}=req.body;
   let id=uuidv4();
   posts.push({id,username,content});
   res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
   let {id}=req.params;
   let post=posts.find((p)=>id===p.id);
   res.render("show.ejs",{post});
   });

   app.patch("/posts/:id", (req, res) => {
      let { id } = req.params;
      let newContent=req.body.content;
      let post=posts.find((p)=>id===p.id);

         post.content=newContent;
      console.log(post); 
      res.redirect("/posts");
  });
  app.get("/posts/:id/edit",(req,res)=>{
   let { id } = req.params;
  let post=posts.find((p)=>id===p.id);
  res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
   let { id } = req.params;
    posts=posts.filter((p)=>id!==p.id);
res.redirect("/posts");
})
  

app.listen(port, () => {
    console.log("Listening to port 8080");
});
