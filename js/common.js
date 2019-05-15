
//Переводит id в координату X,Y
function StrIdToXY(input){

    let output={
        x: 8 - ((input) % 8),
        y: 8 - Math.floor((input) / 8),
    };
    return output;
}

//Переводит координату X,Y в id
function XYToStrId(input){
    let output = ((8 - input.y) * 8) + (8 - input.x) - 1;
    return output;
}

//Поиск всех возможных ходов
//input - изначальная позиция фигуры(шахматного коня), состоит из строки длиной в два символа.
function findPossibleSteps(input){

    //Позиция коня на шахматной доске
    const position = StrIdToXY(input);

    //Содержит все возможные ходы шахматного коня
    const steps = 
    {
        x: [ -1,  1,  2, 2, 1, -1, -2, -2 ],
        y: [ -2, -2, -1, 1, 2,  2, -1,  1 ]
    }

    let output = '';
    
    //Проверяем все возможные ходы.
    for(let i = 0; i < 8; i++)
    {
        //Ищем шаги, которорые не выходят за пределы шахматной доски
        let newX = position.x + steps.x[i];
        let newY = position.y + steps.y[i];
        if( newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8)
        {
            output += XYToStrId({x:newX, y:newY}) + ';';
        }     
    }

    //Удаляем последний ненужный символ. Котрый ';' и сразу же отправляем на вывод.
    return output.slice(0, output.length - 1);
}


//Объект шахматная доска.   
const chessBoard = new Vue({
    el: '#chess-board',
    data: {

        //Индефикатор выбранной клетки.
        selectCell: null,
    },
    methods:{
       
        cellClick(cellId){
            //Освобождаемся от объекта, чтобы иметь прямой id
            cellId = cellId.i;
            
            //Клик по той же самой клетке очистит всю доску
            if(cellId === this.selectCell)
            {
                this.selectCell = null;
                for (let i = 0; i < 64; i++){
                    this.$refs[i+1][0].style["backgroundColor"] = ""
                } 
                return;
            }
            
            //Записываем id клетки на которую кликнули
            this.selectCell = cellId; 

            //Чистим поле от закрашеных клеток
            for (let i = 0; i < 64; i++){
                this.$refs[i + 1][0].style["backgroundColor"] = "";
            }            
            
            //Окрашиваем клетку на которую кликнули
            this.$refs[cellId][0].style["backgroundColor"] = "blue";   
            
            //Плучаем просчитанные ходы от выбранной клетки
            let steps = findPossibleSteps(cellId - 1).split(';');

            //Расставляем полученные просчитанные ходы на поле
            for (item of steps){   
                this.$refs[+item + 2][0].style["backgroundColor"] = "green";
            }

        },        
    }
});