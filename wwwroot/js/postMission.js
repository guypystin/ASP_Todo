const { data, error } = require("jquery");
var currentId = 0;
function clickIndex() {
    var form = document.getElementById("missionForm");
    var formValue = `${form.value}`;
    //form.value = '';
    var model =
    {
        Name: formValue,
        Complete: false,
        Tab_Id: currentId
    };
    $.ajax({
        url: '/Home/Index',
        dataType: 'text',
        method: 'POST',
        data: model,
        success: function (data) {
            console.log("Ок")
            $(".content__right").html(data)
        },
        error: function (er) {
            alert(er.fail);
        }
    });
    return JSON;
}
function tabClick(id) {
    var getUrl = `/Home/TabClick/${id}`
    $.ajax({
        url: getUrl,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            console.log("Ок")

            currentId = id;
            
            $(".content__right").html(data);

            document.querySelectorAll('.roww').forEach((currentRow, index, rows) => {
                currentRow.addEventListener('click', () => {
                    rows.forEach((row) => row.classList.remove('active'));
                    currentRow.classList.add('active');
                })
            })
        },
        error: function (er) {
            alert(er);
        }
    });
    return JSON;
}