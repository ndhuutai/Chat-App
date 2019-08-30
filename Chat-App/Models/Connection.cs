using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Chat_App.Models
{
    public class Connection
    {
        [Key]
        public string ConnectionId { get; set; }
        public User User { get; set; }
    }
}