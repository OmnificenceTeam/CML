function LoadOpinionPage() {
    var data = _glocalStorage.loadData("login");

    var cb = new CallBack();
    cb.func = "onGetOpinion";

    _gUserService.GetActiveQuestion(data.userid, cb, true);
    blockUI("body");

}

$(document).ready(function () {
   
  //caseplayer function//
    var Case = location.pathname;
    var name = Case.split("/").pop();
    
    if (name == "case1.html") {

         var casep = _glocalStorage.loadData("casefirst");
         
         if (casep == null || casep == "undefined") {


                $("#instruct1").show();

                $("#instruct1").on('click', function () {
                    $("#instruct2").show();

                });
                $("#instruct2").on('click', function () {
                    $("#instruct3").show();

                });
                $("#instruct3").on('click', function () {
                    $("#instruct4").show();

                });
                $("#instruct4").on('click', function () {
                    $("#instruct5").show();

                });
                $("#instruct5").on('click', function () {
                    $("#instruct6").show();

                });

                _glocalStorage.saveData("casefirst", "true");
            }
        
    }
                                        //end//


    else {
        blockUI("body");
        $("#webc").find("input").keyup(function (e) {
            var code = e.which; // recommended to use e.which, it's normalized across browsers
            if (code == 13) e.preventDefault();
            if (code == 32 || code == 13 || code == 188 || code == 186) {
                onClickSubmitQuestion();
            } // missing closing if brace
        });




        var data = _glocalStorage.loadData("login");
        if (data == null || data == undefined)
            window.location.href = "landing.html";


        $("#cemail").val(data.email);

       var ft = _glocalStorage.loadData("firsttime");
        if (ft == null || ft == undefined) {
            $("#instruct").show();
            _glocalStorage.saveData("firsttime", "true");
        }

        $("#hdnUserID").val(data.userid);

        var page = getQueryParams(document.location.search);
        if (page.page != undefined) {
            $(".pt-page-current").removeClass("pt-page-current");
            $("#" + page.page).addClass("pt-page-current");
            onLoadCS();
        }
        else {
            var cb = new CallBack();
            cb.func = "onGetOpinion";

            _gUserService.GetActiveQuestion(data.userid, cb, true);

        }


        if ($("#section3").height() < $("#section3").find(".intro").height())
            alert();


    }

   

});


function onGetOpinion(result, cb) {
    unblockUI("body");
    if (result != null) {
        var res = result.opinion[0];
        var sub = result.subscription;
        var webcast = result.webcast[0];

        for (var i = 0 ; i < sub.length ; i++) {
            if (res.opinionid == sub[i].opinionid && sub[i].type == 1) {
                $("#btn-opi-sub").attr("disabled", "disabled");
                $("#btn-opi-sub").addClass("btn-gray");
                $("#btn-opi-sub").val("Subscribed");
            }

            if (res.opinionid == sub[i].opinionid && sub[i].type == 3) {
                $("#btn-ask-sub").attr("disabled", "disabled");
                $("#btn-ask-sub").addClass("btn-gray");
                $("#btn-ask-sub").val("Subscribed");
            }
        }



        if (new Date(webcast.sdate) < new Date()) {
            $("#cwebcasta").show()
            $("#cwebcastua").hide()
        }
        else {
            $("#cwebcasta").hide()
            $("#cwebcastua").show()
            $("#cwebcastua").attr("data-value", new Date(webcast.sdate).toLocaleString());
        }


        if (new Date(webcast.edate) <= new Date()) {
            $("#webc").show();
            $("#webc_notactive").hide();
        }



        $("#hdnOpinionID").val(res.opinionid);
        if (new Date(res.startdate) > new Date() && new Date(res.startdate) < new Date()) {
            $("#youropinion_notactive").hide();
            $("#youropinion").show();

            $("#opiQues").html(res.opinion);
            var cd = new CommentData();
            cd.opinionid = parseInt($("#hdnOpinionID").val());
            cd.userid = parseInt($("#hdnUserID").val());

            var cb = new CallBack();
            cb.func = "onGetComments";
            cb.data = true;

            _gUserService.GetComments(cd, cb, true);
            blockUI("body");

            $('#commentMainDiv').bind('scroll', function () { $('.tooltip').hide(); });
        }
    }
}

var _cres = new Array();

function onGetComments(res, cb) {
    unblockUI("body");

    if (res != null) {
     
        var html = "";
        if (res.userid != null || res.userid != undefined) {
            html += GenerateComment(res, cb);
        }
        else {
            for (var i = 0; i < res.length; i++) {
                html += GenerateComment(res[i], cb);
            }
        }
        $("#commentMainDiv").html(html);


        initRating();

    }
    else {
        $("#commentMainDiv").html("<center>No comments posted yet</center>");


        initRating();
    }

}

function initRating() {
    $('.tip').each(function () {
        $(this).tooltip(
        {
            html: true,
            title: function () {
                return $(this).parents("table").find("." + $(this).data('tip')).html();
            },
            placement: 'left',
            trigger: 'disabled',
            container: 'body'
        });
    });

    $('.tip').click(function () {
        $(this).tooltip('show'); //all but this
        $('.tip').not(this).tooltip('hide');
    });


    $(document).click(function (e) {
        if (!$(e.target).parents().hasClass("tip"))
            $(".tip").tooltip('hide');
    });
    $("div").scroll(function () {
        $(".tip").tooltip('hide');
    });


    $('.rating').rating();
    $('.rating').on('rating.change', function (event, value, caption) {
        $(this).rating('refresh', { disabled: true });
        var r = new RatingData();
        r.commentid = parseInt($(this).data("id"));
        r.rating = parseInt(value);
        r.userid = parseInt($("#hdnUserID").val());

        var cb = new CallBack();
        cb.func = "onRatedComment";


        _gUserService.RateComment(r, cb, true);


        showLoader();
        window.location.href = "?page=page-op";
    });
}



function setDelvariable(data, ele) {
    delvariable = ele;
    $("#hdndelcom").val(data);
}
function onDeleteComment() {
    // $("#modaldelcom").modal("show");
    // var del=$("#modaldelcom").find("button").attr("id", delYes);

    //var del = $("#delYes").html();
    var hdnid = $("#hdndelcom").val();



    //var r = confirm("Are you sure you want to delete your comment ?");
    //if (r != true) {
    //    return;
    //}
    if (hdnid != hdnid) {
        return;
    }
    showLoader();
    var cb = new CallBack();
    cb.func = "onDeletedComment";
    _gUserService.DeleteComment(hdnid, cb, true);
    $(delvariable).parents(".opinionDiv").remove();

}

function onDeletedComment(res, cb) {
    for (var index = 0; index < _cres.length; index++) {
        if (parseInt(_cres[index].commentid) == parseInt($("#hdndelcom").val())) {
            delete _cres[index];
        }
    }
    
    hideLoader();
    LoadOpinionPage();
}

function onRatedComment(res, cb) {
    hideLoader();
    LoadOpinionPage();
}

function onClickPostComment() {
    var ab = new alertbox();
    ab.id = "#postMsg";

    if ($("#txtPostCmt").val() == "") {
        ab.showError('*Comment cannot be empty.');
        return;
    }

    var cd = new CommentData();
    cd.opinionid = parseInt($("#hdnOpinionID").val());
    cd.userid = parseInt($("#hdnUserID").val());
    cd.comment = $("#txtPostCmt").val().replace(/(?:\r\n|\r|\n)/g, '<br />');

    var cb = new CallBack();
    cb.func = "onPostedComment";
    cb.data = cd;

    _gUserService.PostComment(cd, cb, true);
    showLoader();

}

function onPostedComment(res, cb) {
    hideLoader();
    if (res) {
        var d = new Date();
        var n = d.toLocaleString();
        var data = {
            comment: cb.comment,
            commentdate: n,
            commentid: res.commentid,
            firstname: res.firstname,
            rating: 0,
            star1: 0,
            star2: 0,
            star3: 0,
            star4: 0,
            star5: 0,
            userid: 0
        }

        var htm = GenerateComment(data);
        $("#commentMainDiv").prepend(htm);
        initRating();
        modalAlert("The opinion will be reviewed by the program admin and will be deleted (within 24 hrs) if it is not in accordance to program compliance guidelines.");
        LoadOpinionPage();
    }

    $("#txtPostCmt").val("");


}



var delvariable = '';
function GenerateComment(data, status) {

    var total = data.star1 + data.star2 + data.star3 + data.star4 + data.star5;
    if (total == 0)
        total = 1;

    var s1 = (data.star1 / total) * 100;
    var s2 = (data.star2 / total) * 100;
    var s3 = (data.star3 / total) * 100;
    var s4 = (data.star4 / total) * 100;
    var s5 = (data.star5 / total) * 100;

    var totalP = parseFloat((data.star1 + data.star2 * 2 + data.star3 * 3 + data.star4 * 4 + data.star5 * 5) / (total)).toFixed(1);

    data.total = totalP;

    var star = "";
    if (data.rating > 0)
        star = '<input id="input-21d" data-id="' + data.commentid + '" value="' + data.rating + '" type="number" disabled class="rating" min=0 max=5 step=1 data-size="xs">';
    else
        star = '<input id="input-21d"  data-id="' + data.commentid + '" value="0" type="number"  class="rating" min=0 max=5 step=1 data-size="xs">';

    var delBtn = "";



    if (data.userid == parseInt($("#hdnUserID").val())) {
        delBtn += "<span onclick='setDelvariable(" + data.commentid + ",this)' class='delpost' data-toggle='modal' data-target='#modaldelcom'><span class='glyphicon glyphicon-remove'></span></span>";
        star = '<input id="input-21d"  data-id="' + data.commentid + '" value="0" type="number"  disabled class="rating" min=0 max=5 step=1 data-size="xs">';

        //$("#hdndelele").val(this);
    }
    var html = '<div class="opinionDiv">' +
            '<table class="tFull">' +
                  '<tr>' +
                  '<td rowspan="2" class="tdimg"><img class="spImg" src="' + _gLocalUrl + 'GetFile.aspx?type=image&id=' + data.userid + ' " /></td>' +
                  '<td colspan="2" class="tdname"><span class="pname">' + data.firstname + '</span><span class="ptime"> | ' + timeDifference(data.commentdate) + '</span>' + delBtn + '</td>' +
                  '</tr>' +
                  '<tr>' +
                  '<td class="tddesc" style="text-align:justify;">' +
                  data.comment +
                  '</td>' +
                  '<td class="tdrating hidden-xs">' +
                  '<table class="">' +
                  '<tr>' +
                  '<td class="rat-txt">Rate this scenario</td>' +
                  '<td rowspan="2">' +
                  '<div class="ratDiv tip" data-tip="my-tip"><p class="txtRat">Rating</p> <p class="valrat">' + totalP + '</p> </div>' +
                  '<div class="my-tip hidden">' +
                  '<table class="tabRat">' +
                  '<tr><td colspan="3">' + totalP + ' out 5 stars</td>' +
                  '</tr><tr><td class="one">5 star</td>' +
                  '<td class="two">' +
                  '<div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar"  aria-valuemin="0" aria-valuemax="100" style="width: ' + s5 + '%;">' +
                  '</div></div>' +
                  '</td>' +
                  '<td class="three">' + data.star5 + '</td>' +
                  '</tr>' +
                  '<tr>' +
                  '<td class="one">4 star</td>' +
                  '<td class="two">' +
                  '<div class="progress">' +
                  '<div class="progress-bar progress-bar-warning" role="progressbar"  aria-valuemin="0" aria-valuemax="100" style="width: ' + s4 + '%;">' +
                  '</div>' +
                  '</div>' +
                  '</td>' +
                  '<td class="three">' + data.star4 + '</td>' +
                  '</tr>' +
                  '<tr>' +
                  '<td class="one">3 star</td>' +
                  '<td class="two">' +
                  '<div class="progress">' +
                  '<div class="progress-bar progress-bar-warning" role="progressbar"  aria-valuemin="0" aria-valuemax="100" style="width: ' + s3 + '%;">' +
                  '</div>' +
                  '</div>' +
                  '</td>' +
                  '<td class="three">' + data.star3 + '</td>' +
                  '</tr>' +
                  '<tr>' +
                  '<td class="one">2 star</td>' +
                  '<td class="two">' +
                  '<div class="progress">' +
                  ' <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ' + s2 + '%;">' +
                  '</div>' +
                  '</div>' +
                  '</td>' +
                  '<td class="three">' + data.star2 + '</td>' +
                  ' </tr>' +
                  '<tr>' +
                  '<td class="one">1 star</td>' +
                  '<td class="two">' +
                  '<div class="progress">' +
                  '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ' + s1 + '%">' +
                  '</div>' +
                  '</div>' +
                  '</td>' +
                  '<td class="three">' + data.star1 + '</td>' +
                  '</tr>' +
                  '</table>' +
                  '</div>' +
                  '</td>' +
                  '</tr>' +
                  '<tr>' +
                  '<td>' + star + '</td>' +
                  '</tr>' +
                  '</table>' +
                  '</td>' +
                  '</tr>' +
                  '<tr class="visible-xs">' +
                  '<td colspan="3">' +
                  '<table style="float:right;">' +
                  '<tr>' +
                  '<td  class="rat-txt">Rate this scenario</td>' +
                  '<td rowspan="2">' +
                  '<div class="ratDiv tip" data-tip="my-tip"><p class="txtRat">Rating</p> <p class="valrat">' + totalP + '</p> </div>' +
                  '</td>' +
                  '</tr>' +
                  '<tr>' +
                  '<td>' + star + '</td>' +
                  '</tr>' +
                  '</table>' +
                  '</td>' +
                  '</tr>' +
                  '</table>' +
                  '</div>';

    if (status) {
        _cres.push(data);

        _cres = removeDuplicatesById(_cres);
    }

    return html;

}

function removeDuplicatesById(list) {
    var tempArr = []
    var uniqueList = [];
    $.each(list, function (index, value) {
        if ($.inArray(value.commentid, tempArr) == -1) {
            tempArr.push(value.commentid);
            uniqueList.push(value);
        }
    });

    return uniqueList;
}


function onchangeopinion(ele) {
    var test = _cres;
    if (parseInt($(ele).val()) == 2)
        test.sort(dynamicSort("total"));
    else
        test.sort(dynamicSort("commentdate"));

    onGetComments(test, false);
}


function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


