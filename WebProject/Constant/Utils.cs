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


        public static string GenerateCodeWithDigitAndNumber()
        {
            const string AllowedChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            int length = 7;
            Random random = new Random();
            string randomString = new string(Enumerable.Repeat(AllowedChars, length)
                                              .Select(s => s[random.Next(s.Length)]).ToArray());
            return randomString;
        }

        public static readonly string[] SizeSuffixes =
          { "bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };
        public static string SizeSuffix(Int64 value, int decimalPlaces = 1)
        {
            if (decimalPlaces < 0) { throw new ArgumentOutOfRangeException("decimalPlaces"); }
            if (value < 0) { return "-" + SizeSuffix(-value, decimalPlaces); }
            if (value == 0) { return string.Format("{0:n" + decimalPlaces + "} bytes", 0); }

            // mag is 0 for bytes, 1 for KB, 2, for MB, etc.
            int mag = (int)Math.Log(value, 1024);

            // 1L << (mag * 10) == 2 ^ (10 * mag) 
            // [i.e. the number of bytes in the unit corresponding to mag]
            decimal adjustedSize = (decimal)value / (1L << (mag * 10));

            // make adjustment when the value is large enough that
            // it would round up to 1000 or more
            if (Math.Round(adjustedSize, decimalPlaces) >= 1000)
            {
                mag += 1;
                adjustedSize /= 1024;
            }

            return string.Format("{0:n" + decimalPlaces + "} {1}",
                adjustedSize,
                SizeSuffixes[mag]);
        }


    }
}
