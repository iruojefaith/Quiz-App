let questions = [
    {
        id : 1,
        question: 'The combination of ____ keys can be used to add double line to selected text are?',
        choices: ['Ctrl + Shift + D', 'Ctrl + Alt + Del', 'Ctrl + Alt + Look ', 'Ctrl + Alt + ESC'],
        correctAnswer: 0
    },
    {
        id : 2,
        question: 'Microsoft Word Application is a ______ program?',
        choices: ['Database ', 'Word processing ', 'Utility ', 'Presentation'],
        correctAnswer: 1
    },
    {
        id : 3,
        question: 'How many bits make a byte?',
        choices: ['2', '4', '6', '8'],
        correctAnswer: 3
    },
    {
        id : 4,
        question: 'The abbreviation, ALU Stands for?',
        choices: ['Arithmetic Log Unit', 'Arithmetic Logic Unit', 'Arithmetic Logging Unit', 'Articulating Logging Unit'],
        correctAnswer: 1
    },
    {
        id : 5,
        question: 'Which of the following is not feature of spreadsheet package?',
        choices: ['Colour palette ', 'Columns', 'formula', 'Rows '],
        correctAnswer: 0
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let quizOver = false;

window.addEventListener('DOMContentLoaded', function(e){
    displayCurrentQuestion();

    let quizMessage = document.querySelector('.quizMessage');

        quizMessage.style.display = 'none';

    document.querySelector('.nextButton').addEventListener('click', function(){

        if(!quizOver){
            let radioBtnsChecked = document.querySelector('input[type=radio]:checked');

            if (radioBtnsChecked === null){
                quizMessage.innerText = 'Please select an answer';
                quizMessage.style.display = 'block';
            } else {
                console.log(radioBtnsChecked.value);
                quizMessage.style.display = 'none';
                if (parseInt(radioBtnsChecked.value) === questions[currentQuestion].correctAnswer){
                    correctAnswers++;
                }

                currentQuestion++;

                if (currentQuestion < questions.length){
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    document.querySelector('.nextButton').innerText = 'Play Again?';
                    quizOver = true;
                 }
                }
        } else {
            quizOver = false;
            document.querySelector('.nextButton').innerText = 'Next Question';
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
});

function displayCurrentQuestion(){
    console.log('In display current Questions');

    let question = questions[currentQuestion].question;
    let questionClass = document.querySelector('.quizContainer > .question');
    let choiceList = document.querySelector('.quizContainer > .choiceList');
    let numChoices = questions[currentQuestion].choices.length;

    //Set the questionClass text to the current question
    questionClass.innerText = question;

    //Remove all current <li> elements (if any)
    choiceList.innerHTML = '';

    let choice;
    for (i = 0; i < numChoices; i++){
        choice = questions[currentQuestion].choices[i];
        let li = document.createElement('li');
            li.innerHTML = '<li><input type="radio" value="' + i + '" name="dynradio" />' + choice + '</li>'
        choiceList.appendChild(li);

    }
}

function resetQuiz(){
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore(){
    document.querySelector('.quizContainer > .result').innerText = 'You scored: ' + correctAnswers + ' out of ' + questions.length;
    document.querySelector('.quizContainer > .result').style.display = 'block';
}

function hideScore(){
    document.querySelector('.result').style.display = 'none';
}