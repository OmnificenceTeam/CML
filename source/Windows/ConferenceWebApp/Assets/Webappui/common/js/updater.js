var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
var isBlackBerry = /blackberry/i.test(navigator.userAgent.toLowerCase());
var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());

$(document).ready(function () {
    document.getElementById('updater').style.height = window.innerHeight + 'px';

    window.setTimeout(function () {
        checkUpdates();
    }, 1000);
});

function checkUpdates() {
    var status = false;
	$('#updateProcess').fadeIn('slow');
    if (isAndroid || isBlackBerry) {
        status = androidInterface.CheckInternetConnectivity();
    
		if (status) {
			LoadJSON('version.txt');	
		}
		else {
			//$('#alertModal').modal('show');
			callUpdatedApplication();
		}
	}
}

var _FullSize = 0;
var _fileSize = 0;
var index = 0;
var myIntervals = null;
var jsonResult = null;

function setFullSize(size) {
    _FullSize = parseInt(size);
}

function setFileSize(size) {
    _fileSize += parseInt(size);
    document.getElementById('updateProgress').setAttribute('value', ((_fileSize / _FullSize) * 100));
}

function LoadJSON(url) {
    $.getJSON(url, function (data) {
        var request = new CheckUpdate(data);
        var result = DoService(request, false);
        if ((result.Result).length > 1) {

            var _TotalFiles = (result.Result).length;
            jsonResult = result.Result;

            for (var i = 0; i < _TotalFiles; i++) {
                _FullSize += parseInt(jsonResult[i].size);
            }
			
			myIntervals = setInterval(function(){ 
				downloadUpdates(_TotalFiles); 
			}, 500);
        }
		else {
			callUpdatedApplication();
		}
    });
}

function downloadUpdates(totalFiles) {
	var downloadUrl = null;
    var replaceUrl = null;
	var currentFileSize = 0;
	
	downloadUrl = jsonResult[index].urlPath;
	replaceUrl = jsonResult[index].relPath;
	currentFileSize = parseInt(jsonResult[index].size);
	androidInterface.DownloadUpdates(downloadUrl, replaceUrl, currentFileSize);

	index += 1;
	
	if(index == totalFiles) {
		clearInterval(myIntervals);
		myIntervals = null;
		window.setTimeout(function() {
			callUpdatedApplication();
		}, 500);	
	}
}

function callUpdatedApplication() {
    androidInterface.LoadApplication();
}


function DoService(request, async) {
    try {
        var XmlHttp = new XMLHttpRequest();
        XmlHttp.open("POST", "http://apps.omnificence.in/ITP2015/admin/service/updateservice.aspx", async);
        XmlHttp.send(JSON.stringify(request));

        if (!async) {
            return JSON.parse(XmlHttp.responseText);
        }

        else {
            var timer = window.setInterval(function () {
                if (XmlHttp.readyState == 4) {
                    window.clearInterval(timer);
                    if (XmlHttp.status != 200) {
                        return;
                    }
                    return JSON.parse(XmlHttp.responseText);
                }
            }, 1000);
        }
    }
    catch (ex) {
        return null;
    }
}


function CheckUpdate(data) {
    this.Command = "CheckUpdate"
    this.Data = data;
}