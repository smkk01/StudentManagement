using Student_webapi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Student_webapi.Controllers
{
    public class StudentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable dt = new DataTable();
            string query = @"SELECT StudentID,StudentName,FatherName,Department from dbo.Student";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["StudentAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(dt);
            }
            return Request.CreateResponse(HttpStatusCode.OK, dt);

        }

        public string Post(Student stu)
        {
            try
            {
                DataTable dt = new DataTable();
                string query = @"Insert into dbo.Student values (
                '" + stu.StudentName + @"'
                ,'" + stu.FatherName + @"'
                ,'" + stu.Department + @"'
                )";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["StudentAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(dt);
                }
                return "Inserted Successfully";
            }
            catch (Exception)
            {
                return "Failed to Insert";
            }

        }

        public string Put(Student stu)
        {
            try
            {
                DataTable dt = new DataTable();
                string query = @"Update dbo.Student set 
                StudentName = '" + stu.StudentName + @"' 
                ,FatherName ='" + stu.FatherName + @"'
                ,Department ='" + stu.Department + @"' Where StudentID = " + stu.StudentID + @"";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["StudentAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(dt);
                }
                return "Updated Successfully";
            }
            catch (Exception)
            {

                return "Failed to Update";
            }

        }

        public string Delete(int id)
        {
            try
            {
                DataTable dt = new DataTable();
                string query = @"Delete from dbo.Student Where StudentID =" + id;
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["StudentAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(dt);
                }
                return "Delete Successfully";
            }
            catch (Exception)
            {

                return "Failed to Insert";
            }
        }
    }
}
