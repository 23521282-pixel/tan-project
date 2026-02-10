export interface Flashcard {
  id: string;
  word: string;
  ipa: string;
  meaning: string;
  example: string;
  status: 'new' | 'learning' | 'mastered';
  thinkingPrompt?: string;
}

export interface FlashcardSet {
  id: string;
  title: string;
  level: string;
  category: string;
  cards: Flashcard[];
}

export const FLASHCARD_SETS: FlashcardSet[] = [
  // ===========================================================================
  // TOPIC 1: TECHNOLOGY & ARTIFICIAL INTELLIGENCE (AI)
  // ===========================================================================
  {
    id: 'tech-f-p1', title: 'TECH & AI (A1-B2) (P1)', level: 'A1-B1', category: 'Technology',
    cards: [
      { id: 't1', word: 'computer', ipa: '/kəmˈpjuːtər/', meaning: 'máy tính', example: 'I use a computer for my homework.', status: 'new' },
      { id: 't2', word: 'phone', ipa: '/fəʊn/', meaning: 'điện thoại', example: 'She talks to her friends on the phone.', status: 'new' },
      { id: 't3', word: 'internet', ipa: '/ˈɪntənet/', meaning: 'Internet', example: 'The internet helps us find information.', status: 'new' },
      { id: 't4', word: 'screen', ipa: '/skriːn/', meaning: 'màn hình', example: 'The screen is too bright.', status: 'new' },
      { id: 't5', word: 'website', ipa: '/ˈwebsaɪt/', meaning: 'trang web', example: 'This website is very useful.', status: 'new' },
      { id: 't6', word: 'online', ipa: '/ˈɒnlaɪn/', meaning: 'trực tuyến', example: 'Many classes are online now.', status: 'new' },
      { id: 't7', word: 'device', ipa: '/dɪˈvaɪs/', meaning: 'thiết bị', example: 'Mobile phones are popular devices.', status: 'new' },
      { id: 't8', word: 'download', ipa: '/ˌdaʊnˈləʊd/', meaning: 'tải xuống', example: 'You can download the app for free.', status: 'new' },
      { id: 't9', word: 'upload', ipa: '/ˈʌpləʊd/', meaning: 'tải lên', example: 'He uploaded a video yesterday.', status: 'new' },
      { id: 't10', word: 'password', ipa: '/ˈpɑːswɜːd/', meaning: 'mật khẩu', example: 'Never share your password.', status: 'new' },
      { id: 't11', word: 'social media', ipa: '/ˌsəʊʃl ˈmiːdiə/', meaning: 'mạng xã hội', example: 'Teenagers spend time on social media.', status: 'new' },
      { id: 't12', word: 'message', ipa: '/ˈmesɪdʒ/', meaning: 'tin nhắn', example: 'I sent her a message.', status: 'new' },
      { id: 't13', word: 'technology', ipa: '/tekˈnɒlədʒi/', meaning: 'công nghệ', example: 'Technology changes our lives.', status: 'new' },
      { id: 't14', word: 'software', ipa: '/ˈsɒftweə/', meaning: 'phần mềm', example: 'This software is easy to use.', status: 'new' },
      { id: 't15', word: 'hardware', ipa: '/ˈhɑːdweə/', meaning: 'phần cứng', example: 'Hardware problems are expensive.', status: 'new' }
    ]
  },
  {
    id: 'tech-f-p2', title: 'TECH & AI (A1-B2) (P2)', level: 'B1-B2', category: 'Technology',
    cards: [
      { id: 't16', word: 'application (app)', ipa: '/ˌæplɪˈkeɪʃn/', meaning: 'ứng dụng', example: 'This app helps students learn English.', status: 'new' },
      { id: 't17', word: 'digital', ipa: '/ˈdɪdʒɪtl/', meaning: 'kỹ thuật số', example: 'We live in a digital world.', status: 'new' },
      { id: 't18', word: 'data', ipa: '/ˈdeɪtə/', meaning: 'dữ liệu', example: 'The company stores user data.', status: 'new' },
      { id: 't19', word: 'information', ipa: '/ˌɪnfəˈmeɪʃn/', meaning: 'thông tin', example: 'Information is easy to access online.', status: 'new' },
      { id: 't20', word: 'robot', ipa: '/ˈrəʊbɒt/', meaning: 'robot', example: 'Robots can work in factories.', status: 'new' },
      { id: 't21', word: 'machine', ipa: '/məˈʃiːn/', meaning: 'máy móc', example: 'This machine saves time.', status: 'new' },
      { id: 't22', word: 'connect', ipa: '/kəˈnekt/', meaning: 'kết nối', example: 'The internet connects people worldwide.', status: 'new' },
      { id: 't23', word: 'artificial intelligence', ipa: '/ˌɑːtɪˈfɪʃl ɪnˈtelɪdʒəns/', meaning: 'trí tuệ nhân tạo', example: 'AI is used in many industries.', status: 'new' },
      { id: 't24', word: 'automation', ipa: '/ˌɔːtəˈmeɪʃn/', meaning: 'tự động hóa', example: 'Automation increases productivity.', status: 'new' },
      { id: 't25', word: 'innovation', ipa: '/ˌɪnəˈveɪʃn/', meaning: 'sự đổi mới', example: 'Innovation drives economic growth.', status: 'new' },
      { id: 't26', word: 'efficiency', ipa: '/ɪˈfɪʃnsi/', meaning: 'hiệu quả', example: 'Technology improves efficiency at work.', status: 'new' },
      { id: 't27', word: 'access', ipa: '/ˈækses/', meaning: 'quyền truy cập', example: 'Students have access to online resources.', status: 'new' },
      { id: 't28', word: 'privacy', ipa: '/ˈprɪvəsi/', meaning: 'quyền riêng tư', example: 'Privacy is a serious concern online.', status: 'new' },
      { id: 't29', word: 'security', ipa: '/sɪˈkjʊərəti/', meaning: 'bảo mật', example: 'Internet security is important.', status: 'new' },
      { id: 't30', word: 'user-friendly', ipa: '/ˌjuːzə ˈfrendli/', meaning: 'dễ sử dụng', example: 'The app is user-friendly.', status: 'new' }
    ]
  },
  {
    id: 'tech-f-p3', title: 'TECH & AI (A1-B2) (P3)', level: 'B2', category: 'Technology',
    cards: [
      { id: 't31', word: 'replace', ipa: '/rɪˈpleɪs/', meaning: 'thay thế', example: 'Robots may replace human workers.', status: 'new' },
      { id: 't32', word: 'impact', ipa: '/ˈɪmpækt/', meaning: 'tác động', example: 'Technology has a big impact on education.', status: 'new' },
      { id: 't33', word: 'advanced', ipa: '/ədˈvɑːnst/', meaning: 'tiên tiến', example: 'Advanced technology saves lives.', status: 'new' },
      { id: 't34', word: 'virtual', ipa: '/ˈvɜːtʃuəl/', meaning: 'ảo', example: 'Virtual classes are common today.', status: 'new' },
      { id: 't35', word: 'digital divide', ipa: '/ˌdɪdʒɪtl dɪˈvaɪd/', meaning: 'khoảng cách số', example: 'The digital divide affects rural areas.', status: 'new' },
      { id: 't36', word: 'dependence', ipa: '/dɪˈpɛndəns/', meaning: 'sự phụ thuộc', example: 'There is growing dependence on technology.', status: 'new' },
      { id: 't37', word: 'innovation-driven', ipa: '/drɪvn/', meaning: 'định hướng đổi mới', example: 'Innovation-driven companies grow fast.', status: 'new' },
      { id: 't38', word: 'ethical', ipa: '/ˈɛθɪkl/', meaning: 'thuộc đạo đức', example: 'AI raises ethical questions.', status: 'new' },
      { id: 't39', word: 'transform', ipa: '/trænsˈfɔːm/', meaning: 'thay đổi hoàn toàn', example: 'Technology can transform education.', status: 'new' },
      { id: 't40', word: 'network', ipa: '/ˈnɛtwɜːrk/', meaning: 'mạng lưới', example: 'We have a large social network.', status: 'new' }
    ]
  },
  {
    id: 'tech-a-p1', title: 'TECH & AI (C1-C2) (P1)', level: 'C1-C2', category: 'Technology',
    cards: [
      { id: 'ta1', word: 'artificial general intelligence (AGI)', ipa: '/ˌɑːtɪˈfɪʃl ˈdʒɛnrəl/', meaning: 'trí tuệ nhân tạo tổng quát', example: 'AGI aims to perform any intellectual task a human can.', status: 'new' },
      { id: 'ta2', word: 'machine learning algorithms', ipa: '/məˈʃiːn ˈlɜːrnɪŋ/', meaning: 'thuật toán học máy', example: 'ML algorithms improve accuracy over time.', status: 'new' },
      { id: 'ta3', word: 'neural network architecture', ipa: '/ˈnjʊərəl ˈnɛtwɜːrk/', meaning: 'kiến trúc mạng nơ-ron', example: 'The architecture affects system performance.', status: 'new' },
      { id: 'ta4', word: 'deep learning models', ipa: '/diːp ˈlɜːrnɪŋ/', meaning: 'mô hình học sâu', example: 'Deep learning models excel at image recognition.', status: 'new' },
      { id: 'ta5', word: 'data-driven decision-making', ipa: '/ˈdeɪtə ˈdrɪvn/', meaning: 'ra quyết định dựa trên dữ liệu', example: 'This approach enhances efficiency.', status: 'new' },
      { id: 'ta6', word: 'algorithmic bias', ipa: '/ˌælɡəˈrɪðmɪk ˈbaɪəs/', meaning: 'thiên lệch thuật toán', example: 'Bias can reinforce discrimination.', status: 'new' },
      { id: 'ta7', word: 'ethical implications of AI', ipa: '/ˈɛθɪkl/', meaning: 'hệ quả đạo đức của AI', example: 'The implications remain controversial.', status: 'new' },
      { id: 'ta8', word: 'autonomous systems', ipa: '/ɔːˈtɒnəməs/', meaning: 'hệ thống tự hành', example: 'Autonomous systems reduce human error.', status: 'new' },
      { id: 'ta9', word: 'natural language processing (NLP)', ipa: '/ˌnætʃrəl/', meaning: 'xử lý ngôn ngữ tự nhiên', example: 'NLP allows machines to understand speech.', status: 'new' },
      { id: 'ta10', word: 'computer vision', ipa: '/kəmˈpjuːtər ˈvɪʒn/', meaning: 'thị giác máy tính', example: 'Computer vision enables facial recognition.', status: 'new' },
      { id: 'ta11', word: 'big data analytics', ipa: '/bɪɡ ˈdeɪtə/', meaning: 'phân tích dữ liệu lớn', example: 'Analytics supports strategic planning.', status: 'new' },
      { id: 'ta12', word: 'human–machine interaction', ipa: '/ˌhjuːmən/', meaning: 'tương tác người–máy', example: 'Interaction affects usability.', status: 'new' },
      { id: 'ta13', word: 'predictive modeling', ipa: '/prɪˈdɪktɪv/', meaning: 'mô hình dự đoán', example: 'Modeling forecasts consumer behavior.', status: 'new' },
      { id: 'ta14', word: 'digital transformation', ipa: '/ˈdɪdʒɪtl/', meaning: 'chuyển đổi số', example: 'Transformation reshapes industries.', status: 'new' },
      { id: 'ta15', word: 'technological disruption', ipa: '/ˌtɛknəˈlɒdʒɪkl/', meaning: 'sự phá vỡ công nghệ', example: 'AI causes technological disruption.', status: 'new' }
    ]
  },
  {
    id: 'tech-a-p2', title: 'TECH & AI (C1-C2) (P2)', level: 'C1-C2', category: 'Technology',
    cards: [
      { id: 'ta16', word: 'automation of labor', ipa: '/ˌɔːtəˈmeɪʃn/', meaning: 'tự động hóa lao động', example: 'Automation threatens low-skilled jobs.', status: 'new' },
      { id: 'ta17', word: 'intelligent automation', ipa: '/ɪnˈtɛlɪdʒənt/', meaning: 'tự động hóa thông minh', example: 'It boosts productivity.', status: 'new' },
      { id: 'ta18', word: 'cloud-based computing', ipa: '/klaʊd/', meaning: 'điện toán đám mây', example: 'Cloud computing improves scalability.', status: 'new' },
      { id: 'ta19', word: 'edge computing', ipa: '/ɛdʒ/', meaning: 'điện toán biên', example: 'Edge computing reduces latency.', status: 'new' },
      { id: 'ta20', word: 'quantum computing', ipa: '/ˈkwɒntəm/', meaning: 'điện toán lượng tử', example: 'Quantum computing may revolutionize security.', status: 'new' },
      { id: 'ta21', word: 'cybersecurity threats', ipa: '/ˈsaɪbəsɪˌkjʊərɪti/', meaning: 'mối đe dọa an ninh mạng', example: 'Threats are increasing rapidly.', status: 'new' },
      { id: 'ta22', word: 'data privacy concerns', ipa: '/ˈdeɪtə/', meaning: 'lo ngại về quyền riêng tư dữ liệu', example: 'Privacy affects public trust.', status: 'new' },
      { id: 'ta23', word: 'surveillance technologies', ipa: '/sərˈveɪləns/', meaning: 'công nghệ giám sát', example: 'Surveillance raises ethical questions.', status: 'new' },
      { id: 'ta24', word: 'AI governance', ipa: '/ˈɡʌvərnəns/', meaning: 'quản trị AI', example: 'Governance ensures responsible development.', status: 'new' },
      { id: 'ta25', word: 'explainable AI', ipa: '/ɪkˈspleɪnəbl/', meaning: 'AI có thể giải thích', example: 'Explainable AI improves transparency.', status: 'new' },
      { id: 'ta26', word: 'reinforcement learning', ipa: '/ˌriːɪnˈfɔːrsmənt/', meaning: 'học tăng cường', example: 'Learning trains autonomous agents.', status: 'new' },
      { id: 'ta27', word: 'digital ecosystems', ipa: '/ˈdɪdʒɪtl/', meaning: 'hệ sinh thái số', example: 'Ecosystems foster innovation.', status: 'new' },
      { id: 'ta28', word: 'smart infrastructure', ipa: '/smɑːrt/', meaning: 'hạ tầng thông minh', example: 'Infrastructure supports urban growth.', status: 'new' },
      { id: 'ta29', word: 'Internet of Things (IoT)', ipa: '/ˈɪntərnɛt/', meaning: 'Internet vạn vật', example: 'IoT connects everyday devices.', status: 'new' },
      { id: 'ta30', word: 'virtual and augmented reality', ipa: '/ˈvɜːrtʃuəl/', meaning: 'thực tế ảo & tăng cường', example: 'VR and AR enhance learning.', status: 'new' }
    ]
  },
  {
    id: 'tech-a-p3', title: 'TECH & AI (C1-C2) (P3)', level: 'C1-C2', category: 'Technology',
    cards: [
      { id: 'ta31', word: 'technological singularity', ipa: '/ˌtɛknəˈlɒdʒɪkl/', meaning: 'điểm kỳ dị công nghệ', example: 'The singularity remains hypothetical.', status: 'new' },
      { id: 'ta32', word: 'AI-driven personalization', ipa: '/eɪˈaɪ ˈdrɪvn/', meaning: 'cá nhân hóa bằng AI', example: 'Personalization boosts engagement.', status: 'new' },
      { id: 'ta33', word: 'computational efficiency', ipa: '/ˌkɒmpjuˈteɪʃənl/', meaning: 'hiệu suất tính toán', example: 'Efficiency reduces costs.', status: 'new' },
      { id: 'ta34', word: 'algorithmic transparency', ipa: '/ˌælɡəˈrɪðmɪk/', meaning: 'minh bạch thuật toán', example: 'Transparency builds trust.', status: 'new' },
      { id: 'ta35', word: 'tech-enabled innovation', ipa: '/tɛk/', meaning: 'đổi mới nhờ công nghệ', example: 'Tech-enabled innovation drives growth.', status: 'new' },
      { id: 'ta36', word: 'disruptive technologies', ipa: '/dɪsˈrʌptɪv/', meaning: 'công nghệ đột phá', example: 'Disruptive technologies reshape markets.', status: 'new' },
      { id: 'ta37', word: 'digital divide', ipa: '/dɪˈvaɪd/', meaning: 'khoảng cách số', example: 'The divide widens inequality.', status: 'new' },
      { id: 'ta38', word: 'human augmentation', ipa: '/ˈhjuːmən/', meaning: 'tăng cường con người', example: 'Augmentation blurs ethical boundaries.', status: 'new' },
      { id: 'ta39', word: 'robotic process automation', ipa: '/rəʊˈbɒtɪk/', meaning: 'tự động hóa quy trình bằng robot', example: 'RPA streamlines operations.', status: 'new' },
      { id: 'ta40', word: 'AI ethics framework', ipa: '/ˈɛθɪks/', meaning: 'khung đạo đức AI', example: 'An ethics framework guides development.', status: 'new' },
      { id: 'ta41', word: 'large language models', ipa: '/lɑːrdʒ/', meaning: 'mô hình ngôn ngữ lớn', example: 'LLMs generate human-like text.', status: 'new' },
      { id: 'ta42', word: 'automation bias', ipa: '/ˌɔːtəˈmeɪʃn/', meaning: 'thiên lệch do tự động hóa', example: 'Bias reduces critical thinking.', status: 'new' },
      { id: 'ta43', word: 'digital sovereignty', ipa: '/ˈsɒvrənti/', meaning: 'chủ quyền số', example: 'Sovereignty protects national data.', status: 'new' },
      { id: 'ta44', word: 'tech monopolization', ipa: '/məˌnɒpəlaɪˈzeɪʃn/', meaning: 'độc quyền công nghệ', example: 'Monopolization limits competition.', status: 'new' }
    ]
  },

  // ===========================================================================
  // TOPIC 2: EDUCATION
  // ===========================================================================
  {
    id: 'edu-f-p1', title: 'EDUCATION (A1-B2) (P1)', level: 'A1-B1', category: 'Education',
    cards: [
      { id: 'e1', word: 'education', ipa: '/ˌɛdʒuˈkeɪʃn/', meaning: 'giáo dục', example: 'Education plays an important role.', status: 'new' },
      { id: 'e2', word: 'student', ipa: '/ˈstjuːdnt/', meaning: 'học sinh, sinh viên', example: 'She is a student at a university.', status: 'new' },
      { id: 'e3', word: 'teacher', ipa: '/ˈtiːtʃər/', meaning: 'giáo viên', example: 'The teacher explains clearly.', status: 'new' },
      { id: 'e4', word: 'subject', ipa: '/ˈsʌbdʒɪkt/', meaning: 'môn học', example: 'English is my favorite subject.', status: 'new' },
      { id: 'e5', word: 'lesson', ipa: '/ˈlɛsn/', meaning: 'bài học', example: 'Today’s lesson is interesting.', status: 'new' },
      { id: 'e6', word: 'exam', ipa: '/ɪɡˈzæm/', meaning: 'kỳ thi', example: 'I am preparing for the final exam.', status: 'new' },
      { id: 'e7', word: 'homework', ipa: '/ˈhəʊmwɜːrk/', meaning: 'bài tập về nhà', example: 'Finish your homework on time.', status: 'new' },
      { id: 'e8', word: 'learn', ipa: '/lɜːrn/', meaning: 'học', example: 'Children learn faster with practice.', status: 'new' },
      { id: 'e9', word: 'study', ipa: '/ˈstʌdi/', meaning: 'học tập', example: 'I study English every evening.', status: 'new' },
      { id: 'e10', word: 'classroom', ipa: '/ˈklɑːsruːm/', meaning: 'phòng học', example: 'The classroom is well-equipped.', status: 'new' },
      { id: 'e11', word: 'school', ipa: '/skuːl/', meaning: 'trường học', example: 'I go to school by bus.', status: 'new' },
      { id: 'e12', word: 'notebook', ipa: '/ˈnəʊtbʊk/', meaning: 'vở bài tập', example: 'Write it in your notebook.', status: 'new' },
      { id: 'e13', word: 'vocabulary', ipa: '/vəˈkæbjuləri/', meaning: 'từ vựng', example: 'I need to learn new vocabulary.', status: 'new' },
      { id: 'e14', word: 'grammar', ipa: '/ˈɡræmər/', meaning: 'ngữ pháp', example: 'Grammar is very important.', status: 'new' },
      { id: 'e15', word: 'knowledge', ipa: '/ˈnɒlɪdʒ/', meaning: 'kiến thức', example: 'Knowledge is power.', status: 'new' }
    ]
  },
  {
    id: 'edu-f-p2', title: 'EDUCATION (A1-B2) (P2)', level: 'B1-B2', category: 'Education',
    cards: [
      { id: 'e16', word: 'curriculum', ipa: '/kəˈrɪkjələm/', meaning: 'chương trình học', example: 'The curriculum focuses on skills.', status: 'new' },
      { id: 'e17', word: 'academic', ipa: '/ˌækəˈdɛmɪk/', meaning: 'học thuật', example: 'He achieved academic results.', status: 'new' },
      { id: 'e18', word: 'assessment', ipa: '/əˈsɛsmənt/', meaning: 'sự đánh giá', example: 'Assessment helps students improve.', status: 'new' },
      { id: 'e19', word: 'qualification', ipa: '/ˌkwɒlɪfɪˈkeɪʃn/', meaning: 'bằng cấp', example: 'A degree is a qualification.', status: 'new' },
      { id: 'e20', word: 'graduate', ipa: '/ˈɡrædʒueɪt/', meaning: 'tốt nghiệp', example: 'She graduated from university.', status: 'new' },
      { id: 'e21', word: 'secondary school', ipa: '/ˈsɛkəndri/', meaning: 'trường trung học', example: 'He is in secondary school.', status: 'new' },
      { id: 'e22', word: 'university', ipa: '/ˌjuːnɪˈvɜːrsəti/', meaning: 'đại học', example: 'She studies at university.', status: 'new' },
      { id: 'e23', word: 'scholar', ipa: '/ˈskɒlər/', meaning: 'học giả', example: 'He is a great scholar.', status: 'new' },
      { id: 'e24', word: 'lecture', ipa: '/ˈlɛktʃər/', meaning: 'bài giảng', example: 'The lecture was boring.', status: 'new' },
      { id: 'e25', word: 'tutor', ipa: '/ˈtjuːtər/', meaning: 'gia sư', example: 'He has an English tutor.', status: 'new' },
      { id: 'e26', word: 'literacy', ipa: '/ˈlɪtərəsi/', meaning: 'biết chữ', example: 'Literacy rates are rising.', status: 'new' },
      { id: 'e27', word: 'discipline', ipa: '/ˈdɪsəplɪn/', meaning: 'kỷ luật', example: 'Discipline is key to success.', status: 'new' },
      { id: 'e28', word: 'motivation', ipa: '/ˌməʊtɪˈveɪʃn/', meaning: 'động lực', example: 'I need some motivation.', status: 'new' },
      { id: 'e29', word: 'primary school', ipa: '/ˈpraɪməri/', meaning: 'trường tiểu học', example: 'Kids in primary school.', status: 'new' },
      { id: 'e30', word: 'assignment', ipa: '/əˈsaɪnmənt/', meaning: 'bài tập giao', example: 'Finish your assignment.', status: 'new' }
    ]
  },
  {
    id: 'edu-f-p3', title: 'EDUCATION (A1-B2) (P3)', level: 'B2', category: 'Education',
    cards: [
      { id: 'e31', word: 'tuition fee', ipa: '/tjuˈɪʃn/', meaning: 'học phí', example: 'Tuition fees are high.', status: 'new' },
      { id: 'e32', word: 'extracurricular', ipa: '/ˌɛkstrəkəˈrɪkjələr/', meaning: 'ngoại khóa', example: 'Extracurricular activities.', status: 'new' },
      { id: 'e33', word: 'dropout', ipa: '/ˈdrɒpaʊt/', meaning: 'người bỏ học', example: 'A school dropout.', status: 'new' },
      { id: 'e34', word: 'presentation', ipa: '/ˌprɛznˈteɪʃn/', meaning: 'bài thuyết trình', example: 'I have a presentation tomorrow.', status: 'new' },
      { id: 'e35', word: 'certificate', ipa: '/sərˈtɪfɪkət/', meaning: 'chứng chỉ', example: 'An English certificate.', status: 'new' },
      { id: 'e36', word: 'compulsory', ipa: '/kəmˈpʌlsəri/', meaning: 'bắt buộc', example: 'English is compulsory.', status: 'new' },
      { id: 'e37', word: 'optional', ipa: '/ˈɒpʃənl/', meaning: 'tùy chọn', example: 'Art is optional.', status: 'new' },
      { id: 'e38', word: 'vocational', ipa: '/vəʊˈkeɪʃənl/', meaning: 'hướng nghiệp', example: 'Vocational training.', status: 'new' },
      { id: 'e39', word: 'interdisciplinary', ipa: '/ˌɪntərdɪˈsɪplɪnəri/', meaning: 'liên ngành', example: 'Interdisciplinary study.', status: 'new' },
      { id: 'e40', word: 'faculty', ipa: '/ˈfæklti/', meaning: 'khoa / giảng viên', example: 'The science faculty.', status: 'new' }
    ]
  },
  {
    id: 'edu-a-p1', title: 'EDUCATION (C1-C2) (P1)', level: 'C1-C2', category: 'Education',
    cards: [
      { id: 'ea1', word: 'pedagogy', ipa: '/ˈpɛdəɡɒdʒi/', meaning: 'phương pháp giảng dạy', example: 'Modern pedagogy is student-centered.', status: 'new' },
      { id: 'ea2', word: 'cognitive', ipa: '/ˈkɒɡnətɪv/', meaning: 'nhận thức', example: 'Reading improves cognitive development.', status: 'new' },
      { id: 'ea3', word: 'competency', ipa: '/ˈkɒmpɪtənsi/', meaning: 'năng lực', example: 'This builds professional competency.', status: 'new' },
      { id: 'ea4', word: 'scholarship', ipa: '/ˈskɒləʃɪp/', meaning: 'học bổng', example: 'She won a scholarship.', status: 'new' },
      { id: 'ea5', word: 'institution', ipa: '/ˌɪnstɪˈtjuːʃn/', meaning: 'cơ sở giáo dục', example: 'Universities are institutions.', status: 'new' },
      { id: 'ea6', word: 'autonomous learning', ipa: '/ɔːˈtɒnəməs/', meaning: 'học tự chủ', example: 'It makes students independent.', status: 'new' },
      { id: 'ea7', word: 'intellectual', ipa: '/ˌɪntəˈlɛktʃuəl/', meaning: 'trí tuệ', example: 'The program encourages growth.', status: 'new' },
      { id: 'ea8', word: 'standardized testing', ipa: '/ˈstændərdaɪzd/', meaning: 'kiểm tra chuẩn hóa', example: 'It may cause pressure.', status: 'new' },
      { id: 'ea9', word: 'lifelong learning', ipa: '/ˈlaɪflɒŋ/', meaning: 'học suốt đời', example: 'Lifelong learning is essential.', status: 'new' },
      { id: 'ea10', word: 'educational equity', ipa: '/ˌɛdʒuˈkeɪʃənl/', meaning: 'công bằng giáo dục', example: 'Equity ensures equal access.', status: 'new' },
      { id: 'ea11', word: 'epistemology', ipa: '/ɪˌpɪstəˈmɒlədʒi/', meaning: 'nhận thức luận', example: 'Epistemology studies knowledge.', status: 'new' },
      { id: 'ea12', word: 'didactics', ipa: '/daɪˈdæktɪks/', meaning: 'phương pháp giáo dục', example: 'Effective didactics.', status: 'new' },
      { id: 'ea13', word: 'curriculum development', ipa: '/kəˈrɪkjələm/', meaning: 'phát triển chương trình', example: 'Curriculum development is key.', status: 'new' },
      { id: 'ea14', word: 'pedagogical', ipa: '/ˌpɛdəˈɡɒdʒɪkl/', meaning: 'thuộc giáo dục học', example: 'Pedagogical skills.', status: 'new' },
      { id: 'ea15', word: 'experiential learning', ipa: '/ɪkˌspɪəriˈɛnʃl/', meaning: 'học qua trải nghiệm', example: 'Learning by doing.', status: 'new' }
    ]
  },

  // ===========================================================================
  // TOPIC 3: ENVIRONMENT & CLIMATE CHANGE
  // ===========================================================================
  {
    id: 'env-f-p1', title: 'ENVIRONMENT (A1-B2) (P1)', level: 'A1-B1', category: 'Environment',
    cards: [
      { id: 'v1', word: 'environment', ipa: '/ɪnˈvaɪrənmənt/', meaning: 'môi trường', example: 'Protect the environment.', status: 'new' },
      { id: 'v2', word: 'tree', ipa: '/triː/', meaning: 'cây', example: 'Trees provide fresh air.', status: 'new' },
      { id: 'v3', word: 'water', ipa: '/ˈwɔːtər/', meaning: 'nước', example: 'Clean water is essential.', status: 'new' },
      { id: 'v4', word: 'air', ipa: '/eər/', meaning: 'không khí', example: 'Air pollution is harmful.', status: 'new' },
      { id: 'v5', word: 'animal', ipa: '/ˈænɪml/', meaning: 'động vật', example: 'Wildlife needs protection.', status: 'new' },
      { id: 'v6', word: 'nature', ipa: '/ˈneɪtʃər/', meaning: 'thiên nhiên', example: 'Respect nature.', status: 'new' },
      { id: 'v7', word: 'pollution', ipa: '/pəˈluːʃn/', meaning: 'ô nhiễm', example: 'Pollution affects health.', status: 'new' },
      { id: 'v8', word: 'recycle', ipa: '/ˌriːˈsaɪkl/', meaning: 'tái chế', example: 'Recycle plastic bottles.', status: 'new' },
      { id: 'v9', word: 'rubbish', ipa: '/ˈrʌbɪʃ/', meaning: 'rác', example: 'Do not throw rubbish here.', status: 'new' },
      { id: 'v10', word: 'protect', ipa: '/prəˈtɛkt/', meaning: 'bảo vệ', example: 'Laws protect animals.', status: 'new' },
      { id: 'v11', word: 'clean', ipa: '/kliːn/', meaning: 'sạch', example: 'We need clean energy.', status: 'new' },
      { id: 'v12', word: 'dirty', ipa: '/ˈdɜːrti/', meaning: 'bẩn', example: 'The river is dirty.', status: 'new' },
      { id: 'v13', word: 'climate', ipa: '/ˈklaɪmət/', meaning: 'khí hậu', example: 'Climate change is real.', status: 'new' },
      { id: 'v14', word: 'global warming', ipa: '/ˌɡləʊbl ˈwɔːrmɪŋ/', meaning: 'nóng lên toàn cầu', example: 'It raises sea levels.', status: 'new' },
      { id: 'v15', word: 'natural resources', ipa: '/ˈnætʃrəl/', meaning: 'tài nguyên thiên nhiên', example: 'Save resources.', status: 'new' }
    ]
  },
  {
    id: 'env-f-p2', title: 'ENVIRONMENT (A1-B2) (P2)', level: 'B1-B2', category: 'Environment',
    cards: [
      { id: 'v16', word: 'wildlife', ipa: '/ˈwaɪldlaɪf/', meaning: 'động vật hoang dã', example: 'Wildlife is disappearing.', status: 'new' },
      { id: 'v17', word: 'forest', ipa: '/ˈfɒrɪst/', meaning: 'rừng', example: 'Forests absorb CO2.', status: 'new' },
      { id: 'v18', word: 'deforestation', ipa: '/ˌdiːˌfɒrɪˈsteɪʃn/', meaning: 'phá rừng', example: 'It harms biodiversity.', status: 'new' },
      { id: 'v19', word: 'endangered', ipa: '/ɪnˈdeɪndʒərd/', meaning: 'có nguy cơ tuyệt chủng', example: 'Many species are endangered.', status: 'new' },
      { id: 'v20', word: 'waste', ipa: '/weɪst/', meaning: 'chất thải', example: 'Waste pollutes oceans.', status: 'new' },
      { id: 'v21', word: 'reduce', ipa: '/rɪˈdjuːs/', meaning: 'giảm', example: 'Reduce energy use.', status: 'new' },
      { id: 'v22', word: 'renewable energy', ipa: '/rɪˈnjuːəbl/', meaning: 'năng lượng tái tạo', example: 'It is eco-friendly.', status: 'new' },
      { id: 'v23', word: 'fossil fuels', ipa: '/ˈfɒsl fjuːəlz/', meaning: 'nhiên liệu hóa thạch', example: 'Fossil fuels cause pollution.', status: 'new' },
      { id: 'v24', word: 'carbon dioxide', ipa: '/ˌkɑːrbən daɪˈɒksaɪd/', meaning: 'khí CO₂', example: 'Cars release carbon dioxide.', status: 'new' },
      { id: 'v25', word: 'emissions', ipa: '/iˈmɪʃnz/', meaning: 'khí thải', example: 'Emissions heat the Earth.', status: 'new' },
      { id: 'v26', word: 'biodiversity', ipa: '/ˌbaɪəʊdaɪˈvɜːrsəti/', meaning: 'đa dạng sinh học', example: 'Vital to ecosystems.', status: 'new' },
      { id: 'v27', word: 'ecosystem', ipa: '/ˈiːkəʊsɪstəm/', meaning: 'hệ sinh thái', example: 'Pollution damages it.', status: 'new' },
      { id: 'v28', word: 'sustainable', ipa: '/səˈsteɪnəbl/', meaning: 'bền vững', example: 'Development is necessary.', status: 'new' },
      { id: 'v29', word: 'conservation', ipa: '/ˌkɒnsərˈveɪʃn/', meaning: 'bảo tồn', example: 'Conservation protects life.', status: 'new' },
      { id: 'v30', word: 'environmental damage', ipa: '/ɪnˌvaɪrənˈmɛntl/', meaning: 'thiệt hại môi trường', example: 'Factories cause damage.', status: 'new' }
    ]
  },
  {
    id: 'env-f-p3', title: 'ENVIRONMENT (A1-B2) (P3)', level: 'B2', category: 'Environment',
    cards: [
      { id: 'v31', word: 'raise awareness', ipa: '/reɪz əˈweərnəs/', meaning: 'nâng cao nhận thức', example: 'Campaigns raise awareness.', status: 'new' },
      { id: 'v32', word: 'climate crisis', ipa: '/ˈklaɪmət ˈkraɪsɪs/', meaning: 'khủng hoảng khí hậu', example: 'The crisis is global.', status: 'new' },
      { id: 'v33', word: 'extreme weather', ipa: '/ɪkˈstriːm/', meaning: 'thời tiết cực đoan', example: 'Extreme weather events.', status: 'new' },
      { id: 'v34', word: 'sea level rise', ipa: '/siː ˈlɛvl/', meaning: 'mực nước biển dâng', example: 'Rise affects coastal areas.', status: 'new' },
      { id: 'v35', word: 'environmental protection', ipa: '/prəˈtɛkʃn/', meaning: 'bảo vệ môi trường', example: 'A global duty.', status: 'new' },
      { id: 'v36', word: 'take action', ipa: '/teɪk ˈækʃn/', meaning: 'hành động', example: 'Governments must take action.', status: 'new' },
      { id: 'v37', word: 'habitat', ipa: '/ˈhæbɪtæt/', meaning: 'môi trường sống', example: 'Protect animal habitats.', status: 'new' },
      { id: 'v38', word: 'reforestation', ipa: '/ˌriːfɒrɪˈsteɪʃn/', meaning: 'trồng rừng lại', example: 'Reforestation helps the planet.', status: 'new' },
      { id: 'v39', word: 'carbon footprint', ipa: '/ˈkɑːrbən ˈfʊtprɪnt/', meaning: 'dấu chân carbon', example: 'Reduce your carbon footprint.', status: 'new' },
      { id: 'v40', word: 'compost', ipa: '/ˈkɒmpɒst/', meaning: 'phân hữu cơ / ủ phân', example: 'Compost kitchen waste.', status: 'new' }
    ]
  },
  {
    id: 'env-a-p1', title: 'ENVIRONMENT (C1-C2) (P1)', level: 'C1-C2', category: 'Environment',
    cards: [
      { id: 'va1', word: 'climate mitigation strategies', ipa: '/ˈklaɪmət/', meaning: 'chiến lược giảm thiểu khí hậu', example: 'Mitigation aims to reduce emissions.', status: 'new' },
      { id: 'va2', word: 'climate adaptation measures', ipa: '/ˌædæpˈteɪʃn/', meaning: 'biện pháp thích ứng khí hậu', example: 'Coastal cities need measures.', status: 'new' },
      { id: 'va3', word: 'global warming trajectory', ipa: '/trəˈdʒɛktəri/', meaning: 'xu hướng nóng lên toàn cầu', example: 'Scientists track the trajectory.', status: 'new' },
      { id: 'va4', word: 'greenhouse gas emissions', ipa: '/ˈɡriːnhaʊs/', meaning: 'khí thải nhà kính', example: 'Emissions must be reduced.', status: 'new' },
      { id: 'va5', word: 'carbon neutrality', ipa: '/njuːˈtrælɪti/', meaning: 'trung hòa carbon', example: 'Many countries target neutrality.', status: 'new' },
      { id: 'va6', word: 'net-zero targets', ipa: '/net ˈzɪərəʊ/', meaning: 'mục tiêu phát thải ròng bằng 0', example: 'Targets require policy reform.', status: 'new' },
      { id: 'va7', word: 'environmental degradation', ipa: '/ˌdɛɡrəˈdeɪʃn/', meaning: 'suy thoái môi trường', example: 'Pollution causes degradation.', status: 'new' },
      { id: 'va8', word: 'biodiversity loss', ipa: '/lɒs/', meaning: 'mất đa dạng sinh học', example: 'Loss threatens ecosystems.', status: 'new' },
      { id: 'va9', word: 'ecosystem collapse', ipa: '/kəˈlæps/', meaning: 'sụp đổ hệ sinh thái', example: 'Global impacts expected.', status: 'new' },
      { id: 'va10', word: 'climate resilience', ipa: '/rɪˈzɪliəns/', meaning: 'khả năng chống chịu khí hậu', example: 'Resilience protects communities.', status: 'new' },
      { id: 'va11', word: 'sustainable development', ipa: '/səˈsteɪnəbl/', meaning: 'phát triển bền vững', example: 'Balance growth and nature.', status: 'new' },
      { id: 'va12', word: 'renewable energy transition', ipa: '/trænˈzɪʃn/', meaning: 'chuyển đổi năng lượng tái tạo', example: 'Transition reduces fossil fuel use.', status: 'new' },
      { id: 'va13', word: 'fossil fuel dependency', ipa: '/dɪˈpɛndənsi/', meaning: 'phụ thuộc nhiên liệu hóa thạch', example: 'Dependency delays climate action.', status: 'new' },
      { id: 'va14', word: 'deforestation rates', ipa: '/ˌdiːˌfɒrɪˈsteɪʃn/', meaning: 'tỷ lệ phá rừng', example: 'Rates remain alarming.', status: 'new' },
      { id: 'va15', word: 'desertification', ipa: '/dɪˌzɜːrtɪfɪˈkeɪʃn/', meaning: 'sa mạc hóa', example: 'Desertification reduces farmland.', status: 'new' }
    ]
  },
  {
    id: 'env-a-p2', title: 'ENVIRONMENT (C1-C2) (P2)', level: 'C1-C2', category: 'Environment',
    cards: [
      { id: 'va16', word: 'environmental sustainability', ipa: '/səˌsteɪnəˈbɪləti/', meaning: 'tính bền vững môi trường', example: 'Sustainability guides policy.', status: 'new' },
      { id: 'va17', word: 'ecological footprint', ipa: '/ˌiːkəˈlɒdʒɪkl/', meaning: 'dấu chân sinh thái', example: 'Wealthy nations have larger footprints.', status: 'new' },
      { id: 'va18', word: 'circular economy', ipa: '/ˈsɜːrkjələr/', meaning: 'kinh tế tuần hoàn', example: 'A circular economy reduces waste.', status: 'new' },
      { id: 'va19', word: 'climate justice', ipa: '/ˈdʒʌstɪs/', meaning: 'công bằng khí hậu', example: 'Justice protects vulnerable groups.', status: 'new' },
      { id: 'va20', word: 'environmental governance', ipa: '/ˈɡʌvərnəns/', meaning: 'quản trị môi trường', example: 'Strong governance ensures compliance.', status: 'new' },
      { id: 'va21', word: 'ocean acidification', ipa: '/əˌsɪdɪfɪˈkeɪʃn/', meaning: 'axit hóa đại dương', example: 'Acidification harms marine life.', status: 'new' },
      { id: 'va22', word: 'melting polar ice caps', ipa: '/ˈpəʊlər/', meaning: 'băng cực tan chảy', example: 'Ice caps are melting rapidly.', status: 'new' },
      { id: 'va23', word: 'extreme weather events', ipa: '/ɪˈvɛnts/', meaning: 'thời tiết cực đoan', example: 'Events are increasing.', status: 'new' },
      { id: 'va24', word: 'climate-induced migration', ipa: '/maɪˈɡreɪʃn/', meaning: 'di cư do khí hậu', example: 'Migration creates instability.', status: 'new' },
      { id: 'va25', word: 'carbon offsetting', ipa: '/ˈɒfsɛtɪŋ/', meaning: 'bù đắp carbon', example: 'Companies use offsetting schemes.', status: 'new' },
      { id: 'va26', word: 'environmental advocacy', ipa: '/ˈædvəkəsi/', meaning: 'vận động môi trường', example: 'Advocacy raises awareness.', status: 'new' },
      { id: 'va27', word: 'sustainable consumption', ipa: '/kənˈsʌmpʃn/', meaning: 'tiêu dùng bền vững', example: 'Consumption reduces waste.', status: 'new' },
      { id: 'va28', word: 'green technologies', ipa: '/ɡriːn/', meaning: 'công nghệ xanh', example: 'Green tech lowers emissions.', status: 'new' },
      { id: 'va29', word: 'conservation initiatives', ipa: '/ɪˈnɪʃətɪvz/', meaning: 'sáng kiến bảo tồn', example: 'Initiatives protect wildlife.', status: 'new' },
      { id: 'va30', word: 'environmental accountability', ipa: '/əˌkaʊntəˈbɪləti/', meaning: 'trách nhiệm môi trường', example: 'Accountability ensures compliance.', status: 'new' }
    ]
  },
  {
    id: 'env-a-p3', title: 'ENVIRONMENT (C1-C2) (P3)', level: 'C1-C2', category: 'Environment',
    cards: [
      { id: 'va31', word: 'planetary boundaries', ipa: '/ˈplænətri/', meaning: 'giới hạn hành tinh', example: 'Safe development zones.', status: 'new' },
      { id: 'va32', word: 'climate policy framework', ipa: '/ˈpɒləsi/', meaning: 'khung chính sách khí hậu', example: 'The framework guides cuts.', status: 'new' },
      { id: 'va33', word: 'environmental stewardship', ipa: '/ˈstjuːərdʃɪp/', meaning: 'quản lý môi trường trách nhiệm', example: 'Stewardship preserves resources.', status: 'new' },
      { id: 'va34', word: 'resource depletion', ipa: '/dɪˈpliːʃn/', meaning: 'cạn kiệt tài nguyên', example: 'Overconsumption causes depletion.', status: 'new' },
      { id: 'va35', word: 'sustainable agriculture', ipa: '/ˈæɡrɪkʌltʃər/', meaning: 'nông nghiệp bền vững', example: 'Agriculture protects soil.', status: 'new' },
      { id: 'va36', word: 'ecological restoration', ipa: '/ˌrɛstəˈreɪʃn/', meaning: 'phục hồi sinh thái', example: 'Restoration revives habitats.', status: 'new' },
      { id: 'va37', word: 'climate diplomacy', ipa: '/dɪˈpləʊməsi/', meaning: 'ngoại giao khí hậu', example: 'Diplomacy requires cooperation.', status: 'new' },
      { id: 'va38', word: 'environmental ethics', ipa: '/ˈɛθɪks/', meaning: 'đạo đức môi trường', example: 'Ethics shape policy decisions.', status: 'new' },
      { id: 'va39', word: 'long-term projections', ipa: '/prəˈdʒɛkʃnz/', meaning: 'dự báo dài hạn', example: 'Projections guide planning.', status: 'new' },
      { id: 'va40', word: 'climate risk assessment', ipa: '/əˈsɛsmənt/', meaning: 'đánh giá rủi ro khí hậu', example: 'Assessment informs adaptation.', status: 'new' },
      { id: 'va41', word: 'sustainability metrics', ipa: '/ˈmɛtrɪks/', meaning: 'chỉ số bền vững', example: 'Metrics track impact.', status: 'new' },
      { id: 'va42', word: 'clean energy infrastructure', ipa: '/ˈɪnfrəstrʌktʃər/', meaning: 'hạ tầng năng lượng sạch', example: 'Infrastructure supports renewables.', status: 'new' },
      { id: 'va43', word: 'environmental compliance', ipa: '/kəmˈplaɪəns/', meaning: 'tuân thủ môi trường', example: 'Compliance avoids penalties.', status: 'new' },
      { id: 'va44', word: 'climate literacy', ipa: '/ˈlɪtərəsi/', meaning: 'hiểu biết về khí hậu', example: 'Literacy empowers citizens.', status: 'new' },
      { id: 'va45', word: 'environmental activism', ipa: '/ˈæktɪvɪzəm/', meaning: 'hoạt động môi trường', example: 'Activism pressures governments.', status: 'new' },
      { id: 'va46', word: 'low-carbon economy', ipa: '/iˈkɒnəmi/', meaning: 'kinh tế carbon thấp', example: 'An economy is essential.', status: 'new' },
      { id: 'va47', word: 'climate vulnerability', ipa: '/ˌvʌlnərəˈbɪləti/', meaning: 'dễ tổn thương khí hậu', example: 'Poor regions face higher risk.', status: 'new' },
      { id: 'va48', word: 'adaptive capacity', ipa: '/kəˈpæsəti/', meaning: 'năng lực thích ứng', example: 'Capacity varies by region.', status: 'new' },
      { id: 'va49', word: 'nature-based solutions', ipa: '/səˈluːʃnz/', meaning: 'giải pháp dựa vào tự nhiên', example: 'Solutions restore ecosystems.', status: 'new' },
      { id: 'va50', word: 'environmental resilience', ipa: '/rɪˈzɪliəns/', meaning: 'khả năng phục hồi môi trường', example: 'Resilience strengthens systems.', status: 'new' }
    ]
  },

  // ===========================================================================
  // TOPIC 4: HEALTH
  // ===========================================================================
  {
    id: 'health-f-p1', title: 'HEALTH (A1-B2) (P1)', level: 'A1-B1', category: 'Health',
    cards: [
      { id: 'h1', word: 'health', ipa: '/hɛlθ/', meaning: 'sức khỏe', example: 'Good health is very important.', status: 'new' },
      { id: 'h2', word: 'doctor', ipa: '/ˈdɒktər/', meaning: 'bác sĩ', example: 'The doctor examined the patient.', status: 'new' },
      { id: 'h3', word: 'nurse', ipa: '/nɜːrs/', meaning: 'y tá', example: 'The nurse helped the patient.', status: 'new' },
      { id: 'h4', word: 'hospital', ipa: '/ˈhɒspɪtl/', meaning: 'bệnh viện', example: 'She was taken to the hospital.', status: 'new' },
      { id: 'h5', word: 'sick', ipa: '/sɪk/', meaning: 'ốm', example: 'He feels sick today.', status: 'new' },
      { id: 'h6', word: 'pain', ipa: '/peɪn/', meaning: 'cơn đau', example: 'She has a stomach pain.', status: 'new' },
      { id: 'h7', word: 'disease', ipa: '/dɪˈziːz/', meaning: 'bệnh tật', example: 'This disease is dangerous.', status: 'new' },
      { id: 'h8', word: 'medicine', ipa: '/ˈmɛdɪsn/', meaning: 'thuốc', example: 'Take this medicine twice a day.', status: 'new' },
      { id: 'h9', word: 'exercise', ipa: '/ˈɛksərsaɪz/', meaning: 'tập thể dục', example: 'Exercise is good for health.', status: 'new' },
      { id: 'h10', word: 'healthy', ipa: '/ˈhɛlθi/', meaning: 'khỏe mạnh', example: 'A healthy diet is important.', status: 'new' },
      { id: 'h11', word: 'unhealthy', ipa: '/ʌnˈhɛlθi/', meaning: 'không lành mạnh', example: 'Fast food is unhealthy.', status: 'new' },
      { id: 'h12', word: 'diet', ipa: '/ˈdaɪət/', meaning: 'chế độ ăn', example: 'She follows a balanced diet.', status: 'new' },
      { id: 'h13', word: 'rest', ipa: '/rɛst/', meaning: 'nghỉ ngơi', example: 'You should get enough rest.', status: 'new' },
      { id: 'h14', word: 'recover', ipa: '/rɪˈkʌvər/', meaning: 'hồi phục', example: 'He recovered quickly.', status: 'new' },
      { id: 'h15', word: 'illness', ipa: '/ˈɪlnəs/', meaning: 'bệnh', example: 'Her illness lasted a week.', status: 'new' }
    ]
  },
  {
    id: 'health-f-p2', title: 'HEALTH (A1-B2) (P2)', level: 'B1-B2', category: 'Health',
    cards: [
      { id: 'h16', word: 'symptom', ipa: '/ˈsɪmptəm/', meaning: 'triệu chứng', example: 'Fever is a common symptom.', status: 'new' },
      { id: 'h17', word: 'treatment', ipa: '/ˈtriːtmənt/', meaning: 'điều trị', example: 'The treatment was effective.', status: 'new' },
      { id: 'h18', word: 'prevent', ipa: '/prɪˈvɛnt/', meaning: 'ngăn ngừa', example: 'Exercise helps prevent disease.', status: 'new' },
      { id: 'h19', word: 'physical', ipa: '/ˈfɪzɪkl/', meaning: 'thể chất', example: 'Physical activity is important.', status: 'new' },
      { id: 'h20', word: 'mental', ipa: '/ˈmɛntl/', meaning: 'tinh thần', example: 'Mental health matters.', status: 'new' },
      { id: 'h21', word: 'stress', ipa: '/strɛs/', meaning: 'căng thẳng', example: 'Stress affects health.', status: 'new' },
      { id: 'h22', word: 'injury', ipa: '/ˈɪndʒəri/', meaning: 'chấn thương', example: 'He suffered a leg injury.', status: 'new' },
      { id: 'h23', word: 'medical care', ipa: '/ˈmɛdɪkl/', meaning: 'chăm sóc y tế', example: 'Medical care is expensive.', status: 'new' },
      { id: 'h24', word: 'lifestyle', ipa: '/ˈlaɪfstaɪl/', meaning: 'lối sống', example: 'A healthy lifestyle prevents illness.', status: 'new' },
      { id: 'h25', word: 'balanced diet', ipa: '/ˌbælənst ˈdaɪət/', meaning: 'chế độ ăn cân bằng', example: 'A balanced diet improves health.', status: 'new' },
      { id: 'h26', word: 'chronic disease', ipa: '/ˌkrɒnɪk/', meaning: 'bệnh mãn tính', example: 'Diabetes is a chronic disease.', status: 'new' },
      { id: 'h27', word: 'health care system', ipa: '/hɛlθ/', meaning: 'hệ thống y tế', example: 'The system needs reform.', status: 'new' },
      { id: 'h28', word: 'medical advances', ipa: '/ədˈvɑːnsɪz/', meaning: 'tiến bộ y học', example: 'Medical advances save lives.', status: 'new' },
      { id: 'h29', word: 'health awareness', ipa: '/əˈweərnəs/', meaning: 'nhận thức sức khỏe', example: 'Campaigns raise awareness.', status: 'new' },
      { id: 'h30', word: 'mental health', ipa: '/ˈmɛntl/', meaning: 'sức khỏe tinh thần', example: 'Mental health should be prioritized.', status: 'new' }
    ]
  },
  {
    id: 'health-f-p3', title: 'HEALTH (A1-B2) (P3)', level: 'B2', category: 'Health',
    cards: [
      { id: 'h31', word: 'immune system', ipa: '/ɪˈmjuːn/', meaning: 'hệ miễn dịch', example: 'Exercise strengthens the system.', status: 'new' },
      { id: 'h32', word: 'well-being', ipa: '/ˌwɛl ˈbiːɪŋ/', meaning: 'hạnh phúc, sức khỏe tổng thể', example: 'Sleep affects well-being.', status: 'new' },
      { id: 'h33', word: 'medical treatment', ipa: '/ˈtriːtmənt/', meaning: 'điều trị y tế', example: 'He received treatment.', status: 'new' },
      { id: 'h34', word: 'public health', ipa: '/ˈpʌblɪk/', meaning: 'y tế cộng đồng', example: 'Policies save lives.', status: 'new' },
      { id: 'h35', word: 'risk factor', ipa: '/rɪsk/', meaning: 'yếu tố nguy cơ', example: 'Smoking is a risk factor.', status: 'new' },
      { id: 'h36', word: 'health problems', ipa: '/ˈprɒbləmz/', meaning: 'vấn đề sức khỏe', example: 'Pollution causes health problems.', status: 'new' },
      { id: 'h37', word: 'lead a healthy life', ipa: '/liːd/', meaning: 'sống khỏe mạnh', example: 'Exercise helps you lead a healthy life.', status: 'new' },
      { id: 'h38', word: 'hygiene', ipa: '/ˈhaɪdʒiːn/', meaning: 'vệ sinh', example: 'Personal hygiene is vital.', status: 'new' },
      { id: 'h39', word: 'vaccination', ipa: '/ˌvæksɪˈneɪʃn/', meaning: 'tiêm chủng', example: 'Vaccination prevents outbreaks.', status: 'new' },
      { id: 'h40', word: 'check-up', ipa: '/ˈtʃɛkʌp/', meaning: 'kiểm tra sức khỏe', example: 'Regular check-ups.', status: 'new' }
    ]
  },
  {
    id: 'health-a-p1', title: 'HEALTH (C1-C2) (P1)', level: 'C1-C2', category: 'Health',
    cards: [
      { id: 'ha1', word: 'public health infrastructure', ipa: '/ˈpʌblɪk/', meaning: 'hạ tầng y tế công cộng', example: 'Strong infrastructure saves lives.', status: 'new' },
      { id: 'ha2', word: 'healthcare accessibility', ipa: '/əkˌsɛsəˈbɪləti/', meaning: 'khả năng tiếp cận y tế', example: 'Accessibility remains unequal.', status: 'new' },
      { id: 'ha3', word: 'mental health awareness', ipa: '/ˈmɛntl/', meaning: 'nhận thức sức khỏe tâm thần', example: 'Awareness reduces stigma.', status: 'new' },
      { id: 'ha4', word: 'preventive healthcare', ipa: '/prɪˈvɛntɪv/', meaning: 'y tế dự phòng', example: 'Prevention lowers long-term costs.', status: 'new' },
      { id: 'ha5', word: 'health disparities', ipa: '/dɪˈspærətiz/', meaning: 'bất bình đẳng y tế', example: 'Disparities affect minorities.', status: 'new' },
      { id: 'ha6', word: 'chronic disease management', ipa: '/ˈkrɒnɪk/', meaning: 'quản lý bệnh mãn tính', example: 'Management improves quality of life.', status: 'new' },
      { id: 'ha7', word: 'evidence-based medicine', ipa: '/ˈɛvɪdəns/', meaning: 'y học dựa trên bằng chứng', example: 'Treatment must be evidence-based.', status: 'new' },
      { id: 'ha8', word: 'health literacy', ipa: '/ˈlɪtərəsi/', meaning: 'hiểu biết y tế', example: 'Health literacy empowers patients.', status: 'new' },
      { id: 'ha9', word: 'epidemiological studies', ipa: '/ˌɛpɪˌdiːmiəˈlɒdʒɪkl/', meaning: 'nghiên cứu dịch tễ', example: 'Studies track disease spread.', status: 'new' },
      { id: 'ha10', word: 'holistic well-being', ipa: '/həˈlɪstɪk/', meaning: 'sức khỏe toàn diện', example: 'Holistic well-being includes mental health.', status: 'new' },
      { id: 'ha11', word: 'lifestyle-related illnesses', ipa: '/ˈlaɪfstaɪl/', meaning: 'bệnh do lối sống', example: 'Obesity is lifestyle-related.', status: 'new' },
      { id: 'ha12', word: 'healthcare systems reform', ipa: '/rɪˈfɔːrm/', meaning: 'cải cách hệ thống y tế', example: 'Reform improves efficiency.', status: 'new' },
      { id: 'ha13', word: 'patient-centered care', ipa: '/ˈpeɪʃnt/', meaning: 'chăm sóc lấy bệnh nhân làm trung tâm', example: 'Care should be patient-centered.', status: 'new' },
      { id: 'ha14', word: 'digital health solutions', ipa: '/ˈdɪdʒɪtl/', meaning: 'giải pháp y tế số', example: 'Digital solutions expand access.', status: 'new' },
      { id: 'ha15', word: 'telemedicine services', ipa: '/ˌtɛlɪˈmɛdɪsɪn/', meaning: 'dịch vụ y tế từ xa', example: 'Telemedicine grew rapidly.', status: 'new' }
    ]
  },
  {
    id: 'health-a-p2', title: 'HEALTH (C1-C2) (P2)', level: 'C1-C2', category: 'Health',
    cards: [
      { id: 'ha16', word: 'medical ethics', ipa: '/ˈmɛdɪkl ˈɛθɪks/', meaning: 'đạo đức y khoa', example: 'Ethics guide treatment decisions.', status: 'new' },
      { id: 'ha17', word: 'health policy implementation', ipa: '/ˈpɒləsi/', meaning: 'thực thi chính sách y tế', example: 'Implementation faces challenges.', status: 'new' },
      { id: 'ha18', word: 'disease prevention strategies', ipa: '/prɪˈvɛnʃn/', meaning: 'chiến lược phòng bệnh', example: 'Vaccination is a key strategy.', status: 'new' },
      { id: 'ha19', word: 'population health', ipa: '/ˌpɒpjuˈleɪʃn/', meaning: 'sức khỏe cộng đồng', example: 'Population health matters.', status: 'new' },
      { id: 'ha20', word: 'healthcare affordability', ipa: '/əˌfɔːrdəˈbɪləti/', meaning: 'chi phí y tế hợp lý', example: 'Affordability remains a concern.', status: 'new' },
      { id: 'ha21', word: 'psychological resilience', ipa: '/ˌsaɪkəˈlɒdʒɪkl/', meaning: 'khả năng phục hồi tâm lý', example: 'Resilience reduces stress.', status: 'new' },
      { id: 'ha22', word: 'stress-related disorders', ipa: '/strɛs/', meaning: 'rối loạn do stress', example: 'Work causes stress-related disorders.', status: 'new' },
      { id: 'ha23', word: 'cognitive behavioral therapy', ipa: '/ˈkɒɡnɪtɪv/', meaning: 'liệu pháp nhận thức–hành vi', example: 'CBT treats anxiety effectively.', status: 'new' },
      { id: 'ha24', word: 'pharmaceutical innovation', ipa: '/ˌfɑːrməˈsuːtɪkl/', meaning: 'đổi mới dược phẩm', example: 'Innovation saves lives.', status: 'new' },
      { id: 'ha25', word: 'clinical trials', ipa: '/ˈklɪnɪkl/', meaning: 'thử nghiệm lâm sàng', example: 'Trials ensure drug safety.', status: 'new' },
      { id: 'ha26', word: 'medical breakthroughs', ipa: '/ˈbreɪkθruːz/', meaning: 'đột phá y học', example: 'Breakthroughs extend lifespan.', status: 'new' },
      { id: 'ha27', word: 'health surveillance', ipa: '/sərˈveɪləns/', meaning: 'giám sát y tế', example: 'Surveillance detects outbreaks.', status: 'new' },
      { id: 'ha28', word: 'bioethical dilemmas', ipa: '/ˌbaɪəʊˈɛθɪkl/', meaning: 'tiến thoái lưỡng nan đạo đức sinh học', example: 'Gene editing raises dilemmas.', status: 'new' },
      { id: 'ha29', word: 'aging populations', ipa: '/ˈeɪdʒɪŋ/', meaning: 'dân số già hóa', example: 'Aging populations strain systems.', status: 'new' },
      { id: 'ha30', word: 'workforce shortages', ipa: '/ˈwɜːrkfɔːrs/', meaning: 'thiếu nhân lực y tế', example: 'Shortages affect care quality.', status: 'new' }
    ]
  },
  {
    id: 'health-a-p3', title: 'HEALTH (C1-C2) (P3)', level: 'C1-C2', category: 'Health',
    cards: [
      { id: 'ha31', word: 'rehabilitation programs', ipa: '/ˌriːhəˌbɪlɪˈteɪʃn/', meaning: 'chương trình phục hồi', example: 'Rehab aids recovery.', status: 'new' },
      { id: 'ha32', word: 'palliative care', ipa: '/ˈpæliətɪv/', meaning: 'chăm sóc giảm nhẹ', example: 'Palliative care relieves pain.', status: 'new' },
      { id: 'ha33', word: 'medical misinformation', ipa: '/ˌmɪsɪnfərˈmeɪʃn/', meaning: 'tin y tế sai lệch', example: 'Misinformation spreads rapidly.', status: 'new' },
      { id: 'ha34', word: 'health risk factors', ipa: '/rɪsk/', meaning: 'yếu tố nguy cơ', example: 'Smoking is a major risk factor.', status: 'new' },
      { id: 'ha35', word: 'behavioral health', ipa: '/bɪˈheɪvjərəl/', meaning: 'sức khỏe hành vi', example: 'Behavioral health affects outcomes.', status: 'new' },
      { id: 'ha36', word: 'personalized medicine', ipa: '/ˈpɜːrsənəlaɪzd/', meaning: 'y học cá nhân hóa', example: 'Personalized medicine improves treatment.', status: 'new' },
      { id: 'ha37', word: 'genetic predisposition', ipa: '/dʒəˈnɛtɪk/', meaning: 'khuynh hướng di truyền', example: 'Genetics increase disease risk.', status: 'new' },
      { id: 'ha38', word: 'outcomes assessment', ipa: '/ˈaʊtkʌmz/', meaning: 'đánh giá kết quả y tế', example: 'Assessment informs policy.', status: 'new' },
      { id: 'ha39', word: 'immune system response', ipa: '/ɪˈmjuːn/', meaning: 'phản ứng miễn dịch', example: 'Vaccines trigger response.', status: 'new' },
      { id: 'ha40', word: 'global health challenges', ipa: '/ˈɡləʊbl/', meaning: 'thách thức y tế toàn cầu', example: 'Pandemics are global challenges.', status: 'new' },
      { id: 'ha41', word: 'non-communicable diseases', ipa: '/ˌnɒn kəˈmjuːnɪkəbl/', meaning: 'bệnh không lây', example: 'NCDs cause most deaths.', status: 'new' },
      { id: 'ha42', word: 'patient safety protocols', ipa: '/ˈseɪfti/', meaning: 'quy trình an toàn bệnh nhân', example: 'Protocols prevent errors.', status: 'new' },
      { id: 'ha43', word: 'health equity', ipa: '/ˈɛkwəti/', meaning: 'công bằng y tế', example: 'Equity ensures equal access.', status: 'new' },
      { id: 'ha44', word: 'long-term care', ipa: '/lɒŋ/', meaning: 'chăm sóc dài hạn', example: 'Elderly need long-term care.', status: 'new' },
      { id: 'ha45', word: 'wellness-oriented lifestyles', ipa: '/ˈwɛlnəs/', meaning: 'lối sống hướng tới sức khỏe', example: 'Lifestyles prevent disease.', status: 'new' },
      { id: 'ha46', word: 'medical data privacy', ipa: '/ˈprɪvəsi/', meaning: 'bảo mật dữ liệu y tế', example: 'Privacy must be protected.', status: 'new' },
      { id: 'ha47', word: 'evidence-informed policy', ipa: '/ˈpɒləsi/', meaning: 'chính sách dựa trên bằng chứng', example: 'Policy must be evidence-informed.', status: 'new' },
      { id: 'ha48', word: 'healthcare innovation', ipa: '/ˌɪnəˈveɪʃn/', meaning: 'đổi mới y tế', example: 'Innovation improves outcomes.', status: 'new' },
      { id: 'ha49', word: 'psychosocial support', ipa: '/ˌsaɪkəʊˈsəʊʃl/', meaning: 'hỗ trợ tâm lý–xã hội', example: 'Support aids recovery.', status: 'new' },
      { id: 'ha50', word: 'integrated care models', ipa: '/ˈɪntɪɡreɪtɪd/', meaning: 'mô hình chăm sóc tích hợp', example: 'Integrated care improves efficiency.', status: 'new' }
    ]
  },

  // ===========================================================================
  // TOPIC 5: SOCIAL ISSUES
  // ===========================================================================
  {
    id: 'soc-f-p1', title: 'SOCIAL ISSUES (A1-B2) (P1)', level: 'A1-B1', category: 'Society',
    cards: [
      { id: 's1', word: 'society', ipa: '/səˈsaɪəti/', meaning: 'xã hội', example: 'We live in a modern society.', status: 'new' },
      { id: 's2', word: 'people', ipa: '/ˈpiːpl/', meaning: 'con người', example: 'People need jobs to live.', status: 'new' },
      { id: 's3', word: 'family', ipa: '/ˈfæməli/', meaning: 'gia đình', example: 'Family plays an important role.', status: 'new' },
      { id: 's4', word: 'poor', ipa: '/pʊər/', meaning: 'nghèo', example: 'Poor people need support.', status: 'new' },
      { id: 's5', word: 'rich', ipa: '/rɪtʃ/', meaning: 'giàu', example: 'The gap between rich and poor.', status: 'new' },
      { id: 's6', word: 'education', ipa: '/ˌɛdʒuˈkeɪʃn/', meaning: 'giáo dục', example: 'Education changes lives.', status: 'new' },
      { id: 's7', word: 'job', ipa: '/dʒɒb/', meaning: 'công việc', example: 'He is looking for a job.', status: 'new' },
      { id: 's8', word: 'unemployment', ipa: '/ˌʌnɪmˈplɔɪmənt/', meaning: 'thất nghiệp', example: 'It causes social problems.', status: 'new' },
      { id: 's9', word: 'law', ipa: '/lɔː/', meaning: 'luật pháp', example: 'Everyone must obey the law.', status: 'new' },
      { id: 's10', word: 'crime', ipa: '/kraɪm/', meaning: 'tội phạm', example: 'Crime rates are increasing.', status: 'new' },
      { id: 's11', word: 'homeless', ipa: '/ˈhəʊmləs/', meaning: 'vô gia cư', example: 'Homeless people need help.', status: 'new' },
      { id: 's12', word: 'equal', ipa: '/ˈiːkwəl/', meaning: 'bình đẳng', example: 'All people are equal.', status: 'new' },
      { id: 's13', word: 'poverty', ipa: '/ˈpɒvərti/', meaning: 'nghèo đói', example: 'Poverty affects many families.', status: 'new' },
      { id: 's14', word: 'inequality', ipa: '/ˌɪnɪˈkwɒləti/', meaning: 'bất bình đẳng', example: 'A serious issue.', status: 'new' },
      { id: 's15', word: 'discrimination', ipa: '/dɪˌskrɪmɪˈneɪʃn/', meaning: 'phân biệt đối xử', example: 'Discrimination is illegal.', status: 'new' }
    ]
  },
  {
    id: 'soc-f-p2', title: 'SOCIAL ISSUES (A1-B2) (P2)', level: 'B1-B2', category: 'Society',
    cards: [
      { id: 's16', word: 'human rights', ipa: '/ˈhjuːmən raɪts/', meaning: 'nhân quyền', example: 'Rights must be respected.', status: 'new' },
      { id: 's17', word: 'violence', ipa: '/ˈvaɪələns/', meaning: 'bạo lực', example: 'Violence harms society.', status: 'new' },
      { id: 's18', word: 'community', ipa: '/kəˈmjuːnəti/', meaning: 'cộng đồng', example: 'The community supports the poor.', status: 'new' },
      { id: 's19', word: 'social problems', ipa: '/ˈsəʊʃl/', meaning: 'vấn đề xã hội', example: 'Crime is a social problem.', status: 'new' },
      { id: 's20', word: 'generation gap', ipa: '/ˌdʒɛnəˈreɪʃn/', meaning: 'khoảng cách thế hệ', example: 'Gap causes conflicts.', status: 'new' },
      { id: 's21', word: 'urbanization', ipa: '/ˌɜːrbənaɪˈzeɪʃn/', meaning: 'đô thị hóa', example: 'Urbanization increases pollution.', status: 'new' },
      { id: 's22', word: 'overpopulation', ipa: '/ˌəʊvəˌpɒpjuˈleɪʃn/', meaning: 'bùng nổ dân số', example: 'It strains resources.', status: 'new' },
      { id: 's23', word: 'social justice', ipa: '/ˈdʒʌstɪs/', meaning: 'công bằng xã hội', example: 'Justice is a global goal.', status: 'new' },
      { id: 's24', word: 'living standards', ipa: '/ˈlɪvɪŋ/', meaning: 'mức sống', example: 'Living standards are improving.', status: 'new' },
      { id: 's25', word: 'income gap', ipa: '/ˈɪnkʌm/', meaning: 'khoảng cách thu nhập', example: 'The gap is widening.', status: 'new' },
      { id: 's26', word: 'child labor', ipa: '/ˈtchaɪld ˈleɪbər/', meaning: 'lao động trẻ em', example: 'Labor should be banned.', status: 'new' },
      { id: 's27', word: 'social welfare', ipa: '/ˈwɛlfeər/', meaning: 'phúc lợi xã hội', example: 'Welfare helps the poor.', status: 'new' },
      { id: 's28', word: 'crime rate', ipa: '/reɪt/', meaning: 'tỷ lệ tội phạm', example: 'The rate is decreasing.', status: 'new' },
      { id: 's29', word: 'social responsibility', ipa: '/rɪˌspɒnsəˈbɪləti/', meaning: 'trách nhiệm xã hội', example: 'Companies have responsibility.', status: 'new' },
      { id: 's30', word: 'gender equality', ipa: '/ˈdʒɛndər/', meaning: 'bình đẳng giới', example: 'Equality benefits society.', status: 'new' }
    ]
  },
  {
    id: 'soc-f-p3', title: 'SOCIAL ISSUES (A1-B2) (P3)', level: 'B2', category: 'Society',
    cards: [
      { id: 's31', word: 'access to education', ipa: '/ˈæksɛs/', meaning: 'tiếp cận giáo dục', example: 'Children need access.', status: 'new' },
      { id: 's32', word: 'social stability', ipa: '/stəˈbɪləti/', meaning: 'ổn định xã hội', example: 'Education promotes stability.', status: 'new' },
      { id: 's33', word: 'improve living conditions', ipa: '/ɪmˈpruːv/', meaning: 'cải thiện điều kiện sống', example: 'Policies improve conditions.', status: 'new' },
      { id: 's34', word: 'address social issues', ipa: '/əˈdrɛs/', meaning: 'giải quyết vấn đề xã hội', example: 'Governments must address issues.', status: 'new' }
    ]
  },
  {
    id: 'soc-a-p1', title: 'SOCIAL ISSUES (C1-C2) (P1)', level: 'C1-C2', category: 'Society',
    cards: [
      { id: 'sa1', word: 'social inequality', ipa: '/ˌɪnɪˈkwɒləti/', meaning: 'bất bình đẳng xã hội', example: 'Inequality fuels unrest.', status: 'new' },
      { id: 'sa2', word: 'income disparity', ipa: '/dɪˈspærəti/', meaning: 'chênh lệch thu nhập', example: 'Income disparity is widening.', status: 'new' },
      { id: 'sa3', word: 'social stratification', ipa: '/ˌstrætɪfɪˈkeɪʃn/', meaning: 'phân tầng xã hội', example: 'Stratification limits mobility.', status: 'new' },
      { id: 'sa4', word: 'systemic discrimination', ipa: '/sɪˈstɛmɪk/', meaning: 'phân biệt mang tính hệ thống', example: 'Discrimination persists.', status: 'new' },
      { id: 'sa5', word: 'social mobility', ipa: '/məʊˈbɪləti/', meaning: 'khả năng dịch chuyển xã hội', example: 'Education improves mobility.', status: 'new' },
      { id: 'sa6', word: 'marginalised communities', ipa: '/ˈmɑːrdʒɪnəlaɪzd/', meaning: 'cộng đồng yếu thế', example: 'Policies must protect them.', status: 'new' },
      { id: 'sa7', word: 'gender inequality', ipa: '/ˈdʒɛndər/', meaning: 'bất bình đẳng giới', example: 'Inequality limits opportunities.', status: 'new' },
      { id: 'sa8', word: 'racial injustice', ipa: '/ˈreɪʃl/', meaning: 'bất công chủng tộc', example: 'Protests oppose injustice.', status: 'new' },
      { id: 'sa9', word: 'social exclusion', ipa: '/ɪkˈskluːʒn/', meaning: 'loại trừ xã hội', example: 'Exclusion harms cohesion.', status: 'new' },
      { id: 'sa10', word: 'poverty alleviation', ipa: '/əˌliːviˈeɪʃn/', meaning: 'giảm nghèo', example: 'Alleviation requires reform.', status: 'new' },
      { id: 'sa11', word: 'wealth distribution', ipa: '/wɛlθ/', meaning: 'phân phối tài sản', example: 'Distribution is uneven.', status: 'new' },
      { id: 'sa12', word: 'social justice movements', ipa: '/ˈdʒʌstɪs/', meaning: 'phong trào công bằng xã hội', example: 'Movements demand reform.', status: 'new' },
      { id: 'sa13', word: 'structural barriers', ipa: '/ˈstrʌktʃərəl/', meaning: 'rào cản cấu trúc', example: 'Barriers block opportunity.', status: 'new' },
      { id: 'sa14', word: 'civic engagement', ipa: '/ˈsɪvɪk/', meaning: 'tham gia công dân', example: 'Engagement strengthens democracy.', status: 'new' },
      { id: 'sa15', word: 'social cohesion', ipa: '/kəʊˈhiːʒn/', meaning: 'gắn kết xã hội', example: 'Cohesion prevents conflict.', status: 'new' }
    ]
  },
  {
    id: 'soc-a-p2', title: 'SOCIAL ISSUES (C1-C2) (P2)', level: 'C1-C2', category: 'Society',
    cards: [
      { id: 'sa16', word: 'cultural marginalisation', ipa: '/ˌmɑːrdʒɪnəlaɪˈzeɪʃn/', meaning: 'gạt ra bên lề văn hóa', example: 'Marginalisation erodes identity.', status: 'new' },
      { id: 'sa17', word: 'human rights violations', ipa: '/ˌvaɪəˈleɪʃnz/', meaning: 'vi phạm nhân quyền', example: 'Violations provoke outrage.', status: 'new' },
      { id: 'sa18', word: 'social reform initiatives', ipa: '/rɪˈfɔːrm/', meaning: 'sáng kiến cải cách xã hội', example: 'Initiatives promote equality.', status: 'new' },
      { id: 'sa19', word: 'policy-driven inequality', ipa: '/ˈpɒləsi/', meaning: 'bất bình đẳng do chính sách', example: 'Policy can worsen inequality.', status: 'new' },
      { id: 'sa20', word: 'access to education', ipa: '/ˈæksɛs/', meaning: 'tiếp cận giáo dục', example: 'Access remains unequal.', status: 'new' },
      { id: 'sa21', word: 'social polarization', ipa: '/ˌpəʊləraɪˈzeɪʃn/', meaning: 'phân cực xã hội', example: 'Polarization deepens divisions.', status: 'new' },
      { id: 'sa22', word: 'intergenerational inequality', ipa: '/ˌɪntərdʒɛnəˈreɪʃənl/', meaning: 'bất bình đẳng thế hệ', example: 'Youth face disadvantages.', status: 'new' },
      { id: 'sa23', word: 'labor exploitation', ipa: '/ˌɛksplɔɪˈteɪʃn/', meaning: 'bóc lột lao động', example: 'Exploitation violates rights.', status: 'new' },
      { id: 'sa24', word: 'digital exclusion', ipa: '/ˈdɪdʒɪtl/', meaning: 'loại trừ số', example: 'Exclusion limits opportunity.', status: 'new' },
      { id: 'sa25', word: 'social empowerment', ipa: '/ɪmˈpaʊərmənt/', meaning: 'trao quyền xã hội', example: 'Empowerment builds resilience.', status: 'new' },
      { id: 'sa26', word: 'inclusive societies', ipa: '/ɪnˈkluːsɪv/', meaning: 'xã hội bao trùm', example: 'Inclusion benefits all.', status: 'new' },
      { id: 'sa27', word: 'social accountability', ipa: '/əˌkaʊntəˈbɪləti/', meaning: 'trách nhiệm xã hội', example: 'Accountability ensures fairness.', status: 'new' },
      { id: 'sa28', word: 'ethical responsibility', ipa: '/ˈɛθɪkl/', meaning: 'trách nhiệm đạo đức', example: 'Leaders bear responsibility.', status: 'new' },
      { id: 'sa29', word: 'community resilience', ipa: '/rɪˈzɪliəns/', meaning: 'khả năng phục hồi cộng đồng', example: 'Resilience aids recovery.', status: 'new' },
      { id: 'sa30', word: 'public welfare systems', ipa: '/ˈwɛlfeər/', meaning: 'phúc lợi xã hội', example: 'Welfare supports the poor.', status: 'new' }
    ]
  },
  {
    id: 'soc-a-p3', title: 'SOCIAL ISSUES (C1-C2) (P3)', level: 'C1-C2', category: 'Society',
    cards: [
      { id: 'sa31', word: 'social stigmatization', ipa: '/ˌstɪɡmətaɪˈzeɪʃn/', meaning: 'kỳ thị xã hội', example: 'Stigmatization harms health.', status: 'new' },
      { id: 'sa32', word: 'minority representation', ipa: '/ˌreprɪzenˈteɪʃn/', meaning: 'đại diện thiểu số', example: 'Representation matters.', status: 'new' },
      { id: 'sa33', word: 'societal norms', ipa: '/səˈsaɪətl/', meaning: 'chuẩn mực xã hội', example: 'Norms evolve over time.', status: 'new' },
      { id: 'sa34', word: 'cultural prejudice', ipa: '/ˈprɛdʒudɪs/', meaning: 'định kiến văn hóa', example: 'Prejudice fuels conflict.', status: 'new' },
      { id: 'sa35', word: 'social integration', ipa: '/ˌɪntɪˈɡreɪʃn/', meaning: 'hòa nhập xã hội', example: 'Integration reduces tension.', status: 'new' },
      { id: 'sa36', word: 'grassroots activism', ipa: '/ˈɡrɑːsruːts/', meaning: 'hoạt động từ cơ sở', example: 'Activism drives change.', status: 'new' },
      { id: 'sa37', word: 'institutional bias', ipa: '/ˌɪnstɪˈtjuːʃənl/', meaning: 'thiên lệch thể chế', example: 'Bias undermines trust.', status: 'new' },
      { id: 'sa38', word: 'equal opportunity', ipa: '/ˈiːkwəl/', meaning: 'cơ hội bình đẳng', example: 'Opportunity promotes fairness.', status: 'new' },
      { id: 'sa39', word: 'social advocacy', ipa: '/ˈædvəkəsi/', meaning: 'vận động xã hội', example: 'Advocacy raises awareness.', status: 'new' },
      { id: 'sa40', word: 'social sustainability', ipa: '/səˌsteɪnəˈbɪləti/', meaning: 'bền vững xã hội', example: 'Sustainability ensures stability.', status: 'new' },
      { id: 'sa41', word: 'collective responsibility', ipa: '/kəˈlɛktɪv/', meaning: 'trách nhiệm tập thể', example: 'Society shares responsibility.', status: 'new' },
      { id: 'sa42', word: 'social reform agenda', ipa: '/əˈdʒɛndə/', meaning: 'chương trình cải cách', example: 'Agenda demands action.', status: 'new' },
      { id: 'sa43', word: 'social marginalization', ipa: '/ˌmɑːrdʒɪnəlaɪˈzeɪʃn/', meaning: 'gạt ra bên lề xã hội', example: 'Marginalization breeds resentment.', status: 'new' },
      { id: 'sa44', word: 'power imbalances', ipa: '/ˈpaʊər/', meaning: 'mất cân bằng quyền lực', example: 'Imbalances cause injustice.', status: 'new' },
      { id: 'sa45', word: 'social participation', ipa: '/pɑːrtɪsɪˈpeɪʃn/', meaning: 'tham gia xã hội', example: 'Participation strengthens democracy.', status: 'new' },
      { id: 'sa46', word: 'ethical governance', ipa: '/ˈɡʌvərnəns/', meaning: 'quản trị đạo đức', example: 'Governance builds trust.', status: 'new' },
      { id: 'sa47', word: 'social consciousness', ipa: '/ˈkɒnʃəsnəs/', meaning: 'ý thức xã hội', example: 'Consciousness drives reform.', status: 'new' },
      { id: 'sa48', word: 'community-based solutions', ipa: '/kəˈmjuːnəti/', meaning: 'giải pháp dựa vào cộng đồng', example: 'Solutions empower locals.', status: 'new' },
      { id: 'sa49', word: 'social transformation', ipa: '/ˌtrænsfəˈmeɪʃn/', meaning: 'chuyển đổi xã hội', example: 'Transformation takes time.', status: 'new' },
      { id: 'sa50', word: 'societal well-being', ipa: '/ˌwɛl ˈbiːɪŋ/', meaning: 'phúc lợi xã hội', example: 'Well-being reflects progress.', status: 'new' }
    ]
  },

  // ===========================================================================
  // TOPIC 6: CULTURE & TRADITIONS
  // ===========================================================================
  {
    id: 'cul-f-p1', title: 'CULTURE (A1-B2) (P1)', level: 'A1-B1', category: 'Culture',
    cards: [
      { id: 'c1', word: 'culture', ipa: '/ˈkʌltʃər/', meaning: 'văn hóa', example: 'Vietnamese culture is rich.', status: 'new' },
      { id: 'c2', word: 'tradition', ipa: '/trəˈdɪʃn/', meaning: 'truyền thống', example: 'This is a family tradition.', status: 'new' },
      { id: 'c3', word: 'festival', ipa: '/ˈfɛstɪvl/', meaning: 'lễ hội', example: 'Tet is a big festival.', status: 'new' },
      { id: 'c4', word: 'holiday', ipa: '/ˈhɒlədeɪ/', meaning: 'ngày lễ', example: 'Celebrate many holidays.', status: 'new' },
      { id: 'c5', word: 'custom', ipa: '/ˈkʌstəm/', meaning: 'phong tục', example: 'It is a local custom.', status: 'new' },
      { id: 'c6', word: 'celebrate', ipa: '/ˈsɛlɪbreɪt/', meaning: 'kỷ niệm', example: 'People celebrate New Year.', status: 'new' },
      { id: 'c7', word: 'ceremony', ipa: '/ˈsɛrəməni/', meaning: 'nghi lễ', example: 'The ceremony was beautiful.', status: 'new' },
      { id: 'c8', word: 'traditional', ipa: '/trəˈdɪʃənl/', meaning: 'truyền thống', example: 'She wore traditional clothes.', status: 'new' },
      { id: 'c9', word: 'costume', ipa: '/ˈkɒstjuːm/', meaning: 'trang phục', example: 'Colorful costumes.', status: 'new' },
      { id: 'c10', word: 'belief', ipa: '/bɪˈliːf/', meaning: 'niềm tin', example: 'Belief existed for centuries.', status: 'new' },
      // Complete the truncated Flashcard object and close the data structures
      { id: 'c11', word: 'respect', ipa: '/rɪˈspɛkt/', meaning: 'sự tôn trọng', example: 'We should respect our elders.', status: 'new' }
    ]
  }
];