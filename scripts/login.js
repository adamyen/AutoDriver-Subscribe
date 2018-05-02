function login() {
	var phone = document.getElementById("phone").value;
	var verifyCode = document.getElementById("verificate").value;

	$.ajax({
		type: 'POST',
		url: 'http://'+ip+'/AutoCarAPI/Member/MemberLogin',
		data: JSON.stringify({ PhoneNo: phone, ValidCode: verifyCode}),
		dataType: 'JSON',
		contentType: "application/JSON",
		success: function(rets) {		
			if(rets.code == '200' && rets.data != '')
			{
				getMemberInfo(rets.data);
				acquireStatus(rets.data);
				$('#sendinPhone').prop('disabled', true);
				document.getElementById("sendinVerif").value = document.getElementById("verificate").value;
				document.getElementById("attention-div").style.display = 'none';
			}
			else {
				document.getElementById("register").style.display = "none";
				document.getElementById("phone-verif").style.display = "block";
				document.getElementById("checkMark").style.display = "block";
				document.getElementById("cross").style.display = "block";
				alertify.alert('車主雜誌', '驗證碼有誤或已失效',function(){});
			}
		},
	});
}

function getMemberInfo(token){
	$.ajax({
		type: 'POST',
		url: 'http://'+ip+'/AutoCarAPI/Member/GetMemberInfo',
		data: JSON.stringify({ Token: token }),
		dataType: 'JSON',
		contentType: 'application/JSON',
		success: function(rets) {
			document.getElementById("sec-send-ver").style.display = "none";
			$("#details").addClass("disableMouse");
			$("#phone-verif").addClass("disableMouse");
			document.getElementById("logoimg").src = "images/smile.png";
			$("#logoimg").removeClass("logoimg");
			$("#logoimg").addClass("img");
			$("#register").fadeIn(1000);
			$("#attention-div").fadeIn(1000);
			document.getElementById("login-failed").style.display = "none";
			document.getElementById("submit-register").style.display = "none";
			document.getElementById("sendinVerif").style.display = "none";
			document.getElementById("btn-save").style.display = "none";
			document.getElementById("phone-verif").style.display = "none";
			document.getElementById("attention-hr").style.display = "none";
			
			document.getElementById("login-success").style.display = "block";
			document.getElementById("btn-update").style.display = "block";
			document.getElementById("submit-getMaga").style.display = "block";

			var data = rets.data;
			var bday = data.BirthDay;
			var bdaySplit = new Array();
			bdaySplit = bday.split('/');

			document.getElementById("sendinPhone").value = data.PhoneNo;
			document.getElementById("name").value = data.Name;
			document.getElementById("email").value = data.Email;
			$('#year').val(bdaySplit[0]);
			$('#month').val(bdaySplit[1]);
			clearDate();
			$('#date').val(bdaySplit[2]);
			document.getElementById("address").value = data.Address;
			document.getElementById("hidden").value = token;
			document.getElementById("last-modified").innerHTML = "最後修改日期: " + data.UpdateDateTime;

			var countries = $('#countries').find('option');

			for (var i = 0; i < countries.length; i++) {
				if($(countries[i]).text() == data.AddrCity)
					$(countries[i]).prop('selected',true);
			}
			getDistricts();

			$('#districts').val(data.AddrCode);
		}
	});
}