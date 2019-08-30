using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Chat_App.Models
{
    public class UserManager : IDataRepository<User>
    {
        private readonly RepositoryContext _repositoryContext;

        public UserManager(RepositoryContext context)
        {
            _repositoryContext = context;
        }

        public IEnumerable<User> GetAll()
        {
            return _repositoryContext.Users.ToList();
        }

        public User Get(long id)
        {
            return _repositoryContext.Users.FirstOrDefault(user => user.Id == id);
        }

        public User FindBySub(string sub)
        {
            return _repositoryContext.Users.FirstOrDefault(user => user.Sub == sub);
        }

        public long Add(User user)
        {
            _repositoryContext.Users.Add(user);
            _repositoryContext.SaveChanges();
            return user.Id;
        }

        public void Update(User userInDb, User user)
        {
            userInDb.Gender = user.Gender;
            _repositoryContext.SaveChanges();
        }

        public void Delete(User user)
        {
            _repositoryContext.Remove(user);
            _repositoryContext.SaveChanges();
        }
        
        public void AddUserToGroup(User user, Group group)
        {
            
        }

    }
}
