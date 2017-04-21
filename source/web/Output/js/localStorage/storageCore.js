

function LocalStorageCore() {
    this.localData = {};
    this.loadInitialData();
    this.haveToUpdate();
}

LocalStorageCore.prototype.loadData = function (tag) {
    var data = localStorage.getItem("CML");
    if ((data != "") && (data != null)) {
        data = JSON.parse(data);
        return data.localData[tag];
    }
}

LocalStorageCore.prototype.saveData = function (tag, data) {
    this.localData[tag] = data;
    localStorage.setItem("CML", JSON.stringify(this));
}

LocalStorageCore.prototype.isDataExists = function (tag) {
    if (this.localData[tag] != undefined)
        return true;
    else
        return false;
}


LocalStorageCore.prototype.haveToUpdate = function () {
    if (this.localData["lastDate"] != undefined) {
        var knownDate = this.localData["lastDate"].Date;
    }
    // implement have to updated logic
}

LocalStorageCore.prototype.loadInitialData = function () {
    for (var index = 0; index < _gtags.length ; index++) {
        var data = localStorage.getItem("CML");
        if ((data != "") && (data != null)) {
            data = JSON.parse(data);
            this.localData[_gtags[index]] = data.localData[_gtags[index]];
        }
    }
}


var _gtags = ["login", "firsttime", "casefirst"];

var _glocalStorage = new LocalStorageCore();


