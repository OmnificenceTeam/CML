<%@ Page Language="C#" AutoEventWireup="true" CodeFile="resetPass.aspx.cs" Inherits="service_resetPass" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">

    <base href="../" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery.fullPage.css" />
    <link rel="stylesheet" type="text/css" href="css/landing.css" />
    <link rel="stylesheet" type="text/css" href="css/font.css" />
    <link rel="stylesheet" type="text/css" href="css/mediaquries.css" />
    <link rel="stylesheet" type="text/css" href="css/toastr/toastr.css" />

    <script src="js/jquery/jquery.min.js"></script>
    <script src="js/jquery/jquery-ui.min.js"></script>
    <script src="js/jquery/jquery-1.12.0.min.js"></script>
    <script src="js/bootstrap/bootstrap.js"></script>
    <script src="js/plugin/toastr/toastr.js"></script>
    <script src="js/jquery/jquery.slimscroll.js"></script>
    <script src="js/webService/webobjects.js"></script>
    <script src="js/webService/webservice.js"></script>
    <script src="js/webService/userservice.js"></script>

    <script src="js/custom/init.js"></script>
    <script src="js/custom/login.js"></script>
    <style>
        body {
            font-family: 'century gothic';
            letter-spacing: 2px;
        }



        .top-menu a {
            color: black;
        }

        .fn-f18 {
            font-weight: normal;
            font-size: 18px;
        }

        .br-0 {
            border-radius: 0px;
        }

        .btn-custom {
            background: #FF9900;
            border-radius: 0px;
            font-size: 16px;
            padding: 5px 15px;
            border: none;
            float: right;
        }

            .btn-custom:hover {
                box-shadow: 0px 0px 5px 0px black;
            }

        .regInput {
            background: transparent;
            border: none;
            border-bottom: 1px solid #4B1B66;
            width: 100%;
            color: #000000;
            margin-bottom: 20px;
            font-size: 16px;
        }

        .m-20 {
            margin-top: 20px;
        }

        #regForm input {
            margin-top: 20px;
        }

        input:focus {
            outline: none;
        }

        select option {
            color: black;
        }

        #regForm select {
            margin-top: 20px;
        }
    </style>
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
            margin-top: -190px;
            margin-left: -220px;
            text-align: center;
            box-shadow: 0px 0px 21px 0px black;
        }

        a {
            text-decoration: underline;
            color: black;
        }

        @media screen and (max-device-width: 320px) {
            #centerContainer {
                max-width: 300px;
                /* width: 100%; */
                background: rgba(255, 255, 255, 0.87);
                font-size: 20px;
                padding: 40px;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-top: -190px;
                margin-left: -150px;
                text-align: center;
                box-shadow: 0px 0px 21px 0px black;
            }
        }
    </style>
</head>
<body>
    <form id="form1" runat="server" onsubmit="return false;">
        <asp:HiddenField ID="hdnRefCode" runat="server" />
        <div id="centerContainer" class="">
            <img src="images/CML_logo.png" style="width: 80%;" />
            <p id="activated" runat="server" visible="false">
                <div id="resetDiv">
                    <h3>Reset Password</h3>
                    <input type="password" id="txtPass" class="regInput" placeholder="Please enter password*" />
                    <input type="password" id="txtCPass" class="regInput" placeholder="Confirm Password*" />
                    <input type="button" onclick="onClickResetPass()" class="btn-custom" value="Submit" />
                    <div id="rpMsg">
                    </div>
                </div>
                <div id="successDiv" style="display: none;">
                    Your password has been changed successfully. <a href="landing.html">Click here</a> to login.
                </div>
            </p>

            <p id="expired" runat="server" visible="false" style="color: red;">
                Link is expired or Invalid.
            </p>
        </div>
    </form>
    <script>
        $("#form1").find("input").keyup(function (e) {
            var code = e.which; // recommended to use e.which, it's normalized across browsers
            if (code == 13) e.preventDefault();
            if (code == 32 || code == 13 || code == 188 || code == 186) {
                onClickonClickSubmitQuestion();
            } // missing closing if brace
        });
    </script>
</body>
</html>
