let input = '';
let output = '';

//список всех вводимых чисел для проверки
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

const out1 = document.querySelector('.input-field');
const out2 = document.querySelector('.output-field');

//очистка экрана
function clearAll () {
    input = '';
    output = '';
    finish = false;
    out1.textContent = 0;
    out2.textContent = 0;
}

document.querySelector('.clear').onclick = clearAll;

//функционал кнопок
document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('Clear')) return;

    //считывание систем счисления
    const base1 = document.getElementById("syst1");
    const base2 = document.getElementById("syst2");
    let selected1 = base1.options[base1.selectedIndex].value;
    let selected2 = base2.options[base2.selectedIndex].value;

    const key = event.target.textContent;

    //запись числа в экран
    if (digit.includes(key)) {
        input += key;
        console.log(input);
        out1.textContent = input;
    }

    //функционал кнопки '='
    if (key === '=') {
        const result = parseInt(input, selected1);
        out2.textContent = result.toString(selected2);
    }

    //функционал кнопки 'del'
    if (key === 'del') {
        input = input.substring(0, input.length -1);
        out1.textContent = input;
    }

    
}