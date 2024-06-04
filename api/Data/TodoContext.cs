using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TodoAPI.Models;
using System;

namespace TodoAPI.Data;

public class TodoContext
{
    private readonly IMongoDatabase _database;

    public TodoContext(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);

        // Test MongoDB connection and print out some data
        TestConnection();
    }

    public IMongoCollection<Todo> Todos => _database.GetCollection<Todo>("todos");
    public IMongoCollection<User> Users => _database.GetCollection<User>("users");

    private void TestConnection()
    {
        try
        {
            var users = Users.Find(user => true).Limit(5).ToList();
            Console.WriteLine("Successfully connected to MongoDB. Sample user data:");
            foreach (var user in users)
            {
                Console.WriteLine($"User Id: {user.Id}, Name: {user.Name}, Password: {user.Password}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error connecting to MongoDB: {ex.Message}");
        }
    }
}

public class MongoDbSettings
{
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
}