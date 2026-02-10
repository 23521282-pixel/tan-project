
export interface Question {
  id: number;
  label: string;
  stem: string;
  correct: string;
  options: { key: string; text: string }[];
  explanation?: string;
}

export interface TestSection {
  id: number;
  title: string;
  instruction: string;
  passage?: string;
  questions: Question[];
}

export interface CourseTestData {
  id: string;
  title: string;
  totalQuestions: number;
  estimatedTime: number; // in minutes
  sections: TestSection[];
}

export const FOUNDATION_ENTRY_TEST: CourseTestData = {
  id: 'foundation-entry-test',
  title: 'TEST 01: ĐÁNH GIÁ NĂNG LỰC ĐẦU VÀO - KHÓA 21 NGÀY',
  totalQuestions: 40,
  estimatedTime: 45,
  sections: [
    {
      id: 1,
      title: 'PHẦN 1: NGỮ PHÁP & TỪ VỰNG TỔNG HỢP',
      instruction: 'Match A, B, C, or D with each sentence to complete it correctly in terms of grammar and meaning.',
      questions: [
        { 
          id: 1, label: 'Câu 1', 
          stem: 'Planting more trees is __________ effective way to combat deforestation.',
          correct: 'B', 
          options: [{key: 'A', text: 'a'}, {key: 'B', text: 'an'}, {key: 'C', text: 'the'}, {key: 'D', text: 'Ø'}], 
          explanation: "✅ Đáp án: an\n🔎 Lí do: 'effective' bắt đầu bằng nguyên âm 'e', cần dùng mạo từ 'an'." 
        },
        { 
          id: 2, label: 'Câu 2', 
          stem: 'Due to the increasing reliance on online learning platforms at the time of COVID-19, students’ ability to engage in face-to-face discussions ______.',
          correct: 'A', 
          options: [{key: 'A', text: 'has diminished'}, {key: 'B', text: 'have been diminishing'}, {key: 'C', text: 'have been diminished'}, {key: 'D', text: 'have diminished'}],
          explanation: "✅ Đáp án: has diminished\n🔎 Lí do: Chủ ngữ chính là 'ability' (số ít), động từ phải chia số ít." 
        },
        { 
          id: 3, label: 'Câu 3', 
          stem: 'Innovative teaching methods can inspire students to develop their __________ thinking skills, which prepares them for complex problem-solving in the future.',
          correct: 'A', 
          options: [{key: 'A', text: 'imaginative'}, {key: 'B', text: 'imaginable'}, {key: 'C', text: 'imaginary'}, {key: 'D', text: 'imaging'}],
          explanation: "✅ Đáp án: imaginative\n🔎 Lí do: 'imaginative thinking' = tư duy giàu trí tưởng tượng." 
        },
        { 
          id: 4, label: 'Câu 4', 
          stem: 'If we want to reduce carbon emissions, we need to gradually stop using fossil fuels and switch to ______ energy sources like solar or wind.',
          correct: 'C', 
          options: [{key: 'A', text: 'non-renewable'}, {key: 'B', text: 'natural'}, {key: 'C', text: 'renewable'}, {key: 'D', text: 'organic'}],
          explanation: "✅ Đáp án: renewable\n🔎 Lí do: 'renewable energy' = năng lượng tái tạo." 
        },
        { 
          id: 5, label: 'Câu 5', 
          stem: 'Deforestation not only destroys habitats but also __________ biodiversity in fragile ecosystems.',
          correct: 'A', 
          options: [{key: 'A', text: 'compromises'}, {key: 'B', text: 'composes'}, {key: 'C', text: 'compels'}, {key: 'D', text: 'comprises'}],
          explanation: "✅ Đáp án: compromises\n🔎 Lí do: 'compromise' ở đây nghĩa là làm tổn hại, gây nguy hiểm." 
        },
        { 
          id: 6, label: 'Câu 6', 
          stem: 'Among all the renewable energy sources, solar power is considered to be __________ cost-effective option for generating electricity in sunny regions.',
          correct: 'D', 
          options: [{key: 'A', text: 'the more'}, {key: 'B', text: 'most'}, {key: 'C', text: 'more'}, {key: 'D', text: 'the most'}],
          explanation: "✅ Đáp án: the most\n🔎 Lí do: So sánh nhất trong nhóm tất cả các nguồn năng lượng." 
        },
        { 
          id: 7, label: 'Câu 7', 
          stem: 'The increase in meat consumption worldwide is a major factor in rising methane emissions from the __________ industry.',
          correct: 'C', 
          options: [{key: 'A', text: 'textile'}, {key: 'B', text: 'aviation'}, {key: 'C', text: 'livestock'}, {key: 'D', text: 'mining'}],
          explanation: "✅ Đáp án: livestock\n🔎 Lí do: 'livestock industry' = ngành chăn nuôi." 
        },
        { 
          id: 8, label: 'Câu 8', 
          stem: 'The hospital has introduced a new policy to improve patient care, but _____ will only be effective if all staff members comply with the guidelines.',
          correct: 'A', 
          options: [{key: 'A', text: 'it'}, {key: 'B', text: 'these'}, {key: 'C', text: 'them'}, {key: 'D', text: 'this'}],
          explanation: "✅ Đáp án: it\n🔎 Lí do: 'it' thay thế cho danh từ số ít 'policy'." 
        },
        { 
          id: 9, label: 'Câu 9', 
          stem: 'The researchers interviewed a group of patients who had undergone the treatment, and some of __________ felt that the procedure could have been improved.',
          correct: 'A', 
          options: [{key: 'A', text: 'them'}, {key: 'B', text: 'their'}, {key: 'C', text: 'they'}, {key: 'D', text: 'those'}],
          explanation: "✅ Đáp án: them\n🔎 Lí do: Cần tân ngữ sau giới từ 'some of them'." 
        },
        { 
          id: 10, label: 'Câu 10', 
          stem: 'Despite the significant efforts made by governments to reduce carbon emissions, renewable energy sources are __________ effective than traditional fossil fuels in combating climate change.',
          correct: 'B', 
          options: [{key: 'A', text: 'much'}, {key: 'B', text: 'much more'}, {key: 'C', text: 'less more'}, {key: 'D', text: 'far'}],
          explanation: "✅ Đáp án: much more\n🔎 Lí do: Cấu trúc nhấn mạnh so sánh hơn 'much more effective than'." 
        },
        { 
          id: 11, label: 'Câu 11', 
          stem: 'A __________ amount of food waste is produced every year in urban areas, contributing to environmental pollution.',
          correct: 'B', 
          options: [{key: 'A', text: 'great'}, {key: 'B', text: 'large'}, {key: 'C', text: 'significance'}, {key: 'D', text: 'numerous'}],
          explanation: "✅ Đáp án: large\n🔎 Lí do: Cụm từ 'a large amount of' đi với danh từ không đếm được." 
        },
        { 
          id: 12, label: 'Câu 12', 
          stem: 'The organization, __________ policies have been praised for fostering a positive work culture, continues to expand its operations globally.',
          correct: 'B', 
          options: [{key: 'A', text: 'which'}, {key: 'B', text: 'whose'}, {key: 'C', text: 'who'}, {key: 'D', text: 'whom'}],
          explanation: "✅ Đáp án: whose\n🔎 Lí do: Đại từ quan hệ chỉ sở hữu (chính sách của tổ chức đó)." 
        },
        { 
          id: 13, label: 'Câu 13', 
          stem: 'She decided to quit her job, __________ surprised everyone in the office.',
          correct: 'B', 
          options: [{key: 'A', text: 'that'}, {key: 'B', text: 'which'}, {key: 'C', text: 'who'}, {key: 'D', text: 'whom'}],
          explanation: "✅ Đáp án: which\n🔎 Lí do: 'which' thay thế cho cả mệnh đề đứng trước." 
        },
        { 
          id: 14, label: 'Câu 14', 
          stem: 'Mr. Lee, __________ has been working here for over 20 years, is retiring next month.',
          correct: 'B', 
          options: [{key: 'A', text: 'that'}, {key: 'B', text: 'who'}, {key: 'C', text: 'whom'}, {key: 'D', text: 'whose'}],
          explanation: "✅ Đáp án: who\n🔎 Lí do: Đại từ quan hệ chỉ người làm chủ ngữ trong mệnh đề không xác định." 
        },
      ]
    },
    {
      id: 2,
      title: 'PHẦN 2: Cloze Reading - BUILDING A GREENER FUTURE',
      instruction: 'Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the option that best fits each of the numbered blanks from 15 to 20.',
      passage: "BUILDING A GREENER FUTURE\n\nEnvironmental degradation is (15) _______ to both nature and human life. Global warming, largely driven by (16) _______ activity such as the burning of fossil fuels, has led to extreme weather conditions, sea level rise, and the (17) _______ of species.\nTo prevent further damage, experts suggest a two-fold approach. First, we must (18) _______ public awareness through education and community programs. Second, it is essential to replace fossil fuels with (19) _______ energy from solar, wind, or water sources. By adopting these practices and working together, we can (20) _______ one of the greatest challenges of our time.",
      questions: [
        { id: 15, label: 'Câu 15', stem: 'Blank (15)', correct: 'A', options: [{key: 'A', text: 'posing a serious threat'}, {key: 'B', text: 'making an improvement'}, {key: 'C', text: 'offering solutions'}, {key: 'D', text: 'calling for donations'}] },
        { id: 16, label: 'Câu 16', stem: 'Blank (16)', correct: 'C', options: [{key: 'A', text: 'random'}, {key: 'B', text: 'industrial'}, {key: 'C', text: 'human'}, {key: 'D', text: 'nuclear'}] },
        { id: 17, label: 'Câu 17', stem: 'Blank (17)', correct: 'B', options: [{key: 'A', text: 'expansion'}, {key: 'B', text: 'extinction'}, {key: 'C', text: 'introduction'}, {key: 'D', text: 'solution'}] },
        { id: 18, label: 'Câu 18', stem: 'Blank (18)', correct: 'C', options: [{key: 'A', text: 'increase'}, {key: 'B', text: 'block'}, {key: 'C', text: 'raise'}, {key: 'D', text: 'absorb'}] },
        { id: 19, label: 'Câu 19', stem: 'Blank (19)', correct: 'D', options: [{key: 'A', text: 'organic'}, {key: 'B', text: 'fossil'}, {key: 'C', text: 'petroleum'}, {key: 'D', text: 'renewable'}] },
        { id: 20, label: 'Câu 20', stem: 'Blank (20)', correct: 'A', options: [{key: 'A', text: 'tackle'}, {key: 'B', text: 'prolong'}, {key: 'C', text: 'promote'}, {key: 'D', text: 'emit'}] },
      ]
    },
    {
      id: 3,
      title: 'PHẦN 3: TENSES & VERB FORMS',
      instruction: 'Match A, B, C, or D with each sentence to complete it correctly in terms of grammar and meaning.',
      questions: [
        { 
          id: 21, label: 'Câu 21', 
          stem: 'When I met Walters about two years before his death he didn’t seem satisfied. He ______ no major book since he settled in Uganda.',
          correct: 'D', 
          options: [{key: 'A', text: 'has published'}, {key: 'B', text: 'could have published'}, {key: 'C', text: 'published'}, {key: 'D', text: 'had published'}],
          explanation: "✅ Đáp án: had published\n🔎 Lí do: Hành động xảy ra trước 1 thời điểm trong quá khứ -> QKHT." 
        },
        { 
          id: 22, label: 'Câu 22', 
          stem: 'Their parents ______ at home when the robber broke into their house.',
          correct: 'D', 
          options: [{key: 'A', text: "aren't"}, {key: 'B', text: "didn't"}, {key: 'C', text: "wasn't"}, {key: 'D', text: "weren't"}],
          explanation: "✅ Đáp án: weren't\n🔎 Lí do: Chủ ngữ số nhiều 'parents', sự việc trong quá khứ." 
        },
        { 
          id: 23, label: 'Câu 23', 
          stem: 'When Ms. Huyen______ to the interview yesterday, she wore her best suit.',
          correct: 'A', 
          options: [{key: 'A', text: 'went'}, {key: 'B', text: 'was going'}, {key: 'C', text: 'had gone'}, {key: 'D', text: 'goes'}],
          explanation: "✅ Đáp án: went\n🔎 Lí do: Kể lại một chuỗi hành động xảy ra liên tiếp trong quá khứ." 
        },
        { 
          id: 24, label: 'Câu 24', 
          stem: 'While my mother ______ housework, I ______ games.',
          correct: 'D', 
          options: [{key: 'A', text: 'does / playing'}, {key: 'B', text: 'is doing / play'}, {key: 'C', text: 'does / played'}, {key: 'D', text: 'was doing / was playing'}],
          explanation: "✅ Đáp án: was doing / was playing\n🔎 Lí do: Hai hành động đang xảy ra song song tại 1 thời điểm trong quá khứ." 
        },
        { 
          id: 25, label: 'Câu 25', 
          stem: 'I wanted to say goodbye to Nam, but he ______.',
          correct: 'D', 
          options: [{key: 'A', text: 'was already left'}, {key: 'B', text: 'already left'}, {key: 'C', text: 'had already been leaving'}, {key: 'D', text: 'had already left'}],
          explanation: "✅ Đáp án: had already left\n🔎 Lí do: Nam đã đi trước khi tôi định chào tạm biệt (hành động xảy ra trước hành động quá khứ khác)." 
        },
        { 
          id: 26, label: 'Câu 26', 
          stem: 'Until this June, I ______ at National Economics University for one year.',
          correct: 'D', 
          options: [{key: 'A', text: 'have studied'}, {key: 'B', text: 'will study'}, {key: 'C', text: 'am studying'}, {key: 'D', text: 'will have been studying'}],
          explanation: "✅ Đáp án: will have been studying\n🔎 Lí do: Diễn tả hành động kéo dài liên tục đến một thời điểm trong tương lai." 
        },
        { 
          id: 27, label: 'Câu 27', 
          stem: 'At the moment, Anna ______ vegetables in the kitchen to prepare breakfast for her family.',
          correct: 'A', 
          options: [{key: 'A', text: 'is washing'}, {key: 'B', text: 'washes'}, {key: 'C', text: 'has washed'}, {key: 'D', text: 'washed'}],
          explanation: "✅ Đáp án: is washing\n🔎 Lí do: 'At the moment' là dấu hiệu của thì hiện tại tiếp diễn." 
        },
        { 
          id: 28, label: 'Câu 28', 
          stem: 'When I met him yesterday, he just ______ and ______ going.',
          correct: 'B', 
          options: [{key: 'A', text: 'ignores – keeps'}, {key: 'B', text: 'ignored – kept'}, {key: 'C', text: 'will ignore – keep'}, {key: 'D', text: 'has ignored – kept'}],
          explanation: "✅ Đáp án: ignored – kept\n🔎 Lí do: Kể lại sự việc đã kết thúc trong quá khứ." 
        },
        { 
          id: 29, label: 'Câu 29', 
          stem: 'How much money ______ you ______ by next week?',
          correct: 'D', 
          options: [{key: 'A', text: 'will – save'}, {key: 'B', text: 'will – be saving'}, {key: 'C', text: 'do – save'}, {key: 'D', text: 'will – have saved'}],
          explanation: "✅ Đáp án: will – have saved\n🔎 Lí do: 'by + mốc tương lai' dùng thì tương lai hoàn thành." 
        },
      ]
    },
    {
      id: 4,
      title: 'PHẦN 4: Cloze Reading - FOOD WASTE CAFÉ',
      instruction: 'Read the following announcement and mark the letter A, B, C or D on your answer sheet to indicate the option that best fits each of the numbered blanks from 30 to 35.',
      passage: "Food Waste Café - every bite counts!\n\nWe are a student-led group focused (30) ______ reducing food waste and promoting social eating. We collect surplus food and cook meals together at cafés and food stalls. The meals (31) ______ on a pay-as-you-feel basis, making them budget-friendly, (32) ______ and tasty for everyone.\nLast year, (33) ______ some difficulties, we saved 1,895 kg of surplus food and raised £983 for charity - more than the previous year!\nWe're excited about the new academic year and hope to hold more events (34) ______ we can cook, share meals, and connect with others who care about putting a(n) (35) ______ to food waste.\nJoin us and be part of the change!",
      questions: [
        { id: 30, label: 'Câu 30', stem: 'Blank (30)', correct: 'A', options: [{key: 'A', text: 'on'}, {key: 'B', text: 'at'}, {key: 'C', text: 'to'}, {key: 'D', text: 'in'}] },
        { id: 31, label: 'Câu 31', stem: 'Blank (31)', correct: 'B', options: [{key: 'A', text: 'are offering'}, {key: 'B', text: 'are offered'}, {key: 'C', text: 'offer'}, {key: 'D', text: 'offered'}] },
        { id: 32, label: 'Câu 32', stem: 'Blank (32)', correct: 'C', options: [{key: 'A', text: 'sustain'}, {key: 'B', text: 'sustainability'}, {key: 'C', text: 'sustainable'}, {key: 'D', text: 'sustainably'}] },
        { id: 33, label: 'Câu 33', stem: 'Blank (33)', correct: 'A', options: [{key: 'A', text: 'despite'}, {key: 'B', text: 'given'}, {key: 'C', text: 'because of'}, {key: 'D', text: 'in addition to'}] },
        { id: 34, label: 'Câu 34', stem: 'Blank (34)', correct: 'C', options: [{key: 'A', text: 'that'}, {key: 'B', text: 'whom'}, {key: 'C', text: 'where'}, {key: 'D', text: 'which'}] },
        { id: 35, label: 'Câu 35', stem: 'Blank (35)', correct: 'B', options: [{key: 'A', text: 'close'}, {key: 'B', text: 'end'}, {key: 'C', text: 'break'}, {key: 'D', text: 'finish'}] },
      ]
    },
    {
      id: 5,
      title: 'PHẦN 5: Reading - RED RIVER',
      instruction: 'Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the option that best fits each of the numbered blanks from 36 to 40.',
      passage: "FROM THE BUSTLING CITIES THAT\n\nThe Red River, flowing through the north of Vietnam, (36)______. From the bustling cities that line its banks to the ancient temples and historic sites that dot the landscape, the Red River is a must-see destination for any traveler who wants to experience the rich history and vibrant culture of Vietnam. The Red River originates in China and flows into Vietnam, eventually emptying into the Gulf of Tonkin. It enters Vietnam at A Mu Sung commune in Bat Xat District and continues through Hanoi. The river then flows into the East Sea at the Ba Lat Estuary (37)______. The Vietnam Red River is not only crucial for agriculture and fisheries but also contributes to the scenic beauty of the North Vietnamese landscape. The river's silt provides nutrients for farmland and helps expand the coastal delta region. (38)______. Known for its breathtaking scenery and rich biodiversity, (39)______. The surrounding riverbanks are home to numerous species of plants and animals, some of which are unique to the region. (40)______. As a cultural and economic lifeline, the Red River continues to shape the identity of northern Vietnam, making it an essential part of the country's heritage.",
      questions: [
        { id: 36, label: 'Câu 36', stem: 'Blank (36)', correct: 'D', options: [{key: 'A', text: 'where a stunning blend of natural beauty and cultural heritage is offered'}, {key: 'B', text: 'offering a stunning blend of natural beauty and cultural heritage'}, {key: 'C', text: 'which offers a stunning blend of natural beauty and cultural heritage'}, {key: 'D', text: 'offers a stunning blend of natural beauty and cultural heritage'}] },
        { id: 37, label: 'Câu 37', stem: 'Blank (37)', correct: 'A', options: [{key: 'A', text: 'which is located between the provinces of Thai Binh and Nam Dinh'}, {key: 'B', text: 'is located between the provinces of Thai Binh and Nam Dinh'}, {key: 'C', text: 'has its location between the provinces of Thai Binh and Nam Dinh'}, {key: 'D', text: 'of which the location between the provinces of Thai Binh and Nam Dinh'}] },
        { id: 38, label: 'Câu 38', stem: 'Blank (38)', correct: 'B', options: [{key: 'A', text: 'Being a significant source of fish, freshwater aquaculture in the Red River Delta also grows'}, {key: 'B', text: 'It is also a significant source of fish for freshwater aquaculture in the Red River Delta'}, {key: 'C', text: 'Freshwater aquaculture in the Red River Delta is also a significant source of fish'}, {key: 'D', text: 'The Red River Delta also helps it become a significant source of fish for freshwater aquaculture'}] },
        { id: 39, label: 'Câu 39', stem: 'Blank (39)', correct: 'C', options: [{key: 'A', text: 'local communities and the environment can benefit from the Red River as a vital resource'}, {key: 'B', text: 'the environment and local communities consider the Red River as a vital source'}, {key: 'C', text: 'the Red River is a vital resource for both the local communities and the environment'}, {key: 'D', text: 'residents can make use of it as a vital resource for them as well as the environment'}] },
        { id: 40, label: 'Câu 40', stem: 'Blank (40)', correct: 'A', options: [{key: 'A', text: 'The river also plays a significant role in the daily lives of the people, providing water for drinking, irrigation, and transportation'}, {key: 'B', text: 'Offering water for drinking, irrigation, and transportation, the daily lives of the people also depend on the role of the river'}, {key: 'C', text: 'Even though it provides water for drinking, irrigation, and transportation, the river also plays a significant role in the daily lives of the people'}, {key: 'D', text: 'The role of the river is also significant in the daily lives of the people so that it provides water for drinking, irrigation, and transportation'}] },
      ]
    }
  ]
};
