using DAL.Enum;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Model.Product
{
    [Table(name: "Products")]
    public class Products : AppModelBase
    {
       
		public string ProductName { get; set; }
		public decimal ProductPrice { get; set; }
    }
}
