const { data, error } = require("jquery");
var currentId = 0;

function addMission() {
    var form = document.getElementById("missionForm");
    var formValue = `${form.value}`;
    //form.value = '';
    var model =
    {
        Name: formValue,
        Complete: false,
        Tab_Id: currentId
    };
/*    if (model.Tab_Id != 0 || model.Tab_Id != undefined) {
        
    }*/
    if (model.Tab_Id == undefined) {
        alert("Вы не выбрали вкладку")
    } else {
        $.ajax({
            url: `/Home/AddMission/${currentId}`,
            dataType: 'text',
            method: 'POST',
            data: model,
            success: function (data) {
                console.log("Ок")
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
            console.log("Ок")
            currentId = id;
            $(".content__right").html(data);
        },
        error: function (er) {
            alert(er);
        }
    });
    return JSON;
}

function deleteMission(id) {
    $.ajax({
        url: `/Home/DeleteMission/${id}`,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            console.log("Ок")
            $(".content__right").html(data);
        },
        error: function (er) {
            alert("Ошибка "+er.status);
        }
    });
}
function deleteTab(id) {
    $.ajax({
        url: `/Home/DeleteTab/${id}`,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            console.log("Ок")
            $("body").html(data);
        },
        error: function (er) {
            alert("Ошибка " + er.status);
        }
    });
}
window.onload() = function(){
    var element = document.getElementById('sidebar');
    if (!element) {
        alert('сайдбара нет')
    }
}
