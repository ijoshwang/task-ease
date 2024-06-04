using MongoDB.Driver;
using TodoAPI.Data;
using TodoAPI.Models;

namespace TodoAPI.Services;

public class UserService : IUserService
{
    private readonly IMongoCollection<User> _usersCollection;

    public UserService(TodoContext context)
    {
        _usersCollection = context.Users;
    }

    public User Authenticate(string name, string password)
    {
        var user = _usersCollection.Find(user => user.Name == name && user.Password == password).FirstOrDefault();
        return user;
    }
}
