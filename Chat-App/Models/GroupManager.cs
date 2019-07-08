using System.Collections.Generic;
using System.Linq;

namespace Chat_App.Models
{
    class GroupManager : IDataRepository<Group>
    {
        private readonly RepositoryContext _repositoryContext;

        public GroupManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public IEnumerable<Group> GetAll()
        {
            return _repositoryContext.Groups.ToList();
        }

        public Group Get(long id)
        {
            return _repositoryContext.Groups.FirstOrDefault(group => group.Id == id);
        }

        public long Add(Group entity)
        {
            var groupInDb = _repositoryContext.Groups.FirstOrDefault(group => group.Id == entity.Id);
            if (groupInDb != null)
            {
                return 0;
            }

            var newGroup = _repositoryContext.Groups.Add(entity);
            _repositoryContext.SaveChanges();
            return newGroup.Entity.Id;
        }

        public void Update(Group userInDb, Group entity)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(Group entity)
        {
            throw new System.NotImplementedException();
        }
    }
}