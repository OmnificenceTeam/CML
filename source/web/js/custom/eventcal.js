

function LoadEventCalendar() {
    $(".eve").hide();
    $("#eve1").show();

    var month = new Date().getMonth();
    if (month <= 9) {
        month += "0" + month;
    }
    var eventArray = [
       {
           startDate: "2016-02-11",
           endDate: "2016-02-13",
           title: '#eve1'
       },
        {
            startDate: "2016-03-31",
            endDate: "2016-03-31",
            title: '#eve2'
        },
    {
        startDate: "2016-04-18",
        endDate: "2016-04-21",
        title: '#eve3'
    },
     {
         startDate: "2016-05-12",
         endDate: "2016-05-14",
         title: '#eve4'
     },
      {
          startDate: "2016-05-21",
          endDate: "2016-05-22",
          title: '#eve5'
      },
       {
           startDate: "2016-06-03",
           endDate: "2016-06-07",
           title: '#eve6'
       },
        {
            startDate: "2016-06-09",
            endDate: "2016-06-12",
            title: '#eve7'
        },
         {
             startDate: "2016-08-13",
             endDate: "2016-08-14",
             title: '#eve8'
         },
          {
              startDate: "2016-09-03",
              endDate: "2016-09-08",
              title: '#eve9'
          },
           {
               startDate: "2016-09-15",
               endDate: "2016-09-17",
               title: '#eve10'
           },
            {
                startDate: "2016-09-30",
                endDate: "2016-10-01",
                title: '#eve11'
            },
             {
                 startDate: "2016-10-07",
                 endDate: "2016-10-11",
                 title: '#eve12'
             },
              {
                  startDate: "2016-11-24",
                  endDate: "2016-11-26",
                  title: '#eve13'
              },
              {
                  startDate: "2016-12-04",
                  endDate: "2016-12-06",
                  title: '#eve14'
              },
              {
                  startDate: "2016-12-03",
                  endDate: "2016-12-03",                  
                  title: '#eve15'
              },
               {
                   startDate: "2016-04-01",
                   endDate: "2016-04-02",
                   title: '#eve16'
               },
               {
                   startDate: "2016-07-27",
                   endDate: "2016-07-31",
                   title: '#eve17'
               },
                {
                    startDate: "2017-01-21",
                    endDate: "2017-01-21",
                    title: '#eve18'
                },
                {
                    startDate: "2017-01-25",
                    endDate: "2017-01-25",
                    title: '#eve19'
                },               
                 {
                     startDate: "2017-01-29",
                     endDate: "2017-01-29",
                     title: '#eve20'
                 },
                  {
                      startDate: "2017-01-26",
                      endDate: "2017-01-26",
                      title: '#eve21'
                  },
                  {
                      startDate: "2017-01-27",
                      endDate: "2017-01-27",
                      title: '#eve22'
                  },
                  {
                      startDate: "2017-01-28",
                      endDate: "2017-01-28",
                      title: '#eve23'
                  },
                   {
                       startDate: "2017-02-10",
                       endDate: "2017-02-11",
                       title: '#eve24'
                   },
                    {
                        startDate: "2017-02-01",
                        endDate: "2017-02-01",
                        title: '#eve25'
                    },
                    {
                        startDate: "2017-02-02",
                        endDate: "2017-02-03",
                        title: '#eve26'
                    },
                    {
                        startDate: "2017-02-04",
                        endDate: "2017-02-04",
                        title: '#eve27'
                    },
                     {
                         startDate: "2017-01-13",
                         endDate: "2017-01-14",
                         title: '#eve28'
                     },
                      {
                          startDate: "2017-01-20",
                          endDate: "2017-01-21",
                          title: '#eve29'
                      },
                       {
                           startDate: "2017-01-12",
                           endDate: "2017-01-12",
                           title: '#eve30'
                       },
                        {
                            startDate: "2017-02-15",
                            endDate: "2017-02-17",
                            title: '#eve31'
                        },
                         {
                             startDate: "2017-02-18",
                             endDate: "2017-02-18",
                             title: '#eve32'
                         },
                          {
                              startDate: "2017-02-19",
                              endDate: "2017-02-21",
                              title: '#eve33'
                          },
                           {
                               startDate: "2017-02-23",
                               endDate: "2017-02-24",
                               title: '#eve34'
                           },
                            {
                                startDate: "2017-03-10",
                                endDate: "2017-03-12",
                                title: '#eve35'
                            },
                             {
                                 startDate: "2017-03-16",
                                 endDate: "2017-03-16",
                                 title: '#eve36'
                             },
                              {
                                  startDate: "2017-03-17",
                                  endDate: "2017-03-18",
                                  title: '#eve37'
                              },
                               {
                                   startDate: "2017-03-27",
                                   endDate: "2017-03-29",
                                   title: '#eve38'
                               },
                                {
                                    startDate: "2017-04-07",
                                    endDate: "2017-04-08",
                                    title: '#eve39'
                                },
                                 {
                                     startDate: "2017-04-21",
                                     endDate: "2017-04-23",
                                     title: '#eve40'
                                 },
                                  {
                                      startDate: "2017-05-04",
                                      endDate: "2017-05-06",
                                      title: '#eve41'
                                  },
                                  {
                                      startDate: "2017-06-22",
                                      endDate: "2017-06-25",
                                      title: '#eve42'
                                  },
                                  {
                                      startDate: "2017-09-08",
                                      endDate: "2017-09-09",
                                      title: '#eve43'
                                  },
                                    {
                                        startDate: "2017-10-12",
                                        endDate: "2017-10-14",
                                        title: '#eve44'
                                    },
                                      {
                                          startDate: "2017-11-23",
                                          endDate: "2017-11-25",
                                          title: '#eve45'
                                      },


    ];

    var theCalendarInstance = $('#evecal').clndr({
        lengthOfTime: {
            months: 3,
            interval: 3
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
                    $(".eve").hide();

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
        template: $('#template-calendar-event').html(),
        startWithMonth: "2016-01-01"
    });


    var theCalendars = $('#evecals').clndr({
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
                    $(".eve").hide();

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
        template: $('#template-calendar-event').html(),
        startWithMonth: "2016-01-01"
    });

    $('.calendar-day-2016-02-11').addClass("dayActive");


}


