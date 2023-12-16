/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL='/api/irl';
var jpdbIML='/api/iml';
var DBName='SCHOOL-DB';
var RelationName='STUDENT-TABLE';
var connToken='90931467|-31949302995937040|90960571';

$('#RollNo').focus();

function saveRecNo2LS(jsonObj) {
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}

function getRollNoAsJsonObj() {
    var RollNo=$('#RollNo').val();
    var jsonStr= {
        RollNo: RollNo
    };
    return JSON.stringify(jsonStr);
    }
    
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $('#fullname').val(record.fullname);
    $('#Class').val(record.Class);
    $('#BirthDate').val(record.BirthDate);
    $('#Address').val(record.Address);
    $('#EnrollmentDate').val(record.EnrollmentDate);
}

function resetForm() {
    $('#RollNo').val('');
    $('#fullname').val('');
    $('#Class').val('');
    $('#BirthDate').val('');
    $('#Address').val('');
    $('#EnrollmentDate').val('');
    $('#RollNo').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#update').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#RollNo').focus();
}

function validateData() {
    var RollNo, fullname, Class, BirthDate, Address, EnrollmentDate;
    RollNo=$('#RollNo').val();
    fullname=$('#fullname').val();
    Class = $('#Class').val();
    BirthDate=$('#BirthDate').val();
    Address=$('#Address').val();
    EnrollmentDate=$('#EnrollmentDate').val();
    
    if (RollNo === '') {
        alert('Student Roll-No missing');
        $("#RollNo").focus();
        return '';
    }
    if (fullname === '') {
        alert('Student Name missing');
        $("#fullname").focus();
        return '';
    }
    if (Class === '') {
        alert('Student Class missing');
        $("#Class").focus();
        return '';
    }
    if (BirthDate === '') {
        alert('BirthDate missing');
        $("#BirthDate").focus();
        return '';
    }
    if (Address === '') {
        alert('Address missing');
        $("#Address").focus();
        return '';
    }
    if (EnrollmentDate === '') {
        alert('Enrollment Date missing');
        $("#EnrollmentDate").focus();
        return '';
    }
    
    var jsonStrObj= {
        RollNo: RollNo,
        fullname: fullname,
        Class: Class,
        BirthDate: BirthDate,
        Address: Address,
        EnrollmentDate: EnrollmentDate
    };
    return JSON.stringify(jsonStrObj);
    }
    
function getStudent() {
    var RollNoJsonObj=getRollNoAsJsonObj();
    var getRequest=createGET_BY_KEYRequest(connToken, DBName, RelationName, RollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status===400) {
        $('#save').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#fullname').focus();
    } else if (resJsonObj.status===200) {
        
        $('#RollNo').prop('disabled',true);
        fillData(resJsonObj);
        
        $('#update').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#fullname').focus();
    }
}

function saveData() {
    var jsonStrObj=validateData();
    if (jsonStrObj==='') {
        return '';
    }
    var putRequest= createPUTRequest(connToken, jsonStrObj, DBName, RelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj =executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#RollNo').focus();
}

function updateData() {
    $('#update').prop('disabled',true);
    jsonChg=validateData();
    var updateRequest=createUPDATERecordRequest(connToken, jsonChg, DBName, RelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#RollNo').focus();
}


