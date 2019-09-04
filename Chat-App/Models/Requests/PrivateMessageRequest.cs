namespace Chat_App.Models.Requests
{
    public class PrivateMessageRequest
    {
        public string UserId { get; set; }
        public string Message { get; set; }
        public string PrivateGroupName { get; set; }
    }
}