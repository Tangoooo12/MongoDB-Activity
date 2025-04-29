// index.js - MongoDB Movie Database Example
import { MongoClient } from 'mongodb';

// Connection URI (replace with your actual connection string if using Atlas)
const uri = "mongodb://localhost:27017";
// For MongoDB Atlas, use: "mongodb+srv://<username>:<password>@cluster0.mongodb.net/movieDB"

// Database Name
const dbName = 'movieDB';

async function main() {
  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB server");
    
    // Access the movieDB database
    const db = client.db(dbName);
    
    // Get the movies collection
    const moviesCollection = db.collection('movies');
    
    // CRUD Operations Examples
    
    // 1. Create - Insert movies
    const insertResult = await moviesCollection.insertMany([
      {
        title: "Inception",
        director: "Christopher Nolan",
        year: 2010,
        genre: "Sci-Fi",
        rating: 8.8
      },
      {
        title: "The Matrix",
        director: "Lana Wachowski",
        year: 1999,
        genre: "Action",
        rating: 8.7
      },
      {
        title: "Interstellar",
        director: "Christopher Nolan",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.6
      }
    ]);
    console.log(`${insertResult.insertedCount} movies were inserted`);
    
    // 2. Read - Find all movies
    const allMovies = await moviesCollection.find({}).toArray();
    console.log("All movies:");
    console.log(allMovies);
    
    // Find movies by director
    const nolanMovies = await moviesCollection.find({ director: "Christopher Nolan" }).toArray();
    console.log("Christopher Nolan movies:");
    console.log(nolanMovies);
    
    // Find movies with rating > 8.7
    const highRatedMovies = await moviesCollection.find({ rating: { $gt: 8.7 } }).toArray();
    console.log("Movies with rating > 8.7:");
    console.log(highRatedMovies);
    
    // 3. Update - Update a movie's rating
    const updateResult = await moviesCollection.updateOne(
      { title: "Interstellar" },
      { $set: { rating: 8.9 } }
    );
    console.log(`${updateResult.modifiedCount} movie was updated`);
    
    // 4. Delete - Delete a movie
    const deleteResult = await moviesCollection.deleteOne({ title: "The Matrix" });
    console.log(`${deleteResult.deletedCount} movie was deleted`);
    
    // Verify the final state
    const finalMovies = await moviesCollection.find({}).toArray();
    console.log("Final state of movies collection:");
    console.log(finalMovies);

    require('dotenv').config();
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
    
  } finally {
    // Close the connection
    await client.close();
    console.log("MongoDB connection closed");
  }
}

// Run the main function and handle errors
main().catch(console.error);
