
export interface Question {
  id: number;
  label: string;
  correct: string;
  options: { key: string; text: string }[];
  explanation?: string;
}

export interface TestSection {
  id: number;
  title: string;
  instruction: string;
  passage: string;
  questions: Question[];
}

export interface HocLieuTestData {
  id: number;
  title: string;
  description: string;
  sections: TestSection[];
  totalQuestions: number;
  estimatedTime: number; // in minutes
}

export const OFFICIAL_HOC_LIEU_TEST: HocLieuTestData = {
  id: 1,
  title: "BÀI TEST TƯ DUY TỔNG HỢP – HỌC LIỆU WEBSITE",
  description: "Đánh giá toàn diện 6 kỹ năng: Cloze reading, Reading comprehension, Sentence arrangement, Long reading, Tourism risk và Active lifestyle.",
  totalQuestions: 40,
  estimatedTime: 60,
  sections: [
    {
      id: 1,
      title: "PHẦN 1: Cloze Reading - Art Exhibition",
      instruction: "Read the following announcement and mark the letter A, B, C or D on your answer sheet to indicate the option that best fits each of the numbered blanks from 1 to 6.",
      passage: "Vietnam International Art Exhibition 2025 – A Landmark Cultural Event\n\nTaking place from July 25th to 29th at the International Centre for Exhibition in Hanoi, the Vietnam International Art Exhibition 2025 will showcase over 100 famous galleries (1) ______ are derived from global art capitals alongside Vietnam's (2) ______ art institutions. Visitors will gain exposure to a wide (3) ______ of oil paintings, sculptures, digital art, and mixed media, blending traditional and contemporary styles. The event will also feature live art demonstrations and insightful discussions (4) ______ by famous artists and curators, offering a deeper understanding of modern artistic trends. This exhibition is a unique opportunity for (5) ______, investors, and art enthusiasts to discover emerging talents and (6) ______ some artworks. Don't miss this incredible celebration of artistic expression!",
      questions: [
        { 
          id: 1, label: "Question 1", correct: "D", 
          options: [{key: 'A', text: 'whose'}, {key: 'B', text: 'whom'}, {key: 'C', text: 'who'}, {key: 'D', text: 'which'}],
          explanation: "✅ Đáp án: which\n🔎 Lí do:\n✔️ Đứng sau danh từ 'galleries', cần đại từ quan hệ thay cho vật làm chủ ngữ.\n✔️ Công thức: which + V (are derived).\n⚠️ Loại trừ:\n❌ whose: + danh từ.\n❌ whom: chỉ người, tân ngữ.\n❌ who: chỉ người."
        },
        { 
          id: 2, label: "Question 2", correct: "B", 
          options: [{key: 'A', text: 'flying'}, {key: 'B', text: 'leading'}, {key: 'C', text: 'heading'}, {key: 'D', text: 'rating'}],
          explanation: "✅ Đáp án: leading\n🔎 Lí do:\n✔️ 'leading' = hàng đầu, nổi bật. Phù hợp ngữ cảnh nói về các nghệ sĩ nổi tiếng Việt Nam.\n⚠️ Loại trừ:\n❌ flying/heading/rating: Không tạo thành cụm từ hợp nghĩa với 'artists'."
        },
        { 
          id: 3, label: "Question 3", correct: "A", 
          options: [{key: 'A', text: 'range'}, {key: 'B', text: 'amount'}, {key: 'C', text: 'deal'}, {key: 'D', text: 'number'}],
          explanation: "✅ Đáp án: range\n🔎 Lí do:\n✔️ Collocation: 'a wide range of' = sự đa dạng, nhiều loại khác nhau.\n⚠️ Loại trừ:\n❌ amount/deal: + danh từ không đếm được.\n❌ number: đi với 'a large number of'."
        },
        { 
          id: 4, label: "Question 4", correct: "D", 
          options: [{key: 'A', text: 'holding'}, {key: 'B', text: 'have held'}, {key: 'C', text: 'be holding'}, {key: 'D', text: 'held'}],
          explanation: "✅ Đáp án: held\n🔎 Lí do:\n✔️ Rút gọn mệnh đề quan hệ bị động: 'discussions which are held' -> 'held'.\n⚠️ Loại trừ:\n❌ holding: dạng chủ động.\n❌ have held/be holding: sai cấu trúc bổ ngữ danh từ."
        },
        { 
          id: 5, label: "Question 5", correct: "D", 
          options: [{key: 'A', text: 'collectively'}, {key: 'B', text: 'collective'}, {key: 'C', text: 'collect'}, {key: 'D', text: 'collectors'}],
          explanation: "✅ Đáp án: collectors\n🔎 Lí do:\n✔️ Cấu trúc liệt kê danh từ: 'collectors, investors, and art enthusiasts'.\n⚠️ Loại trừ:\n❌ collectively: trạng từ.\n❌ collective: tính từ.\n❌ collect: động từ."
        },
        { 
          id: 6, label: "Question 6", correct: "A", 
          options: [{key: 'A', text: 'pick up'}, {key: 'B', text: 'fill up'}, {key: 'C', text: 'come up'}, {key: 'D', text: 'get up'}],
          explanation: "✅ Đáp án: pick up\n🔎 Lí do:\n✔️ 'pick up some artworks' = mua hoặc sở hữu tác phẩm.\n⚠️ Loại trừ:\n❌ fill up: làm đầy.\n❌ come up: xuất hiện.\n❌ get up: thức dậy."
        },
      ]
    },
    {
      id: 2,
      title: "PHẦN 2: Reading Comprehension - Farming Tech",
      instruction: "Read the passage and mark the letter A, B, C or D on your answer sheet to indicate the best answer to each of the following questions from 7 to 14.",
      passage: "The concept of project farming, where farmers come together to collaborate on large-scale agricultural projects, has gained significant traction, and modern technology keeps this collaboration on track. Advanced technologies such as GPS, sensors, drones, and data analytics are used to optimise agricultural practices. Additionally, the collected real-time data on soil conditions, weather patterns, and plant growth enables farmers to accelerate the decision-making process that maximises productivity while minimising resource wastage.\n\nGPS technology allows farmers to precisely map out their fields and create customised planting plans. This ensures that seeds are sown at optimal locations based on soil characteristics and previous yield data. By avoiding areas with poor fertility, farmers can increase their overall crop yield. Camera traps provide advance warnings of insects, so farmers do not have to treat the whole field. This, therefore, helps curb chemical runoff and save money for every party involved in the project.\n\nTechnology also plays a vital role in optimising irrigation practices for sustainable agriculture. Specialised equipment reports dryness hour by hour, and weather apps forecast rain for the week ahead. Automated valves give each zone exactly the water it needs and pause when clouds are approaching. This cuts pumping costs and protects groundwater while keeping the crop healthy. On dry continents, such savings keep projects economically viable.\n\nThe digital trail does not stop at the farm gate. Cloud platforms let project farmers, processors, and truck drivers input harvest weights, storage temperatures, and delivery times the moment they change, while blockchain records freeze each entry so customers can trust it. Analytic tools combine seasons of records to forecast demand, spot price opportunities, and mark weak points in the workflow. This allows project farmers to anticipate market demand, exploit resource allocation, and plan for potential challenges.",
      questions: [
        { id: 7, label: "Question 7", correct: "C", options: [{key: 'A', text: 'weather patterns'}, {key: 'B', text: 'soil conditions'}, {key: 'C', text: 'data analytics'}, {key: 'D', text: 'plant growth'}], explanation: "✅ Đáp án: data analytics\n🔎 Lí do:\n✔️ Đoạn 1 liệt kê dữ liệu: 'soil conditions, weather patterns, and plant growth'.\n✔️ 'Data analytics' là công cụ phân tích, không phải loại dữ liệu được thu thập." },
        { id: 8, label: "Question 8", correct: "C", options: [{key: 'A', text: 'require'}, {key: 'B', text: 'guide'}, {key: 'C', text: 'speed'}, {key: 'D', text: 'install'}], explanation: "✅ Đáp án: speed\n🔎 Lí do:\n✔️ 'Accelerate' = tăng tốc, làm nhanh hơn. Đồng nghĩa với 'speed'." },
        { id: 9, label: "Question 9", correct: "D", options: [{key: 'A', text: 'limit'}, {key: 'B', text: 'reduce'}, {key: 'C', text: 'monitor'}, {key: 'D', text: 'increase'}], explanation: "✅ Đáp án: increase\n🔎 Lí do:\n✔️ Trái nghĩa: 'Curb' = kiềm chế, hạn chế. Ngược lại là 'increase'." },
        { id: 10, label: "Question 10", correct: "C", options: [{key: 'A', text: 'dryness'}, {key: 'B', text: 'equipment'}, {key: 'C', text: 'zone'}, {key: 'D', text: 'week'}], explanation: "✅ Đáp án: zone\n🔎 Lí do:\n✔️ 'Automated valves give each zone... the water IT needs' -> 'it' thay thế cho 'zone'." },
        { id: 11, label: "Question 11", correct: "B", options: [{key: 'A', text: 'In places with hot weather, economic projects are possible.'}, {key: 'B', text: 'Money saved maintains the economic practicality in dry areas.'}, {key: 'C', text: 'Continents enjoy financial benefits.'}, {key: 'D', text: 'Huge budget gained.'}], explanation: "✅ Đáp án: B\n🔎 Lí do:\n✔️ 'keep projects economically viable' = 'maintains the economic practicality'." },
        { id: 12, label: "Question 12", correct: "B", options: [{key: 'A', text: 'Customers find entries untrustworthy.'}, {key: 'B', text: 'Analytic tools help anticipate demand.'}, {key: 'C', text: 'Cloud platforms predict demand.'}, {key: 'D', text: 'Digital trail stops after harvest.'}], explanation: "✅ Đáp án: B\n🔎 Lí do:\n✔️ Đoạn 4: 'Analytic tools... forecast demand' -> 'forecast' = 'anticipate'." },
        { id: 13, label: "Question 13", correct: "B", options: [{key: 'A', text: 'Paragraph 1'}, {key: 'B', text: 'Paragraph 4'}, {key: 'C', text: 'Paragraph 2'}, {key: 'D', text: 'Paragraph 3'}], explanation: "✅ Đáp án: Paragraph 4\n🔎 Lí do:\n✔️ Đoạn 4 nói về 'Cloud platforms' theo dõi trọng lượng, nhiệt độ, thời gian giao hàng." },
        { id: 14, label: "Question 14", correct: "C", options: [{key: 'A', text: 'Paragraph 1'}, {key: 'B', text: 'Paragraph 4'}, {key: 'C', text: 'Paragraph 2'}, {key: 'D', text: 'Paragraph 3'}], explanation: "✅ Đáp án: Paragraph 2\n🔎 Lí do:\n✔️ Đoạn 2: 'Camera traps provide advance warnings of insects' -> biện pháp phòng ngừa côn trùng." },
      ]
    },
    {
      id: 3,
      title: "PHẦN 3: Sentence / Conversation Arrangement",
      instruction: "Mark the letter A, B, C or D on your answer sheet to indicate the best arrangement of utterances or sentences to make a cohesive and coherent exchange or text in each of the following questions from 15 to 19.",
      passage: "Logical thinking and cohesion in English structures.",
      questions: [
        { id: 15, label: "Question 15", correct: "B", options: [{key: 'A', text: 'd-e-b-a-c'}, {key: 'B', text: 'd-b-c-e-a'}, {key: 'C', text: 'e-a-d-c-b'}, {key: 'D', text: 'e-c-a-b-d'}], explanation: "✅ Đáp án: d-b-c-e-a\n🔎 Lí do:\n✔️ (d) Mở đầu trải nghiệm. (b) Suy nghĩ bất ngờ. (c,e) Chi tiết vất vả. (a) Kết luận bài học." },
        { id: 16, label: "Question 16", correct: "C", options: [{key: 'A', text: 'e-a-d-b-c'}, {key: 'B', text: 'c-b-e-a-d'}, {key: 'C', text: 'd-a-c-b-e'}, {key: 'D', text: 'c-a-d-b-e'}], explanation: "✅ Đáp án: d-a-c-b-e\n🔎 Lí do:\n✔️ (d) Lời khen và câu hỏi. (a) Trả lời và hỏi ngược. (c) Louis trả lời. (b) Susan đồng tình. (e) Kết thúc." },
        { id: 17, label: "Question 17", correct: "D", options: [{key: 'A', text: 'a-b-d-e-c'}, {key: 'B', text: 'e-d-c-a-b'}, {key: 'C', text: 'a-d-b-c-e'}, {key: 'D', text: 'e-c-d-b-a'}], explanation: "✅ Đáp án: e-c-d-b-a\n🔎 Lí do:\n✔️ (e) Bối cảnh quá tải. (c,d) Giải pháp hạ tầng & giao thông. (b) Kết quả kinh tế. (a) Kết luận thành phố thịnh vượng." },
        { id: 18, label: "Question 18", correct: "C", options: [{key: 'A', text: 'c-a-b'}, {key: 'B', text: 'a-c-b'}, {key: 'C', text: 'c-b-a'}, {key: 'D', text: 'a-b-c'}], explanation: "✅ Đáp án: c-b-a\n🔎 Lí do:\n✔️ (c) Hỏi đường. (b) Chỉ đường. (a) Cảm ơn." },
        { id: 19, label: "Question 19", correct: "C", options: [{key: 'A', text: 'e-a-b-d-c'}, {key: 'B', text: 'c-e-d-a-b'}, {key: 'C', text: 'e-d-b-c-a'}, {key: 'D', text: 'c-e-a-b-d'}], explanation: "✅ Đáp án: e-d-b-c-a\n🔎 Lí do:\n✔️ (e) Thông báo thay thẻ. (d,b) Hướng dẫn dùng & hủy thẻ cũ. (c) Cảnh báo hết hạn. (a) Nếu chưa nhận thì liên hệ." },
      ]
    },
    {
      id: 4,
      title: "PHẦN 4: Long Reading - Greenwashing",
      instruction: "Read the passage and mark the letter A, B, C or D on your answer sheet to indicate the best answer to each of the following questions from 20 to 29.",
      passage: "We are living through a boom in greenwashing – the strategic use of comforting environmental claims to disguise business-as-usual pollution. Picture a chief executive whose company emits millions of tonnes of CO2. Genuine decarbonisation would require bruising boardroom discussions, huge capital outlays, and a complete redesign of the firm's model. Far easier is to hire a creative agency to plaster products with labels such as 'carbon-neutral' or 'net-zero,' calming critics, investors, and even eco-conscious children while emissions continue unsolved.\n\nThis tactic meets consumers at every turn. Airline websites promise guilt-free flights, petrol pumps boast zero-impact fuel, and even supermarket bacon is marketed as net-zero. [I] Advertising trickery is ancient, yet today's greenwashing has flourished only recently. Faced with mounting scrutiny, many boards prefer glossy PR to structural reform. Oil and gas giants have swapped their denial tactics for a 'green' paint-sprayer, trumpeting token investments in renewables while expanding drilling.\n\nWhy does this matter? Greenwashing and climate denial share a core objective: to postpone the emissions cuts urgently required to avert climate breakdown. [III] Whereas denial invites opposition, greenwashing lulls the public into believing problems are already solved. Under this collective illusion, pressure on high-emitting firms evaporates and the radical decisions needed to transform energy, transport, and food systems are delayed indefinitely. [IV] Greenwashing thus acts as a soothing lullaby, leading society toward ecological ruin with a tune of comforting half-truths.",
      questions: [
        { id: 20, label: "Question 20", correct: "C", options: [{key: 'A', text: 'overlooked by corporations'}, {key: 'B', text: 'hiring an agency'}, {key: 'C', text: 'is costly and demanding'}, {key: 'D', text: 'physically injures boards'}], explanation: "✅ Đáp án: is costly and demanding\n🔎 Lí do:\n✔️ Đoạn 1: 'require... huge capital outlays (tốn kém) and a complete redesign (đòi hỏi cao)'." },
        { id: 21, label: "Question 21", correct: "B", options: [{key: 'A', text: 'Environmental benefits.'}, {key: 'B', text: 'Enterprises prefer tags over action.'}, {key: 'C', text: 'Opinions are divided.'}, {key: 'D', text: 'Pressure urges adoption.'}], explanation: "✅ Đáp án: B\n🔎 Lí do:\n✔️ Tóm tắt đoạn 1: Doanh nghiệp chọn cách gắn nhãn dễ dàng thay vì cải cách thực sự." },
        { id: 22, label: "Question 22", correct: "B", options: [{key: 'A', text: 'net-zero bacon'}, {key: 'B', text: 'non-degradable electronics'}, {key: 'C', text: 'guilt-free flights'}, {key: 'D', text: 'zero-impact fuel'}], explanation: "✅ Đáp án: non-degradable electronics\n🔎 Lí do:\n✔️ Không xuất hiện trong các ví dụ ở đoạn 1 và 2." },
        { id: 23, label: "Question 23", correct: "A", options: [{key: 'A', text: 'appealing but superficial'}, {key: 'B', text: 'expensive but essential'}, {key: 'C', text: 'confusing but engaging'}, {key: 'D', text: 'costly but ineffective'}], explanation: "✅ Đáp án: appealing but superficial\n🔎 Lí do:\n✔️ 'Glossy PR' = truyền thông bóng bẩy nhưng hời hợt." },
        { id: 24, label: "Question 24", correct: "A", options: [{key: 'A', text: 'oil and gas giants'}, {key: 'B', text: 'the United States'}, {key: 'C', text: 'regulators in Europe'}, {key: 'D', text: 'rules on environmental claims'}], explanation: "✅ Đáp án: oil and gas giants\n🔎 Lí do:\n✔️ 'They' thay thế cho 'oil and gas giants' ở câu trước đó." },
        { id: 25, label: "Question 25", correct: "B", options: [{key: 'A', text: 'Option A'}, {key: 'B', text: 'Option B'}, {key: 'C', text: 'Option C'}, {key: 'D', text: 'Option D'}], explanation: "✅ Đáp án: B\n🔎 Lí do:\n✔️ Giữ đúng logic: phải vạch trần greenwashing thì hành động thực mới thay thế được lời nói suông." },
        { id: 26, label: "Question 26", correct: "D", options: [{key: 'A', text: 'dispute claims'}, {key: 'B', text: 'typical application'}, {key: 'C', text: 'prompt response'}, {key: 'D', text: 'specific example of greenwashing'}], explanation: "✅ Đáp án: D\n🔎 Lí do:\n✔️ 'Green paint-sprayer' là ẩn dụ cho hành động greenwashing cụ thể." },
        { id: 27, label: "Question 27", correct: "D", options: [{key: 'A', text: 'Profits reinvested.'}, {key: 'B', text: 'Stressed urgency.'}, {key: 'C', text: 'Regulators have tools.'}, {key: 'D', text: 'Public concern contributes to rise.'}], explanation: "✅ Đáp án: D\n🔎 Lí do:\n✔️ Lo lắng môi trường + dễ tin nhãn 'xanh' -> thúc đẩy greenwashing phát triển." },
        { id: 28, label: "Question 28", correct: "C", options: [{key: 'A', text: '[I]'}, {key: 'B', text: '[II]'}, {key: 'C', text: '[III]'}, {key: 'D', text: '[IV]'}], explanation: "✅ Đáp án: [III]\n🔎 Lí do:\n✔️ 'Yet greenwashing is more insidious' so sánh với 'denial' ngay trước vị trí [III]." },
        { id: 29, label: "Question 29", correct: "C", options: [{key: 'A', text: 'Raising awareness.'}, {key: 'B', text: 'Opted for denials.'}, {key: 'C', text: 'New wave hides pollution.'}, {key: 'D', text: 'Scale and sophistication.'}], explanation: "✅ Đáp án: C\n🔎 Lí do:\n✔️ Tóm tắt toàn bài: Làn sóng mới dùng nhãn xanh để che giấu ô nhiễm, trì hoãn hành động thực." },
      ]
    },
    {
      id: 5,
      title: "PHẦN 5: Cloze Reading - Tourism Risk",
      instruction: "Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the option that best fits each of the numbered blanks from 30 to 34.",
      passage: "All holidays involve some element of risk, whether in the form of illness, bad weather, being unable to get what we want if we delay booking, or (30) ______. We ask ourselves what risks we would run if we went there, if there is a high likelihood of their occurrence, the risks are avoidable and how significant the consequences would be.\n\nSome tourists, of course, relish a degree of risk, as this gives an edge of excitement to the holiday. (31) ______. Others, however, are risk averse and will studiously avoid risk wherever possible. Clearly, the significance of the risk will be a key factor. (32) ______. The risk averse will book early, choose to return to the same resort and hotel they have visited, knowing its reliability, or book a package tour rather than travel independently.\n\n(33) ______. There is evidence that much of the continuing reluctance shown by some tourists to seek information and make bookings through Internet providers can be attributed to, in part, the lack of face-to-face contact with a trusted travel agent and, in part, (34) ______ in favour of the information provider.",
      questions: [
        { id: 30, label: "Question 30", correct: "C", options: [{key: 'A', text: 'what are the products'}, {key: 'B', text: 'until we see products'}, {key: 'C', text: 'being uncertain until seeing it directly'}, {key: 'D', text: 'for a certain product'}], explanation: "✅ Đáp án: C\n🔎 Lí do:\n✔️ Cần danh động từ song song với 'being unable to get...'.\n✔️ Thể hiện rủi ro về sự không chắc chắn." },
        { id: 31, label: "Question 31", correct: "B", options: [{key: 'A', text: 'do not present risks'}, {key: 'B', text: 'risk is not a barrier to tourism'}, {key: 'C', text: 'does not present barriers'}, {key: 'D', text: 'if barrier is not risk'}], explanation: "✅ Đáp án: B\n🔎 Lí do:\n✔️ Một số người thích rủi ro -> rủi ro không phải là rào cản ngăn họ đi du lịch." },
        { id: 32, label: "Question 32", correct: "B", options: [{key: 'A', text: 'People concerned about crime.'}, {key: 'B', text: 'Less concern about weather than crime.'}, {key: 'C', text: 'Crime is greater concern.'}, {key: 'D', text: 'Similarly weather greater.'}], explanation: "✅ Đáp án: B\n🔎 Lí do:\n✔️ Hệ quả: Người ta lo về tội phạm (nghiêm trọng) hơn là thời tiết (ít nghiêm trọng)." },
        { id: 33, label: "Question 33", correct: "B", options: [{key: 'A', text: 'Choosing methods without risky factors.'}, {key: 'B', text: 'Risk is also a factor in booking methods.'}, {key: 'C', text: 'Choose factors and methods.'}, {key: 'D', text: 'Methods choose are risky.'}], explanation: "✅ Đáp án: B\n🔎 Lí do:\n✔️ Câu chuyển đoạn: Rủi ro cũng ảnh hưởng đến cách khách hàng chọn phương thức đặt tour." },
        { id: 34, label: "Question 34", correct: "A", options: [{key: 'A', text: 'suspicion that information will be biased'}, {key: 'B', text: 'thanks to biased information'}, {key: 'C', text: 'due to Internet bias'}, {key: 'D', text: 'biased info will be suspicious'}], explanation: "✅ Đáp án: A\n🔎 Lí do:\n✔️ Cần cụm danh từ song song với 'the lack of...'.\n✔️ 'The suspicion that...' diễn tả sự nghi ngại của người dùng." },
      ]
    },
    {
      id: 6,
      title: "PHẦN 6: Cloze Leaflet - Active Life",
      instruction: "Read the following leaflet and mark the letter A, B, C or D on your answer sheet to indicate the option that best fits each of the numbered blanks from 35 to 40.",
      passage: "How to Live Your Life Actively?\n\nIf you are not naturally sporty, and finding ways to fit more activity into your daily life, here are several tips to help you make a routine (35) ______ being active:\nSelect a realistic exercise plan.\nTrack your progress using a health app (36) ______ a paper checklist.\nTake every opportunity to do such strength-building activities as carrying (37) ______ or climbing the stairs.\nInvite friends and (38) ______ family members to join in, and try (39) ______ everyone's competitiveness with challenges like seeing who can do the most steps or cover the most distance in a day.\nReward yourself with a treat like a favourite TV show if your plan works (40) ______ to maintain your motivation.",
      questions: [
        { id: 35, label: "Question 35", correct: "D", options: [{key: 'A', text: 'in'}, {key: 'B', text: 'to'}, {key: 'C', text: 'at'}, {key: 'D', text: 'of'}], explanation: "✅ Đáp án: of\n🔎 Lí do:\n✔️ Cấu trúc: 'make a routine of + V-ing' = tạo thói quen làm gì." },
        { id: 36, label: "Question 36", correct: "A", options: [{key: 'A', text: 'or'}, {key: 'B', text: 'nor'}, {key: 'C', text: 'so'}, {key: 'D', text: 'but'}], explanation: "✅ Đáp án: or\n🔎 Lí do:\n✔️ Lựa chọn giữa 2 phương án (app hoặc checklist)." },
        { id: 37, label: "Question 37", correct: "D", options: [{key: 'A', text: 'bags grocery heavy'}, {key: 'B', text: 'heavy bags grocery'}, {key: 'C', text: 'bags heavy grocery'}, {key: 'D', text: 'heavy grocery bags'}], explanation: "✅ Đáp án: D\n🔎 Lí do:\n✔️ Trật tự tính từ: Miêu tả (heavy) + Loại (grocery) + Danh từ (bags)." },
        { id: 38, label: "Question 38", correct: "A", options: [{key: 'A', text: 'other'}, {key: 'B', text: 'the others'}, {key: 'C', text: 'another'}, {key: 'D', text: 'others'}], explanation: "✅ Đáp án: other\n🔎 Lí do:\n✔️ 'other + plural noun' = những ... khác." },
        { id: 39, label: "Question 39", correct: "D", options: [{key: 'A', text: 'comparing'}, {key: 'B', text: 'contrasting'}, {key: 'C', text: 'replacing'}, {key: 'D', text: 'engaging'}], explanation: "✅ Đáp án: engaging\n🔎 Lí do:\n✔️ 'engaging everyone's competitiveness' = khơi dậy/thu hút sự cạnh tranh." },
        { id: 40, label: "Question 40", correct: "A", options: [{key: 'A', text: 'wonders'}, {key: 'B', text: 'legends'}, {key: 'C', text: 'values'}, {key: 'D', text: 'marvels'}], explanation: "✅ Đáp án: wonders\n🔎 Lí do:\n✔️ Idiom: 'work wonders' = mang lại hiệu quả tuyệt vời." },
      ]
    }
  ]
};
