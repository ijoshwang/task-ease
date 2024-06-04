using TodoAPI.Models;

namespace TodoAPI.Services;

public interface IUserService
{
    User Authenticate(string name, string password);
}