using System;
using System.Collections.Generic;
using System.Linq;

namespace Chat_App.Models
{
    class ConnectionManager : IDataRepository<Connection>
    {
        private readonly RepositoryContext _context;

        public ConnectionManager(RepositoryContext context)
        {
            _context = context;
        }
        public IEnumerable<Connection> GetAll()
        {
            return _context.Connections.ToList();
        }

        public Connection Get(long id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Connection> GetConnectionsBySub(string sub)
        {
            return _context.Connections.Where(connection => connection.User.Sub == sub).ToList();
        }

        public long Add(Connection entity)
        {
            _context.Connections.Add(entity);
            return _context.SaveChanges();
        }

        public void Update(Connection userInDb, Connection entity)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(Connection entity)
        {
            _context.Connections.Remove(entity);
            _context.SaveChanges();
        }
    }
}