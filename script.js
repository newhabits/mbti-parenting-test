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
    {
        question: "아이가 울고 떼를 쓸 때, 당신은?",
        answers: [
            { text: "규칙은 지켜야 하니까, 이유를 차근차근 설명해줘요.", scores: { J: 2, T: 1 } },
            { text: "무슨 일이 있었는지 아이의 마음을 들어봐요.", scores: { F: 2, E: 1 } },
            { text: "어? 이거 봐봐! 주의를 다른 데로 돌려줘요.", scores: { P: 2, N: 1 } },
            { text: "잠깐 기다리면서 조용히 상황을 지켜봐요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "육아에서 가장 중요한 것은?",
        answers: [
            { text: "생활 리듬과 약속을 지키는 습관을 키워줘야죠!", scores: { J: 2, S: 1 } },
            { text: "아이의 감정을 잘 이해하고 공감하는 게 중요하죠.", scores: { F: 2, E: 1 } },
            { text: "새로운 경험을 통해 도전 정신을 길러주는 거요!", scores: { N: 2, P: 1 } },
            { text: "자기만의 개성을 가진 아이로 키우는 게 중요해요.", scores: { T: 2, I: 1 } }
        ]
    },
    {
        question: "갑자기 하루가 비었을 때, 당신은?",
        answers: [
            { text: "시간표를 짜서 알차게 하루를 보내요!", scores: { J: 2, T: 1 } },
            { text: "오늘은 그냥 쉬면서 여유롭게 보내고 싶어요.", scores: { P: 2, F: 1 } },
            { text: "새로운 장소나 재미있는 곳을 탐방해봐요!", scores: { N: 2, E: 1 } },
            { text: "아이와 함께 조용히 책 읽으며 차분히 보내요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "육아 스트레스를 푸는 방법은?",
        answers: [
            { text: "효과적인 해결책을 찾아보면서 스트레스를 풀어요.", scores: { T: 2, J: 1 } },
            { text: "친구랑 통화하면서 수다 떨다 보면 풀리더라고요!", scores: { F: 2, E: 1 } },
            { text: "내가 좋아하는 취미에 푹 빠져 스트레스를 날려요.", scores: { N: 2, P: 1 } },
            { text: "혼자만의 시간을 가지며 조용히 에너지를 충전해요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "아이 생일 준비는 어떻게?",
        answers: [
            { text: "체크리스트를 꼼꼼히 작성해서 준비해요!", scores: { J: 2, T: 1 } },
            { text: "소박하지만 따뜻한 시간을 만들고 싶어요.", scores: { F: 2, S: 1 } },
            { text: "독창적인 테마로 생일을 특별하게 꾸며봐요!", scores: { N: 2, P: 1 } },
            { text: "가족끼리 조용히 보내는 것도 좋아요.", scores: { I: 2, J: 1 } }
        ]
    },
    {
        question: "새 친구를 사귀고 싶어하는 아이를 돕는 방법은?",
        answers: [
            { text: "만남 일정을 짜서 체계적으로 잡아줘요!", scores: { J: 2, T: 1 } },
            { text: "아이가 준비될 때까지 기다려주고 지켜봐요.", scores: { P: 2, F: 1 } },
            { text: "재미있는 활동 속에서 자연스럽게 친구를 만나게 해요.", scores: { N: 2, E: 1 } },
            { text: "상황을 천천히 관찰하면서 아이에게 적절히 조언해요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "아이와 갈등이 생겼을 때, 당신은?",
        answers: [
            { text: "이유를 차근차근 논리적으로 설명해줘요.", scores: { T: 2, J: 1 } },
            { text: "아이의 마음을 먼저 들어주고 공감해요.", scores: { F: 2, E: 1 } },
            { text: "재미있게 풀 수 있는 방법을 찾아요!", scores: { N: 2, P: 1 } },
            { text: "조용히 상황을 지켜보면서 해결의 실마리를 찾아요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "아이의 잘못된 행동을 바로잡는 방법은?",
        answers: [
            { text: "왜 잘못됐는지 논리적으로 설명해줘요.", scores: { J: 2, T: 1 } },
            { text: "왜 그렇게 행동했는지 아이와 대화를 나눠요.", scores: { F: 2, E: 1 } },
            { text: "게임처럼 재미있게 바로잡아줘요!", scores: { N: 2, P: 1 } },
            { text: "아이 스스로 깨달을 때까지 기다려줘요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "놀이 스타일은?",
        answers: [
            { text: "시간표에 따라 체계적으로 진행해요.", scores: { J: 2, T: 1 } },
            { text: "즉흥적으로 자유롭게 놀아요!", scores: { P: 2, F: 1 } },
            { text: "새로운 놀이 아이디어를 찾아 시도해봐요!", scores: { N: 2, E: 1 } },
            { text: "차분히 조용한 놀이를 선호해요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "육아에서 가장 도전적인 점은?",
        answers: [
            { text: "아기의 생활 리듬과 약속을 지키는 일이에요.", scores: { J: 2, S: 1 } },
            { text: "아이의 감정을 이해하면서 나를 돌보는 일이요.", scores: { F: 2, E: 1 } },
            { text: "매일 새로운 놀이를 찾는 게 도전이에요!", scores: { N: 2, P: 1 } },
            { text: "육아 중 내 시간을 확보하는 게 힘들어요.", scores: { I: 2, T: 1 } }
        ]
    },
    {
        question: "잠들기 전 마지막 시간은?",
        answers: [
            { text: "내일 해야 할 일들을 정리하면서 마무리해요.",
];

const mbtiResults = {
    ESTJ: "당신의 체계적인 육아는 아이에게 안정감을 줍니다. 가끔은 계획에서 벗어나 아이와 자유롭게 시간을 보내보는 건 어떨까요?",
    ESTP: "당신의 활기찬 에너지는 아이에게 자신감을 줍니다. 매일 짧은 시간이라도 아이와 정해진 시간에 함께하는 활동을 만들어보세요.",
    ESFJ: "당신의 따뜻한 마음은 아이에게 안정감이 됩니다. 때로는 한 발 물러서서 아이 스스로 해결할 수 있는 기회를 주어보세요.",
    ESFP: "당신의 즐거운 에너지는 아이에게 행복을 선물합니다. 하루 한 가지씩 아이와 함께 작은 약속을 정해보는 건 어떨까요?",
    ENTJ: "당신의 리더십은 아이에게 목표를 제시합니다. 오늘은 아이와 함께 앉아 이야기를 나누며 마음을 알아보세요.",
    ENTP: "당신의 창의력은 아이에게 새로운 세상을 보여줍니다. 매일 조금씩 규칙적인 생활을 만들어가보세요.",
    ENFJ: "당신의 따뜻한 리더십은 아이에게 영감이 됩니다. 가끔은 계획 없이 아이와 느긋하게 시간을 보내보세요.",
    ENFP: "당신의 열정은 아이의 상상력을 키워줍니다. 하루 중 짧은 시간이라도 정해진 루틴을 만들어보세요.",
    ISTJ: "당신의 안정적인 육아는 신뢰를 만듭니다. 가끔은 계획을 잠시 미루고 아이와 즉흥적인 활동을 해보세요.",
    ISTP: "당신의 실용적인 접근은 아이의 독립심을 키워줍니다. 매일 저녁 짧게라도 아이와 마음을 나누는 시간을 가져보세요.",
    ISFJ: "당신의 세심한 보살핌은 아이에게 사랑이 됩니다. 때로는 아이가 스스로 도전할 수 있도록 기다려주세요.",
    ISFP: "당신의 따뜻함은 아이에게 특별한 추억을 선물합니다. 하루 한 가지씩 아이와 함께 할 일을 정해보세요.",
    INTJ: "당신의 미래를 향한 계획은 아이에게 방향이 됩니다. 오늘은 계획을 잠시 접어두고 아이와 현재를 즐겨보세요.",
    INTP: "당신의 논리적 사고는 아이의 지적 호기심을 자극합니다. 매일 조금씩 아이와 감정을 나누는 시간을 가져보세요.",
    INFJ: "당신의 깊은 이해심은 아이의 
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
            <h2 class="text-3xl font-bold mb-6">당신의 부모 유형은 ${mbti}입니다!</h2>
            <div class="bg-blue-50 p-6 rounded-lg mb-8">
                <p class="text-lg mb-4">${mbtiResults[mbti]}</p>
            </div>
            <div class="flex justify-center gap-4">
                <button onclick="location.reload()" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                    다시 테스트하기
                </button>
                <button onclick="shareResult()" class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors">
                    결과 공유하기
                </button>
            </div>
        </div>
    `;
}

function shareResult() {
    const mbti = calculateMBTI();
    const shareText = `나의 부모 유형은 ${mbti}입니다! 당신의 부모 유형도 알아보세요.`;
    
    if (navigator.share) {
        navigator.share({
            title: '부모 유형 MBTI 테스트',
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText + ' ' + window.location.href)
            .then(() => alert('클립보드에 복사되었습니다.'))
            .catch(() => alert('공유하기를 지원하지 않는 브라우저입니다.'));
    }
}
}

// 테스트 시작
window.onload = showQuestion;