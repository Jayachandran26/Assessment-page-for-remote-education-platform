document.addEventListener('DOMContentLoaded', loadPendingQuestions);

function loadPendingQuestions() {
    const questionsContainer = document.getElementById('adminQuestionsContainer');
    const publishedData = JSON.parse(localStorage.getItem('publishedQuestions')) || {};

    if (publishedData.examDetails) {
        const examDetailsDiv = document.createElement('div');
        examDetailsDiv.className = 'exam-details-summary';
        examDetailsDiv.innerHTML = `
            <h2>${publishedData.examDetails.subject}</h2>
            <p>மொத்த மதிப்பெண்கள்: ${publishedData.examDetails.totalMarks}</p>
            <p>நேரம்: ${publishedData.examDetails.duration} நிமிடங்கள்</p>
            <p>குறிப்புகள்: ${publishedData.examDetails.instructions}</p>
        `;
        questionsContainer.appendChild(examDetailsDiv);
    }

    if (publishedData.questions) {
        publishedData.questions.forEach((q) => {
            let questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            questionDiv.innerHTML = q.content;
            questionsContainer.appendChild(questionDiv);
        });
    }
}

function publishQuestions() {
    alert('கேள்விகள் வெற்றிகரமாக வெளியிடப்பட்டது!');
}

document.getElementById('publishButton').addEventListener('click', publishQuestions);
