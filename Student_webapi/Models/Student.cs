using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Student_webapi.Models
{
    public class Student
    {
        public long StudentID { get; set; }
        public string StudentName { get; set; }
        public string FatherName { get; set; }

        public string Department { get; set; }

    }
}