namespace Chat_App.Models.Requests
{
    public class AddUserToGroupRequest
    {
        public int Id;
        public int GroupId;
        public string GroupName;
        public string Gender;
    }
}