const {MongoClient} = require('mongodb');
//const User = require('./models/user'); // Importez votre modèle utilisateur

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'USMBRO';

const client = new MongoClient(url, { useUnifiedTopology: true });

//Ajoute de la donnée dans la bdd 
async function addData() {
  try{
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const collection = db.collection('users');

    const newUser = {nom: "Emilien", prenom: "BOITOUZET", filiere: "CMI-INFO"};
    const result = await collection.insertOne(newUser);
    console.log('New user created with the following id:', result);

  } catch (err) {
    console.error('Erreur lors de l\'ajout de données :', err);
  }finally{
    client.close();
  }
}

//Trouve une donnée dans la base de donnée 
async function findData(){
  try{
    await client.connect()
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const collection = db.collection('users');

    const result = await collection.find({nom: "Doe"}).toArray();
    console.log('Found the following records:');
    console.log(result);
  }catch(err){
    console.error('Erreur lors de la recherche de données :', err);
  }finally{
    client.close();
  }
}

async function findAllDate(){
  try{
    await client.connect()
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const collection = db.collection('users');

    const result = await collection.find().toArray();
    console.log('Found the following records:');
    console.log(result);
  }catch(err){
    console.error('Erreur lors de la recherche de données :', err);
  }finally{
    client.close();
  }
}

async function deleteData(){
  try{
    await client.connect()
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const collection = db.collection('users');

    const result = await collection.deleteOne({nom: "Emilien"});
    console.log('Donnée supprimée :');
    console.log(result);
  }catch(err){
    console.error('Erreur lors de la suppressions de données :', err);
  }finally{
    client.close();
  }
}

console.log("Ajout données :");
addData();
console.log("Recherche données :");
//findData();
console.log("Recherche toutes les données :");
//findAllDate();
//deleteData();