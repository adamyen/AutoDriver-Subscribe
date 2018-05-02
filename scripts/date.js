
var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

function getDateList() {
    var d = new Date();
    var y = d.getFullYear();

    var year = document.getElementById('year');
    var month = document.getElementById('month');

    for (var i = y; i >= 1905; i--) {
        var optionY = document.createElement('option');
        optionY.value = i;
        optionY.text = i + "年";
        year.add(optionY);
    }

    for (var i = 0; i < months.length; i++) {
        var optionM = document.createElement('option');
        optionM.value = pad(i + 1);
        optionM.text = months[i];
        month.add(optionM);
    }
}

function clearDate() {
    var date = document.getElementById('date');

    do {
        date.remove(date.length - 1);
    } while (date.length > 0)

    listOutDays();
}

function listOutDays() {
    var y = document.getElementById('year');
    var optionY = y.options[y.selectedIndex].value;
    var m = document.getElementById('month');
    var optionM = parseInt(m.options[m.selectedIndex].value);
    var date = document.getElementById('date');

    var d = new Date(optionY, optionM, 0);
    var lastDay = d.getDate();

    for (var i = 0; i < lastDay; i++) {
        var optionD = document.createElement('option');
        optionD.value = pad(i + 1);
        optionD.text = pad(i + 1) + "日";
        date.add(optionD);
    }
}

function pad(i) {
    return (i < 10) ? "0" + i : i;
}