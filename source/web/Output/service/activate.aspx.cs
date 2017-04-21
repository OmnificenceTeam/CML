using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Omnificence.DataAccessControl;
using System.Collections.Generic;
using CML;

public partial class service_activate : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["ref"] != null && Request.QueryString["ref"].ToString() != "")
        {
            DataCommand command = new DataCommand("ActivateAccount");
            command.Add("referencecode", Request.QueryString["ref"].ToString());

            IDictionary<String, object> obj = command.Execute() as IDictionary<String, Object>;

            if (obj != null && !String.IsNullOrEmpty(obj["userid"].ToString()))
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