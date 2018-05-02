function edit() {
    document.getElementById("btn-update").style.display = "none";
    document.getElementById("btn-save").style.display = "block";
    $("#details").removeClass("disableMouse");
    document.getElementById("submit-getMaga").style.display = "none";
}

function doneEdit() {
    document.getElementById("btn-update").style.display = "block";
    document.getElementById("btn-save").style.display = "none";
    $("#details").addClass("disableMouse");
    document.getElementById("submit-getMaga").style.display = "block";
	var token = document.getElementById("hidden").value;
	var phone = document.getElementById("sendinPhone").value;
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

    $.blockUI({ message: '<img src="images/loader.gif" />', css: { backgroundColor: 'rgba(255, 255, 255, 0)', border: '0px' } });

	$.ajax({
		type: 'POST',
		url: 'http://'+ip+'/AutoCarAPI/Member/UpdateMemberInfo',
		data: JSON.stringify({ 
			Token: token,
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
			getMemberInfo(token);
			acquireStatus(token);
		},
	}).done(function () {
	    $.unblockUI();
	});;
}