// ─────────────────────────────────────────────────────────────────
// Données statiques des langues Koraa — pour les pages de profil
// ─────────────────────────────────────────────────────────────────

export interface PhraseSample {
  phrase: string
  phonetic: string
  translation_fr: string
  translation_en: string
}

export interface SoundSample {
  letter: string
  phonetic: string
  hint_fr: string
  hint_en: string
}

export interface LessonPreview {
  icon: string
  title_fr: string
  title_en: string
  isFree: boolean
}

export interface LanguageProfile {
  id: string
  name: string
  region_fr: string
  region_en: string
  country: string
  flag: string
  speakers: string
  family_fr: string
  family_en: string
  description_fr: string
  description_en: string
  curiosity_fr: string
  curiosity_en: string
  color: string           // couleur principale (tailwind compatible)
  colorHex: string        // couleur hex pour les dégradés
  phrases: PhraseSample[]
  sounds: SoundSample[]
  lessonPreviews: LessonPreview[]
  relatedLangs: string[]  // IDs des langues liées
}

export const LANGUAGE_PROFILES: Record<string, LanguageProfile> = {
  ghomala: {
    id: "ghomala",
    name: "Ghomala'",
    region_fr: "Hauts-Plateaux de l'Ouest",
    region_en: "Western Highlands",
    country: "Cameroun",
    flag: "🇨🇲",
    speakers: "1M+",
    family_fr: "Bantou du Grassland",
    family_en: "Grassland Bantu",
    description_fr:
      "Le Ghomala' est la langue des Bamiléké de l'Ouest Cameroun, parlée dans les hauts-plateaux verdoyants. C'est une langue tonale riche, support d'une culture orale exceptionnelle transmise par les ancêtres et les chefferies traditionnelles.",
    description_en:
      "Ghomala' is the language of the Bamileke people of Western Cameroon, spoken across the verdant highlands. It is a rich tonal language, the medium of an exceptional oral tradition passed down through ancestors and traditional chiefdoms.",
    curiosity_fr:
      "Le Ghomala' possède des tons distinctifs qui changent complètement le sens d'un mot — un même son peut signifier 'bonjour' ou 'chemin' selon la mélodie.",
    curiosity_en:
      "Ghomala' has distinctive tones that completely change the meaning of a word — the same sound can mean 'hello' or 'path' depending on the melody.",
    color: "primary",
    colorHex: "#7C3AED",
    phrases: [
      { phrase: "O Sango", phonetic: "[Oh San-goh]", translation_fr: "Bonjour / Bienvenue", translation_en: "Hello / Welcome" },
      { phrase: "O lé?", phonetic: "[Oh leh]", translation_fr: "Comment vas-tu ?", translation_en: "How are you?" },
      { phrase: "Mankaa", phonetic: "[Mahn-kah]", translation_fr: "Maman", translation_en: "Mother" },
      { phrase: "A mbo shwe", phonetic: "[Ah mboh shweh]", translation_fr: "Tu es dans mon cœur", translation_en: "You are in my heart" },
      { phrase: "Tsé", phonetic: "[Tseh]", translation_fr: "Papa", translation_en: "Father" },
      { phrase: "Mfon", phonetic: "[M-fohn]", translation_fr: "Chef / Roi", translation_en: "Chief / King" },
    ],
    sounds: [
      { letter: "mb", phonetic: "[mb]", hint_fr: "Comme dans 'ambre', nasale+occlusive", hint_en: "Like 'mb' in 'amber', nasal+stop" },
      { letter: "ng", phonetic: "[ŋ]", hint_fr: "Comme dans 'song', vibration du fond de la gorge", hint_en: "Like 'ng' in 'song', back of throat" },
      { letter: "sh", phonetic: "[ʃ]", hint_fr: "Comme dans 'cheval', sifflant doux", hint_en: "Like 'sh' in 'shoe'" },
    ],
    lessonPreviews: [
      { icon: "👋", title_fr: "Les Salutations", title_en: "Greetings", isFree: true },
      { icon: "👨‍👩‍👧", title_fr: "La Famille", title_en: "Family", isFree: true },
      { icon: "🏡", title_fr: "La Maison & Village", title_en: "Home & Village", isFree: false },
      { icon: "🛒", title_fr: "Au Marché", title_en: "At the Market", isFree: false },
    ],
    relatedLangs: ["bassa", "ewondo", "duala"],
  },

  swahili: {
    id: "swahili",
    name: "Swahili",
    region_fr: "Afrique de l'Est & Centrale",
    region_en: "East & Central Africa",
    country: "Kenya, Tanzanie, RDC",
    flag: "🌍",
    speakers: "200M+",
    family_fr: "Bantou (Niger-Congo)",
    family_en: "Bantu (Niger-Congo)",
    description_fr:
      "Le Swahili (Kiswahili) est la langue africaine la plus parlée sur le continent, langue officielle de la Tanzanie, du Kenya et de l'Union Africaine. Fruit d'échanges commerciaux entre les côtes est-africaines et les marchands arabes, sa musicalité est unique.",
    description_en:
      "Swahili (Kiswahili) is the most widely spoken African language on the continent, an official language of Tanzania, Kenya, and the African Union. Born from trade between the East African coast and Arab merchants, its musicality is unique.",
    curiosity_fr:
      "Le mot 'Safari' vient du Swahili et signifie simplement 'voyage'. La langue a enrichi de nombreux mots en anglais et en français.",
    curiosity_en:
      "'Safari' comes from Swahili and simply means 'journey'. The language has enriched many words in English and French.",
    color: "secondary",
    colorHex: "#059669",
    phrases: [
      { phrase: "Jambo / Habari", phonetic: "[Jahm-boh]", translation_fr: "Salut / Comment ça va ?", translation_en: "Hello / How are you?" },
      { phrase: "Karibu sana", phonetic: "[Kah-ree-boo sah-nah]", translation_fr: "Soyez le bienvenu", translation_en: "You are very welcome" },
      { phrase: "Asante", phonetic: "[Ah-sahn-teh]", translation_fr: "Merci", translation_en: "Thank you" },
      { phrase: "Nakupenda", phonetic: "[Nah-koo-pen-dah]", translation_fr: "Je t'aime", translation_en: "I love you" },
      { phrase: "Familia", phonetic: "[Fah-mee-lee-ah]", translation_fr: "Famille", translation_en: "Family" },
      { phrase: "Ndugu", phonetic: "[N-doo-goo]", translation_fr: "Frère / Sœur", translation_en: "Sibling / Brother" },
    ],
    sounds: [
      { letter: "ch", phonetic: "[tʃ]", hint_fr: "Comme dans 'tchop', africain sonore", hint_en: "Like 'ch' in 'church'" },
      { letter: "ng'", phonetic: "[ŋ]", hint_fr: "Nasale vélaire seule, sans 'g' prononcé", hint_en: "Nasal velar alone, without 'g' sound" },
      { letter: "dh", phonetic: "[ð]", hint_fr: "Comme dans 'the' anglais, interdentale douce", hint_en: "Like 'th' in 'the'" },
    ],
    lessonPreviews: [
      { icon: "👋", title_fr: "Les Salutations", title_en: "Greetings", isFree: true },
      { icon: "🌿", title_fr: "Nature & Environnement", title_en: "Nature & Environment", isFree: true },
      { icon: "🏙️", title_fr: "En Ville", title_en: "In the City", isFree: false },
      { icon: "🍽️", title_fr: "Cuisine Africaine", title_en: "African Cuisine", isFree: false },
    ],
    relatedLangs: ["lingala", "bassa", "fulfulde"],
  },

  duala: {
    id: "duala",
    name: "Duala",
    region_fr: "Région du Littoral",
    region_en: "Littoral Region",
    country: "Cameroun",
    flag: "🇨🇲",
    speakers: "500K+",
    family_fr: "Bantou côtier",
    family_en: "Coastal Bantu",
    description_fr:
      "Le Duala est la langue du peuple Duala, historiquement maîtres des côtes et commerçants marins du Littoral camerounais. Langue de la ville de Douala, elle porte en elle les récits des premiers contacts avec l'Europe et l'histoire de la résistance.",
    description_en:
      "Duala is the language of the Duala people, historically masters of the coast and maritime traders of the Cameroonian Littoral. Language of the city of Douala, it carries within it the stories of first contacts with Europe and the history of resistance.",
    curiosity_fr:
      "La ville de Douala tire directement son nom du peuple Duala — les premiers gardiens de l'embouchure du fleuve Wouri.",
    curiosity_en:
      "The city of Douala takes its name directly from the Duala people — the first guardians of the mouth of the Wouri river.",
    color: "primary",
    colorHex: "#0EA5E9",
    phrases: [
      { phrase: "Mussango", phonetic: "[Moo-san-goh]", translation_fr: "Paix sur toi / Bonjour", translation_en: "Peace be with you" },
      { phrase: "Na Tondi Oa", phonetic: "[Nah Ton-dee Oh-ah]", translation_fr: "Je t'aime tendrement", translation_en: "I love you dearly" },
      { phrase: "Na we ma?", phonetic: "[Nah weh mah]", translation_fr: "Où vas-tu ?", translation_en: "Where are you going?" },
      { phrase: "Ewala", phonetic: "[Eh-wah-lah]", translation_fr: "Merci", translation_en: "Thank you" },
      { phrase: "Mboka", phonetic: "[M-boh-kah]", translation_fr: "Village / Pays natal", translation_en: "Village / Homeland" },
      { phrase: "Bato", phonetic: "[Bah-toh]", translation_fr: "Les gens / Personnes", translation_en: "People / Persons" },
    ],
    sounds: [
      { letter: "mb", phonetic: "[mb]", hint_fr: "Pré-nasalisation, très fréquente en Bantou", hint_en: "Pre-nasalization, very common in Bantu" },
      { letter: "nd", phonetic: "[nd]", hint_fr: "Nasale dentale, comme 'ndoki'", hint_en: "Dental nasal, like 'ndoki'" },
      { letter: "w", phonetic: "[w]", hint_fr: "Semi-voyelle labio-vélaire, douce", hint_en: "Labio-velar semi-vowel, soft" },
    ],
    lessonPreviews: [
      { icon: "👋", title_fr: "Les Salutations", title_en: "Greetings", isFree: true },
      { icon: "⛵", title_fr: "Mer & Navigation", title_en: "Sea & Navigation", isFree: true },
      { icon: "🤝", title_fr: "Commerce & Échanges", title_en: "Trade & Exchange", isFree: false },
      { icon: "👑", title_fr: "Histoire & Chefferie", title_en: "History & Chieftaincy", isFree: false },
    ],
    relatedLangs: ["bassa", "ghomala", "ewondo"],
  },

  bassa: {
    id: "bassa",
    name: "Bassa",
    region_fr: "Centre & Littoral",
    region_en: "Centre & Littoral",
    country: "Cameroun",
    flag: "🇨🇲",
    speakers: "800K+",
    family_fr: "Bantou (groupe Beti-Fang)",
    family_en: "Bantu (Beti-Fang group)",
    description_fr:
      "Le Bassa est parlé par le peuple Bassa au Centre et au Littoral camerounais. Langue connue pour sa douceur phonétique, elle possède une tradition orale riche et un système d'écriture ancien — le 'Bassa Vah' — l'un des rares systèmes alphabétiques inventés en Afrique sub-saharienne.",
    description_en:
      "Bassa is spoken by the Bassa people of central and coastal Cameroon. Known for its phonetic smoothness, it has a rich oral tradition and an ancient writing system — 'Bassa Vah' — one of the few alphabetic systems invented in sub-Saharan Africa.",
    curiosity_fr:
      "Le Bassa Vah est l'un des rares alphabets créés spontanément en Afrique noire. Il a été réinventé au XXe siècle par Thomas Fama pour préserver la langue.",
    curiosity_en:
      "Bassa Vah is one of the few alphabets spontaneously created in Black Africa. It was reinvented in the 20th century by Thomas Fama to preserve the language.",
    color: "secondary",
    colorHex: "#F59E0B",
    phrases: [
      { phrase: "Mèbôk mù mut", phonetic: "[Meh-bohk moo moot]", translation_fr: "Salutations à la famille", translation_en: "Greetings to the family" },
      { phrase: "Nje i yé?", phonetic: "[N-jeh ee yeh]", translation_fr: "Combien cela coûte-t-il ?", translation_en: "How much is this?" },
      { phrase: "I lè?", phonetic: "[Ee leh]", translation_fr: "Comment ça va ?", translation_en: "How are you?" },
      { phrase: "Tôlô", phonetic: "[Toh-loh]", translation_fr: "Eau", translation_en: "Water" },
      { phrase: "Mbom", phonetic: "[M-bohm]", translation_fr: "Maison", translation_en: "House" },
      { phrase: "Yandi", phonetic: "[Yahn-dee]", translation_fr: "Lui / Elle", translation_en: "He / She" },
    ],
    sounds: [
      { letter: "ô", phonetic: "[oː]", hint_fr: "Voyelle longue arrondie, comme 'eau' allongé", hint_en: "Long rounded vowel, like extended 'aw'" },
      { letter: "è", phonetic: "[ɛ]", hint_fr: "Comme dans 'fête', ouverte et claire", hint_en: "Like 'e' in 'bed', open and clear" },
      { letter: "nj", phonetic: "[ndʒ]", hint_fr: "Affriquée pré-nasalisée, sonore et forte", hint_en: "Pre-nasalized affricate, voiced and strong" },
    ],
    lessonPreviews: [
      { icon: "👋", title_fr: "Les Salutations", title_en: "Greetings", isFree: true },
      { icon: "🌳", title_fr: "Nature & Forêt", title_en: "Nature & Forest", isFree: true },
      { icon: "🏺", title_fr: "Culture & Traditions", title_en: "Culture & Traditions", isFree: false },
      { icon: "📖", title_fr: "L'Alphabet Bassa Vah", title_en: "The Bassa Vah Alphabet", isFree: false },
    ],
    relatedLangs: ["ewondo", "duala", "ghomala"],
  },

  ewondo: {
    id: "ewondo",
    name: "Ewondo",
    region_fr: "Centre & Sud",
    region_en: "Centre & South",
    country: "Cameroun",
    flag: "🇨🇲",
    speakers: "1.2M+",
    family_fr: "Bantou (groupe Beti)",
    family_en: "Bantu (Beti group)",
    description_fr:
      "L'Ewondo est la langue de la région Centre du Cameroun et de sa capitale Yaoundé. Langue de la communauté Beti, elle est étroitement liée au Bulu et au Fang. Elle a servi de lingua franca dans le centre du pays pendant la période coloniale.",
    description_en:
      "Ewondo is the language of the Centre region of Cameroon and its capital Yaoundé. Language of the Beti community, it is closely related to Bulu and Fang. It served as a lingua franca in the center of the country during the colonial period.",
    curiosity_fr:
      "Yaoundé, la capitale du Cameroun, est installée en territoire Ewondo. La langue est encore largement parlée dans les rues et marchés de la ville.",
    curiosity_en:
      "Yaoundé, Cameroon's capital, is built on Ewondo territory. The language is still widely spoken in the city's streets and markets.",
    color: "primary",
    colorHex: "#DC2626",
    phrases: [
      { phrase: "Mbembe Kiris", phonetic: "[M-bem-beh Kee-rees]", translation_fr: "Bon matin", translation_en: "Good morning" },
      { phrase: "Ke wa ke?", phonetic: "[Keh wah keh]", translation_fr: "Bon voyage à toi", translation_en: "Safe travels" },
      { phrase: "Kusu ne?", phonetic: "[Koo-soo neh]", translation_fr: "Donne-moi le bon prix", translation_en: "Give me a good price" },
      { phrase: "Meyong", phonetic: "[Meh-yohng]", translation_fr: "Enfant", translation_en: "Child" },
      { phrase: "Nnam", phonetic: "[N-nahm]", translation_fr: "Mari", translation_en: "Husband" },
      { phrase: "Ngon", phonetic: "[Ngohn]", translation_fr: "Femme", translation_en: "Wife" },
    ],
    sounds: [
      { letter: "ky", phonetic: "[kj]", hint_fr: "Palatale vélaire, consonne double douce", hint_en: "Palatal velar, smooth double consonant" },
      { letter: "mb", phonetic: "[mb]", hint_fr: "Comme toujours en Bantou, pré-nasalisation", hint_en: "As always in Bantu, pre-nasalization" },
      { letter: "e", phonetic: "[e]", hint_fr: "E fermé sans accent, net et précis", hint_en: "Closed e without accent, clean and precise" },
    ],
    lessonPreviews: [
      { icon: "👋", title_fr: "Les Salutations", title_en: "Greetings", isFree: true },
      { icon: "🌆", title_fr: "La Ville & Quartier", title_en: "City & Neighborhood", isFree: true },
      { icon: "🥘", title_fr: "La Cuisine Locale", title_en: "Local Cuisine", isFree: false },
      { icon: "🎵", title_fr: "Musique & Danse", title_en: "Music & Dance", isFree: false },
    ],
    relatedLangs: ["bassa", "duala", "ghomala"],
  },

  fulfulde: {
    id: "fulfulde",
    name: "Fulfulde",
    region_fr: "Nord & Sahel",
    region_en: "North & Sahel",
    country: "Cameroun, Niger, Nigeria",
    flag: "🌍",
    speakers: "15M+",
    family_fr: "Atlantique (Niger-Congo)",
    family_en: "Atlantic (Niger-Congo)",
    description_fr:
      "Le Fulfulde (ou Fula / Peul) est la langue des Peuls, peuple de pasteurs nomades qui ont traversé l'Afrique de l'Ouest au Sahel. Langue de commerce et de religion dans le Nord Cameroun, elle est aussi connue pour sa philosophie du 'Pulaaku' — code d'honneur peul.",
    description_en:
      "Fulfulde (or Fula / Peul) is the language of the Fulani, a people of nomadic herders who have crossed West Africa to the Sahel. A language of trade and religion in northern Cameroon, it is also known for its philosophy of 'Pulaaku' — the Fulani code of honor.",
    curiosity_fr:
      "Le Pulaaku est le code d'honneur peul enseigné en Fulfulde : munyal (patience), hakkille (sagesse), semteende (pudeur). Des valeurs transmises oralement depuis des générations.",
    curiosity_en:
      "Pulaaku is the Fulani code of honor taught in Fulfulde: munyal (patience), hakkille (wisdom), semteende (modesty). Values passed down orally for generations.",
    color: "secondary",
    colorHex: "#D97706",
    phrases: [
      { phrase: "Jam Bandu", phonetic: "[Jahm Bahn-doo]", translation_fr: "Voyage en paix", translation_en: "Travel in peace" },
      { phrase: "No foti?", phonetic: "[Noh foh-tee]", translation_fr: "C'est combien ?", translation_en: "How much?" },
      { phrase: "Jaaraama", phonetic: "[Jah-rah-mah]", translation_fr: "Merci", translation_en: "Thank you" },
      { phrase: "Sannu", phonetic: "[Sahn-noo]", translation_fr: "Bonjour", translation_en: "Hello" },
      { phrase: "Nagge", phonetic: "[Nah-geh]", translation_fr: "Vache (animal sacré)", translation_en: "Cow (sacred animal)" },
      { phrase: "Barkeejo", phonetic: "[Bar-keh-joh]", translation_fr: "Bienvenu(e)", translation_en: "Welcome" },
    ],
    sounds: [
      { letter: "ɓ", phonetic: "[ɓ]", hint_fr: "B implosif, air aspiré vers l'intérieur", hint_en: "Implosive b, air drawn inward" },
      { letter: "ɗ", phonetic: "[ɗ]", hint_fr: "D implosif, caractéristique des langues Fula", hint_en: "Implosive d, characteristic of Fula languages" },
      { letter: "ŋ", phonetic: "[ŋ]", hint_fr: "Nasale vélaire, comme 'ng' en fin de mot", hint_en: "Velar nasal, like 'ng' at end of word" },
    ],
    lessonPreviews: [
      { icon: "👋", title_fr: "Les Salutations", title_en: "Greetings", isFree: true },
      { icon: "🐄", title_fr: "Élevage & Pastoralisme", title_en: "Herding & Pastoralism", isFree: true },
      { icon: "🕌", title_fr: "Culture & Religion", title_en: "Culture & Religion", isFree: false },
      { icon: "⭐", title_fr: "Le Pulaaku — Code d'Honneur", title_en: "Pulaaku — Code of Honor", isFree: false },
    ],
    relatedLangs: ["swahili", "lingala", "wolof"],
  },

  lingala: {
    id: "lingala",
    name: "Lingala",
    region_fr: "Afrique Centrale",
    region_en: "Central Africa",
    country: "RDC, Congo, Cameroun",
    flag: "🌍",
    speakers: "20M+",
    family_fr: "Bantou (groupe C)",
    family_en: "Bantu (group C)",
    description_fr:
      "Le Lingala est la langue du fleuve Congo et de la rumba africaine. Né des échanges commerciaux sur le fleuve Congo, c'est aujourd'hui l'une des quatre langues nationales de la RDC et la langue de la musique congolaise qui a conquis l'Afrique entière.",
    description_en:
      "Lingala is the language of the Congo River and African rumba. Born from trade along the Congo River, it is today one of the four national languages of the DRC and the language of Congolese music that has conquered all of Africa.",
    curiosity_fr:
      "La rumba congolaise, classée au patrimoine de l'UNESCO, est chantée en Lingala. Des artistes comme Fally Ipupa ont fait connaître cette langue dans le monde entier.",
    curiosity_en:
      "Congolese rumba, listed as UNESCO intangible heritage, is sung in Lingala. Artists like Fally Ipupa have brought this language worldwide recognition.",
    color: "primary",
    colorHex: "#7C3AED",
    phrases: [
      { phrase: "Mbote", phonetic: "[M-boh-teh]", translation_fr: "Bonjour / Salut", translation_en: "Hello / Hi" },
      { phrase: "Nalingi yo mingi", phonetic: "[Nah-leen-gee yoh]", translation_fr: "Je t'aime beaucoup", translation_en: "I love you so much" },
      { phrase: "Baninga na ngai", phonetic: "[Bah-neen-gah]", translation_fr: "Mes amis / Ma communauté", translation_en: "My friends / Community" },
      { phrase: "Sango nini?", phonetic: "[Sahn-goh nee-nee]", translation_fr: "Quoi de neuf ?", translation_en: "What's new?" },
      { phrase: "Malamu", phonetic: "[Mah-lah-moo]", translation_fr: "Bien / Beau / Bon", translation_en: "Good / Beautiful" },
      { phrase: "Nakei", phonetic: "[Nah-keh-ee]", translation_fr: "Je pars", translation_en: "I'm leaving" },
    ],
    sounds: [
      { letter: "ng", phonetic: "[ŋg]", hint_fr: "Nasale vélaire suivie d'une occlusive", hint_en: "Velar nasal followed by a stop" },
      { letter: "mb", phonetic: "[mb]", hint_fr: "Pré-nasale, très fréquente comme dans 'Mbote'", hint_en: "Pre-nasal, very common as in 'Mbote'" },
      { letter: "o", phonetic: "[o]", hint_fr: "O arrondi, propre et clair", hint_en: "Rounded o, clean and clear" },
    ],
    lessonPreviews: [
      { icon: "👋", title_fr: "Les Salutations", title_en: "Greetings", isFree: true },
      { icon: "🎵", title_fr: "Musique & Rumba", title_en: "Music & Rumba", isFree: true },
      { icon: "🌊", title_fr: "Le Fleuve Congo", title_en: "The Congo River", isFree: false },
      { icon: "💃", title_fr: "Danse & Expression", title_en: "Dance & Expression", isFree: false },
    ],
    relatedLangs: ["swahili", "duala", "bassa"],
  },

  wolof: {
    id: "wolof",
    name: "Wolof",
    region_fr: "Afrique de l'Ouest",
    region_en: "West Africa",
    country: "Sénégal, Gambie",
    flag: "🌍",
    speakers: "12M+",
    family_fr: "Atlantique (Niger-Congo)",
    family_en: "Atlantic (Niger-Congo)",
    description_fr:
      "Le Wolof est la langue la plus parlée au Sénégal et en Gambie. Bien que le français soit la langue officielle au Sénégal, le Wolof est la véritable lingua franca du pays — parlé dans les rues de Dakar, les marchés et les griot. Il représente l'identité culturelle sénégalaise.",
    description_en:
      "Wolof is the most widely spoken language in Senegal and Gambia. Although French is the official language in Senegal, Wolof is the real lingua franca of the country — spoken in the streets of Dakar, markets, and among griots. It represents Senegalese cultural identity.",
    curiosity_fr:
      "Le concept 'Teranga' (hospitalité sénégalaise) est un mot Wolof. Cette valeur culturelle d'accueil est si forte que le Sénégal se surnomme lui-même 'le pays de la Teranga'.",
    curiosity_en:
      "'Teranga' (Senegalese hospitality) is a Wolof word. This cultural value of welcome is so strong that Senegal calls itself 'the land of Teranga'.",
    color: "secondary",
    colorHex: "#10B981",
    phrases: [
      { phrase: "Nanga def", phonetic: "[Nahn-gah def]", translation_fr: "Comment vas-tu ?", translation_en: "How are you?" },
      { phrase: "Mangi fi rekk", phonetic: "[Mahn-gee fee rek]", translation_fr: "Je suis là, ça va", translation_en: "I'm here, doing well" },
      { phrase: "Jerejef", phonetic: "[Jeh-reh-jef]", translation_fr: "Merci", translation_en: "Thank you" },
      { phrase: "Teranga", phonetic: "[Teh-rah-ngah]", translation_fr: "Hospitalité", translation_en: "Hospitality" },
      { phrase: "Waaw", phonetic: "[Wow]", translation_fr: "Oui", translation_en: "Yes" },
      { phrase: "Déedéet", phonetic: "[Deh-deh-et]", translation_fr: "Non", translation_en: "No" },
    ],
    sounds: [
      { letter: "x", phonetic: "[x]", hint_fr: "Fricative vélaire, comme 'jota' en espagnol", hint_en: "Velar fricative, like Spanish 'jota'" },
      { letter: "ñ", phonetic: "[ɲ]", hint_fr: "Nasale palatale, comme 'gn' dans 'agneau'", hint_en: "Palatal nasal, like 'ny' in 'canyon'" },
      { letter: "ng", phonetic: "[ŋ]", hint_fr: "Nasale finale distinctive du Wolof", hint_en: "Distinctive final nasal of Wolof" },
    ],
    lessonPreviews: [
      { icon: "👋", title_fr: "Les Salutations", title_en: "Greetings", isFree: true },
      { icon: "🤝", title_fr: "Teranga & Hospitalité", title_en: "Teranga & Hospitality", isFree: true },
      { icon: "🌊", title_fr: "Dakar & Océan", title_en: "Dakar & Ocean", isFree: false },
      { icon: "🎤", title_fr: "Les Griots & Tradition", title_en: "Griots & Tradition", isFree: false },
    ],
    relatedLangs: ["fulfulde", "swahili", "lingala"],
  },
}

export function getLanguageProfile(id: string): LanguageProfile | undefined {
  return LANGUAGE_PROFILES[id.toLowerCase()]
}

export function getAllLanguageIds(): string[] {
  return Object.keys(LANGUAGE_PROFILES)
}
