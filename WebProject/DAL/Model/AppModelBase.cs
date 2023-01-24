using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model
{
    public abstract class AppModelBase
    {
        [Key]
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string DeleterUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public DateTime CreationTime { get; set; }
        public string CreatorUserId { get; set; }

        public AppModelBase()
        {
            CreationTime = DateTime.Now;
        }
    }
}
