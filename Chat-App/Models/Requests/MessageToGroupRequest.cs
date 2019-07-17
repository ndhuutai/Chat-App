using System;

namespace Chat_App.Models.Requests
{
    public class MessageToGroupRequest
    {
        public int UserId { get; set; }
        public string Text { get; set; }
        public string UserName { get; set; }
        public string AvatarUrl { get; set; }
        public string GroupName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}