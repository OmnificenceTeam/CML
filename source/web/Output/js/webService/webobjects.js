//var _gLocalUrl = "http://mintcubes.omnificence.in/strategy/web/service/";
//var _gLocalUrl = "/service/";

//if (document.location.hostname == "localhost")
    _gLocalUrl = "service/";


function User()
{
    this.userid = 0;
    this.email = "";
    this.password = "";
    this.firstname = "";
    this.lastname = "";
    this.title = "";
    this.avatar = "";
    this.speciality = "";
    this.country = "";
    this.hospital = "";
    this.city = "";
    this.phonenumber = "";
    this.firstaddress = "";
    this.secondaddress = "";
    this.referencecode = "";
    this.referenceexpiry = new Date();
}


function Contactus()
{
    this.contactid = 0;
    this.contacttype = "";
    this.contactemail = "";
    this.description = "";
}


function CommentData()
{
    this.opinionid = 0;
    this.userid = 0;
    this.Comment = "";
}


function RatingData()
{
    this.commentid = 0;
    this.rating = 0;
    this.userid = 0;
}


function QuestionData()
{
   this.userid = 0;
   this.question = "";
}


function FeedData()
{
    this.type = 0;
    this.lastfeeddate = new Date();
}

function  Subscribe()
{
    this.userid = 0;
    this.type = 0;
    this.opinionid = 0;
}

function FeedBackQues()
{
    this.userid = 0;
    this.questionid = 0;
    this.answer = "";
}