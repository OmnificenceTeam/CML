var captcha = null;

function LoadAskExpertPage()
{

    if (captcha == null) {
        captcha = new CAPTCHA({
            selector: '#captcha'
        });
    }

    captcha.generate();
    var data = _glocalStorage.loadData("login");

    $("#txtaemail").val(data.email);
}

function onClickRefreshcap()
{
    captcha.generate();
}

function onClickSubmitQuestion()
{
    var ab = new alertbox();
    ab.id = "#askMsg";

    if ($("#txtques").val() == "") {
        ab.showError('*Question cannot be empty.');
        return;
    }

    if ($("#txtcapcha").val() == "") {
        ab.showError('*Please enter the text as shown.');
        return;
    }

    if (captcha.getText() != $("#txtcapcha").val())
    {
        ab.showError('*Invalid captcha text.');
        captcha.generate();
        return;
    }

    var qd = new QuestionData();
    qd.userid = parseInt($("#hdnUserID").val());
    qd.question = $("#txtques").val();

    var cb = new CallBack();
    cb.func = "onPostedQuestion";
    

    _gUserService.AddQuestion(qd, cb, true);
    showLoader();
}


function onPostedQuestion(res,cb)
{
    hideLoader();
    if(res)
    {
        modalAlert("Your question has been posted successfully. Faculty will respond to your query in 3 to 4 days.");
        $("#txtques").val("");
        $("#txtcapcha").val("");
        captcha.generate();
        $("#askMsg").html("");
    }
}