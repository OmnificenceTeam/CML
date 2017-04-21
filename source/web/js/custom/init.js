
function blockUI(ele) {
    $(ele).prepend("<div class='blockUI'><img src='images/loader.gif'></div>");
}


function unblockUI(ele) {
    $(ele).find('.blockUI').fadeOut("slow", function () { $(this).remove(); });
}

function showLoader()
{
    $(".load-bar").css("visibility", "visible");
}

function hideLoader()
{
    $(".load-bar").css("visibility", "hidden");
}

function modalAlert(msg)
{
    $("#modalAlert").modal("show");
    $("#modalAlert").find("#mdlMsg").html(msg);
}


function validatePass(pass)
{ 
    if (pass.length >= 8)
        return true;
    else
        return false;
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function timeDifference(previous) {
    var current = new Date();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - new Date(previous);

    if (elapsed < msPerMinute) {
        return 'one minute ago';
    }

    else if (elapsed < msPerHour) {
        var str = ' minute ago';
        if (Math.round(elapsed / msPerMinute) > 1)
            str = ' minutes ago';
        return Math.round(elapsed / msPerMinute) + str;
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        var str = ' day ago';
        if (Math.round(elapsed / msPerDay) > 1)
            str = ' days ago';
        return  Math.round(elapsed / msPerDay) + str;
    }

    else if (elapsed < msPerYear) {
        return  Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return  Math.round(elapsed / msPerYear) + ' years ago';
    }
}



function alertbox()
{
    this.id = "";
}

alertbox.prototype.showError = function (message)
{
    $(this.id).html("<div class='error'>" + message + "</div>");
}

alertbox.prototype.showSuccess = function (message) {
    $(this.id).html("<div class='success'>" + message + "</div>");
}


function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}


$(".close_menutitle").on('click touchstart', function () {
    $('#accordionMnu .in').collapse('hide');
});

