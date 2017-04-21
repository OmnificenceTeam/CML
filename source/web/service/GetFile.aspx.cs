using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using CML;
using Omnificence.DataAccessControl;
using System.Collections.Generic;
public partial class GetFile : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        UInt64 Id = Convert.ToUInt64(Request.QueryString["id"]);
        String Type = Request.QueryString["type"];
        Response.AddHeader("Access-Control-Allow-Origin", "*");
        if (Type == "image")
        {
            DataCommand command = new DataCommand("GetUserDetailsByID");
            command.Add("userid", Id.ToString());

            IDictionary<String,object> obj = command.Execute() as IDictionary<String, Object>;
            
            if (obj != null && !String.IsNullOrEmpty(obj["avatar"].ToString()))
            {
                Byte[] data = Convert.FromBase64String(obj["avatar"].ToString().Split(',')[1]);
                // Send the file to the browser
                // Byte[] data = (Byte[])(dt.Rows[0]["SpeakerPhoto"]);

                Response.AddHeader("Content-Disposition", "attachment; filename=image." + obj["avatar"].ToString().Split(';')[0].Split('/')[1]);
                Response.Cache.SetExpires(DateTime.Now.AddSeconds(60));
                Response.Cache.SetCacheability(HttpCacheability.Public);
                Response.Cache.SetValidUntilExpires(true);
                    Response.BinaryWrite(data);
                Response.Flush();
                Response.End();
            }
            else
            {

                Byte[] data = Convert.FromBase64String("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");
                // Send the default file to the browser
                Response.AddHeader("Content-Disposition", "attachment; filename=image.png");
                Response.Cache.SetExpires(DateTime.Now.AddSeconds(60));
                Response.Cache.SetCacheability(HttpCacheability.Public);
                Response.Cache.SetValidUntilExpires(true);
                Response.BinaryWrite(data);
                Response.Flush();
                Response.End();
            }
        }



    }

    public class User
    {
        public UInt64 userid = 0;
        public String email = String.Empty;
        public String password = String.Empty;
        public String firstname = String.Empty;
        public String lastname = String.Empty;
        public String organization = String.Empty;
        public String phone = String.Empty;
        public String title = String.Empty;
        public String image = String.Empty;
        public String invitecode = String.Empty;
    }
}
