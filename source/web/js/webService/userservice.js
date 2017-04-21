
function UserService() {
    this.service = "UserService";
}

UserService.prototype = new WebService();

UserService.prototype.IsEmailExists = function (PostData, callback, async) {
    var request = new RequestHeader("IsEmailExists", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.CreateProfile = function (PostData, callback, async) {
    var request = new RequestHeader("CreateProfile", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.ForgotPassword = function (PostData, callback, async) {
    var request = new RequestHeader("ForgotPassword", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.SetPassword = function (PostData, callback, async) {
    var request = new RequestHeader("SetPassword", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.Contactus = function (PostData, callback, async) {
    var request = new RequestHeader("Contactus", PostData, callback);
    return this.PostRequest(request, async);

}

UserService.prototype.AuthenticateUser = function (PostData, callback, async) {
    var request = new RequestHeader("AuthenticateUser", PostData, callback);
    return this.PostRequest(request, async);

}
UserService.prototype.PostComment = function (PostData, callback, async) {
    var request = new RequestHeader("PostComment", PostData, callback);
    return this.PostRequest(request, async);
}
UserService.prototype.GetComments = function (PostData, callback, async) {
    var request = new RequestHeader("GetOpinionComment", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.RateComment = function (PostData, callback, async) {
    var request = new RequestHeader("RateComment", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.DeleteComment = function (PostData, callback, async) {
    var request = new RequestHeader("DeleteComment", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.AddQuestion = function (PostData, callback, async) {
    var request = new RequestHeader("AddQuestion", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.GetFeedData = function (PostData, callback, async) {
    var request = new RequestHeader("GetFeedData", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.GetRepo = function (PostData, callback, async) {
    var request = new RequestHeader("GetPdfFiles", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.GetActiveQuestion = function (PostData, callback, async) {
    var request = new RequestHeader("GetActiveQuestion", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.AddSubscription = function (PostData, callback, async) {
    var request = new RequestHeader("AddSubscription", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.RateCase = function (PostData, callback, async) {
    var request = new RequestHeader("RateCase", PostData, callback);
    return this.PostRequest(request, async);
}



UserService.prototype.GetCaseRating = function (PostData, callback, async) {
    var request = new RequestHeader("GetCaseRating", PostData, callback);
    return this.PostRequest(request, async);
}


UserService.prototype.GetAssets = function (PostData, callback, async) {
    var request = new RequestHeader("GetAssets", PostData, callback);
    return this.PostRequest(request, async);
}


UserService.prototype.SubmitFeedback = function (PostData, callback, async) {
    var request = new RequestHeader("SubmitFeedback", PostData, callback);
    return this.PostRequest(request, async);
}

UserService.prototype.AddToCal = function (PostData, callback, async) {
    var request = new RequestHeader("AddToCal", PostData, callback);
    return this.PostRequest(request, async);
}





var _gUserService = new UserService();