function checkPhoneExist() {
	var phone = document.getElementById("sendinPhone").value;
	
	$.ajax({
		type: 'POST',
			url: 'http://'+ip+'/AutoCarAPI/Member/CheckMemberExist',
			data: JSON.stringify({ PhoneNo: phone }),
			dataType: 'JSON',
			contentType: "application/JSON",
			beforeSend: function () {
			},
			success: function (rets) {
				if(rets.data == true) {
					alertify.alert('車主雜誌', '此號碼已註冊為會員，請直接登入', function(){ window.location.reload(true); });
				}
			},
			error: function () {
			}	
	}).set('modal', false);
}

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results == null)
		return null;
	else
		return results[1] || 0;
}

function register() {
    var phone = document.getElementById("sendinPhone").value;
    var verifyCode = document.getElementById("sendinVerif").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    var y = document.getElementById('year');
    var year = y.options[y.selectedIndex].value;
    var m = document.getElementById('month');
    var month = m.options[m.selectedIndex].value;
    var d = document.getElementById("date");
    var date = d.options[d.selectedIndex].value;
    var bday = year + "-" + month + "-" + date;

    var c = document.getElementById("countries");
    var country = c.options[c.selectedIndex].text;
    var dist = document.getElementById("districts");
    var distNum = dist.options[dist.selectedIndex].value;
    var district = dist.options[dist.selectedIndex].text;
    var address = document.getElementById("address").value;

	var memberType = ($.urlParam('MemberType') != null) ? $.urlParam('MemberType') : 0;
	var sourceType = ($.urlParam('SourceType') != null) ? $.urlParam('SourceType') : 0;

	$.blockUI({ message: '<img src="images/loader.gif" />', css: { backgroundColor: 'rgba(255, 255, 255, 0)', border: '0px' } });

	$.ajax({
		type: 'POST',
		url: 'http://'+ip+'/AutoCarAPI/Member/RegMemberInfo',
		data: JSON.stringify({
			ValidCode: verifyCode,
			MemberType: memberType,
			SourceType: sourceType,
			PhoneNo: phone,
			Name: name,
			Email: email,
			BirthDay: bday,
			AddrCode: distNum,
			AddrCity: country,
			AddrRegion: district,
			Address: address
			}),
		dataType: 'JSON',
		contentType: "application/JSON",
		success: function(rets) {
			if(rets.code == '200') {
				document.getElementById("register").style.display = 'none';
				document.getElementById("attention-div").style.display = 'none';
				getMemberInfo(rets.data);
				btnValueForGetMaga();
				document.getElementById("btn-update").style.display = "block";
			}
			else {
				alertify.alert('車主雜誌', rets.message, function(){});
			}
		},
	}).done(function () {
	    $.unblockUI();
	});;
}
