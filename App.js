class App
{
    static #textClisches = new Map([[true, "Все верно!<br><span style='font-size:1.3rem; font-weight: 500;'>Переходи на следующий уровень.</span>"],[false, "Ответ неверный. Попробуй еще раз."]]);
    static #stepArea;
    static #descArea;
    static #textArea;
    static #fText;
    static #answerBlock;
    static #button;
    static #activeStep;
    static #activeQuest;
    static #data;
    static #levelSize;
    static #levelQuestionsSize;
    static init (data) {
        App.#data = data;
        App.#levelSize = data.size;
        App.#stepArea = document.getElementById("step");
        App.#descArea = document.getElementById("generalDescription");
        App.#fText = document.getElementById("fText");
        App.#textArea = document.getElementById("text");
        App.#answerBlock = document.getElementById("input");
        App.#button = document.getElementById("button");
        App.#activeStep = 1;
        App.LoadStep();
    }
    static LoadStep()
    {
        let step = App.#data.get(App.#activeStep);
        App.#levelQuestionsSize = App.#data.get(App.#activeStep).questions.length;
        App.#stepArea.innerText = `Уровень сложности ${App.#activeStep}`;
        App.#fText.innerHTML = step.generalText[0];
        console.log(step.generalText[0].replace(/\\/g, "\\\\"));
        App.#descArea.innerHTML = step.generalText[1];
        App.#activeQuest = 0;
        App.LoadQuestion();
    }
    static LoadQuestion()
    {
        App.#answerBlock.innerHTML = "";
        let qArr = App.#data.get(App.#activeStep).questions;
        App.#textArea.innerHTML = qArr[App.#activeQuest].text;
        MathJax.typeset([App.#textArea, App.#fText, App.#descArea]);
//
        App.SwitchAnswer(qArr);
    }
    static SwitchAnswer(quests)
    {
        switch(App.#data.get(App.#activeStep).type)
        {
            case "radio":
                for(let answer of quests[App.#activeQuest].answers)
                {
                    let div = document.createElement("DIV");
                    div.classList.add("variant");
                    div.style.padding = "3px";
                    div.style.display = "flex";
                    div.style.alignItems = "center";
                    div.dataset.inside = answer.text;
                    div.appendChild(App.CreateDot());
                    let text = document.createElement("SPAN");
                    text.innerHTML = answer.text;
                    div.appendChild(text);
                    div.onclick = ()=>{
                        for(let wd of document.querySelectorAll(".whiteDot"))
                        {
                            wd.parentNode.removeChild(wd);
                        }
                        if(div.querySelector("DIV").childNodes.length == 0)
                        {
                            div.querySelector("DIV").appendChild(this.CreateWhiteDot());
                        }
                        else
                        {
                            div.querySelector("DIV").innerHTML = "";
                        }
                    };
                    App.#answerBlock.appendChild(div);
                    App.#button.onclick = ()=>
                    {
                        let res = false;
                        for(let variant of document.querySelectorAll(".variant"))
                        {
                            if(variant.querySelector(".whiteDot"))
                            {
                                let answer = variant.dataset.inside;//variant.querySelector("SPAN").innerHTML;
                                for(let result of quests[App.#activeQuest].answers)
                                {
                                    if(result.result)
                                    {
                                        if(answer == result.text)
                                        {
                                            res = true;
                                        }
                                    }
                                }
                            }
                        }
                        this.CreatePopup(res, quests[App.#activeQuest].solution);
                    }
                }
                MathJax.typeset([App.#answerBlock]);
                for(let mj of document.querySelectorAll("mjx-container"))
                {
                    mj.style.display = "inline";
                }
                break;
            case "input":
                let input = document.createElement("INPUT");
                input.style = `padding: 8px; min-width: 300px; border:1px solid ${colors.rgb};border-radius:.4rem; font-size: 1rem; font-weight: 400;`;
                input.type = "text";
                App.#answerBlock.appendChild(input);
                App.#button.onclick = ()=>{
                    let res = false;
                    for(let answer of quests[App.#activeQuest].answers)
                    {
                        if(answer.toLowerCase() === input.value.toLowerCase())
                        {
                            res = true;
                            break;
                        }
                    }
                    this.CreatePopup(res, quests[App.#activeQuest].solution);
                };
                break;
        }
    }
    static CreateDot()
    {
        let dot = document.createElement("DIV");
        dot.style = `width: 1.6vw; height: 1.6vw; background: white; border: 1px solid ${colors.rgb}; border-radius: 50%;margin-right: 5px;display: flex; align-items: center; justify-content:center; max-width: 35px; max-height: 35px;`;
        return dot;
    }
    static CreateWhiteDot()
    {
        let dot = document.createElement("DIV");
        dot.classList.add("whiteDot");
        dot.style = `width: .7vw; height: .7vw; background: ${colors.rgb}; border-radius: 50%; max-width: 16px; max-height: 16px;`;
        return dot;
    }
    static CreatePopup(text, sol)
    {
        let backDiv = document.createElement("div");
        backDiv.style = "position:fixed; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 100; left:0; top:0; display:flex; align-items: center; justify-content: center; flex-direction:column;";
        document.body.appendChild(backDiv);
        let fatherWindow = document.createElement("div");
        fatherWindow.classList.add("fatherWindow");
        fatherWindow.style = "display:flex; background: white; width: 60%; height: 30%; max-height: 400px; max-width: 1150px; border-radius: .4rem;padding-top: 10px; padding-right: 10px;justify-content:space-around;";
        let boy = document.createElement("img");
        boy.src = `media/${text?"good":"bad"}${old?"Old":"Boy"}.svg`;
        let window = document.createElement("div");
        window.style = "display: flex; padding: 20px; justify-content: center; flex-direction: column;";
        fatherWindow.appendChild(window);
        backDiv.appendChild(fatherWindow);
        let textQ = document.createElement("p");
        textQ.innerHTML = `<h3 style='padding:0; font-size: 1.3rem; font-weight: 500;'>${App.#textClisches.get(text)}</h3>`;
        if(App.#activeStep == App.#levelSize && text)
        {
            let nexter = textQ.firstChild.querySelector("span");
            textQ.firstChild.removeChild(nexter);
        }
        let control = document.createElement("div");
        control.style = "width: 100%;display:grid;grid-template-columns:3fr 1fr;gap: 10px;";//display:flex;justify-content: space-between;
        window.appendChild(textQ);
        window.appendChild(control);
        let s = document.createElement("div");
        let solution = document.createElement("button");
        if(sol.length > 0)
        {
            solution.innerText = "Объяснение решения";
            solution.classList.add("solution");
            s.style = `font-size: 1rem; font-weight: 400; background: ${colors.background}; border-radius: .4rem; margin-top: 15px;`;
            solution.onclick = ()=>
            {
                solution.style.background = colors.background;
                let innerT = document.createElement("P");
                innerT.style = "padding: 18px; font-weight:400;";
                innerT.innerHTML = sol;
                s.className = "hideSol";
                s.appendChild(innerT);
                s.style.width = fatherWindow.clientWidth + "px";
                backDiv.appendChild(s);
                MathJax.typeset([innerT]);
                for(let mj of document.querySelectorAll("mjx-container"))
                {
                    mj.style.display = "inline";
                }
                setTimeout(()=>{s.className = "openSol";}, 100);
                solution.onclick = null;
                solution.style.opacity = "20%";
            };
            control.appendChild(solution);
        }
        else
        {
            control.style.gridTemplateColumns = "1fr 3fr";
        }
        let next = document.createElement("button");
        next.classList.add("nextButton");
        if(this.#activeStep >= App.#levelSize && text)
        {
            next.innerText = "Завершить";
        }
        else
        {
            next.innerText = "Продолжить";
        }
        control.appendChild(next);
        next.onclick = ()=>{
            if(text)
            {
                App.#activeStep++;
                if(App.#activeStep <= App.#levelSize)
                {
                    App.LoadStep();
                    document.body.removeChild(backDiv);
                }
                else
                {
                    if(backDiv.childNodes.length > 1)
                    {
                        backDiv.removeChild(s);
                    }
                    fatherWindow.style.paddingTop = "0";
                    fatherWindow.style.paddingBottom = "4px";
                    fatherWindow.style.paddingInline = "10px";
                    fatherWindow.style.justifyContent = "center";
                    fatherWindow.style.alignItems = "center";
                    let mobile = document.documentElement.clientHeight > document.documentElement.clientWidth? false:true;
                    let medal = document.createElement("img");
                    medal.src = `media/medals/${colors.picture}.svg`;
                    fatherWindow.innerHTML = 
                    `<div><h2 style = 'padding-left: 2vw;color:${colors.rgb}; font-size: ${mobile?"1.5rem":"2.5rem"}; font-weight: 500; margin-block: 5px;'>Поздравляем!</h2>
                    <h3 style = 'padding-left: 2vw;font-size: ${mobile?"1.3rem":"2rem"};font-weight: 500; margin-block: 5px;'>Ты прошел все уровни сложности!</h3>
                    </div>`; 
                    medal.height = fatherWindow.clientHeight - 4;
                    medal.style.marginInline = "5vw";
                    fatherWindow.appendChild(medal);
                }
            }
            else
            {
                App.#activeQuest++;
                if(App.#activeQuest > App.#levelQuestionsSize - 1)
                {
                    App.#activeQuest = 0;
                }
                App.LoadQuestion();
                document.body.removeChild(backDiv);
            }

        };
        if(document.documentElement.clientHeight > document.documentElement.clientWidth)
        {
            fatherWindow.style.width = "90%";
            fatherWindow.style.height = "20%";  
            window.style.maxWidth = "65%";
            solution.style.fontSize = "1.4rem";
            next.style.fontSize = "1.4rem";
            s.style.fontSize = "1.6rem";
            textQ.firstChild.style.fontSize = "1.8rem";
            boy.style.maxWidth = "30%";
        }
        fatherWindow.style.height = Math.round(fatherWindow.clientHeight) + "px";
        if(old)
        {
            fatherWindow.style.paddingTop = "0";
        }
        else
        {
            boy.height = fatherWindow.clientHeight - 10;
        }
        fatherWindow.appendChild(boy);
    }
    static Jax(HTML_element)
    {
        let maths = HTML_element.querySelectorAll(".tex");
        for(let m of maths)
        {
            let span = document.createElement("SPAN");
            span.classList.add("tex");
            span.innerHTML = m.innerHTML;
            HTML_element.replaceChild(span, m);
        }
    }
}