document.addEventListener("DOMContentLoaded", () => {
  const mcqContainer = document.getElementById("mcq-container");
  const shortAnswerContainer = document.getElementById("short-answer-container");
  const longAnswerContainer = document.getElementById("long-answer-container");
  const examDetails = document.getElementById("exam-details");
  const assessmentForm = document.getElementById("assessmentForm");
  let mcqCount = 0; // Counter to keep track of MCQs

  // Start Exam Creation
  window.startExamCreation = function() {
    console.log("Starting exam creation...");
    examDetails.style.display = "none";
    assessmentForm.style.display = "block";
  };

  // Adding MCQs
  document.getElementById("add-mcq").addEventListener("click", () => {
    mcqCount++;
    const mcqForm = document.createElement("div");
    mcqForm.classList.add("question-form");
    mcqForm.innerHTML = `
      <label>கேள்வி:</label>
      <input type="text" class="question" placeholder="பல தேர்வு கேள்வியை உள்ளிடவும்">
      <label>விடை A:</label>
      <input type="text" placeholder="விடை A" name="optionA-${mcqCount}">
      <label>விடை B:</label>
      <input type="text" placeholder="விடை B" name="optionB-${mcqCount}">
      <label>விடை C:</label>
      <input type="text" placeholder="விடை C" name="optionC-${mcqCount}">
      <label>விடை D:</label>
      <input type="text" placeholder="விடை D" name="optionD-${mcqCount}">
      <label>சரியான விடை:</label>
      <select name="correct-answer-${mcqCount}">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
      <button type="button" class="remove-question">நீக்கவும்</button>
    `;
    mcqContainer.appendChild(mcqForm);

    // Event listener for the remove button
    mcqForm.querySelector('.remove-question').addEventListener('click', () => {
      console.log("Removing MCQ form...");
      mcqContainer.removeChild(mcqForm);
    });
  });

  // Adding short answer questions
  document.getElementById("add-short-answer").addEventListener("click", () => {
    const shortAnswerForm = document.createElement("div");
    shortAnswerForm.classList.add("question-form");
    shortAnswerForm.innerHTML = `
      <label>சுருக்கமான பதில் கேள்வி:</label>
      <input type="text" class="question" placeholder="சுருக்கமான பதில் கேள்வியை உள்ளிடவும்">
      <label>பதில்:</label>
      <textarea class="answer" placeholder="பதிலை உள்ளிடவும்"></textarea>
      <button type="button" class="remove-question">நீக்கவும்</button>
    `;
    shortAnswerContainer.appendChild(shortAnswerForm);

    // Event listener for the remove button
    shortAnswerForm.querySelector('.remove-question').addEventListener('click', () => {
      console.log("Removing Short Answer form...");
      shortAnswerContainer.removeChild(shortAnswerForm);
    });
  });

  // Adding long answer questions
  document.getElementById("add-long-answer").addEventListener("click", () => {
    const longAnswerForm = document.createElement("div");
    longAnswerForm.classList.add("question-form");
    longAnswerForm.innerHTML = `
      <label>நீண்ட பதில் கேள்வி:</label>
      <input type="text" class="question" placeholder="நீண்ட பதில் கேள்வியை உள்ளிடவும்">
      <label>பதில்கள்:</label>
      <textarea class="answer" placeholder="பதில்களை உள்ளிடவும்"></textarea>
      <button type="button" class="remove-question">நீக்கவும்</button>
    `;
    longAnswerContainer.appendChild(longAnswerForm);

    // Event listener for the remove button
    longAnswerForm.querySelector('.remove-question').addEventListener('click', () => {
      console.log("Removing Long Answer form...");
      longAnswerContainer.removeChild(longAnswerForm);
    });
  });

  // Submitting the assessment
  window.submitAssessment = function() {
    console.log("Submitting assessment...");
    const mcqQuestions = mcqContainer.querySelectorAll("div.question-form").length;
    const shortAnswerQuestions = shortAnswerContainer.querySelectorAll("div.question-form").length;
    const longAnswerQuestions = longAnswerContainer.querySelectorAll("div.question-form").length;

    if (mcqQuestions === 0 && shortAnswerQuestions === 0 && longAnswerQuestions === 0) {
        showToast("Please add at least one question before submitting!");
        return; // Exit the function if no questions
    }

    const assessmentData = {
        subject: document.getElementById("subject").value,
        totalMarks: document.getElementById("totalMarks").value,
        instructions: document.getElementById("instructions").innerText,
        duration: document.getElementById("duration").value,
        mcqs: [],
        shortAnswers: [],
        longAnswers: [],
    };

    // Collect MCQs
    mcqContainer.querySelectorAll("div.question-form").forEach((mcq) => {
        assessmentData.mcqs.push({
            question: mcq.querySelector(".question").value.trim(),
            options: {
                A: mcq.querySelector('input[placeholder="விடை A"]').value,
                B: mcq.querySelector('input[placeholder="விடை B"]').value,
                C: mcq.querySelector('input[placeholder="விடை C"]').value,
                D: mcq.querySelector('input[placeholder="விடை D"]').value,
            },
            correctAnswer: mcq.querySelector("select").value,
        });
    });

    // Collect short answers
    shortAnswerContainer.querySelectorAll("div.question-form").forEach((shortAnswer) => {
        assessmentData.shortAnswers.push({
            question: shortAnswer.querySelector(".question").value.trim(),
            answer: shortAnswer.querySelector(".answer").value.trim(),
        });
    });

    // Collect long answers
    longAnswerContainer.querySelectorAll("div.question-form").forEach((longAnswer) => {
        assessmentData.longAnswers.push({
            question: longAnswer.querySelector(".question").value.trim(),
            answer: longAnswer.querySelector(".answer").value.trim(),
        });
    });

    console.log(assessmentData);

    localStorage.setItem("assessmentData", JSON.stringify(assessmentData));
    alert("வினா உருவாக்கம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!");

    const duration = document.getElementById("duration").value;
    if (duration) {
        window.location.href = `student_page.html?duration=${duration}`;
    }
};
  

  // Redirect to admin page
  window.redirectToAdminPage = function() {
    window.location.href = "admin.html";
  };
});
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";

  // Hide the toast after 3 seconds
  setTimeout(() => {
      toast.style.display = "none";
  }, 3000);
}
