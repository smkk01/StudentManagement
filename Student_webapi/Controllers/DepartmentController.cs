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
    public class DepartmentController : ApiController
    { 

        public HttpResponseMessage Get()
        {
            DataTable dt = new DataTable();
            string query = @"SELECT DeptID,DeptName from dbo.Department";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["StudentAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(dt);
            }
            return Request.CreateResponse(HttpStatusCode.OK, dt);

        }

        public string Post(Department dep)
        {
            try
            {
                DataTable dt = new DataTable();
                string query = @"Insert into dbo.Department values ('" + dep.DeptName + @"')";
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

        public string Put(Department dep)
        {
            try
            {
                DataTable dt = new DataTable();
                string query = @"Update dbo.Department set DeptName = '" + dep.DeptName + @"' Where DeptID = " +dep.DeptID + @"";
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
                string query = @"Delete from dbo.Department Where DeptID =" +id;
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
