import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import handlebars from "express-handlebars";
import FileStore from "session-file-store";
import sessionRouter from 2.
import MongoStore from "connect-mongo";

//import MongoStore from "connect-mongo";
//como conectaremos session con lo que sera nuestro filestore
const fileStorage = FileStore(session)

const app = express();
const PORT = 8080;

//midlewares
app.use(express.json());// permite tomar datos del body
app.use(express.urlencoded({ extended: true }));//toma los queryparams de la url
app.use(cookieParser());// va a intaractuar ocn las cokkis
 /*** session recibe un objeto,* ttl timepo vida de session* 
  * paht ruta eçdonde stara la carpeta donde se lamacen sesion
  * retries tiempo de veces que el servidor tratar de leer el archivo
  * */
app.use(
  session({
    //store: new fileStorage({path:'./session', ttl:100, retrie:0}),
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://salvagerar:G3rard0@coderhouse.vwdjz98.mongodb.net/?retryWrites=true&w=majority&appName=Coderhouse",
      mongoOptions: {},
      ttl: 15,
    }),
    secret: "abc123",
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/', (req,res)=>{
 if(req.session.views){
  req.session.view++;
  res.send(`<p>Vistas: ${req.session.view}</p>`);
 }else{
  req.session.views = 1;
  res.send("benvenuto per prima volta, actualiza para contar las visitas")
 }
 console.log("sesion:", req.session);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


/*
mongodb+srv://salvagerar:G3rard0@coderhouse.vwdjz98.mongodb.net/?retryWrites=true&w=majority&appName=Coderhouse
*/