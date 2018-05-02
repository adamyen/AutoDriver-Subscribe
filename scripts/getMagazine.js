function btnValueForGetMaga() {
    var btn = document.getElementById("submit-getMaga");
    var today = new Date();
    var date = today.getDate();
    var realMonth = today.getMonth() + 1;

    if ((realMonth == 11 && date > 20) || (realMonth == 12 && date < 21)) {
        btn.innerHTML = "索取車主雜誌 1月號";
    }
    else if (realMonth == 12 && date > 20) {
        btn.innerHTML = "索取車主雜誌 2月號";
    }
    else {
        if (date < 21) {
            btn.innerHTML = "索取車主雜誌 " + (realMonth + 1) + "月號";
        }
        else {
            btn.innerHTML = "索取車主雜誌 " + (realMonth + 2) + "月號";
        }
    }
}

function acquireStatus(token)  {
	var btn = document.getElementById("submit-getMaga");
	var today = new Date();
    var date = today.getDate();
    var realMonth = today.getMonth() + 1;

	var showMonth;

	if ((realMonth == 11 && date > 20) || (realMonth == 12 && date < 21)) {
        showMonth = 1;
    }
    else if (realMonth == 12 && date > 20) {
        showMonth = 2;
    }
    else {
        if (date < 21) {
            showMonth = realMonth + 1;
        }
        else {
            showMonth = realMonth + 2;
        }
    }

	$.ajax({
		type: 'POST',
		url: 'http://'+ip+'/AutoCarAPI/Receive/CheckIsReceive',
		data: JSON.stringify({ Token: token }),
		dataType: 'JSON',
		contentType: "application/JSON",
		success: function(rets) {
			if (rets.data == true) {
				$('#submit-getMaga').addClass("disable-getMagazine");
				$('#submit-getMaga').prop('disabled', true);
				btn.innerHTML = "已索取車主雜誌 " + showMonth + "月號";
			}
		},
	});
}

function getMagazine() {
	
	var token = document.getElementById("hidden").value;
	var btn = document.getElementById("submit-getMaga");

	$.blockUI({ message: '<img src="images/loader.gif" />', css: { backgroundColor: 'rgba(255, 255, 255, 0)', border: '0px' } });

	$.ajax({
		type: 'POST',
		url: 'http://'+ip+'/AutoCarAPI/Receive/Receive',
		data: JSON.stringify({ Token: token }),
		dataType: 'JSON',
		contentType: "application/JSON",
		success: function(rets) {
			if(rets.code == '200')
			{
				alertify.alert('車主雜誌', '感謝您索取車主雜誌', function(){  });
				$('#submit-getMaga').addClass("disable-getMagazine");
				$('#submit-getMaga').prop('disabled', true);
				acquireStatus(token);
			}
			else
			{				
				alertify.alert('車主雜誌', rets.message, function(){  });
			}
		},
	}).done(function () {
	    $.unblockUI();
	});

}