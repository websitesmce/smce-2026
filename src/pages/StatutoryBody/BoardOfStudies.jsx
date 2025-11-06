import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { label: "ECE", value: "ECE" },
  { label: "CSE", value: "CSE" },
  { label: "CSE-AI", value: "CSEAI" },
  { label: "CSE-DS", value: "CSEDS" },
  { label: "IT", value: "IT" },
  { label: "CHEMISTRY", value: "CHEMISTRY" },
  { label: "ENGLISH", value: "ENGLISH" },
  { label: "MATHEMATICS", value: "MATHEMATICS" },
  { label: "MECHANICAL ENGINEERING", value: "MECHANICAL ENGINEERING" },
  { label: "PHYSICS", value: "PHYSICS" },
  { label: "MBA", value: "MBA" },
];

const tablesData = {
  ECE: [
    { heading: "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of Electronics and Communication Engineering\nComposition of Board of Studies\nA.Y.: 2023-24" },
    { name: "Dr.M.Nageswara Rao Professor of ECE Dept. & HOD", role: "Chairperson", nominatedBy: "SMCE" },
    { name: "Dr. B.T.Krishna, Professor of ECE, UCEK,JNTU Kakinada", role: "University Nominee", nominatedBy: "JNTU Kakinada" },
    { name: "Professor, Department of ECE KLU (Deemed to be University)", role: "Subject expert from outside the parent University", nominatedBy: "KLU" },
    { name: "Dr.K.Venkata Ramanaiah, Professor, Department of ECE Yogivemana University, YSR Engineering College", role: "Subject expert from outside the parent University", nominatedBy: "YVU" },
    { name: "Dr.P.Lova Kumar, Sub Divisional Engineer, CNTX South BSNL HYDERABAD", role: "Representative from Industry", nominatedBy: "BSNL" },
    { name: "Mr.Mareboina Sankar, Senior Verification Engineer, Analog Devices India Pvt.Ltd", role: "Alumni Member", nominatedBy: "Industry" },
    { name: "Mr.Chejarla Raghunatha Babu, Assoc.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.M. Parameshwara Rao, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.B.Hanish Chaitanya, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Ms.B.Bhavani, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.K.Tirupathaiah, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mrs.K.Thanuja, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { footer: "Chairperson\nBoS- Electronics and Communication Engineering" }
  ],
  CSE: [
    { heading: "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of Computer Science and Engineering\nComposition of Board of Studies\nA.Y.: 2023-24" },
    { name: "Mr.E.Adinarayana Assoc.Professor in CSE Dept. & HOD", role: "Chairperson", nominatedBy: "SMCE" },
    { name: "Dr.ASN .Chakravarthy,Professor of CSE, UCEK,JNTU Kakinada 9618719229", role: "University Nominee", nominatedBy: "JNTUK" },
    { name: "Dr. Ande Prasad,M.Tech., Ph.D.Vikrama Simhapuri University, Nellore9885934309andeprasadvsu@gmail.com", role: "Subject expert from outside the parent University", nominatedBy: "VSU" },
    { name: "Dr.V.Srikanth M.Tech., Ph.D.KLU (Deemed to be University)9966662626 vsrikanth@kluniversity.in", role: "Subject expert from outside the parent University", nominatedBy: "KLU" },
    { name: "Mr.Repala Manoj Kumar B.Tech.,Technical Lead,Cognizant Technology Solutions Pvt. Ltd. 9704170147 manojkumar.repala@cognizant.com", role: "Representative from Industry", nominatedBy: "Industry" },
    { name: "Ms. Kolla Priyanka B.Tech.,System Engineer,Tata Consultancy Services Pvt. Ltd., 8977103203 kolla.priyanka@tcs.com", role: "Alumni Member", nominatedBy: "Industry" },
    { name: "Mr.M.Venkata Ramana, Assoc.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.Y.Venkata Subramanyam, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mrs.K.Anusha, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.K.Vijay Kumar, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.Pantangi L N Manojkumar, Assoc.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Ms.P.Swathi, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.P.Naga Malleswara Rao, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.M.Ajay Babu, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.B.Anjaneyulu, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Ms. R.Bhuvaneswari, Asst.Prof., SMCE", role: "Member", nominatedBy: "SMCE" },
    { footer: "Chairperson\nBoS-Computer Science and Engineering" }
  ],
  CSEAI: [
    { heading: "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of CSE-Artificial Intelligence\nComposition of Board of Studies\nA.Y.: 2023-24" },
    { name: "Dr.SHAIK MOHAMMAD RAFI,Professor of AI Dept. & HOD", role: "Chairperson", nominatedBy: "SMCE" },
    { name: "Dr.D.Haritha,Professor of CSE, UCEK,JNTU Kakinada", role: "University Nominee", nominatedBy: "JNTUK" },
    { name: "Dr S Jyothi,M.Tech., Ph.D.Professor, Dept . Of Computer Science Sri Pamavathi Mahila Visvavidyalayam Tirupati - 517502 . AP , India.e-mail:jyothi.Spmvv@gmail.com,Mobile:944058218", role: "Subject expert from outside the parent University", nominatedBy: "Sri Pamavathi Mahila Visvavidyalayam" },
    { name: "Dr Kuda Nageswarao M.Tech., Ph.D.Professor, Dept. of Computer Science and Systems Engineering Andhra University Email: knrao2038@gmail.com Cell: 9963847111", role: "Subject expert from outside the parent University", nominatedBy: "Andhra University" },
    { name: "Devineni Ramana Reddy/Prasad ReddyTechnical Manager Sarja Technologies , Hyd hello@sarjatechnologies.com 6281137108", role: "Representative from Industry", nominatedBy: "Industry" },
    { name: "Ms. Kolla Priyanka B.Tech.,System Engineer,Tata Consultancy Services Pvt. Ltd., 8977103203 kolla.priyanka@tcs.com", role: "Alumni Member", nominatedBy: "Industry" },
    { name: "Mr.P Srinivaslu Reddy, Asst.Prof.,SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mrs.M Rajyalakshmi, Asst.Prof.,SMCE", role: "Member", nominatedBy: "SMCE" },
    { footer: "Chairperson\nBoS-CSE-Artificial Intelligence" }
  ],
  CSEDS: [
    {
      heading:
        "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of CSE-Data Science\nComposition of Board of Studies\nA.Y.: 2023-24",
    },
    {
      name: "Mr. P.L.N.Manoj kumar,Professor of DS Dept. & HOD Phone:9492617314 Email:manojnanda2000@gmail.com",
      role: "Chairperson",
      nominatedBy: "SMCE",
    },
    {
      name: "Dr.N Rama Krishnaiah,Professor of CSE, UCEK,JNTU Kakinada",
      role: "University Nominee",
      nominatedBy: "JNTUK",
    },
    {
      name: "Dr.Ch. Rupa Professor of CSE,PVPSIT Email: rupamtech@gmail.com Cell: 9848690640",
      role: "Subject expert from outside the parent University",
      nominatedBy: "PVPSIT",
    },
    {
      name: "Dr C Shoba Bindu M.Tech., Ph.D.Professor, Computer Science & Engineering Dept.JNTUA College of Engineering,Anantapur-515002 Phone: +91-8143289089 E-mail: shobabindhu@gmail.com shobabindhu.cse@jntua.ac.in",
      role: "Subject expert from outside the parent University",
      nominatedBy: "JNTUA",
    },
    {
      name: "Devineni Ramana Reddy/Prasad Reddy Technical Manager Sarja Technologies , Hyd hello@sarjatechnologies.com 6281137108",
      role: "Representative from Industry",
      nominatedBy: "Industry",
    },
    {
      name: "Ms. Kolla Priyanka B.Tech.,System Engineer,Tata Consultancy Services Pvt. Ltd., 8977103203 kolla.priyanka@tcs.com",
      role: "Alumni Member",
      nominatedBy: "Industry",
    },
    {
      name: "Mr.Ch. Amaresh, Asst.Prof.,SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.M Narendra, Asst.Prof.,SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mrs.R Padmaja, Asst.Prof.,SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      footer: "Chairperson\nBoS-CSE-Data Science",
    },
  ],
  CHEMISTRY: [
    {
      heading:
        "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of Chemistry\nComposition of Board of Studies\nA.Y.: 2023-24",
    },
    {
      name: "Dr.V.Madhuri,Professor of AS&H Dept. & HOD",
      role: "Chairperson",
      nominatedBy: "SMCE",
    },
    {
      name: "Dr.S.Satya Veni,Professor of Chemistry, UCEK,JNTU Kakinada",
      role: "University Nominee",
      nominatedBy: "JNTUK",
    },
    {
      name: "Dr D. Nagaraju,M.Sc., Ph.D.Professor of chemistry,Vignan university, Guntur.9030784939 naag1977@gmail.com",
      role: "Subject expert from outside the parent University",
      nominatedBy: "Vignan University",
    },
    {
      name: "Dr K. Lakshmi M.Sc., Ph.D.,Assoc. professor of chemistry,Bapatla Engineering college, Bapatla,9949793215 lakshmisrinivas41@gmail.com",
      role: "Subject expert from outside the parent University",
      nominatedBy: "Bapatla Engineering College",
    },
    {
      name: "Dr.P.Lova Kumar Sub Divisional Engineer,CNTX South BSNL HYDERABAD.lovakumarbsnl@gmail.com 9490427439",
      role: "Representative from Industry",
      nominatedBy: "BSNL",
    },
    {
      name: "R.Bhuvaneswari,Asst.Prof., Dept.of CSE,SMCE.bhuvana.rayapudi111@gmail.com 9398788846",
      role: "Alumni Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mrs.G.Mery Janeefa, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.G.Raja Kumar, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.M.Sujan Kumar, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.Sk. Ameer Fareed Basha, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mrs.A.Naga Mani, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      footer: "Chairperson\nBoS-Chemistry",
    },
  ],
  ENGLISH: [
    { heading: "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of English\nComposition of Board of Studies\nA.Y.: 2023-24" },
    { name: "Dr.V.Madhuri, Professor of AS&H Dept. & HOD", role: "Chairperson", nominatedBy: "SMCE" },
    { name: "Dr.T.Ashok,Professor of English, AKNU, Rajahmundry.", role: "University Nominee", nominatedBy: "AKNU" },
    { name: "Dr. N. Veeranjaneyulu Naik, M.A., M.Phil., Ph.D. Associate Professor of English Malla Reddy College of Engineering and Technology Hyderabad, Telangana 8374297273 noonsavathun@gmail.com", role: "Subject expert from outside the parent University", nominatedBy: "MRCET" },
    { name: "Dr. K. Ponnari Lakshmi M.A., M.Phil., Ph.D. Professor of English Narasaraopet Engineering College 9296805205 ponnari.nec@gmail.com", role: "Subject expert from outside the parent University", nominatedBy: "NEC" },
    { name: "Dr.P.Lova Kumar Sub Divisional Engineer, CNTX South BSNL HYDERABAD. lovakumarbsnl@gmail.com 9490427439", role: "Representative from Industry", nominatedBy: "BSNL" },
    { name: "R.Bhuvaneswari, Asst.Prof., Dept.of CSE, SMCE. bhuvana.rayapudi111@gmail.com 9398788846", role: "Alumni Member", nominatedBy: "SMCE" },
    { name: "Mr.M.Jaya Rao, Asst.Prof. SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mrs.G.Mery Janeefa, Asst.Prof. SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.M.Sujan Kumar, Asst.Prof. SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "DR.Y.Saritha, Asst.Prof. SMCE", role: "Member", nominatedBy: "SMCE" },
    { footer: "Chairperson\nBoS- English" }
  ],
  MATHEMATICS: [
    { heading: "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of Mathematics\nComposition of Board of Studies\nA.Y.: 2023-24" },
    { name: "Dr.V.Madhuri,Professor of AS&H Dept. & HOD", role: "Chairperson", nominatedBy: "SMCE" },
    { name: "Dr.K.Sobhan Babu,Professor of Mathematics, UCEN,JNTU Kakinada", role: "University Nominee", nominatedBy: "JNTUK" },
    { name: "Dr B. Satyanarayana,M.Sc., Ph.D.Professor of mathematics,ANU College of sciences,ANU Mobile :9440843956 drbavanari63 @gmail.com", role: "Subject expert from outside the parent University", nominatedBy: "ANU" },
    { name: "Dr. T. V. Pradeep Kumar M.Sc., Ph.D.Asst. Professor of mathematics,ANU College of Engineering, ANU 9290620490 pradeeptvs@gmail.com", role: "Subject expert from outside the parent University", nominatedBy: "ANU" },
    { name: "Dr.P.Lova Kumar Sub Divisional Engineer,CNTX South BSNL HYDERABAD.lovakumarbsnl@gmail.com 9490427439", role: "Representative from Industry", nominatedBy: "BSNL" },
    { name: "R.Bhuvaneswari,Asst.Prof., Dept.of CSE,SMCE.bhuvana.rayapudi111@gmail.com 9398788846", role: "Alumni Member", nominatedBy: "SMCE" },
    { name: "Mrs.J.Radhika, Asst.Prof. SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "DR.Y.Saritha, Asst.Prof. SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Ms.B.Asha Jyothi, Asst.Prof. SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mr.Kakumanu Mastan Rao, Asst.Prof. SMCE", role: "Member", nominatedBy: "SMCE" },
    { name: "Mrs.Atchyutha Naga Mani, Asst.Prof. SMCE", role: "Member", nominatedBy: "SMCE" },
    { footer: "Chairperson\nBoS-Mathematics" }
  ],
  IT: [
    {
      heading:
        "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of Information Technology\nComposition of Board of Studies\nA.Y.: 2023-24",
    },
    {
      name: "Mrs.SD.Reshma,Assoc.Professor in IT Dept. & HOD Cell: 8125544167 EMAIL:syedreshma17@gmail.com",
      role: "Chairperson",
      nominatedBy: "SMCE",
    },
    {
      name: "Dr. A.Krishna Mohan,Professor of CSE, UCEK,JNTU Kakinada",
      role: "University Nominee",
      nominatedBy: "JNTUK",
    },
    {
      name: "Dr C. Nagaraju,M.Tech., Ph.D.Dept.of CSE Dr YSR Engineering college Yogivemana University ,Proddatoor Kadapa District Cell: 9949218570 Email: cnrcse@yahoo.com",
      role: "Subject expert from outside the parent University",
      nominatedBy: "Yogivemana University",
    },
    {
      name: "Dr Shaheda Akthar Assoc Professor Dept of the Computer Science Govt College for women (A) Guntur.9885834601 Shahedaakthar76@gmail.com",
      role: "Subject expert from outside the parent University",
      nominatedBy: "Govt College for Women (A), Guntur",
    },
    {
      name: "Devineni Ramana Reddy/Prasad Reddy Technical Manager Sarja Technologies , Hyd hello@sarjatechnologies.com 6281137108",
      role: "Representative from Industry",
      nominatedBy: "Industry",
    },
    {
      name: "Ms. Kolla Priyanka B.Tech.,System Engineer,Tata Consultancy Services Pvt. Ltd., 8977103203 kolla.priyanka@tcs.com",
      role: "Alumni Member",
      nominatedBy: "Industry",
    },
    {
      name: "Mr.M. Ashok Naga Sai, Asst.Prof.,SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.J Ramesh, Asst.Prof.,SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      footer: "Chairperson\nBoS-Information Technology",
    },
  ],
  "MECHANICAL ENGINEERING": [
    {
      heading:
        "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of Mechanical Engineering\nComposition of Board of Studies\nA.Y.: 2023-24",
    },
    {
      name: "Dr.V.Madhuri,Professor of AS&H Dept. & HOD",
      role: "Chairperson",
      nominatedBy: "SMCE",
    },
    {
      name: "Dr.A.Gopala Krishna,Professor of ME, UCEK, JNTU Kakinada",
      role: "University Nominee",
      nominatedBy: "JNTUK",
    },
    {
      name: "Dr. Ravi Kumar Mandava,M.Tech. ,Ph.D Asst. Professor,Department of Mechanical Engineering IIITDM Kurnool.9885291316 ravikumar1013@iiitk.ac.in",
      role: "Subject expert from outside the parent University",
      nominatedBy: "IIITDM Kurnool",
    },
    {
      name: "Dr. N. Govind M.Tech., Ph.D Assoc. Prof.,Department of Mechanical Engineering R.V.R.& J.C College of Engineering 9849467021 Govind.nandipati@gmail.com",
      role: "Subject expert from outside the parent University",
      nominatedBy: "R.V.R.& J.C College of Engineering",
    },
    {
      name: "Dr.P.Lova Kumar Sub Divisional Engineer, CNTX South BSNL HYDERABAD.lovakumarbsnl@gmail.com 9490427439",
      role: "Representative from Industry",
      nominatedBy: "BSNL",
    },
    {
      name: "R.Bhuvaneswari,Asst.Prof., Dept.of CSE,SMCE.bhuvana.rayapudi111@gmail.com 9398788846",
      role: "Alumni Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.SK.Ameer Fareed Basha, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.Mulpur Sujan Kumar, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mrs.J. Radhika, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Dr.Y.Saritha, Asst.Prof .SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      footer: "Chairperson\nBoS-Mechanical Engg.",
    },
  ],

  PHYSICS: [
    {
      heading:
        "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of Physics\nComposition of Board of Studies\nA.Y.: 2023-24",
    },
    {
      name: "Dr.V.Madhuri,Professor of AS&H Dept. & HOD",
      role: "Chairperson",
      nominatedBy: "SMCE",
    },
    {
      name: "Dr.G.Padmaja Rani,Professor of Physics, UCEK,JNTU Kakinada",
      role: "University Nominee",
      nominatedBy: "JNTUK",
    },
    {
      name: "Dr. Sandhya cole,M.Sc., M. Phil., Ph.D.Professor of Physics ANU College of sciences Acharya Nagarjuna University 9441902295 sandhya.cole@gmail.com",
      role: "Subject expert from outside the parent University",
      nominatedBy: "ANU",
    },
    {
      name: "Dr. T. Madhu Mohan M.Sc., Ph.D.Professor of physics,Vasireddy Venkatadri Institute of Technology 9949678092 tmadhumohan@gmail.com",
      role: "Subject expert from outside the parent University",
      nominatedBy: "VVIT",
    },
    {
      name: "Dr.P.Lova Kumar Sub Divisional Engineer, CNTX South BSNL HYDERABAD.lovakumarbsnl@gmail.com 9490427439",
      role: "Representative from Industry",
      nominatedBy: "BSNL",
    },
    {
      name: "R.Bhuvaneswari,Asst.Prof., Dept.of CSE,SMCE.bhuvana.rayapudi111@gmail.com 9398788846",
      role: "Alumni Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mrs.G.Mery Janeefa, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.G.Raja Kumar, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.Y.Ashok, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.SK.Ameer Fareed Basha, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Dr.Y.Saritha, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      footer: "Chairperson\nBoS- Physics",
    },
  ],

  MBA: [
    {
      heading:
        "SRI MITTAPALLI COLLEGE OF ENGINEERING\nDepartment of Master of Business Administration\nComposition of Board of Studies\nA.Y.: 2023-24",
    },
    {
      name: "Dr.SK.J.Shareef,Professor of MBA Dept. & HOD",
      role: "Chairperson",
      nominatedBy: "SMCE",
    },
    {
      name: "Dr.A.Krishna Mohan,Director,SMS, JNTU Kakinada krishna.ankala@jntucek.ac.in Mobile No.9640027540",
      role: "University Nominee",
      nominatedBy: "JNTUK",
    },
    {
      name: "Dr.N.Udaya Bhaskar,HOD & Chairman,Board of Studies,Adikavi Nannaya University, Rajamahendravaram.Mobile No: 9490450510. Email:nudaybhaskar@gmail.com",
      role: "Subject expert from outside the parent University",
      nominatedBy: "Adikavi Nannaya University",
    },
    {
      name: "Dr.S.Venkata Ramana,Professor of MBA,KL Deemed to be University,Cell : 9494413410 Email: svramana@kluniversity.in",
      role: "Subject expert from outside the parent University",
      nominatedBy: "KL University",
    },
    {
      name: "G.Shashidhar General Manager, Mittapalli Spinners Limited, Narasaraopet,Mobile No: 9581442701.Email: gm@mittapallispinners.com",
      role: "Representative from Industry",
      nominatedBy: "Industry",
    },
    {
      name: "Mr.Yasodarao Bakkamanthula HDFC Bank, Manager (Merchant Relationship Manager) ,Guntur & Prakasam Districts,Mobile No: 7331149635.Email: yasodarao.bakkamanthula@hdfcbank.com",
      role: "Alumni Member",
      nominatedBy: "Industry",
    },
    {
      name: "Mrs.M.Naga Lakshmi, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mrs.M. Saraswathi, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.Yamarapu Mohana Rao, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.G.V.Sai Raghunath, Asst.Prof. SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mr.K.Tirupathaiah, Asst.Prof., SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      name: "Mrs.K.Thanuja, Asst.Prof., SMCE",
      role: "Member",
      nominatedBy: "SMCE",
    },
    {
      footer: "Chairperson\nBoS- MBA",
    },
  ],
};

export default function BoardOfStudies() {
  const [selectedMenu, setSelectedMenu] = useState("ECE");
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen pt-[100px] pb-20 bg-white text-gray-800">
      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative mb-10"
        style={{ backgroundImage: "url('/images/board-of-studies-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl font-extrabold z-10 text-center px-4"
        >
          Board of Studies
        </h1>
      </div>

      
      {/* Enhanced Dropdown Section */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Select a Department to View Board of Studies Members
        </label>
        <div className="relative inline-block w-full sm:w-2/3">
          <select
            className="w-full appearance-none bg-[#fff4f4] border border-[#800000] rounded-lg px-5 py-3 text-lg font-medium text-[#800000] shadow-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50"
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
          >
            {menuItems.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none text-[#800000]">
            ▼
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Use the dropdown above to switch between departments.
        </p>
      </div>
      

      {/* Department Heading */}
      {tablesData[selectedMenu]?.[0]?.heading && (
        <div className="text-center mb-6 whitespace-pre-line font-semibold text-lg text-[#800000]">
          {tablesData[selectedMenu][0].heading}
        </div>
      )}

      {/* Table Display */}
      <div className="overflow-x-auto max-w-6xl mx-auto bg-[#fff8f8] p-6 rounded-xl shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#800000] text-white">
              <th className="px-4 py-2">S.NO</th>
              <th className="px-4 py-2">MEMBER NAME</th>
              <th className="px-4 py-2">CATEGORY</th>
              <th className="px-4 py-2">NOMINATED BY</th>
            </tr>
          </thead>
          <tbody>
            {tablesData[selectedMenu]?.slice(1, tablesData[selectedMenu].length - 1).map((row, index) => (
              <tr key={index} className="hover:bg-[#f9eaea]">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2">{row.role}</td>
                <td className="border px-4 py-2">{row.nominatedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {tablesData[selectedMenu]?.[tablesData[selectedMenu].length - 1]?.footer && (
        <div className="text-center mt-6 whitespace-pre-line font-medium text-[#800000]">
          {tablesData[selectedMenu][tablesData[selectedMenu].length - 1].footer}
        </div>
      )}

      {/* Functions */}
      <div className="max-w-5xl mx-auto mt-12 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-[#800000]">Functions of the Board of Studies :</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Scrutinize and approve the proposals of departments for courses, syllabi,
            instructional methods, and assessment processes.
          </li>
          <li>
            Frame regulations and guidelines in alignment with academic and industry standards.
          </li>
          <li>
            Ensure curriculum relevance by reviewing trends and technological advancements.
          </li>
          <li>
            Recommend industry experts and academicians to strengthen departmental activities.
          </li>
          <li>
            Periodically revise academic programs for quality enhancement.
          </li>
        </ul>
      </div>
    </div>
  );
}