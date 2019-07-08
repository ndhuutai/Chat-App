using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chat_App.Models
{
    class UserGroupManager : IDataRepository<UserGroup>
    {
        private readonly RepositoryContext _repositoryContext;

        public UserGroupManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public IEnumerable<UserGroup> GetAll()
        {
            return _repositoryContext.UserGroups.ToList();
        }

        public UserGroup Get(long id)
        {
            throw new NotImplementedException();
        }

        public long Add(UserGroup entity)
        {
            var UserGroupInDb = _repositoryContext.UserGroups.FirstOrDefault(ug => ug.UserId == entity.UserId
                                                                                   && ug.GroupId == entity.GroupId);
            var userInDb = _repositoryContext.Users.FirstOrDefault(user => user.Id == entity.UserId);
            var groupInDb = _repositoryContext.Groups.FirstOrDefault(group => group.Id == entity.GroupId);
            if (groupInDb == null || userInDb == null || UserGroupInDb != null)
            {
                return 0;
            }
            var userGroupInDb = _repositoryContext.UserGroups.Add(new UserGroup());
            userGroupInDb.Entity.UserId = userInDb.Id;
            userGroupInDb.Entity.GroupId = groupInDb.Id;
            
            return _repositoryContext.SaveChanges();
        }

        public void Update(UserGroup userInDb, UserGroup entity)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(UserGroup entity)
        {
            throw new System.NotImplementedException();
        }
    }
}