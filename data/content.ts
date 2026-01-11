
import { Dua, Hadith, ManzilItem, AzkarItem } from '../types';

// NOTE: Quran Data (SURAHS) has been removed in favor of the live API service (quranService.ts).
// This file now only contains static content for Duas, Hadiths, Azkar, etc.

export const DUAS: Dua[] = [
  {
    id: '1',
    status: 'published',
    priority: 20,
    category: 'morning',
    title: 'Waking Up',
    arabic: 'الْحَمْدُ لِلهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilaihin-nushur',
    translation: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
    reference: 'Bukhari'
  },
  {
    id: '2',
    status: 'published',
    priority: 19,
    category: 'morning',
    title: 'Before Eating',
    arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ',
    transliteration: 'Bismillahi wa \'ala barakatillah',
    translation: 'In the name of Allah and with the blessings of Allah.',
    reference: 'Abu Dawud'
  },
  {
    id: '3',
    status: 'published',
    priority: 18,
    category: 'morning',
    title: 'After Eating',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: 'Alhamdulillahilladzi at-amana wa saqana wa ja-alana muslimin',
    translation: 'All praise belongs to Allah, who fed us and quenched our thirst and made us Muslims.',
    reference: 'Tirmidhi'
  },
  {
    id: '4',
    status: 'published',
    priority: 17,
    category: 'morning',
    title: 'Leaving Home',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillahi tawakkaltu \'alallahi, wa la hawla wa la quwwata illa billah',
    translation: 'In the name of Allah, I trust in Allah; there is no might and no power but in Allah.',
    reference: 'Abu Dawud'
  },
  {
    id: '5',
    status: 'published',
    priority: 16,
    category: 'morning',
    title: 'Entering Home',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillahi walajna, wa bismillahi kharajna, wa \'ala rabbina tawakkalna',
    translation: 'In the name of Allah we enter and in the name of Allah we leave, and upon our Lord we rely.',
    reference: 'Abu Dawud'
  },
  {
    id: '6',
    status: 'published',
    priority: 15,
    category: 'morning',
    title: 'Entering Mosque',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allahummaf-tah li abwaba rahmatik',
    translation: 'O Allah, open for me the doors of Your mercy.',
    reference: 'Muslim'
  },
  {
    id: '7',
    status: 'published',
    priority: 14,
    category: 'morning',
    title: 'Leaving Mosque',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: 'Allahumma inni as-aluka min fadlik',
    translation: 'O Allah, I ask You for Your bounty.',
    reference: 'Muslim'
  },
  {
    id: '8',
    status: 'published',
    priority: 13,
    category: 'travel',
    title: 'Starting a Journey',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    translation: 'Glory be to Him who has brought this under our control whereas we were unable to control it. And surely we are to return to our Lord.',
    reference: 'Quran 43:13-14'
  },
  {
    id: '9',
    status: 'published',
    priority: 12,
    category: 'night',
    title: 'Before Sleeping',
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    transliteration: 'Allahumma bismika amutu wa ahya',
    translation: 'O Allah, with Your name I die and I live.',
    reference: 'Bukhari'
  },
  {
    id: '10',
    status: 'published',
    priority: 11,
    category: 'stress',
    title: 'For Distress',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ',
    translation: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness.',
    reference: 'Bukhari'
  },
   {
    id: '11',
    status: 'published',
    priority: 10,
    category: 'success',
    title: 'For Knowledge',
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    translation: 'My Lord, increase me in knowledge.',
    reference: 'Quran 20:114'
  },
  {
    id: '12',
    status: 'published',
    priority: 9,
    category: 'general',
    title: 'For Forgiveness',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    translation: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
    reference: 'Quran 7:23'
  },
  {
    id: '13',
    status: 'published',
    priority: 8,
    category: 'general',
    title: 'For Parents',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    translation: 'My Lord, have mercy upon them as they brought me up [when I was] small.',
    reference: 'Quran 17:24'
  },
  {
    id: '14',
    status: 'published',
    priority: 7,
    category: 'general',
    title: 'Good in Both Worlds',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    translation: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
    reference: 'Quran 2:201'
  },
  {
    id: '15',
    status: 'published',
    priority: 6,
    category: 'success',
    title: 'For Speech',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي',
    translation: 'My Lord, expand for me my breast [with assurance] and ease for me my task and untie the knot from my tongue that they may understand my speech.',
    reference: 'Quran 20:25-28'
  },
  {
    id: '16',
    status: 'published',
    priority: 5,
    category: 'general',
    title: 'For Patience',
    arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    translation: 'Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.',
    reference: 'Quran 2:250'
  },
  {
    id: '17',
    status: 'published',
    priority: 4,
    category: 'jummah',
    title: 'Sending Blessings',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    translation: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad.',
    reference: 'Bukhari'
  },
  {
    id: '18',
    status: 'published',
    priority: 3,
    category: 'stress',
    title: 'When Overwhelmed',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    translation: 'Sufficient for us is Allah, and [He is] the best Disposer of affairs.',
    reference: 'Quran 3:173'
  },
  {
    id: '19',
    status: 'published',
    priority: 2,
    category: 'night',
    title: 'Before Sleep (33x)',
    arabic: 'سُبْحَانَ اللهِ، الْحَمْدُ لِلهِ، اللَّهُ أَكْبَرُ',
    translation: 'Glory be to Allah, All Praise be to Allah, Allah is the Greatest.',
    reference: 'Bukhari'
  },
  {
    id: '20',
    status: 'published',
    priority: 1,
    category: 'general',
    title: 'Acceptance of Deeds',
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
    translation: 'Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing.',
    reference: 'Quran 2:127'
  }
];

export const HADITHS: Hadith[] = [
  {
    id: '1',
    status: 'published',
    priority: 20,
    source: 'Bukhari',
    category: 'Character',
    text: 'The best among you are those who have the best manners and character.',
    arabic: 'إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا'
  },
  {
    id: '2',
    status: 'published',
    priority: 19,
    source: 'Muslim',
    category: 'Charity',
    text: 'Charity does not decrease wealth.',
    arabic: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ'
  },
  {
    id: '3',
    status: 'published',
    priority: 18,
    source: 'Tirmidhi',
    category: 'Kindness',
    text: 'He who is not merciful to others, will not be treated mercifully.',
    arabic: 'مَنْ لَا يَرْحَمُ لَا يُرْحَمُ'
  },
  {
    id: '4',
    status: 'published',
    priority: 17,
    source: 'Bukhari',
    category: 'Cleanliness',
    text: 'Cleanliness is half of faith.',
    arabic: 'الطُّهُورُ شَطْرُ الْإِيمَانِ'
  },
  {
    id: '5',
    status: 'published',
    priority: 16,
    source: 'Bukhari',
    category: 'Intention',
    text: 'Actions are judged by intentions.',
    arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ'
  },
  {
    id: '6',
    status: 'published',
    priority: 15,
    source: 'Muslim',
    category: 'Brotherhood',
    text: 'None of you truly believes until he loves for his brother what he loves for himself.',
    arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ'
  },
  {
    id: '7',
    status: 'published',
    priority: 14,
    source: 'Bukhari',
    category: 'Speech',
    text: 'Whoever believes in Allah and the Last Day should say good or remain silent.',
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ'
  },
  {
    id: '8',
    status: 'published',
    priority: 13,
    source: 'Tirmidhi',
    category: 'Smile',
    text: 'Smiling in the face of your brother is charity.',
    arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ'
  },
  {
    id: '9',
    status: 'published',
    priority: 12,
    source: 'Bukhari',
    category: 'Parents',
    text: 'Paradise lies under the feet of your mother.',
    arabic: 'الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ'
  },
  {
    id: '10',
    status: 'published',
    priority: 11,
    source: 'Muslim',
    category: 'Ease',
    text: 'Make things easy for people and not difficult. Give good news and do not bring bad news.',
    arabic: 'يَسِّرُوا وَلَا تُعَسِّرُوا، وَبَشِّرُوا وَلَا تُنَفِّرُوا'
  },
  {
    id: '11',
    status: 'published',
    priority: 10,
    source: 'Abu Dawud',
    category: 'Anger',
    text: 'Do not become angry and paradise is yours.',
    arabic: 'لَا تَغْضَبْ وَلَكَ الْجَنَّةُ'
  },
  {
    id: '12',
    status: 'published',
    priority: 9,
    source: 'Bukhari',
    category: 'Modesty',
    text: 'Modesty is a branch of faith.',
    arabic: 'الْحَيَاءُ شُعْبَةٌ مِنَ الْإِيمَانِ'
  },
  {
    id: '13',
    status: 'published',
    priority: 8,
    source: 'Muslim',
    category: 'Strength',
    text: 'The strong believer is better and more beloved to Allah than the weak believer.',
    arabic: 'الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ'
  },
  {
    id: '14',
    status: 'published',
    priority: 7,
    source: 'Tirmidhi',
    category: 'Knowledge',
    text: 'Seeking knowledge is a duty upon every Muslim.',
    arabic: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ'
  },
  {
    id: '15',
    status: 'published',
    priority: 6,
    source: 'Bukhari',
    category: 'Neighbors',
    text: 'He is not a believer whose neighbor is not safe from his harm.',
    arabic: 'لَا يُؤْمِنُ مَنْ لَا يَأْمَنُ جَارُهُ بَوَائِقَهُ'
  }
];

export const MANZIL_DATA: ManzilItem[] = [
    {
        id: 'm1',
        status: 'published',
        order: 1,
        name: 'Surah Al-Fatiha',
        arabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ. ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ. ٱلرَّحْمَٰنِ ٱلرَّحِيمِ. مَٰلِكِ يَوْمِ ٱلدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ. صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds - The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path - The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.'
    },
    {
        id: 'm2',
        status: 'published',
        order: 2,
        name: 'Al-Baqarah (1-5)',
        arabic: 'الۤمۤ. ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ. ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَـٰهُمْ يُنفِقُونَ. وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْـَٔاخِرَةِ هُمْ يُوقِنُونَ. أُو۟لَـٰٓئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ',
        translation: 'Alif, Lam, Meem. This is the Book about which there is no doubt, a guidance for those conscious of Allah - Who believe in the unseen, establish prayer, and spend out of what We have provided for them, And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith]. Those are upon [right] guidance from their Lord, and it is those who are the successful.'
    },
    {
        id: 'm3',
        status: 'published',
        order: 3,
        name: 'Ayatul Kursi (2:255)',
        arabic: 'ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَئُودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ',
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.'
    },
    {
        id: 'm4',
        status: 'published',
        order: 4,
        name: 'Al-Baqarah (284-286)',
        arabic: 'لِّلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ...',
        translation: 'To Allah belongs whatever is in the heavens and whatever is in the earth...'
    },
    {
        id: 'm5',
        status: 'published',
        order: 5,
        name: 'Surah Al-Ikhlas',
        arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ. ٱللَّهُ ٱلصَّمَدُ. لَمْ يَلِدْ وَلَمْ يُولَدْ. وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
        translation: 'Say, "He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent."'
    },
    {
        id: 'm6',
        status: 'published',
        order: 6,
        name: 'Surah Al-Falaq',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ. مِن شَرِّ مَا خَلَقَ. وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ. وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ. وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        translation: 'Say, "I seek refuge in the Lord of daybreak From the evil of that which He created And from the evil of darkness when it settles And from the evil of the blowers in knots And from the evil of an envier when he envies."'
    },
    {
        id: 'm7',
        status: 'published',
        order: 7,
        name: 'Surah An-Nas',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ. مَلِكِ ٱلنَّاسِ. إِلَٰهِ ٱلنَّاسِ. مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ. ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ. مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
        translation: 'Say, "I seek refuge in the Lord of mankind, The Sovereign of mankind. The God of mankind, From the evil of the retreating whisperer - Who whispers [evil] into the breasts of mankind - From among the jinn and mankind."'
    }
];

export const AZKAR_DATA: AzkarItem[] = [
    {
        id: 'a1',
        status: 'published',
        priority: 10,
        category: 'morning',
        title: 'Tasbeeh',
        count: 33,
        arabic: 'سُبْحَانَ اللهِ',
        translation: 'Glory be to Allah',
        reference: 'Sahih Muslim'
    },
    {
        id: 'a2',
        status: 'published',
        priority: 9,
        category: 'morning',
        title: 'Tahmeed',
        count: 33,
        arabic: 'الْحَمْدُ لِلَّهِ',
        translation: 'All praise is due to Allah',
        reference: 'Sahih Muslim'
    },
    {
        id: 'a3',
        status: 'published',
        priority: 8,
        category: 'morning',
        title: 'Takbeer',
        count: 34,
        arabic: 'اللَّهُ أَكْبَرُ',
        translation: 'Allah is the Greatest',
        reference: 'Sahih Muslim'
    },
    {
        id: 'a4',
        status: 'published',
        priority: 7,
        category: 'morning',
        title: 'Kalima Tawheed',
        count: 10,
        arabic: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        translation: 'There is no god but Allah alone, He has no partner. His is the dominion and His is the praise, and He is capable of all things.',
        reference: 'Bukhari'
    },
    {
        id: 'a5',
        status: 'published',
        priority: 6,
        category: 'evening',
        title: 'Protection',
        count: 3,
        arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
        translation: 'In the Name of Allah with Whose Name there is protection against every kind of harm in the earth or in the heaven, and He is the All-Hearing and All-Knowing.',
        reference: 'Tirmidhi'
    },
    {
        id: 'a6',
        status: 'published',
        priority: 5,
        category: 'morning',
        title: 'For Contentment',
        count: 3,
        arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
        translation: 'I am pleased with Allah as my Lord, with Islam as my religion and with Muhammad (peace and blessings of Allah be upon him) as my Prophet.',
        reference: 'Abu Dawud'
    },
    {
        id: 'a7',
        status: 'published',
        priority: 4,
        category: 'evening',
        title: 'Seeking Paradise',
        count: 1,
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
        translation: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I am faithful to my covenant and my promise to You as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge before You Your favor upon me and I acknowledge to You my sin, so forgive me, for verily no one can forgive sins except You.',
        reference: 'Bukhari (Sayyidul Istighfar)'
    }
];
