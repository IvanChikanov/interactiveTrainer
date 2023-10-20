var questions = new Map([

    [1, { 
        generalText: ["",""], 
        type: "radio", 
        questions:
            [ {
			text: "Реши неравенство $3^{x}>-30$. Выбери верный ответ.", 
            answers: [{text: "нет решения", result: false},{text: "$x$ &mdash; любое число", result: true},{text: "$(0;1)$", result: false}],
            solution: "Верный ответ: $x$ &mdash; любое число."
            },  
            {
            text: "Реши неравенство $-3^{x}>5 \\cdot 7^{x}$. Укажи верный ответ.", 
            answers: [{text: "$x$ &mdash; любое число", result: false},{text: "нет решения", result: true},{text: "$(–1;2\\rbrack$", result: false}],
            solution: "Верный ответ: нет решения."
            }, 
            {
            text: "Реши неравенство $3^{x+3}+3^{x+4}-3^{x+5}>7^{x+3}+7^{x+4}$. Укажи верный ответ.", 
            answers: [{text: "$x$ &mdash; любое число", result: false},{text: "$\\lbrack–2;2\\rbrack$", result: false},{text: "нет решения", result: true}],
            solution: "Верный ответ: нет решения."
            }]
        }],
		[2, { 
        generalText: ["",""], 
        type: "radio", 
        questions:
            [ {
                text: "Умножь обе части неравенства на (–1): $-5^{2 x}>7$. Укажи верный ответ.", 
               answers: [{text: "$5^{2 x}>-7$", result: false},{text: "$5^{2 x}<-7$", result: true},{text: "$5^{2 x}<7$", result: false}],
            solution: "Верный ответ: $5^{2 x}<-7$."
            },  
            {
            text: "Реши неравенство  $3 x-5 x^{2}+2>0$. Укажи верный ответ.", 
            answers: [{text: "$(–0,4;1)$", result: true},{text: "$(0,4;1)$", result: false},{text: "$(-1;-0,4)$", result: false}],
            solution: "Верный ответ: $(–0,4;1)$."
            }, 
            {
            text: "Реши неравенство $3 \\cdot 5^{x}-5 \\cdot 25^{x}+2>0$. Укажи верный ответ.", 
            answers: [{text: "$(0;+\\infty)$", result: false},{text: "$(-\\infty ; 0]$", result: false},{text: "$(-\\infty;0)$", result: true}],
            solution: "Верный ответ: $(-\\infty;0)$."
            }]
        }],
		[3, { 
        generalText: ["",""], 
        type: "radio", 
        questions:
            [ {
                text: "Реши неравенство методом интервалов: $\\frac{x-5}{x+3}<5$. Укажи верный ответ.", 
               answers: [{text: "$(-\\infty ; -5)$", result: false},{text: "$(-\\infty ;-5) \\cup(-3 ;+\\infty)$", result: true},{text: "$(-3;+\\infty)$", result: false}],
            solution: "Верный  ответ: $(-\\infty ;-5) \\cup(-3 ;+\\infty)$."
            },  
            {
            text: "Реши неравенство $\\frac{2 \\cdot 2^{x}-2^{x}}{32-2^{x}} \\leq 0$ выполнив замену $2^x=t$. ", 
            answers: [{text: "$(-5;5)$", result: false},{text: "(-\\infty ; 5)$", result: false},{text: "$(5;+\\infty)$", result: true}],
            solution: "Верный ответ: $(5;+\\infty)$."
            }, 
            {
            text: "	Реши неравенство $\frac{729-9^{-x-1}}{243-3^{-x}}>3$. Укажи верный ответ.", 
            answers: [{text: "$(-1;5)$", result: false},{text: "$(–5; 1)$", result: true},{text: "$(–5;–1)$", result: false}],
            solution: "Верный ответ: $(–5; 1)$."
            }]
        }],
		
   
    ]);
    var clrs = new Map([["green", {picture: "green", rgb: "#46B755", gradient: "linear-gradient(0.25turn, #B0E881, #46B755)",secondRgb : "#2B8217", background: "#EFFAE6"}],["blue", {picture: "blue", rgb: "#3F8CFF", gradient: "linear-gradient(0.25turn, #3F8CFF, #61B9A9)", secondRgb : "#0C6ED6", background: "#E7F2FE"}],["orange", {picture: "orange", rgb: "#FF9432", gradient: "linear-gradient(0.25turn, #FF9432, #FFB546)", secondRgb : "#FF790B", background: "#FFF3E2"}], ["old", {picture: "green", rgb: "#5AB52F", gradient: "linear-gradient(0.25turn, #5AB52F, #5AB52F)",secondRgb : "#2B8217", background: "#EFFAE6"}]]);

/*
Тип задания "выбор одного элемента";
generalText: "Реши задачи, используя геометрический способ нахождения вероятности. Ответы записывай десятичной дробью, используя запятую.", 
        type: "radio", 
        questions:
            [{
            text: "Вариация среднего вопроса 1", 
            answers: [{text: "1", result: true},{text: "2", result: false},{text: "3", result: false}],
            solution: "Верный 1"
            }, 
            {
            text: "Вариация среднего вопроса 2", 
            answers: [{text: "1", result: false},{text: "2", result: true},{text: "3", result: false}],
            solution: "Верный 2"
            }, 
            {
            text: "Вариация среднего вопроса 3", 
            answers: [{text: "1", result: false},{text: "2", result: false},{text: "3", result: true}],
            solution: "Верный 3"
            }]
        }], */

/*
Тип задания "ввод краткого ответа";
generalText: ["Реши задачи, используя геометрический способ нахождения вероятности.","Ответы записывай десятичной дробью, используя запятую."], 
        type: "input", 
        questions:
            [
            {
                text: "Вопрос 123", 
                answers: ["Верно", "СеКрЕт"],
                solution: "Верно или секрет"
            }, 
            {
                text: "Вопрос 123", 
                answers: ["Верно"],
                solution: "Верно"
            }, 
            {
                text: "Вопрос 123", 
                answers: ["Верно"],
                solution: "Верно"
            }
            ]
*/