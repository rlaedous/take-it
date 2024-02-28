export const surveys = [
  {
    order: 1,
    question: '누구한테 줄 거임?',
    answers: [
      { name: '친구', value: '친구' },
      { name: '부모님', value: '부모님' },
      { name: '연인', value: '연인' }
    ],
    questionType: 'whom'
  },
  {
    order: 2,
    question: '성별 뭐임?',
    answers: [
      { name: '남자', value: 'M' },
      { name: '여자', value: 'F' }
    ],
    questionType: 'gender'
  },

  {
    order: 3,
    question: '몇 살임?',
    answers: [
      { name: '10대', value: '10s' },
      { name: '20대', value: '20s' },
      { name: '30대', value: '30s' },
      { name: '40대', value: '40s' },
      { name: '50대 이상', value: 'over50s' }
    ],

    questionType: 'age'
  },
  {
    order: 4,
    question: '돈 얼마 있어?',
    answers: [
      { name: '10,000원 미만', value: [0, 10000] },
      { name: '10,000원 ~ 30,000원', value: [10000, 30000] },
      { name: '50,000원 ~ 100,000원', value: [50000, 1000000] },
      { name: '100,000원 ~ 300,000원', value: [1000000, 300000] },
      { name: '300,000원 이상', value: [3000000, 10000000] }
    ],
    questionType: 'money'
  },
  {
    order: 5,
    question: '즉흥적임?',
    answers: [
      { name: 'ㅇㅇ', value: '' },
      { name: 'ㄴㄴ', value: '' }
    ]
  },
  {
    order: 6,
    question: '감성적임?',
    answers: [
      { name: 'ㅇㅇ', value: false },
      { name: 'ㄴㄴ', value: true }
    ],
    questionType: 'isT'
  },
  {
    order: 7,
    question: '외향적임?',
    answers: [
      { name: 'ㅇㅇ', value: '' },
      { name: 'ㄴㄴ', value: '' }
    ]
  }
];
