using System;

namespace Chat_App.Models.Requests
{
    public class PrivateMessageRequest
    {
        public string SenderSub { get; set; }
        public string ReceiverSub { get; set; }
        public string Message { get; set; }
        public string PrivateGroupName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}