(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide d-flex flex-column flex-lg-row">
              <div class="slide__text order-2 order-lg-1 col-12 col-lg-7">
                <div class="question px-4 pt-4 pb-2"> ${currentQuestion.question} </div>
                <div class="answers px-4"> ${answers.join("")} </div>
              </div>
              <div class="slide__file order-1 order-lg-2 col-12 col-lg-5">
                <div class="file"> ${currentQuestion.file} </div>
              </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `Your score is: ${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const fileContainer = document.getElementById('file');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        file: "<div class='q q-1'></div>",
        question: "<h2>What is multi-factor authentication (MFA)?</h2>",
        answers: {
          a: "Using multiple firewalls for added security",
          b: "Encrypting data with multiple algorithms",
          c: "Verifying identity through multiple authentication methods"
        },
        correctAnswer: "c"
      },
      {
        file: "<div class='q q-2'></div>",
        question: "<h2>Which of the following is an example of a strong password?</h2>",
        answers: {
          a: "123456",
          b: "P@55w0rd!",
          c: "qwerty"
        },
        correctAnswer: "b"
      },
      {
        file: " <video width='100%' height='100%' controls><source src='/video/phishing.mp4' type='video/mp4'>Your browser does not support the video tag.</video> ",
        question: "<h2>Whatch the video and ask the question, which of the following is a common method used in phishing attacks?</h2>",
        answers: {
          a: "Sending malicious attachments",
          b: "Distributing antivirus software",
          c: "Encrypting sensitive data"
        },
        correctAnswer: "a"
      }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  