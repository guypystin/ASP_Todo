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
                $(".mission__table-tbody").html(data)
                form.value = '';
                console.log("задача добавлена")
            },
            error: function (er) {
                console.log(er.status);
                console.log(er.fail);
            }
        });
    }
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
            $(".mission__table-tbody").html(data);

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
            $(".mission__table-tbody").html(data);
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
                $(".mission__table-tbody").html(data);
            },
            error: function (er) {
                console.log('ошибка чекбокса ' + er.status);
                console.log(er.fail);
            }
        })
    
}

function editMission(id, name) {
    var oldButton = $(".mission__button");
    var editForm = $("#missForm");
    var newForm = $("#missionForm");
    var editItem = $(`#${id}`).children(".editable");


    oldButton.attr('onclick', 'editToController(\'' + id + '\',\'' + name + '\')')
    oldButton.text("изменить")
    oldButton.css("background", "green");
    oldButton.css("transition", "0.3s")
    
    newForm.val(name);
    newForm.focusin(function () {
        $(this).css("box-shadow", "0 0 0 0.2rem rgb(0 255 0 / 25%)")
        $(this).css("transition", "0.3s")
    });
    newForm.focusout(function () {
        $(this).css("box-shadow", "")
        $(this).css("transition", "0.3s")
    });
    newForm.focus();

}


function editToController(id, name) {
    var newForm = $("#missionForm");
    var oldButton = $(".mission__button");
    var txt = newForm.val();

    oldButton.css("display", "block");
    oldButton.css("background", "");
    
    newForm.focusin(function () {
        $(this).css("box-shadow", "0 0 0 0.2rem rgb(0 123 255 / 25%)")
        $(this).css("transition", "0.3s")
    });
    newForm.focusout(function () {
        $(this).css("box-shadow", "")
        $(this).css("transition", "0.3s")
    });
    
    $.ajax({
        url: `/Home/Edit`,
        dataType: 'text',
        method: 'POST',
        data: {
            id: id,
            text: txt,
            Tab_Id: currentId
        },
        success: function (data) {
            $(".mission__table-tbody").html(data);
            oldButton.attr('onclick', 'addMission()')
            oldButton.text("+")
            console.log("Изменена задача #" + id + ' на текст: ' + txt);
            newForm.val('');
        },
        error: function (er) {
            console.log('ошибка изменения задачи ' + er.status);
            console.log(er.fail);
        }
    })
   
}