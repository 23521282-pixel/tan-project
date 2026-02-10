export interface BilingualParagraph {
  en: string;
  vi: string;
}

export interface Article {
  id: string;
  titleEn: string;
  titleVi: string;
  level: 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string;
  coverImage: string;
  externalLink: string;
  paragraphs: BilingualParagraph[];
}

// Function to generate Drive Image Link (Thumbnail)
const getDriveImg = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
const getDriveLink = (id: string) => `https://drive.google.com/open?id=${id}`;

export const ARTICLES: Article[] = [
  {
    id: 'ebook-01',
    titleEn: 'ENGLISH AS A SECOND LANGUAGE IN SCHOOLS',
    titleVi: 'Tiếng Anh là ngôn ngữ thứ hai tại trường học',
    level: 'B2',
    category: 'Education',
    // Image of 5 (Swapped correctly)
    coverImage: getDriveImg('1_hbTMb-YHy0njfGrkFM7-RlJBXjBW1zY'),
    // Link: Swapped to 2 (1q7gqX11vqPWyfMIfKXfs1lcuNDovk8c0)
    externalLink: getDriveLink('1q7gqX11vqPWyfMIfKXfs1lcuNDovk8c0'),
    paragraphs: [
      {
        en: "The Vietnamese government has recently launched a new initiative to implement the Politburo’s Resolution No. 71, which focuses on breakthrough developments in education and training. The action program aims to enhance the quality of human resources and align them with the demands of future national development.",
        vi: "Chính phủ Việt Nam gần đây đã khởi động một sáng kiến mới nhằm thực hiện Nghị quyết số 71 của Bộ Chính trị, tập trung vào những bước phát triển đột phá trong lĩnh vực giáo dục và đào tạo. Chương trình hành động này hướng đến việc nâng cao chất lượng nguồn nhân lực và điều chỉnh phù hợp với nhu cầu phát triển quốc gia trong tương lai."
      },
      {
        en: "According to Dr. Doan Minh, creating a supportive English as a Second Language (ESL) environment requires encouraging people to use English naturally and continuously. He emphasizes that students should feel the need to use English not only in learning but also in their daily school life.",
        vi: "Theo Tiến sĩ Đoàn Minh, việc tạo dựng môi trường hỗ trợ tiếng Anh như ngôn ngữ thứ hai (ESL) đòi hỏi phải khuyến khích mọi người sử dụng tiếng Anh một cách tự nhiên và liên tục. Ông nhấn mạnh rằng học sinh nên cảm thấy cần sử dụng tiếng Anh không chỉ trong học tập mà còn trong đời sống học đường hàng ngày."
      },
      {
        en: "To evaluate the success of these strategies, Dr. Minh suggests that assessment should go beyond traditional test scores. Instead, it should consider how effectively students communicate, how they work on projects, and how confidently and naturally they use English in daily interactions.",
        vi: "Để đánh giá mức độ thành công của các chiến lược này, Tiến sĩ Minh cho rằng việc đánh giá không nên chỉ dừng lại ở điểm số truyền thống. Thay vào đó, nó cần xem xét mức độ hiệu quả trong giao tiếp của sinh viên, cách họ thực hiện các dự án, và mức độ tự tin, tự nhiên khi sử dụng tiếng Anh trong giao tiếp hằng ngày."
      },
      {
        en: "Across the country, pioneering efforts have been made to apply innovative and modern teaching methods. In a middle school in Hanoi, for example, students integrate English into various subjects. Such activities are designed to help learners use English effectively in both academic and everyday settings.",
        vi: "Trên khắp cả nước, nhiều nỗ lực tiên phong đã được thực hiện nhằm áp dụng các phương pháp giảng dạy hiện đại và sáng tạo. Ví dụ, tại một trường trung học ở Hà Nội, học sinh tích hợp tiếng Anh vào nhiều môn học khác nhau. Những hoạt động như vậy được thiết kế nhằm giúp người học sử dụng tiếng Anh hiệu quả trong cả môi trường học thuật và đời sống hằng ngày."
      },
      {
        en: "However, challenges remain. Some students find it difficult to study entirely in English because their mother tongue is Vietnamese. Teachers also play a crucial role in this transformation. Experts emphasize that teachers must possess not only strong English proficiency but also appropriate teaching methodologies.",
        vi: "Tuy nhiên, vẫn còn nhiều thách thức. Một số học sinh gặp khó khăn khi học hoàn toàn bằng tiếng Anh, vì tiếng mẹ đẻ của các em là tiếng Việt. Giáo viên cũng đóng vai trò then chốt trong quá trình chuyển đổi này. Các chuyên gia nhấn mạnh rằng giáo viên cần có không chỉ năng lực tiếng Anh vững vàng mà còn phải sở hữu phương pháp giảng dạy phù hợp."
      },
      {
        en: "Currently, the Ministry of Education and Training is developing a draft national project to make English the second language in schools by 2035. If implemented effectively, this initiative could mark a significant step toward building a future generation of globally competent Vietnamese citizens.",
        vi: "Hiện nay, Bộ Giáo dục và Đào tạo đang xây dựng dự thảo dự án quốc gia nhằm đưa tiếng Anh trở thành ngôn ngữ thứ hai trong các trường học vào năm 2035. Nếu được triển khai hiệu quả, sáng kiến này có thể đánh dấu một bước tiến quan trọng hướng tới việc xây dựng thế hệ công dân Việt Nam có năng lực toàn cầu trong tương lai."
      }
    ]
  },
  {
    id: 'ebook-02',
    titleEn: 'CHALLENGES IN THE EDUCATION SYSTEM',
    titleVi: 'Những thách thức trong hệ thống giáo dục',
    level: 'B1',
    category: 'Education',
    // Image of 4 (Swapped correctly)
    coverImage: getDriveImg('1blIgz9q5VQx8OSDgg6hcohGiivNv1RxP'),
    // Link: Swapped to 1 (1djPVF58OOuhwyEScyyDfAmrmQX5RGmuK)
    externalLink: getDriveLink('1djPVF58OOuhwyEScyyDfAmrmQX5RGmuK'),
    paragraphs: [
      {
        en: "Education systems worldwide face numerous challenges that impact their ability to provide quality learning experiences. In recent decades, rapid advancements in technology, demographic shifts, and evolving labor market demands have necessitated significant reforms.",
        vi: "Hệ thống giáo dục trên toàn thế giới đang phải đối mặt với nhiều thách thức ảnh hưởng đến khả năng cung cấp trải nghiệm học tập chất lượng. Trong vài thập kỷ gần đây, sự tiến bộ nhanh chóng của công nghệ, những thay đổi về nhân khẩu học và sự phát triển của nhu cầu thị trường lao động đã đòi hỏi các quốc gia tiến hành những cải cách đáng kể."
      },
      {
        en: "One pressing challenge is the disparity in educational resources. Schools in wealthy regions often have access to modern technology, while schools in lower-income areas may struggle with outdated materials, insufficient infrastructure, and a lack of qualified teachers.",
        vi: "Một thách thức cấp bách là sự chênh lệch về nguồn lực giáo dục. Các trường ở khu vực giàu có thường có điều kiện tiếp cận công nghệ hiện đại, ngược lại, các trường ở khu vực thu nhập thấp có thể gặp khó khăn với tài liệu lỗi thời, cơ sở hạ tầng không đủ và thiếu giáo viên đủ trình độ."
      }
    ]
  },
  {
    id: 'ebook-03',
    titleEn: 'JOB HUGGING',
    titleVi: 'Xu hướng ôm việc trong thời đại mới',
    level: 'C1',
    category: 'Career',
    // Keep Image 3
    coverImage: getDriveImg('1CvYCwthrYVnt30ApTanWfgX2xLSuKAIF'),
    externalLink: getDriveLink('1wLbYI8eSwTdicVpiAm_1McW0O8USYcNL'),
    paragraphs: [
      {
        en: "In today’s world of economic uncertainty, many young professionals have become increasingly cautious about their career decisions. They tend to hold tightly to their current positions, a trend commonly referred to as “job hugging.”",
        vi: "Trong thế giới kinh tế đầy bất ổn ngày nay, nhiều người trẻ làm việc chuyên nghiệp trở nên thận trọng hơn trong việc đưa ra quyết định nghề nghiệp. Họ có xu hướng bám chặt vào vị trí hiện tại - một xu hướng thường được gọi là “ôm việc”."
      }
    ]
  },
  {
    id: 'ebook-04',
    titleEn: 'REDUCED INEQUALITIES',
    titleVi: 'Giảm thiểu sự bất bình đẳng',
    level: 'B1',
    category: 'Society',
    // Image of 2
    coverImage: getDriveImg('1xm6GMlAaxSNja99MWn-_-xR6aCCLLriK'),
    externalLink: getDriveLink('1WLV3XP4dcLf3lKtt9FM0BFijY07w-l12'),
    paragraphs: [
      {
        en: "Inequality exists in almost every society and manifests in many forms: income, gender, ethnicity, disability, or access to education. Disparities hinder not only social cohesion but also sustainable economic growth.",
        vi: "Bất bình đẳng tồn tại ở hầu hết mọi xã hội và biểu hiện dưới nhiều hình thức: thu nhập, giới tính, dân tộc, khuyết tật hoặc tiếp cận giáo dục. Sự chênh lệch cản trở sự gắn kết xã hội và cả tăng trưởng kinh tế bền vững."
      }
    ]
  },
  {
    id: 'ebook-05',
    titleEn: 'MARINE LIFE PROTECTION',
    titleVi: 'Bảo vệ sự sống dưới đại dương',
    level: 'C2',
    category: 'Environment',
    // Image of 1
    coverImage: getDriveImg('16ETiG4yY8cj-NibN2Qb3QwP9eGTMErRh'),
    externalLink: getDriveLink('1hhrXYk1cK6nb6rDQjgmKzCg3650GW24G'),
    paragraphs: [
      {
        en: "Beneath the ocean’s surface exists a complex ecological realm, where coral formations function as foundational habitats. However, anthropogenic pressures like ocean warming and pollution have rendered these systems profoundly vulnerable.",
        vi: "Bên dưới bề mặt đại dương tồn tại một vùng sinh thái phức tạp, nơi san hô đóng vai trò môi trường sống nền tảng. Tuy nhiên, các tác động từ con người như nóng lên đại dương và ô nhiễm đã khiến hệ thống này trở nên dễ tổn thương sâu sắc."
      }
    ]
  }
];