let quizData = [
    {
        question: "1. Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "2. What will `typeof null` return?",
        options: ["null", "undefined", "object", "number"],
        correctAnswer: "object"
    },
    {
        question: "3. How do you write a single-line comment in JavaScript?",
        options: ["// This is a comment", "/* This is a comment */", "# This is a comment", "-- This is a comment"],
        correctAnswer: "// This is a comment"
    },
    {
        question: "4. Which method removes the last element from an array?",
        options: ["pop()", "shift()", "splice()", "removeLast()"],
        correctAnswer: "pop()"
    },
    {
        question: "5. What is the output of `console.log(2 + '2')`?",
        options: ["4", "22", "Error", "undefined"],
        correctAnswer: "22"
    },
    {
        question: "6. Which function is used to parse a string into an integer?",
        options: ["parseInt()", "parseFloat()", "Number()", "String()"],
        correctAnswer: "parseInt()"
    },
    {
        question: "7. What is the purpose of `localStorage` in JavaScript?",
        options: ["To store data temporarily", "To store data permanently in the browser", "To store data on the server", "To store cookies"],
        correctAnswer: "To store data permanently in the browser"
    },
    {
        question: "8. Which event is triggered when an HTML element is clicked?",
        options: ["onhover", "onmouseover", "onclick", "onchange"],
        correctAnswer: "onclick"
    },
    {
        question: "9. Which keyword is used to define a function in JavaScript?",
        options: ["func", "function", "def", "fn"],
        correctAnswer: "function"
    },
    {
        question: "10. What does `NaN` stand for in JavaScript?",
        options: ["Not a Number", "Negative and Null", "New Array Notation", "None of the above"],
        correctAnswer: "Not a Number"
    },
    {
        question: "11. How do you declare an arrow function in JavaScript?",
        options: ["function myFunc() {}", "const myFunc = () => {}", "myFunc: function() {}", "None of the above"],
        correctAnswer: "const myFunc = () => {}"
    },
    {
        question: "12. Which method is used to add a new element to an array?",
        options: ["push()", "add()", "append()", "insert()"],
        correctAnswer: "push()"
    },
    {
        question: "13. What does the `map()` function do in JavaScript?",
        options: ["Modifies each element in an array and returns a new array", "Loops through an array without modifying it", "Removes elements from an array", "None of the above"],
        correctAnswer: "Modifies each element in an array and returns a new array"
    },
    {
        question: "14. What will `Boolean('false')` return?",
        options: ["false", "true", "undefined", "null"],
        correctAnswer: "true"
    },
    {
        question: "15. Which JavaScript method converts a JSON string into an object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.convert()"],
        correctAnswer: "JSON.parse()"
    },
    {
        question: "16. What does `setTimeout()` do in JavaScript?",
        options: ["Runs a function immediately", "Runs a function after a specified time", "Runs a function continuously", "Stops a function"],
        correctAnswer: "Runs a function after a specified time"
    },
    {
        question: "17. What will `console.log([] == false)` return?",
        options: ["true", "false", "undefined", "Error"],
        correctAnswer: "true"
    },
    {
        question: "18. What is the default value of `this` inside a regular function?",
        options: ["Window", "Undefined", "Null", "The function itself"],
        correctAnswer: "Window"
    },
    {
        question: "19. Which operator is used to check both value and type in JavaScript?",
        options: ["==", "===", "!=", "<>"],
        correctAnswer: "==="
    },
    {
        question: "20. What is the purpose of the `async` keyword in JavaScript?",
        options: ["To make a function execute asynchronously", "To pause the function", "To handle exceptions", "To delay execution"],
        correctAnswer: "To make a function execute asynchronously"
    }
];

let corrCount = 0;
let score = document.querySelector(".score");
function renderQuestion(index) {
    let existingForm = document.getElementById('quiz-form');
    if(existingForm) {
        existingForm.remove();
    }

    let body = document.body;
    let quizForm = document.createElement("form");
    quizForm.id = "quiz-form";

    let CorrAns = quizData[index].correctAnswer;

    let question = document.createElement("p");
    question.innerHTML = quizData[index].question;
    question.classList.add("question");
  
//timer
let timer = document.createElement("p");
timer.classList.add("timer");

// Initial countdown value
let countDown = 30;
let remainingTime = localStorage.getItem('remainingTime') 
                    ? parseInt(localStorage.getItem('remainingTime'))
                    : countDown;

let intervalID = null;

function startTimer() {
    if (intervalID) return; 

    intervalID = setInterval(() => {
        if (remainingTime <= 0) {  
            clearInterval(intervalID);
            intervalID = null; 
            localStorage.removeItem('remainingTime');
            alert("Time's up! Let's move to the next question.");
            renderQuestion(index + 1);
            return; 
        }

        
        timer.innerHTML = `00:00:${remainingTime < 10 ? '0' : ''}${remainingTime}s`;
        localStorage.setItem('remainingTime', remainingTime);

        if (remainingTime <= 5) {
            timer.style.color = "red";
        }

        remainingTime--; 
    }, 1000);
}

startTimer();


        //pause
        let pauseBtn = document.createElement("button"); 
        pauseBtn.type = "button";
        pauseBtn.classList.add("pauseBtn");
        pauseBtn.textContent = "Pause";
        let isPause = false;
    
        pauseBtn.addEventListener('click', function(event){
            event.preventDefault();

            if(isPause){
                pauseBtn.textContent = "Pause";
                startTimer();
                isPause = false;
            }else {
                clearInterval(intervalID);
                pauseBtn.textContent = "Resume"
                isPause = true;
            }
        });

    //options
    let optionsList = document.createElement("ul");
    optionsList.classList.add("options");
    
    quizData[index].options.forEach(option => {
    let listItem = document.createElement("li");
    let radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "answer";
    radioInput.value = option;



    listItem.appendChild(radioInput);
    listItem.appendChild(document.createTextNode(` ${option}`));
    optionsList.appendChild(listItem);

    });
    
    //submit button
    let submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.id = "submitButton";
    submitButton.textContent = "Submit";
    submitButton.value = "submit";

    //progress bar
   let progressBar = document.getElementById("progress-bar");
    if(!progressBar){
        progressBar =  document.createElement("input");
        progressBar.type = "range";
        progressBar.defaultValue = "0";
        progressBar.min = "0";
        progressBar.max = quizData.length-1;
        progressBar.value = index ;
        progressBar.classList.add("progress-bar");    
    }
 
    // restart
    let reStartBtn = document.createElement("button"); 
    reStartBtn.type = "button";
    reStartBtn.classList.add("reStartBtn");
    reStartBtn.textContent = "Restart";

    reStartBtn.addEventListener("click", function(event){
        event.preventDefault();
        let ifRestart = confirm(`Do you want to restart the Quiz?`);
        if(ifRestart){
            corrCount = 0;
            if(intervalID){
                clearInterval(intervalID);
            } 
            renderQuestion(0);
        }
    });

    quizForm.appendChild(timer);
    quizForm.appendChild(question);
    quizForm.appendChild(optionsList);
    quizForm.appendChild(submitButton);
    quizForm.appendChild(progressBar);
    quizForm.appendChild(pauseBtn);
    quizForm.appendChild(reStartBtn);
    body.appendChild(quizForm);

    //eventlistener for next question
    submitButton.addEventListener('click', function(event){ 
        event.preventDefault();
        let selectedOption = document.querySelector('input[type="radio"]:checked'); //getting the selected option
         

        if(selectedOption && selectedOption.value == CorrAns){
            corrCount++;
            localStorage.setItem('quizScore',corrCount);

            body.style.background = "green";
            setTimeout(()=>{
                body.style.background = "";
                if(index >= quizData.length - 1 ){
                    window.location.href = "quiz-end.html";
                     
                } else {
                    progressBar.value = ((index + 1) / quizData.length)* 100;
                    clearInterval(intervalID);
                    renderQuestion(index + 1);
                }
            },400);
             
        } else if(!selectedOption) {
            alert(`Please select an answer before submitting.`);
            return
        } else {
            alert(`Worng answer!`);
            body.style.background = "red";
            setTimeout(()=>{
                body.style.background = "";
                if(index >= quizData.length - 1 ){
                    window.location.href = "quiz-end.html";
                     
                } else {
                    progressBar.value = ((index + 1) /quizData.length)* 100;
                    clearInterval(intervalID);
                    renderQuestion(index + 1);
                }
            },400);  
        }   
    });                     
}


renderQuestion(0);
 