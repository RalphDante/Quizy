import {
    questions
  } from "./PE.js";
  
  const resetFlashCards =  document.querySelector("#physicalResetButton")
  const correctScore = document.getElementById("correctScore");
  const wrongScore = document.getElementById("wrongScore");
  const goBackBtn = document.querySelector("#physicalGoBackButton");
  const totalQuestions = questions.length;
  const progressNumber = document.querySelector("#progressNumber");
  const flashCard = document.querySelector(".flashCard");
  const checkBtn = document.querySelector("#checkButton");
  const wrongBtn = document.querySelector("#physicalWrongButton");
  let myQuestion = document.querySelector("#myQuestion");
  
  // Shuffle the questions array
  shuffleArray(questions);
  
  let currentIndex = 0;
  let correctAnswer = [];
  let wrongAnswer = [];
  
  updateQuestion();
  
  checkBtn.addEventListener("click", () => {
    checkAnswer(true);
  });
  
  wrongBtn.addEventListener("click", () => {
    checkAnswer(false);
  });
  
  flashCard.addEventListener("click", () => {
    flipCard();
  });
  
  goBackBtn.addEventListener("click", () => {
    goBack();
  });
  

  resetFlashCards.addEventListener("click", () => {
    resetScores();
    shuffleArray(questions);
    currentIndex = 0;
    updateQuestion();
  })


  function shuffleArray(array){
    for(let i = array.length-1; i > 0; --i){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
  }
  
  function updateQuestion() {
    if (currentIndex < totalQuestions) {
      const [question, answer] = questions[currentIndex];
      myQuestion.innerHTML = question;
      progressNumber.innerHTML = `${currentIndex + 1}/${totalQuestions}`;
    } else {
      finishQuiz();
    }
  }
  
  function checkAnswer(isCorrect) {
    if (currentIndex < totalQuestions) {
      const [question, answer] = questions[currentIndex];
      if (isCorrect) {
        correctAnswer.push([question, answer]);
        correctScore.innerHTML = `Correct: ${correctAnswer.length}`;
      } else {
        wrongAnswer.push([question, answer]);
        wrongScore.innerHTML = `Wrong: ${wrongAnswer.length}`;
      }
      currentIndex++;
      updateQuestion();
    }
  }
  
  function flipCard() {
    if (currentIndex < totalQuestions) {
      const [question, answer] = questions[currentIndex];
      myQuestion.innerHTML = myQuestion.innerHTML === question ? answer : question;
    }
  }
  
  function goBack() {
    if (currentIndex > 0) {
      currentIndex--;
  
      // Remove the answer from the respective list
      const [question, answer] = questions[currentIndex];
      const answerIndex = correctAnswer.findIndex(([q, a]) => q === question && a === answer);
      if (answerIndex !== -1) {
        correctAnswer.splice(answerIndex, 1);
        correctScore.innerHTML = `Correct: ${correctAnswer.length}`;
      } else {
        const wrongIndex = wrongAnswer.findIndex(([q, a]) => q === question && a === answer);
        if (wrongIndex !== -1) {
          wrongAnswer.splice(wrongIndex, 1);
          wrongScore.innerHTML = `Wrong: ${wrongAnswer.length}`;
        }
      }
  
      updateQuestion();
    }
  }
  
  function resetScores() {
    correctAnswer = [];
    wrongAnswer = [];
    correctScore.innerHTML = `Correct: ${correctAnswer.length}`;
    wrongScore.innerHTML = `Wrong: ${wrongAnswer.length}`;
  }
  
  function finishQuiz() {
    myQuestion.textContent = `Congrats! You answered ${correctAnswer.length} questions.`;
  }
  
  console.log(questions);
  console.log(questions.length);
  console.log(questions[currentIndex]);
  