namespace Chat_App.Models.Requests
{
    public class AddUserToGroupRequest
    {
        public int UserId;
        public int GroupId;
        public string GroupName;
        public string Gender;
    }
}