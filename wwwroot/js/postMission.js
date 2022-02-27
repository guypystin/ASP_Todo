const { data, error } = require("jquery");
var currentId = 0; //активный список задач

function addMission() {
    var form = document.getElementById("missionForm");
    var formValue = `${form.value}`;
    var model =
    {
        Name: formValue,
        Complete: false,
        Tab_Id: currentId
    };
    if (model.Tab_Id == undefined) {
        alert("Вы не выбрали вкладку")
    } else {
        $.ajax({
            url: `/Home/AddMission/${currentId}`,
            dataType: 'text',
            method: 'POST',
            data: model,
            success: function (data) {
                console.log("задача добавлена")
                $(".content__right").html(data)
            },
            error: function (er) {
                console.log(er.status);
                console.log(er.fail);
            }
        });
    }

    return JSON;
}


function tabClick(id) {
    var getUrl = `/Home/TabClick/${id}`
    $.ajax({
        url: getUrl,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            console.log("Клик по вкладке " + currentId)
            currentId = id;
            $(".content__right").html(data);

            /*Пометка активного таба*/
            $(".sidebar").click(function () {
                $(".sidebar").removeClass("active");
                $(this).addClass("active");
            });
        },
        error: function (er) {
            alert(er);
        }
    });
    return JSON;
}

function deleteMission(id) {
    $.ajax({
        url: `/Home/DeleteMission/${currentId}/${id}`,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            console.log("Задача удалена")
            $(".content__right").html(data);
        },
        error: function (er) {
            alert("Ошибка " + er.status);
        }
    });
}
function deleteTab(id) {
    $.ajax({
        url: `/Home/DeleteTab/${id}`,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            console.log("Вкладка удалена")
            $("body").html(data);
        },
        error: function (er) {
            alert("Ошибка " + er.status);
        }
    });
}

function checkboxClick(elem) {
    var value = $(elem).prop("checked");
    var id = $(elem).attr('id');
        $.ajax({
            url: `/Home/checkboxClick`,
            dataType: 'text',
            method: 'POST',
            data: {
                id: id,
                value: value,
                Tab_Id: currentId
            },
            success: function (data) {
                console.log("состояние задачи изменено");
                $(".content__right").html(data);
            },
            error: function (er) {
                console.log('ошибка чекбокса ' + er.status);
                console.log(er.fail);
            }
        })
    
}