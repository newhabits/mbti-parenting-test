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
      { text: "내일 해야 할 일들을 정리하면서 마무리해요.", scores: { J: 2, T: 1 } },
      { text: "아이와 오늘 있었던 일을 이야기 나눠요.", scores: { F: 2, S: 1 } },
      { text: "아이와 재미있는 이야기를 만들어봐요!", scores: { N: 2, E: 1 } },
      { text: "차분히 함께 쉬면서 조용히 시간을 보내요.", scores: { I: 2, P: 1 } }
    ]
  }
];

const results = {
  INFP: {
    title: "동화 속 이야기꾼",
    description: `
      풍부한 상상력으로 일상을 특별한 모험으로 만듭니다.
      아이의 감정에 진심으로 공감하고 보듬어줍니다.
      호기심 어린 질문에 함께 답을 찾아갑니다.
      아이는 자유로운 표현과 창의성을 배웁니다.
    `,
    message: `
      "당신은 아이의 꿈을 키워주는 이상적인 부모입니다.
      아이와 함께 작은 목표를 세우거나 새로운 활동을 시도해보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/INFP"
  },
  INFJ: {
    title: "신비로운 예언가",
    description: `
      직관적으로 아이의 내면을 이해합니다.
      조용한 지혜로 올바른 길을 안내합니다.
      깊이 있는 대화로 마음을 성장시킵니다.
      아이는 통찰력과 공감 능력을 배웁니다.
    `,
    message: `
      "아이의 내면을 이해하며 깊이 있는 대화를 이끌어내는 당신은 특별한 부모입니다.
      가끔은 가벼운 활동으로 아이와 함께 여유를 즐겨보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/INFJ"
  },
  INTJ: {
    title: "현명한 전략가",
    description: `
      깊이 있는 통찰로 아이의 미래를 그립니다.
      효율적인 방법으로 목표 달성을 돕습니다.
      독립적인 사고력을 키워줍니다.
      아이는 분석력과 통찰력을 배웁니다.
    `,
    message: `
      "효율적으로 계획을 세우고 실행하는 당신은 아이의 든든한 전략가입니다.
      현재의 즐거움도 함께 느껴보는 건 어떨까요?"
    `,
    productLink: "https://www.coupang.com/추천상품링크/INTJ"
  },
  INTP: {
    title: "호기심 많은 연구가",
    description: `
      깊이 있는 지식으로 아이의 호기심을 채워줍니다.
      논리적 사고력을 자연스럽게 키워줍니다.
      아이의 질문에 함께 답을 찾아갑니다.
      아이는 탐구 정신과 논리력을 배웁니다.
    `,
    message: `
      "아이의 질문을 하나하나 논리적으로 해결해주는 당신은 훌륭한 연구가입니다.
      감정 교감도 아이에게 큰 힘이 된답니다."
    `,
    productLink: "https://www.coupang.com/추천상품링크/INTP"
  },
  ISFP: {
    title: "따뜻한 예술가",
    description: `
      섬세한 감성으로 아이의 마음을 이해합니다.
      조용한 사랑으로 아이를 지지합니다.
      아이의 예술적 감성을 키워줍니다.
      아이는 자신만의 개성과 감수성을 키웁니다.
    `,
    message: `
      "아이의 마음을 이해하고 지지해주는 당신은 훌륭한 예술가 같은 부모입니다.
      창의적인 활동으로 아이와의 특별한 시간을 만들어보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ISFP"
  },
  ISFJ: {
    title: "헌신적인 수호천사",
    description: `
      섬세한 관찰로 아이의 필요를 알아챕니다.
      꾸준한 사랑으로 안정감을 선물합니다.
      일상의 작은 것까지 챙기는 보살핌을 줍니다.
      아이는 따뜻한 배려심과 책임감을 배웁니다.
    `,
    message: `
      "섬세하게 아이를 돌보는 당신은 헌신적인 수호천사입니다.
      가끔은 아이 스스로 해결하게 해보는 것도 중요합니다."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ISFJ"
  },
  ISTJ: {
    title: "믿음직한 등대지기",
    description: `
      한결같은 마음으로 아이에게 안정감을 줍니다.
      정확하고 체계적인 지도로 길을 알려줍니다.
      원칙과 책임감의 중요성을 가르칩니다.
      아이는 성실함과 신뢰성을 배웁니다.
    `,
    message: `
      "한결같은 지도로 아이에게 안정감을 주는 당신은 훌륭한 등대지기입니다.
      가끔은 즉흥적인 활동으로 아이와 새로운 경험을 만들어보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ISTJ"
  },
  ISTP: {
    title: "지혜로운 발명가",
    description: `
      실용적인 해결책으로 문제를 해결합니다.
      차분한 관찰로 아이의 필요를 파악합니다.
      독립성과 문제 해결 능력을 키워줍니다.
      아이는 실용적 지혜와 자립심을 배웁니다.
    `,
    message: `
      "아이에게 실용적 지혜를 가르치는 당신은 지혜로운 발명가입니다.
      감정 표현도 자주 해보는 건 어떨까요?"
    `,
    productLink: "https://www.coupang.com/추천상품링크/ISTP"
  },
  ESFP: {
    title: "즐거운 축제기획자",
    description: `
      매 순간을 특별한 추억으로 만드는 재주가 있어요.
      밝은 에너지로 아이에게 긍정적인 영향을 줍니다.
      자유로운 표현과 즐거운 도전을 응원합니다.
      아이는 삶의 즐거움과 자신감을 배웁니다.
    `,
    message: `
      "밝고 긍정적인 에너지로 아이를 이끄는 당신은 축제 같은 하루를 만들어줍니다.
      작은 계획을 세워 아이에게 안정감을 더해보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ESFP"
  },
  ENTJ: {
    title: "지혜로운 지도자",
    description: `
      명확한 비전으로 아이의 잠재력을 이끌어줍니다.
      효율적인 방법으로 목표 달성을 도와줍니다.
      논리적 사고와 리더십을 가르칩니다.
      아이는 자신의 목표를 향해 도전하는 법을 배웁니다.
    `,
    message: `
      "효율적으로 목표를 설정하고 이끄는 당신은 아이의 훌륭한 멘토입니다.
      하지만 여유를 가지고 함께 시간을 보내는 것도 잊지 마세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ENTJ"
  }
};


let currentQuestionIndex = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");
  questionElement.innerText = question.question;
  answersElement.innerHTML = "";

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.onclick = () => {
      Object.keys(answer.scores).forEach((key) => {
        scores[key] += answer.scores[key];
      });
      nextQuestion();
    };
    answersElement.appendChild(button);
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  const resultType = calculateMBTI();
  const resultData = results[resultType];

  const resultElement = document.getElementById("result");
  const productLink = document.getElementById("product-link");

  resultElement.innerHTML = `
    <h2>${resultType} - ${resultData.title}</h2>
    <p>${resultData.description}</p>
    <p>${resultData.message}</p>
  `;
  productLink.href = resultData.productLink;
}

function calculateMBTI() {
  const eOrI = scores.E >= scores.I ? "E" : "I";
  const sOrN = scores.S >= scores.N ? "S" : "N";
  const tOrF = scores.T >= scores.F ? "T" : "F";
  const jOrP = scores.J >= scores.P ? "J" : "P";
  return `${eOrI}${sOrN}${tOrF}${jOrP}`;
}

renderQuestion();
