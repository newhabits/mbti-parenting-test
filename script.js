const questions = [
    {
        question: "아이와 노는 시간, 당신은?",
        answers: [
            { text: "오늘은 이거 하고, 저거 하고~ 체계적으로 진행해요!", scores: { J: 2, T: 1 } },
            { text: "하고 싶은 대로 해보자! 자유롭게 놀아요.", scores: { P: 2, F: 1 } },
            { text: "새로운 놀이를 해볼까? 색다른 걸 제안해요.", scores: { N: 2, E: 1 } },
            { text: "조용히 책을 읽으면서 차분하게 시간을 보내요.", scores: { I: 2, S: 1 } }
        ]
    },
    // ... 나머지 질문들 추가
];

const mbtiResults = {
    ESTJ: "당신의 체계적인 육아는 아이에게 안정감을 줍니다. 가끔은 계획에서 벗어나 아이와 자유롭게 시간을 보내보는 건 어떨까요?",
    // ... 나머지 MBTI 결과 추가
};

let currentQuestion = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

function showQuestion() {
    const container = document.getElementById('test-container');
    const question = questions[currentQuestion];
    
    let html = `
        <h2 class="text-xl font-bold mb-4">${question.question}</h2>
        <div class="space-y-4">
    `;
    
    question.answers.forEach((answer, index) => {
        html += `
            <button class="answer" onclick="selectAnswer(${index})">
                ${answer.text}
            </button>
        `;
    });
    
    html += `
        </div>
        <div class="mt-4 text-center text-gray-600">
            ${currentQuestion + 1} / ${questions.length}
        </div>
    `;
    
    container.innerHTML = html;
}

function selectAnswer(answerIndex) {
    const answer = questions[currentQuestion].answers[answerIndex];
    
    Object.entries(answer.scores).forEach(([key, value]) => {
        scores[key] += value;
    });
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function calculateMBTI() {
    return [
        scores.E > scores.I ? 'E' : 'I',
        scores.S > scores.N ? 'S' : 'N',
        scores.T > scores.F ? 'T' : 'F',
        scores.J > scores.P ? 'J' : 'P'
    ].join('');
}

function showResult() {
    const mbti = calculateMBTI();
    const container = document.getElementById('test-container');
    
    container.innerHTML = `
        <div class="result">
            <h2 class="text-2xl font-bold mb-4">당신의 부모 유형은 ${mbti}입니다!</h2>
            <p class="text-lg mb-8">${mbtiResults[mbti]}</p>
            <button onclick="location.reload()" class="bg-blue-500 text-white px-6 py-2 rounded">
                다시 테스트하기
            </button>
        </div>
    `;
}

// 테스트 시작
window.onload = showQuestion;