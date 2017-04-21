var callCl = null;

function LoadWebcast()
{

    if (callCl != null)
    { }
    else
    {
        var id = "canvasClock";

        if ($(document).width() < 1024)
            id = "canvasClock2";

        var canvas = document.getElementById(id);


        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.95;

        $(".wdata1").show();
    }

   callCl = setInterval(function () { drawClock(ctx, radius); }, 1000);

    var eventArray = [
        {
            date: "2016-04-10",
            title: '.wdata1'
        },
         {
             date: "2016-04-12",
             title: '.wdata2'
         }
    ];

    var theCalendarInstance = $('#webcal').clndr({
        lengthOfTime: {
            months: 1,
            interval: 1
        },
        events: eventArray,
        multiDayEvents: {
            singleDay: 'date',
            endDate: 'endDate',
            startDate: 'startDate'
        },
        clickEvents: {
            click: function (target) {
                if (target.events.length > 0) {
                    $(".wdata").hide();
                    $(".dayActive").removeClass("dayActive");
                    $(target.element).addClass("dayActive");
                    $(target.events[0].title).show();
                }
               
            },
            nextInterval: function () {
                
            },
            previousInterval: function () {
                
            },
            onIntervalChange: function () {
                
            }
        },
        template: $('#template-calendar-months').html(),
        startWithMonth: "2016-04-01"
    });


}








function drawClock(ctx,radius) {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.25 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.8);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.8);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
    (minute * Math.PI / (6 * 60)) +
    (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}



function onCickViewAgenda(ide)
{
    $("#modalAgenda").modal("show");
}


function onCickViewSysReq(ide) {
    $("#modalsys").modal("show");
}

function onCickViewWebcast()
{
    window.open('http://www.google.com', '_blank');
}

function onClickAddCal()
{
    $("#modalcal").modal("show");
}

function onCickViewunWebcast(ele)
{
    modalAlert("Webcast will start at " + $(ele).data("value"));
}