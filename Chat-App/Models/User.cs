﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Chat_App.Models
{
    public class User
    {
//        public User(string groupName, string userName,string connectionId, string avatarUrl, string gender)
//        {
//            GroupName = groupName;
//            UserName = userName;
//            ConnectionId = connectionId;
//            AvatarUrl = avatarUrl;
//            Gender = gender;
//        }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Sub { get; set; }
        [Required]
        public string UserName { get; set; }
        public String AvatarUrl { get; set; }
        public String Gender { get; set; }
        
        public List<UserGroup> UserGroups { get; set; }
    }
}
