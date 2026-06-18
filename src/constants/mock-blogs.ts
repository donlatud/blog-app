import type { BlogListItem } from "@/types/blog";

export const mockBlogs: BlogListItem[] = [
  {
    id: "1",
    slug: "beginner-guide",
    title: "คู่มือเริ่มต้นเขียนบล็อกสำหรับมือใหม่",
    excerpt:
      "เรียนรู้พื้นฐานการเขียนบทความที่ดึงดูดผู้อ่าน ตั้งแต่การเลือกหัวข้อ การจัดโครงสร้างเนื้อหา ไปจนถึงการเผยแพร่",
    coverImageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28fda07b?w=640&h=360&fit=crop",
    publishedAt: "2024-06-15T00:00:00.000Z",
    category: "GUIDE",
  },
  {
    id: "2",
    slug: "photography-tips",
    title: "เทคนิคถ่ายภาพประกอบบทความให้สวย",
    excerpt:
      "เคล็ดลับการเลือกมุม แสง และการจัดองค์ประกอบภาพเพื่อให้บทความของคุณน่าอ่านและเป็นมืออาชีพมากขึ้น",
    coverImageUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77ee70?w=640&h=360&fit=crop",
    publishedAt: "2024-06-12T00:00:00.000Z",
    category: "PHOTOGRAPHY",
  },
  {
    id: "3",
    slug: "web-trends-2024",
    title: "เทรนด์เว็บไซต์ปี 2024 ที่ควรรู้",
    excerpt:
      "สำรวจแนวโน้มการออกแบบและพัฒนาเว็บที่กำลังมาแรง พร้อมตัวอย่างการนำไปใช้จริงในโปรเจกต์ของคุณ",
    coverImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=360&fit=crop",
    publishedAt: "2024-06-10T00:00:00.000Z",
    category: "TECH",
  },
  {
    id: "4",
    slug: "writing-habits",
    title: "สร้างนิสัยเขียนอย่างสม่ำเสมอ",
    excerpt:
      "วิธีวางแผนและรักษาวินัยในการเขียน เพื่อผลิตเนื้อหาคุณภาพอย่างต่อเนื่องโดยไม่หมดไฟ",
    coverImageUrl: "https://images.unsplash.com/photo-1455390582260-0446dee2a3fa?w=640&h=360&fit=crop",
    publishedAt: "2024-06-08T00:00:00.000Z",
    category: "WRITING",
  },
  {
    id: "5",
    slug: "community-building",
    title: "สร้างชุมชนผู้อ่านที่ภักดี",
    excerpt:
      "กลยุทธ์การมีส่วนร่วมกับผู้อ่าน การตอบความคิดเห็น และการสร้างพื้นที่แลกเปลี่ยนความคิดเห็น",
    coverImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&h=360&fit=crop",
    publishedAt: "2024-06-05T00:00:00.000Z",
    category: "COMMUNITY",
  },
  {
    id: "6",
    slug: "seo-basics",
    title: "SEO พื้นฐานสำหรับบล็อก",
    excerpt:
      "ทำความเข้าใจหลักการทำ SEO อย่างง่าย เพื่อให้บทความของคุณถูกค้นพบและเข้าถึงผู้อ่านได้มากขึ้น",
    coverImageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=640&h=360&fit=crop",
    publishedAt: "2024-06-03T00:00:00.000Z",
    category: "MARKETING",
  },
  {
    id: "7",
    slug: "analytics-intro",
    title: "อ่านสถิติเว็บไซต์ให้เป็น",
    excerpt:
      "แนะนำเครื่องมือวิเคราะห์ข้อมูลพื้นฐาน และวิธีใช้ตัวเลขเพื่อปรับปรุงเนื้อหาให้ตรงใจผู้อ่าน",
    coverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=360&fit=crop",
    publishedAt: "2024-06-01T00:00:00.000Z",
    category: "ANALYTICS",
  },
  {
    id: "8",
    slug: "minimal-design",
    title: "ออกแบบบล็อกสไตล์มินิมอล",
    excerpt:
      "หลักการออกแบบที่เรียบง่ายแต่มีประสิทธิภาพ ช่วยให้ผู้อ่านโฟกัสกับเนื้อหาได้อย่างเต็มที่",
    coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640&h=360&fit=crop",
    publishedAt: "2024-05-28T00:00:00.000Z",
    category: "DESIGN",
  },
  {
    id: "9",
    slug: "productivity-tools",
    title: "เครื่องมือเพิ่มประสิทธิภาพการเขียน",
    excerpt:
      "รวมแอปและเวิร์กโฟลว์ที่ช่วยให้การวางแผน ร่าง และเผยแพร่บทความเป็นเรื่องง่ายขึ้น",
    coverImageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=640&h=360&fit=crop",
    publishedAt: "2024-05-25T00:00:00.000Z",
    category: "PRODUCTIVITY",
  },
  {
    id: "10",
    slug: "content-calendar",
    title: "วางแผนปฏิทินเนื้อหารายเดือน",
    excerpt:
      "แนวทางจัดตารางโพสต์บทความให้สม่ำเสมอ ครอบคลุมการ brainstorm จนถึงวันเผยแพร่",
    coverImageUrl: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=640&h=360&fit=crop",
    publishedAt: "2024-05-20T00:00:00.000Z",
    category: "PLANNING",
  },
  {
    id: "11",
    slug: "content-calendar",
    title: "วางแผนปฏิทินเนื้อหารายเดือน",
    excerpt:
      "แนวทางจัดตารางโพสต์บทความให้สม่ำเสมอ ครอบคลุมการ brainstorm จนถึงวันเผยแพร่",
    coverImageUrl: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=640&h=360&fit=crop",
    publishedAt: "2024-05-20T00:00:00.000Z",
    category: "PLANNING",
  },
];
