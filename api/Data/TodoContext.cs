using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TodoAPI.Models;

namespace TodoAPI.Data;

public class TodoContext
{
    private readonly IMongoDatabase _database;

    public TodoContext(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoCollection<Todo> Todos => _database.GetCollection<Todo>("todos");
    public IMongoCollection<User> Users => _database.GetCollection<User>("users");
}
