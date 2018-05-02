
$(document).ready(function () {
    $('#verificate').keyup(function () {
        if ($(this).val().length > 3) {
            $('#submit').prop('disabled', false);
            $('#submit').addClass('enable');
        }
        else {
            $('#submit').prop('disabled', true);
            $('#submit').removeClass('enable');
        }
    })
    btnValueForGetMaga();
})

function isNumberKey(evt){

	var reg = /^\d+$/;
	var phoneNo = $('#phone').val();
	if (reg.test(phoneNo) == false)
	{ 
		$('#phone').val(phoneNo.substring(0, phoneNo.length -1));
	}

    //var charCode = (evt.which) ? evt.which : event.keyCode;
    //if (charCode > 31 && (charCode < 48 || charCode > 57))
    //    return false;

	if($('#phone').val().length == 10) {
		checkMemberExist();
	}
	else {
		$('#send-ver').prop('disabled',true);
		$('#send-ver').removeClass('enableSend');
		document.getElementById("checkMark").style.display = "none";
	}

    return true;
}    

function displayNeeded(i) {
    if (i == "signUp") {
        $("#register").fadeIn(2500);
		document.getElementById("sendinPhone").disabled = false;
        document.getElementById("last-modified").style.display = "none";
        document.getElementById("login-success").style.display = "none";
        document.getElementById("submit-getMaga").style.display = "none";
        document.getElementById("btn-update").style.display = "none";
		document.getElementById("sendinPhone").value = document.getElementById("phone").value;
		document.getElementById("btn-save").style.display = "none";
		document.getElementById("phone-verif").style.display = "none";
		document.getElementById("attention-hr").style.display = 'none';
    }
}