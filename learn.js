const allquestions = {
    easy: [
        { question: "What is known as FIFO in DSA?", options: ["queue", "stack", "tree", "graph"], answer: "queue" },
        { question: "Which data structure is best suited for recursion?", options: ["queue", "stack", "array", "linked list"], answer: "stack" },
        { question: "What is the best case time complexity of binary search?", options: ["O(1)", "O(logn)", "O(n)", "O(nlogn)"], answer: "O(1)" }
    ],
    moderate: [
        { question: "Which of the following is not a linear data structure?", options: ["Array", "Linked List", "Stack", "Graph"], answer: "Graph" },
        { question:"which traversal gives sorted order of elements in a binary search tree?", options: ["Pre-order", "In-order", "Post-order", "Level-order"], answer: "In-order" },
        { question:"what is the time complexity of inserting an element in a stack ?", options: ["O(1)", "O(logn)", "O(n)", "O(nlogn)"], answer: "O(1)" }
    ],
    hard: [
        { question: "What is the worst-case time complexity of merge sort?", options: ["O(nlogn)", "O(n^2)", "O(logn)", "O(n)"], answer: "O(nlogn)" },
        { question: "In hashing, collision occurs when?", options: ["Two keys hash to the same index", "A key is not found in the hash table", "The hash table is full", "None of the above"], answer: "Two keys hash to the same index" }
    ]
};

let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let selectedDifficulty = "";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timeEl = document.getElementById("time");
const resultBox = document.getElementById("result");
const quizUI = document.getElementById("quiz-ui");
const selectionBox = document.getElementById("selection-box");

// 2. Audio names matching your sidebar
const correctSound = new Audio('right.mp3.mp3'); 
const wrongSound = new Audio('wrong.mp3.mp3');

function stopsounds() {
    correctSound.pause(); correctSound.currentTime = 0;
    wrongSound.pause(); wrongSound.currentTime = 0;
}

function startTimer() {
    clearInterval(timer);
    timeEl.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            moveToNext();
        }
    }, 1000);
}

function startQuiz(difficulty) {
    selectedDifficulty = difficulty;
    selectionBox.classList.add('hide');
    quizUI.classList.remove('hide');
    
    questions = allquestions[difficulty];
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    stopsounds();
    if (selectedDifficulty === "easy") timeLeft = 15;
    else if (selectedDifficulty === "moderate") timeLeft = 10;
    else timeLeft = 5;

    startTimer();

    let q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option, btn);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    clearInterval(timer);
    let correctAnswer = questions[currentQuestion].answer;
    const allBtns = document.querySelectorAll(".option-btn");
    
    allBtns.forEach(b => b.disabled = true);

    if (selected === correctAnswer) {
        score++;
        btn.classList.add("correct");
        correctSound.play();
    } else {
        btn.classList.add("wrong");
        wrongSound.play();
        allBtns.forEach(b => {
            if (b.textContent === correctAnswer) b.classList.add("correct");
        });
    }
    nextBtn.style.display = "block";
}

nextBtn.onclick = moveToNext;

function moveToNext() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizUI.classList.add("hide");
    resultBox.classList.remove("hide");
    resultBox.innerHTML = `<h2>Quiz Done! Score: ${score}/${questions.length}</h2>
                           <button onclick="location.reload()">Restart</button>`;
}