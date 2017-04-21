
var _newsfirstload = true;
var _lastfeeddate = "";


function LoadCMLNewsPage() {


    if (_newsfirstload) {
        var fd = new FeedData();
        fd.type = 1;

        var cb = new CallBack();
        cb.func = "onGetFeedData";

        _gUserService.GetFeedData(fd, cb, true);
        blockUI("body");
    }

    _newsfirstload = false;
}


function onGetFeedData(res, cb) {
    if (res != null) {
        var html = "";

        for (var i = 0; i < res.length; i++) {
            html += '<table class="fullT m-10">' +
            '<tr><td class="vttitle" style="text-align:justify">' + res[i].feedtitle + '</td></tr>' +
            '<tr><td class="vtcont" style="text-align:justify">' + res[i].feeddescription + '</td>' +
            '</tr><tr style="text-align:right;padding:10px;">' +
            '<td class="vlink"><a href="#" onclick="askConf(\'\ ' + res[i].feedlink + ' \'\)"  class="btn-orange">Read More</a></td>' +
            '</tr>' +
            '</table>';

            _lastfeeddate = res[i].feeddate;
        }

        $("#cmln-cont").append(html);

        if (res.length < 10)
            $("#newsldmrbtn").hide();

    }
    else {
        $("#newsldmrbtn").hide();
    }
    hideLoader();
    unblockUI("body");
}


function LoadMoreNews() {

    var fd = new FeedData();
    fd.type = 1;
    fd.lastfeeddate = new Date(_lastfeeddate);

    var cb = new CallBack();
    cb.func = "onGetFeedData";

    _gUserService.GetFeedData(fd, cb, true);
    showLoader();
}




var _journalfirstload = true;
var _jlastfeeddate = "";


function LoadJournalPage() {


    if (_journalfirstload) {
        var fd = new FeedData();
        fd.type = 2;

        var cb = new CallBack();
        cb.func = "onGetjFeedData";

        _gUserService.GetFeedData(fd, cb, true);
        blockUI("body");
    }

    _journalfirstload = false;
}


function onGetjFeedData(res, cb) {
    if (res != null) {
        var html = "";

        for (var i = 0; i < res.length; i++) {
            html += '<table class="fullT m-10">' +
            '<tr><td class="vttitle" style="text-align:justify">' + res[i].feedtitle + '</td></tr>' +
            '<tr><td class="vtcont" style="text-align:justify">' + res[i].feeddescription + '</td>' +
            '</tr><tr style="text-align:right;padding:10px;">' +
            '<td class="vlink"><a href="#" onclick="askConf(\'\ ' + res[i].feedlink + ' \'\)" class="btn-orange">Read More</a></td>' +
            '</tr>' +
            '</table>';

            _jlastfeeddate = res[i].feeddate;
        }

        $("#cmlj-cont").append(html);

        if (res.length < 10)
            $("#jourldmrbtn").hide();

    }
    else {
        $("#jourldmrbtn").hide();
    }
    hideLoader();
    unblockUI("body");
}


function LoadMorejournal() {

    var fd = new FeedData();
    fd.type = 2;
    fd.lastfeeddate = new Date(_jlastfeeddate);

    var cb = new CallBack();
    cb.func = "onGetjFeedData";

    _gUserService.GetFeedData(fd, cb, true);
    showLoader();
}

var tempLink = null;

function askConf(link) {
    $("#modalConf").modal("show");
    tempLink = $.trim(link);
}

function onclickConfirmRedirect() {
    $('#modalConf').modal('hide');
    if (tempLink != null) {
        if (isiDevice) {
            window.location = "nav://?url?" + tempLink;
        }
        else if(isWindowsPhone)
            window.open(tempLink, '_system');
        else {
            window.open(tempLink, '_blank');
        }
    }
}

function LoadDigitalAssets() {
    var cb = new CallBack();
    cb.func = "onGetAssets";

    _gUserService.GetAssets(1, cb, true);
    blockUI("body");
}

function onGetAssets(res, cb) {
    unblockUI("body");

    if (res != null) {
        var dhtml = "";

        for (var i = 0 ; i < res.word.length; i++) {
            var name = res.word[i].split('.');
            dhtml += '<tr>' +
                 '<td> <img class="pdfimg" src="images/doc.png" style="float:left" /> ' + name[0] + ' </td>' +
                 '<td style="    padding-bottom: 10px;" ><a href="files/DigitalAssets/' + res.word[i] + '" target="_blank" class="btn btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
             '</tr>';
        }

        for (var i = 0 ; i < res.excel.length; i++) {
            var name = res.excel[i].split('.');
            dhtml += '<tr>' +
                 '<td> <img class="pdfimg" src="images/excel.png" style="float:left" /> ' + name[0] + ' </td>' +
                 '<td style="    padding-bottom: 10px;" ><a href="files/DigitalAssets/' + res.excel[i] + '" target="_blank" class="btn btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
             '</tr>';
        }

        for (var i = 0 ; i < res.pdf.length; i++) {
            var name = res.pdf[i].split('.');
            dhtml += '<tr>' +
                 '<td> <img class="pdfimg" src="images/pdf.png" style="float:left" /> ' + name[0] + ' </td>' +
                 '<td style="    padding-bottom: 10px;" ><a  href="files/DigitalAssets/' + res.pdf[i] + '" target="_blank" class="btn btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
             '</tr>';
        }


        var mhtml = "";

        for (var i = 0 ; i < res.videos.length; i++) {
            var name = res.videos[i].split('.');
            mhtml += '<tr>' +
                 '<td> <img class="pdfimg" src="images/mp4.png" style="float:left" /> ' + name[0] + ' </td>' +
                 '<td style="    padding-bottom: 10px;" ><a   href="files/DigitalAssets/' + res.videos[i] + '" target="_blank" class="btn btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
             '</tr>';
        }


        var phtml = "";

        for (var i = 0 ; i < res.ppt.length; i++) {
            var name = res.ppt[i].split('.');
            phtml += '<tr>' +
                 '<td> <img class="pdfimg" src="images/ppt.png" style="float:left" /> ' + name[0] + ' </td>' +
                 '<td style="    padding-bottom: 10px;" ><a href="files/DigitalAssets/' + res.ppt[i] + '" target="_blank" class=" btn btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
             '</tr>';
        }


        $("#dadocs").html(dhtml);
        $("#damedia").html(mhtml);
        $("#dapres").html(phtml);

    }



}


function LoadCRepo() {
    var cb = new CallBack();
    cb.func = "onGetRepos";

    _gUserService.GetAssets(2, cb, true);
    blockUI("body");
}


function onGetRepos(res, cb) {
    unblockUI("body");

    if (res != null) {
        var dhtml = "";

        for (var i = 0 ; i < res.word.length; i++) {
            var name = res.word[i].split('.');
            dhtml += '<tr>' +
                 '<td> <img class="pdfimg" src="images/doc.png" style="float:left" /> ' + name[0] + ' </td>' +
                 '<td style="    padding-bottom: 10px;" ><a href="files/Conrep/' + res.word[i] + '" target="_blank" class=" btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
             '</tr>';
        }

        for (var i = 0 ; i < res.excel.length; i++) {
            var name = res.excel[i].split('.');
            dhtml += '<tr>' +
                 '<td> <img class="pdfimg" src="images/excel.png" style="float:left" /> ' + name[0] + ' </td>' +
                 '<td style="    padding-bottom: 10px;" ><a href="files/Conrep/' + res.excel[i] + '" target="_blank" class=" btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
             '</tr>';
        }

        for (var i = 0 ; i < res.pdf.length; i++) {
            var name = res.pdf[i].split('.');
            dhtml += '<tr>' +
                 '<td> <img class="pdfimg" src="images/pdf.png" style="float:left" /> ' + name[0] + ' </td>' +
                 '<td style="    padding-bottom: 10px;" ><a  download="' + res.videos[i] + '"  href="files/Conrep/' + res.pdf[i] + '" target="_blank" class=" btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
             '</tr>';
        }


        var mhtml = "";

        for (var i = 0 ; i < res.videos.length; i++) {
            var name = res.videos[i].split('.');
            mhtml += '<tr>' +
                 '<td> <img class="pdfimg" src="images/mp4.png" style="float:left" /> ' + name[0] + ' </td>' +
                 '<td style="    padding-bottom: 10px;" ><a download="' + res.videos[i] + '" href="files/Conrep/' + res.videos[i] + '" target="_blank" class=" btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
             '</tr>';
        }


        var phtml = "";

        for (var i = 0 ; i < res.ppt.length; i++) {
            var name = res.ppt[i].split('.');
            phtml += '<tr>' +
                 '<td> <img class="pdfimg" src="images/ppt.png" style="float:left" /> ' + name[0] + ' </td>' +
                 '<td style="    padding-bottom: 10px;" ><a href="files/Conrep/' + res.ppt[i] + '" target="_blank" class=" btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
             '</tr>';
        }


        $("#crdocs").html(dhtml);
        $("#crmedia").html(mhtml);
        $("#crpres").html(phtml);

    }



}
