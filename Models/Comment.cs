using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Chat_App.Models
{
    public class Comment
    {
        public long Id { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }

        public String AvatarUrl { get; set; }
        public long UserId { get; set; }

        public User User { get; set; }
    }
}
