function startTest() {
    document.getElementById('intro-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    renderQuestion();
}
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
    question: "육아 중에 찾아오는 스트레스, 어떻게 해소하시나요?",
    answers: [
      { text: "육아 관련 콘텐츠를 찾아보며 해결책을 연구해요.", scores: { T: 2, J: 1 } },
      { text: "친구랑 통화하면서 수다 떨다 보면 풀리더라고요!", scores: { F: 2, E: 1 } },
      { text: "내가 좋아하는 취미를 틈틈히 하며 힐링해요", scores: { N: 2, P: 1 } },
      { text: "혼자만의 시간을 가지며 조용히 에너지를 충전해요.", scores: { I: 2, S: 1 } }
    ]
  },
  {
    question: "아이 생일, 어떤 파티를 계획하고 계신가요?",
    answers: [
      { text: "장소부터 음식까지 체크리스트로 완벽한 파티를 준비해요", scores: { J: 2, T: 1 } },
      { text: "친구들과 함께 케이크 불면서 추억을 만들어요", scores: { F: 2, S: 1 } },
      { text: "매년 새로운 테마로 깜짝 파티를 준비해요", scores: { N: 2, P: 1 } },
      { text: "가족들과 홈파티로 소소하게 즐겨요", scores: { I: 2, J: 1 } }
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
      { text: "규칙과 원칙을 일관되게 알려주며 지도해요", scores: { J: 2, T: 1 } },
      { text: "왜 그렇게 행동했는지 아이와 대화를 나눠요.", scores: { F: 2, E: 1 } },
      { text: "게임처럼 재미있게 바로잡아줘요!", scores: { N: 2, P: 1 } },
      { text: "아이 스스로 깨달을 때까지 기다려줘요.", scores: { I: 2, S: 1 } }
    ]
  },
  {
    question: "육아를 하면서 가장 어려움을 느끼는 부분은?",
    answers: [
      { text: "아이의 규칙적인 생활 패턴을 만들고 지키는 것", scores: { J: 2, S: 1 } },
      { text: "아이의 감정을 케어하면서 동시에 나의 심리적 안정도 유지하는 것", scores: { F: 2, E: 1 } },
      { text: "아이의 발달 단계에 맞는 새로운 놀이와 활동을 계획하는 것", scores: { N: 2, P: 1 } },
      { text: "육아에 집중하면서도 나만의 시간을 확보하는 것", scores: { I: 2, T: 1 } }
    ]
  },
  {
    question: "하루를 마무리하는 저녁 시간, 어떻게 보내시나요?",
    answers: [
      { text: "내일의 할 일을 체크리스트로 정리하며 하루를 마무리해요.", scores: { J: 2, T: 1 } },
      { text: "오늘 있었던 일들에 대해 아이와 이야기를 나누며 서로의 마음을 나눠요.", scores: { F: 2, S: 1 } },
      { text: "아이와 함께 상상 속 이야기 여행을 떠나요", scores: { N: 2, E: 1 } },
      { text: "아이와 포근하게 동화책을 읽으며 쉬어가요", scores: { I: 2, P: 1 } }
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
    `,
    matchesWell: `
      **찰떡 부모 유형:** ENFP, INFJ  
      창의적이며 감정적 교감이 풍부한 유형
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** ESTJ, ISTJ  
      체계적인 성향과 차이를 느낄 수 있어요
    `,
    message: `
      "당신은 아이의 꿈을 키워주는 이상적인 부모입니다.  
      아이와 함께 작은 목표를 세우거나 새로운 활동을 시도해보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/INFP",
    productMessage: `
      "아이와의 상상을 기록할 수 있는 **플래너**나 **스티커북**을 사용해보세요.  
      창의력을 키워주는 그림책도 추천합니다."
    `
  },
  INFJ: {
    title: "신비로운 예언가",
    description: `
      직관적으로 아이의 내면을 이해합니다.
      조용한 지혜로 올바른 길을 안내합니다.
      깊이 있는 대화로 마음을 성장시킵니다.
    `,
    matchesWell: `
      **찰떡 부모 유형:** INFP, ENFJ  
      감정적이며 아이의 내면에 집중하는 유형
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** ESTP, ISTP  
      즉흥적이고 실용적인 성향과 거리가 있을 수 있어요
    `,
    message: `
      "아이의 내면을 이해하며 조용히 안내하는 당신은 특별한 부모입니다.  
      가끔은 가벼운 활동으로 아이와 함께 여유를 즐겨보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/INFJ",
    productMessage: `
      "아이와 함께 할 수 있는 **마음 일기장**이나  
      **명상 활동 키트**를 추천합니다."
    `
  },
  INTJ: {
    title: "현명한 전략가",
    description: `
      깊이 있는 통찰로 아이의 미래를 그립니다.
      효율적인 방법으로 목표 달성을 돕습니다.
      독립적인 사고력을 키워줍니다.
    `,
    matchesWell: `
      **찰떡 부모 유형:** ENTJ, ISTJ  
      계획적이고 논리적인 유형
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** ESFP, ISFP  
      즉흥적이고 감성적인 성향과 충돌할 수 있어요
    `,
    message: `
      "효율적으로 계획을 세우고 실행하는 당신은 아이의 든든한 전략가입니다.  
      현재의 즐거움도 함께 느껴보는 건 어떨까요?"
    `,
    productLink: "https://www.coupang.com/추천상품링크/INTJ",
    productMessage: `
      "아이의 학습 목표를 체계적으로 관리할 수 있는 **스터디 플래너**를 추천합니다."
    `
  },
  INTP: {
    title: "호기심 많은 연구가",
    description: `
      깊이 있는 지식으로 아이의 호기심을 채워줍니다.
      논리적 사고력을 자연스럽게 키워줍니다.
      아이의 질문에 함께 답을 찾아갑니다.
    `,
    matchesWell: `
      **찰떡 부모 유형:** ENTP, ISTP  
      탐구적이고 논리적인 사고를 지닌 유형
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** ESFJ, ISFJ  
      감정적이고 세심한 보살핌에 초점을 맞춘 유형
    `,
    message: `
      "아이의 질문을 하나하나 논리적으로 해결해주는 당신은 훌륭한 연구가입니다.  
      감정 교감도 아이에게 큰 힘이 된답니다."
    `,
    productLink: "https://www.coupang.com/추천상품링크/INTP",
    productMessage: `
      "아이와 실험을 할 수 있는 **과학 실험 키트**를 추천합니다."
    `
  },
  ENTJ: {
    title: "지혜로운 지도자",
    description: `
      명확한 비전으로 아이의 잠재력을 이끌어줍니다.
      효율적인 방법으로 목표 달성을 도와줍니다.
      논리적 사고와 리더십을 가르칩니다.
    `,
    matchesWell: `
      **찰떡 부모 유형:** INTJ, ESTJ  
      계획적이고 리더십을 중시하는 유형
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** INFP, ISFP  
      감정적이고 창의적인 성향과 거리가 있을 수 있어요
    `,
    message: `
      "효율적으로 목표를 설정하고 이끄는 당신은 아이의 훌륭한 멘토입니다.  
      하지만 여유를 가지고 함께 시간을 보내는 것도 잊지 마세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ENTJ",
    productMessage: `
      "리더십 교육에 도움이 되는 **리더십 워크북**을 추천합니다."
    `
  },
  ENTP: {
    title: "호기심 많은 탐험가",
    description: `
      새로운 도전과 실험을 두려워하지 않습니다.
      재치있는 대화로 아이의 사고력을 자극합니다.
      다양한 가능성을 열어주는 멘토가 되어줍니다.
    `,
    matchesWell: `
      **찰떡 부모 유형:** INTP, ENFP  
      탐구적이고 창의적인 사고를 지닌 유형
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** ISTJ, ISFJ  
      전통적이고 규칙적인 성향과 충돌할 수 있어요
    `,
    message: `
      "새로운 도전을 두려워하지 않는 당신은 아이에게 창의력과 도전 정신을 심어줍니다.  
      안정적인 일상을 함께 만들어보는 것도 아이에게 큰 선물이 될 거예요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ENTP",
    productMessage: `
      "아이와 함께 하는 **창의력 개발 워크북**을 추천합니다."
    `
  },
  ESTP: {
    title: "활기찬 모험가",
    description: `
      에너지 넘치는 활동으로 아이의 도전 정신을 키워줍니다.
      순발력 있게 문제를 해결하는 모습을 보여줍니다.
      재미있는 놀이로 아이에게 자신감을 불어넣어요.
    `,
    matchesWell: `
      **찰떡 부모 유형:** ESFP, ENTP  
      활발하고 도전적인 성향이 잘 맞습니다
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** ISFJ, INFJ  
      조용하고 내향적인 성향과 충돌할 수 있어요
    `,
    message: `
      "활동적이고 도전적인 당신은 아이에게 모험과 자신감을 선물합니다.  
      가끔은 일상의 리듬을 잡아주는 것도 중요해요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ESTP",
    productMessage: `
      "에너지를 발산할 수 있는 **스포츠 용품**이나  
      새로운 놀이를 위한 **활동 키트**를 추천합니다."
    `
  },
  ESFP: {
    title: "즐거운 축제기획자",
    description: `
      매 순간을 특별한 추억으로 만드는 재주가 있어요.
      밝은 에너지로 아이에게 긍정적인 영향을 줍니다.
      자유로운 표현과 즐거운 도전을 응원합니다.
    `,
    matchesWell: `
      **찰떡 부모 유형:** ESTP, ENFP  
      활동적이고 열정적인 성향이 잘 맞습니다
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** INTJ, ISTJ  
      논리적이고 규칙적인 성향과 거리가 있을 수 있어요
    `,
    message: `
      "밝고 긍정적인 에너지로 아이를 이끄는 당신은 축제 같은 하루를 만들어줍니다.  
      작은 계획을 세워 아이에게 안정감을 더해보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ESFP",
    productMessage: `
      "아이와 함께 새로운 놀이를 즐길 수 있는 **창의적인 놀이 키트**를 추천합니다."
    `
  },
ENFJ: {
    title: "따뜻한 빛의 안내자",
    description: `
      아이의 잠재력을 알아보고 성장을 이끌어줍니다.
      따뜻한 카리스마로 올바른 길을 안내합니다.
      긍정적인 에너지로 자신감을 불어넣어줍니다.
      아이는 타인을 이해하고 배려하는 법을 배웁니다.
    `,
    message: `
      "당신의 따뜻한 리더십은 아이에게 영감이 됩니다. 
      가끔은 계획 없이 아이와 느긋하게 시간을 보내보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ENFJ"
},
ENFP: {
    title: "반짝이는 별빛",
    description: `
      아이의 독특한 매력을 알아보고 응원합니다.
      넘치는 열정으로 새로운 영감을 선물합니다.
      자유로운 영혼으로 아이의 꿈을 지지합니다.
      아이는 무한한 가능성과 자기표현을 배웁니다.
    `,
    message: `
      "당신의 열정은 아이의 상상력을 키워줍니다. 
      하루 중 짧은 시간이라도 정해진 루틴을 만들어보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ENFP"
},
ENTP: {
    title: "호기심 많은 탐험가",
    description: `
      새로운 도전과 실험을 두려워하지 않습니다.
      재치있는 대화로 아이의 사고력을 자극합니다.
      다양한 가능성을 열어주는 멘토가 되어줍니다.
      아이는 창의적 문제해결과 도전정신을 배웁니다.
    `,
    message: `
      "당신의 창의력은 아이에게 새로운 세상을 보여줍니다. 
      매일 조금씩 규칙적인 생활을 만들어가보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ENTP"
},
ESTJ: {
    title: "든든한 성벽 지킴이",
    description: `
      확실한 규칙과 체계로 아이에게 안정감을 선물합니다.
      명확한 목표 설정과 실천으로 아이의 성장을 돕습니다.
      책임감과 자립심을 자연스럽게 가르쳐줍니다.
      아이는 체계적인 문제해결 능력과 성실함을 배웁니다.
    `,
    message: `
      "당신의 체계적인 육아는 아이에게 안정감을 줍니다. 
      가끔은 계획에서 벗어나 자유롭게 시간을 보내보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ESTJ"
},
ESTP: {
    title: "활기찬 모험가",
    description: `
      에너지 넘치는 활동으로 아이의 도전정신을 키워줍니다.
      순발력 있게 문제를 해결하는 모습을 보여줍니다.
      재미있는 놀이로 아이에게 자신감을 불어넣어요.
      아이는 실용적인 문제해결력과 적응력을 배웁니다.
    `,
    message: `
      "당신의 활기찬 에너지는 아이에게 자신감을 줍니다. 
      매일 짧은 시간이라도 정해진 시간에 함께하는 활동을 만들어보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ESTP"
},
ESFJ: {
    title: "따뜻한 정원지기",
    description: `
      세심한 관찰과 보살핌으로 아이를 건강하게 키웁니다.
      풍부한 공감능력으로 아이의 마음을 읽어냅니다.
      안정적인 환경에서 아이가 꽃처럼 자랄 수 있게 돕습니다.
      아이는 타인을 배려하는 따뜻한 마음을 배웁니다.
    `,
    message: `
      "당신의 따뜻한 마음은 아이에게 안정감이 됩니다. 
      때로는 한 발 물러서서 아이 스스로 해결할 수 있는 기회를 주어보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ESFJ"
},
  ISFJ: {
    title: "헌신적인 수호천사",
    description: `
      섬세한 관찰로 아이의 필요를 알아챕니다.
      꾸준한 사랑으로 안정감을 선물합니다.
      일상의 작은 것까지 챙기는 보살핌을 줍니다.
    `,
    matchesWell: `
      **찰떡 부모 유형:** ISTJ, ESFJ  
      책임감 있고 섬세한 성향이 잘 맞습니다
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** ENTP, ESTP  
      즉흥적이고 도전적인 성향과 차이를 느낄 수 있어요
    `,
    message: `
      "섬세하게 아이를 돌보는 당신은 헌신적인 수호천사입니다.  
      가끔은 아이 스스로 해결하게 해보는 것도 중요합니다."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ISFJ",
    productMessage: `
      "아이의 필요를 기록할 수 있는 **육아 다이어리**를 추천합니다."
    `
  },
  ISTP: {
    title: "지혜로운 발명가",
    description: `
      실용적인 해결책으로 문제를 해결합니다.
      차분한 관찰로 아이의 필요를 파악합니다.
      독립성과 문제 해결 능력을 키워줍니다.
    `,
    matchesWell: `
      **찰떡 부모 유형:** INTP, ESTP  
      실용적이고 문제 해결 중심의 성향이 잘 맞습니다
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** ESFJ, ENFJ  
      감정적이고 교감 중심의 성향과 충돌할 수 있어요
    `,
    message: `
      "아이에게 실용적 지혜를 가르치는 당신은 지혜로운 발명가입니다.  
      감정 표현도 자주 해보는 건 어떨까요?"
    `,
    productLink: "https://www.coupang.com/추천상품링크/ISTP",
    productMessage: `
      "아이와 함께하는 **DIY 키트**나  
      실험 활동이 포함된 **놀이 세트**를 추천합니다."
    `
  },
  ESFJ: {
    title: "따뜻한 정원지기",
    description: `
      세심한 관찰과 보살핌으로 아이를 건강하게 키웁니다.
      풍부한 공감 능력으로 아이의 마음을 읽어냅니다.
      안정적인 환경에서 아이가 꽃처럼 자랄 수 있게 돕습니다.
    `,
    matchesWell: `
      **찰떡 부모 유형:** ISFJ, ENFJ  
      세심하고 공감 중심의 성향이 잘 맞습니다
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** INTP, ISTP  
      논리적이고 실용적인 성향과 차이를 느낄 수 있어요
    `,
    message: `
      "아이의 감정을 읽어내고 따뜻하게 보살피는 당신은 아이의 정원지기입니다.  
      때로는 아이가 스스로 할 수 있도록 한 걸음 물러서 보는 것도 좋아요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ESFJ",
    productMessage: `
      "아이의 감정 표현을 돕는 **감정 카드**나  
      교감 활동을 위한 **책 읽기 세트**를 추천합니다."
    `
  },
  ISTJ: {
    title: "믿음직한 등대지기",
    description: `
      한결같은 마음으로 아이에게 안정감을 줍니다.
      정확하고 체계적인 지도로 길을 알려줍니다.
      원칙과 책임감의 중요성을 가르칩니다.
    `,
    matchesWell: `
      **찰떡 부모 유형:** ISFJ, INTJ  
      체계적이고 안정적인 성향이 잘 맞습니다
    `,
    matchesPoorly: `
      **잘 안 맞는 부모 유형:** ENFP, ESFP  
      자유롭고 즉흥적인 성향과 거리가 있을 수 있어요
    `,
    message: `
      "한결같은 지도로 아이에게 안정감을 주는 당신은 훌륭한 등대지기입니다.  
      가끔은 즉흥적인 활동으로 아이와 새로운 경험을 만들어보세요."
    `,
    productLink: "https://www.coupang.com/추천상품링크/ISTJ",
    productMessage: `
      "체계적인 육아를 돕는 **스케줄러**나  
      **체크리스트 노트**를 활용해보세요."
    `
  }
};

let currentQuestionIndex = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let previousAnswers = [];

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const backButton = document.getElementById("back-button");
    
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
}

  if (currentQuestionIndex > 0) {
    backButton.classList.remove("hidden");
  } else {
    backButton.classList.add("hidden");
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function goBack() {
  if (currentQuestionIndex > 0) {
    const lastAnswer = previousAnswers.pop();
    Object.keys(lastAnswer.scores).forEach((key) => {
      scores[key] -= lastAnswer.scores[key];
    });
    currentQuestionIndex--;
    renderQuestion();
  }
}

function calculateMBTI() {
  const eOrI = scores.E >= scores.I ? "E" : "I";
  const sOrN = scores.S >= scores.N ? "S" : "N";
  const tOrF = scores.T >= scores.F ? "T" : "F";
  const jOrP = scores.J >= scores.P ? "J" : "P";
  return `${eOrI}${sOrN}${tOrF}${jOrP}`;
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  const resultType = calculateMBTI();
  const resultData = results[resultType];

  if (!resultData) {
    console.error(`결과 데이터를 찾을 수 없습니다: ${resultType}`);
    document.getElementById("result").innerText = "결과를 찾을 수 없습니다. 다시 시도해주세요.";
    return;
  }

  const resultElement = document.getElementById("result");
  const productLink = document.getElementById("product-link");

resultElement.innerHTML = `
    <h2>${resultType} - ${resultData.title}</h2>
    <div class="description">
      ${resultData.description}
    </div>
    <div class="message">
      ${resultData.message}
    </div>
  `;
productLink.href = resultData.productLink;
}

renderQuestion();
