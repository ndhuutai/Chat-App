using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat_App.Models
{
    public interface IDataRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(long id);
        long Add(TEntity entity);
        void Update(TEntity userInDb, TEntity entity);
        void Delete(TEntity entity);
    }
}
