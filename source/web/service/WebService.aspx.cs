using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Omnificence.WebService;

public partial class service_WebService : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        String reqPacket = System.Text.Encoding.UTF8.GetString(Request.BinaryRead(Request.ContentLength));
        String resPacket = ServiceManager.DoService(reqPacket, this);
        Response.Write(resPacket);
    }
}