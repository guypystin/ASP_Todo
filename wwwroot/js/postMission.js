const { data, error } = require("jquery");

function addMission() {
    let form = document.getElementById("missionForm");
    let formValue = `${form.value}`;
    let model =
    {
        Name: formValue,
        Complete: false,
        Tab_Id: getLocalStorage()
    };
    if (model.Tab_Id == undefined) {
        alert("Вы не выбрали вкладку")
    } else {
        $.ajax({
            url: `/Home/AddMission/${getLocalStorage()}`,
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
    setLocalStorage(id)
    var getUrl = `/Home/TabClick/${id}`
    $.ajax({
        url: getUrl,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            $(".mission__table-tbody").html(data);
            /*Пометка активного таба*/
            console.log("Клик по вкладке " + getLocalStorage());
        },
        error: function (er) {
            console.log(er.code);
        }
    });
    $(".sidebar").click(function () {
        $(".sidebar").removeClass("active");
        $(this).addClass("active");
    });
}

function deleteMission(id) {
    $.ajax({
        url: `/Home/DeleteMission/${getLocalStorage()}/${id}`,
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
            Tab_Id: getLocalStorage()
        },
        success: function (data) {
            if (getLocalStorage() == 0) {
                console.log('ошибка чекбокса, не выбрана вкладка');
            } else {
                console.log("состояние задачи изменено");
                $(".mission__table-tbody").html(data);
            }
            
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
            Tab_Id: getLocalStorage()
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