

$(document).ready(function () {


    $("#confirmForm").find("input").keyup(function (e) {
        var code = e.which; // recommended to use e.which, it's normalized across browsers
        if (code == 13) e.preventDefault();
        if (code == 32 || code == 13 || code == 188 || code == 186) {
            onClickValidateAC();
        } // missing closing if brace
    });


    $("#regForm").find("input").keyup(function (e) {
        var code = e.which; // recommended to use e.which, it's normalized across browsers
        if (code == 13) e.preventDefault();
        if (code == 32 || code == 13 || code == 188 || code == 186) {
            onClickRegister();
        } // missing closing if brace
    });

    $("#ffrorm").find("input").keyup(function (e) {
        var code = e.which; // recommended to use e.which, it's normalized across browsers
        if (code == 13) e.preventDefault();
        if (code == 32 || code == 13 || code == 188 || code == 186) {
            onClickForgotPass();
        } // missing closing if brace
    });

    $("#lgform").find("input").keyup(function (e) {
        var code = e.which; // recommended to use e.which, it's normalized across browsers
        if (code == 13) e.preventDefault();
        if (code == 32 || code == 13 || code == 188 || code == 186) {
            onClickLogin();
        } // missing closing if brace
    });

   
 

    $("#contactForm").find("input").keyup(function (e) {
        var code = e.which; // recommended to use e.which, it's normalized across browsers
        if (code == 13) e.preventDefault();
        if (code == 32 || code == 13 || code == 188 || code == 186) {
            onClickContactus();
        } // missing closing if brace
    });
    
   

});

function onClickRegister()
{
    var ab = new alertbox();
    ab.id = "#regMsg";

    if ($("#ddTitle").val() == "0") {
        ab.showError('Please select a title.');
        return;
    }
    if ($("#txtFName").val() == "") {
        ab.showError('Please enter your first name.');
        return;
    }
    if ($("#txtLName").val() == "") {
        ab.showError('Please enter your last name.');
        return;
    }
    if ($("#txtSpec").val() == "") {
        ab.showError('Speciality should not be empty.');
        return;
    }
    if ($("#ddCountry :selected").val() == "0") {
        ab.showError('Please select your country.');
        return;
    }
    if ($("#txtEmail").val() == "") {
        ab.showError('Please enter your email.');
        return;
    }

    if (!validateEmail($("#txtEmail").val())) {
        ab.showError('Please enter valid email.');
        return;
    }

    if ($("#txtPass").val() == "") {
        ab.showError('Please enter password.');
        return;
    }

    if ($("#txtCPass").val() == "") {
        ab.showError('Please enter confirm password.');
        return;
    }

    if (!validatePass($("#txtPass").val()) || !validatePass($("#txtPass").val())) {
        ab.showError('Password should have minimum 8 character.');
        return;
    }



    if($("#txtPass").val() != $("#txtCPass").val())
    {
        ab.showError('Password does not match with each other.');
        return;
    }

   

    if (!$("#chkTerms").is(":checked")) {
        ab.showError('Please accept terms and conditions to proceed.');
        return;
    }


    var ud = new User();
    ud.email = $("#txtEmail").val();
    ud.password = $("#txtPass").val().toLowerCase();
    ud.firstname = $("#txtFName").val();
    ud.lastname = $("#txtLName").val();
    ud.title = $("#ddTitle").val();
    ud.avatar = $("#regAvatar").attr('src');
    ud.speciality = $("#txtSpec").val();
    ud.country = $("#ddCountry").val();
    ud.hospital = $("#txthospital").val();
    ud.city = $("#txtCity").val();
    ud.phonenumber = $("#txtPNo").val();
    ud.firstaddress = $("#txtFAdd").val();
    ud.secondaddress = $("#txtLAdd").val();

    if (_gUserService.IsEmailExists(ud, null, false))
    {
        ab.showError('Email already registered.');
        return;
    }


    var cb = new CallBack();
    cb.func = "onCreatedProfile";
    _gUserService.CreateProfile(ud, cb, true);
    blockUI("body");
    
}

function onCreatedProfile(res,cb)
{
    var ab = new alertbox();
    ab.id = "#regMsg";

    if(res.userid > 0)
    {
        ab.showSuccess('User registered successfully, Please check you email.');
        window.setTimeout(function () { $(ab.id).html(""); }, 10000);
        $('#regForm')[0].reset();
        $("#regAvatar").attr("src", a);
    }
    else
    {
        ab.showError('Something went wrong.');
    }

    unblockUI("body");
}

function onClickLogin()
{
    var ab = new alertbox();
    ab.id = "#lgMsg";
    

    if ($("#txtUName").val() == "") {
        ab.showError('Please enter your email.');
        return;
    }

    if (!validateEmail($("#txtUName").val())) {
        ab.showError('Please enter valid email address.');
        return;
    }

    if ($("#txtLPass").val() == "") {
        ab.showError('Please enter your password.');
        return;
    }

    var ud = new User();
    ud.email = $("#txtUName").val();
    ud.password = $("#txtLPass").val().toLowerCase();

    var cb = new CallBack();
    cb.func = "onLoggedIn";
    _gUserService.AuthenticateUser(ud, cb, true);
    blockUI("body");
}

function onLoggedIn(res, cb) {
    var ab = new alertbox();
    ab.id = "#lgMsg";
    if (res != null) {
        if (res.userid > 0) {
           
            $('#regForm')[0].reset();
            _glocalStorage.saveData("login", res);
            window.location.href = "index.html";
        }
        else {
            ab.showError('Invalid Username/Password.');
        }
    }
    else {
        ab.showError('The email and password you entered do not match.');
    }

    unblockUI("body");
}

function onClickForgotPass()
{
    var ab = new alertbox();
    ab.id = "#fpMsg";
    

    if ($("#txtFUName").val() == "") {
        ab.showError('Please enter your email');
        return;
    }

    if (!validateEmail($("#txtFUName").val())) {
        ab.showError('Please enter valid email address.');
        return;
    }

    var ud = new User();
    ud.email = $("#txtFUName").val();

    var cb = new CallBack();
    cb.func = "onForgotPass";
    _gUserService.ForgotPassword(ud, cb, true);
    blockUI("body");
}

function onForgotPass(res, cb)
{
    var ab = new alertbox();
    ab.id = "#fpMsg";
    if(res)
    {
        ab.showSuccess('Forgot password reset link is sent to your email, please check.');
        window.setTimeout(function () { $(ab.id).html("") }, 5000);
    }
    else
    {
        ab.showError('Please enter valid email address.');
    }

    unblockUI("body");
}

function onClickValidateAC()
{
    var ab = new alertbox();
    ab.id = "#accMsg";
    
    if ($("#txtACode").val() == "") {
        ab.showError('Please enter Access code.');
        return;
    }

    if($("#txtACode").val().toLowerCase() == "cml2016")
    {
        $(ab.id).html("");
        $("#confirmForm").fadeOut("fast", function () {
            $("#regForm").show();
        })
    }
    else
    {
        ab.showError('Please enter valid Access code.');
    }

}

function onClickResetPass()
{
    var ab = new alertbox();
    ab.id = "#rpMsg";
    

    if ($("#txtPass").val() == "") {
        ab.showError('Please enter password.');
        return;
    }

    if ($("#txtCPass").val() == "") {
        ab.showError('Please enter confirm password.');
        return;
    }

    if (!validatePass($("#txtPass").val()) || !validatePass($("#txtPass").val())) {
        ab.showError('Password should have minimum 8 character.');
        return;
    }

    if ($("#txtPass").val() != $("#txtCPass").val()) {
        ab.showError('These passwords dont match. Try again?');
        return;
    }

    var ud = new User();
    ud.referencecode = $("#hdnRefCode").val();
    ud.password = $("#txtPass").val().toLowerCase();

    var cb = new CallBack();
    cb.func = "onSettedPassword";
    _gUserService.SetPassword(ud, cb, true);
    blockUI("#centerContainer");
}

function onSettedPassword(res,cb)
{
    if (res.userid > 0)
    {
        $("#resetDiv").hide();
        $("#successDiv").show();
    }

    unblockUI("#centerContainer");
}

function onClickContactus()
{
    var ab = new alertbox();
    ab.id = "#cuMsg";


    if ($("#ddftype :selected").val() == "0") {
        ab.showError('Please enter your email.');
        return;
    }
    if ($("#cemail").val() == "") {
        ab.showError('Email should not be empty.');
        return;
    }

    if (!validateEmail($("#cemail").val())) {
        ab.showError('Invalid email address.');
        return;
    }

    if ($("#cdesc").val() == "") {
        ab.showError('Description should not be empty.');
        return;
    }

    var cs = new Contactus();
    cs.contacttype = $("#ddftype").val();
    cs.contactemail = $("#cemail").val();
    cs.description = $("#cdesc").val().replace(/\n|\r\n|\r/g, "<br>");;

    var cb = new CallBack();
    cb.func = "onContactedus";
    _gUserService.Contactus(cs, cb, true);
    blockUI("#contactForm");
}

function onContactedus(res, cb) {

    var ab = new alertbox();
    ab.id = "#cuMsg";

    if (res) {
        ab.showSuccess('Your message has been submitted successfully.');
        window.setTimeout(function () { $(ab.id).html(""); }, 5000);
        $('#contactForm')[0].reset();
    }
    else {
        ab.showError('Something went wrong.');
    }

    unblockUI("#contactForm");
}




function DisplayPicture() {
    $("#modalImagecrop").modal("show");
    encodeImageFileAsURL('regFile', 'regAvatar');
}

var isImageChosed = false;

function encodeImageFileAsURL(inputFileID, imageloadID) {
    var filesSelected = document.getElementById(inputFileID).files;
    if (isiDevice) {
        var f = filesSelected[0];
        var fr = new FileReader;
        try {
            var img = new Image();
            img.src = webkitURL.createObjectURL(f);
            fr.onload = function () {
                var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));
                var canvas = document.getElementById("photo");
                var ctx = canvas.getContext("2d");
                var mpImg = new MegaPixImage(img);
                mpImg.render(canvas, { orientation: exif.Orientation, maxWidth: 500 });
                profilePictureData = canvas.toDataURL("image/png", "");
                var srcData = profilePictureData;
                if (imageloadID == "regAvatar" || imageloadID == "profileAvatar") {

                    document.getElementById("cropimage").src = srcData;

                    $('#cropimage').cropbox({
                        width: 200,
                        height: 200,
                        showControls: 'never'
                    }).on('cropbox', function (event, results, img) {
                        document.getElementById(imageloadID).src = img.getDataURL();
                    });
                }
                else {
                    document.getElementById(imageloadID).src = profilePictureData;
                }
            };
            fr.readAsBinaryString(f);
        }
        catch (exe) {
        }
        return true;

    }
    else {

        //var Fsize = filesSelected[0].size / 1000000;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64
                document.getElementById(inputFileID).value = null;
                document.getElementById(imageloadID).src = srcData;
                if (imageloadID == "regAvatar" || imageloadID == "profileAvatar") {
                    document.getElementById("cropimage").src = srcData;

                    $('#cropimage').cropbox({
                        width: 200,
                        height: 200,
                        showControls: 'never'
                    }).on('cropbox', function (event, results, img) {
                        document.getElementById(imageloadID).src = img.getDataURL();
                    });
                }
            }
            fileReader.readAsDataURL(fileToLoad);
            return true;
        }
    }
}

function onclockcropimg() {
    isImageChosed = true;
    $("#modalImagecrop").modal("hide");
}

var a = "data:image/png;base64,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";
function cancelImg() {
    $("#regAvatar").attr('src', a);
    isImageChosed = false;
    $("#modalImagecrop").modal("hide");
    selgender();
}

function checkedbo() {
    if (document.getElementById("chkTerms").checked = true) {
        document.getElementById("chkTerms").checked = true;
    }
    if (document.getElementById("chkTerms").checked = false) {
        document.getElementById("chkTerms").checked = false;
    }
}
var b = "data:image/png;base64,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/GMzLdsAAEIkaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTYtMDMtMDFUMTk6NTU6MzMrMDU6MzA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE2LTAzLTAxVDE5OjU2OjAzKzA1OjMwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNi0wMy0wMVQxOTo1NjowMyswNTozMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6YmI0ZWEwYzItZWUzYi1iODQ2LTk3ZjEtYmM1MWI2M2VlMzhhPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6ODIyMmRhYWQtZGZiOS0xMWU1LWE3ODctYjI5NzQxYWJmYTM2PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6MjVhY2YxYmMtOWMwZC0xNDQ0LTkxNzktNmQ4OWFiMDU1MTJkPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjI1YWNmMWJjLTljMGQtMTQ0NC05MTc5LTZkODlhYjA1NTEyZDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wMy0wMVQxOTo1NTozMyswNTozMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo1YzhlYTZmOC03YTk0LTVmNGYtYWE0OS01Mzc4NDJlNDViNGM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDMtMDFUMTk6NTU6NTMrMDU6MzA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZTA1Yzg1OWQtZDMzMS1jMTQ3LTg4NDktMWYzNjZlM2JhOTViPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAzLTAxVDE5OjU2OjAzKzA1OjMwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmJiNGVhMGMyLWVlM2ItYjg0Ni05N2YxLWJjNTFiNjNlZTM4YTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wMy0wMVQxOTo1NjowMyswNTozMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6ZTA1Yzg1OWQtZDMzMS1jMTQ3LTg4NDktMWYzNjZlM2JhOTViPC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjI1YWNmMWJjLTljMGQtMTQ0NC05MTc5LTZkODlhYjA1NTEyZDwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjI1YWNmMWJjLTljMGQtMTQ0NC05MTc5LTZkODlhYjA1NTEyZDwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6YmZkMTMwZWUtZGZiNy0xMWU1LTk1MTAtYzBkZjkyYmVjOWE3PC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOkJhZz4KICAgICAgICAgPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxwaG90b3Nob3A6SUNDUHJvZmlsZT5zUkdCIElFQzYxOTY2LTIuMTwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjUwOTwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj41MTI8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PpSuNj8AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAXV1JREFUeNrsnXd4VNXirr89NSGThPSEEELoLYQqhF6lCEEIHQRFipRIU49HQRHEAwrSoihHiCIIiPROKIpHRfDIsQQUqQIKCUVSSCHl/uElPwIhzMwus/ee732e+9xzvfpmsr611pe9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9BmY631iS79GjRqyfL7CwkJs2rQJ1atXZ770adJntVqRk5NT4r0SUn4+sU/TfNhb+pivvn2Klz4DU4fv999/F5Vj/fr1Zft8n3zySfGLSpgvfVrzValSBUlJSbJ9vnvf3OcoZ86cYb5u7FO09BmYenxiv9OvUqXKfZ9Hqs936dIlREZGMl/6NOlr0KABdu3aJdvnu/vNfc5w6tQp5uvGPsVKn4Gpy5ednS0qT4PBUOJiPqk/3y+/nLjvWQDMlz4t+IxGI7KysmT7fM6+n6KsI33m6z4+RUqfganPV1hYaNdDQ+w54pDj8+3btx9BQYHMlz7N+X799VfZPl/58uVFX71/7/U8zNe9fLKXPgNTr+9///ufqGzbt28v2+e7evUqPDw8mS99mvJ5enqWWFdSf77Y2FhRazY9Pb3Ec/uZr/v5ZC19DrC6ff/9739F5duyZUsYjUZZPl9RURFSU1OZL32a8hUUFBQ//EaOz9exY0dRa/buNc983dMnW+lzgNXvO3bse1EZW63WEvfrS/35bt26xXzp05TvzlG0HJ/PaDSiRYsWotbsN998w3zd3CdL6XOAteG7fPkKCgoKRGXduXNn5kEffQr4atSoIerxu8DfD79iHu7tU+RCPgamTl9RURG+/17c0X6vXr2YB330KeCLi4sTtVYLCwvxxx9/MA8398le+gxM3b7du3eLyjcoKAghISHMgz76ZPQZjUY89thjotbq//73v/vO7DEP9/PJWvocYPX7/vOf/4jOecCAAcyDPvpk9MXExIh+ne7evXuZB33ylT4HWBu+a9eu4ebNm6JL/94H6TAP+uiTzjds2DDRe/KhQ4eYB33ylD4HWFu+TZs2icrbarWiZcuWzIM++mTweXl52b2+HsSVK1dw9epV5kGf616ty8DU49uyZYvo7KZMmcI86KNPBt+TTz4pen1u3LgRRUVFzIM+9ZQ+A3Od78KFC6JP8UdERKB27drMgz76JPSZzWYMHTpU9P66fft25kGfekqfgbnet3r1atE5Tp8+nXnQR5+EvmHDhsFkMolal+fOnbvvefvMw319Li99BqYO38aNG0VnWaNGDdSvX5950EefBD6r1YpRo0aJXpcffPAB86BPHaXPwNTj++uvv5CSkiI603/961/Fn4t50Eef874pU6aIPsovKChAcnIy86DP9aXPwNTnW7Zsmehc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";
function selgender() {
    if (!isImageChosed) {
        var e = document.getElementById("ddGender");
        var strUser = e.options[e.selectedIndex].value;
        if (strUser == "Female") {
            $("#regAvatar").attr('src', b);
        } else {
            $("#regAvatar").attr('src', a);
        }
    }
}



function clearContactUs() {
    $("#cemail").val("");
    $("#cdesc").val("");

    var data = _glocalStorage.loadData("login");
    if (data != null || data != undefined)
        $("#cemail").val(data.email);


}



var questions = ["ques1"]
function onClickSubmitFeedback() {
    var ab = new alertbox();
    ab.id = "#cusMsg";

    if ($("input[name='ques1']:checked").val() == undefined) {
        ab.showError('Please answer all questions.');
        return;
    }

    $("#fbForm")[0].reset();

    $(ab.id).html("");
    ab.showSuccess('Your feedback submitted successfully. Thank you for your time.');
    window.setTimeout(function () { $("#cusMsg").html("") }, 5000);
}


var qArr = new Array();

function onClickNext(questionid, isRatio)
{
    var ab = new alertbox();
    ab.id = "#cusMsg";
    $(ab.id).html("");
   
    if (isRatio) {
        if ($("input[name='ques" + questionid + "']:checked").val() == undefined) {
            ab.showError('Please answer all questions.');
            return;
        }

        $(".hdQues").fadeOut();
        window.setTimeout(function () {

            $(".ques" + (questionid + 1)).fadeIn();
        }, 400);

        var q = new FeedBackQues();
        q.questionid = questionid;
        q.userid = parseInt($("#hdnUserID").val());
        q.answer = $("input[name='ques" + questionid + "']:checked").val();
        qArr.push(q);
    }
    else
    {
        if ($("#ques" + questionid).val() == "") {
            ab.showError('Please answer all questions.');
            return;
        }

        $(".hdQues").fadeOut();
        window.setTimeout(function () {

            $(".ques" + (questionid + 1)).fadeIn();
        }, 400);



        var q = new FeedBackQues();
        q.questionid = questionid;
        q.userid = parseInt($("#hdnUserID").val());
        q.answer = $("#ques" + questionid).val();
        qArr.push(q);
    }

    if(questionid == 3)
    {
        $("#fbForm")[0].reset();

        $(ab.id).html("");
       

        var cb = new CallBack();
        cb.func = "onSubmittedFb";
        cb.data = ab;

        _gUserService.SubmitFeedback(qArr, cb, true);
        blockUI("#fbForm");
    }

}

function onSubmittedFb(res,cb)
{
    if (res) {
        cb.showSuccess('Your feedback submitted successfully. Thank you for your time.');
        window.setTimeout(function () {  $("#myModalFb").modal("hide"); }, 5000);
    }

    unblockUI("#fbForm");
}


function onClickCheckIdevice(ele)
{
    if (isiDevice)
    {
        window.location = "nav://?url?" + $(ele).attr("href");
        return false;
    }
    else if (isWindowsPhone)
    {
        window.open($(ele).attr("href"), '_system');
        return false;
    }

    return true;
}