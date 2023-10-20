const consultationsExample = {
  "publicConsultations": [
    {
      "id": 1,
      "title": "Public Consultation 1",
      "introduction": "This is the introduction for Public Consultation 1.",
      "agency": "Ministry of Health",
      "description": "Description of Public Consultation 1. Here you can include detailed information about the consultation topic.",
      "pautas": [
        {
          "id": 1,
          "text": "Pauta 1",
          "votesSim": 10,
          "votesNao": 5,
          "comentarios": [
            { "nome": "User 1", "texto": "This is a longer comment for Pauta 1. It contains more information and provides valuable feedback on the topic." },
            { "nome": "User 2", "texto": "Another longer comment for Pauta 1, giving additional insights and thoughts regarding the subject." },
            { "nome": "User 2", "texto": "Another longer comment for Pauta 1, giving additional insights and thoughts regarding the subject." },
            { "nome": "User 2", "texto": "Another longer comment for Pauta 1, giving additional insights and thoughts regarding the subject." },
            { "nome": "User 2", "texto": "Another longer comment for Pauta 1, giving additional insights and thoughts regarding the subject." },
            { "nome": "User 2", "texto": "Another longer comment for Pauta 1, giving additional insights and thoughts regarding the subject." },
            { "nome": "User 2", "texto": "Another longer comment for Pauta 1, giving additional insights and thoughts regarding the subject." },
            { "nome": "User 2", "texto": "Another longer comment for Pauta 1, giving additional insights and thoughts regarding the subject." },
            { "nome": "User 2", "texto": "Another longer comment for Pauta 1, giving additional insights and thoughts regarding the subject." }
          ]
        },
        {
          "id": 2,
          "text": "Pauta 2",
          "votesSim": 8,
          "votesNao": 3,
          "comentarios": [
            { "nome": "User 3", "texto": "This is a lengthy comment for Pauta 2, providing a thorough perspective on the issue at hand." },
            { "nome": "User 4", "texto": "Another extensive comment for Pauta 2, offering a comprehensive viewpoint on the matter." }
          ]
        },
        {
          "id": 2,
          "text": "Pauta 2",
          "votesSim": 4,
          "votesNao": 4,
          "comentarios": [
            { "nome": "User 3", "texto": "This is a lengthy comment for Pauta 2, providing a thorough perspective on the issue at hand." },
            { "nome": "User 4", "texto": "Another extensive comment for Pauta 2, offering a comprehensive viewpoint on the matter." }
          ]
        },
        {
          "id": 2,
          "text": "Pauta 2",
          "votesSim": 1,
          "votesNao": 0,
          "comentarios": [
            { "nome": "User 3", "texto": "This is a lengthy comment for Pauta 2, providing a thorough perspective on the issue at hand." },
            { "nome": "User 4", "texto": "Another extensive comment for Pauta 2, offering a comprehensive viewpoint on the matter." }
          ]
        },
        {
          "id": 2,
          "text": "Pauta 2",
          "votesSim": 1,
          "votesNao": 8,
          "comentarios": [
            { "nome": "User 3", "texto": "This is a lengthy comment for Pauta 2, providing a thorough perspective on the issue at hand." },
            { "nome": "User 4", "texto": "Another extensive comment for Pauta 2, offering a comprehensive viewpoint on the matter." }
          ]
        }
      ]
    },
    {
      "id": 2,
      "title": "Public Consultation 2",
      "introduction": "Introduction for Public Consultation 2.",
      "agency": "Ministry of Education",
      "description": "Description of Public Consultation 2. Include important details about the consultation.",
      "pautas": [
        {
          "id": 3,
          "text": "Pauta A",
          "votesSim": 15,
          "votesNao": 2,
          "comentarios": [
            { "nome": "User 5", "texto": "A detailed comment for Pauta A, offering valuable insights and feedback." },
            { "nome": "User 6", "texto": "Another comprehensive comment for Pauta A, providing additional thoughts and suggestions." },
            { "nome": "User 6", "texto": "Another comprehensive comment for Pauta A, providing additional thoughts and suggestions." },
            { "nome": "User 6", "texto": "Another comprehensive comment for Pauta A, providing additional thoughts and suggestions." },
            { "nome": "User 6", "texto": "Another comprehensive comment for Pauta A, providing additional thoughts and suggestions." },
            { "nome": "User 6", "texto": "Another comprehensive comment for Pauta A, providing additional thoughts and suggestions." }
          ]
        }
      ]
    },
    {
      "id": 3,
      "title": "Public Consultation 3",
      "introduction": "Introduction for Public Consultation 3.",
      "agency": "Ministry of Environment",
      "description": "Description of Public Consultation 3. Provide more context about the consultation.",
      "pautas": [
        {
          "id": 4,
          "text": "Pauta X",
          "votesSim": 12,
          "votesNao": 7,
          "comentarios": [
            { "nome": "User 7", "texto": "A longer comment for Pauta X, containing detailed thoughts and feedback on the subject." },
            { "nome": "User 8", "texto": "Another extensive comment for Pauta X, offering comprehensive insights and recommendations." },
            { "nome": "User 9", "texto": "This is a lengthy comment for Pauta X, providing a thorough perspective on the issue at hand." }
          ]
        }
      ]
    },
    {
      "id": 4,
      "title": "Public Consultation 3",
      "introduction": "Introduction for Public Consultation 3.",
      "agency": "Ministry of Environment",
      "description": "Description of Public Consultation 3. Provide more context about the consultation.",
      "pautas": [
        {
          "id": 4,
          "text": "Pauta X",
          "votesSim": 12,
          "votesNao": 7,
          "comentarios": [
            { "nome": "User 7", "texto": "A longer comment for Pauta X, containing detailed thoughts and feedback on the subject." },
            { "nome": "User 8", "texto": "Another extensive comment for Pauta X, offering comprehensive insights and recommendations." },
            { "nome": "User 9", "texto": "This is a lengthy comment for Pauta X, providing a thorough perspective on the issue at hand." }
          ]
        }
      ]
    },
    {
      "id": 5,
      "title": "Public Consultation 3",
      "introduction": "Introduction for Public Consultation 3.",
      "agency": "Ministry of Environment",
      "description": "Description of Public Consultation 3. Provide more context about the consultation.",
      "pautas": [
        {
          "id": 4,
          "text": "Pauta X",
          "votesSim": 12,
          "votesNao": 7,
          "comentarios": [
            { "nome": "User 7", "texto": "A longer comment for Pauta X, containing detailed thoughts and feedback on the subject." },
            { "nome": "User 8", "texto": "Another extensive comment for Pauta X, offering comprehensive insights and recommendations." },
            { "nome": "User 9", "texto": "This is a lengthy comment for Pauta X, providing a thorough perspective on the issue at hand." }
          ]
        }
      ]
    },
    {
      "id": 6,
      "title": "Public Consultation 3",
      "introduction": "Introduction for Public Consultation 3.",
      "agency": "Ministry of Environment",
      "description": "Description of Public Consultation 3. Provide more context about the consultation.",
      "pautas": [
        {
          "id": 4,
          "text": "Pauta X",
          "votesSim": 12,
          "votesNao": 7,
          "comentarios": [
            { "nome": "User 7", "texto": "A longer comment for Pauta X, containing detailed thoughts and feedback on the subject." },
            { "nome": "User 8", "texto": "Another extensive comment for Pauta X, offering comprehensive insights and recommendations." },
            { "nome": "User 9", "texto": "This is a lengthy comment for Pauta X, providing a thorough perspective on the issue at hand." }
          ]
        }
      ]
    },
    {
      "id": 7,
      "title": "Public Consultation 3",
      "introduction": "Introduction for Public Consultation 3.",
      "agency": "Ministry of Environment",
      "description": "Description of Public Consultation 3. Provide more context about the consultation.",
      "pautas": [
        {
          "id": 4,
          "text": "Pauta X",
          "votesSim": 12,
          "votesNao": 7,
          "comentarios": [
            { "nome": "User 7", "texto": "A longer comment for Pauta X, containing detailed thoughts and feedback on the subject." },
            { "nome": "User 8", "texto": "Another extensive comment for Pauta X, offering comprehensive insights and recommendations." },
            { "nome": "User 9", "texto": "This is a lengthy comment for Pauta X, providing a thorough perspective on the issue at hand." }
          ]
        }
      ]
    }
  ]
}

export default consultationsExample;
