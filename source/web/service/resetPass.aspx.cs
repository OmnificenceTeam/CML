using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Omnificence.DataAccessControl;
using System.Collections.Generic;
using CML;

public partial class service_resetPass : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["ref"] != null && Request.QueryString["ref"].ToString() != "")
        {
            hdnRefCode.Value = Request.QueryString["ref"].ToString();
            DataCommand command = new DataCommand("IsReferenceCodeValid");
            command.Add("referencecode", Request.QueryString["ref"].ToString());
            command.Add("status", 0, System.Data.ParameterDirection.Output);
            if ((UInt64)command.ExecuteWithResult("status") == 1)
            {
                activated.Visible = true;
            }
            else
            {
                expired.Visible = true;
            }
        }
        else
        {
            expired.Visible = true;
        }
    }
}