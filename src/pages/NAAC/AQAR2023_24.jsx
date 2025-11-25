import React, { useState } from "react";
import { FiEye } from "react-icons/fi";

const aqar2023Data = [
  {
    criterion: "Criterion 1 :- Curricular Aspects",
    sections: [
      {
        title: "1.1 Curricular Planning and Implementation",
        points: [
          {
            id: "1.1.1",
            text: "The Institution ensures effective curriculum delivery through a well planned and documented process.",
            pdf: "https://drive.google.com/file/d/1VVFf0IM1gcvhiNV8NQWYu21oVhgVMrEP/view?usp=drive_linkf"
          },
          {
            id: "1.1.2",
            text: "The institution adheres to the academic calendar including for the conduct of Continuous Internal Evaluation.",
            pdf: "https://drive.google.com/file/d/1dvl_hF62OS2jvaTg5w80jv_J3gFIx9JO/view?usp=drive_link"
          },
          {
            id: "1.1.3",
            text: "Teachers of the institution participate in following activities related to curriculum development and assessment of the affiliating university and/are represented on the following academic bodies.",
            pdf: "https://drive.google.com/file/d/11uwKfl6G7BLhu9EwovH9OKDedbmuh8qD/view?usp=drive_linkf"
          }
        ]
      },
      {
        title: "1.2 Academic Flexibility",
        points: [
          {
            id: "1.2.1",
            text: "Number of programs in which Choice-Based Credit System (CBCS) / elective course system has been implemented.",
            pdf: "https://drive.google.com/file/d/1hQt9gA0bHyFu0_gW184R1FZCkn1IgtDI/view?usp=drive_link"
          },
          {
            id: "1.2.2",
            text: "Number of Add-on / Certificate programs offered during the year.",
            pdf: "https://drive.google.com/file/d/1q9DlEpQ2mwCM44UZGmBuB2AGOmKDJUop/view?usp=drive_link"
          },
          {
            id: "1.2.3",
            text: "Number of students enrolled in Certificate / Add-on programs as against the total number of students.",
            pdf: "https://drive.google.com/file/d/1x8hWruAqh4sBcpwFiTb6ni3u9i2lILDr/view?usp=drive_link"
          }
        ]
      },
      {
        title: "1.3 Curriculum Enrichment",
        points: [
          {
            id: "1.3.1",
            text: "Institution integrates cross-cutting issues relevant to professional ethics, gender, human values, environment, and sustainability into the curriculum.",
            pdf: "https://drive.google.com/file/d/1QWuWuiybmx5XAi9CXlbOglycy2V-oj5N/view?usp=drive_link"
          },
          {
            id: "1.3.2",
            text: "Number of courses that include experiential learning through project work / field work / internship.",
            pdf: "https://drive.google.com/file/d/1BIq0aKZ8IenXiKdb0gc_rahYsHFwg_y0/view?usp=drive_link"
          },
          {
            id: "1.3.3",
            text: "Number of students undertaking project work / field work / internships.",
            pdf: "https://drive.google.com/file/d/1-Ks9QHJoGMciPdonV_vzsnIeg3btT6Uf/view?usp=drive_link"
          }
        ]
      },
      {
        title: "1.4 Feedback System",
        points: [
          {
            id: "1.4.1",
            text: "Institution obtains feedback on the syllabus and its transactions at the institution from the following stakeholders: students, teachers, employees, and alumni.",
            pdf: "https://drive.google.com/file/d/1oNjaZ0JsxVOwA9xvH8gHWsJpFvX36pdZ/view?usp=drive_link"
          },
          {
            id: "1.4.2",
            text: "Feedback Process of the Institution.",
            pdf: "https://drive.google.com/file/d/1Scqge5KZXLJPbcXnSppvF1Zo1geTxJqo/view?usp=drive_link"
          }
        ]
      }
    ]
  },
  {
    criterion: "Criterion 2 :- Teaching, Learning, and Evaluation",
    sections: [
      {
        title: "2.1 Student Enrollment and Profile",
        points: [
          {
            id: "2.1.1",
            text: "Enrollment Number: Number of students admitted during the year.",
            pdf: "https://drive.google.com/file/d/19zHyGLJYo_xCayrbJvRXCJs5Vjce9gA_/view?usp=drive_link"
          },
          {
            id: "2.1.2",
            text: "Number of seats filled against seats reserved for various categories (SC, ST, OBC, Divyangjan, etc.) as per applicable reservation policy during the year.",
            pdf: "https://drive.google.com/file/d/1zFaOy1IXLrPyk4R30DLRkn7nxsDbyldX/view?usp=drive_link"
          }
        ]
      },
      {
        title: "2.2 Catering to Student Diversity",
        points: [
          {
            id: "2.2.1",
            text: "The institution assesses the learning level of the students and organises special programs for advanced learners and slow learners.",
            pdf: "https://drive.google.com/file/d/1ZxexEzaRuZp1lSLSvJTqVjAzse0suj5A/view?usp=drive_link"
          }
        ]
      },
      {
        title: "2.3 Teaching Learning Process",
        points: [
          {
            id: "2.3.1",
            text: "Student-centric methods such as experiential learning, participative learning, and problem-solving methodologies are used for enhancing learning experiences.",
            pdf: "https://drive.google.com/file/d/1vTChLtLKcjLfMnBeyfcv16PnNYPma_Df/view?usp=drive_link"
          },
          {
            id: "2.3.2",
            text: "Teachers use ICT-enabled tools for effective teaching learning process.",
            pdf: "https://drive.google.com/file/d/1bKS-cZ41v2GXiWXbjuAlVIIjOJX3CMDV/view?usp=drive_link"
          },
          {
            id: "2.3.3",
            text: "Ratio of mentor to students for academic and other related issues.",
            pdf: "https://drive.google.com/file/d/1WcJSddWze3EPinl8ZpWHxvq-OitpQTLT/view?usp=drive_link"
          }
        ]
      },
      {
        title: "2.4 Teacher Profile and Quality",
        points: [
          {
            id: "2.4.1",
            text: "Number of full-time teachers against sanctioned posts during the year.",
            pdf: "https://drive.google.com/file/d/1iPB9fdUtHYrLRtHaF6Aeci7LTeu5F2M-/view?usp=drive_link"
          },
          {
            id: "2.4.2",
            text: "Number of full-time teachers with Ph.D, D.M, M.Ch, D.N.B Super Speciality, D.Sc, D.Litt during the year.",
            pdf: "https://drive.google.com/file/d/1KwzK_eQWKVznzWoIjMlZPWoNOD4OVMjd/view?usp=drive_link"
          }
        ]
      },
      {
        title: "2.5 Evaluation Process and Reforms",
        points: [
          {
            id: "2.5.1",
            text: "Mechanism of internal assessment is transparent and robust in terms of frequency and mode.",
            pdf: "https://drive.google.com/file/d/13P19OEFvQeITZjYsodgpyiwEj_9Zlkq9/view?usp=drive_link"
          },
          {
            id: "2.5.2",
            text: "Mechanism to deal with internal examination-related grievances is transparent, time-bound, and efficient.",
            pdf: "https://drive.google.com/file/d/129GPEPOApL1Rq5cV6d87daddXszMm_oI/view?usp=drive_link"
          }
        ]
      },
      {
        title: "2.6 Student Performance and Learning Outcome",
        points: [
          {
            id: "2.6.1",
            text: "Program and course outcomes for all programs offered by the institution are stated and displayed on the website and communicated to teachers and students.",
            pdf: "https://drive.google.com/file/d/1mrKmu1TjydFQY0ffT4z75AGqV8dWrOUo/view?usp=drive_link"
          },
          {
            id: "2.6.2",
            text: "Attainment of program outcomes and course outcomes are evaluated by the institution.",
            pdf: "https://drive.google.com/file/d/1nU4QEtjcvwybkdTMzQJGAyBK0yMPyTQv/view?usp=drive_link"
          },
          {
            id: "2.6.3",
            text: "Pass percentage of students during the year.",
            pdf: "https://drive.google.com/file/d/1AhM707CwtzSe3aai53CxNLAq88wIZthw/view?usp=drive_link"
          }
        ]
      },
      {
        title: "2.7 Student Satisfaction Survey",
        points: [
          {
            id: "2.7.1",
            text: "Student Satisfaction Survey (SSS) on overall institutional performance (Institution designs its own questionnaire).",
            pdf: "https://drive.google.com/file/d/1-hIBAgXCq2YNhJMXNBfnnuIxsaTWV6SC/view?usp=drive_link"
          }
        ]
      }
    ]
  },
  {
    criterion: "Criterion 3 :- Research, Innovations and Extension",
    sections: [
      {
        title: "3.1 Resource Mobilization for Research",
        points: [
          {
            id: "3.1.1",
            text: "Grants received from Government and Non-Governmental Agencies for research projects, endowments in the institution during the year (INR in lakhs).",
            pdf: "https://drive.google.com/file/d/1DXwR1gj98P3SGBNHFBqkVdnRwTY6yjhY/view?usp=drive_link"
          },
          {
            id: "3.1.2",
            text: "Number of teachers recognized as research guides (latest completed academic year).",
            pdf: "https://drive.google.com/file/d/1_OU0a1wgwpSg3WqDv2uro9lOxoaqBCst/view?usp=drive_link"
          },
          {
            id: "3.1.3",
            text: "Number of departments having research projects funded by Government and Non-Governmental agencies during the year.",
            pdf: "https://drive.google.com/file/d/1kdtuqwT_-25YYO0m34rWK3GjXB4U_al6/view?usp=drive_link"
          }
        ]
      },
      {
        title: "3.2 Innovation Ecosystem",
        points: [
          {
            id: "3.2.1",
            text: "Institution has created an ecosystem for innovations and has initiatives for creating and transferring knowledge.",
            pdf: "https://drive.google.com/file/d/1Vs8-FW3Mr7t5AetMahYsN3P5Gbz-W74U/view?usp=drive_link"
          },
          {
            id: "3.2.2",
            text: "Number of workshops or seminars conducted on research methodology, Intellectual Property Rights (IPR), and entrepreneurship during the year.",
            pdf: "https://drive.google.com/file/d/1yzsHJpG7By1OjRvQzbX_bYDRhsINRMKz/view?usp=drive_link"
          }
        ]
      },
      {
        title: "3.3 Research Publications and Awards",
        points: [
          {
            id: "3.3.1",
            text: "Number of PhDs registered per eligible teacher during the year.",
            pdf: "https://drive.google.com/file/d/1xvQJ7sAXq1_zKRisWMqvryQCXzwC3Eae/view?usp=drive_link"
          },
          {
            id: "3.3.2",
            text: "Number of research papers per teacher in the journals notified on UGC website during the year.",
            pdf: "https://drive.google.com/file/d/1bqrlNETCC2gTeJA5sQOErryAvRpLXPol/view?usp=drive_link"
          },
          {
            id: "3.3.3",
            text: "Number of books and chapters in edited volumes/books published and papers published in national/international conference proceedings per teacher during the year.",
            pdf: "https://drive.google.com/file/d/11r4OcGbdiLUybip-iBKsyI3t7OLZFsTS/view?usp=drive_link"
          }
        ]
      },
      {
        title: "3.4 Extension Activities",
        points: [
          {
            id: "3.4.1",
            text: "Extension activities are carried out in the neighborhood community, sensitizing students on social issues for their holistic development and impact during the year.",
            pdf: "https://drive.google.com/file/d/17miMUEHiE41XvWXi6klvH_l1JMAsVOTp/view?usp=drive_link"
          },
          {
            id: "3.4.2",
            text: "Number of awards and recognitions received for extension activities from Government or Non-Government recognized bodies during the year.",
            pdf: "https://drive.google.com/file/d/1DMzTQFCt94M-C0-izzCFt1bLQneDuS_s/view?usp=drive_link"
          },
          {
            id: "3.4.3",
            text: "Number of extension and outreach programs conducted by the institution through NSS, NCC, Red Cross, YRC, etc. (including programs such as Swachh Bharat, AIDS Awareness, Gender Issues, etc., and/or those organized in collaboration with industries, communities, and NGOs) during the year.",
            pdf: "https://drive.google.com/file/d/1dRIxe8zmjxNI6DKoEfrAxXFCjo9oy2Yy/view?usp=drive_link"
          }
        ]
      },
      {
        title: "3.5 Collaboration",
        points: [
          {
            id: "3.5.1",
            text: "Number of collaborative activities for research, faculty exchange, student exchange, and internship during the year.",
            pdf: "https://drive.google.com/file/d/1zwfHhIJOfvh_QWYGoiSFugxbDPXeGdrw/view?usp=drive_link"
          },
          {
            id: "3.5.2",
            text: "Number of functional MOUs with institutions, other universities, industries, corporate houses during the year.",
            pdf: "https://drive.google.com/file/d/1we2dKE9Lw8lY7hFauLavoSs7tsGDtsUj/view?usp=drive_link"
          }
        ]
      }
    ]
  },
  {
    criterion: "Criterion 4 :- Infrastructure and Learning Resources",
    sections: [
      {
        title: "4.1 Physical Facilities",
        points: [
          {
            id: "4.1.1",
            text: "Institution has adequate infrastructure and physical facilities for teaching and learning, viz., classrooms, laboratories, computing equipment, etc.",
            pdf: "https://drive.google.com/file/d/1uKMoxsbGYDWIrkE2mFx712mYhywDb9So/view?usp=drive_link"
          },
          {
            id: "4.1.2",
            text: "The institution has adequate facilities for cultural activities, sports, games (indoor and outdoor), gymnasium, yoga centre, etc.",
            pdf: "https://drive.google.com/file/d/1XE0lRI9DcNxFW3frKX8dEMvIK0m71Ynr/view?usp=drive_link"
          },
          {
            id: "4.1.3",
            text: "Number of classrooms and seminar halls with ICT-enabled facilities such as SMART, LMS, etc.",
            pdf: "https://drive.google.com/file/d/1NYHJY3MI9SwwQnORL7R6KDPhLy86SAF9/view?usp=drive_link"
          }
        ]
      },
      {
        title: "4.2 Library as Learning Resource",
        points: [
          {
            id: "4.2.1",
            text: "Library is automated using Integrated Library Management System (ILMS).",
            pdf: "https://drive.google.com/file/d/1D87jhrTzrTSxQ6ELBRczrIRwiqhUU6ej/view?usp=drive_link"
          },
          {
            id: "4.2.2",
            text: "Expenditure for purchase of books, e-books, and subscription to journals, e-journals during the year.",
            pdf: "/pdfs/aqar2023/4.2.2.pdf"
          },
          {
            id: "4.2.3",
            text: "Expenditure for purchase of books/e-books and subscription to journals/e-journals during the year.",
            pdf: "https://drive.google.com/file/d/1YVGgpFDaYHj50D5995wbmBLuk400ZVA4/view?usp=drive_link"
          },
          {
            id: "4.2.4",
            text: "Number per day usage of library by teachers and students.",
            pdf: "https://drive.google.com/file/d/1FhEK1-4ksdh6kw0B8VSEopZPIPHy8RzV/view?usp=drive_link"
          }
        ]
      },
      {
        title: "4.3 IT Infrastructure",
        points: [
          {
            id: "4.3.1",
            text: "Institution frequently updates its IT facilities including Wi-Fi.",
            pdf: "https://drive.google.com/file/d/1EQP24mBIMlAt5uKQS_EE46JWyGOkob5O/view?usp=drive_link"
          },
          {
            id: "4.3.2",
            text: "Number of computers.",
            pdf: "https://drive.google.com/file/d/1ZqtHiGM0gHVFcGYDKgDLuFhiD_aN_RqE/view?usp=drive_link"
          },
          {
            id: "4.3.3",
            text: "Bandwidth of internet connection in the institution.",
            pdf: "https://drive.google.com/file/d/1T3hXoAAQdzIqmCJ5SiKIfP7jROLj1B6R/view?usp=drive_link"
          }
        ]
      },
      {
        title: "4.4 Maintenance of Campus Infrastructure",
        points: [
          {
            id: "4.4.1",
            text: "Expenditure incurred on maintenance of infrastructure, physical and academic support facilities excluding salary component during the year.",
            pdf: "https://drive.google.com/file/d/12ZM3gxiMeaOneELCvR4CPFY09-v7oxA7/view?usp=drive_link"
          },
          {
            id: "4.4.2",
            text: "They are established systems and procedures for maintaining and utilizing physical, academical, and support facilities, laboratory, library, sports complex, computers, classrooms.",
            pdf: "https://drive.google.com/file/d/1NPr5Qc4EKhdHfkd41kWRaRqbH6gwAxq_/view?usp=drive_link"
          }
        ]
      }
    ]
  },
  {
    criterion: "Criterion 5 :- Student Support and Progression",
    sections: [
      {
        title: "5.1 Student Support",
        points: [
          {
            id: "5.1.1",
            text: "Number of students benefited by scholarships and freeships provided by the Government during the year.",
            pdf: "https://drive.google.com/file/d/1Wp_Utm448zRkU6DifCMNLjPoeP-kQNPW/view?usp=drive_link"
          },
          {
            id: "5.1.2",
            text: "Number of students benefited by scholarships, freeships, etc. provided by the institution or Non-Government agencies during the year.",
            pdf: "https://drive.google.com/file/d/1Lw1wlX4mUZMbwDDHWjyBiEgkQAWHygt_/view?usp=drive_link"
          },
          {
            id: "5.1.3",
            text: "Capacity building and skills enhancement initiatives taken by the institution including the following: Soft skills, Language and communication skills, Life skills, Yoga, Physical fitness, Health and hygiene, ICT, etc.",
            pdf: "https://drive.google.com/file/d/1Sg1-4ylpgrWcmIp4eSgtXH4ZoVT6Y7xb/view?usp=drive_link"
          },
          {
            id: "5.1.4",
            text: "Number of students benefited by guidance for competitive examinations and career counseling offered by the institution during the year.",
            pdf: "https://drive.google.com/file/d/1PYIS0vtzrFeofY3kUHSAuMGW_Dw2lAW0/view?usp=drive_link"
          },
          {
            id: "5.1.5",
            text: "The institution has a transparent mechanism for timely redressal of students' grievances including sexual harassment and ragging cases.",
            pdf: "https://drive.google.com/file/d/1KGzUBHJAlFu4sjiRN1DFKjECb8tkiPUn/view?usp=drive_link"
          }
        ]
      },
      {
        title: "5.2 Student Progression",
        points: [
          {
            id: "5.2.1",
            text: "Number of placements of outgoing students during the year.",
            pdf: "https://drive.google.com/file/d/10hCNcOVr3YoumMpEkBmSbYoheohn8V-y/view?usp=drive_link"
          },
          {
            id: "5.2.2",
            text: "Number of students progressing to higher education during the year.",
            pdf: "https://drive.google.com/file/d/15zH9yws_Q0imXgLc7ccQ0OoIxRgR3MjO/view?usp=drive_link"
          },
          {
            id: "5.2.3",
            text: "Number of students qualifying in state, national, or international level examinations during the year.",
            pdf: "https://drive.google.com/file/d/1P0DKYllP_B60gyeDGqsAAKhIcU3XSdPj/view?usp=drive_link"
          }
        ]
      },
      {
        title: "5.3 Student Participation and Activities",
        points: [
          {
            id: "5.3.1",
            text: "Number of awards/medals for outstanding performance in sports or cultural activities at University/state/national/international level (award for a team event should be counted once) during the year.",
            pdf: "https://drive.google.com/file/d/1AonR8VGy9PRDrpNzaYzyuorjnbJqt9wd/view?usp=drive_link"
          },
          {
            id: "5.3.2",
            text: "Institution facilitates students' representation and engagement in various administrative, co-curricular and extra-curricular activities including student council/representation on various bodies as per established processes and norms.",
            pdf: "https://drive.google.com/file/d/1H_00e4A2qH0p4l6JK-LwTMfVN2XVE7rC/view?usp=drive_link"
          },
          {
            id: "5.3.3",
            text: "Number of sports and cultural events/competitions in which students of the institution participated during the year (organised by the institution or other institutions).",
            pdf: "https://drive.google.com/file/d/1GCfR3ZU1-FmENOcPMC2wcgbsXC-c1okg/view?usp=drive_link"
          }
        ]
      }
    ]
  },
  {
    criterion: "Criterion 6 :- Governance, Leadership, and Management",
    sections: [
      {
        title: "6.1 Institutional Vision and Leadership",
        points: [
          { id: "6.1.1", text: "The governance of the institution is reflective of and in tune with the vision and mission of the institution.", pdf: "https://drive.google.com/file/d/1WPsFG8wCfmqQVBD8CZWRfCK2JhX4kN9_/view?usp=drive_link" },
          { id: "6.1.2", text: "The effective leadership is visible in various institutional practices such as decentralization and participative management.", pdf: "https://drive.google.com/file/d/11t_D4VPTZyTvxGqhggXoQsrS4suR_iya/view?usp=drive_link" }
        ]
      },
      {
        title: "6.2 Strategy, Development, and Deployment",
        points: [
          { id: "6.2.1", text: "The institution's strategic/perceptive plan is effectively deployed.", pdf: "https://drive.google.com/file/d/1pqE9-Dkl-n1lIGJ0ccN4oXQJi49-MC6U/view?usp=drive_link" },
          { id: "6.2.2", text: "The functioning of the institutional bodies is effective and efficient as visible from policies, administrative setup, appointment and service rules, procedures, etc.", pdf: "https://drive.google.com/file/d/16u8IVfNU0KojVnlCcgB1npoKuO-sp5En/view?usp=drive_link" },
          { id: "6.2.3", text: "Implementation of e-governance in areas of operations, administration, finance, and accounts, student's admission and support examination.", pdf: "https://drive.google.com/file/d/1T_vU5KUPW9tqtM3DQtOd5th6ieM1A4Wv/view?usp=drive_link" }
        ]
      },
      {
        title: "6.3 Faculty Empowerment Strategies",
        points: [
          { id: "6.3.1", text: "The institution has effective welfare measures for teaching and non-teaching staff.", pdf: "https://drive.google.com/file/d/1w2kU78xWv7WaQisrNrC-YyWrjuATYn8z/view?usp=drive_link" },
          { id: "6.3.2", text: "Number of teachers provided with financial support to attend conferences/workshop and towards membership fee of professional bodies during the year.", pdf: "https://drive.google.com/file/d/1rE_SYEJy1L76zleQJjlbVYmOzCv-QYWI/view?usp=drive_link" },
          { id: "6.3.3", text: "Number of professional development/administrative training programs organized by the institution for teaching and non-teaching staff during the year.", pdf: "https://drive.google.com/file/d/1WwGQorYHTxwfmI2S0QHlSJdjRjd90luM/view?usp=drive_link" },
          { id: "6.3.4", text: "Number of teachers undergoing online/face-to-face faculty development programs (FDP) during the year.", pdf: "https://drive.google.com/file/d/17R8yNuc45L2hCc2050a9eS1-8JDtYqI0/view?usp=drive_link" },
          { id: "6.3.5", text: "Institution's performance appraisal system for teaching and non-teaching staff.", pdf: "https://drive.google.com/file/d/1qmJRhqg6AdZJhy2i6nKRIOZIFs04QBBr/view?usp=drive_link" }
        ]
      },
      {
        title: "6.4 Financial Management and Resource Mobilization",
        points: [
          { id: "6.4.1", text: "Institution conducts internal and external financial audits regularly.", pdf: "https://drive.google.com/file/d/1_Ch6n3hHeGhj94c4EzUIz57aOhHbQnnx/view?usp=drive_link" },
          { id: "6.4.2", text: "Funds/grants received from the non-government bodies and individual philanthropers during the year.", pdf: "https://drive.google.com/file/d/1chnz2im5MHw1XuQ4iKz7eedY2Arn6PxL/view?usp=drive_link" },
          { id: "6.4.3", text: "Institutional strategies for mobilization of funds and the optimal utilization of resources.", pdf: "https://drive.google.com/file/d/1aFL8HB_a1UKsLRwQ7QSJLAhUs718M-eR/view?usp=drive_link" }
        ]
      },
      {
        title: "6.5 Internal Quality Assurance System",
        points: [
          {
            id: "6.5.1",
            text: "Internal Quality Assurance Cell (IQAC) has contributed significantly for institutionalizing the quality assurance strategies and processes.",
            pdf: "https://drive.google.com/file/d/1PW8lQaiZogOMhZ4iIRna30fm_H3SMxzy/view?usp=drive_link"
          },
          {
            id: "6.5.2",
            text: "The institution reviews its teaching, learning processes, structures, and methodologies of operations and learning outcomes at periodic intervals through IQAC setup as per norms and recorded the incremental improvements in various activities.",
            pdf: "https://drive.google.com/file/d/1cpchT6gEiwr0lmKyC7qjmgoLAF1MWe_D/view?usp=drive_link"
          },
          {
            id: "6.5.3",
            text: "Quality Assurance Initiatives of the institution include regular meeting of Internal Quality Assurance Cell (IQAC), feedback collected, analyzed, and used for improvements, collaborative quality initiatives with other institutions, participation in NIRF, and other quality audit recognized by state, national, or international agency, ISO certification, and NBA.",
            pdf: "https://drive.google.com/file/d/1M5o6Gued7aoAawSAdkUcbXTHnvGWjVC_/view?usp=drive_link"
          }
        ]
      }
    ]
  },
  {
    criterion: "Criterion 7 :- Institutional Values and Best Practices",
    sections: [
      {
        title: "7.1 Institutional Values and Social Responsibilities",
        points: [
          { id: "7.1.1", text: "Measures initiated by the institution for the promotion of gender equity during the year", pdf: "https://drive.google.com/file/d/1OyhGmcO6ZVN7dQp3jNNrj_XeRJGA4lw_/view?usp=drive_link" },
          { id: "7.1.2", text: "The institution has facilities for alternate sources of energy and energy conversion measures", pdf: "https://drive.google.com/file/d/1qoaVynggsz_2Ff5iTvC57mBbdsxKGUSI/view?usp=drive_link" },
          { id: "7.1.3", text: "Describe the facilities in the institution for the management of the following types of degradable and non-degradable waste", pdf: "https://drive.google.com/file/d/13Qf3BusCNdOjLIvPHrnELlFQlBMPLhst/view?usp=drive_link" },
          { id: "7.1.4", text: "Water conversion facilities available in the institution", pdf: "https://drive.google.com/file/d/1eAsFQZ-6Ox5t4PZrs2W_RLVR9wtPCcrI/view?usp=drive_link" },
          { id: "7.1.5", text: "Green campus initiatives included", pdf: "https://drive.google.com/file/d/189gZmnD2CKOfkfEdsYVOB-2-M8UGfftZ/view?usp=drive_link" },
          { id: "7.1.6", text: "Include quality audits or environment and energy are regularly undertaken by the institution", pdf: "https://drive.google.com/file/d/1tS2TWXLovsCf9N7zOb61P2m8VOXwrRQe/view?usp=drive_link" },
          { id: "7.1.7", text: "The institution has a divyanjan friendly barrier-free environment", pdf: "https://drive.google.com/file/d/1FVC0dFymJnlehXhLsJAbauxB_3yExeRP/view?usp=drive_link" },
          { id: "7.1.8", text: "Describe the institutional efforts/initiatives in providing an inclusive environment that is tolerance and harmony towards cultural, regional, linguistic, communal, socio-economic, and other diversities", pdf: "https://drive.google.com/file/d/1pRBxhgkFgY7VGGYOLwnLw7nIRmFd56AJ/view?usp=drive_link" },
          { id: "7.1.9", text: "Sensitization of students and employees of the institution to the constitutional obligations, values, rights, duties, and responsibilities of citizens", pdf: "https://drive.google.com/file/d/1RXsuAMM34BY0E_-99gKhKh5Drod1dtBO/view?usp=drive_link" },
          { id: "7.1.10", text: "The institution has prescribed codes of conduct for students, teachers, administrators, and conducts periodic programs in this regard", pdf: "https://drive.google.com/file/d/1_8hF7Ra1RoUFG_J_TILpzU4y8wtswP8F/view?usp=drive_link" },
          { id: "7.1.11", text: "The institution celebrates or organizes national and international commemorative days, events, and festivals", pdf: "https://drive.google.com/file/d/1I-jtrLeh1NDmRmU1gUTkmwvNolT2oQgf/view?usp=drive_link" }
        ]
      },
      {
        title: "7.2 Best Practices",
        points: [
          { id: "7.2.1", text: "Describe two best practices successfully implemented by the institution as per NAAC provided in the manual", pdf: "https://drive.google.com/file/d/1kzbVAPzPpgywRfCpRd1VQoy1OwiPFuTQ/view?usp=drive_link" }
        ]
      },
      {
        title: "7.3 Institutional Distinctiveness",
        points: [
          { id: "7.3.1", text: "Portray the performance of the institution in one area distinctive to its priority", pdf: "https://drive.google.com/file/d/1aL90nS_USwReLO5pxF1dt9EY16acG2mF/view?usp=drive_link" }
        ]
      }
    ]
  }
];

function AQAR2023_24() {
  const [openCriteria, setOpenCriteria] = useState({});
  const [openSections, setOpenSections] = useState({});
  const [openPoints, setOpenPoints] = useState({});

  const toggleCriterion = (index) => {
    setOpenCriteria((prev) => {
      const newState = {};
      newState[index] = !prev[index];
      return newState;
    });
    setOpenSections({});
    setOpenPoints({});
  };

  const toggleSection = (criterionIndex, sectionIndex) => {
    const key = `${criterionIndex}-${sectionIndex}`;
    setOpenSections((prev) => {
      const newState = {};
      Object.keys(prev).forEach(k => {
        if (!k.startsWith(`${criterionIndex}-`)) {
          newState[k] = prev[k];
        }
      });
      newState[key] = !prev[key];
      return newState;
    });
    setOpenPoints({});
  };

  const togglePoint = (criterionIndex, sectionIndex, pointId) => {
    const key = `${criterionIndex}-${sectionIndex}-${pointId}`;
    setOpenPoints((prev) => {
      const newState = {};
      Object.keys(prev).forEach(k => {
        if (!k.startsWith(`${criterionIndex}-${sectionIndex}-`)) {
          newState[k] = prev[k];
        }
      });
      newState[key] = !prev[key];
      return newState;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#800000] mb-10">
        AQAR 2023–2024
      </h1>

      {aqar2023Data.map((criterion, cIndex) => (
        <div
          key={cIndex}
          className="mb-6 rounded-lg shadow-md overflow-hidden bg-white"
        >
          {/* Criterion Header */}
          <button
            onClick={() => toggleCriterion(cIndex)}
            className="w-full flex justify-between items-center bg-[#f8f8f8] border-b border-gray-300 px-5 py-4 font-semibold text-gray-900 text-lg rounded-t-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
            aria-expanded={!!openCriteria[cIndex]}
            aria-controls={`criterion-content-${cIndex}`}
          >
            <span>{criterion.criterion}</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${
                openCriteria[cIndex] ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {/* Sections - accordion content */}
          <div
            id={`criterion-content-${cIndex}`}
            className={`px-6 overflow-hidden transition-all duration-300 ${
              openCriteria[cIndex] ? "max-h-screen py-6" : "max-h-0 py-0"
            }`}
          >
            {criterion.sections.map((section, sIndex) => {
              const sectionKey = `${cIndex}-${sIndex}`;
              const isSectionOpen = openSections[sectionKey];
              return (
                <div key={sIndex} className="mb-6 last:mb-0">
                  <button
                    onClick={() => toggleSection(cIndex, sIndex)}
                    className="w-full flex justify-between items-center bg-gray-100 rounded-md px-4 py-3 font-semibold text-[#800000] hover:bg-gray-200 transition-colors duration-300 focus:outline-none"
                    aria-expanded={isSectionOpen}
                    aria-controls={`section-content-${sectionKey}`}
                  >
                    <span>{section.title}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        isSectionOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  <div
                    id={`section-content-${sectionKey}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isSectionOpen ? "max-h-screen py-4" : "max-h-0 py-0"
                    }`}
                  >
                    <ul className="space-y-3">
                      {section.points.map((point) => {
                        const pointKey = `${cIndex}-${sIndex}-${point.id}`;
                        const isPointOpen = openPoints[pointKey];
                        return (
                          <li key={point.id}>
                            <div
                              onClick={() => togglePoint(cIndex, sIndex, point.id)}
                              className="flex justify-between items-center bg-gray-50 rounded-md px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-300 select-none"
                              aria-expanded={isPointOpen}
                              aria-controls={`point-content-${pointKey}`}
                            >
                              <span className="text-gray-700 font-medium">
                                {point.id} {point.text}
                              </span>
                              
                              <a
                                href={point.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-shrink-0 flex items-center justify-center w-6 h-6"
                              >
                                <FiEye size={20} className="text-[#800000] hover:text-[#660000]" />
                              </a>

                            </div>
                            
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AQAR2023_24;