const mongoose = require("mongoose");

// connecting with mongoDB 
mongoose.connect("mongodb://127.0.0.1:27017/soal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then ( () => console.log("Connection Successful"))
.catch ( (err) => console.log(err));

// Schema
// A mongoose shema defines the structure of the document,
// defualt values, validators, etc...

 const playlistSchema = new mongoose.Schema({
    name: { 
            type:String,
            required:true  
    },
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    date: {
        type:Date,
        default:Date.now
    }
});

// A Mongoose model is a wrapper on the mongoose schema
// a mongoose schema defines the structure of the document,
// defualt values, validators, etc.. ,whereas a Mongoose Model
// provides an interface to the database for creating,
// querying , updating , deleting records etc...

// Collection Creation
const Playlist = new mongoose.model("Playlist", playlistSchema);

// Create Document Or Insert Data
const creatDocument = async () => {
    try
    {
        const nodejsPlayList = new Playlist({
            name: "Node Js",
            ctype:"BackEnd",
            videos:50,
            author:"Tushar",
            active:true,
        })
        
        const jsPlayList = new Playlist({
            name: "JavaScript",
            ctype:"FronEnd",
            videos:80,
            author:"Tushar",
            active:true,
        })

        const mongoosePlayList = new Playlist({
            name: "Mongoose",
            ctype:"BackEnd",
            videos:48,
            author:"Tushar",
            active:true,
        })

        const postgresPlayList = new Playlist({
            name: "PostGres Database",
            ctype:"BackEnd",
            videos:60,
            author:"Tushar",
            active:true,
        })

        const result = await Playlist.insertMany([nodejsPlayList, jsPlayList, mongoosePlayList, postgresPlayList]);
        console.log(result);
    } catch
    {
        (err) => console.log(err)
    };
}

// creatDocument();

const getDocument = async () =>{
    try
    {   const result = await Playlist.find({ctype: {$in: ["BackEnd", "Database"]}})
        .select({_id:0, name:1})
        .sort({ name: 1 });
        // .countDocuments();
        console.log(result);
    } catch(err){
        console.log(err);
    }
}

// getDocument();

// Update The Document
const updateDocument = async (_id) => {
    try{
        const result = await Playlist.findByIdAndUpdate({_id}, {
            $set: 
                {
                    name: "JavaScript"
                }
        })
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}

// updateDocument("60a77004e448cf27ac0456f4");

// Delete The Document
const deleteDocument = async (_id) => {
    try{
        const result = await Playlist.findByIdAndDelete({_id});
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}

deleteDocument("60a76d4ab270f53de808c6a2");