﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

/*
function CreateMergeReport() {
    $.post("/Home/AddTab");
        };*/
/*$(function () {
    $(".sidebar").on("mouseover mouseout", function () {
        //быстро изменяем стиль display
        $(".sidebar").css("background", "black")
    });
});*/
var element = document.getElementsByClassName("sidebar")[0];
if (!element) {
    $(".mission__form").css("display", "none");
    $(".mission__table").css("display", "none");
    $(".tab__note").css("display", "block");
}

localStorage.setItem('current', '0'); //хранилище для нажатий по спискам

function getLocalStorage() { //получение информации из хранилища
    return localStorage.getItem('current');
}
function setLocalStorage(value) { //установка информации в хранилище
    return localStorage.setItem('current', `${value}`);
}

