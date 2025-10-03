document.addEventListener("DOMContentLoaded", () => {
  const publishContainer = document.getElementById("publish-container");
  const assessmentData = JSON.parse(localStorage.getItem("assessmentData"));

  if (!assessmentData) {
    publishContainer.innerHTML = "<p>தற்போது எந்தவொரு கேள்விகளும் இல்லை.</p>";
    return;
  }

  // Display Exam Details
  const examDetails = document.createElement("div");
  examDetails.innerHTML = `
        <h2>தேர்வு விவரங்கள்</h2>
        <p><strong>பாடம்:</strong> ${assessmentData.subject}</p>
        <p><strong>மொத்த மதிப்பெண்கள்:</strong> ${assessmentData.totalMarks}</p>
        <p><strong>குறிப்புகள்:</strong> ${assessmentData.instructions}</p>
        <p><strong>தேர்வு நேரம்:</strong> ${assessmentData.duration} நிமிடங்கள்</p>
    `;
  publishContainer.appendChild(examDetails);

  // Display MCQs
  if (assessmentData.mcqs.length > 0) {
    const mcqSection = document.createElement("div");
    mcqSection.innerHTML = "<h2>பல தேர்வு கேள்விகள்</h2>";
    assessmentData.mcqs.forEach((mcq, index) => {
      const mcqElement = document.createElement("div");
      mcqElement.innerHTML = `
                <p>${index + 1}. ${mcq.question}</p>
                <ul>
                    <li>A: ${mcq.options.A}</li>
                    <li>B: ${mcq.options.B}</li>
                    <li>C: ${mcq.options.C}</li>
                    <li>D: ${mcq.options.D}</li>
                </ul>
                <p><strong>சரியான விடை:</strong> ${mcq.correctAnswer}</p>
                <button class="corr-b" onclick="editQuestion(${index}, 'mcq')">திருத்தம்</button>
            `;
      mcqSection.appendChild(mcqElement);
    });
    publishContainer.appendChild(mcqSection);
  }

  // Display Short Answer Questions
  if (assessmentData.shortAnswers.length > 0) {
    const shortAnswerSection = document.createElement("div");
    shortAnswerSection.innerHTML = "<h2>சுருக்கமான பதில் கேள்விகள்</h2>";
    assessmentData.shortAnswers.forEach((shortAnswer, index) => {
      const shortAnswerElement = document.createElement("div");
      shortAnswerElement.innerHTML = `
                <p>${index + 1}. ${shortAnswer.question}</p>
                <button class="corr-b" onclick="editQuestion(${index}, 'shortAnswer')">திருத்தம்</button>
            `;
      shortAnswerSection.appendChild(shortAnswerElement);
    });
    publishContainer.appendChild(shortAnswerSection);
  }

  // Display Long Answer Questions
  if (assessmentData.longAnswers.length > 0) {
    const longAnswerSection = document.createElement("div");
    longAnswerSection.innerHTML = "<h2>நீண்ட பதில் கேள்விகள்</h2>";
    assessmentData.longAnswers.forEach((longAnswer, index) => {
      const longAnswerElement = document.createElement("div");
      longAnswerElement.innerHTML = `
                <p>${index + 1}. ${longAnswer.question}</p>
                <button class="corr-b" onclick="editQuestion(${index}, 'longAnswer')">திருத்தம்</button>
            `;
      longAnswerSection.appendChild(longAnswerElement);
    });
    publishContainer.appendChild(longAnswerSection);
  }
});

// Function to handle question edits
function editQuestion(index, type) {
  const overlay = document.getElementById("overlay");
  const editForm = document.getElementById("edit-form");
  const questionInput = document.getElementById("edit-question");
  const mcqOptions = document.getElementById("mcq-options");
  const assessmentData = JSON.parse(localStorage.getItem("assessmentData"));

  // Prepare the form based on question type
  if (type === "mcq") {
    const mcq = assessmentData.mcqs[index];
    questionInput.value = mcq.question;
    document.getElementById("edit-option-a").value = mcq.options.A;
    document.getElementById("edit-option-b").value = mcq.options.B;
    document.getElementById("edit-option-c").value = mcq.options.C;
    document.getElementById("edit-option-d").value = mcq.options.D;
    document.getElementById("edit-correct-answer").value = mcq.correctAnswer;
    mcqOptions.style.display = "block";
  } else {
    const question =
      type === "shortAnswer"
        ? assessmentData.shortAnswers[index]
        : assessmentData.longAnswers[index];
    questionInput.value = question.question;
    mcqOptions.style.display = "none";
  }

  // Show the form
  overlay.style.display = "block";
  editForm.style.display = "block";

  document.getElementById("saveChanges").onclick = () => {
    // Save the changes based on question type
    if (type === "mcq") {
      assessmentData.mcqs[index].question = questionInput.value;
      assessmentData.mcqs[index].options.A =
        document.getElementById("edit-option-a").value;
      assessmentData.mcqs[index].options.B =
        document.getElementById("edit-option-b").value;
      assessmentData.mcqs[index].options.C =
        document.getElementById("edit-option-c").value;
      assessmentData.mcqs[index].options.D =
        document.getElementById("edit-option-d").value;
      assessmentData.mcqs[index].correctAnswer = document.getElementById(
        "edit-correct-answer"
      ).value;
    } else if (type === "shortAnswer") {
      assessmentData.shortAnswers[index].question = questionInput.value;
    } else if (type === "longAnswer") {
      assessmentData.longAnswers[index].question = questionInput.value;
    }

    localStorage.setItem("assessmentData", JSON.stringify(assessmentData));
    overlay.style.display = "none";
    editForm.style.display = "none";
    location.reload(); // Refresh the page to show updated data
  };

  document.getElementById("cancelEdit").onclick = () => {
    overlay.style.display = "none";
    editForm.style.display = "none";
  };
}

// Function to redirect to the admin page
function redirectToAdminPage() {
  window.location.href = "admin.html"; // Adjust the path as necessary
}

document.getElementById("publishButton").addEventListener("click", () => {
  alert("வினாத்தாள் வெற்றிகரமாக வெளியிடப்பட்டது!"); // Redirect to student page
});
