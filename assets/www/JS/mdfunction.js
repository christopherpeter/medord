var gage = "";

function onBodyLoad() 
{    
    
    createTable();
    getprofiles();

    var Authenvalue = window.localStorage.getItem("AuthenticationVal");

    if (Authenvalue == "True") {


        $.mobile.changePage($("#Authenticationpage"));

    }
    else {

        $.mobile.changePage($("#home"));
    }


}

function closeapp() {

    if (confirm('Are you sure want to quit the application?')) {

        navigator.app.exitApp();

    }
    else {

        return false;
    }

}



function setprofileform() {

    document.getElementById("mob").value = window.localStorage.getItem("setnumber");
    document.getElementById("name").value = "";    

}

function setstoreform() {
  
    document.getElementById("stmob").value = "";
    document.getElementById("owname").value = "";

}

function onhome() 
{    
    window.location = '#home';
    getprofiles();
}

/*SENDSMS:Function for SMS Sending using Codova-Android SMS Manager Plugin*/

function sendMsg(fMessage, fMessage1, mobile) {

    var totallengthofmsg = fMessage.length + fMessage1.length;
    var currentsplitvalue = 140 - fMessage.length;
    var noofsplitsrequired = Math.round(totallengthofmsg / currentsplitvalue);
    var completemsg = fMessage + fMessage1;

    var currentstr = 0;
    var destinationstr = 0;   

    var message = "";

    for (var i = 0; i <= noofsplitsrequired; i++) 
    {
            
       currentstr = destinationstr;
       destinationstr = destinationstr + currentsplitvalue;
             
       message = fMessage1.toString().substring(currentstr, destinationstr);
              
        var futurecurrentstr = destinationstr;
        var futuredestinationstr = destinationstr + currentsplitvalue;

        if (fMessage1.toString().substring(futurecurrentstr, futuredestinationstr) != "") {
         
            message = message + " More";
            
        }

    try {

        var smsSendingPlugin = cordova.require('cordova/plugin/smssendingplugin');
       
        if (message.length !=0) {
            //alert(fMessage + message + " {" + (i + 1) + "}");
            smsSendingPlugin.send(mobile, fMessage + message + " {" + (i + 1) + "}", function (result) {

                if (result == "Success") {

                    if (noofsplitsrequired == i) {
                        alert('Order Sent Successfully');
                    }
                    $.mobile.changePage($("#home"));
                    saveOrder(mobile, fMessage + fMessage1);
                }
                else {
                    alert(result);
                }

            }, function () {
                alert("Message not sent");
            });
        }        

    }
    catch (e) 
    {
        alert("Error:" + e);
        $.mobile.changePage($("#home"));
    }
  }
}

var phonecontacts = "";
var seqid = "";
function searchcontact(seq) {

    seqid = seq;

    $.mobile.loading('show', {
        text: "Searching Contacts..",
        textVisible: true,
        theme: "a",
        textonly: false

    });

    if (seq == 1) {

        var options = new ContactFindOptions();
        options.filter = document.getElementById("profilecontactsearch1").value;

        var fields = ["displayName", "name", "phoneNumbers"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    else if (seq == 2) {

        var options = new ContactFindOptions();
        options.filter = document.getElementById("profilecontactsearch2").value;

        var fields = ["displayName", "name", "phoneNumbers"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    else if (seq == 3) {

        var options = new ContactFindOptions();
        options.filter = document.getElementById("profilecontactsearch3").value;

        var fields = ["displayName", "name", "phoneNumbers"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    else if (seq == 4) {

        var options = new ContactFindOptions();
        options.filter = document.getElementById("profilecontactsearch4").value;

        var fields = ["displayName", "name", "phoneNumbers"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }
   


}
function onSuccess(contacts) {

    phonecontacts = contacts;
    loadcontacts(seqid);
} 

function onError(contactError) {

    alert('onError!');

}


function loadcontacts(id) {
    
    var output = "";
    
    switch (id) {
        
        case 1:

            $("#contactlist1").empty();

            for (var i = 0; i < phonecontacts.length; i++) {
                
                if (phonecontacts[i].phoneNumbers[0].type == "mobile")
                    output = output + "<li><a onclick=selectcontact(" + i + ",1)>" + phonecontacts[i].displayName + "<br/>(" + phonecontacts[i].phoneNumbers[0].value + ")</a></li>";
                    
            }
            $.mobile.loading('hide');
            $("#contactlist1").html(output);
            $("#contactlist1").listview("refresh");
           

        case 2:

            $("#contactlist2").empty();

            for (var i = 0; i < phonecontacts.length; i++) {

                if (phonecontacts[i].phoneNumbers[0].type == "mobile")
                    output = output + "<li><a onclick=selectcontact(" + i + ",2)>" + phonecontacts[i].displayName + "<br/>(" + phonecontacts[i].phoneNumbers[0].value + ")</a></li>";


            }
            $.mobile.loading('hide');
            $("#contactlist2").html(output);
            $("#contactlist2").listview("refresh");
           

        case 3:

            $("#contactlist3").empty();

            for (var i = 0; i < phonecontacts.length; i++) {

                if (phonecontacts[i].phoneNumbers[0].type == "mobile")
                    output = output + "<li><a onclick=selectcontact(" + i + ",3)>" + phonecontacts[i].displayName + "<br/>(" + phonecontacts[i].phoneNumbers[0].value + ")</a></li>";


            }
            $.mobile.loading('hide');
            $("#contactlist3").html(output);
            $("#contactlist3").listview("refresh");
            

        case 4:

            $("#contactlist4").empty();

            for (var i = 0; i < phonecontacts.length; i++) {

                if (phonecontacts[i].phoneNumbers[0].type == "mobile")
                    output = output + "<li><a onclick=selectcontact(" + i + ",4)>" + phonecontacts[i].displayName + "<br/>(" + phonecontacts[i].phoneNumbers[0].value + ")</a></li>";


            }
            $.mobile.loading('hide');
            $("#contactlist4").html(output);
            $("#contactlist4").listview("refresh");
            
    }
    

}

function selectcontact(index,seq) {
   
    switch (seq) {
        case 1:
            $("#contactmenu1").panel("close");
            
            document.getElementById("mob").value = phonecontacts[index].phoneNumbers[0].value;
            document.getElementById("name").value = phonecontacts[index].displayName;
           

        case 2:
            $("#contactmenu2").panel("close");
                        
            document.getElementById("upmob").value = phonecontacts[index].phoneNumbers[0].value;
            document.getElementById("upname").value = phonecontacts[index].displayName;
        case 3:
            $("#contactmenu3").panel("close");

            document.getElementById("stmob").value = phonecontacts[index].phoneNumbers[0].value;
            document.getElementById("owname").value = phonecontacts[index].displayName;
            

        case 4:
            $("#contactmenu4").panel("close");
            
            document.getElementById("txt_upownnam").value = phonecontacts[index].displayName;
            document.getElementById("txt_upmobnum").value = phonecontacts[index].phoneNumbers[0].value;
            
    }

    }
    

function saveOrder(mmob, mmsg) 
{
    var dbinsertorddet = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    var qryorddet = 'INSERT INTO OrderDetails (ordno,ordmag,orddate) VALUES ("' + mmob + '","' + mmsg + '",DATETIME(\'NOW\',\'localtime\'))';
    dbinsertorddet.transaction(function insertorddetailsDB(tx) 
    {
        tx.executeSql(qryorddet);
    });
    getOrder();
}

function getOrder() {

    var htmlstr = "";
    var getOrderdbcon = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    getOrderdbcon.transaction(function getord(tx) {
        tx.executeSql('select * from OrderDetails a inner join StoreDetails b on a.ordno=b.strmobile', [], function querySuccessorddet(txx, res) {
            for (var i = 0; i < res.rows.length; i++) {

                var ss = res.rows.item(i);
                htmlstr = htmlstr + "<tr><th>" + ss.strname + "</th><td>" + ss.ordmag + "</td></tr>";
               
                $("#orderhistorylist").html(htmlstr);
              
            }
        });
    });
}

function createTable() 
{
    var create = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    create.transaction(function createTableDB(tx) 
    {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Profile (proID INTEGER PRIMARY KEY AUTOINCREMENT,proname,gender,dob,mob,drname,address)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS MedicineDetails (medID INTEGER PRIMARY KEY AUTOINCREMENT,candname,medname,unit,qty,profileid INTEGER)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS StoreDetails (strID INTEGER PRIMARY KEY AUTOINCREMENT,strname,owrname,strmobile)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS OrderDetails (ordID INTEGER PRIMARY KEY AUTOINCREMENT,ordno,ordmag,orddate DATE)');

    });

}

function errorCB(err) 
{
    alert("Error processing SQL: " + err.message);
}

function getprofiles() {   
    

    var db = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);

    var output="";
    db.transaction(function (tx) {

        $('#profiles').empty();

        tx.executeSql('SELECT * FROM Profile', [], function (tx, results) {

            var len = results.rows.length, i;

            for (i = 0; i < len; i++) {

                var dr = results.rows.item(i);
                var profilename = dr.proname;
                var pID = dr.proID;
                var gEnder = dr.gender;

                if (gEnder == 'M') {

                    output = output + "<li><a href='#prodetails?name=" + profilename + "&Id=" + pID + "' onclick=getmeddetails('" + profilename + "'," + pID + "); data-transition='none'><img src='JS/images/male1.png' width='80px' height='80px'/><h2>" + profilename + "</h2></a><a data-icon='delete' onclick='deleteprofile(" + pID + ")'>delete</a></li>";

                }
                else if (gEnder == 'F') {

                    output = output + "<li><a href='#prodetails?name=" + profilename + "&Id=" + pID + "' onclick=getmeddetails('" + profilename + "'," + pID + "); data-transition='none'><img src='JS/images/female1.png' width='80px' height='80px'/><h2>" + profilename + "</h2></a><a data-icon='delete' onclick='deleteprofile(" + pID + ")'>delete</a></li>";
                    
                }
            }
          
            $("#profiles").html(output);
            $("#profiles").listview("refresh");

        });

        getStrDetails();
    });

        
}

function deleteprofile(pid) {


    var r = confirm("Are you sure want to delete this profile?")
    if (r == true) {
        var dbdelete = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);

        var qry = 'Delete from Profile where proID=' + pid;

        dbdelete.transaction(function deletestoresDB(tx) {

            tx.executeSql(qry);
            getprofiles();
            alert("Profile Deleted Successfully!");

        }, errorCB);
    }
   

}


function getstores() {
   
    var db = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);

    var output = "";

    db.transaction(function (tx) {

        $('#storelist').empty();

        tx.executeSql('SELECT * FROM StoreDetails', [], function (tx, results) {

            var len = results.rows.length, i;

            for (i = 0; i < len; i++) {

                var dr = results.rows.item(i);
                var strname = dr.strname;
                var stid = dr.strID;

                output = output + "<li><a href='#updatestore' onclick='Updateclick(" + stid + ")' data-transition='none'><h2>" + strname + "</h2></a><a data-icon='delete' onclick='deletestores(" + stid + ")'>delete</a></li>";

            }

            $("#storelist").html(output);
            $("#storelist").listview("refresh");

        });
    });

}


function deletestores(stid) {

    var r = confirm("Are you sure want to delete this store?")
    if (r == true) {
        var dbdelete = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);

        var qry = 'Delete from StoreDetails where strID=' + stid;

        dbdelete.transaction(function deletestoresDB(tx) {

            tx.executeSql(qry);
            getstores();
            alert("Store Deleted Successfully!");
        }, errorCB);
    }
    
}



var storeID;
function Updateclick(storeid) {
    var stid = storeid;
    
    var db = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);

    var output = "";

    db.transaction(function (tx) {

        $('#storelist').empty();

        tx.executeSql('SELECT * FROM StoreDetails where strID="' + stid + '"', [], function (tx, results) {

            var len = results.rows.length, i;

            for (i = 0; i < len; i++) {

                var dr = results.rows.item(i);
                var strname = dr.strname;
                var owname = dr.owrname;
                var strmob = dr.strmobile;
                storeID = dr.strID;
               

                $("#txt_upstrname").val(strname);
                $("#txt_upownnam").val(owname);
                $("#txt_upmobnum").val(strmob);
               
            }

        });
    });

}


function updatestore() {
    var stid = storeID;
    var strname = trimAll(document.getElementById("txt_upstrname").value);
    var owrname = trimAll(document.getElementById("txt_upownnam").value);
    var strmob = trimAll(document.getElementById("txt_upmobnum").value);
    if (isEmpty(strname, "Enter the store name.")) {
        if (isValid(strname, "Special character are not allowed in Store Name."))
            if (isEmpty(owrname, "Enter owner name.")) {
                if (isValid(owrname, "Special character are not allowed in Owner Name."))
                    if (isEmpty(strmob, "Enter store mobile number")) {
                        if (strmob.length < 10) {
                            alert("Enter Mobile Number in 10 digit.");
                            return false;
                        }
                        updatestrdetails(strname, owrname, strmob, stid);
                        alert("Store Details updated successfully");
                        $.mobile.changePage($("#store"));
                        getstores();
                        getStrDetails();
                        document.getElementById("txt_upstrname").value = "";
                        document.getElementById("txt_upownnam").value = "";
                        document.getElementById("txt_upmobnum").value = "";

                    }
            }
    }

  
}

function setprofile() 
{  
    var candname = trimAll(document.getElementById("name").value);
    var mm = trimAll(document.getElementById("month").value);
    var yyyy = trimAll(document.getElementById("year").value);
    var address = trimAll(document.getElementById("addr").value);
    var gen = document.getElementById("gender");
    var gender = gen.options[gen.selectedIndex].value;
    var mob = trimAll(document.getElementById("mob").value);
    var ref = trimAll(document.getElementById("drname").value);
    var todate=new Date();

    if (isEmpty(candname, "Please Enter the Name.")) 
    {
        if(isValid(candname,"Special character are not allowed in Name."))
            if (isEmpty(yyyy, "Please +90 the Year.")) 
        {
            if (yyyy.length < 4) 
            {
                alert("Please Enter the valid Year.");
                return false;
            }

            if (yyyy > todate.getFullYear()) 
            {
                alert("Invalid Birth Year.");
                return false;
            }
            if (isEmpty(mm, "Please Enter the Month."))
            {
                if (mm > 12) 
                {
                    alert("Enter the valid Month.");
                    return false;
                }
                if (isEmpty(mob, "Please Enter the Mobile Number.")) 
                {
                    if (mob.length < 10) 
                    {
                        alert("Enter Mobile Number in 10 digit.");
                        return false;
                    }
                    if (isEmpty(address, "Please Enter Delivery Address.")) 
                    {

                        if (mm.length <= 1) 
                        {
                            mm = "0" + mm;
                        }
                        var dob = mm + yyyy;
                     
                        insertprofile(candname, gender, dob, mob, ref, address);
                        alert("Profile Added Successfully.");

                        $.mobile.changePage($("#home"));
                        getprofiles();
                        document.getElementById("name").value = "";
                        document.getElementById("month").value = "";
                        document.getElementById("mob").value = "";
                        document.getElementById("year").value = "";
                        document.getElementById("addr").value = "";
                        
                        document.getElementById("drname").value = "";
                        
                 
                    }
                }
            }
        }
    }
  

}

function insertprofile(name, gender, date, mno, dname, daddr) 
{
    var dbinsert = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);

    var qry = 'INSERT INTO Profile (proname,gender,dob,mob,drname,address) VALUES ("' + name + '","' + gender + '","' + date + '","' + mno + '","' + dname + '","' + daddr + '")';
    
    dbinsert.transaction(function insertprofileDB(tx) 
    {
        
        tx.executeSql(qry);
    }, errorCB);
}

function addmedicine() 
{
    var mediid = 0;
    var cname = document.getElementById("hidprname").value;
    mediid = document.getElementById("hidprid").value;

    var mediname = trimAll(document.getElementById("medname").value);
   
    var mediqty = trimAll(document.getElementById("medqty").value);

    if (isEmpty(mediname, "Enter Medicine Name.")) 
    {
   
        if (isEmpty(mediqty, "Enter the Quantity.")) 
        {
            insertmeddetails(cname, mediname, mediqty, mediid);
            alert("Medicine Added Successfully.");
            document.getElementById("medname").value = "";
   
            document.getElementById("medqty").value = 30;
            getmeddetails(cname, mediid);
        }
      
    }
}

function insertmeddetails(cname, mname, mqty, mid) 
{
    var dbinsertdet = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    var qrydet = 'INSERT INTO MedicineDetails(candname,medname,qty,profileid) VALUES ("' + cname + '","' + mname + '","' + mqty + '","' + mid + '")';
   
    dbinsertdet.transaction(function insertmeddetailsDB(tx) 
    {
        tx.executeSql(qrydet);
    });
}


function getmeddetails(profilename, prid)
 {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    //var hours = 10;
    var hours1 = hours + 1;
    if (hours1 >= 24) {
        hours1 = hours1 - 24;
    }

    var suffix1 = "AM";
    if (hours1 >= 12) {
        suffix1 = "PM";
        hours1 = hours1 - 12;
    }
    if (hours1 == 0) {
        hours1 = 12;
    }

    var vv = hours1;
    $("#tFrom").val(vv);

    if (suffix1 == "PM") {
        $("#selFrom").slider();
        $("#selFrom").val("PM");
        $("#selFrom").slider("refresh");
    } else {
        $("#selFrom").slider();
        $("#selFrom").val("AM");
        $("#selFrom").slider("refresh");
    }


    var hours2 = hours + 3;

    if (hours2 >= 24) {
        hours2 = hours2 - 24;
    }

    var suffix2 = "AM";
    if (hours2 >= 12) {
        suffix2 = "PM";
        hours2 = hours2 - 12;
    }
    if (hours2 == 0) {
        hours2 = 12;
    }

    var vvv = hours2;

    $("#tTo").val(vvv);

    if (suffix2 == "PM") {
        $("#selTo").slider();
        $("#selTo").val("PM");
        $("#selTo").slider("refresh");
    } else {
        $("#selTo").slider();
        $("#selTo").val("AM");
        $("#selTo").slider("refresh");
    }
  
    var db = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    var hidval = "<input type=\"hidden\" id=\"hidprname\" value=" + profilename + "></input><input type=\"hidden\" id=\"hidprid\" value=" + prid + "></input>";
    $("#hiddenval").html(hidval);
    db.transaction(function getmed(tx) {


        var finalText = "<span style='font-family: calibri; font-size: 20px; color: black'> Profile: " + profilename + "</span>&nbsp;&nbsp;&nbsp;<a href='#updateprofile' onclick='updateprofiles()' >Edit</a> <br />";
        $("#candiname").html(finalText);

        tx.executeSql('SELECT * FROM MedicineDetails WHERE candname="' + profilename + '" and profileid=' + prid, [], function (tx, results) {

            $('#meddetails').empty();
            var len = results.rows.length, i;
            var output = "<table  style='width:100%;table-layout: fixed;'>";
            for (i = 0; i < len; i++) {

                var r = results.rows.item(i);

                var mID = r.medID;
                output = output + "<tr >";
                output = output + "<td   style='width:30%;text-align:left;word-wrap: break-word;'>";
                output = output +  r.medname  ;
                output = output + "</td>";
                output = output + "<td  style='width:15%;text-align:left;word-wrap: break-word;'>";
                output = output + r.qty ;
                output = output + "</td>";
                output = output + "<td  style='width:15%;text-align:left;'>";
                output = output + "<span style=\"padding-bottom: 5px !important; \"><input style=\" margin-top: 0px !important; height:5px;\" type=\"checkbox\" checked name=\"order\" value=\"" + mID + "\"/></span>&nbsp;&nbsp;&nbsp;&nbsp;";
                output = output + "</td>";
                output = output + "<td  style='width:15%;text-align:left;'>";
                output = output + "<a href=\"\" onclick=deleteMed('" + mID + "'); ><img src=\"JS/images/delete.png\" style=\"margin-top: 2px !important;\" /></a>";
                output = output + "</td>";
                output = output + "</tr>";


            }
            output = output + "</table>";
            $('#meddetails').html(output);
        });


    });
}


function updateprofiles() {
    profile_id = document.getElementById('hidprid').value;
  
    var db = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);

    var output = "";

    db.transaction(function (tx) {

        tx.executeSql('SELECT * FROM Profile where proID="' + profile_id + '"', [], function (tx, results) {

            var len = results.rows.length, i;

            for (i = 0; i < len; i++) {

                var dr = results.rows.item(i);
                var strname = dr.proname;
                var strgender = dr.gender;

                var strmonth = dr.month;
                var stryear = dr.year;
                var strmob = dr.mob;
                var strdrname = dr.drname;
                var straddr = dr.address;
                storeID = dr.strID;

                var strdob = dr.dob;
                var strmonth = strdob.substring(0, 2);
                var stryear = strdob.substring(2, 6);

                $("#upname").val(strname);

                $("#upmonth").val(strmonth);
                $("#upyear").val(stryear);
                $("#upmob").val(strmob);
                $("#updrname").val(strdrname);
                $("#updradd").val(straddr);

                if (strgender == 'F') {
                    $("#upgender").slider();
                    $("#upgender").val("F");
                    $("#upgender").slider("refresh");
                }
                else {
                    $("#upgender").slider();
                    $("#upgender").val("M");
                    $("#upgender").slider("refresh");
                }
            }

        });
    });
}

function restoresettingsval() {
   
    var restoremob = window.localStorage.getItem("setnumber");
    var restorepin = window.localStorage.getItem("setpin");

    var chkboxtick = window.localStorage.getItem("AuthenticationVal");

    if (chkboxtick == "True") {

        $("#authslider").slider();
        $("#authslider").val("On");
        $("#authslider").slider("refresh");
                     

    }

    $("#settmob").val(restoremob);
    $("#settpin").val(restorepin);
}

function PFupdate() {

    prof_id = document.getElementById('hidprid').value;

    var candname = trimAll(document.getElementById("upname").value);

    var mm = trimAll(document.getElementById("upmonth").value);
    var yyyy = trimAll(document.getElementById("upyear").value);
    var address = trimAll(document.getElementById("updradd").value);
    var gen = document.getElementById("upgender");
    var gender = gen.options[gen.selectedIndex].value;
    var mob = trimAll(document.getElementById("upmob").value);
    var drnam = trimAll(document.getElementById("updrname").value);
    var todate = new Date();

    if (isEmpty(candname, "Please Enter the Name.")) {
        if (isValid(candname, "Special character are not allowed in Name."))
            if (isEmpty(yyyy, "Please +90 the Year.")) {
                if (yyyy.length < 4) {
                    alert("Please Enter the valid Year.");
                    return false;
                }

                if (yyyy > todate.getFullYear()) {
                    alert("Invalid Birth Year.");
                    return false;
                }
                if (isEmpty(mm, "Please Enter the Month.")) {
                    if (mm > 12) {
                        alert("Enter the valid Month.");
                        return false;
                    }
                    if (isEmpty(mob, "Please Enter the Mobile Number.")) {
                        if (mob.length < 10) {
                            alert("Enter Mobile Number in 10 digit.");
                            return false;
                        }
                        if (isEmpty(address, "Please Enter Delivery Address.")) {

                            if (mm.length <= 1) {
                                mm = "0" + mm;
                            }
                            var dob = mm + yyyy;
                                                      
                            updateprofiledata(candname, gender, dob, mob, drnam, address, prof_id);
                            alert("Profile Updated Successfully.");
                            history.back();
                            getprofiles();
                            document.getElementById("name").value = "";
                            document.getElementById("month").value = "";
                            document.getElementById("mob").value = "";
                            document.getElementById("year").value = "";
                            document.getElementById("addr").value = "";
                            document.getElementById("drname").value = "";


                        }
                    }
                }
            }
    }
}


function updateprofiledata(candname1, gender1, dob1, mob1, drnam, address1, p_idd) {
    var dbinsertstrdet = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    var qrystrdet = 'UPDATE  profile SET proname="' + candname1 + '",gender="' + gender1 + '",dob="' + dob1 + '",mob="' + mob1 + '",drname="' + drnam + '",address="' + address1 + '" where proID="' + p_idd + '" ';
    dbinsertstrdet.transaction(function updatemeddetailsDB(tx) {
        tx.executeSql(qrystrdet);
    }, errorCB);
}




function orderNow() 
{    
    var profName = document.getElementById("hidprname").value;
    var profiid = document.getElementById("hidprid").value;
    var deli = document.getElementById("selDeliver");
    var deldate = deli.options[deli.selectedIndex].value;
    
    var boolval = true;
    var tFrom = parseInt($("#tFrom").val()) || 0;
    var tTo = parseInt($("#tTo").val()) || 0;
    var fr = document.getElementById("selFrom");
    var fro = fr.options[fr.selectedIndex].value;
    var to = document.getElementById("selTo");
    var tto = to.options[to.selectedIndex].value;
    var currentTiming = new Date();
    var hr = currentTiming.getHours();
    var dd = currentTiming.getDate();
    var mm = currentTiming.getMonth() + 1;
    var yy = currentTiming.getFullYear();
    var tfr = tFrom + " " + fro;
    var ttt = tTo + " " + tto;
    if ($("#tFrom").val() == null || $("#tFrom").val() == "") {
        alert("Please Enter From Time.");
        return false;
    }
    else if ($("#tTo").val() == "" || $("#tFrom").val() == null) {
        alert("Please Enter To Time.");
        return false;
    }
    else if (deldate == "today") 
    {
        deldate = "" + dd + "/" + mm + "/" + yy;
        
        var period = "";
        if (hr >= 12) 
        {
            period = "PM";
        }
        else {
            period = "AM";
        }

        if (fro == "PM" && tFrom < 12) 
        {
            tFrom += 12;
          
        }
        if (tto == "PM" && tTo < 12) 
        {
            tTo += 12;
           
        }

        if ((hr > tTo) || (hr > tFrom) || (tFrom > tTo)) 
        {
            alert("invalid Time");
            return false;
        }
        else {
            if (hr > (tTo - 2) || (tTo == tFrom)) 
            {
                alert("Please select preferred time at least 2 hours later. ");
                return false;
            }
            else 
            {
              
                boolval = true;
            }
        }
    }
    else {
        var d1 = dd+1;
        deldate = "" + d1 + "/" + mm + "/" + yy;
     
        boolval = true;
    }
   

    var or_len = document.getElementsByName('order');
   
    if (boolval) 
    {
     
        var meID = 0;
        var arrMID = 1;
        arrMID = new Array();
        for (e = 0; e < or_len.length; e++) 
        {
            if (or_len[e].checked == true)
             {
               
               arrMID.push(or_len[e].value);
            }
        }


        var qryget = "";
     
        if (arrMID.length < 1) 
        {

            alert("Please select atleast one medicine");
            return false;
        }
        else if (arrMID.length == 1) 
        {
            qryget = 'SELECT * FROM MedicineDetails,Profile WHERE medID="' + arrMID[0] + '" and proID=' + profiid;
            orderMSG(qryget, profName, deldate, tfr, ttt);
        }
        else 
        {
            var val = "";
            for (var i = 0; i < arrMID.length; i++) 
            {
                val = val + arrMID[i] + ",";
            }
            val = val.slice(0, -1)
          
            qryget = 'SELECT * FROM MedicineDetails,Profile WHERE medID in (' + val + ') and proID=' + profiid;
            orderMSG(qryget, profName, deldate, tfr, ttt);
        }
    }

}
function orderMSG(qrygetmd, profName1, deldate1, tFrom1, tTo1) 
{
    var msg = "";
    var age1 = "";
    var gen1 = "";
    var address1 = "";
    
    var dbgetorderdetails = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    dbgetorderdetails.transaction(function getmsgmeddetailsDB(tx) {
        tx.executeSql(qrygetmd, [], function getSuccessMDetails(tx1, result1) {
            for (var i = 0; i < result1.rows.length; i++) {
                var rr = result1.rows.item(i);
                msg = msg + rr.medname + "-" + rr.qty + "|";
              
                age1 = rr.dob;
                gen1 = rr.gender;
                address1 = rr.address;

            }
            arrangMsg(msg, profName1, deldate1, tFrom1, tTo1, age1, address1, gen1);

        });
    });
    

}

function getAge(agestr) 
{
    var newage;
    var newyear;
    var newmon;
    var mmstr = agestr.slice(0, -4);
    var yearstr = agestr.slice(2);
    var currentTime = new Date()
    var mon = currentTime.getMonth() + 1;
    var year1 = currentTime.getFullYear();
    newyear = year1 - yearstr;
    newmon = mon - mmstr;
    if (newmon >= 6) 
    {
        newyear++;
    }
    
    return newyear;
}

function arrangMsg(mess, prName, dDate, tF, tT, ag1, add1, gen1) 
{
    var age1 = getAge(ag1);

    var ssmob = document.getElementById("storedetails");
    var strmobileno = ssmob.options[ssmob.selectedIndex].value;
    var randomid = randomidgeneration();
    var fullmsg = "MD " + randomid+":";
    fullmsg = fullmsg + " " + prName + "(" + age1 + "" + gen1+"):";
       
    var fullmsg1 = "\nDelivery Day: " + dDate + " Time: " + tF + "-" + tT + "\nDelivery Address:\n" + add1;
    var splitmess = mess.split("|");
    var medetails = "";
    var splitval = splitmess.length - 2; 

    for (i = 0; i < splitmess.length-1; i++) {

        if (i == splitval) {

            medetails = medetails + splitmess[i] + "";
           
        }
        else {
            
            medetails = medetails + splitmess[i] + ",";
        }
    }
  
    fullmsg1 = fullmsg1 + "\n|Medicines: " + medetails;
   
    sendMsg(fullmsg,fullmsg1,strmobileno);
    document.getElementById("tFrom").value = "";
    document.getElementById("tTo").value = "";
       
}

/* RANDIDGEN:Function for Random ID Generation */

function randomidgeneration() {
    var text = "";
    var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function deleteMed(medicineID) 
{
    var profNameD = document.getElementById("hidprname").value;
    var profiidD = document.getElementById("hidprid").value;

    var dbdeletemed = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    var qrydelete = 'DELETE FROM MedicineDetails WHERE medID="' + medicineID + '"';
    dbdeletemed.transaction(function insertmeddetailsDB(tx) 
    {
        tx.executeSql(qrydelete);
    }, errorCB);
    getmeddetails(profNameD, profiidD);
}



function saveStore() 
{
    var strname = trimAll(document.getElementById("stname").value);
    var owrname = trimAll(document.getElementById("owname").value);
    var strmob = trimAll(document.getElementById("stmob").value);
    if (isEmpty(strname, "Enter the store name.")) 
    {
        if(isValid(strname,"Special character are not allowed in Store Name."))
            if (isEmpty(owrname, "Enter owner name.")) 
            {
                if (isValid(owrname,"Special character are not allowed in Owner Name."))
                    if (isEmpty(strmob, "Enter store mobile number")) 
            {
                if (strmob.length < 10) 
                {
                    alert("Enter Moblie Number in 10 digit.");
                    return false;
                }
                insertstrdetails(strname, owrname, strmob);
                alert("Store Details added successfully");

                $.mobile.changePage($("#store"));
                getstores();
                getStrDetails();             
                document.getElementById("stname").value = "";
                document.getElementById("owname").value = "";
                document.getElementById("stmob").value = "";
                
            }
        }
    }

}


function insertstrdetails(stname, owname, stmob) 
{
    var dbinsertstrdet = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    var qrystrdet = 'INSERT INTO StoreDetails (strname,owrname,strmobile) VALUES ("' + stname + '","' + owname + '","' + stmob + '")';
    dbinsertstrdet.transaction(function insertmeddetailsDB(tx) {
        tx.executeSql(qrystrdet);
        
    }, errorCB);
}


function updatestrdetails(stname, owname, stmob, stid) {

    var dbinsertstrdet = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    var qrystrdet = 'UPDATE  StoreDetails SET strname="' + stname + '",owrname="' + owname + '",strmobile="' + stmob + '" where strID="' + stid + '" ';
    dbinsertstrdet.transaction(function updatemeddetailsDB(tx) {
        tx.executeSql(qrystrdet);
    }, errorCB);
}

function getStrDetails() 
{
    var optionval = "";
    var storeqry = 'SELECT * FROM StoreDetails';
    var dbgetstrdetails = window.openDatabase("MedrodDB", "1.0", "MedrodDB", 2 * 1024 * 1024);
    dbgetstrdetails.transaction(function getstrdetailsDB(tx) {
        tx.executeSql(storeqry, [], function getSuccessStrDetails(tx1, result1) {
           

            for (var i = 0; i < result1.rows.length; i++) {
               
                var rs = result1.rows.item(i);

                optionval = optionval + "<option value=" + rs.strmobile + ">" + rs.strname + "</option>"

            }
            
            document.getElementById("storedetails").innerHTML = optionval;
            $("#storedetails").selectmenu("refresh");

        });

    });
}

function fnsettings() {

    var numbervalue = trimAll(document.getElementById('settmob').value);
    var pinvalue = trimAll(document.getElementById('settpin').value);

    if (numbervalue == "") {
        alert('Enter Number');
        document.getElementById('settmob').focus();
        return false;
    } else if (numbervalue.length < 10) {
        alert('Enter Moblie Number in 10 digit ');
        document.getElementById('settmob').focus();
        return false;
    }

    if (pinvalue == "") {
        alert('Enter PIN');
        document.getElementById('settpin').focus();
        return false;
    } else if (pinvalue.length != 4) {
        alert('Enter PIN Number in 4 digits');
        document.getElementById('settpin').focus();
        return false;
    }
       

    if ($("#authslider").val() == "On") {

        window.localStorage.setItem("AuthenticationVal", "True");
    }
    else {
        window.localStorage.setItem("AuthenticationVal", "False");
    }

    window.localStorage.setItem("setnumber", numbervalue);
    window.localStorage.setItem("setpin", pinvalue);
        

    alert('Settings Saved Sucessfully ');
    $.mobile.changePage($("#home"));
    getprofiles();
    document.getElementById('settmob').value = "";
    document.getElementById('settpin').value = "";
    //var value = window.localStorage.getItem("setnumber");
    //alert(value);
}


/* Authentication Page functions */

function login() {

    var logpin = trimAll(document.getElementById('pw').value);
        
    if (logpin == "") {
        alert('Enter Your PIN');
        document.getElementById('authpin').focus();
        return false;
    }

    var logpinvalue = window.localStorage.getItem("setpin");

    if (logpin == logpinvalue) {
       
        $.mobile.changePage($("#home"));
    }
    else {
        alert("Invalid PIN");
    }
}


/* Extra functions */

function increment() 
{
    var medqty = document.getElementById("medqty").value++;
    document.getElementById("medqty").value = document.getElementById("medqty").value++;
}
function decrement() 
{
    var medqty1 = document.getElementById("medqty").value--;
    document.getElementById("medqty").value = document.getElementById("medqty").value--;

}

function isEmpty(str, helperMsg) 
{
    if (str == null || str == "") 
    {
        alert(helperMsg);
        return false;
    }
    return true;
}

function trimAll(str) 
{
    if (str != null)
    {
        while (str.length > 0 &&
     	"\n\r\t ".indexOf(str.charAt(str.length - 1)) != -1)
            str = str.substring(0, str.length - 1);
        while (str.length > 0 &&
        "\n\r\t ".indexOf(str.charAt(0)) != -1)
            str = str.substring(1, str.length);
    }
    return str;
}

function isValid(str,altmsg) 
{
    var iChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";

    for (var i = 0; i < str.length; i++)
     {
        if (iChars.indexOf(str.charAt(i)) != -1)
         {
            alert(altmsg);
            return false;
        }
    }
    return true;
}

