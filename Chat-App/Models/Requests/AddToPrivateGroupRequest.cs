namespace Chat_App.Models.Requests
{
    public class AddToPrivateGroupRequest
    {
        public string GroupName { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
    }
}