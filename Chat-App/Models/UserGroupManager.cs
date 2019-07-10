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

        public IEnumerable<UserGroup> GetUsersInGroup(int groupId)
        {
            return _repositoryContext.UserGroups.Where(userGroup => userGroup.GroupId == groupId);
        }

        public IEnumerable<UserGroup> GetGroupsOfUser(int userId)
        {
            return _repositoryContext.UserGroups.Where(userGroup => userGroup.UserId == userId);
        }

        public UserGroup Find(int userId, int groupId)
        {
            var returnUg = new UserGroup();
            try
            {
                 returnUg =
                    _repositoryContext.UserGroups.FirstOrDefault(ug => ug.UserId == userId && ug.GroupId == groupId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            var test = new UserGroup();
            return returnUg;
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

            _repositoryContext.UserGroups.Add(entity);
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