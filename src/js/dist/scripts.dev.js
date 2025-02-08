"use strict";

/*-----------TOP-----------*/
var logdialog = document.querySelector(".dialog");
var butt = document.querySelector(".butt");
var can = document.querySelector(".can");

butt.onclick = function () {
  logdialog.style.display = "flex";
};

can.onclick = function () {
  logdialog.style.display = "none";
};
/*-----------DIALOGBOX-----------*/


var logswitch = document.querySelector(".logswitch strong");
var dropzone = document.querySelector(".dropzone");

dropzone.ondragover = function () {
  //alert('u log')
  dropzone.style.backgroundColor = "red"; //logswitch.style.top = "2px"

  dropzone.appendChild(logswitch);
};
/*-----------VALIDATOR-----------*/


var phonenum = document.querySelector("#phonenum");

phonenum.oninput = function () {
  phonenum.value = phonenum.value.replace(/[\D]/g, '');
};
/*-----------SERVICES-----------*/


var cardsoff = document.querySelectorAll(".cardoff img");
cardsoff.forEach(function (cardoff) {
  cardoff.onclick = function (event) {
    if (event.detail == 3) {
      cardoff.previousElementSibling.style.color = "#c0301c";
      cardoff.previousElementSibling.style.fontWeight = "bold";
      cardoff.previousElementSibling.innerText = "discover";
    }
  };
});
/*-----------LATEST WORKS-----------*/

var ltmenu = document.querySelectorAll(".ltmenu a");
var workcards = document.querySelectorAll(".workcard");
ltmenu.forEach(function (element) {
  element.onclick = function (e) {
    e.preventDefault();

    if (element.innerText == "All") {
      workcards.forEach(function (workcard) {
        return workcard.style.display = "block";
      });
    } else {
      workcards.forEach(function (workcard) {
        workcard.style.display = element.innerText == workcard.querySelector("p").innerText ? "block" : "none";
      });
    }
  };
});
/*-----------READ MORE-----------*/

var readmore = document.querySelectorAll(".readmore");
var txmore = document.querySelectorAll(".txmore");
readmore.forEach(function (element, index) {
  element.onclick = function (e) {
    e.preventDefault();
    txmore[index].classList.toggle("txshow");
  };
});