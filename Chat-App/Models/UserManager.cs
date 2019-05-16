﻿using System;
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

        public long Add(User user)
        {
            _repositoryContext.Users.Add(user);
            _repositoryContext.SaveChanges();
            return user.Id;
        }

        public void Update(User userInDB, User user)
        {
            userInDB.GroupName = user.GroupName;
           
            _repositoryContext.SaveChanges();
        }

        public void Delete(User user)
        {
            _repositoryContext.Remove(user);
        }

    }
}
