const { data } = require("jquery");

function clickIndex() {
    var form = document.getElementById("missionForm");
    var formValue = `${form.value}`;
    //form.value = '';
    var model =
    {
        Name: formValue,
        Complete: false,
        Tab_Id: location.pathname.split('/')[3]
    };
    $.ajax({
        url: '/Home/Index',
        dataType: 'json',
        method: 'POST',
        data: model,
        async: true,
        success: function (data) {
            JSON = data;
        }
    });
    return JSON;
}