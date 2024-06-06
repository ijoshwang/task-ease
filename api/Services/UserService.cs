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

    public async Task<User> AuthenticateAsync(string name, string password)
    {
        var user = await _usersCollection.Find(user => user.Name == name && user.Password == password).FirstOrDefaultAsync();
        return user;
    }
}