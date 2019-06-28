using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chat_App.Models
{
    public class Group
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public String Name { get; set; }
    }
}