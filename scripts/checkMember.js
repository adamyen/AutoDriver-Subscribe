function checkMemberExist() {
	var btn = document.getElementById("send-ver");
	var phone = document.getElementById("phone").value;

	if(phone == '')
		return false;

	if (phone.length < 10) {
		alertify.alert('車主雜誌', '此電話號碼的格式無法識別', function(){});
	}
	else {
	    $.blockUI({ message: '<img src="images/loader.gif" />', css: { backgroundColor: 'rgba(255, 255, 255, 0)', border: '0px' } });

		$.ajax({
			type: 'POST',
			url: 'http://'+ip+'/AutoCarAPI/Member/CheckMemberExist',
			data: JSON.stringify({ PhoneNo: phone }),
			dataType: 'JSON',
			contentType: "application/JSON",
			beforeSend: function () {
			},
			success: function (rets) {
			    $.unblockUI();
				if(rets.data == true) {
					btn.disabled = false;
					$('#send-ver').addClass('enableSend');
					document.getElementById("checkMark").style.display = "block";
				}
				if (rets.data == false) {
				    alertify.confirm('車主雜誌', '您尚未成為會員。是否立即註冊',
                    function () {
                        alertify.confirm().close();
                    },
                    function () {
                        displayNeeded('signUp');
                    }).set('modal', false).set({ labels: { ok: "取消", cancel: "確認" } }).set('defaultFocus', 'cancel');;
				}
			},
			error: function () {
			}            
		}).done(function() {
		    $.unblockUI();
		});
	}
}

function sendSmsCode(x) {

	var phone;

	if(x == 'a') {
		phone = document.getElementById("phone").value;
	}
	else if(x == 'b') {
		phone = document.getElementById("sendinPhone").value;
	}

	$.ajax({
		type: 'POST',
		url: 'http://'+ip+'/AutoCarAPI/Member/SendSMSCode',
		data: JSON.stringify({ PhoneNo: phone }),
		dataType: 'JSON',
		contentType: "application/JSON",
		success: function(rets) {
			if(rets.code != "200") {
				alertify.alert('車主雜誌',rets.message, function(){ });
			}
			else {
				alertify.alert('車主雜誌', '簡訊驗證碼已發送', function(){ });
			}
		},
	});
}
