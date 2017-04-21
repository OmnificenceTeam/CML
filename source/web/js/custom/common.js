function onClickMenu(ele) {
    $("#menu").toggleClass("active");
    $("#footer").toggle();
    $("#content").toggleClass("active");
    $(ele).find(".hamburger").toggleClass('active');
    $(ele).toggleClass("active");
    $("video").toggle();
}


function logout() {
    _glocalStorage.saveData("login", null);
    window.location.href = "landing.html";
}

function onCmenu()
{
    $("#accordionELN").find(".panel-heading").removeClass("collapsed").addClass("collapsed");
    $("#accordionELN").find(".in").removeClass("in");
    $("#accordionNCCN").find(".panel-heading").removeClass("collapsed").addClass("collapsed");
    $("#accordionNCCN").find(".in").removeClass("in");

    for (i = 1; i < 8; i++) {

        $("#remove"+i).css("display", "none");
        $("#hovereffect" + i).css("display", "block");

        divbounceremove("remove" + i);
        addactive("hovereffect" + i);
        linkclick1 = 0;
        linkclick2 = 0;
        linkclick3 = 0;
        linkclick4 = 0;
        linkclick5 = 0;
        linkclick6 = 0;
        linkclick7 = 0;
    }
    for (i = 1; i < 6; i++) {

        $("#NCCNremove"+i).css("display", "none");
        $("#NCCNhovereffect" + i).css("display", "block");

        divbounceremove("NCCNremove" + i);
        addactive("NCCNhovereffect" + i);
        NCCNlinkclick1 = 0;
        NCCNlinkclick2 = 0;
        NCCNlinkclick3 = 0;
        NCCNlinkclick4 = 0;
        NCCNlinkclick5 = 0;
    }
}


function onSubscribe(type, id) {

    var cd = new Subscribe();
    cd.opinionid = parseInt($("#hdnOpinionID").val());
    cd.userid = parseInt($("#hdnUserID").val());
    cd.type = type;

    var cb = new CallBack();
    cb.func = "onSubscribed";
    cb.data = id;

    _gUserService.AddSubscription(cd, cb, true);
    showLoader();

}

function onSubscribed(res, cb) {
    hideLoader();
    if (res) {
        modalAlert("You have been subscribed successfully.")
        $(cb).attr("disabled", "disabled");
        $(cb).val("Subscribed");
        $(cb).addClass("btn-gray");
    }
}



function LoadCasePage() {



    var cb = new CallBack();
    cb.func = "onGetCaseRating";
    cb.data = true;

    _gUserService.GetCaseRating(parseInt($("#hdnUserID").val()), cb, true);



}

function onGetCaseRating(res, cb) {
    if (res != null) {
        if (res != undefined) {

            for (var i = 0; i < res.length; i++) {
                var data = res[i];
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

                if (data.rating > 0)
                    $("#case" + data.caseid + "user").attr("disabled", "disabled");

                $("#case" + data.caseid + "tpo").html(totalP);
                $("#case" + data.caseid + "tp").html(totalP);

                $("#case" + data.caseid + "user").val(data.rating);

                $("#case" + data.caseid + "5starv").html(data.star5);
                $("#case" + data.caseid + "5starw").css("width", s5 + "%");
                $("#case" + data.caseid + "4starv").html(data.star4);
                $("#case" + data.caseid + "4starw").css("width", s4 + "%");
                $("#case" + data.caseid + "3starv").html(data.star3);
                $("#case" + data.caseid + "3starw").css("width", s3 + "%");
                $("#case" + data.caseid + "2starv").html(data.star2);
                $("#case" + data.caseid + "2starw").css("width", s2 + "%");
                $("#case" + data.caseid + "1starv").html(data.star1);
                $("#case" + data.caseid + "1starw").css("width", s1 + "%");
            }
        }

    }


    //$('.tip').each(function () {
    //    $(this).tooltip(
    //    {
    //        html: true,
    //        title: function () {
    //            return $(this).parents("table").find("." + $(this).data('tip')).html();
    //        },
    //        placement: 'left',
    //        trigger: 'click',
    //        container: 'body'
    //    });

    //    $(this).on('show.bs.tooltip', function () {
    //        $('.tip').not(this).tooltip('hide'); //all but this
    //    })

    //});

    //$(document).click(function (e) {
    //    if (!$(e.target).parents().hasClass("tip"))
    //        $(".tip").tooltip('hide');
    ////});



    $('.crating').rating();
    $('.crating').on('rating.change', function (event, value, caption) {
        $(this).rating('refresh', { disabled: true });
        var r = new RatingData();
        r.commentid = parseInt($(this).data("id"));
        r.rating = parseInt(value);
        r.userid = parseInt($("#hdnUserID").val());

        var cb = new CallBack();
        cb.func = "onRatedComment";


        _gUserService.RateCase(r, cb, true);


        showLoader();
        window.location.href = "?page=page-cs";
    });


    var data = _glocalStorage.loadData("login");

    var cb = new CallBack();
    cb.func = "onGetOpinion";

    _gUserService.GetActiveQuestion(data.userid, cb, true);
    blockUI("body");


}



$(".accordion-body").on("shown.bs.collapse", function () {
    var selected = $(this);
    var collapseh = $(".collapse.in").height();
    $.scrollTo(selected, 500, {
        offset: -(collapseh)
    });
});


function onClickAddCallender()
{

    var data = _glocalStorage.loadData("login");
    var cb = new CallBack();
    cb.func = "onAddedtoCal";

    _gUserService.AddToCal(data.userid, cb, true);
    blockUI("body");

}

function onAddedtoCal(res, cb)
{
    unblockUI("body");
}

/*guideline page animation page*/

var guide = 0;
function display_guide(obj) {
    //if(event.which==1){

    guide++;



    if (obj == "accordionNCCN") {
        obj = "NCCNguideline";
        if (guide == 1) {
            setTimeout(function () {
                $(document).ready(function () {
                    $("#" + obj + "5").css("opacity", "0.4");
                    $("#" + obj + "5").css("display", "block");
                    setTimeout(function () {
                        $("#" + obj + "1").fadeIn();

                    }, 200);
                    setTimeout(function () { guide2() }, 200);
                    function guide2() {
                        setTimeout(function () {
                            $("#" + obj + "2").fadeIn();

                        });
                        setTimeout(function () { guide3() }, 200);
                    }
                    function guide3() {
                        setTimeout(function () {
                            $("#" + obj + "3").fadeIn();

                        });
                        setTimeout(function () { guide4() }, 200);
                    }
                    function guide4() {
                        setTimeout(function () {
                            $("#" + obj + "4").fadeIn();

                        });
                        setTimeout(function () { guide5() }, 200);

                    }
                    function guide5() {
                        setTimeout(function () {
                            $("#" + obj + "5").css("opacity", "1");
                            setTimeout(function () { guide1_h4() },200);
                        });
                        
                    }
                });

                function guide1_h4() {

                    $("#" + obj + "1").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "1").find('h4').css("opacity", "1");
                    setTimeout(function () { guide2_h4() }, 200);
                };

                function guide2_h4() {

                    $("#" + obj + "2").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "2").find('h4').css("opacity", "1");
                    setTimeout(function () { guide3_h4() }, 200);
                }
                function guide3_h4() {
                    $("#" + obj + "3").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "3").find('h4').css("opacity", "1");
                    setTimeout(function () { guide4_h4() }, 200);
                }
                function guide4_h4() {

                    $("#" + obj + "4").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "4").find('h4').css("opacity", "1");
                    setTimeout(function () { guide5_h4() }, 200);

                }
                function guide5_h4() {

                    $("#" + obj + "5").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "5").find('h4').css("opacity", "1");
                   
                }

            }, 200);
        }

        guideline_return('accordionNCCN');
    }


    else if (obj == "accordionELN") {      

        obj = "guideline";

        if (guide == 1) {
            setTimeout(function () {
                $(document).ready(function () {
                    $("#" + obj + "7").css("opacity", "0.4");
                    $("#" + obj + "7").css("display", "block");
                    setTimeout(function () {
                        $("#" + obj + "1").fadeIn();

                    }, 200);
                    setTimeout(function () { guide2() }, 200);
                    function guide2() {
                        setTimeout(function () {
                            $("#" + obj + "2").fadeIn();

                        });
                        setTimeout(function () { guide3() }, 200);
                    }
                    function guide3() {
                        setTimeout(function () {
                            $("#" + obj + "3").fadeIn();

                        });
                        setTimeout(function () { guide4() }, 200);
                    }
                    function guide4() {
                        setTimeout(function () {
                            $("#" + obj + "4").fadeIn();

                        });
                        setTimeout(function () { guide5() }, 200);

                    }
                    function guide5() {
                        setTimeout(function () {
                            $("#" + obj + "5").fadeIn();

                        });
                        setTimeout(function () { guide6() }, 200);
                    }
                    function guide6() {
                        setTimeout(function () {
                            $("#" + obj + "6").fadeIn();

                        });
                        setTimeout(function () { guide7() }, 200);
                    }
                    function guide7() {
                        setTimeout(function () { $("#" + obj + "7").css("opacity", "1") });
                        guide1_h4();
                    }

                });

                function guide1_h4() {

                    $("#" + obj + "1").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "1").find('h4').css("opacity", "1");
                    setTimeout(function () { guide2_h4() }, 200);
                };

                function guide2_h4() {

                    $("#" + obj + "2").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "2").find('h4').css("opacity", "1");
                    setTimeout(function () { guide3_h4() }, 200);
                }
                function guide3_h4() {
                    $("#" + obj + "3").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "3").find('h4').css("opacity", "1");
                    setTimeout(function () { guide4_h4() }, 200);
                }
                function guide4_h4() {

                    $("#" + obj + "4").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "4").find('h4').css("opacity", "1");
                    setTimeout(function () { guide5_h4() }, 200);

                }
                function guide5_h4() {

                    $("#" + obj + "5").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "5").find('h4').css("opacity", "1");
                    setTimeout(function () { guide6_h4() }, 200);
                }
                function guide6_h4() {
                    $("#" + obj + "6").find('h4').addClass('animated fadeInUp');
                    $("#" + obj + "6").find('h4').css("opacity", "1");
                    setTimeout(function () { guide7_h4() }, 200);
                }
                function guide7_h4() {
                    setTimeout(function () {
                        $("#" + obj + "7").find('h4').addClass('animated fadeInUp');
                        $("#" + obj + "7").find('h4').css("opacity", "1");
                    });
                }


            }, 500);
        }
        guideline_return('accordionELN');
    }  
    //}
}

function checkguide() {
    if (guide >= 0) {
        guideline_return('accordionELN');
        guideline_return('accordionNCCN');
        display_guide('accordionELN');
        display_guide('accordionNCCN');
    }
}


/*guideline page animation return function*/
function guideline_return(obj) {

    //if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //    return;
    //}
    //else
    //{

    guide = 0;
    if (obj == "accordionELN") {
        obj = "guideline"
    }
    if (obj == "accordionNCCN") {
        obj = "NCCNguideline"
    }
    for (i = 1; i <= 2; i++)
    {
        if (i == 1 && obj == "guideline") {
            obj = "guideline";
        }
        else if (i == 1 && obj == "NCCNguideline") {
            obj = "NCCNguideline";
        }
        if (i == 2 && obj == "guideline") {
            obj = "NCCNguideline";
        }
        else if (i == 2 && obj == "NCCNguideline") {
            obj = "guideline";
        }
        $("#" + obj + "1").css("display", "none");
        $("#" + obj + "2").css("display", "none");
        $("#" + obj + "3").css("display", "none");
        $("#" + obj + "4").css("display", "none");
        $("#" + obj + "5").css("display", "none");
        $("#" + obj + "6").css("display", "none");
        $("#" + obj + "7").css("display", "none");

        $("#" + obj + "1").find('h4').css("opacity", "0");
        $("#" + obj + "1").find('h4').removeClass('animated fadeInUp');

        $("#" + obj + "2").find('h4').css("opacity", "0");
        $("#" + obj + "2").find('h4').removeClass('animated fadeInUp');

        $("#" + obj + "3").find('h4').css("opacity", "0");
        $("#" + obj + "3").find('h4').removeClass('animated fadeInUp');

        $("#" + obj + "4").find('h4').css("opacity", "0");
        $("#" + obj + "4").find('h4').removeClass('animated fadeInUp');

        $("#" + obj + "5").find('h4').css("opacity", "0");
        $("#" + obj + "5").find('h4').removeClass('animated fadeInUp');

        $("#" + obj + "6").find('h4').css("opacity", "0");
        $("#" + obj + "6").find('h4').removeClass('animated fadeInUp');

        $("#" + obj + "7").find('h4').css("opacity", "0");
        $("#" + obj + "7").find('h4').removeClass('animated fadeInUp');
    }
    obj = "";

    //}
}






/*Guidelines grid mouse over ,leave function*/
$(document).ready(function () {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
       
       
        
        for (i = 1; i <= 7; i++) {
          
                $("#hovereffect"+i).removeClass('animated zoomIn');
                $("#hovereffect"+i).css("opacity", "0");
                $("#hovereffect"+i).css("visibility", "hidden");


                $("#hoverinner"+i).removeClass('animated zoomIn');
                $("#hoverinner"+i).css("opacity", "0");
                $("#hoverinner"+i).css("visibility", "hidden");

                $("#arrow"+i).removeClass('fadeInDown');
                setTimeout(function () { $("#arrow"+i).css("opacity", "1"); }, 900);
                $("#arrow"+i).css("visibility", "hidden");

          

        }
        for (i = 1; i <= 5; i++) {

           
                $("#NCCNhovereffect" + i).removeClass('animated zoomIn');
                $("#NCCNhovereffect" + i).css("opacity", "0");
                $("#NCCNhovereffect" + i).css("visibility", "hidden");


                $("#NCCNhoverinner" + i).removeClass('animated zoomIn');
                $("#NCCNhoverinner" + i).css("opacity", "0");
                $("#NCCNhoverinner" + i).css("visibility", "hidden");

                $("#NCCNarrow" + i).removeClass('fadeInDown');
                $("#NCCNarrow" + i).css("opacity", "1"); 
                $("#NCCNarrow" + i).css("visibility", "hidden");

           
        }
    }

    else {  

        /*ELN guideline*/
        //mouse over function

        $("#guideline1").mouseenter(function () {
            $("#hovereffect1").addClass('animated zoomIn');
            $("#hovereffect1").css("opacity", "1");
            $("#hovereffect1").css("visibility", "visible");


            $("#hoverinner1").addClass('animated zoomIn');
            $("#hoverinner1").css("opacity", "1");
            $("#hoverinner1").css("visibility", "visible");

            $("#arrow1").addClass('fadeInDown');
            setTimeout(function () { $("#arrow1").css("opacity", "1"); }, 900);
            $("#arrow1").css("visibility", "visible");

        });

        $("#guideline2").mouseenter(function () {
            $("#hovereffect2").addClass('animated zoomIn');
            $("#hovereffect2").css("opacity", "1");
            $("#hovereffect2").css("visibility", "visible");

            $("#hoverinner2").addClass('animated zoomIn');
            $("#hoverinner2").css("opacity", "1");
            $("#hoverinner2").css("visibility", "visible");

            $("#arrow2").addClass('fadeInDown');
            setTimeout(function () { $("#arrow2").css("opacity", "1"); }, 900);
            $("#arrow2").css("visibility", "visible");

        });

        $("#guideline3").mouseenter(function () {
            $("#hovereffect3").addClass('animated zoomIn');
            $("#hovereffect3").css("opacity", "1");
            $("#hovereffect3").css("visibility", "visible");

            $("#hoverinner3").addClass('animated zoomIn');
            $("#hoverinner3").css("opacity", "1");
            $("#hoverinner3").css("visibility", "visible");

            $("#arrow3").addClass('fadeInDown');
            setTimeout(function () { $("#arrow3").css("opacity", "1"); }, 900);
            $("#arrow3").css("visibility", "visible");

        });

        $("#guideline4").mouseenter(function () {
            $("#hovereffect4").addClass('animated zoomIn');
            $("#hovereffect4").css("opacity", "1");
            $("#hovereffect4").css("visibility", "visible");

            $("#hoverinner4").addClass('animated zoomIn');
            $("#hoverinner4").css("opacity", "1");
            $("#hoverinner4").css("visibility", "visible");

            $("#arrow4").addClass('fadeInDown');
            setTimeout(function () { $("#arrow4").css("opacity", "1"); }, 900);
            $("#arrow4").css("visibility", "visible");

        });

        $("#guideline5").mouseenter(function () {
            $("#hovereffect5").addClass('animated zoomIn');
            $("#hovereffect5").css("opacity", "1");
            $("#hovereffect5").css("visibility", "visible");

            $("#hoverinner5").addClass('animated zoomIn');
            $("#hoverinner5").css("opacity", "1");
            $("#hoverinner5").css("visibility", "visible");

            $("#arrow5").addClass('fadeInDown');
            setTimeout(function () { $("#arrow5").css("opacity", "1"); }, 900);
            $("#arrow5").css("visibility", "visible");

        });

        $("#guideline6").mouseenter(function () {
            $("#hovereffect6").addClass('animated zoomIn');
            $("#hovereffect6").css("opacity", "1");
            $("#hovereffect6").css("visibility", "visible");

            $("#hoverinner6").addClass('animated zoomIn');
            $("#hoverinner6").css("opacity", "1");
            $("#hoverinner6").css("visibility", "visible");

            $("#arrow6").addClass('fadeInDown');
            setTimeout(function () { $("#arrow6").css("opacity", "1"); }, 900);
            $("#arrow6").css("visibility", "visible");

        });

        $("#guideline7").mouseenter(function () {
            $("#hovereffect7").addClass('animated zoomIn');
            $("#hovereffect7").css("opacity", "1");
            $("#hovereffect7").css("visibility", "visible");

            $("#hoverinner7").addClass('animated zoomIn');
            $("#hoverinner7").css("opacity", "1");
            $("#hoverinner7").css("visibility", "visible");

            $("#arrow7").addClass('fadeInDown');
            setTimeout(function () { $("#arrow7").css("opacity", "1"); }, 900);
            $("#arrow7").css("visibility", "visible");

        });


        //mouse leave function

        $("#guideline1").mouseleave(function () {
            $("#hovereffect1").removeClass('animated zoomIn');
            $("#hovereffect1").css("opacity", "0");
            $("#hovereffect1").css("visibility", "hidden");

            $("#hoverinner1").removeClass('animated zoomIn');
            $("#hoverinner1").css("opacity", "0");
            $("#hoverinner1").css("visibility", "hidden");

            $("#arrow1").removeClass('fadeInDown');
            $("#arrow1").css("opacity", "0");
            $("#arrow1").css("visibility", "hidden");
        });

        $("#guideline2").mouseleave(function () {
            $("#hovereffect2").removeClass('animated zoomIn');
            $("#hovereffect2").css("opacity", "0");
            $("#hovereffect2").css("visibility", "hidden");

            $("#hoverinner2").removeClass('animated zoomIn');
            $("#hoverinner2").css("opacity", "0");
            $("#hoverinner2").css("visibility", "hidden");

            $("#arrow2").removeClass('fadeInDown');
            $("#arrow2").css("opacity", "0");
            $("#arrow2").css("visibility", "hidden");
        });

        $("#guideline3").mouseleave(function () {
            $("#hovereffect3").removeClass('animated zoomIn');
            $("#hovereffect3").css("opacity", "0");
            $("#hovereffect3").css("visibility", "hidden");

            $("#hoverinner3").removeClass('animated zoomIn');
            $("#hoverinner3").css("opacity", "0");
            $("#hoverinner3").css("visibility", "hidden");

            $("#arrow3").removeClass('fadeInDown');
            $("#arrow3").css("opacity", "0");
            $("#arrow3").css("visibility", "hidden");
        });

        $("#guideline4").mouseleave(function () {
            $("#hovereffect4").removeClass('animated zoomIn');
            $("#hovereffect4").css("opacity", "0");
            $("#hovereffect4").css("visibility", "hidden");

            $("#hoverinner4").removeClass('animated zoomIn');
            $("#hoverinner4").css("opacity", "0");
            $("#hoverinner4").css("visibility", "hidden");

            $("#arrow4").removeClass('fadeInDown');
            $("#arrow4").css("opacity", "0");
            $("#arrow4").css("visibility", "hidden");
        });

        $("#guideline5").mouseleave(function () {
            $("#hovereffect5").removeClass('animated zoomIn');
            $("#hovereffect5").css("opacity", "0");
            $("#hovereffect5").css("visibility", "hidden");

            $("#hoverinner5").removeClass('animated zoomIn');
            $("#hoverinner5").css("opacity", "0");
            $("#hoverinner5").css("visibility", "hidden");

            $("#arrow5").removeClass('fadeInDown');
            $("#arrow5").css("opacity", "0");
            $("#arrow5").css("visibility", "hidden");
        });

        $("#guideline6").mouseleave(function () {
            $("#hovereffect6").removeClass('animated zoomIn');
            $("#hovereffect6").css("opacity", "0");
            $("#hovereffect6").css("visibility", "hidden");

            $("#hoverinner6").removeClass('animated zoomIn');
            $("#hoverinner6").css("opacity", "0");
            $("#hoverinner6").css("visibility", "hidden");

            $("#arrow6").removeClass('fadeInDown');
            $("#arrow6").css("opacity", "0");
            $("#arrow6").css("visibility", "hidden");
        });

        $("#guideline7").mouseleave(function () {
            $("#hovereffect7").removeClass('animated zoomIn');
            $("#hovereffect7").css("opacity", "0");
            $("#hovereffect7").css("visibility", "hidden");

            $("#hoverinner7").removeClass('animated zoomIn');
            $("#hoverinner7").css("opacity", "0");
            $("#hoverinner7").css("visibility", "hidden");

            $("#arrow7").removeClass('fadeInDown');
            $("#arrow7").css("opacity", "0");
            $("#arrow7").css("visibility", "hidden");
        });



        /*NCCN guideline*/

        //mouse over function

        $("#NCCNguideline1").mouseenter(function () {
            $("#NCCNhovereffect1").addClass('animated zoomIn');
            $("#NCCNhovereffect1").css("opacity", "1");
            $("#NCCNhovereffect1").css("visibility", "visible");


            $("#NCCNhoverinner1").addClass('animated zoomIn');
            $("#NCCNhoverinner1").css("opacity", "1");
            $("#NCCNhoverinner1").css("visibility", "visible");

            $("#NCCNarrow1").addClass('fadeInDown');
            setTimeout(function () { $("#NCCNarrow1").css("opacity", "1"); }, 900);
            $("#NCCNarrow1").css("visibility", "visible");

        });

        $("#NCCNguideline2").mouseenter(function () {
            $("#NCCNhovereffect2").addClass('animated zoomIn');
            $("#NCCNhovereffect2").css("opacity", "1");
            $("#NCCNhovereffect2").css("visibility", "visible");

            $("#NCCNhoverinner2").addClass('animated zoomIn');
            $("#NCCNhoverinner2").css("opacity", "1");
            $("#NCCNhoverinner2").css("visibility", "visible");

            $("#NCCNarrow2").addClass('fadeInDown');
            setTimeout(function () { $("#NCCNarrow2").css("opacity", "1"); }, 900);
            $("#NCCNarrow2").css("visibility", "visible");

        });

        $("#NCCNguideline3").mouseenter(function () {
            $("#NCCNhovereffect3").addClass('animated zoomIn');
            $("#NCCNhovereffect3").css("opacity", "1");
            $("#NCCNhovereffect3").css("visibility", "visible");

            $("#NCCNhoverinner3").addClass('animated zoomIn');
            $("#NCCNhoverinner3").css("opacity", "1");
            $("#NCCNhoverinner3").css("visibility", "visible");

            $("#NCCNarrow3").addClass('fadeInDown');
            setTimeout(function () { $("#NCCNarrow3").css("opacity", "1"); }, 900);
            $("#NCCNarrow3").css("visibility", "visible");

        });

        $("#NCCNguideline4").mouseenter(function () {
            $("#NCCNhovereffect4").addClass('animated zoomIn');
            $("#NCCNhovereffect4").css("opacity", "1");
            $("#NCCNhovereffect4").css("visibility", "visible");

            $("#NCCNhoverinner4").addClass('animated zoomIn');
            $("#NCCNhoverinner4").css("opacity", "1");
            $("#NCCNhoverinner4").css("visibility", "visible");

            $("#NCCNarrow4").addClass('fadeInDown');
            setTimeout(function () { $("#NCCNarrow4").css("opacity", "1"); }, 900);
            $("#NCCNarrow4").css("visibility", "visible");

        });

        $("#NCCNguideline5").mouseenter(function () {
            $("#NCCNhovereffect5").addClass('animated zoomIn');
            $("#NCCNhovereffect5").css("opacity", "1");
            $("#NCCNhovereffect5").css("visibility", "visible");

            $("#NCCNhoverinner5").addClass('animated zoomIn');
            $("#NCCNhoverinner5").css("opacity", "1");
            $("#NCCNhoverinner5").css("visibility", "visible");

            $("#NCCNarrow5").addClass('fadeInDown');
            setTimeout(function () { $("#NCCNarrow5").css("opacity", "1"); }, 900);
            $("#NCCNarrow5").css("visibility", "visible");

        });



        //mouse leave function

        $("#NCCNguideline1").mouseleave(function () {
            $("#NCCNhovereffect1").removeClass('animated zoomIn');
            $("#NCCNhovereffect1").css("opacity", "0");
            $("#NCCNhovereffect1").css("visibility", "hidden");

            $("#NCCNhoverinner1").removeClass('animated zoomIn');
            $("#NCCNhoverinner1").css("opacity", "0");
            $("#NCCNhoverinner1").css("visibility", "hidden");

            $("#NCCNarrow1").removeClass('fadeInDown');
            $("#NCCNarrow1").css("opacity", "0");
            $("#NCCNarrow1").css("visibility", "hidden");
        });

        $("#NCCNguideline2").mouseleave(function () {
            $("#NCCNhovereffect2").removeClass('animated zoomIn');
            $("#NCCNhovereffect2").css("opacity", "0");
            $("#NCCNhovereffect2").css("visibility", "hidden");

            $("#NCCNhoverinner2").removeClass('animated zoomIn');
            $("#NCCNhoverinner2").css("opacity", "0");
            $("#NCCNhoverinner2").css("visibility", "hidden");

            $("#NCCNarrow2").removeClass('fadeInDown');
            $("#NCCNarrow2").css("opacity", "0");
            $("#NCCNarrow2").css("visibility", "hidden");
        });

        $("#NCCNguideline3").mouseleave(function () {
            $("#NCCNhovereffect3").removeClass('animated zoomIn');
            $("#NCCNhovereffect3").css("opacity", "0");
            $("#NCCNhovereffect3").css("visibility", "hidden");

            $("#NCCNhoverinner3").removeClass('animated zoomIn');
            $("#NCCNhoverinner3").css("opacity", "0");
            $("#NCCNhoverinner3").css("visibility", "hidden");

            $("#NCCNarrow3").removeClass('fadeInDown');
            $("#NCCNarrow3").css("opacity", "0");
            $("#NCCNarrow3").css("visibility", "hidden");
        });

        $("#NCCNguideline4").mouseleave(function () {
            $("#NCCNhovereffect4").removeClass('animated zoomIn');
            $("#NCCNhovereffect4").css("opacity", "0");
            $("#NCCNhovereffect4").css("visibility", "hidden");

            $("#NCCNhoverinner4").removeClass('animated zoomIn');
            $("#NCCNhoverinner4").css("opacity", "0");
            $("#NCCNhoverinner4").css("visibility", "hidden");

            $("#NCCNarrow4").removeClass('fadeInDown');
            $("#NCCNarrow4").css("opacity", "0");
            $("#NCCNarrow4").css("visibility", "hidden");
        });

        $("#NCCNguideline5").mouseleave(function () {
            $("#NCCNhovereffect5").removeClass('animated zoomIn');
            $("#NCCNhovereffect5").css("opacity", "0");
            $("#NCCNhovereffect5").css("visibility", "hidden");

            $("#NCCNhoverinner5").removeClass('animated zoomIn');
            $("#NCCNhoverinner5").css("opacity", "0");
            $("#NCCNhoverinner5").css("visibility", "hidden");

            $("#NCCNarrow5").removeClass('fadeInDown');
            $("#NCCNarrow5").css("opacity", "0");
            $("#NCCNarrow5").css("visibility", "hidden");
        });
    }


});


var ele = "";

var linkclick1 = 0;
var linkclick2 = 0;
var linkclick3 = 0;
var linkclick4 = 0;
var linkclick5 = 0;
var linkclick6 = 0;
var linkclick7 = 0;


var NCCNlinkclick1 = 0;
var NCCNlinkclick2 = 0;
var NCCNlinkclick3 = 0;
var NCCNlinkclick4 = 0;
var NCCNlinkclick5 = 0;

function removebutton(obj) {
    /*for onclick on heading in ELN guidelines [onclick open and close grid contents]*/
   

    //if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //    return;
    //}
    //else
    //{

    /*for bounce div*/
    ele = "bounce1"


    if (obj == "hovereffect1") {
        linkclick1++;
        if (linkclick1 == 2) {
            downarrow("remove1");
            divbounceremove("remove1");
            addactive(obj);
            linkclick1 = 0;
           
        }
        
        else {

            if (linkclick1 == 1) {
                for (i = 2; i <= 7; i++) {
                    downarrow("remove" + i);
                    divbounceremove("remove" + i);


                }
               
                linkclick2 = 0;
                linkclick3 = 0;
                linkclick4 = 0;
                linkclick5 = 0;
                linkclick6 = 0;
                linkclick7 = 0;
            }
         
            $("#hovereffect1").css("display", "none");
            $("#remove1").css("display", "block");
            $("#remove1").css("display", "table - cell");
 
            bounceIn(ele);
            ele = "";           
        }     
    }
   
    if (obj == "hovereffect2") {
        linkclick2++;
        if (linkclick2 == 2) {
            downarrow("remove2");
            divbounceremove("remove2");
            addactive(obj);
            linkclick2 = 0;
           
        }

       
        else {
             if (linkclick2 == 1) {
                for (i = 1; i <= 7; i++) {
                    if (i != 2) {
                        downarrow("remove" + i);
                        divbounceremove("remove" + i);
                    }

                }
              
                linkclick1 = 0;
                linkclick3 = 0;
                linkclick4 = 0;
                linkclick5 = 0;
                linkclick6 = 0;
                linkclick7 = 0;
                }

            $("#hovereffect2").css("display", "none");
            $("#remove2").css("display", "block");
            $("#remove2").css("display", "table - cell");

            ele = "bounce2";
            bounceIn(ele);
            ele = "";
        }
       
    }
    
   
    if (obj == "hovereffect3") {
        linkclick3++;
        if (linkclick3 == 2) {
            downarrow("remove3");
            divbounceremove("remove3");
            addactive(obj);
            linkclick3 = 0;
        }
       
        else {

            if (linkclick3 == 1) {
                for (i = 1; i <= 7; i++) {
                    if (i != 3) {
                        downarrow("remove" + i);
                        divbounceremove("remove" + i);
                    }

                }
               
                linkclick1 = 0;
                linkclick2 = 0;
                linkclick4 = 0;
                linkclick5 = 0;
                linkclick6 = 0;
                linkclick7 = 0;
            }
           
            $("#hovereffect3").css("display", "none");
            $("#remove3").css("display", "block");
            $("#remove3").css("display", "table - cell");

            ele = "bounce3";
            bounceIn(ele);
            ele = "";
        }
        
    }
    
    if (obj == "hovereffect4") {
        linkclick4++;
        if (linkclick4 == 2) {
            downarrow("remove4");
            divbounceremove("remove4");
            addactive(obj);
            linkclick4 = 0;
        }
       
        else {

            if (linkclick4 == 1) {
                for (i = 1; i <= 7; i++) {
                    if (i != 4) {
                        downarrow("remove" + i);
                        divbounceremove("remove" + i);
                    }

                }                
                linkclick1 = 0;
                linkclick2 = 0;
                linkclick3 = 0;
                linkclick5 = 0;
                linkclick6 = 0;
                linkclick7 = 0;
            }
        
            $("#hovereffect4").css("display", "none");
            $("#remove4").css("display", "block");
            $("#remove4").css("display", "table - cell");

            ele = "bounce4";
            bounceIn(ele);
            ele = "";
        }
        
    }
   
    if (obj == "hovereffect5") {
        linkclick5++;
        if (linkclick5 == 2) {
            downarrow("remove5");
            divbounceremove("remove5");
            addactive(obj);
            linkclick5 = 0;
        }

       
        else {

            if (linkclick5 == 1) {
                for (i = 1; i <= 7; i++) {
                    if (i != 5) {
                        downarrow("remove" + i);
                        divbounceremove("remove" + i);
                    }
                }                
                linkclick1 = 0;
                linkclick2 = 0;
                linkclick4 = 0;
                linkclick3 = 0;
                linkclick6 = 0;
                linkclick7 = 0;
            }
          
            $("#hovereffect5").css("display", "none");
            $("#remove5").css("display", "block");
            $("#remove5").css("display", "table - cell");

            ele = "bounce5";
            bounceIn(ele);
            ele = "";
        }
        
    }
   
    if (obj == "hovereffect6") {
        linkclick6++;
        if (linkclick6 == 2) {
            downarrow("remove6");
            divbounceremove("remove6");
            addactive(obj);
            linkclick6 = 0;
        }
       
        else {
            if (linkclick6 == 1) {
                for (i = 1; i <= 7; i++) {
                    if (i != 6) {
                        downarrow("remove" + i);
                        divbounceremove("remove" + i);
                    }

                }                
                linkclick1 = 0;
                linkclick2 = 0;
                linkclick4 = 0;
                linkclick5 = 0;
                linkclick3 = 0;
                linkclick7 = 0;
            }
            
            $("#hovereffect6").css("display", "none");
            $("#remove6").css("display", "block");
            $("#remove6").css("display", "table - cell");

            ele = "bounce6";
            bounceIn(ele);
            ele = "";
        }
        
    }

   
   
    if (obj == "hovereffect7") {
        linkclick7++;
        if (linkclick7 == 2) {
            downarrow("remove7");
            divbounceremove("remove7");
            addactive(obj);
            linkclick7 = 0;
        }
      
        else {
            if (linkclick7 == 1) {
                for (i = 1; i < 7; i++) {
                    if (i != 7) {
                        downarrow("remove" + i);
                        divbounceremove("remove" + i);
                    }

                }                
                linkclick1 = 0;
                linkclick2 = 0;
                linkclick4 = 0;
                linkclick5 = 0;
                linkclick6 = 0;
                linkclick3 = 0;
            }
            
            $("#hovereffect7").css("display", "none");
            $("#remove7").css("display", "block");
            $("#remove7").css("display", "table - cell");

            ele = "bounce7";
            bounceIn(ele);
            ele = "";
        }
        
    }

    /*NCCN guidelines*/
    if (obj == "NCCNhovereffect1") {
       NCCNlinkclick1++;
       if (NCCNlinkclick1 == 2) {
            downarrow("NCCNremove1");
            divbounceremove("NCCNremove1");
            addactive(obj);
            NCCNlinkclick1 = 0;

        }


        else {
           if (NCCNlinkclick1 == 1) {
                for (i = 2; i <= 5; i++) {
                    if (i != 1) {
                        downarrow("NCCNremove" + i);
                        divbounceremove("NCCNremove" + i);
                    }

                }

                NCCNlinkclick2 = 0;
                NCCNlinkclick3 = 0;
                NCCNlinkclick4 = 0;
                NCCNlinkclick5 = 0;
                
            }

            $("#NCCNhovereffect1").css("display", "none");
            $("#NCCNremove1").css("display", "block");
            $("#NCCNremove1").css("display", "table - cell");

            ele = "NCCNbounce1";
            bounceIn(ele);
            ele = "";
        }

    }
    if (obj == "NCCNhovereffect2") {
        NCCNlinkclick2++;
        if (NCCNlinkclick2 == 2) {
            downarrow("NCCNremove2");
            divbounceremove("NCCNremove2");
            addactive(obj);
            NCCNlinkclick2 = 0;

        }


        else {
            if (NCCNlinkclick2 == 1) {
                for (i = 1; i <= 5; i++) {
                    if (i != 2) {
                        downarrow("NCCNremove" + i);
                        divbounceremove("NCCNremove" + i);
                    }

                }

                NCCNlinkclick1 = 0;
                NCCNlinkclick3 = 0;
                NCCNlinkclick4 = 0;
                NCCNlinkclick5 = 0;

            }

            $("#NCCNhovereffect2").css("display", "none");
            $("#NCCNremove2").css("display", "block");
            $("#NCCNremove2").css("display", "table - cell");

            ele = "NCCNbounce2";
            bounceIn(ele);
            ele = "";
        }

    }
    if (obj == "NCCNhovereffect3") {
        NCCNlinkclick3++;
        if (NCCNlinkclick3 == 2) {
            downarrow("NCCNremove3");
            divbounceremove("NCCNremove3");
            addactive(obj);
            NCCNlinkclick3 = 0;

        }


        else {
            if (NCCNlinkclick3 == 1) {
                for (i = 1; i <= 5; i++) {
                    if (i != 3) {
                        downarrow("NCCNremove" + i);
                        divbounceremove("NCCNremove" + i);
                    }

                }

                NCCNlinkclick2 = 0;
                NCCNlinkclick1 = 0;
                NCCNlinkclick4 = 0;
                NCCNlinkclick5 = 0;

            }

            $("#NCCNhovereffect3").css("display", "none");
            $("#NCCNremove3").css("display", "block");
            $("#NCCNremove3").css("display", "table - cell");

            ele = "NCCNbounce3";
            bounceIn(ele);
            ele = "";
        }

    }
    if (obj == "NCCNhovereffect4") {
        NCCNlinkclick4++;
        if (NCCNlinkclick4 == 2) {
            downarrow("NCCNremove4");
            divbounceremove("NCCNremove4");
            addactive(obj);
            NCCNlinkclick4 = 0;

        }


        else {
            if (NCCNlinkclick4 == 1) {
                for (i = 1; i <= 5; i++) {
                    if (i != 4) {
                        downarrow("NCCNremove" + i);
                        divbounceremove("NCCNremove" + i);
                    }

                }

                NCCNlinkclick2 = 0;
                NCCNlinkclick1 = 0;
                NCCNlinkclick3 = 0;
                NCCNlinkclick5 = 0;

            }

            $("#NCCNhovereffect4").css("display", "none");
            $("#NCCNremove4").css("display", "block");
            $("#NCCNremove4").css("display", "table - cell");

            ele = "NCCNbounce4";
            bounceIn(ele);
            ele = "";
        }

    }
    if (obj == "NCCNhovereffect5") {
        NCCNlinkclick5++;
        if (NCCNlinkclick5 == 2) {
            downarrow("NCCNremove5");
            divbounceremove("NCCNremove5");
            addactive(obj);
            NCCNlinkclick5 = 0;

        }


        else {
            if (NCCNlinkclick5 == 1) {
                for (i = 1; i <= 5; i++) {
                    if (i != 5) {
                        downarrow("NCCNremove" + i);
                        divbounceremove("NCCNremove" + i);
                    }

                }

                NCCNlinkclick2 = 0;
                NCCNlinkclick1 = 0;
                NCCNlinkclick3 = 0;
                NCCNlinkclick4 = 0;

            }

            $("#NCCNhovereffect5").css("display", "none");
            $("#NCCNremove5").css("display", "block");
            $("#NCCNremove5").css("display", "table - cell");

            ele = "NCCNbounce5";
            bounceIn(ele);
            ele = "";
        }

    }

    //}
}

/*mouse over down arrow animation*/
function downarrow(obj) {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        divbounceremove(obj);


        if (obj == "remove1") {
            $("#remove1").css("display", "none");
            $("#hovereffect1").css("display", "block");
            linkclick1 = 0;
        }
        else if (obj == "NCCNremove1") {
            $("#NCCNremove1").css("display", "none");
            $("#NCCNhovereffect1").css("display", "block");
            NCCNlinkclick1 = 0;
        }


        if (obj == "remove2") {
            $("#remove2").css("display", "none");
            $("#hovereffect2").css("display", "block");
            linkclick2 = 0;
        }
        else if (obj == "NCCNremove2") {
            $("#NCCNremove2").css("display", "none");
            $("#NCCNhovereffect2").css("display", "block");
            NCCNlinkclick2 = 0;
        }


        if (obj == "remove3") {
            $("#remove3").css("display", "none");
            $("#hovereffect3").css("display", "block");
            linkclick3 = 0;
        }
        else if (obj == "NCCNremove3") {
            $("#NCCNremove3").css("display", "none");
            $("#NCCNhovereffect3").css("display", "block");
            NCCNlinkclick3 = 0;
        }


        if (obj == "remove4") {
            $("#remove4").css("display", "none");
            $("#hovereffect4").css("display", "block");
            linkclick4 = 0;
        }
        else if (obj == "NCCNremove4") {
            $("#NCCNremove4").css("display", "none");
            $("#NCCNhovereffect4").css("display", "block");
            NCCNlinkclick14 = 0;
        }


        if (obj == "remove5") {
            $("#remove5").css("display", "none");
            $("#hovereffect5").css("display", "block");
            linkclick5 = 0;
        }
        else if (obj == "NCCNremove5") {
            $("#NCCNremove5").css("display", "none");
            $("#NCCNhovereffect5").css("display", "block");
            NCCNlinkclick5 = 0;
        }


        if (obj == "remove6") {
            $("#remove6").css("display", "none");
            $("#hovereffect6").css("display", "block");
            linkclick6 = 0;
        }

        if (obj == "remove7") {
            $("#remove7").css("display", "none");
            $("#hovereffect7").css("display", "block");
            linkclick7 = 0;
        }
    }
    else {

        divbounceremove(obj);


        if (obj == "remove1") {
            $("#remove1").css("display", "none");
            $("#hovereffect1").css("display", "block");
            linkclick1 = 0;
        }
        else if (obj == "NCCNremove1") {
            $("#NCCNremove1").css("display", "none");
            $("#NCCNhovereffect1").css("display", "block");
            NCCNlinkclick1 = 0;
        }


        if (obj == "remove2") {
            $("#remove2").css("display", "none");
            $("#hovereffect2").css("display", "block");
            linkclick2 = 0;
        }
        else if (obj == "NCCNremove2") {
            $("#NCCNremove2").css("display", "none");
            $("#NCCNhovereffect2").css("display", "block");
            NCCNlinkclick2 = 0;
        }


        if (obj == "remove3") {
            $("#remove3").css("display", "none");
            $("#hovereffect3").css("display", "block");
            linkclick3 = 0;
        }
        else if (obj == "NCCNremove3") {
            $("#NCCNremove3").css("display", "none");
            $("#NCCNhovereffect3").css("display", "block");
            NCCNlinkclick3 = 0;
        }


        if (obj == "remove4") {
            $("#remove4").css("display", "none");
            $("#hovereffect4").css("display", "block");
            linkclick4 = 0;
        }
        else if (obj == "NCCNremove4") {
            $("#NCCNremove4").css("display", "none");
            $("#NCCNhovereffect4").css("display", "block");
            NCCNlinkclick14 = 0;
        }


        if (obj == "remove5") {
            $("#remove5").css("display", "none");
            $("#hovereffect5").css("display", "block");
            linkclick5 = 0;
        }
        else if (obj == "NCCNremove5") {
            $("#NCCNremove5").css("display", "none");
            $("#NCCNhovereffect5").css("display", "block");
            NCCNlinkclick5 = 0;
        }


        if (obj == "remove6") {
            $("#remove6").css("display", "none");
            $("#hovereffect6").css("display", "block");
            linkclick6 = 0;
        }

        if (obj == "remove7") {
            $("#remove7").css("display", "none");
            $("#hovereffect7").css("display", "block");
            linkclick7 = 0;
        }
    }
}

/*remove div animation in Guidelines content*/
function divbounceremove(obj) {
    /*carousal chevron animation*/

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        $(".chevron").css("display", "none");

        /*end*/


        /*** change carousal active class ass starting the page   **/

        $("#ELNOne").find('.carousel-inner').find('div').removeClass('active');
        $("#ELNOne").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELNTwo").find('.carousel-inner').find('div').removeClass('active');
        $("#ELNTwo").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELNThree").find('.carousel-inner').find('div').removeClass('active');
        $("#ELNThree").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELN5").find('.carousel-inner').find('div').removeClass('active');
        $("#ELN5").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELN6").find('.carousel-inner').find('div').removeClass('active');
        $("#ELN6").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELN7").find('.carousel-inner').find('div').removeClass('active');
        $("#ELN7").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELN8").find('.carousel-inner').find('div').removeClass('active');
        $("#ELN8").find('.carousel-inner').find(".p1").addClass('active');



        /*for NCCN guidelines*/
        $("#NCCNOne").find('.carousel-inner').find('div').removeClass('active');
        $("#NCCNOne").find('.carousel-inner').find(".p1").addClass('active');

        $("#NCCNTwo").find('.carousel-inner').find('div').removeClass('active');
        $("#NCCNTwo").find('.carousel-inner').find(".p1").addClass('active');

        $("#NCCNThree").find('.carousel-inner').find('div').removeClass('active');
        $("#NCCNThree").find('.carousel-inner').find(".p1").addClass('active');

        $("#NCCN5").find('.carousel-inner').find('div').removeClass('active');
        $("#NCCN5").find('.carousel-inner').find(".p1").addClass('active');

        $("#NCCN6").find('.carousel-inner').find('div').removeClass('active');
        $("#NCCN6").find('.carousel-inner').find(".p1").addClass('active');

        /*end*/

        if (obj == "remove1") {
            $("#guideline1").find('div').removeClass('animated bounceIn');
            $("#guideline1").find(".ELN1").addClass('ELNOnedivs');
        }
        else if (obj == "NCCNremove1") {
            $("#NCCNguideline1").find('div').removeClass('animated bounceIn');
            $("#NCCNguideline1").find(".ELN1").addClass('ELNOnedivs');
        }


        if (obj == "remove2") {
            $("#guideline2").find('div').removeClass('animated bounceIn');
            $("#guideline2").find(".ELN1").addClass('ELNOnedivs');
        }
        else if (obj == "NCCNremove2") {
            $("#NCCNguideline2").find('div').removeClass('animated bounceIn');
            $("#NCCNguideline2").find(".ELN1").addClass('ELNOnedivs');
        }


        if (obj == "remove3") {
            $("#guideline3").find('div').removeClass('animated bounceIn');
            $("#guideline3").find(".ELN1").addClass('ELNOnedivs');
        } else if (obj == "NCCNremove3") {
            $("#NCCNguideline3").find('div').removeClass('animated bounceIn');
            $("#NCCNguideline3").find(".ELN1").addClass('ELNOnedivs');
        }



        if (obj == "remove4") {
            $("#guideline4").find('div').removeClass('animated bounceIn');
            $("#guideline4").find(".ELN1").addClass('ELNOnedivs');
        } else if (obj == "NCCNremove4") {
            $("#NCCNguideline4").find('div').removeClass('animated bounceIn');
            $("#NCCNguideline4").find(".ELN1").addClass('ELNOnedivs');
        }


        if (obj == "remove5") {
            $("#guideline5").find('div').removeClass('animated bounceIn');
            $("#guideline5").find(".ELN1").addClass('ELNOnedivs');
        }
        else if (obj == "NCCNremove5") {
            $("#NCCNguideline5").find('div').removeClass('animated bounceIn');
            $("#NCCNguideline5").find(".ELN1").addClass('ELNOnedivs');
        }



        if (obj == "remove6") {
            $("#guideline6").find('div').removeClass('animated bounceIn');
            $("#guideline6").find(".ELN1").addClass('ELNOnedivs');
        }

        if (obj == "remove7") {
            $("#guideline7").find('div').removeClass('animated bounceIn');
            $("#guideline7").find(".ELN1").addClass('ELNOnedivs');
        }
    }
    else {

        $(".chevron").css("display", "none");

        /*end*/


        /*** change carousal active class ass starting the page   **/

        $("#ELNOne").find('.carousel-inner').find('div').removeClass('active');
        $("#ELNOne").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELNTwo").find('.carousel-inner').find('div').removeClass('active');
        $("#ELNTwo").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELNThree").find('.carousel-inner').find('div').removeClass('active');
        $("#ELNThree").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELN5").find('.carousel-inner').find('div').removeClass('active');
        $("#ELN5").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELN6").find('.carousel-inner').find('div').removeClass('active');
        $("#ELN6").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELN7").find('.carousel-inner').find('div').removeClass('active');
        $("#ELN7").find('.carousel-inner').find(".p1").addClass('active');

        $("#ELN8").find('.carousel-inner').find('div').removeClass('active');
        $("#ELN8").find('.carousel-inner').find(".p1").addClass('active');



        /*for NCCN guidelines*/
        $("#NCCNOne").find('.carousel-inner').find('div').removeClass('active');
        $("#NCCNOne").find('.carousel-inner').find(".p1").addClass('active');

        $("#NCCNTwo").find('.carousel-inner').find('div').removeClass('active');
        $("#NCCNTwo").find('.carousel-inner').find(".p1").addClass('active');

        $("#NCCNThree").find('.carousel-inner').find('div').removeClass('active');
        $("#NCCNThree").find('.carousel-inner').find(".p1").addClass('active');

        $("#NCCN5").find('.carousel-inner').find('div').removeClass('active');
        $("#NCCN5").find('.carousel-inner').find(".p1").addClass('active');

        $("#NCCN6").find('.carousel-inner').find('div').removeClass('active');
        $("#NCCN6").find('.carousel-inner').find(".p1").addClass('active');

        /*end*/

        if (obj == "remove1") {
            $("#guideline1").find('div').removeClass('animated bounceIn');
            $("#guideline1").find(".ELN1").addClass('ELNOnedivs');
        }
        else if (obj == "NCCNremove1") {
            $("#NCCNguideline1").find('div').removeClass('animated bounceIn');
            $("#NCCNguideline1").find(".ELN1").addClass('ELNOnedivs');
        }


        if (obj == "remove2") {
            $("#guideline2").find('div').removeClass('animated bounceIn');
            $("#guideline2").find(".ELN1").addClass('ELNOnedivs');
        }
        else if (obj == "NCCNremove2") {
            $("#NCCNguideline2").find('div').removeClass('animated bounceIn');
            $("#NCCNguideline2").find(".ELN1").addClass('ELNOnedivs');
        }


        if (obj == "remove3") {
            $("#guideline3").find('div').removeClass('animated bounceIn');
            $("#guideline3").find(".ELN1").addClass('ELNOnedivs');
        } else if (obj == "NCCNremove3") {
            $("#NCCNguideline3").find('div').removeClass('animated bounceIn');
            $("#NCCNguideline3").find(".ELN1").addClass('ELNOnedivs');
        }



        if (obj == "remove4") {
            $("#guideline4").find('div').removeClass('animated bounceIn');
            $("#guideline4").find(".ELN1").addClass('ELNOnedivs');
        } else if (obj == "NCCNremove4") {
            $("#NCCNguideline4").find('div').removeClass('animated bounceIn');
            $("#NCCNguideline4").find(".ELN1").addClass('ELNOnedivs');
        }


        if (obj == "remove5") {
            $("#guideline5").find('div').removeClass('animated bounceIn');
            $("#guideline5").find(".ELN1").addClass('ELNOnedivs');
        }
        else if (obj == "NCCNremove5") {
            $("#NCCNguideline5").find('div').removeClass('animated bounceIn');
            $("#NCCNguideline5").find(".ELN1").addClass('ELNOnedivs');
        }



        if (obj == "remove6") {
            $("#guideline6").find('div').removeClass('animated bounceIn');
            $("#guideline6").find(".ELN1").addClass('ELNOnedivs');
        }

        if (obj == "remove7") {
            $("#guideline7").find('div').removeClass('animated bounceIn');
            $("#guideline7").find(".ELN1").addClass('ELNOnedivs');
        }
    }
}


/*common div_ bounceIn function*/
function bounceIn(ele) {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        setTimeout(function () {
            bounce1(ele);
        }, 200);

        function bounce1(ele) {
            $('#' + ele).find(".ELN1").removeClass('ELNOnedivs');
            $('#' + ele).addClass('animated bounceIn');
            setTimeout(function () {
                bounce1_2(ele);
            }, 200);
        }
        function bounce1_2(ele) {
            $('#' + ele + '_2').find(".ELN1").removeClass('ELNOnedivs');
            $('#' + ele + '_2').addClass('animated bounceIn');
            setTimeout(function () {
                bounce1_3(ele);
            }, 200);
        }
        function bounce1_3(ele) {
            $('#' + ele + '_3').find(".ELN1").removeClass('ELNOnedivs');
            $('#' + ele + '_3').addClass('animated bounceIn');
            setTimeout(function () {
                bounce1_4(ele);
            }, 200);
        }
        function bounce1_4(ele) {
            $('#' + ele + '_4').find(".ELN1").removeClass('ELNOnedivs');
            $('#' + ele + '_4').addClass('animated bounceIn');
            setTimeout(function () {
                bounce1_5(ele);
            }, 200);
        }
        function bounce1_5(ele) {
            $('#' + ele + '_5').find(".ELN1").removeClass('ELNOnedivs');
            $('#' + ele + '_5').addClass('animated bounceIn');
        }


        /*carousal chevron animation*/
        $(".chevron").fadeIn();
        /*end*/
    }
    else {

        setTimeout(function () {
            bounce1(ele);
        }, 200);

        function bounce1(ele) {
            $('#' + ele).find(".ELN1").removeClass('ELNOnedivs');
            $('#' + ele).addClass('animated bounceIn');
            setTimeout(function () {
                bounce1_2(ele);
            }, 200);
        }
        function bounce1_2(ele) {
            $('#' + ele + '_2').find(".ELN1").removeClass('ELNOnedivs');
            $('#' + ele + '_2').addClass('animated bounceIn');
            setTimeout(function () {
                bounce1_3(ele);
            }, 200);
        }
        function bounce1_3(ele) {
            $('#' + ele + '_3').find(".ELN1").removeClass('ELNOnedivs');
            $('#' + ele + '_3').addClass('animated bounceIn');
            setTimeout(function () {
                bounce1_4(ele);
            }, 200);
        }
        function bounce1_4(ele) {
            $('#' + ele + '_4').find(".ELN1").removeClass('ELNOnedivs');
            $('#' + ele + '_4').addClass('animated bounceIn');
            setTimeout(function () {
                bounce1_5(ele);
            }, 200);
        }
        function bounce1_5(ele) {
            $('#' + ele + '_5').find(".ELN1").removeClass('ELNOnedivs');
            $('#' + ele + '_5').addClass('animated bounceIn');
        }


        /*carousal chevron animation*/
        $(".chevron").fadeIn();
        /*end*/
    }
}

function addactive(obj) {


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return;
    }
    else {

        if (obj == "hovereffect1" || "NCCNhovereffect1") {

            //$("#ELNOne").find('.carousel-inner').find('div').removeClass('active');
            //$("#ELNOne").find('.carousel-inner').find(".p1").addClass('active');    

        }
        else if (obj == "NCCNhovereffect1") {
            $("#NCCNOne").find('.carousel-inner').find('div').removeClass('active');
            $("#NCCNOne").find('.carousel-inner').find(".p1").addClass('active');

        }




        if (obj == "hovereffect2") {
            $("#ELNTwo").find('.carousel-inner').find('div').removeClass('active');
            $("#ELNTwo").find('.carousel-inner').find(".p1").addClass('active');
        }
        else if (obj == "NCCNhovereffect2") {
            $("#NCCNTwo").find('.carousel-inner').find('div').removeClass('active');
            $("#NCCNTwo").find('.carousel-inner').find(".p1").addClass('active');

        }


        if (obj == "hovereffect3") {
            $("#ELNThree").find('.carousel-inner').find('div').removeClass('active');
            $("#ELNThree").find('.carousel-inner').find(".p1").addClass('active');
        }
        else if (obj == "NCCNhovereffect3") {
            $("#NCCNThree").find('.carousel-inner').find('div').removeClass('active');
            $("#NCCNThree").find('.carousel-inner').find(".p1").addClass('active');

        }



        if (obj == "hovereffect4") {
            $("#ELN5").find('.carousel-inner').find('div').removeClass('active');
            $("#ELN5").find('.carousel-inner').find(".p1").addClass('active');

        }
        else if (obj == "NCCNhovereffect4") {
            $("#NCCN5").find('.carousel-inner').find('div').removeClass('active');
            $("#NCCN5").find('.carousel-inner').find(".p1").addClass('active');

        }


        if (obj == "hovereffect5") {
            $("#ELN6").find('.carousel-inner').find('div').removeClass('active');
            $("#ELN6").find('.carousel-inner').find(".p1").addClass('active');
        }
        else if (obj == "NCCNhovereffect5") {
            $("#NCCN6").find('.carousel-inner').find('div').removeClass('active');
            $("#NCCN6").find('.carousel-inner').find(".p1").addClass('active');

        }


        if (obj == "hovereffect6") {
            //$("#ELN7").find('.carousel-inner').find('div').removeClass('active');
            //$("#ELN7").find('.carousel-inner').find(".p1").addClass('active');
        }
        if (obj == "hovereffect7") {
            $("#ELN8").find('.carousel-inner').find('div').removeClass('active');
            $("#ELN8").find('.carousel-inner').find(".p1").addClass('active');
        }
    }
}

$(".carousel-inner").swipe({

    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

        if (direction == 'left') $(".rightswipe").trigger('click');
        if (direction == 'right') $(".leftswipe").trigger('click');
    },
    preventDefaultEvents: false,
    allowPageScroll:"vertical"
});

//$(".swipein").swipe({
//    //Generic swipe handler for all directions
//    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
//        // $(this).text("You swiped " + direction);
//        if (isAndroid || isBlackBerry || isiDevice || isWindowsPhone) {
//            if (direction == "left") {
//                $(".leftswipe").click();

//            }
//            if (direction == "right") {
//                $(".rightswipe").click();
//            }
//            //if (direction == "up") { 
//            //    setTimeout(function () {
//            //        $("#Work_page").scrollTop(-100);
//            //    },1000);                                                               
//            //}
//        }
//    },
//    //Default is 75px, set to 0 for demo so any distance triggers swipe
//    threshold: 0


//});


//svg



$(document).keydown(function (e) {
    if (e.keyCode == 40 && ( $('#page-gr').attr('class') == "pt-page pt-page-current")) {
            $("#grepMain").scrollTop($("#grepMain").scrollTop() + 10);
        }
    if (e.keyCode == 38 && ($('#page-gr').attr('class') == "pt-page pt-page-current")) {
            $("#grepMain").scrollTop($("#grepMain").scrollTop() - 10);
    }
    

});


//close collapse in menu//

function closepanels() {
   
    var nameC = $("#mnu-panel")[0].className;
    if (nameC == "menu-cont closecollapse") {
        $('#accordionMnu .in').collapse('hide');
    }
    else {
        return;
    }
   
}

var active = true;
$(".closecollapse").on('click touchstart', function () {
    if (active)
        setTimeout(function () { $('#accordionMnu .in').collapse('hide'); },1000);
});


$("#mnu-cs").on('click touchstart', function () {
    $('.menu-cont').removeClass("closecollapse");

});
$("#mnu-da").on('click touchstart', function () {
    $('.menu-cont').removeClass("closecollapse");

});
$("#mnu-wc").on('click touchstart', function () {
    $('.menu-cont').removeClass("closecollapse");

});
$("#mnu-ae").on('click touchstart', function () {
    $('.menu-cont').removeClass("closecollapse");

});

$(".panel-heading").on('click touchstart', function () {
    $('.menu-cont').addClass("closecollapse");
});






    