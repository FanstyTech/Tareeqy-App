using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Constant
{
    public class Utils
    {
        public const string FirebaseURL = "https://fcm.googleapis.com/fcm/send";
        public const string FirebaseTopicName = "/topics/";


        //Bytes To KB
        public const int ByteToKB = 1024;


        //Language abbreviation
        public const string EnLang = "en";
        public const string ArLang = "ar";
        public const string APIEnLang = "FO";
        public const string APIArLang = "NA";



        //Http status code
        public const int Success = 200;
        public const int Unauthorized = 401;
        public const int InvalidToken = 402;
        public const int ServerError = 500;
        public const int Unproccessable = 422;
        public const int ServerTimeout = 408;
        public const int NotModified = 304;
        public const int Created = 201;
        public const int Forbidden = 403;
        public const int NoContent = 204;
        public const int BadRequest = 400;
        public const int TooManyRequests = 429;
        public const string DateFormat = "yyyy-MM-dd";
        public const string GVProfilePicturePath = "9";
        public const string GVCommentAndTicketPicturePath = "29";
        public static DateTime GetDateTime(string dateIn, string fromat = Utils.DateFormat)
        {
            DateTime parsedDate;
            DateTime.TryParseExact(dateIn, fromat, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate);
            return parsedDate;
        }

        public const string InCorrectMessage = "The email address or password is incorrect. Please retry...";
        public const string InCorrectPassword = "The entered password must contain symbols, numbers, uppercase and lowercase letters";
        public const string EmailExists = "Email already exists";
        public const string NeedApprovel = "Approval pending";


        public static bool IsValidPass(string password)
        {

            return password.Length > MinimumLength
                && password.Any(char.IsUpper)
                && password.Any(char.IsLower)
                && password.Any(char.IsDigit)
                && password.Any(ch => !Char.IsLetterOrDigit(ch));
        }


        private static int MinimumLength = 5;

        //GenerateTicketNumber

        public static string GenerateCode()
        {
            string ticketNumber = "";
            // generate a unique ticket number
            // for example, you could use a combination of current date and time, a random number, and a prefix
            // such as TK-2022-12-31-123456
            ticketNumber = "TK-" + DateTime.Now.ToString("yyyy-MM-dd-HHmmss") + "-" + new Random().Next(100000, 999999).ToString();
            return ticketNumber;
        }


    }
}
