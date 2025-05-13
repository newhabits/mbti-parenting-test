document.addEventListener("DOMContentLoaded", function() {
    // 시작 버튼에 클릭 이벤트 등록
    const startButton = document.getElementById("start-btn");
    if (startButton) {
        startButton.addEventListener("click", function () {
            hideAllContainers();
            document.getElementById("quiz-container").style.display = "block";
            initializeQuiz();
        });
    }
    
    // 뒤로가기 버튼 이벤트 등록
    document.getElementById("back-button").addEventListener("click", goBack);
    
    // 공유 버튼 이벤트 등록
    const shareButton = document.getElementById("share-button");
    if (shareButton) {
        shareButton.addEventListener("click", shareResult);
    }
    
    // 결과 페이지가 로드된 후 일러스트 이미지 확인
    const illustration = document.getElementById("type-illustration");
    if (illustration) {
        illustration.onerror = function() {
            // 이미지가 없으면 대체 콘텐츠 표시
            const container = this.parentNode;
            container.innerHTML = '<div class="illustration-placeholder"><p class="coming-soon-text">곧 여기에 특별한 일러스트가 추가될 예정입니다</p></div>';
        };
    }
    
    // URL에서 공유된 결과 확인
    checkSharedResult();
});

// 전역 변수 선언
let currentQuestionIndex = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let previousAnswers = [];

// 퀴즈 초기화 함수
function initializeQuiz() {
    currentQuestionIndex = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    previousAnswers = [];
    renderQuestion();
}

// 질문 목록
const questions = [
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
    question: "연속된 육아로 체력과 인내심이 고갈되었을 때, 당신이 선택하는 자기 돌봄 방식은?",
    answers: [
      { text: "문제의 원인을 분석하고 더 효율적인 육아 방식을 찾아 적용해요.", scores: { T: 2, J: 1 } },
      { text: "친구나 가족에게 솔직히 힘든 마음을 나누고 정서적 지지를 얻어요.", scores: { F: 2, E: 1 } },
      { text: "아이와 잠시 떨어져 나만의 취미나 새로운 활동으로 기분 전환해요.", scores: { N: 2, P: 1 } },
      { text: "혼자만의 조용한 시간을 갖고 내면의 에너지를 재충전해요.", scores: { I: 2, S: 1 } }
    ]
  },
  {
    question: "아이의 생일 파티를 2주 앞두고 있을 때, 당신의 준비 스타일은?",
    answers: [
      { text: "체크리스트를 만들고, 날짜별로 할 일을 나눠 체계적으로 준비해요.", scores: { J: 2, T: 1 } },
      { text: "아이와 함께 파티 아이디어를 나누며 특별한 추억이 될 만한 요소들을 계획해요.", scores: { F: 2, S: 1 } },
      { text: "독특하고 창의적인 파티 테마를 떠올리며 아이와 친구들이 놀랄 요소를 구상해요.", scores: { N: 2, P: 1 } },
      { text: "소규모로 의미 있는 파티를 준비하며 세부 사항은 상황에 따라 조정해요.", scores: { I: 2, J: 1 } }
    ]
  },
  {
    question: "아이가 새로운 환경(어린이집, 학교)에 적응하는데 어려움을 겪고 있을 때, 당신은?",
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
      { text: "\"이렇게 하면 더 재미있을 것 같은데!\" 아이의 관심을 긍정적인 방향으로 전환시켜요.", scores: { N: 2, P: 1 } },
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
      { text: "\"카테고리별로 분류해서 정리하자.\" 체계적인 정리 시스템을 만들고 함께 순서대로 정리해요.", scores: { J: 2, T: 1 } },
      { text: "\"함께 정리하면 더 빨리 끝나고 재밌을 거야!\" 정리를 게임처럼 만들어 즐겁게 참여하도록 유도해요.", scores: { F: 2, E: 1 } },
      { text: "\"색깔별로 모아볼까? 아니면 크기별로?\" 정리하는 색다른 방법을 제안하며 창의적으로 접근해요.", scores: { N: 2, P: 1 } },
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

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    
    questionElement.innerText = question.question;
    answersElement.innerHTML = "";

    const progress = document.querySelector('.progress');
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progress.style.width = `${progressPercentage}%`;

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.onclick = () => {
            previousAnswers.push({ questionIndex: currentQuestionIndex, scores: answer.scores });
            Object.keys(answer.scores).forEach((key) => {
                scores[key] += answer.scores[key];
            });
            nextQuestion();
        };
        answersElement.appendChild(button);
    });

    document.getElementById("back-button").style.display = "block";

// 다음 질문으로 이동
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

// 이전 질문으로 이동
function goBack() {
    if (currentQuestionIndex > 0) {
        previousAnswers.pop(); 
        currentQuestionIndex--;
        renderQuestion();
    }
}

// MBTI 계산
function calculateMBTI() {
    const eOrI = scores.E >= scores.I ? "E" : "I";
    const sOrN = scores.S >= scores.N ? "S" : "N";
    const tOrF = scores.T >= scores.F ? "T" : "F";
    const jOrP = scores.J >= scores.P ? "J" : "P";
    return `${eOrI}${sOrN}${tOrF}${jOrP}`;
}

// 결과 표시
function showResult() {
    hideAllContainers();
    document.getElementById('result-container').style.display = 'block';
    const mbti = calculateMBTI();
    showPersonalityResult(mbti);
}

// 모든 유형에 대한 메인 컨트롤 함수
function showPersonalityResult(type) {
  const resultContainer = document.getElementById('result-container');
  const resultHeader = document.createElement('div');
  resultHeader.className = 'result-image';
  resultHeader.innerHTML = `<img src="images/${type.toLowerCase()}.PNG" alt="${type} 유형 이미지">`;
  
  // 기존 내용을 비우고 새 이미지 추가
  document.getElementById('result-content').innerHTML = '';
  resultContainer.insertBefore(resultHeader, document.getElementById('result-content'));
  switch(type) {
    case 'ISTJ':
      showISTJResult();
      break;
    case 'ESTJ':
      showESTJResult();
      break;
    case 'ISFJ':
      showISFJResult();
      break;
    case 'ESFJ':
      showESFJResult();
      break;
    case 'INFP':
      showINFPResult();
      break;
    case 'ENFP':
      showENFPResult();
      break;
    case 'INTP':
      showINTPResult();
      break;
    case 'ENTP':
      showENTPResult();
      break;
    case 'ENTJ':
      showENTJResult();
      break;
    case 'INFJ':
      showINFJResult();
      break;
    case 'ENFJ':
      showENFJResult();
      break;
    case 'ISTP':
      showISTPResult();
      break;
    case 'ESTP':
      showESTPResult();
      break;
    case 'ISFP':
      showISFPResult();
      break;
    case 'ESFP':
      showESFPResult();
      break;
    default:
      document.getElementById('result-content').innerHTML = '<p>선택한 유형에 대한 결과를 찾을 수 없습니다.</p>';
  }
}

// 더 많은 아이템 보기 함수
function showMoreItems(type) {
  alert(type + ' 유형을 위한 더 많은 아이템을 보여줍니다.');
}


// ISTJ 유형 결과 페이지 콘텐츠
function showISTJResult() {
  const resultContent = `
    <div class="result-container">
      <div class="result-image">
        <img src="images/istj.jpg" alt="ISTJ 유형 이미지">
      </div>
      
      <h1 class="result-title">체계적 계획형 부모 (ISTJ)</h1>
      <div class="result-subtitle">조용한 단단함으로 지켜내는 사람</div>
      
      <section class="essence-section">
        <p class="essence-text"><strong>당신은 아이의 일상을 안정적으로 만들어주는 기둥 같은 부모입니다.</strong> 약속은 지켜야 한다고 믿고, 질서와 규칙 안에서 아이가 잘 자라길 바랍니다. 당신이 계획하는 하루는, 아이에게 <strong>세상이 안전하다는 신호</strong>가 됩니다.</p>
        <p>하지만 가끔, 모든 걸 잘하려고 애쓰는 자신이 너무 딱딱한 사람처럼 느껴질 때가 있죠. "이렇게까지 해야 하나?" 하며 외로움도 스며듭니다.</p>
      </section>
      
      <section class="inner-strength-section">
        <h2>당신 안에는...</h2>
        <ul>
          <li>책임감 있게 하루를 쌓아올리는 힘</li>
          <li>실수하지 않으려는 진심</li>
          <li>조용히 헌신하는 사랑</li>
          <li>'말보다 행동'으로 보여주는 따뜻함</li>
        </ul>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>안정적인 환경 조성:</strong> 일관된 규칙과 명확한 기대치를 설정해 아이에게 안정감을 줍니다</li>
          <li><strong>책임감 있는 양육:</strong> 약속한 것은 반드시 지키며 아이에게 신뢰할 수 있는 모습을 보여줍니다</li>
          <li><strong>실용적인 문제 해결:</strong> 일상의 문제를 효율적으로 해결하는 능력이 뛰어납니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>융통성:</strong> 때로는 계획에서 벗어나 즉흥적인 즐거움을 경험하는 것도 중요합니다</li>
          <li><strong>감정 표현:</strong> 사랑과 애정을 더 자주, 다양한 방식으로 표현해보세요</li>
          <li><strong>개별성 인정:</strong> 아이의 독특한 성향과 리듬을 존중하고 유연하게 대응해보세요</li>
        </ul>
      </section>
      
      <section class="encouragement-section">
        <h2>지금 당신에게 필요한 말 한마디</h2>
        <p class="quote">"당신이 매일 해내는 그 평범한 일들이, 아이에겐 가장 큰 안정이에요."</p>
      </section>
      
      <section class="routine-section">
        <h2>작은 루틴 제안</h2>
        <ul>
          <li><strong>오늘 하루, 아이와의 약속 중 하나를 과감히 미뤄보기.</strong> 예상보다 더 편안한 관계가 자라날 수도 있어요.</li>
          <li>계획하지 않은 즉흥적인 놀이 시간을 일주일에 한 번 정도 만들어보세요.</li>
        </ul>
      </section>
      
      <section class="illustration-section">
    <h2>당신의 하루를 위한 일러스트</h2>
    <div class="illustration-container">
      <div class="illustration-placeholder">
        <p class="coming-soon-text">곧 여기에 특별한 일러스트가 추가될 예정입니다</p>
      </div>
      <p class="illustrated-quote">"세심히 짜여진 하루 속에서, 가끔은 빈칸도 사랑이 된다."</p>
    </div>
  </section>
      
      <section class="items-section">
        <h2>✨ 체계적 계획형 부모를 위한 육아 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ESTJ 유형 결과 페이지 콘텐츠
function showESTJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">체계적 계획형 부모 (ESTJ)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 체계와 질서를 중요시하는 단호한 리더십 스타일의 부모입니다. 명확한 규칙과 일관된 구조를 통해 아이에게 안정적인 환경을 제공합니다. 효율적인 문제 해결 능력과 실용적인 접근법으로 가정을 체계적으로 운영하며, 아이에게 책임감과 자기 규율을 가르치는 데 탁월합니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>명확한 기대치 설정:</strong> 아이가 무엇을 해야 하는지 분명히 이해할 수 있도록 합니다</li>
          <li><strong>일관된 규칙 적용:</strong> 규칙을 공정하고 일관되게 적용하여 아이에게 안정감을 줍니다</li>
          <li><strong>효율적인 가정 관리:</strong> 가족의 일정과 활동을 체계적으로 계획하고 조직합니다</li>
          <li><strong>실용적인 생활 기술 교육:</strong> 아이에게 독립성과 자기 관리를 위한 필수 기술을 가르칩니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>감정적 민감성:</strong> 아이의 감정적 필요에 더 세심하게 주의를 기울여보세요</li>
          <li><strong>유연성 발휘:</strong> 때로는 계획과 규칙에서 벗어나 즉흥적인 순간을 즐겨보세요</li>
          <li><strong>개인차 인정:</strong> 모든 아이가 같은 방식으로 발달하지 않음을 인정하고 개별적 성향을 존중해보세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 다른 체계적 계획형(ISTJ) 부모나 따뜻한 양육형(ISFJ) 부모와 함께하면 안정적인 가정 환경을 조성할 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 창의적 자유형(ENFP/INFP) 부모와는 구조 vs 자유에 대한 접근 방식 차이로 갈등이 생길 수 있습니다</li>
          <li><strong>소통 팁:</strong> 결정을 내릴 때 파트너의 의견과 감정적 관점도 고려하며, 때로는 타협할 준비를 하세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 책임감, 성실함, 그리고 목표 달성의 중요성을 배웁니다. 당신의 체계적인 지도 덕분에 아이는 자기 규율과 시간 관리 능력이 뛰어난 사람으로 성장할 가능성이 높습니다. 단, 아이의 감정적 표현과 창의성도 동등하게 중요하다는 점을 인식하고, 때로는 아이가 자유롭게 탐험하고 실수할 수 있는 공간을 제공해주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 체계적 계획형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ISFJ 유형 결과 페이지 콘텐츠
function showISFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">따뜻한 양육형 부모 (ISFJ)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 헌신적이고 세심한 보살핌으로 아이를 양육하는 따뜻한 부모입니다. 아이의 필요와 감정에 민감하게 반응하며, 안정적이고 조화로운 가정 환경을 만들기 위해 노력합니다. 전통적 가치와 일상의 소중한 순간들을 중요시하며, 아이에게 실질적인 돌봄과 무조건적인 지지를 제공합니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>세심한 관찰과 케어:</strong> 아이의 작은 변화나 필요도 놓치지 않고 살펴봅니다</li>
          <li><strong>안정적인 일상 제공:</strong> 아이에게 예측 가능한 루틴과 안전한 환경을 만들어 줍니다</li>
          <li><strong>무조건적 지지:</strong> 아이가 어떤 상황에서도 사랑받고 지지받는다고 느끼게 합니다</li>
          <li><strong>실질적인 보살핌:</strong> 아이의 일상적 필요를 세심하게 챙기고 지원합니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>자기 돌봄:</strong> 아이를 돌보느라 자신의 필요를 잊지 말고 스스로를 위한 시간도 확보하세요</li>
          <li><strong>독립성 장려:</strong> 아이가 스스로 시도하고 실수할 수 있는 기회를 더 많이 제공해보세요</li>
          <li><strong>변화 수용:</strong> 익숙한 방식에 고착되지 말고 새로운 접근법도 시도해보세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 체계적 계획형(ISTJ/ESTJ) 부모와 함께하면 따뜻함과 구조의 균형을 이룰 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 논리적 분석형(INTP/ENTP) 부모와는 감정 중심 vs 논리 중심의 접근 방식 차이로 이해 충돌이 있을 수 있습니다</li>
          <li><strong>소통 팁:</strong> 갈등을 피하려 하기보다 솔직한 감정과 필요를 표현하고, 파트너의 분석적 관점도 육아에 도움이 될 수 있음을 인정해보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 무조건적인 사랑과 타인에 대한 배려를 배웁니다. 당신의 헌신적인 보살핌 덕분에 아이는 정서적으로 안정되고 공감 능력이 뛰어난 사람으로 성장할 가능성이 높습니다. 단, 아이가 독립성과 회복탄력성을 기를 수 있도록 때로는 스스로 도전하게 하고 실패해도 괜찮다는 메시지를 전해주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 따뜻한 양육형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ESFJ 유형 결과 페이지 콘텐츠
function showESFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">따뜻한 양육형 부모 (ESFJ)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 따뜻한 관계 형성과 조화로운 가정 환경을 중요시하는 사교적이고 배려심 깊은 부모입니다. 아이의 정서적, 실질적 필요를 민감하게 감지하고 즉각 대응하며, 가족 행사와 전통을 통해 소속감과 안정감을 제공합니다. 긍정적인 태도와 실용적인 지원으로 아이가 사회성과 책임감을 기르도록 돕습니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>따뜻한 관계 형성:</strong> 아이와 깊고 신뢰 있는 정서적 유대를 쉽게 형성합니다</li>
          <li><strong>실용적 돌봄:</strong> 아이의 일상적 필요를 빠르게 파악하고 효과적으로 지원합니다</li>
          <li><strong>사회적 기술 교육:</strong> 아이에게 협력, 공유, 배려와 같은 중요한 사회적 기술을 가르칩니다</li>
          <li><strong>긍정적 가정 분위기:</strong> 화목하고 지지적인 가정 환경을 조성하는 데 탁월합니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>개인 시간 확보:</strong> 모두를 돌보는 과정에서 자신을 위한 시간과 공간도 중요하게 여기세요</li>
          <li><strong>갈등 직면:</strong> 조화를 유지하기 위해 중요한 이슈를 회피하기보다 건설적으로 해결해보세요</li>
          <li><strong>과도한 개입 자제:</strong> 아이가 스스로 문제를 해결하고 독립성을 기를 수 있는 기회를 제공하세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 체계적 계획형(ISTJ/ESTJ) 부모와 함께하면 따뜻함과 구조가 균형을 이루는 환경을 만들 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 논리적 분석형(INTP/ENTP) 부모와는 감정 중심 vs 논리 중심 접근의 차이로 갈등이 생길 수 있습니다</li>
          <li><strong>소통 팁:</strong> 당신의 감정과 필요를 명확히 표현하고, 파트너의 다른 관점도 가치 있게 여기는 열린 자세를 유지하세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 따뜻한 관계 형성과 타인에 대한 배려를 배웁니다. 당신의 사교적이고 지지적인 양육 덕분에 아이는 정서적으로 안정되고 대인관계 기술이 뛰어난 사람으로 성장할 가능성이 높습니다. 단, 아이의 개인적 성향과 독립성도 존중하며, 때로는 스스로 의사결정을 하고 실수로부터 배울 수 있는 자유를 주는 것이 중요합니다.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 따뜻한 양육형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENFP 유형 결과 페이지 콘텐츠
function showENFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">창의적 자유형 부모 (ENFP)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 열정적이고 창의적인 에너지로 아이의 상상력과 자기표현을 격려하는 영감을 주는 부모입니다. 엄격한 규칙보다는 아이의 자율성과 독창성을 중요시하며, 다양한 경험과 모험을 통해 아이의 잠재력을 발견하고 키웁니다. 진정한 소통과 감정적 연결을 통해 아이와 깊은 유대를 형성합니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>창의적 놀이와 경험:</strong> 일상을 흥미롭고 재미있는 모험으로 만들어 아이의 호기심을 자극합니다</li>
          <li><strong>열린 소통:</strong> 아이의 생각과 감정을 진지하게 들어주고 존중하는 대화를 나눕니다</li>
          <li><strong>가능성 발견:</strong> 아이의 독특한 재능과 관심사를 알아보고 발전시키도록 격려합니다</li>
          <li><strong>유연한 문제 해결:</strong> 창의적인 방식으로 도전에 접근하여 아이에게 다양한 관점을 보여줍니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>일상적 구조 유지:</strong> 창의성과 함께 일관된 루틴도 아이에게 안정감을 줄 수 있습니다</li>
          <li><strong>계획 완수:</strong> 흥미로운 새 아이디어에 쉽게 이끌리기보다 시작한 프로젝트를 마무리해보세요</li>
          <li><strong>현실적 기대:</strong> 아이의 잠재력을 보는 동시에 현재의 발달 단계와 능력도 고려하세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 논리적 분석형(INTP/ENTP) 부모와 함께하면 창의성과 논리적 사고의 균형을 이룰 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 체계적 계획형(ISTJ/ESTJ) 부모와는 자유로운 접근법 vs 구조화된 접근법 사이의 갈등이 생길 수 있습니다</li>
          <li><strong>소통 팁:</strong> 파트너의 구조적인 접근과 일관성의 가치를 인정하면서, 당신의 창의적인 비전과 아이디어를 명확히 소통해보세요</li>
       // ENFP 유형의 나머지 부분
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 열정, 창의성, 그리고 가능성에 대한 믿음을 배웁니다. 당신의 열정적이고 수용적인 양육 덕분에 아이는 자신감 있고 창의적이며 다양성을 존중하는 사람으로 성장할 가능성이 높습니다. 단, 아이에게도 일상적인 구조와 완수의 중요성을 가르치기 위해 가끔은 재미있는 방식으로 일관성과 책임감을 강조해보세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 창의적 자유형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// INFP 유형 결과 페이지 콘텐츠
function showINFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">창의적 자유형 부모 (INFP)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 깊은 이해심과 개인의 고유성을 존중하는 이상주의적인 부모입니다. 아이의 내면세계와 개성을 소중히 여기며, 진정성 있는 관계와 가치에 기반한 양육을 중요시합니다. 자유로운 자기표현과 창의성을 격려하며, 아이가 자신만의 가치관과 신념을 발전시키도록 지지합니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>깊은 공감 능력:</strong> 아이의 감정과 관점을 진정으로 이해하고 존중합니다</li>
          <li><strong>개인의 고유성 존중:</strong> 아이의 독특한 특성과 성향을 있는 그대로 받아들입니다</li>
          <li><strong>가치 중심 양육:</strong> 경쟁보다 협력, 물질보다 의미 있는 경험을 중요시합니다</li>
          <li><strong>창의적 표현 격려:</strong> 아이가 자신만의 방식으로 세상을 탐색하고 표현하도록 지원합니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>일상적 구조 제공:</strong> 이상적인 양육 비전만큼 실용적인 일상 구조도 중요합니다</li>
          <li><strong>경계 설정:</strong> 무조건적 수용과 함께 적절한 한계와 기대치도 필요합니다</li>
          <li><strong>현실적 요구 대응:</strong> 내적 이상과 현실 세계의 요구 사이에서 균형을 찾아보세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 논리적 분석형(INTP/ENTP) 부모나 다른 창의적 자유형(ENFP) 부모와 함께하면 서로의 창의성과 깊이를 보완할 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 체계적 계획형(ISTJ/ESTJ) 부모와는 이상 vs 현실, 유연성 vs 구조 사이의 갈등이 생길 수 있습니다</li>
          <li><strong>소통 팁:</strong> 당신의 이상과 가치를 분명히 표현하되, 파트너의 실용적 관점도 양육에 필요한 보완점으로 받아들여보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 진정성, 공감 능력, 그리고 개인의 가치를 존중하는 마음을 배웁니다. 당신의 수용적이고 지지적인 양육 덕분에 아이는 자아 인식이 높고 창의적이며 타인의 감정에 민감한 사람으로 성장할 가능성이 높습니다. 단, 아이가 현실 세계에서도 잘 기능할 수 있도록 실용적인 기술과 탄력성도 함께 가르쳐주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 창의적 자유형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// INTP 유형 결과 페이지 콘텐츠
function showINTPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">논리적 분석형 부모 (INTP)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 지적 호기심과 논리적 분석을 중심으로 아이를 양육하는 사색적인 부모입니다. 아이의 독립적 사고와 지적 발달을 격려하며, 질문과 탐구를 통한 학습을 중요시합니다. 획일적인 규칙보다는 원리와 개념을 이해시키는 접근법을 선호하며, 아이가 스스로 문제를 해결하고 자신만의 결론에 도달하도록 공간을 제공합니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>지적 탐구 장려:</strong> 아이의 호기심과 비판적 사고를 자극하는 환경을 조성합니다</li>
          <li><strong>객관적 분석:</strong> 문제 상황에서 감정보다 논리와 원리에 기반한 해결책을 제시합니다</li>
          <li><strong>독립성 존중:</strong> 아이가 자율적으로 생각하고 결정할 수 있는 자유를 존중합니다</li>
          <li><strong>창의적 문제 해결:</strong> 관습에 얽매이지 않는 독창적인 해결책과 관점을 제공합니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>감정적 연결:</strong> 논리적 분석 외에도 감정적 지지와 애정 표현을 더 의식적으로 실천해보세요</li>
          <li><strong>일상 구조화:</strong> 아이에게 필요한 일관된 루틴과 규칙을 더 적극적으로 설정해보세요</li>
          <li><strong>실용적 관리:</strong> 개념적 이해를 넘어 일상적인 육아 책임도 체계적으로 관리해보세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 창의적 자유형(ENFP/INFP) 부모와 함께하면 논리와 감성, 개념과 가치의 균형을 이룰 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 따뜻한 양육형(ISFJ/ESFJ) 부모와는 사고 중심 vs 감정 중심, 독립성 vs 보살핌에 대한 접근 차이로 갈등이 생길 수 있습니다</li>
          <li><strong>소통 팁:</strong> 논리적 분석과 함께 감정과 가치도 의사결정의 중요한 요소로 인정하고, 파트너의 양육 관점을 존중해보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 지적 호기심, 비판적 사고, 그리고 독립적 문제 해결 능력을 배웁니다. 당신의 논리적이고 탐구적인 양육 덕분에 아이는 분석력이 뛰어나고 독창적인 사고를 하는 사람으로 성장할 가능성이 높습니다. 단, 아이의 감정적 필요와 발달 단계에 맞는 구조적 지원도 중요하니, 지적 자극과 함께 정서적 안정감도 균형 있게 제공해주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 논리적 분석형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENTP 유형 결과 페이지 콘텐츠
function showENTPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">논리적 분석형 부모 (ENTP)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 지적 자극과 창의적 도전을 통해 아이를 양육하는 혁신적인 부모입니다. 기존 관습에 도전하고 다양한 가능성을 탐색하며, 아이에게 비판적 사고와 독창적 문제 해결 능력을 길러줍니다. 유머와 지적 토론을 즐기며, 아이가 다양한 관점에서 세상을 바라보고 스스로 생각하는 능력을 발달시키도록 격려합니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>창의적 사고 자극:</strong> 아이에게 새로운 아이디어와 관점을 끊임없이 제시합니다</li>
          <li><strong>지적 호기심 격려:</strong> '왜'라는 질문을 장려하고 함께 답을 탐구합니다</li>
          <li><strong>유연한 문제 해결:</strong> 예상치 못한 상황에서도 창의적인 해결책을 찾아냅니다</li>
          <li><strong>즐거운 학습 환경:</strong> 유머와 흥미로운 토론으로 학습을 재미있게 만듭니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>일관성 유지:</strong> 새로운 아이디어에 쉽게 이끌리기보다 지속적인 규칙과 루틴을 제공해보세요</li>
          <li><strong>감정적 지원:</strong> 지적 자극만큼 정서적 안정감과 공감도 중요하게 여겨보세요</li>
          <li><strong>실행력 강화:</strong> 흥미로운 개념과 계획을 실제 행동과 완성으로 이어가보세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 창의적 자유형(ENFP/INFP) 부모와 함께하면 아이디어와 가능성을 함께 탐색할 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 따뜻한 양육형(ISFJ/ESFJ) 부모와는 논리 vs 감정, 변화 vs 안정성에 대한 접근 차이로 갈등이 생길 수 있습니다</li>
          <li><strong>소통 팁:</strong> 파트너의 정서적 필요와 안정성 추구를 존중하고, 당신의 아이디어를 실용적인 방식으로 제안해보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 지적 호기심, 창의적 사고, 그리고 변화에 대한 열린 태도를 배웁니다. 당신의 도전적이고 자극적인 양육 덕분에 아이는 독창적이고 적응력이 뛰어난 사람으로 성장할 가능성이 높습니다. 단, 아이에게는 일관된 지원과 감정적 안정감도 필요하니, 지적 도전과 함께 신뢰할 수 있는 정서적 기반도 제공해주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 논리적 분석형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENTJ 유형 결과 페이지 콘텐츠
function showENTJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">성취 지향형 부모 (ENTJ)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 목표 지향적이고 전략적인 접근으로 아이의 잠재력을 최대한 발현시키는 리더십 있는 부모입니다. 명확한 비전과 체계적인 방법으로 아이의 성장과 성취를 지원하며, 도전과 책임감을 통해 자기 주도적인 능력을 키웁니다. 효율성과 결과를 중요시하면서도 아이가 자신의 꿈을 향해 나아갈 수 있도록 강력한 지지자 역할을 합니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>명확한 방향 제시:</strong> 아이에게 높은 기대치와 달성 가능한 목표를 제시합니다</li>
          <li><strong>리더십 본보기:</strong> 결단력과 자신감 있는 모습으로 아이에게 롤모델이 됩니다</li>
          <li><strong>전략적 계획:</strong> 아이의 교육과 발달을 위한 장기적 로드맵을 구상합니다</li>
          <li><strong>문제 해결 역량:</strong> 장애물을 효과적으로 극복하는 능력을 아이에게 가르칩니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>감정적 연결:</strong> 효율성과 성취만큼 정서적 유대와 공감도 중요하게 여겨보세요</li>
          <li><strong>과정 중시:</strong> 결과물뿐 아니라 노력의 과정과 작은 성취도 인정하고 축하해보세요</li>
          <li><strong>유연성 발휘:</strong> 계획이 예상대로 진행되지 않을 때도 인내심을 갖고 적응해보세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 체계적 계획형(ISTJ/ESTJ) 부모와 함께하면 효율적이고 일관된 가정 환경을 만들 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 창의적 자유형(ENFP/INFP) 부모와는 구조 vs 자유, 성취 vs 과정에 대한 가치관 차이로 갈등이 생길 수 있습니다</li>
          <li><strong>소통 팁:</strong> 주도권을 독점하기보다 파트너의 다른 관점과 접근법의 가치를 인정하고 의사결정에 통합해보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 목표 설정, 리더십, 그리고 성취 동기를 배웁니다. 당신의 체계적이고 야심 찬 양육 덕분에 아이는 자신감 있고 목표 지향적인 사람으로 성장할 가능성이 높습니다. 단, 아이의 고유한 속도와 관심사도 존중하며, 완벽함에 대한 부담 없이 자신의 내적 동기를 발견할 수 있는 공간을 제공해주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 성취 지향형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// INFJ 유형 결과 페이지 콘텐츠
function showINFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">조화 추구형 부모 (INFJ)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 깊은 통찰력과 이해심으로 아이의 내면 성장을 지원하는 이상주의적인 부모입니다. 인간 관계의 조화와 의미 있는 연결을 중요시하며, 아이의 내적 잠재력과 가치관 형성에 깊은 관심을 기울입니다. 조용하지만 강한 신념을 바탕으로 아이가 자신과 세상에 긍정적인 영향을 미치는 사람으로 성장하도록 영감을 줍니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>직관적 이해:</strong> 아이의 말하지 않은 필요와 감정을 예민하게 감지합니다</li>
          <li><strong>가치 중심 교육:</strong> 공감, 정의, 진실성과 같은 보편적 가치를 중요시합니다</li>
          <li><strong>깊은 유대 형성:</strong> 아이와 진정성 있고 의미 있는 관계를 발전시킵니다</li>
          <li><strong>장기적 비전:</strong> 아이의 전체적인 성장과 잠재력 발현을 위한 방향을 제시합니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>현실적 기대:</strong> 이상적인 비전과 현실 사이의 균형을 찾아보세요</li>
          <li><strong>자기 돌봄:</strong> 타인을 위해 자신을 희생하기보다 자신의 필요도 충족시키는 시간을 가지세요</li>
          <li><strong>직접적 소통:</strong> 때로는 갈등을 피하기보다 솔직하고 명확한 의사소통이 필요합니다</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 창의적 자유형(ENFP/INFP) 부모와 함께하면 이상과 가치관에 대한 공감대를 형성할 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 논리적 분석형(INTP/ENTP) 부모와는 감정 vs 논리, 조화 vs 도전 사이의 접근 차이로 갈등이 생길 수 있습니다</li>
          <li><strong>소통 팁:</strong> 내면의 생각과 감정을 더 명확히 표현하고, 파트너의 다른 관점도 양육에 보완적인 요소로 받아들여보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 공감 능력, 진정성, 그리고 더 나은 세상을 위한 이상을 배웁니다. 당신의 사려 깊고 의미 중심적인 양육 덕분에 아이는 자아 인식이 높고 타인과 깊은 관계를 형성할 수 있는 사람으로 성장할 가능성이 높습니다. 단, 아이에게 너무 높은 기대나 완벽주의적 부담을 주지 않도록 주의하고, 때로는 가벼운 즐거움과 실용적인 경험도 중요하게 여겨주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 조화 추구형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ENFJ 유형 결과 페이지 콘텐츠
function showENFJResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">조화 추구형 부모 (ENFJ)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 따뜻한 열정과 긍정적인 에너지로 아이의 성장을 지원하는 영감을 주는 부모입니다. 아이의 잠재력을 알아보고 발전시키는 데 타고난 재능이 있으며, 가족 간의 조화와 의미 있는 관계를 만드는 데 헌신합니다. 적극적인 소통과 격려를 통해 아이가 자신감 있고 타인을 배려하는 사람으로 성장하도록 안내합니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>공감적 소통:</strong> 아이의 필요와 감정에 민감하게 반응하고 효과적으로 소통합니다</li>
          <li><strong>영감과 격려:</strong> 아이에게 긍정적인 비전과 자신감을 불어넣어 성장을 촉진합니다</li>
          <li><strong>관계 조율:</strong> 가족 간의 갈등을 조화롭게 해결하고 건강한 관계를 형성합니다</li>
          <li><strong>가치 중심 지도:</strong> 공동체 의식, 친절함, 책임감과 같은 핵심 가치를 가르칩니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>자기 돌봄:</strong> 타인의 필요에 너무 집중하여 자신의 필요를 무시하지 않도록 주의하세요</li>
          <li><strong>현실적 기대:</strong> 아이와 자신에게 때로는 비현실적으로 높은 기대를 설정하지 않도록 해보세요</li>
          <li><strong>독립성 허용:</strong> 도움을 주려는 강한 욕구를 절제하고 아이가 스스로 해결할 공간을 제공하세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 창의적 자유형(ENFP/INFP) 부모와 함께하면 가치 중심적이고 사람 중심적인 환경을 만들 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 논리적 분석형(INTP/ENTP) 부모와는 감정 vs 논리, 조화 vs 비판적 분석 사이의 접근 차이로 갈등이 생길 수 있습니다</li>
          <li><strong>소통 팁:</strong> 모든 문제를 해결하려는 충동을 자제하고, 파트너의 독립적인 문제 해결 방식도 존중해보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 대인관계 기술, 공감 능력, 그리고 긍정적인 리더십을 배웁니다. 당신의 지지적이고 격려하는 양육 덕분에 아이는 자신감 있고 타인을 배려하는 사람으로 성장할 가능성이 높습니다. 단, 아이가 자신의 진정한 감정과 필요를 표현하는 것을 어려워할 수 있으니, 아이의 독립성과 자기 주도성도 충분히 존중해주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 조화 추구형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ISTP 유형 결과 페이지 콘텐츠
function showISTPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">탐험가형 부모 (ISTP)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 실용적이고 문제 해결 능력이 뛰어난 침착한 부모입니다. 아이에게 많은 자유와 독립성을 제공하며, 실제 경험을 통한 학습을 중요시합니다. 불필요한 규칙보다는 실질적인 기술과 적응력을 가르치는 데 중점을 두며, 위기 상황에서도 침착하게 대처하는 능력으로 아이에게 안정감을 줍니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>실용적 문제 해결:</strong> 어떤 상황에서도 효율적이고 창의적인 해결책을 찾아냅니다</li>
          <li><strong>침착한 대응:</strong> 위기나 스트레스 상황에서도 안정적으로 대처합니다</li>
          <li><strong>실제적 기술 교육:</strong> 아이에게 유용한 실생활 기술을 직접 보여주고 가르칩니다</li>
          <li><strong>자유와 탐험 존중:</strong> 아이가 자신만의 방식으로 세상을 탐험하도록 공간을 제공합니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>감정적 표현:</strong> 실용성 외에도 감정과 애정을 더 자주, 명확하게 표현해보세요</li>
          <li><strong>장기적 계획:</strong> 현재의 문제 해결 외에도 아이의 장기적 발달과 미래를 고려해보세요</li>
          <li><strong>구조적 일관성:</strong> 자유로운 접근법 속에서도 아이에게 필요한 기본적인 규칙과 루틴을 제공하세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 체계적 계획형(ISTJ/ESTJ) 부모와 함께하면 당신의 유연성과 파트너의 구조성이 균형을 이룰 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 조화 추구형(INFJ/ENFJ) 부모와는 실용 vs 이상, 독립성 vs 관계성 측면에서 접근 차이가 있을 수 있습니다</li>
          <li><strong>소통 팁:</strong> 감정과 장기적 계획에 대한 대화에도 참여하고, 당신의 실용적인 해결책과 독립적인 접근법의 가치를 분명히 전달해보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 독립성, 적응력, 그리고 실용적인 문제 해결 능력을 배웁니다. 당신의 침착하고 자유를 존중하는 양육 덕분에 아이는 자기 주도적이고 실질적인 기술을 갖춘 사람으로 성장할 가능성이 높습니다. 단, 아이의 감정적 필요와 안정감을 위한 일상적 구조도 중요하니, 자유와 함께 기본적인 안정감도 균형 있게 제공해주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 탐험가형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ESTP 유형 결과 페이지 콘텐츠
function showESTPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">탐험가형 부모 (ESTP)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 활동적이고 현실적인 접근으로 아이에게 실제 경험을 통한 학습을 장려하는 모험심 많은 부모입니다. 즉흥적이고 유연한 태도로 아이와 함께 다양한 활동과 모험을 즐기며, 이론보다는 실전을 통해 문제를 해결하는 방법을 가르칩니다. 현재의 순간을 중요시하고, 아이가 자신감 있고 적응력 있는 사람으로 성장하도록 지원합니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>활동적 학습 환경:</strong> 아이에게 다양한 경험과 모험을 통한 실제적 학습 기회를 제공합니다</li>
          <li><strong>유연한 대처:</strong> 계획이 바뀌어도 빠르게 적응하고 상황에 맞는 해결책을 찾습니다</li>
          <li><strong>재미와 모험:</strong> 육아에 활력과 재미를 불어넣어 아이의 호기심과 탐험 정신을 키웁니다</li>
          <li><strong>위기 대응력:</strong> 긴급 상황에서도 침착하게 행동하며 효과적으로 대처합니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>장기적 계획:</strong> 즉각적인 재미 외에도 아이의 장기적 발달을 위한 계획을 고려해보세요</li>
          <li><strong>감정적 지원:</strong> 활동과 모험 사이에서 아이의 감정적 필요와 내면의 성장도 살펴보세요</li>
          <li><strong>기본 구조 제공:</strong> 자유로운 스타일 속에서도 아이에게 필요한 일부 규칙과 일관성을 제공하세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 체계적 계획형(ISTJ/ESTJ) 부모와 함께하면 당신의 즉흥성과 파트너의 구조성이 균형을 이룰 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 조화 추구형(INFJ/ENFJ) 부모와는 현실 vs 이상, 행동 vs 내면성 사이의 접근 차이가 있을 수 있습니다</li>
          <li><strong>소통 팁:</strong> 행동 중심적 접근의 가치를 설명하되, 파트너의 감정적, 장기적 관점도 육아에 중요한 측면임을 인정해보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 실용적인 문제 해결, 모험심, 그리고 순간을 즐기는 법을 배웁니다. 당신의 활동적이고 경험 중심적인 양육 덕분에 아이는 자신감 있고 적응력이 뛰어난 사람으로 성장할 가능성이 높습니다. 단, 아이의 감정적 안정감과 장기적 발달을 위한 체계적 지원도 균형 있게 제공하는 것이 중요합니다.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 탐험가형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ISFP 유형 결과 페이지 콘텐츠
function showISFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">예술가형 부모 (ISFP)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 섬세한 감수성과 따뜻한 수용성으로 아이의 개성을 존중하는 부드러운 부모입니다. 현재의 순간에 충실하며, 미적 감각과 감정적 연결을 중요시합니다. 엄격한 규율보다는 아이의 자연스러운 발달과 자기표현을 지지하며, 행동으로 가치를 보여주는 조용한 롤모델이 되어줍니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>무조건적 수용:</strong> 아이를 있는 그대로 받아들이고 개인의 고유성을 존중합니다</li>
          <li><strong>감각적 풍요로움:</strong> 아이에게 예술, 자연, 감각적 경험의 아름다움을 소개합니다</li>
          <li><strong>현재에 충실:</strong> 아이와 함께 지금 이 순간을 온전히 즐기고 경험합니다</li>
          <li><strong>진정성 있는 관계:</strong> 말보다 행동으로 가치를 보여주고 진실된 관계를 형성합니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>구조와 일관성:</strong> 자유로운 접근법 속에서도 기본적인 경계와 규칙을 제공해보세요</li>
          <li><strong>장기 계획:</strong> 현재의 순간 외에도 아이의 미래를 위한 장기적 계획을 고려해보세요</li>
          <li><strong>의사 표현:</strong> 갈등을 피하기보다 필요할 때는 분명하게 의견을 표현해보세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 따뜻한 양육형(ISFJ/ESFJ) 부모와 함께하면 감성과 실용성의 균형을 이룰 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 성취 지향형(ENTJ) 부모와는 자유 vs 구조, 현재 vs 미래 계획에 대한 접근 차이가 있을 수 있습니다</li>
          <li><strong>소통 팁:</strong> 갈등을 피하기보다 당신의 가치와 감정을 솔직하게 표현하고, 파트너의 다른 접근법도 존중해보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 자기표현의 자유, 심미적 감각, 그리고 진실된 삶의 가치를 배웁니다. 당신의 수용적이고 감성적인 양육 덕분에 아이는 자신의 감정에 솔직하고 창의적인 사람으로 성장할 가능성이 높습니다. 단, 아이에게 필요한 기본적인 구조와 일관성도 함께 제공하여 세상에 적응하는 능력도 키워주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 예술가형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = resultContent;
}

// ESFP 유형 결과 페이지 콘텐츠
function showESFPResult() {
  const resultContent = `
    <div class="result-container">
      <h1 class="result-title">예술가형 부모 (ESFP)</h1>
      
      <section class="style-section">
        <h2>당신의 육아 스타일</h2>
        <p>당신은 열정적이고 활기찬 에너지로 아이의 삶에 즐거움과 모험을 불어넣는 매력적인 부모입니다. 현재의 순간을 최대한 즐기며, 아이와 함께 다양한 경험과 사회적 활동에 참여합니다. 유연하고 수용적인 태도로 아이의 자유로운 자기표현을 격려하며, 실용적인 문제 해결과 함께 따뜻한 정서적 지원을 제공합니다.</p>
      </section>
      
      <section class="strengths-section">
        <h2>당신의 강점</h2>
        <ul>
          <li><strong>재미와 활력:</strong> 일상을 즐겁고 활기찬 경험으로 만들어 아이에게 긍정적인 에너지를 전달합니다</li>
          <li><strong>실용적 보살핌:</strong> 아이의 즉각적인 필요에 빠르게 대응하고 창의적인 해결책을 제시합니다</li>
          <li><strong>사회적 연결:</strong> 아이가 다양한 사람들과 편안하게 교류하는 사회성을 기르도록 돕습니다</li>
          <li><strong>유연한 적응력:</strong> 상황에 따라 쉽게 적응하고 변화를 자연스럽게 받아들입니다</li>
        </ul>
      </section>
      
      <section class="growth-section">
        <h2>성장 가능한 부분</h2>
        <ul>
          <li><strong>장기적 계획:</strong> 즉각적인 즐거움 외에도 아이의 미래를 위한 장기적 계획을 고려해보세요</li>
          <li><strong>일관된 구조:</strong> 즐거운 환경 속에서도 기본적인 규칙과 경계를 일관되게 유지해보세요</li>
          <li><strong>깊은 대화:</strong> 활동적인 시간 외에도 아이와 심층적인 감정과 생각을 나누는 조용한 시간도 가져보세요</li>
        </ul>
      </section>
      
      <section class="partner-section">
        <h2>파트너와의 관계</h2>
        <ul>
          <li><strong>잘 맞는 유형:</strong> 따뜻한 양육형(ISFJ/ESFJ) 부모와 함께하면 즐거움과, 안정감의 균형을 이룰 수 있습니다</li>
          <li><strong>도전이 될 수 있는 유형:</strong> 체계적 계획형(ISTJ/ESTJ) 부모와는 즉흥적 vs 계획적, 유연성 vs 일관성 측면에서 접근 차이가 있을 수 있습니다</li>
          <li><strong>소통 팁:</strong> 즐거움과 현재 중심적 접근의 가치를 설명하되, 파트너의 체계적인 접근도 아이의 안정에 필요한 요소로 받아들여보세요</li>
        </ul>
      </section>
      
      <section class="child-section">
        <h2>아이와의 관계</h2>
        <p>아이는 당신에게서 삶의 즐거움, 사회성, 그리고 현재 순간을 충만하게 살아가는 법을 배웁니다. 당신의 활기차고 수용적인 양육 덕분에 아이는 낙관적이고 사교적인 사람으로 성장할 가능성이 높습니다. 단, 아이에게 필요한 기본적인 구조와 자기 규율도 가르쳐서 즐거움과 책임감 사이의 균형을 찾도록 도와주세요.</p>
      </section>
      
      <section class="items-section">
        <h2>✨ 예술가형 부모를 위한 엄선한 아이템</h2>
        <div class="coming-soon">
          <p>당신의 육아 스타일에 맞는 특별한 아이템들을 준비 중입니다.</p>
          <h3>See you soon!</h3>
        </div>
      </section>
    </div>
  `;
  
   document.getElementById('result-content').innerHTML = resultContent;
}

function hideAllContainers() {
    document.getElementById("intro-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "none";
}

// 결과 페이지가 로드된 후 공유 버튼에 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function() {
  const shareButton = document.getElementById("share-button");
  if (shareButton) {
    shareButton.addEventListener("click", shareResult);
  }
});

// 결과 공유 함수
function shareResult() {
  const mbtiType = calculateMBTI(); // 현재 MBTI 결과 가져오기
  
  // 공유할 URL 생성 (현재 페이지 URL + 쿼리 파라미터)
  const shareUrl = `${window.location.origin}${window.location.pathname}?type=${mbtiType}`;
  
  // 클립보드에 URL 복사
  navigator.clipboard.writeText(shareUrl)
    .then(() => {
      // 복사 성공 알림 표시
      const shareAlert = document.getElementById("share-alert");
      shareAlert.classList.remove("hidden");
      
      // 3초 후 알림 숨기기
      setTimeout(() => {
        shareAlert.classList.add("hidden");
      }, 3000);
    })
    .catch(err => {
      console.error('클립보드 복사 실패:', err);
      alert('링크 복사에 실패했습니다. 직접 URL을 복사해주세요.');
    });
}

// URL에서 MBTI 타입 파라미터를 확인하고 결과 표시
function checkSharedResult() {
  const urlParams = new URLSearchParams(window.location.search);
  const mbtiType = urlParams.get('type');
  
  if (mbtiType) {
    // 유효한 MBTI 타입인지 확인
    const validTypes = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];
    
    if (validTypes.includes(mbtiType)) {
      // 인트로 화면 숨기고 결과 화면 표시
      hideAllContainers();
      document.getElementById('result-container').style.display = 'block';
      
      // 결과 표시
      showPersonalityResult(mbtiType);
      
      // 공유된 결과임을 알리는 메시지 추가
      const resultContent = document.getElementById('result-content');
      const sharedMessage = document.createElement('div');
      sharedMessage.className = 'shared-message';
      sharedMessage.innerHTML = '<p>친구가 공유한 결과입니다. 나의 타입도 알아보세요!</p>';
      resultContent.insertBefore(sharedMessage, resultContent.firstChild);
    }
  }
}

// 페이지 로드 시 공유된 결과 확인
document.addEventListener("DOMContentLoaded", function() {
  checkSharedResult();
});
