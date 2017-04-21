

function LoadGuidelinesRepo()
{
    $('#accordionELN').on('shown.bs.collapse', function (e) {
        var offset = $(this).find('.panel.panel-default > .panel-collapse.in').offset();
        if (offset) {
            //$('#grepMain').animate({
            //    scrollTop: 200
            //}, 500);
        }
    });

    $('#accordionNCCN').on('shown.bs.collapse', function (e) {
        var offset = $(this).find('.panel.panel-default > .panel-collapse.in').offset();
        if (offset) {
            //$('#grepMain').animate({
            //    scrollTop: 200
            //}, 500);
        }
    });
}

//function onGetRepo(res,cb)
//{
//    if(res!= null)
//    {
//        var html = ""
//        for(var i =0 ; i < res.length; i++)
//        {
//            var name = res[i].split('.');
//            html += '<tr>' +
//                 '<td> <img class="pdfimg" src="images/pdf.png" style="float:left" /> '+ name[0]+' </td>' +
//                 '<td style="    padding-bottom: 10px;" ><a href="files/GuidlinesRepo/' + res[i] + '" target="_blank" class="btn btn-orange pull-right"><span class="glyphicon glyphicon-search"></span> Preview</a></td>' +
//             '</tr>';
//        }
//        $("#gRepo").html(html);
//    }
//    hideLoader();
//}


function onclickchangerep(ele)
{
    //if(event.which==2){
    $(ele).parent().find(".cmn").removeClass("bg-violet").addClass("bg-gray");
    $(ele).removeClass("bg-gray").addClass("bg-violet");
    $(".grepoPanel").hide();
    $($(ele).data("id")).fadeIn();
    ////}
}