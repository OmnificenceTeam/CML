<%@ Page Language="C#" AutoEventWireup="true" CodeFile="activate.aspx.cs" Inherits="service_activate" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">

    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/jquery.fullPage.css" />
    <link rel="stylesheet" type="text/css" href="../css/landing.css" />
    <link rel="stylesheet" type="text/css" href="../css/font.css" />
    <link rel="stylesheet" type="text/css" href="../css/mediaquries.css" />
    <link rel="stylesheet" type="text/css" href="../css/toastr/toastr.css" />

    <script src="../js/jquery/jquery.min.js"></script>
    <script src="../js/jquery/jquery-ui.min.js"></script>
    <script src="../js/jquery/jquery-1.12.0.min.js"></script>
    <script src="../js/bootstrap/bootstrap.js"></script>
    <script src="../js/plugin/toastr/toastr.js"></script>
    <script src="../js/jquery/jquery.slimscroll.js"></script>
    <script src="../js/webService/webobjects.js"></script>
    <script src="../js/webService/webservice.js"></script>
    <script src="../js/webService/userservice.js"></script>

    <script src="../js/custom/init.js"></script>
    <script src="../js/custom/login.js"></script>

    <style>
        body {
            background: #4b1b64;
            font-family: "century gothic";
        }

        #centerContainer {
            max-width: 440px;
            width: 100%;
            background: rgba(255, 255, 255, 0.87);
            font-size: 20px;
            padding: 40px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -142px;
            margin-left: -190px;
            text-align: center;
            box-shadow: 0px 0px 21px 0px black;
        }

        a {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="centerContainer" class="">
            <img src="../images/CML_logo.png" style="width: 80%;" />
            <p id="activated" runat="server" visible="false">
                Your account has been activated. Please <a href="../landing.html">click here</a> to login.
            </p>

            <p id="expired" runat="server" visible="false" style="color: red;">
                Link is expired or Invalid.
            </p>
        </div>
    </form>
</body>
</html>
