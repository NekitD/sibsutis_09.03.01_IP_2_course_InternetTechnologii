let num1 = 10;
let str = "Hello";
let log = true;
let zero = null;
let nothing = undefined;
let user = { iq: 0, hp: 1000 };

function mainFunction() {
    let num2 = 5;
    const word = "Fool";
};

function otherFunction() {
    if (num1 == 10) { alert("Переменная num1, определённая в документе - Доступна"); }
    if (str == "Hello") { alert("Переменная str, определённая в документе - Доступна"); }
    if (log == true) { alert("Переменная log, определённая в документе - Доступна"); }
    if (zero == null) { alert("Переменная zero, определённая в документе - Доступна"); }
    if (nothing == undefined) { alert("Переменная nothing, определённая в документе - Доступна"); }
    if (user.hp == 1000) { alert("Переменная user, определённая в документе - Доступна"); }
    if (num2 == 5) { alert("Переменная num2, определённая в функции mainFunction - Доступна"); }
    if (word == "Fool") { alert("Переменная word, определённая в функции mainFunction - Доступна"); }

};


// otherFunction();

alert("type num1: " + typeof num1);
p = " * " + num1 + " * ";
alert("p = '*' + num1 + '*' = " + p);
alert("type p: " + typeof p);

t = "10" / "2";
alert("t = '10'/'2' = " + t);
alert("type t: " + typeof t);

alert("Bool of hello: " + Boolean("Hello"));
alert("Bool of 0: " + Boolean(0));
alert("Bool of '0': " + Boolean("0"));
alert("Bool of nothing: " + Boolean(""));

a = num1;
alert(a + " = " + num1);
alert("a++ = " + a++);
alert("++a = " + ++a);
alert("+a = " + +a);

let count = 0;
let question = "Yes";

while (question == "Yes") {
    question = prompt("Хочешь ещё раз?", "Yes");
    let c = confirm("Точно?");
    if (c == false) {
        question = "Yes";
        continue;
    }
}

let arr = [10];

for (i = 0; i < 10; i++) {
    arr[i] = i;
}

for (i = 0; i < 10; i++) {
    alert(arr[i]);
}

let monthNum = function () {
    let n = Number(prompt("Введите номер месяца: ", 1));
    switch (n) {
        case 1: { alert("Январь"); break; }
        case 2: { alert("Февраль"); break; }
        case 3: { alert("Март"); break; }
        case 4: { alert("Апрель"); break; }
        case 5: { alert("Май"); break; }
        case 6: { alert("Июнь"); break; }
        case 7: { alert("Июль"); break; }
        case 8: { alert("Август"); break; }
        case 9: { alert("Сентябрь"); break; }
        case 10: { alert("Октябрь"); break; }
        case 11: { alert("Ноябрь"); break; }
        case 12: { alert("Декабрь"); break; }
        default: alert("Такого месяца нет.");
    }
};

let f = monthNum;

f();
