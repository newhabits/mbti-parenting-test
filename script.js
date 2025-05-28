// 페이지가 완전히 로드된 후 실행
window.onload = function() {
    // 인트로 화면 보이기
    document.getElementById("intro-container").classList.add("active");
    
    // 시작 버튼 클릭 이벤트
    document.getElementById("start-btn").onclick = function() {
        hideAllContainers();
        document.getElementById("quiz-container").classList.add("active");
        initializeQuiz();
    };
    
    // 뒤로가기 버튼 클릭 이벤트
    document.getElementById("back-button").onclick = goBack;
    
    // 공유 버튼 클릭 이벤트
    document.getElementById("share-button").onclick = shareResult;
    
    // URL에 결과가 있는지 확인
    checkSharedResult();
};

// 점수 저장 변수들
var currentQuestionIndex = 0;
var scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
var previousAnswers = [];

// 모든 화면 숨기기
function hideAllContainers() {
    document.getElementById("intro-container").classList.remove("active");
    document.getElementById("quiz-container").classList.remove("active");
    document.getElementById("result-container").classList.remove("active");
}

// 퀴즈 시작
function initializeQuiz() {
    currentQuestionIndex = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    previousAnswers = [];
    renderQuestion();
}

// 질문 목록
var questions = [
    {
        question: "주말 아침, 아무 계획 없이 아이와 하루를 시작할 때 당신의 접근 방식은?",
        answers: [
            { text: "\"오늘은 이것부터 하고, 그 다음엔 저것 하자!\" 미리 하루 일정을 계획하고 시간별로 활동을 구성해요.", scores: { J: 2, T: 1 } },
            { text: "\"오늘은 뭐하고 놀고 싶어?\" 아이의 기분과 선호에 따라 유연하게 하루를 진행해요.", scores: { P: 2, F: 1 } },
            { text: "\"새로운 곳에 가보는 건 어때?\" 일상에서 벗어난 색다른 경험을 제안하고 모험을 즐겨요.", scores: { N: 2, E: 1 } },
            { text: "\"우리 집에서 차분히 놀자.\" 아이와 함께 조용한 활동으로 편안한 시간을 보내요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "아이가 분명한 이유 없이 장난감을 사달라고 울며 떼를 쓸 때, 당신은?",
        answers: [
            { text: "\"우리는 오늘 장난감을 사기로 약속한 날이 아니야.\" 규칙과 약속을 지키는 것의 중요성을 강조해요.", scores: { J: 2, T: 1 } },
            { text: "\"그 장난감이 정말 갖고 싶구나. 많이 아쉽겠다.\" 아이의 감정에 먼저 공감하고 대화로 풀어가요.", scores: { F: 2, E: 1 } },
            { text: "\"이건 어때? 다른 걸로 재미있게 놀아볼까?\" 관심을 돌리고 대안적인 즐거움을 찾아요.", scores: { P: 2, N: 1 } },
            { text: "차분히 상황을 지켜보며 아이가 스스로 감정을 조절할 수 있는 시간을 줘요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "아이의 교육과 발달에 있어 가장 중요하다고 생각하는 것은?",
        answers: [
            { text: "규칙적인 생활습관과 일관된 교육 방식으로 안정감을 주는 것", scores: { J: 2, S: 1 } },
            { text: "아이의 감정을 존중하고 긍정적인 자아개념 형성을 돕는 것", scores: { F: 2, E: 1 } },
            { text: "다양한 경험을 통해 호기심과 창의성을 자극하는 것", scores: { N: 2, P: 1 } },
            { text: "자기 주도적 사고와 문제 해결 능력을 기르는 것", scores: { T: 2, I: 1 } }
        ]
    },
    {
        question: "갑작스럽게 비가 와서 야외 놀이 계획이 취소되었을 때, 당신은?",
        answers: [
            { text: "\"계획이 바뀌었으니 실내 활동 목록을 만들자.\" 신속하게 대안 계획을 세우고 체계적으로 진행해요.", scores: { J: 2, T: 1 } },
            { text: "\"비가 와서 실망했구나. 집에서 무엇을 하면 기분이 나아질까?\" 아이의 감정을 살피며 원하는 활동을 물어봐요.", scores: { P: 2, F: 1 } },
            { text: "\"비가 오니까 실내에서 할 수 있는 색다른 놀이를 찾아보자!\" 새로운 아이디어로 즉흥적인 활동을 제안해요.", scores: { N: 2, E: 1 } },
            { text: "\"오늘은 집에서 조용히 쉬는 날로 하자.\" 아늑한 실내에서 평화로운 시간을 보내요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "육아로 체력과 인내심이 고갈되었을 때, 당신이 선택하는 자기 돌봄 방식은?",
        answers: [
            { text: "문제의 원인을 분석하고 더 효율적인 육아 방식을 찾아 적용해요.", scores: { T: 2, J: 1 } },
            { text: "친구나 가족에게 솔직히 힘든 마음을 나누고 정서적 지지를 얻어요.", scores: { F: 2, E: 1 } },
            { text: "아이와 잠시 떨어져 나만의 취미나 새로운 활동으로 기분 전환해요.", scores: { N: 2, P: 1 } },
            { text: "혼자만의 조용한 시간을 갖고 내면의 에너지를 재충전해요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "아이의 생일 파티를 앞두고 있을 때, 당신의 준비 스타일은?",
        answers: [
            { text: "체크리스트를 만들고, 날짜별로 할 일을 나눠 체계적으로 준비해요.", scores: { J: 2, T: 1 } },
            { text: "아이와 함께 파티 아이디어를 나누며 특별한 추억이 될 만한 요소들을 계획해요.", scores: { F: 2, S: 1 } },
            { text: "독특하고 창의적인 파티 테마를 떠올리며 아이와 친구들이 놀랄 요소를 구상해요.", scores: { N: 2, P: 1 } },
            { text: "소규모로 의미 있는 파티를 준비하며 세부 사항은 상황에 따라 조정해요.", scores: { I: 2, J: 1 } }
        ]
    },
    {
        question: "아이가 새로운 환경에 적응하는데 어려움을 겪고 있을 때, 당신은?",
        answers: [
            { text: "\"적응을 위한 단계별 계획을 세워보자.\" 구체적인 전략과 목표를 설정하고 진행상황을 확인해요.", scores: { J: 2, T: 1 } },
            { text: "\"새로운 환경이 무섭고 낯설지?\" 아이의 불안한 감정을 인정하고 공감하며 안심시켜요.", scores: { P: 2, F: 1 } },
            { text: "\"네가 좋아하는 것들로 새 친구들과 연결점을 찾아보자.\" 흥미를 통한 자연스러운 적응을 유도해요.", scores: { N: 2, E: 1 } },
            { text: "아이의 행동과 반응을 관찰하고, 필요할 때 조용히 조언과 지원을 제공해요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "아이가 어려운 퍼즐이나 문제를 풀다가 좌절했을 때, 당신의 접근법은?",
        answers: [
            { text: "\"이 문제는 이런 순서로 풀면 돼.\" 논리적인 단계와 문제 해결 전략을 알려줘요.", scores: { T: 2, J: 1 } },
            { text: "\"정말 어렵구나. 함께 해볼까?\" 아이의 좌절감에 공감하고 함께 도전하며 정서적 지지를 해요.", scores: { F: 2, E: 1 } },
            { text: "\"다른 방법으로도 시도해보자!\" 다양한 창의적 접근법과 발상의 전환을 제안해요.", scores: { N: 2, P: 1 } },
            { text: "아이가 스스로 해결책을 찾을 수 있도록 필요한 힌트만 최소한으로 제공해요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "공공장소에서 아이가 갑자기 통제하기 어려운 행동을 보일 때, 당신은?",
        answers: [
            { text: "\"여기서는 이렇게 행동해야 해.\" 명확한 기준과 결과를 설명하고 규칙을 지키도록 일관되게 대응해요.", scores: { J: 2, T: 1 } },
            { text: "\"무슨 일이 있니? 기분이 안 좋아?\" 아이의 행동 이면의 감정과 요구를 파악하려 노력해요.", scores: { F: 2, E: 1 } },
            { text: "\"저쪽에 가면 더 재미있을 것 같은데!\" 아이의 관심을 긍정적인 방향으로 전환시켜요.", scores: { N: 2, P: 1 } },
            { text: "조용히 아이를 한쪽으로 데려가 상황을 진정시키고 적절한 행동을 안내해요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "육아를 하며 당신이 가장 어려움을 느끼는 상황은?",
        answers: [
            { text: "예상치 못한 변수로 계획이 무너지거나 일상의 구조가 흔들릴 때", scores: { J: 2, S: 1 } },
            { text: "아이의 감정적 요구와 나 자신의 감정적 균형을 동시에 관리해야 할 때", scores: { F: 2, E: 1 } },
            { text: "아이에게 지속적으로 새롭고 흥미로운 자극과 경험을 제공해야 할 때", scores: { N: 2, P: 1 } },
            { text: "개인적인 공간과 시간이 부족하고 지속적인 사회적 상호작용이 필요할 때", scores: { I: 2, T: 1 } }
        ]
    },
    {
        question: "아이 방이 완전히 어질러져 있을 때, 당신의 정리 접근 방식은?",
        answers: [
            { text: "체계적인 정리 시스템을 만들고 함께 순서대로 정리해요.", scores: { J: 2, T: 1 } },
            { text: "정리를 게임처럼 만들어 즐겁게 참여하도록 유도해요.", scores: { F: 2, E: 1 } },
            { text: "정리하는 색다른 방법을 제안하며 창의적으로 접근해요.", scores: { N: 2, P: 1 } },
            { text: "아이에게 정리의 필요성을 차분히 설명하고, 스스로 방법을 찾아 정리할 수 있도록 지켜봐요.", scores: { I: 2, S: 1 } }
        ]
    },
    {
        question: "취침 시간이 다가올 때, 아이와의 저녁 루틴에서 당신에게 가장 중요한 것은?",
        answers: [
            { text: "정해진 시간에 일정한 순서로 진행하며 내일을 위한 준비를 완료하는 것", scores: { J: 2, T: 1 } },
            { text: "아이와 그날의 감정과 경험에 대해 대화하며 정서적 교감을 나누는 것", scores: { F: 2, S: 1 } },
            { text: "아이의 상상력을 자극하는 이야기나 대화로 풍부한 내면 세계를 키우는 것", scores: { N: 2, E: 1 } },
            { text: "조용하고 안정된 분위기에서 아이가 평화롭게 휴식할 수 있게 하는 것", scores: { I: 2, P: 1 } }
        ]
    }
];

// 질문 보여주기
function renderQuestion() {
    var question = questions[currentQuestionIndex];
    var questionElement = document.getElementById("question");
    var answersElement = document.getElementById("answers");
    
    questionElement.innerText = question.question;
    answersElement.innerHTML = "";

    var progress = document.querySelector('.progress');
    var progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progress.style.width = progressPercentage + '%';

    for (var i = 0; i < question.answers.length; i++) {
        var answer = question.answers[i];
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.onclick = (function(ans) {
            return function() {
                previousAnswers.push({ questionIndex: currentQuestionIndex, scores: ans.scores });
                for (var key in ans.scores) {
                    scores[key] += ans.scores[key];
                }
                nextQuestion();
            };
        })(answer);
        answersElement.appendChild(button);
    }

    // 첫 번째 질문이면 뒤로가기 버튼 숨기기
    if (currentQuestionIndex === 0) {
        document.getElementById("back-button").classList.add("hidden");
    } else {
        document.getElementById("back-button").classList.remove("hidden");
    }
}

// 다음 질문
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

// 이전 질문
function goBack() {
    if (currentQuestionIndex > 0) {
        previousAnswers.pop(); 
        currentQuestionIndex--;
        renderQuestion();
    }
}

// MBTI 결과 계산
function calculateMBTI() {
    var eOrI = scores.E >= scores.I ? "E" : "I";
    var sOrN = scores.S >= scores.N ? "S" : "N";
    var tOrF = scores.T >= scores.F ? "T" : "F";
    var jOrP = scores.J >= scores.P ? "J" : "P";
    return eOrI + sOrN + tOrF + jOrP;
}

// 결과 보여주기
function showResult() {
    hideAllContainers();
    document.getElementById('result-container').classList.add('active');
    var mbti = calculateMBTI();
    showPersonalityResult(mbti);
}

// 결과 타입별로 보여주기
function showPersonalityResult(type) {
    var resultContainer = document.getElementById('result-container');
    
    var imageContainer = document.getElementById('result-type-image');
    if (!imageContainer) {
        imageContainer = document.createElement('div');
        imageContainer.id = 'result-type-image';
        resultContainer.insertBefore(imageContainer, document.getElementById('result-content'));
    }
    
    imageContainer.innerHTML = '<div class="result-image"><img src="images/' + type.toLowerCase() + '.png" alt="' + type + ' 유형 이미지"></div>';
    
    document.getElementById('result-content').innerHTML = '';
    
    updateMetaTags(type);

    if (type === 'INTJ') {
        showINTJResult();
    } else if (type === 'ISTJ') {
        showISTJResult();
    } else if (type === 'ESTJ') {
        showESTJResult();
    } else if (type === 'ISFJ') {
        showISFJResult();
    } else if (type === 'ESFJ') {
        showESFJResult();
    } else if (type === 'INFP') {
        showINFPResult();
    } else if (type === 'ENFP') {
        showENFPResult();
    } else if (type === 'INTP') {
        showINTPResult();
    } else if (type === 'ENTP') {
        showENTPResult();
    } else if (type === 'ENTJ') {
        showENTJResult();
    } else if (type === 'INFJ') {
        showINFJResult();
    } else if (type === 'ENFJ') {
        showENFJResult();
    } else if (type === 'ISTP') {
        showISTPResult();
    } else if (type === 'ESTP') {
        showESTPResult();
    } else if (type === 'ISFP') {
        showISFPResult();
    } else if (type === 'ESFP') {
        showESFPResult();
    } else {
        document.getElementById('result-content').innerHTML = '<p>결과를 찾을 수 없습니다.</p>';
    }
}

function updateMetaTags(mbtiType) {
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var twitterTitle = document.querySelector('meta[name="twitter:title"]');
    
    if (ogTitle) {
        ogTitle.content = mbtiType + ' 유형 육아 스타일 - MBTI 육아 테스트';
    }
    if (twitterTitle) {
        twitterTitle.content = mbtiType + ' 유형 육아 스타일 - MBTI 육아 테스트';
    }
    
    var imageUrl = 'https://newhabits.github.io/mbti-parenting-test/images/' + mbtiType.toLowerCase() + '.png';
    var ogImage = document.querySelector('meta[property="og:image"]');
    var twitterImage = document.querySelector('meta[name="twitter:image"]');
    
    if (ogImage) {
        ogImage.content = imageUrl;
    }
    if (twitterImage) {
        twitterImage.content = imageUrl;
    }
    
    var ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        ogUrl.content = 'https://newhabits.github.io/mbti-parenting-test/?type=' + mbtiType;
    }
}

// 결과 공유하기
function shareResult() {
    var mbtiType = calculateMBTI();
    var shareUrl = window.location.origin + window.location.pathname + '?type=' + mbtiType;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(function() {
            var shareAlert = document.getElementById("share-alert");
            shareAlert.classList.remove("hidden");
            
            setTimeout(function() {
                shareAlert.classList.add("hidden");
            }, 3000);
        }).catch(function() {
            alert('링크 복사에 실패했습니다.');
        });
    } else {
        alert('링크: ' + shareUrl);
    }
}

// URL에서 공유된 결과 확인
function checkSharedResult() {
    var urlParams = new URLSearchParams(window.location.search);
    var mbtiType = urlParams.get('type');
    
    if (mbtiType) {
        var validTypes = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];
        
        for (var i = 0; i < validTypes.length; i++) {
            if (validTypes[i] === mbtiType) {
                hideAllContainers();
                document.getElementById('result-container').classList.add('active');
                
                // 공유된 결과를 위한 특별한 함수 호출
                showSharedPersonalityResult(mbtiType);
                break;
            }
        }
    }
}

// 공유된 결과 표시용 함수
function showSharedPersonalityResult(type) {
    var resultContainer = document.getElementById('result-container');
    
    var imageContainer = document.getElementById('result-type-image');
    if (!imageContainer) {
        imageContainer = document.createElement('div');
        imageContainer.id = 'result-type-image';
        resultContainer.insertBefore(imageContainer, document.getElementById('result-content'));
    }
    
    imageContainer.innerHTML = '<div class="result-image"><img src="images/' + type.toLowerCase() + '.png" alt="' + type + ' 유형 이미지"></div>';
    
    document.getElementById('result-content').innerHTML = '';
    
    updateMetaTags(type);

    // 공유된 결과용 축약된 내용 표시
    showSharedResult(type);
}

// 공유된 결과용 축약 버전 (모든 유형 포함)
function showSharedResult(type) {
    var sharedMessage = '<div class="shared-message"><p><strong>친구가 공유한 결과입니다. 나의 타입도 알아보세요!</strong></p></div>';
    
    var typeInfo = getTypeInfo(type);
    
    var sharedContent = `
        <div class="result-container">
            ${sharedMessage}
            <h1 class="result-title">${typeInfo.title}</h1>
            <div class="result-subtitle">${typeInfo.subtitle}</div>
            
            <section class="essence-section">
                ${typeInfo.essence}
            </section>
            
            <div class="test-again-section">
                <button onclick="startNewTest()" class="simple-button">나도 테스트 해보기</button>
            </div>
        </div>
    `;
    
    document.getElementById('result-content').innerHTML = sharedContent;
}

// 타입별 정보 반환 함수
function getTypeInfo(type) {
    var typeInfos = {
        'ENFP': {
            title: '열정적 영감형 부모 (ENFP)',
            subtitle: '아이와 함께 성장하는 모험가',
            essence: '<p class="essence-text"><strong>당신은 아이와 함께 삶의 모험을 즐기는 열정적이고 창의적인 부모입니다.</strong> 자녀의 독특한 개성을 존중하고, 다양한 가능성과 경험을 통해 성장하도록 격려합니다. 당신의 따뜻한 열정은 아이에게 <strong>무한한 가능성과 자유로운 표현</strong>의 세계를 열어줍니다.</p><p>때로는 너무 많은 아이디어와 흥미 사이에서 "일관성과 안정감을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>'
        },
        'INTJ': {
            title: '전략적 비전형 부모 (INTJ)',
            subtitle: '내일을 준비하며 오늘을 살아가는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이의 성장을 위한 장기적 비전을 가진 전략적인 부모입니다.</strong> 자녀가 독립적이고 논리적인 사고를 발달시키도록 돕는 것을 중요시합니다. 당신의 깊은 통찰력은 자녀에게 <strong>지적 성장의 든든한 길잡이</strong>가 됩니다.</p><p>때로는 완벽을 추구하는 마음에 "이 방식이 아이에게 최선일까?" 하고 고민하기도 합니다.</p>'
        },
        'ISTJ': {
            title: '체계적 계획형 부모 (ISTJ)',
            subtitle: '조용한 단단함으로 지켜내는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이의 일상을 안정적으로 만들어주는 기둥 같은 부모입니다.</strong> 약속은 지켜야 한다고 믿고, 질서와 규칙 안에서 아이가 잘 자라길 바랍니다. 당신이 계획하는 하루는, 아이에게 <strong>세상이 안전하다는 신호</strong>가 됩니다.</p><p>하지만 가끔, 모든 걸 잘하려고 애쓰는 자신이 너무 딱딱한 사람처럼 느껴질 때가 있죠. "이렇게까지 해야 하나?" 하며 외로움도 스며듭니다.</p>'
        },
        'ESTJ': {
            title: '체계적 실행형 부모 (ESTJ)',
            subtitle: '명확한 원칙으로 아이를 이끄는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이에게 명확한 구조와 안정감을 제공하는 책임감 있는 부모입니다.</strong> 일관된 규칙과 전통적 가치를 중요시하며, 자녀가 사회에서 성공하고 책임감 있는 구성원이 되도록 지도합니다. 당신의 체계적인 접근방식은 아이에게 <strong>안정감과 명확한 방향성</strong>을 제시합니다.</p><p>때로는 원칙을 지키려다 보니 "아이의 개성과 유연성을 충분히 존중하고 있을까?" 하는 고민이 들기도 합니다.</p>'
        },
        'ISFJ': {
            title: '섬세한 보호형 부모 (ISFJ)',
            subtitle: '아이의 모든 순간을 지키는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이를 위해 조용히 헌신하는 따뜻하고 신뢰할 수 있는 부모입니다.</strong> 세심한 관찰로 자녀의 필요를 파악하고, 안정적인 일상과 전통을 통해 안전한 환경을 만듭니다. 당신의 한결같은 보살핌은 아이에게 <strong>안정감과 신뢰의 기반</strong>이 됩니다.</p><p>때로는 너무 많은 책임을 짊어지다 보니 "내가 충분히 쉬고 있을까? 과보호하고 있진 않을까?" 하는 고민이 들기도 합니다.</p>'
        },
        'ESFJ': {
            title: '헌신적 돌봄형 부모 (ESFJ)',
            subtitle: '아이의 행복을 위해 헌신하는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이의 필요를 세심하게 살피는 따뜻하고 헌신적인 부모입니다.</strong> 가족의 화목과 조화를 위해 노력하며, 자녀가 사회적 가치와 전통을 배우도록 도와줍니다. 당신의 변함없는 지지는 아이에게 <strong>안정감과 소속감</strong>을 선물합니다.</p><p>때로는 너무 많은 것을 책임지려다 보니 "내가 지나치게 개입하고 있진 않을까?" 하는 고민이 들기도 합니다.</p>'
        },
        'INFP': {
            title: '창의적 자유형 부모 (INFP)',
            subtitle: '내면의 깊이로 아이를 바라보는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이의 내면세계와 개성을 소중히 여기는 이상주의적인 부모입니다.</strong> 모든 아이는 특별하다고 믿고, 아이가 자신만의 가치관과 신념을 발전시키도록 지지합니다. 당신의 깊은 이해심은 아이에게 <strong>무조건적 사랑의 안전기지</strong>가 됩니다.</p><p>하지만 가끔, 이상과 현실 사이에서 갈등하며 "내가 충분히 잘하고 있을까?" 하는 의심이 들기도 합니다.</p>'
        },
        'INTP': {
            title: '논리적 탐구형 부모 (INTP)',
            subtitle: '호기심으로 세상을 열어주는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이의 지적 호기심을 키워주는 탐구적인 부모입니다.</strong> 질문과 발견을 통해 배움의 즐거움을 알려주고, 독립적인 사고를 존중합니다. 당신의 개방적인 사고는 아이에게 <strong>무한한 가능성의 세계</strong>를 열어줍니다.</p><p>간혹 이론과 현실 사이에서 "아이에게 실용적인 면도 가르쳐야 하나?" 하고 고민하기도 합니다.</p>'
        },
        'ENTP': {
            title: '창의적 도전형 부모 (ENTP)',
            subtitle: '가능성의 세계로 아이를 이끄는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이의 호기심과 창의력을 자극하는 혁신적인 부모입니다.</strong> 관습에 얽매이지 않고 새로운 아이디어와 경험을 장려하며, 자녀가 다양한 관점에서 세상을 바라보도록 돕습니다. 당신의 지적 활력은 아이에게 <strong>창의적 사고와 도전 정신</strong>을 불어넣습니다.</p><p>때로는 다음 흥미로운 아이디어에 집중하느라 "지속성과 일관성을 유지하고 있을까?" 하는 의문이 들기도 합니다.</p>'
        },
        'ENTJ': {
            title: '목표 지향형 부모 (ENTJ)',
            subtitle: '아이의 잠재력을 이끌어내는 리더',
            essence: '<p class="essence-text"><strong>당신은 아이의 성장과 성공을 위해 열정적으로 이끄는 리더십 있는 부모입니다.</strong> 명확한 목표와 기대치를 설정하며, 자녀가 최고의 잠재력을 발휘하도록 격려합니다. 당신의 결단력과 추진력은 아이에게 <strong>자신감과 성취의 길</strong>을 열어줍니다.</p><p>때로는 높은 기준과 기대치로 인해 "내 기대가 아이에게 부담이 되진 않을까?" 하는 고민이 들기도 합니다.</p>'
        },
        'INFJ': {
            title: '이상적 통찰형 부모 (INFJ)',
            subtitle: '아이의 내면을 깊이 이해하는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이의 내면세계를 깊이 이해하는 통찰력 있는 부모입니다.</strong> 자녀의 잠재력과 고유한 가치를 알아보고, 의미 있는 삶으로 인도하고자 합니다. 당신의 직관적 이해력은 아이에게 <strong>영감과 정서적 안정감</strong>을 제공합니다.</p><p>때로는 높은 이상과 현실 사이에서 "내 기대가 아이에게 부담이 되진 않을까?" 하고 고민하기도 합니다.</p>'
        },
        'ENFJ': {
            title: '따뜻한 지도자형 부모 (ENFJ)',
            subtitle: '아이의 잠재력을 꽃피우는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이의 성장과 행복을 위해 열정적으로 헌신하는 카리스마 있는 부모입니다.</strong> 자녀의 잠재력을 알아보고 최선의 길로 인도하며, 따뜻한 지지와 격려를 아끼지 않습니다. 당신의 진정성과 열정은 아이에게 <strong>긍정적 영향력과 자신감</strong>을 심어줍니다.</p><p>때로는 타인을 위해 너무 많은 것을 주다 보니 "나 자신은 충분히 돌보고 있을까?" 하는 고민이 들기도 합니다.</p>'
        },
        'ISTP': {
            title: '실용적 자유형 부모 (ISTP)',
            subtitle: '아이에게 문제 해결력을 가르치는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이에게 세상을 스스로 탐색하는 방법을 알려주는 실용적인 부모입니다.</strong> 문제 해결력과 독립심을 키워주며, 불필요한 규칙보다 본질에 집중합니다. 당신의 침착하고 유연한 대응은 아이에게 <strong>실용적 지혜와 적응력</strong>을 가르칩니다.</p><p>때로는 자유를 중시하는 성향으로 "아이에게 필요한 구조와 감정적 안정감을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>'
        },
        'ESTP': {
            title: '활동적 모험형 부모 (ESTP)',
            subtitle: '아이에게 세상을 경험하게 하는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이와 함께 세상을 적극적으로 탐험하는 활력 넘치는 부모입니다.</strong> 실제 경험을 통한 배움을 중요시하며, 자녀가 주변 환경과 적극적으로 상호작용하도록 격려합니다. 당신의 현실적인 문제 해결 능력은 아이에게 <strong>실용적인 대처 기술과 모험심</strong>을 길러줍니다.</p><p>때로는 순간의 즐거움에 집중하다 보니 "장기적인 감정적 연결과 일관성을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>'
        },
        'ISFP': {
            title: '감성적 보호형 부모 (ISFP)',
            subtitle: '아이의 세계를 아름답게 그려주는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이의 개성과 감성을 소중히 여기는 따뜻한 부모입니다.</strong> 작은 순간의 기쁨을 함께 나누며, 자녀가 자신만의 방식으로 세상을 경험하도록 격려합니다. 당신의 수용적인 태도는 아이에게 <strong>안전한 정서적 안식처</strong>가 됩니다.</p><p>때로는 균형을 찾는 과정에서 "아이에게 필요한 구조와 지침을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>'
        },
        'ESFP': {
            title: '즐거운 격려형 부모 (ESFP)',
            subtitle: '아이에게 삶의 기쁨을 알려주는 사람',
            essence: '<p class="essence-text"><strong>당신은 아이와 함께 매 순간을 축제처럼 즐기는 활기 넘치는 부모입니다.</strong> 온화한 사랑으로 자녀를 격려하고, 삶의 작은 기쁨을 나누는 것을 중요시합니다. 당신의 자연스러운 열정은 아이에게 <strong>자신감과 삶의 즐거움</strong>을 알려줍니다.</p><p>때로는 현재의 즐거움에 집중하다 보니 "미래를 위한 준비와 일관된 구조를 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>'
       }
    };
    
return typeInfos[type] || {
    title: '결과를 찾을 수 없습니다',
    subtitle: '',
    essence: '<p>유효하지 않은 유형입니다.</p>'
};
}

// 새로운 테스트 시작 함수  
function startNewTest() {
    // URL에서 쿼리 파라미터 제거
    window.history.replaceState({}, document.title, window.location.pathname);
    
    // 모든 컨테이너 숨기기
    hideAllContainers();
    
    // 인트로 화면 표시
    document.getElementById("intro-container").classList.add("active");
    
    // 퀴즈 데이터 초기화
    currentQuestionIndex = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    previousAnswers = [];
}


// ESTJ 유형 결과 페이지
function showESTJResult() {
  const resultContent = `
      <div class="result-container">
        <h1 class="result-title">체계적 실행형 부모 (ESTJ)</h1>
        <div class="result-subtitle">명확한 원칙으로 아이를 이끄는 사람</div>
        
        <section class="essence-section">
          <p class="essence-text"><strong>당신은 아이에게 명확한 구조와 안정감을 제공하는 책임감 있는 부모입니다.</strong> 일관된 규칙과 전통적 가치를 중요시하며, 자녀가 사회에서 성공하고 책임감 있는 구성원이 되도록 지도합니다. 당신의 체계적인 접근방식은 아이에게 <strong>안정감과 명확한 방향성</strong>을 제시합니다.</p>
          <p>때로는 원칙을 지키려다 보니 "아이의 개성과 유연성을 충분히 존중하고 있을까?" 하는 고민이 들기도 합니다.</p>
        </section>
        
        <section class="inner-strength-section">
          <h2>당신이어서 좋은 점</h2>
          <ul>
            <li>흔들림 없는 책임감</li>
            <li>일관된 원칙을 지키는 의지</li>
            <li>실질적 도움을 주는 실행력</li>
            <li>전통과 가치를 소중히 여기는 마음</li>
          </ul>
        </section>
        
        <section class="growth-section">
          <h2>성장 가능한 부분</h2>
          <ul>
            <li><strong>감정적 민감성:</strong> 규칙과 원칙 외에도 아이의 감정적 필요에 더 주의를 기울여보세요</li>
            <li><strong>유연성 발휘:</strong> 때로는 계획에서 벗어나 자발적인 순간도 받아들여보세요</li>
            <li><strong>개인차 인정:</strong> 모든 아이가 같은 방식으로 배우고 성장하지 않음을 기억하세요</li>
          </ul>
        </section>
        
        <section class="encouragement-section">
          <h2>지금 당신에게 필요한 말 한마디</h2>
          <p class="quote">"당신의 든든한 지원이, 아이에게는 세상을 단단하게 살아갈 힘이 됩니다."</p>
        </section>
        
        <section class="routine-section">
          <h2>작은 루틴 제안</h2>
          <ul>
            <li><strong>일주일에 한 번, 계획에 없던 즉흥적인 활동 시도하기.</strong> 예상치 못한 즐거움이 주는 가치를 경험해보세요.</li>
            <li>아이와 대화할 때 조언하기 전에 "어떻게 생각해?"라고 물어보는 습관을 들여보세요.</li>
          </ul>
        </section>

        <section class="couple-compatibility-section">
          <h2>배우자와의 관계 팁</h2>
          <ul>
            <li><strong>잘 맞는 파트너:</strong> ISFJ, ISTJ 유형의 배우자는 ESTJ의 체계적인 접근을 지지하고 안정된 가정 환경을 함께 만들어갑니다.</li>
            <li><strong>노력이 필요한 관계:</strong> INFP, ENFP 유형과는 구조와 자유에 대한 다른 관점으로 인해 갈등이 생길 수 있습니다.</li>
            <li><strong>조화로운 육아를 위해:</strong> 감정적 측면도 논리만큼 중요하다는 것을 인정하세요. 결정을 내릴 때 배우자의 직관과 감정적 통찰도 가치 있게 여기고, 때로는 계획에서 벗어나는 유연성을 보여주세요.</li>
          </ul>
        </section>

        <section class="illustration-section">
          <h2>당신의 하루를 위한 일러스트</h2>
          <div class="illustration-container">
            <div class="illustration-image">
              <img src="images/estj-illustration.jpg" alt="ESTJ 일러스트" id="type-illustration">
            </div>
            <p class="illustrated-quote">"단단한 기둥처럼, 당신의 원칙은 아이에게 흔들리지 않는 안전한 세상을 만듭니다."</p>
          </div>
        </section>
        
        <section class="items-section">
          <h2>✨ 체계적 실행형 부모를 위한 추천 아이템</h2>
          <div class="recommended-items">
            <div class="item-grid">
              <div class="item-card">
                <h3>가계부/가정관리 도구</h3>
                <p>효율적인 가정 운영을 위한 관리 용품</p>
                <div class="coupang-iframe">
                  <iframe src="https://coupa.ng/ciqXEy" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
                </div>
                <a href="https://link.coupang.com/a/cv0oPD" target="_blank" class="item-link">상품 보러가기</a>
              </div>
              
              <div class="item-card">
                <h3>교육스케줄러</h3>
                <p>아이의 학습 및 활동 일정 관리용</p>
                <div class="coupang-iframe">
                  <iframe src="https://coupa.ng/ciqXGi" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
                </div>
                <a href="https://link.coupang.com/a/cv0pmB" target="_blank" class="item-link">상품 보러가기</a>
              </div>
              
              <div class="item-card">
                <h3>생활습관 차트</h3>
                <p>규칙적인 생활패턴 형성을 위한 도구</p>
                <div class="coupang-iframe">
                  <iframe src="https://coupa.ng/ciqXG7" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
                </div>
                <a href="https://link.coupang.com/a/cv0pFo" target="_blank" class="item-link">상품 보러가기</a>
              </div>
            </div>
          </div>
          
          <div class="coupang-disclaimer">
            <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
          </div>
        </section>
      </div>
    `;
    
    document.getElementById('result-content').innerHTML = resultContent;
}


// ISFP 유형 결과 페이지
function showISFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">감성적 보호형 부모 (ISFP)</h1>
      <div class="result-subtitle">아이의 세계를 아름답게 그려주는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 개성과 감성을 소중히 여기는 따뜻한 부모입니다.</strong> 작은 순간의 기쁨을 함께 나누며, 자녀가 자신만의 방식으로 세상을 경험하도록 격려합니다. 당신의 수용적인 태도는 아이에게 <strong>안전한 정서적 안식처</strong>가 됩니다.</p>
        <p>때로는 균형을 찾는 과정에서 "아이에게 필요한 구조와 지침을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>순간의 아름다움을 발견하는 섬세함</li>
          <li>있는 그대로 받아들이는 따뜻한 수용력</li>
          <li>행동으로 사랑을 표현하는 진정성</li>
          <li>자신과 타인에게 진실한 정직함</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일상 구조화:</strong> 자유로운 표현과 함께 예측 가능한 일과의 안정감도 중요합니다</li>
          <li><strong>명확한 경계 설정:</strong> 조화를 중시하면서도 일관된 규칙과 기대치를 세워보세요</li>
          <li><strong>장기적 계획:</strong> 현재의 순간을 즐기면서도 미래를 위한 준비도 함께 해보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 부드러운 감성이, 아이에게는 세상에서 가장 따뜻한 안식처예요."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 같은 시간에 반복하는 한 가지 의식 만들기.</strong> 예를 들어, 저녁 식사 전 감사한 일 나누기 같은 간단하지만 의미 있는 시간을 가져보세요.</li>
          <li>주 1회, 가족 캘린더를 함께 확인하며 앞으로의 일정과 계획을 아이와 공유해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENFJ, ESFJ 유형의 배우자는 ISFP의 감성적 깊이에 방향성과 사회적 연결을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ENTJ, INTJ 유형과는 즉흥성과 계획성 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 자유로운 표현과 함께 일관된 구조의 중요성도 인정하세요. 배우자의 체계적 접근을 존중하고, 함께 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/isfp-illustration.jpg" alt="ISFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"봄날의 꽃처럼, 당신의 섬세한 마음은 아이의 세상을 아름답게 물들입니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 감성적 보호형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>자연친화 교구/가드닝</h3>
              <p>자연과 함께하는 교육 활동용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXHw" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0pXI" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>힐링 음악/명상음악</h3>
              <p>평온한 가정 분위기 조성용</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
            
            <div class="item-card">
              <h3>수공예품/핸드메이드 키트</h3>
              <p>손으로 직접 만드는 창작 활동용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXJq" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0quq" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ISFJ 유형 결과 페이지
function showISFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">섬세한 보호형 부모 (ISFJ)</h1>
      <div class="result-subtitle">아이의 모든 순간을 지키는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이를 위해 조용히 헌신하는 따뜻하고 신뢰할 수 있는 부모입니다.</strong> 세심한 관찰로 자녀의 필요를 파악하고, 안정적인 일상과 전통을 통해 안전한 환경을 만듭니다. 당신의 한결같은 보살핌은 아이에게 <strong>안정감과 신뢰의 기반</strong>이 됩니다.</p>
        <p>때로는 너무 많은 책임을 짊어지다 보니 "내가 충분히 쉬고 있을까? 과보호하고 있진 않을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점</h2>
        <ul>
          <li>변함없이 베푸는 충실한 사랑</li>
          <li>세세한 것까지 기억하는 섬세함</li>
          <li>실질적인 도움을 주는 현실감각</li>
          <li>흔들림 없는 내적 책임감</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>자기 돌봄:</strong> 타인을 보살피는 만큼 자신의 필요도 챙겨보세요</li>
          <li><strong>과보호 경계:</strong> 아이가 실수와 도전을 통해 배울 기회를 허용해보세요</li>
          <li><strong>변화 수용:</strong> 전통적 방식과 함께 새로운 접근법에도 열린 마음을 가져보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 한결같은 보살핌이, 아이에게는 인생의 가장 단단한 기반이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 30분, 오직 자신을 위한 휴식 시간 확보하기.</strong> 타인을 돌보는 것만큼 자신의 에너지를 충전하는 것도 중요합니다.</li>
          <li>아이가 작은 어려움에 처했을 때, 즉시 도와주기보다 "어떻게 해결하면 좋을까?"라고 먼저 물어보는 연습을 해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ESFJ, ESTJ 유형의 배우자는 ISFJ의 돌봄과 헌신을 이해하고 안정적인 가족 환경을 함께 조성합니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ENTP, INTP 유형과는 실용적 접근과 개념적 접근 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 모든 것을 혼자 책임지려 하지 말고 배우자와 책임을 나누세요. 아이의 독립성을 기르기 위해 때로는 한 발 물러서는 법을 배우고, 자신의 필요도 표현하세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/isfj-illustration.jpg" alt="ISFJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"견고한 나무처럼, 당신의 변함없는 사랑은 아이에게 평생의 안식처가 됩니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 섬세한 보호형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>건강 관리용품</h3>
              <p>아이 건강 체크와 관리를 위한 용품</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
            
            <div class="item-card">
              <h3>전통 교육교구</h3>
              <p>좋은 가치와 예의를 가르치는 교육 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXOW" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0rYn" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>보온/보냉용품</h3>
              <p>아이의 편안함을 챙기는 실용적 용품</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXQP" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0swc" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
document.getElementById('result-content').innerHTML = resultContent;
}

// ENFP 유형 결과 페이지
function showENFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">열정적 영감형 부모 (ENFP)</h1>
      <div class="result-subtitle">아이와 함께 성장하는 모험가</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이와 함께 삶의 모험을 즐기는 열정적이고 창의적인 부모입니다.</strong> 자녀의 독특한 개성을 존중하고, 다양한 가능성과 경험을 통해 성장하도록 격려합니다. 당신의 따뜻한 열정은 아이에게 <strong>무한한 가능성과 자유로운 표현</strong>의 세계를 열어줍니다.</p>
        <p>때로는 너무 많은 아이디어와 흥미 사이에서 "일관성과 안정감을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>삶을 빛내는 넘치는 열정</li>
          <li>모든 가능성을 보는 긍정적 시선</li>
          <li>아이의 마음을 열어주는 공감 능력</li>
          <li>규칙보다 중요한 가치를 아는 지혜</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일상적 구조 제공:</strong> 흥미롭고 새로운 경험과 함께 안정적인 일상 패턴도 중요합니다</li>
          <li><strong>일관성 유지:</strong> 다양한 아이디어 사이에서도 핵심 원칙을 지속적으로 지켜보세요</li>
          <li><strong>현실적 한계 설정:</strong> 모든 것이 가능하다는 태도와 함께 적절한 경계도 필요합니다</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 영감 가득한 에너지가, 아이에게는 세상을 탐험할 용기가 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>하루에 한 가지, 매일 같은 시간에 반복하는 소소한 의식 만들기.</strong> 예를 들어, 잠자리에 들기 전 5분 책 읽기 등 단순하지만 일관된 활동을 시도해보세요.</li>
          <li>새로운 프로젝트나 활동을 시작하기 전에, 현재 진행 중인 것을 마무리하는 습관을 의식적으로 기르세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/enfp-illustration.jpg" alt="ENFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"화려한 나비처럼, 당신의 다채로운 영감은 아이에게 삶의 무한한 가능성을 보여줍니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 열정적 영감형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>아이디어 노트/플래너</h3>
              <p>창의적 활동 계획과 아이와의 추억 기록용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV05" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ1iO" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>DIY/만들기 키트</h3>
              <p>아이와 함께할 수 있는 창작 활동 세트</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV3O" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ2a6" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>보드게임/가족게임</h3>
              <p>소통과 재미를 동시에 챙기는 가족 시간용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV55" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ2Ot" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENFJ 유형 결과 페이지
function showENFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">따뜻한 지도자형 부모 (ENFJ)</h1>
      <div class="result-subtitle">아이의 잠재력을 꽃피우는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 성장과 행복을 위해 열정적으로 헌신하는 카리스마 있는 부모입니다.</strong> 자녀의 잠재력을 알아보고 최선의 길로 인도하며, 따뜻한 지// 이 함수들을 showESTPResult() 함수 뒤에 추가하세요

// ESTJ 유형 결과 페이지
function showESTJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">체계적 실행형 부모 (ESTJ)</h1>
      <div class="result-subtitle">명확한 원칙으로 아이를 이끄는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이에게 명확한 구조와 안정감을 제공하는 책임감 있는 부모입니다.</strong> 일관된 규칙과 전통적 가치를 중요시하며, 자녀가 사회에서 성공하고 책임감 있는 구성원이 되도록 지도합니다. 당신의 체계적인 접근방식은 아이에게 <strong>안정감과 명확한 방향성</strong>을 제시합니다.</p>
        <p>때로는 원칙을 지키려다 보니 "아이의 개성과 유연성을 충분히 존중하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점</h2>
        <ul>
          <li>흔들림 없는 책임감</li>
          <li>일관된 원칙을 지키는 의지</li>
          <li>실질적 도움을 주는 실행력</li>
          <li>전통과 가치를 소중히 여기는 마음</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>감정적 민감성:</strong> 규칙과 원칙 외에도 아이의 감정적 필요에 더 주의를 기울여보세요</li>
          <li><strong>유연성 발휘:</strong> 때로는 계획에서 벗어나 자발적인 순간도 받아들여보세요</li>
          <li><strong>개인차 인정:</strong> 모든 아이가 같은 방식으로 배우고 성장하지 않음을 기억하세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 든든한 지원이, 아이에게는 세상을 단단하게 살아갈 힘이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>일주일에 한 번, 계획에 없던 즉흥적인 활동 시도하기.</strong> 예상치 못한 즐거움이 주는 가치를 경험해보세요.</li>
          <li>아이와 대화할 때 조언하기 전에 "어떻게 생각해?"라고 물어보는 습관을 들여보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ISFJ, ISTJ 유형의 배우자는 ESTJ의 체계적인 접근을 지지하고 안정된 가정 환경을 함께 만들어갑니다.</li>
          <li><strong>노력이 필요한 관계:</strong> INFP, ENFP 유형과는 구조와 자유에 대한 다른 관점으로 인해 갈등이 생길 수 있습니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 감정적 측면도 논리만큼 중요하다는 것을 인정하세요. 결정을 내릴 때 배우자의 직관과 감정적 통찰도 가치 있게 여기고, 때로는 계획에서 벗어나는 유연성을 보여주세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/estj-illustration.jpg" alt="ESTJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"단단한 기둥처럼, 당신의 원칙은 아이에게 흔들리지 않는 안전한 세상을 만듭니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 체계적 실행형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>가계부/가정관리 도구</h3>
              <p>효율적인 가정 운영을 위한 관리 용품</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXEy" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0oPD" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>교육스케줄러</h3>
              <p>아이의 학습 및 활동 일정 관리용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXGi" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0pmB" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>생활습관 차트</h3>
              <p>규칙적인 생활패턴 형성을 위한 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXG7" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0pFo" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ISFP 유형 결과 페이지
function showISFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">감성적 보호형 부모 (ISFP)</h1>
      <div class="result-subtitle">아이의 세계를 아름답게 그려주는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 개성과 감성을 소중히 여기는 따뜻한 부모입니다.</strong> 작은 순간의 기쁨을 함께 나누며, 자녀가 자신만의 방식으로 세상을 경험하도록 격려합니다. 당신의 수용적인 태도는 아이에게 <strong>안전한 정서적 안식처</strong>가 됩니다.</p>
        <p>때로는 균형을 찾는 과정에서 "아이에게 필요한 구조와 지침을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>순간의 아름다움을 발견하는 섬세함</li>
          <li>있는 그대로 받아들이는 따뜻한 수용력</li>
          <li>행동으로 사랑을 표현하는 진정성</li>
          <li>자신과 타인에게 진실한 정직함</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일상 구조화:</strong> 자유로운 표현과 함께 예측 가능한 일과의 안정감도 중요합니다</li>
          <li><strong>명확한 경계 설정:</strong> 조화를 중시하면서도 일관된 규칙과 기대치를 세워보세요</li>
          <li><strong>장기적 계획:</strong> 현재의 순간을 즐기면서도 미래를 위한 준비도 함께 해보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 부드러운 감성이, 아이에게는 세상에서 가장 따뜻한 안식처예요."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 같은 시간에 반복하는 한 가지 의식 만들기.</strong> 예를 들어, 저녁 식사 전 감사한 일 나누기 같은 간단하지만 의미 있는 시간을 가져보세요.</li>
          <li>주 1회, 가족 캘린더를 함께 확인하며 앞으로의 일정과 계획을 아이와 공유해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENFJ, ESFJ 유형의 배우자는 ISFP의 감성적 깊이에 방향성과 사회적 연결을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ENTJ, INTJ 유형과는 즉흥성과 계획성 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 자유로운 표현과 함께 일관된 구조의 중요성도 인정하세요. 배우자의 체계적 접근을 존중하고, 함께 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/isfp-illustration.jpg" alt="ISFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"봄날의 꽃처럼, 당신의 섬세한 마음은 아이의 세상을 아름답게 물들입니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 감성적 보호형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>자연친화 교구/가드닝</h3>
              <p>자연과 함께하는 교육 활동용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXHw" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0pXI" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>힐링 음악/명상음악</h3>
              <p>평온한 가정 분위기 조성용</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
            
            <div class="item-card">
              <h3>수공예품/핸드메이드 키트</h3>
              <p>손으로 직접 만드는 창작 활동용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXJq" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0quq" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ISFJ 유형 결과 페이지
function showISFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">섬세한 보호형 부모 (ISFJ)</h1>
      <div class="result-subtitle">아이의 모든 순간을 지키는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이를 위해 조용히 헌신하는 따뜻하고 신뢰할 수 있는 부모입니다.</strong> 세심한 관찰로 자녀의 필요를 파악하고, 안정적인 일상과 전통을 통해 안전한 환경을 만듭니다. 당신의 한결같은 보살핌은 아이에게 <strong>안정감과 신뢰의 기반</strong>이 됩니다.</p>
        <p>때로는 너무 많은 책임을 짊어지다 보니 "내가 충분히 쉬고 있을까? 과보호하고 있진 않을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점</h2>
        <ul>
          <li>변함없이 베푸는 충실한 사랑</li>
          <li>세세한 것까지 기억하는 섬세함</li>
          <li>실질적인 도움을 주는 현실감각</li>
          <li>흔들림 없는 내적 책임감</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>자기 돌봄:</strong> 타인을 보살피는 만큼 자신의 필요도 챙겨보세요</li>
          <li><strong>과보호 경계:</strong> 아이가 실수와 도전을 통해 배울 기회를 허용해보세요</li>
          <li><strong>변화 수용:</strong> 전통적 방식과 함께 새로운 접근법에도 열린 마음을 가져보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 한결같은 보살핌이, 아이에게는 인생의 가장 단단한 기반이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 30분, 오직 자신을 위한 휴식 시간 확보하기.</strong> 타인을 돌보는 것만큼 자신의 에너지를 충전하는 것도 중요합니다.</li>
          <li>아이가 작은 어려움에 처했을 때, 즉시 도와주기보다 "어떻게 해결하면 좋을까?"라고 먼저 물어보는 연습을 해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ESFJ, ESTJ 유형의 배우자는 ISFJ의 돌봄과 헌신을 이해하고 안정적인 가족 환경을 함께 조성합니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ENTP, INTP 유형과는 실용적 접근과 개념적 접근 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 모든 것을 혼자 책임지려 하지 말고 배우자와 책임을 나누세요. 아이의 독립성을 기르기 위해 때로는 한 발 물러서는 법을 배우고, 자신의 필요도 표현하세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/isfj-illustration.jpg" alt="ISFJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"견고한 나무처럼, 당신의 변함없는 사랑은 아이에게 평생의 안식처가 됩니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 섬세한 보호형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>건강 관리용품</h3>
              <p>아이 건강 체크와 관리를 위한 용품</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
            
            <div class="item-card">
              <h3>전통 교육교구</h3>
              <p>좋은 가치와 예의를 가르치는 교육 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXOW" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0rYn" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>보온/보냉용품</h3>
              <p>아이의 편안함을 챙기는 실용적 용품</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXQP" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0swc" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENFP 유형 결과 페이지
function showENFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">열정적 영감형 부모 (ENFP)</h1>
      <div class="result-subtitle">아이와 함께 성장하는 모험가</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이와 함께 삶의 모험을 즐기는 열정적이고 창의적인 부모입니다.</strong> 자녀의 독특한 개성을 존중하고, 다양한 가능성과 경험을 통해 성장하도록 격려합니다. 당신의 따뜻한 열정은 아이에게 <strong>무한한 가능성과 자유로운 표현</strong>의 세계를 열어줍니다.</p>
        <p>때로는 너무 많은 아이디어와 흥미 사이에서 "일관성과 안정감을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>삶을 빛내는 넘치는 열정</li>
          <li>모든 가능성을 보는 긍정적 시선</li>
          <li>아이의 마음을 열어주는 공감 능력</li>
          <li>규칙보다 중요한 가치를 아는 지혜</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일상적 구조 제공:</strong> 흥미롭고 새로운 경험과 함께 안정적인 일상 패턴도 중요합니다</li>
          <li><strong>일관성 유지:</strong> 다양한 아이디어 사이에서도 핵심 원칙을 지속적으로 지켜보세요</li>
          <li><strong>현실적 한계 설정:</strong> 모든 것이 가능하다는 태도와 함께 적절한 경계도 필요합니다</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 영감 가득한 에너지가, 아이에게는 세상을 탐험할 용기가 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>하루에 한 가지, 매일 같은 시간에 반복하는 소소한 의식 만들기.</strong> 예를 들어, 잠자리에 들기 전 5분 책 읽기 등 단순하지만 일관된 활동을 시도해보세요.</li>
          <li>새로운 프로젝트나 활동을 시작하기 전에, 현재 진행 중인 것을 마무리하는 습관을 의식적으로 기르세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/enfp-illustration.jpg" alt="ENFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"화려한 나비처럼, 당신의 다채로운 영감은 아이에게 삶의 무한한 가능성을 보여줍니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 열정적 영감형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>아이디어 노트/플래너</h3>
              <p>창의적 활동 계획과 아이와의 추억 기록용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV05" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ1iO" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>DIY/만들기 키트</h3>
              <p>아이와 함께할 수 있는 창작 활동 세트</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV3O" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ2a6" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>보드게임/가족게임</h3>
              <p>소통과 재미를 동시에 챙기는 가족 시간용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV55" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ2Ot" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENFJ 유형 결과 페이지
function showENFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">따뜻한 지도자형 부모 (ENFJ)</h1>
      <div class="result-subtitle">아이의 잠재력을 꽃피우는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 성장과 행복을 위해 열정적으로 헌신하는 카리스마 있는 부모입니다.</strong> 자녀의 잠재력을 알아보고 최선의 길로 인도하며, 따뜻한 지지와 격려를 아끼지 않습니다. 당신의 진정성과 열정은 아이에게 <strong>긍정적 영향력과 자신감</strong>을 심어줍니다.</p>
        <p>때로는 타인을 위해 너무 많은 것을 주다 보니 "나 자신은 충분히 돌보고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점</h2>
        <ul>
          <li>사람의 마음을 움직이는 카리스마</li>
          <li>타인의 필요를 알아채는 민감성</li>
          <li>변함없이 지지하는 따뜻함</li>
          <li>긍정적인 변화를 이끄는 영향력</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>자기 돌봄:</strong> 타인을 돌보는 만큼 자신의 필요도 소중히 여겨보세요</li>
          <li><strong>비판적 사고 장려:</strong> 조화와 함께 건강한 의견 차이도 가치 있게 여겨보세요</li>
          <li><strong>과잉보호 경계:</strong> 아이가 실패와 좌절을 통해 배울 수 있는 공간을 허용해보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 따뜻한 지지가, 아이에게는 세상을 바꿀 수 있는 자신감이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 15분, 온전히 자신만을 위한 시간 확보하기.</strong> 타인을 위해 에너지를 쏟는 당신, 자신을 채우는 시간도 필요합니다.</li>
          <li>하루에 한 번, 아이에게 "네가 실수해도 괜찮아"라고 말해주는 순간을 의식적으로 만들어보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> INFP, ISFP 유형의 배우자는 ENFJ의 열정과 카리스마에 깊이와 진정성을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ISTP, INTP 유형과는 감정 중심과 논리 중심의 접근 방식 차이로 오해가 생길 수 있습니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 조화를 중시하는 만큼 건강한 의견 차이의 중요성도 인정하세요. 배우자의 분석적 접근도 존중하고, 함께 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/enfj-illustration.jpg" alt="ENFJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"따스한 햇살처럼, 당신의 사랑은 아이의 모든 가능성을 꽃피웁니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 따뜻한 지도자형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>육아서/교육서적</h3>
              <p>아이 발달과 교육에 대한 전문 지식 습득용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV7o" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ3bB" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>감정표현 교구/카드</h3>
              <p>아이의 감정 발달을 돕는 교육 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWbJ" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ4fi" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>가족 사진액자/앨범</h3>
              <p>소중한 가족 순간들을 기록하고 전시하는 용품</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWc2" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ4AB" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENTP 유형 결과 페이지
function showENTPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">창의적 도전형 부모 (ENTP)</h1>
      <div class="result-subtitle">가능성의 세계로 아이를 이끄는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 호기심과 창의력을 자극하는 혁신적인 부모입니다.</strong> 관습에 얽매이지 않고 새로운 아이디어와 경험을 장려하며, 자녀가 다양한 관점에서 세상을 바라보도록 돕습니다. 당신의 지적 활력은 아이에게 <strong>창의적 사고와 도전 정신</strong>을 불어넣습니다.</p>
        <p>때로는 다음 흥미로운 아이디어에 집중하느라 "지속성과 일관성을 유지하고 있을까?" 하는 의문이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>끝없이 샘솟는 창의력</li>
          <li>틀을 깨는 독창적 사고</li>
          <li>모험과 도전을 즐기는 용기</li>
          <li>아이의 가능성을 믿는 열정</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일관성 유지:</strong> 여러 아이디어 사이에서도 중요한 일상의 구조와 안정감을 제공해보세요</li>
          <li><strong>감정적 지지:</strong> 지적 탐험만큼 정서적 연결도 소중히 여겨보세요</li>
          <li><strong>실행력 강화:</strong> 흥미로운 계획을 끝까지 실행하는 노력이 도움됩니다</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 창의적인 에너지가, 아이에게는 무한한 가능성을 보는 눈이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 5분, 가장 기본적인 루틴 하나를 정해 꾸준히 지키기.</strong> 단순한 일상 습관(예: 같은 시간 식사, 일정한 취침 시간)이 아이에게 주는 안정감을 경험해보세요.</li>
          <li>새로운 프로젝트를 시작하기 전에, 현재 진행 중인 활동을 마무리하는 시간을 의식적으로 가져보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> INFJ, INTJ 유형의 배우자는 ENTP의 창의적 사고에 깊이와 일관성을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ISFJ, ESFJ 유형과는 혁신과 전통 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 새로운 아이디어와 함께 일상의 안정성도 아이에게 필요함을 인정하세요. 배우자의 체계적이고 감정적인 접근도 존중하고, 함께 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/entp-illustration.jpg" alt="ENTP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"번개처럼 빛나는 당신의 아이디어는, 아이에게 새로운 세계의 문을 열어줍니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 창의적 도전형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>과학실험키트/STEM 교구</h3>
              <p>호기심 자극하는 체험형 학습도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWfT" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ5d3" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>여행용품/캠핑용품</h3>
              <p>아이와의 모험과 새로운 경험을 위한 준비물</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWhM" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ5EV" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>퍼즐/브레인티저 게임</h3>
              <p>논리적 사고력 개발하는 두뇌 게임</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWle" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ6At" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}// 이 함수들을 showESTPResult() 함수 뒤에 추가하세요

// ESTJ 유형 결과 페이지
function showESTJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">체계적 실행형 부모 (ESTJ)</h1>
      <div class="result-subtitle">명확한 원칙으로 아이를 이끄는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이에게 명확한 구조와 안정감을 제공하는 책임감 있는 부모입니다.</strong> 일관된 규칙과 전통적 가치를 중요시하며, 자녀가 사회에서 성공하고 책임감 있는 구성원이 되도록 지도합니다. 당신의 체계적인 접근방식은 아이에게 <strong>안정감과 명확한 방향성</strong>을 제시합니다.</p>
        <p>때로는 원칙을 지키려다 보니 "아이의 개성과 유연성을 충분히 존중하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점</h2>
        <ul>
          <li>흔들림 없는 책임감</li>
          <li>일관된 원칙을 지키는 의지</li>
          <li>실질적 도움을 주는 실행력</li>
          <li>전통과 가치를 소중히 여기는 마음</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>감정적 민감성:</strong> 규칙과 원칙 외에도 아이의 감정적 필요에 더 주의를 기울여보세요</li>
          <li><strong>유연성 발휘:</strong> 때로는 계획에서 벗어나 자발적인 순간도 받아들여보세요</li>
          <li><strong>개인차 인정:</strong> 모든 아이가 같은 방식으로 배우고 성장하지 않음을 기억하세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 든든한 지원이, 아이에게는 세상을 단단하게 살아갈 힘이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>일주일에 한 번, 계획에 없던 즉흥적인 활동 시도하기.</strong> 예상치 못한 즐거움이 주는 가치를 경험해보세요.</li>
          <li>아이와 대화할 때 조언하기 전에 "어떻게 생각해?"라고 물어보는 습관을 들여보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ISFJ, ISTJ 유형의 배우자는 ESTJ의 체계적인 접근을 지지하고 안정된 가정 환경을 함께 만들어갑니다.</li>
          <li><strong>노력이 필요한 관계:</strong> INFP, ENFP 유형과는 구조와 자유에 대한 다른 관점으로 인해 갈등이 생길 수 있습니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 감정적 측면도 논리만큼 중요하다는 것을 인정하세요. 결정을 내릴 때 배우자의 직관과 감정적 통찰도 가치 있게 여기고, 때로는 계획에서 벗어나는 유연성을 보여주세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/estj-illustration.jpg" alt="ESTJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"단단한 기둥처럼, 당신의 원칙은 아이에게 흔들리지 않는 안전한 세상을 만듭니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 체계적 실행형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>가계부/가정관리 도구</h3>
              <p>효율적인 가정 운영을 위한 관리 용품</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXEy" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0oPD" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>교육스케줄러</h3>
              <p>아이의 학습 및 활동 일정 관리용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXGi" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0pmB" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>생활습관 차트</h3>
              <p>규칙적인 생활패턴 형성을 위한 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXG7" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0pFo" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ISFP 유형 결과 페이지
function showISFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">감성적 보호형 부모 (ISFP)</h1>
      <div class="result-subtitle">아이의 세계를 아름답게 그려주는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 개성과 감성을 소중히 여기는 따뜻한 부모입니다.</strong> 작은 순간의 기쁨을 함께 나누며, 자녀가 자신만의 방식으로 세상을 경험하도록 격려합니다. 당신의 수용적인 태도는 아이에게 <strong>안전한 정서적 안식처</strong>가 됩니다.</p>
        <p>때로는 균형을 찾는 과정에서 "아이에게 필요한 구조와 지침을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>순간의 아름다움을 발견하는 섬세함</li>
          <li>있는 그대로 받아들이는 따뜻한 수용력</li>
          <li>행동으로 사랑을 표현하는 진정성</li>
          <li>자신과 타인에게 진실한 정직함</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일상 구조화:</strong> 자유로운 표현과 함께 예측 가능한 일과의 안정감도 중요합니다</li>
          <li><strong>명확한 경계 설정:</strong> 조화를 중시하면서도 일관된 규칙과 기대치를 세워보세요</li>
          <li><strong>장기적 계획:</strong> 현재의 순간을 즐기면서도 미래를 위한 준비도 함께 해보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 부드러운 감성이, 아이에게는 세상에서 가장 따뜻한 안식처예요."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 같은 시간에 반복하는 한 가지 의식 만들기.</strong> 예를 들어, 저녁 식사 전 감사한 일 나누기 같은 간단하지만 의미 있는 시간을 가져보세요.</li>
          <li>주 1회, 가족 캘린더를 함께 확인하며 앞으로의 일정과 계획을 아이와 공유해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENFJ, ESFJ 유형의 배우자는 ISFP의 감성적 깊이에 방향성과 사회적 연결을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ENTJ, INTJ 유형과는 즉흥성과 계획성 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 자유로운 표현과 함께 일관된 구조의 중요성도 인정하세요. 배우자의 체계적 접근을 존중하고, 함께 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/isfp-illustration.jpg" alt="ISFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"봄날의 꽃처럼, 당신의 섬세한 마음은 아이의 세상을 아름답게 물들입니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 감성적 보호형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>자연친화 교구/가드닝</h3>
              <p>자연과 함께하는 교육 활동용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXHw" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0pXI" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>힐링 음악/명상음악</h3>
              <p>평온한 가정 분위기 조성용</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
            
            <div class="item-card">
              <h3>수공예품/핸드메이드 키트</h3>
              <p>손으로 직접 만드는 창작 활동용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXJq" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0quq" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ISFJ 유형 결과 페이지
function showISFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">섬세한 보호형 부모 (ISFJ)</h1>
      <div class="result-subtitle">아이의 모든 순간을 지키는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이를 위해 조용히 헌신하는 따뜻하고 신뢰할 수 있는 부모입니다.</strong> 세심한 관찰로 자녀의 필요를 파악하고, 안정적인 일상과 전통을 통해 안전한 환경을 만듭니다. 당신의 한결같은 보살핌은 아이에게 <strong>안정감과 신뢰의 기반</strong>이 됩니다.</p>
        <p>때로는 너무 많은 책임을 짊어지다 보니 "내가 충분히 쉬고 있을까? 과보호하고 있진 않을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점</h2>
        <ul>
          <li>변함없이 베푸는 충실한 사랑</li>
          <li>세세한 것까지 기억하는 섬세함</li>
          <li>실질적인 도움을 주는 현실감각</li>
          <li>흔들림 없는 내적 책임감</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>자기 돌봄:</strong> 타인을 보살피는 만큼 자신의 필요도 챙겨보세요</li>
          <li><strong>과보호 경계:</strong> 아이가 실수와 도전을 통해 배울 기회를 허용해보세요</li>
          <li><strong>변화 수용:</strong> 전통적 방식과 함께 새로운 접근법에도 열린 마음을 가져보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 한결같은 보살핌이, 아이에게는 인생의 가장 단단한 기반이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 30분, 오직 자신을 위한 휴식 시간 확보하기.</strong> 타인을 돌보는 것만큼 자신의 에너지를 충전하는 것도 중요합니다.</li>
          <li>아이가 작은 어려움에 처했을 때, 즉시 도와주기보다 "어떻게 해결하면 좋을까?"라고 먼저 물어보는 연습을 해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ESFJ, ESTJ 유형의 배우자는 ISFJ의 돌봄과 헌신을 이해하고 안정적인 가족 환경을 함께 조성합니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ENTP, INTP 유형과는 실용적 접근과 개념적 접근 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 모든 것을 혼자 책임지려 하지 말고 배우자와 책임을 나누세요. 아이의 독립성을 기르기 위해 때로는 한 발 물러서는 법을 배우고, 자신의 필요도 표현하세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/isfj-illustration.jpg" alt="ISFJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"견고한 나무처럼, 당신의 변함없는 사랑은 아이에게 평생의 안식처가 됩니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 섬세한 보호형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>건강 관리용품</h3>
              <p>아이 건강 체크와 관리를 위한 용품</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
            
            <div class="item-card">
              <h3>전통 교육교구</h3>
              <p>좋은 가치와 예의를 가르치는 교육 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXOW" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0rYn" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>보온/보냉용품</h3>
              <p>아이의 편안함을 챙기는 실용적 용품</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXQP" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0swc" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENTJ 유형 결과 페이지
function showENTJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">목표 지향형 부모 (ENTJ)</h1>
      <div class="result-subtitle">아이의 잠재력을 이끌어내는 리더</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 성장과 성공을 위해 열정적으로 이끄는 리더십 있는 부모입니다.</strong> 명확한 목표와 기대치를 설정하며, 자녀가 최고의 잠재력을 발휘하도록 격려합니다. 당신의 결단력과 추진력은 아이에게 <strong>자신감과 성취의 길</strong>을 열어줍니다.</p>
        <p>때로는 높은 기준과 기대치로 인해 "내 기대가 아이에게 부담이 되진 않을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>흔들림 없는 리더십</li>
          <li>효율적으로 문제를 해결하는 능력</li>
          <li>아이의 잠재력을 보는 통찰력</li>
          <li>목표를 향해 나아가는 추진력</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>감정적 민감성:</strong> 효율성만큼 아이의 감정과 필요도 소중히 여겨보세요</li>
          <li><strong>인내심 기르기:</strong> 모든 성장 과정에는 시간이 필요하다는 것을 기억하세요</li>
          <li><strong>유연성 발휘:</strong> 계획이 변경될 때도 적응하는 여유를 가져보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 강한 의지가, 아이에게는 세상을 헤쳐나갈 용기가 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>주 1회, 목표 없이 아이와 즐기는 시간 만들기.</strong> 결과보다 과정을 즐기는 활동(예: 자유롭게 그림 그리기, 공원 산책)을 시도해보세요.</li>
          <li>매일 저녁 5분간, 아이의 감정과 생각을 판단 없이 들어보는 시간을 가져보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> INFP, INTP 유형의 배우자는 ENTJ의 목표 지향적 접근에 깊이와 다양한 관점을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ISFP, ESFP 유형과는 효율성과 즉흥성 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 효율성과 성취만큼 감정적 연결과 놀이의 중요성도 인정하세요. 배우자의 감성적 접근을 존중하고, 함께 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/entj-illustration.jpg" alt="ENTJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"높은 산을 오르듯, 당신은 언제나 더 높은 목표를 향해 아이의 손을 잡아줍니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 목표 지향형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>학습 계획표/시간관리 도구</h3>
              <p>체계적인 일정 관리와 목표 설정용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWmD" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ6V8" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>어린이 경제교육 교구</h3>
              <p>실용적 생활 기술 교육을 위한 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWpe" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ7Fs" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>스마트 학습기기/태블릿</h3>
              <p>효율적인 디지털 학습 환경 구축용</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// 나머지 함수들도 계속 추가해야 합니다:
// showINFPResult(), showINTPResult(), showINTJResult(), showINFJResult(), showESFPResult(), showESFJResult()

// ENFP 유형 결과 페이지
function showENFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">열정적 영감형 부모 (ENFP)</h1>
      <div class="result-subtitle">아이와 함께 성장하는 모험가</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이와 함께 삶의 모험을 즐기는 열정적이고 창의적인 부모입니다.</strong> 자녀의 독특한 개성을 존중하고, 다양한 가능성과 경험을 통해 성장하도록 격려합니다. 당신의 따뜻한 열정은 아이에게 <strong>무한한 가능성과 자유로운 표현</strong>의 세계를 열어줍니다.</p>
        <p>때로는 너무 많은 아이디어와 흥미 사이에서 "일관성과 안정감을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>삶을 빛내는 넘치는 열정</li>
          <li>모든 가능성을 보는 긍정적 시선</li>
          <li>아이의 마음을 열어주는 공감 능력</li>
          <li>규칙보다 중요한 가치를 아는 지혜</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일상적 구조 제공:</strong> 흥미롭고 새로운 경험과 함께 안정적인 일상 패턴도 중요합니다</li>
          <li><strong>일관성 유지:</strong> 다양한 아이디어 사이에서도 핵심 원칙을 지속적으로 지켜보세요</li>
          <li><strong>현실적 한계 설정:</strong> 모든 것이 가능하다는 태도와 함께 적절한 경계도 필요합니다</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 영감 가득한 에너지가, 아이에게는 세상을 탐험할 용기가 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>하루에 한 가지, 매일 같은 시간에 반복하는 소소한 의식 만들기.</strong> 예를 들어, 잠자리에 들기 전 5분 책 읽기 등 단순하지만 일관된 활동을 시도해보세요.</li>
          <li>새로운 프로젝트나 활동을 시작하기 전에, 현재 진행 중인 것을 마무리하는 습관을 의식적으로 기르세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/enfp-illustration.jpg" alt="ENFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"화려한 나비처럼, 당신의 다채로운 영감은 아이에게 삶의 무한한 가능성을 보여줍니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 열정적 영감형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>아이디어 노트/플래너</h3>
              <p>창의적 활동 계획과 아이와의 추억 기록용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV05" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ1iO" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>DIY/만들기 키트</h3>
              <p>아이와 함께할 수 있는 창작 활동 세트</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV3O" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ2a6" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>보드게임/가족게임</h3>
              <p>소통과 재미를 동시에 챙기는 가족 시간용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV55" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ2Ot" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENFJ 유형 결과 페이지
function showENFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">따뜻한 지도자형 부모 (ENFJ)</h1>
      <div class="result-subtitle">아이의 잠재력을 꽃피우는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 성장과 행복을 위해 열정적으로 헌신하는 카리스마 있는 부모입니다.</strong> 자녀의 잠재력을 알아보고 최선의 길로 인도하며, 따뜻한 지지와 격려를 아끼지 않습니다. 당신의 진정성과 열정은 아이에게 <strong>긍정적 영향력과 자신감</strong>을 심어줍니다.</p>
        <p>때로는 타인을 위해 너무 많은 것을 주다 보니 "나 자신은 충분히 돌보고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점</h2>
        <ul>
          <li>사람의 마음을 움직이는 카리스마</li>
          <li>타인의 필요를 알아채는 민감성</li>
          <li>변함없이 지지하는 따뜻함</li>
          <li>긍정적인 변화를 이끄는 영향력</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>자기 돌봄:</strong> 타인을 돌보는 만큼 자신의 필요도 소중히 여겨보세요</li>
          <li><strong>비판적 사고 장려:</strong> 조화와 함께 건강한 의견 차이도 가치 있게 여겨보세요</li>
          <li><strong>과잉보호 경계:</strong> 아이가 실패와 좌절을 통해 배울 수 있는 공간을 허용해보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 따뜻한 지지가, 아이에게는 세상을 바꿀 수 있는 자신감이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 15분, 온전히 자신만을 위한 시간 확보하기.</strong> 타인을 위해 에너지를 쏟는 당신, 자신을 채우는 시간도 필요합니다.</li>
          <li>하루에 한 번, 아이에게 "네가 실수해도 괜찮아"라고 말해주는 순간을 의식적으로 만들어보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> INFP, ISFP 유형의 배우자는 ENFJ의 열정과 카리스마에 깊이와 진정성을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ISTP, INTP 유형과는 감정 중심과 논리 중심의 접근 방식 차이로 오해가 생길 수 있습니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 조화를 중시하는 만큼 건강한 의견 차이의 중요성도 인정하세요. 배우자의 분석적 접근도 존중하고, 함께 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/enfj-illustration.jpg" alt="ENFJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"따스한 햇살처럼, 당신의 사랑은 아이의 모든 가능성을 꽃피웁니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 따뜻한 지도자형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>육아서/교육서적</h3>
              <p>아이 발달과 교육에 대한 전문 지식 습득용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqV7o" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ3bB" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>감정표현 교구/카드</h3>
              <p>아이의 감정 발달을 돕는 교육 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWbJ" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ4fi" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>가족 사진액자/앨범</h3>
              <p>소중한 가족 순간들을 기록하고 전시하는 용품</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWc2" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ4AB" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENTP 유형 결과 페이지
function showENTPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">창의적 도전형 부모 (ENTP)</h1>
      <div class="result-subtitle">가능성의 세계로 아이를 이끄는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 호기심과 창의력을 자극하는 혁신적인 부모입니다.</strong> 관습에 얽매이지 않고 새로운 아이디어와 경험을 장려하며, 자녀가 다양한 관점에서 세상을 바라보도록 돕습니다. 당신의 지적 활력은 아이에게 <strong>창의적 사고와 도전 정신</strong>을 불어넣습니다.</p>
        <p>때로는 다음 흥미로운 아이디어에 집중하느라 "지속성과 일관성을 유지하고 있을까?" 하는 의문이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>끝없이 샘솟는 창의력</li>
          <li>틀을 깨는 독창적 사고</li>
          <li>모험과 도전을 즐기는 용기</li>
          <li>아이의 가능성을 믿는 열정</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일관성 유지:</strong> 여러 아이디어 사이에서도 중요한 일상의 구조와 안정감을 제공해보세요</li>
          <li><strong>감정적 지지:</strong> 지적 탐험만큼 정서적 연결도 소중히 여겨보세요</li>
          <li><strong>실행력 강화:</strong> 흥미로운 계획을 끝까지 실행하는 노력이 도움됩니다</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 창의적인 에너지가, 아이에게는 무한한 가능성을 보는 눈이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 5분, 가장 기본적인 루틴 하나를 정해 꾸준히 지키기.</strong> 단순한 일상 습관(예: 같은 시간 식사, 일정한 취침 시간)이 아이에게 주는 안정감을 경험해보세요.</li>
          <li>새로운 프로젝트를 시작하기 전에, 현재 진행 중인 활동을 마무리하는 시간을 의식적으로 가져보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> INFJ, INTJ 유형의 배우자는 ENTP의 창의적 사고에 깊이와 일관성을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ISFJ, ESFJ 유형과는 혁신과 전통 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 새로운 아이디어와 함께 일상의 안정성도 아이에게 필요함을 인정하세요. 배우자의 체계적이고 감정적인 접근도 존중하고, 함께 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/entp-illustration.jpg" alt="ENTP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"번개처럼 빛나는 당신의 아이디어는, 아이에게 새로운 세계의 문을 열어줍니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 창의적 도전형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>과학실험키트/STEM 교구</h3>
              <p>호기심 자극하는 체험형 학습도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWfT" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ5d3" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>여행용품/캠핑용품</h3>
              <p>아이와의 모험과 새로운 경험을 위한 준비물</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWhM" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ5EV" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>퍼즐/브레인티저 게임</h3>
              <p>논리적 사고력 개발하는 두뇌 게임</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWle" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ6At" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}// 이 함수들을 showESTPResult() 함수 뒤에 추가하세요

// ESTJ 유형 결과 페이지
function showESTJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">체계적 실행형 부모 (ESTJ)</h1>
      <div class="result-subtitle">명확한 원칙으로 아이를 이끄는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이에게 명확한 구조와 안정감을 제공하는 책임감 있는 부모입니다.</strong> 일관된 규칙과 전통적 가치를 중요시하며, 자녀가 사회에서 성공하고 책임감 있는 구성원이 되도록 지도합니다. 당신의 체계적인 접근방식은 아이에게 <strong>안정감과 명확한 방향성</strong>을 제시합니다.</p>
        <p>때로는 원칙을 지키려다 보니 "아이의 개성과 유연성을 충분히 존중하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점</h2>
        <ul>
          <li>흔들림 없는 책임감</li>
          <li>일관된 원칙을 지키는 의지</li>
          <li>실질적 도움을 주는 실행력</li>
          <li>전통과 가치를 소중히 여기는 마음</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>감정적 민감성:</strong> 규칙과 원칙 외에도 아이의 감정적 필요에 더 주의를 기울여보세요</li>
          <li><strong>유연성 발휘:</strong> 때로는 계획에서 벗어나 자발적인 순간도 받아들여보세요</li>
          <li><strong>개인차 인정:</strong> 모든 아이가 같은 방식으로 배우고 성장하지 않음을 기억하세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 든든한 지원이, 아이에게는 세상을 단단하게 살아갈 힘이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>일주일에 한 번, 계획에 없던 즉흥적인 활동 시도하기.</strong> 예상치 못한 즐거움이 주는 가치를 경험해보세요.</li>
          <li>아이와 대화할 때 조언하기 전에 "어떻게 생각해?"라고 물어보는 습관을 들여보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ISFJ, ISTJ 유형의 배우자는 ESTJ의 체계적인 접근을 지지하고 안정된 가정 환경을 함께 만들어갑니다.</li>
          <li><strong>노력이 필요한 관계:</strong> INFP, ENFP 유형과는 구조와 자유에 대한 다른 관점으로 인해 갈등이 생길 수 있습니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 감정적 측면도 논리만큼 중요하다는 것을 인정하세요. 결정을 내릴 때 배우자의 직관과 감정적 통찰도 가치 있게 여기고, 때로는 계획에서 벗어나는 유연성을 보여주세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/estj-illustration.jpg" alt="ESTJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"단단한 기둥처럼, 당신의 원칙은 아이에게 흔들리지 않는 안전한 세상을 만듭니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 체계적 실행형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>가계부/가정관리 도구</h3>
              <p>효율적인 가정 운영을 위한 관리 용품</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXEy" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0oPD" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>교육스케줄러</h3>
              <p>아이의 학습 및 활동 일정 관리용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXGi" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0pmB" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>생활습관 차트</h3>
              <p>규칙적인 생활패턴 형성을 위한 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXG7" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0pFo" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ISFP 유형 결과 페이지
function showISFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">감성적 보호형 부모 (ISFP)</h1>
      <div class="result-subtitle">아이의 세계를 아름답게 그려주는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 개성과 감성을 소중히 여기는 따뜻한 부모입니다.</strong> 작은 순간의 기쁨을 함께 나누며, 자녀가 자신만의 방식으로 세상을 경험하도록 격려합니다. 당신의 수용적인 태도는 아이에게 <strong>안전한 정서적 안식처</strong>가 됩니다.</p>
        <p>때로는 균형을 찾는 과정에서 "아이에게 필요한 구조와 지침을 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>순간의 아름다움을 발견하는 섬세함</li>
          <li>있는 그대로 받아들이는 따뜻한 수용력</li>
          <li>행동으로 사랑을 표현하는 진정성</li>
          <li>자신과 타인에게 진실한 정직함</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일상 구조화:</strong> 자유로운 표현과 함께 예측 가능한 일과의 안정감도 중요합니다</li>
          <li><strong>명확한 경계 설정:</strong> 조화를 중시하면서도 일관된 규칙과 기대치를 세워보세요</li>
          <li><strong>장기적 계획:</strong> 현재의 순간을 즐기면서도 미래를 위한 준비도 함께 해보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 부드러운 감성이, 아이에게는 세상에서 가장 따뜻한 안식처예요."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 같은 시간에 반복하는 한 가지 의식 만들기.</strong> 예를 들어, 저녁 식사 전 감사한 일 나누기 같은 간단하지만 의미 있는 시간을 가져보세요.</li>
          <li>주 1회, 가족 캘린더를 함께 확인하며 앞으로의 일정과 계획을 아이와 공유해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENFJ, ESFJ 유형의 배우자는 ISFP의 감성적 깊이에 방향성과 사회적 연결을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ENTJ, INTJ 유형과는 즉흥성과 계획성 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 자유로운 표현과 함께 일관된 구조의 중요성도 인정하세요. 배우자의 체계적 접근을 존중하고, 함께 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/isfp-illustration.jpg" alt="ISFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"봄날의 꽃처럼, 당신의 섬세한 마음은 아이의 세상을 아름답게 물들입니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 감성적 보호형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>자연친화 교구/가드닝</h3>
              <p>자연과 함께하는 교육 활동용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXHw" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0pXI" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>힐링 음악/명상음악</h3>
              <p>평온한 가정 분위기 조성용</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
            
            <div class="item-card">
              <h3>수공예품/핸드메이드 키트</h3>
              <p>손으로 직접 만드는 창작 활동용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXJq" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0quq" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ISFJ 유형 결과 페이지
function showISFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">섬세한 보호형 부모 (ISFJ)</h1>
      <div class="result-subtitle">아이의 모든 순간을 지키는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이를 위해 조용히 헌신하는 따뜻하고 신뢰할 수 있는 부모입니다.</strong> 세심한 관찰로 자녀의 필요를 파악하고, 안정적인 일상과 전통을 통해 안전한 환경을 만듭니다. 당신의 한결같은 보살핌은 아이에게 <strong>안정감과 신뢰의 기반</strong>이 됩니다.</p>
        <p>때로는 너무 많은 책임을 짊어지다 보니 "내가 충분히 쉬고 있을까? 과보호하고 있진 않을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점</h2>
        <ul>
          <li>변함없이 베푸는 충실한 사랑</li>
          <li>세세한 것까지 기억하는 섬세함</li>
          <li>실질적인 도움을 주는 현실감각</li>
          <li>흔들림 없는 내적 책임감</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>자기 돌봄:</strong> 타인을 보살피는 만큼 자신의 필요도 챙겨보세요</li>
          <li><strong>과보호 경계:</strong> 아이가 실수와 도전을 통해 배울 기회를 허용해보세요</li>
          <li><strong>변화 수용:</strong> 전통적 방식과 함께 새로운 접근법에도 열린 마음을 가져보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 한결같은 보살핌이, 아이에게는 인생의 가장 단단한 기반이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 30분, 오직 자신을 위한 휴식 시간 확보하기.</strong> 타인을 돌보는 것만큼 자신의 에너지를 충전하는 것도 중요합니다.</li>
          <li>아이가 작은 어려움에 처했을 때, 즉시 도와주기보다 "어떻게 해결하면 좋을까?"라고 먼저 물어보는 연습을 해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ESFJ, ESTJ 유형의 배우자는 ISFJ의 돌봄과 헌신을 이해하고 안정적인 가족 환경을 함께 조성합니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ENTP, INTP 유형과는 실용적 접근과 개념적 접근 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 모든 것을 혼자 책임지려 하지 말고 배우자와 책임을 나누세요. 아이의 독립성을 기르기 위해 때로는 한 발 물러서는 법을 배우고, 자신의 필요도 표현하세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/isfj-illustration.jpg" alt="ISFJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"견고한 나무처럼, 당신의 변함없는 사랑은 아이에게 평생의 안식처가 됩니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 섬세한 보호형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>건강 관리용품</h3>
              <p>아이 건강 체크와 관리를 위한 용품</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
            
            <div class="item-card">
              <h3>전통 교육교구</h3>
              <p>좋은 가치와 예의를 가르치는 교육 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXOW" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0rYn" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>보온/보냉용품</h3>
              <p>아이의 편안함을 챙기는 실용적 용품</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXQP" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0swc" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}


// INFP 유형 결과 페이지
function showINFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">창의적 자유형 부모 (INFP)</h1>
      <div class="result-subtitle">내면의 깊이로 아이를 바라보는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 내면세계와 개성을 소중히 여기는 이상주의적인 부모입니다.</strong> 모든 아이는 특별하다고 믿고, 아이가 자신만의 가치관과 신념을 발전시키도록 지지합니다. 당신의 깊은 이해심은 아이에게 <strong>무조건적 사랑의 안전기지</strong>가 됩니다.</p>
        <p>하지만 가끔, 이상과 현실 사이에서 갈등하며 "내가 충분히 잘하고 있을까?" 하는 의심이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이라서 좋은 점</h2>
        <ul>
          <li>아이의 작은 신호도 알아채는 섬세한 관찰력</li>
          <li>있는 그대로 수용하는 포용력</li>
          <li>아이에게 진심을 다하는 따뜻함</li>
          <li>아이의 내면 성장을 돕는 지혜</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일상적 구조 제공:</strong> 이상적인 양육 비전만큼 실용적인 일상 구조도 중요합니다</li>
          <li><strong>경계 설정:</strong> 무조건적 수용과 함께 적절한 한계와 기대치도 필요합니다</li>
          <li><strong>현실적 요구 대응:</strong> 내적 이상과 현실 세계의 요구 사이에서 균형을 찾아보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 그 섬세한 마음이, 아이에게는 세상에서 가장 안전한 피난처예요."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>일주일에 하루, 아이를 위한 작은 일상 루틴을 만들어보기.</strong> 예측 가능한 패턴이 주는 안정감을 경험해보세요.</li>
          <li>감정에 지나치게 빠져들 때, 5분간 깊게 호흡하며 스스로를 진정시키는 시간을 가져보세요.</li>
        </ul>
      </section>
      
      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENFJ, ENTJ 유형의 배우자는 INFP의 이상과 가치를 존중하면서 방향성을 제시해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ESTJ, ISTJ 유형과는 이상과 현실, 자유와 구조 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/infp-illustration.jpg" alt="INFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"깊은 바다처럼 당신의 사랑은, 말없이도 아이를 품어줍니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 창의적 자유형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>감성 동화책/그림책</h3>
              <p>아이의 상상력과 감수성 발달용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWrm" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ8BB" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>아트&크래프트 용품</h3>
              <p>창의적 표현활동을 위한 미술용품 세트</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWtu" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ9j9" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>디퓨저/아로마</h3>
              <p>편안하고 따뜻한 가정 분위기 조성용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWw7" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0aqn" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// INTP 유형 결과 페이지
function showINTPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">논리적 탐구형 부모 (INTP)</h1>
      <div class="result-subtitle">호기심으로 세상을 열어주는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 지적 호기심을 키워주는 탐구적인 부모입니다.</strong> 질문과 발견을 통해 배움의 즐거움을 알려주고, 독립적인 사고를 존중합니다. 당신의 개방적인 사고는 아이에게 <strong>무한한 가능성의 세계</strong>를 열어줍니다.</p>
        <p>간혹 이론과 현실 사이에서 "아이에게 실용적인 면도 가르쳐야 하나?" 하고 고민하기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>끝없는 지적 호기심</li>
          <li>열린 마음으로 수용하는 관용</li>
          <li>문제를 새롭게 보는 창의성</li>
          <li>아이의 개성을 존중하는 여유</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>감정적 지지:</strong> 지적 탐구만큼 정서적 유대감도 중요합니다</li>
          <li><strong>일상 구조화:</strong> 아이에게 적절한 일과와 규칙을 제공하는 것도 필요합니다</li>
          <li><strong>실행력 강화:</strong> 다양한 아이디어를 실제 행동으로 옮기는 노력이 도움됩니다</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 호기심 어린 질문들이, 아이에게는 세상에서 가장 흥미로운 수업입니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매주 한 가지 소소한 가족 의식 만들어보기.</strong> 예를 들어, 금요일 저녁 피자 타임이나 일요일 아침 책 읽기 시간 등 단순하지만 규칙적인 활동을 시도해보세요.</li>
          <li>하루에 한 번, 아이와 눈을 맞추고 감정을 표현하는 짧은 순간을 의식적으로 만들어보세요.</li>
        </ul>
      </section>
      
      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENTJ, ENTP 유형의 배우자는 INTP의 분석적 사고를 존중하면서 실행력을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ESFJ, ISFJ 유형과는 논리 중심과 감정 중심의 접근 방식 차이로 오해가 생길 수 있습니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 이론적 접근과 함께 감정적 연결도 아이 발달에 중요하다는 것을 인정하세요. 배우자의 감정적 통찰을 존중하고, 함께 체계적이면서도 따뜻한 육아 환경을 만들어가세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/intp-illustration.jpg" alt="INTP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"무한한 우주처럼, 당신의 생각은 아이에게 탐험할 세계를 선물합니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 논리적 탐구형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>코딩/프로그래밍 교구</h3>
              <p>논리적 사고와 문제해결 능력 개발용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWOo" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0gwH" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>백과사전/지식 도서</h3>
              <p>깊이 있는 학습과 탐구를 위한 참고서</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWPm" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0g5R" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>레고/조립 장난감</h3>
              <p>창의적 사고와 공간지각 능력 향상용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWQN" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0hJC" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// INTJ 유형 결과 페이지
function showINTJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">전략적 비전형 부모 (INTJ)</h1>
      <div class="result-subtitle">내일을 준비하며 오늘을 살아가는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 성장을 위한 장기적 비전을 가진 전략적인 부모입니다.</strong> 자녀가 독립적이고 논리적인 사고를 발달시키도록 돕는 것을 중요시합니다. 당신의 깊은 통찰력은 자녀에게 <strong>지적 성장의 든든한 길잡이</strong>가 됩니다.</p>
        <p>때로는 완벽을 추구하는 마음에 "이 방식이 아이에게 최선일까?" 하고 고민하기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>미래를 내다보는 선견지명</li>
          <li>복잡한 문제도 해결하는 지혜</li>
          <li>아이의 자립심을 키우는 인내</li>
          <li>흔들리지 않는 내적 확신</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>감정적 연결:</strong> 논리적 사고와 함께 감정적 유대감도 소중히 여겨보세요</li>
          <li><strong>유연성 발휘:</strong> 계획이 틀어질 때도 적응하고 순간을 즐기는 여유를 가져보세요</li>
          <li><strong>자기 기대치 조정:</strong> 완벽함보다는 '충분히 좋은 부모'가 되는 것에 의미를 두세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 깊은 통찰력이, 아이에게는 인생의 나침반이 되어줍니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>하루 10분, 계획 없이 아이와 함께하는 시간을 가져보기.</strong> 즉흥적인 순간이 주는 기쁨을 경험해보세요.</li>
          <li>매일 잠들기 전, 오늘 아이와 함께한 순간 중 감사한 점 하나를 생각해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENFP, ENTP 유형의 배우자는 INTJ의 깊은 생각에 새로운 관점과 에너지를 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ESFJ, ISFJ 유형과는 소통 방식과 가치관 차이로 오해가 생길 수 있습니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 감정과 논리를 균형 있게 아이에게 보여주세요. 배우자가 표현하는 감정적 교감의 중요성을 인정하고, 당신의 장기적 계획과 비전을 명확히 공유하세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/intj-illustration.jpg" alt="INTJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"높이 나는 독수리처럼, 당신의 시선은 언제나 먼 미래를 바라봅니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 전략적 비전형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>체계적 학습교재</h3>
              <p>단계별 커리큘럼이 있는 학습 시스템</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
            
            <div class="item-card">
              <h3>홈스쿨링 교구</h3>
              <p>맞춤형 교육을 위한 전문 교육도구</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">한글,숫자,영어 학습 벽보</p>
              </div>
              <a href="https://ozip.me/JiNdUdP?af" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>독서등/학습환경 용품</h3>
              <p>최적의 학습 환경 구축용 인테리어</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">높이각도조절 아기책상 의자세트</p>
              </div>
              <a href="https://ozip.me/JPoTRzJ?af" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}아이의 작은 신호도 알아채는 섬세한 관찰력</li>
          <li>있는 그대로 수용하는 포용력</li>
          <li>아이에게 진심을 다하는 따뜻함</li>
          <li>아이의 내면 성장을 돕는 지혜</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일상적 구조 제공:</strong> 이상적인 양육 비전만큼 실용적인 일상 구조도 중요합니다</li>
          <li><strong>경계 설정:</strong> 무조건적 수용과 함께 적절한 한계와 기대치도 필요합니다</li>
          <li><strong>현실적 요구 대응:</strong> 내적 이상과 현실 세계의 요구 사이에서 균형을 찾아보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 그 섬세한 마음이, 아이에게는 세상에서 가장 안전한 피난처예요."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>일주일에 하루, 아이를 위한 작은 일상 루틴을 만들어보기.</strong> 예측 가능한 패턴이 주는 안정감을 경험해보세요.</li>
          <li>감정에 지나치게 빠져들 때, 5분간 깊게 호흡하며 스스로를 진정시키는 시간을 가져보세요.</li>
        </ul>
      </section>
      
      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENFJ, ENTJ 유형의 배우자는 INFP의 이상과 가치를 존중하면서 방향성을 제시해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ESTJ, ISTJ 유형과는 이상과 현실, 자유와 구조 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li>
        </ul>
      </section>

document.getElementById('result-content').innerHTML = resultContent;
}

// ESFP 유형 결과 페이지
function showESFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">즐거운 격려형 부모 (ESFP)</h1>
      <div class="result-subtitle">아이에게 삶의 기쁨을 알려주는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이와 함께 매 순간을 축제처럼 즐기는 활기 넘치는 부모입니다.</strong> 온화한 사랑으로 자녀를 격려하고, 삶의 작은 기쁨을 나누는 것을 중요시합니다. 당신의 자연스러운 열정은 아이에게 <strong>자신감과 삶의 즐거움</strong>을 알려줍니다.</p>
        <p>때로는 현재의 즐거움에 집중하다 보니 "미래를 위한 준비와 일관된 구조를 충분히 제공하고 있을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점</h2>
        <ul>
          <li>세상을 밝게 만드는 낙천적 에너지</li>
          <li>순간을 소중히 여기는 현재 지향성</li>
          <li>타인의 마음을 따뜻하게 하는 친절함</li>
          <li>현실적인 문제에 대응하는 실용성</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>장기적 계획:</strong> 즐거운 현재와 함께 미래를 위한 구체적인 준비도 함께 해보세요</li>
          <li><strong>일관된 구조 제공:</strong> 자유로운 표현과 함께 안정적인 일상 패턴도 중요합니다</li>
          <li><strong>책임감 강조:</strong> 재미와 함께 책임과 약속의 중요성도 가르쳐보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 밝은 에너지가, 아이에게는 세상을 사랑하는 법을 가르치는 빛이 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 같은 시간에 하는 간단한 가족 루틴 만들기.</strong> 예를 들어, 저녁 식사 후 5분 정리 시간이나 일정한 취침 의식 등을 시도해보세요.</li>
          <li>주 1회, 가족 캘린더를 함께 살펴보며 다가오는 일정과 책임을 확인하는 시간을 가져보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ISTJ, ISFJ 유형의 배우자는 ESFP의 즐거운 에너지에 안정감과 지속성을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> INTJ, ENTJ 유형과는 즉흥성과 계획성 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 즐거움과 현재 순간과 함께 일관성과 미래 계획의 중요성도 인정하세요. 배우자의 체계적 접근을 존중하고, 함께 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/esfp-illustration.jpg" alt="ESFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"반짝이는 불꽃처럼, 당신의 밝은 에너지는 아이의 일상을 축제로 만듭니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 즐거운 격려형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>스포츠용품/운동기구</h3>
              <p>아이와 함께하는 신체활동용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXuY" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0kDM" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>음악교구/악기</h3>
              <p>즐거운 음악 활동과 감성 발달용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXv5" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0k1d" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>파티용품/이벤트 용품</h3>
              <p>특별한 날 축하와 재미있는 추억 만들기용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXw9" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0lnb" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ESFJ 유형 결과 페이지
function showESFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">헌신적 돌봄형 부모 (ESFJ)</h1>
      <div class="result-subtitle">아이의 행복을 위해 헌신하는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 필요를 세심하게 살피는 따뜻하고 헌신적인 부모입니다.</strong> 가족의 화목과 조화를 위해 노력하며, 자녀가 사회적 가치와 전통을 배우도록 도와줍니다. 당신의 변함없는 지지는 아이에게 <strong>안정감과 소속감</strong>을 선물합니다.</p>
        <p>때로는 너무 많은 것을 책임지려다 보니 "내가 지나치게 개입하고 있진 않을까?" 하는 고민이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>가족을 따뜻하게 보살피는 헌신</li>
          <li>타인의 필요를 알아채는 섬세함</li>
          <li>안정된 환경을 조성하는 능력</li>
          <li>전통과 가치를 소중히 여기는 마음</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>자율성 존중:</strong> 과도한 개입 대신 아이가 스스로 결정할 공간을 허용해보세요</li>
          <li><strong>자기 돌봄:</strong> 타인을 돌보는 만큼 자신의 필요도 소중히 여겨보세요</li>
          <li><strong>변화 수용:</strong> 전통적 방식과 함께 새로운 접근법도 시도해보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 헌신적인 사랑이, 아이에게는 세상에서 가장 안전한 둥지가 됩니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 15분, 오직 자신만을 위한 시간 가지기.</strong> 끊임없이 타인을 돌보는 당신, 스스로를 위한 시간도 필요합니다.</li>
          <li>아이가 작은 실수를 했을 때, 먼저 해결해주기보다 "네가 어떻게 하고 싶니?"라고 물어보는 연습을 해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ISFJ, ISTJ 유형의 배우자는 ESFJ의 사회적 가치와 전통을 존중하며 안정된 가정을 함께 만들어갑니다.</li>
          <li><strong>노력이 필요한 관계:</strong> INTP, ISTP 유형과는 감정 중심과 논리 중심의 접근 방식 차이로 오해가 생길 수 있습니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 배우자의 분석적 관점도 아이 양육에 도움이 된다는 것을 인정하세요. 모든 가족 문제를 해결하려 하기보다 배우자와 책임을 나누고, 때로는 아이와 배우자에게 독립적인 공간을 주세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/esfj-illustration.jpg" alt="ESFJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"따뜻한 둥지처럼, 당신의 헌신은 아이에게 세상에서 가장 안전한 장소가 됩니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 헌신적 돌봄형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>요리/베이킹 도구</h3>
              <p>아이와 함께하는 요리 활동용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqXx9" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0lK6" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>안전용품/보호장구</h3>
              <p>아이 안전을 위한 필수 용품들</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">매달려 문닫힘 방지 도어쿠션</p>
              </div>
              <a href="https://ozip.me/SVvyiix?af" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>정리수납용품</h3>
              <p>깔끔하고 체계적인 생활환경 조성용</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">투명 pvc 원형 인형 장난감 수납함</p>
              </div>
              <a href="https://ozip.me/9aEE3uj?af" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// INFJ 유형 결과 페이지
function showINFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">이상적 통찰형 부모 (INFJ)</h1>
      <div class="result-subtitle">아이의 내면을 깊이 이해하는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 내면세계를 깊이 이해하는 통찰력 있는 부모입니다.</strong> 자녀의 잠재력과 고유한 가치를 알아보고, 의미 있는 삶으로 인도하고자 합니다. 당신의 직관적 이해력은 아이에게 <strong>영감과 정서적 안정감</strong>을 제공합니다.</p>
        <p>때로는 높은 이상과 현실 사이에서 "내 기대가 아이에게 부담이 되진 않을까?" 하고 고민하기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>마음을 읽는 듯한 직관력</li>
          <li>흔들리지 않는 내적 가치관</li>
          <li>아이의 가능성을 보는 통찰력</li>
          <li>깊고 의미있는 관계를 만드는 능력</li>
        </ul>
      </section>

      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>현실적 기대:</strong> 완벽한 이상보다 현실적인 성장 과정을 수용해보세요</li>
          <li><strong>자기 돌봄:</strong> 타인을 돌보는 만큼 자신의 필요도 소중히 여겨보세요</li>
          <li><strong>유연성 발휘:</strong> 계획이 변경될 때도 적응하는 여유를 가져보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 깊은 이해와 공감이, 아이에게는 가장 안전한 정서적 안식처예요."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매일 10분, 오직 자신만을 위한 시간 가지기.</strong> 끊임없이 남을 돌보는 당신, 자신을 위한 작은 시간도 필요합니다.</li>
          <li>아이의 행동에 과도하게 의미를 부여할 때, 잠시 멈추고 "이것은 단순한 아이다움일 수 있다"라고 자신에게 말해보세요.</li>
        </ul>
      </section>
      
      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENFP, ENTP 유형의 배우자는 INFJ의 깊은 통찰에 활력과 새로운 관점을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ESTP, ISTP 유형과는 이상과 현실적 접근 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 완벽한 이상보다 현실적인 성장 과정을 수용하세요. 배우자의 실용적 접근도 존중하고, 함께 이상과 현실이 균형 잡힌 육아 환경을 만들어가세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/infj-illustration.jpg" alt="INFJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"깊은 호수처럼, 당신의 마음은 아이의 모든 것을 담아내고 비춰줍니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 이상적 통찰형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>명상/마음챙김 교구</h3>
              <p>아이의 정서 안정과 집중력 향상용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWAT" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0byC" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>저널링/일기장</h3>
              <p>성장 과정 기록과 소통의 도구</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWCL" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0cek" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>식물 키우기 세트</h3>
              <p>생명의 소중함과 책임감 교육용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWDB" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0ct6" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
   
  document.getElementById('result-content').innerHTML = resultContent;
}// 이 함수들을 기존 script.js의 맨 마지막에 추가하세요

// INFP 유형 결과 페이지
function showINFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">창의적 자유형 부모 (INFP)</h1>
      <div class="result-subtitle">내면의 깊이로 아이를 바라보는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 내면세계와 개성을 소중히 여기는 이상주의적인 부모입니다.</strong> 모든 아이는 특별하다고 믿고, 아이가 자신만의 가치관과 신념을 발전시키도록 지지합니다. 당신의 깊은 이해심은 아이에게 <strong>무조건적 사랑의 안전기지</strong>가 됩니다.</p>
        <p>하지만 가끔, 이상과 현실 사이에서 갈등하며 "내가 충분히 잘하고 있을까?" 하는 의심이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이라서 좋은 점</h2>
        <ul>
          <li><strong>조화로운 육아를 위해:</strong> 이상적인 양육 비전과 함께 실용적인 일상 구조도 중요하다는 것을 인정하세요. 배우자의 체계적인 접근이 아이에게 안정감을 줄 수 있음을 이해하고, 함께 현실적인 육아 계획을 세워보세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/infp-illustration.jpg" alt="INFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"깊은 바다처럼 당신의 사랑은, 말없이도 아이를 품어줍니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 창의적 자유형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>감성 동화책/그림책</h3>
              <p>아이의 상상력과 감수성 발달용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWrm" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ8BB" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>아트&크래프트 용품</h3>
              <p>창의적 표현활동을 위한 미술용품 세트</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWtu" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ9j9" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>디퓨저/아로마</h3>
              <p>편안하고 따뜻한 가정 분위기 조성용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWw7" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0aqn" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// INTP 유형 결과 페이지
function showINTPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">논리적 탐구형 부모 (INTP)</h1>
      <div class="result-subtitle">호기심으로 세상을 열어주는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 지적 호기심을 키워주는 탐구적인 부모입니다.</strong> 질문과 발견을 통해 배움의 즐거움을 알려주고, 독립적인 사고를 존중합니다. 당신의 개방적인 사고는 아이에게 <strong>무한한 가능성의 세계</strong>를 열어줍니다.</p>
        <p>간혹 이론과 현실 사이에서 "아이에게 실용적인 면도 가르쳐야 하나?" 하고 고민하기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>끝없는 지적 호기심</li>
          <li>열린 마음으로 수용하는 관용</li>
          <li>문제를 새롭게 보는 창의성</li>
          <li>아이의 개성을 존중하는 여유</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>감정적 지지:</strong> 지적 탐구만큼 정서적 유대감도 중요합니다</li>
          <li><strong>일상 구조화:</strong> 아이에게 적절한 일과와 규칙을 제공하는 것도 필요합니다</li>
          <li><strong>실행력 강화:</strong> 다양한 아이디어를 실제 행동으로 옮기는 노력이 도움됩니다</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 호기심 어린 질문들이, 아이에게는 세상에서 가장 흥미로운 수업입니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>매주 한 가지 소소한 가족 의식 만들어보기.</strong> 예를 들어, 금요일 저녁 피자 타임이나 일요일 아침 책 읽기 시간 등 단순하지만 규칙적인 활동을 시도해보세요.</li>
          <li>하루에 한 번, 아이와 눈을 맞추고 감정을 표현하는 짧은 순간을 의식적으로 만들어보세요.</li>
        </ul>
      </section>
      
      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENTJ, ENTP 유형의 배우자는 INTP의 분석적 사고를 존중하면서 실행력을 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ESFJ, ISFJ 유형과는 논리 중심과 감정 중심의 접근 방식 차이로 오해가 생길 수 있습니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 이론적 접근과 함께 감정적 연결도 아이 발달에 중요하다는 것을 인정하세요. 배우자의 감정적 통찰을 존중하고, 함께 체계적이면서도 따뜻한 육아 환경을 만들어가세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/intp-illustration.jpg" alt="INTP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"무한한 우주처럼, 당신의 생각은 아이에게 탐험할 세계를 선물합니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 논리적 탐구형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>코딩/프로그래밍 교구</h3>
              <p>논리적 사고와 문제해결 능력 개발용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWOo" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0gwH" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>백과사전/지식 도서</h3>
              <p>깊이 있는 학습과 탐구를 위한 참고서</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWPm" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0g5R" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>레고/조립 장난감</h3>
              <p>창의적 사고와 공간지각 능력 향상용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWQN" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0hJC" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// INTJ 유형 결과 페이지
function showINTJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">전략적 비전형 부모 (INTJ)</h1>
      <div class="result-subtitle">내일을 준비하며 오늘을 살아가는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 성장을 위한 장기적 비전을 가진 전략적인 부모입니다.</strong> 자녀가 독립적이고 논리적인 사고를 발달시키도록 돕는 것을 중요시합니다. 당신의 깊은 통찰력은 자녀에게 <strong>지적 성장의 든든한 길잡이</strong>가 됩니다.</p>
        <p>때로는 완벽을 추구하는 마음에 "이 방식이 아이에게 최선일까?" 하고 고민하기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이어서 좋은 점 </h2>
        <ul>
          <li>미래를 내다보는 선견지명</li>
          <li>복잡한 문제도 해결하는 지혜</li>
          <li>아이의 자립심을 키우는 인내</li>
          <li>흔들리지 않는 내적 확신</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>감정적 연결:</strong> 논리적 사고와 함께 감정적 유대감도 소중히 여겨보세요</li>
          <li><strong>유연성 발휘:</strong> 계획이 틀어질 때도 적응하고 순간을 즐기는 여유를 가져보세요</li>
          <li><strong>자기 기대치 조정:</strong> 완벽함보다는 '충분히 좋은 부모'가 되는 것에 의미를 두세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 깊은 통찰력이, 아이에게는 인생의 나침반이 되어줍니다."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>하루 10분, 계획 없이 아이와 함께하는 시간을 가져보기.</strong> 즉흥적인 순간이 주는 기쁨을 경험해보세요.</li>
          <li>매일 잠들기 전, 오늘 아이와 함께한 순간 중 감사한 점 하나를 생각해보세요.</li>
        </ul>
      </section>

      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENFP, ENTP 유형의 배우자는 INTJ의 깊은 생각에 새로운 관점과 에너지를 더해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ESFJ, ISFJ 유형과는 소통 방식과 가치관 차이로 오해가 생길 수 있습니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 감정과 논리를 균형 있게 아이에게 보여주세요. 배우자가 표현하는 감정적 교감의 중요성을 인정하고, 당신의 장기적 계획과 비전을 명확히 공유하세요.</li>
        </ul>
      </section>

      <section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/intj-illustration.jpg" alt="INTJ 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"높이 나는 독수리처럼, 당신의 시선은 언제나 먼 미래를 바라봅니다."</p>
        </div>
      </section>
      
      <section class="items-section">
        <h2>✨ 전략적 비전형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>체계적 학습교재</h3>
              <p>단계별 커리큘럼이 있는 학습 시스템</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">준비중</p>
              </div>
              <a href="#" target="_blank" class="item-link" style="background-color: #ccc;">준비중</a>
            </div>
            
            <div class="item-card">
              <h3>홈스쿨링 교구</h3>
              <p>맞춤형 교육을 위한 전문 교육도구</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">한글,숫자,영어 학습 벽보</p>
              </div>
              <a href="https://ozip.me/JiNdUdP?af" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>독서등/학습환경 용품</h3>
              <p>최적의 학습 환경 구축용 인테리어</p>
              <div class="coupang-iframe">
                <p style="color: #666; font-size: 12px;">높이각도조절 아기책상 의자세트</p>
              </div>
              <a href="https://ozip.me/JPoTRzJ?af" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;

// INFP 유형 결과 페이지
function showINFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">창의적 자유형 부모 (INFP)</h1>
      <div class="result-subtitle">내면의 깊이로 아이를 바라보는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 내면세계와 개성을 소중히 여기는 이상주의적인 부모입니다.</strong> 모든 아이는 특별하다고 믿고, 아이가 자신만의 가치관과 신념을 발전시키도록 지지합니다. 당신의 깊은 이해심은 아이에게 <strong>무조건적 사랑의 안전기지</strong>가 됩니다.</p>
        <p>하지만 가끔, 이상과 현실 사이에서 갈등하며 "내가 충분히 잘하고 있을까?" 하는 의심이 들기도 합니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신이라서 좋은 점</h2>
        <ul>
          <li>아이의 작은 신호도 알아채는 섬세한 관찰력</li>
          <li>있는 그대로 수용하는 포용력</li>
          <li>아이에게 진심을 다하는 따뜻함</li>
          <li>아이의 내면 성장을 돕는 지혜</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>더 발전시키면 좋을 점</h2>
        <ul>
          <li><strong>일상적 구조 제공:</strong> 이상적인 양육 비전만큼 실용적인 일상 구조도 중요합니다</li>
          <li><strong>경계 설정:</strong> 무조건적 수용과 함께 적절한 한계와 기대치도 필요합니다</li>
          <li><strong>현실적 요구 대응:</strong> 내적 이상과 현실 세계의 요구 사이에서 균형을 찾아보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신의 그 섬세한 마음이, 아이에게는 세상에서 가장 안전한 피난처예요."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>일주일에 하루, 아이를 위한 작은 일상 루틴을 만들어보기.</strong> 예측 가능한 패턴이 주는 안정감을 경험해보세요.</li>
          <li>감정에 지나치게 빠져들 때, 5분간 깊게 호흡하며 스스로를 진정시키는 시간을 가져보세요.</li>
        </ul>
      </section>
      
      <section class="couple-compatibility-section">
        <h2>배우자와의 관계 팁</h2>
        <ul>
          <li><strong>잘 맞는 파트너:</strong> ENFJ, ENTJ 유형의 배우자는 INFP의 이상과 가치를 존중하면서 방향성을 제시해줍니다.</li>
          <li><strong>노력이 필요한 관계:</strong> ESTJ, ISTJ 유형과는 이상과 현실, 자유와 구조 사이의 균형을 찾는 과정이 필요합니다.</li>
          <li><strong>조화로운 육아를 위해:</strong> 이상적인 양육 비전과 함께 실용적인 일상 구조도 중요하다는 것을 인정하세요. 배우자의 체계적인 접근이 아이에게 안정감을 줄 수 있음을 이해하고, 함께 현실적인 육아 계획을 세워보세요.</li>
        </ul>
      </section>

<section class="illustration-section">
        <h2>당신의 하루를 위한 일러스트</h2>
        <div class="illustration-container">
          <div class="illustration-image">
            <img src="images/infp-illustration.jpg" alt="INFP 일러스트" id="type-illustration">
          </div>
          <p class="illustrated-quote">"깊은 바다처럼 당신의 사랑은, 말없이도 아이를 품어줍니다."</p>
        </div>
      </section>

<section class="items-section">
        <h2>✨ 창의적 자유형 부모를 위한 추천 아이템</h2>
        <div class="recommended-items">
          <div class="item-grid">
            <div class="item-card">
              <h3>감성 동화책/그림책</h3>
              <p>아이의 상상력과 감수성 발달용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWrm" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ8BB" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>아트&크래프트 용품</h3>
              <p>창의적 표현활동을 위한 미술용품 세트</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWtu" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cvZ9j9" target="_blank" class="item-link">상품 보러가기</a>
            </div>
            
            <div class="item-card">
              <h3>디퓨저/아로마</h3>
              <p>편안하고 따뜻한 가정 분위기 조성용</p>
              <div class="coupang-iframe">
                <iframe src="https://coupa.ng/ciqWw7" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
              </div>
              <a href="https://link.coupang.com/a/cv0aqn" target="_blank" class="item-link">상품 보러가기</a>
            </div>
          </div>
        </div>
        
        <div class="coupang-disclaimer">
          <p><strong>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</strong></p>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}
