import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import shambhuImg from '@/imports/Shambhu_saha.png'
import dhimanImg from '@/imports/Dhiman_Sutar.png'
import dhakMusic from '@/imports/mythologychallengeryt-durga-puja-dhak-sound-125241.mp3'
import logoImg from '@/imports/uksd_logo.png'

const PUJA_DATE = new Date('2026-10-16T00:00:00')

const GALLERY_IMAGES = [
  { url: '/heritage_facade_2025.jpg', alt: 'Heritage North Kolkata Architecture & Pandal Facade', year: '2025' },
  { url: '/IMG_20260827_180143.jpg.jpeg', alt: 'Beginning of Devi Paksha and Chokkhudan Rituals', year: '2025' },

  { url: '/1000290723.jpg.jpeg', alt: 'Pujo Secretary Subhasis Chakraborty with The Theme Artist', year: '2025' },
  { url: '/1000317053.jpg.jpeg', alt: 'Sindur Dan at Dashami', year: '2025' },
  { url: '/1000317189.jpg.jpeg', alt: 'Sindur Khela Ritual', year: '2025' },
  { url: '/1000512463.jpg.jpeg', alt: 'The Pandel Theme at night', year: '2025' },
  { url: '/1000771877.jpg.jpeg', alt: 'Heritage Pandal Art & Theme Installation', year: '2025' },
  { url: '/1000771878.jpg.jpeg', alt: 'Illuminated Pandal Architecture & Night View', year: '2025' },
  { url: '/1000771882.jpg.jpeg', alt: 'The LED screen Installation and outer view', year: '2025' },
  { url: '/1000771885.jpg.jpeg', alt: 'Architectural Overview of the entire Pandel', year: '2025' },
  { url: '/1000771887.jpg.jpeg', alt: 'The light work and the design', year: '2025' },
  { url: '/1000771888.jpg.jpeg', alt: 'Grand Festival Canopy & Traditional Illuminations', year: '2025' },
  { url: '/1000771889.jpg.jpeg', alt: 'One of North Kolkatas oldest tradition-Hand Cart Rickshaw ', year: '2025' },
  { url: '/1000819021.jpg.jpeg', alt: 'Naba Patrika and Community Gathering', year: '2025' },
  { url: '/1000819023.jpg.jpeg', alt: 'Naba Patrika and Community Gathering', year: '2025' },
  { url: '/DSC_7038.jpg.jpeg', alt: 'Khunti Pujo Rituals and Community Gathering', year: '2026' },
  { url: '/DSC_7053.jpg.jpeg', alt: 'Festive Crowd during Khunti Pujo', year: '2026' },
  { url: '/DSC_7075.jpg.jpeg', alt: 'Arrangment and Preparation of Khunti Pujo Suchona Ghot', year: '2026' },
  { url: '/DSC_7117.JPG.jpeg', alt: 'Khunti Pujo and devotees gathering at rital', year: '2026' },
  { url: '/DSC_7170 (1).jpg.jpeg', alt: 'Theme Artist and Devotees gathering during Khunti Pujo', year: '2026' },
  { url: '/DSC_7177.JPG.jpeg', alt: 'Theme Artist and Devotees gathering during Khunti Pujo', year: '2026' },
  { url: '/DSC_7242.JPG.jpeg', alt: 'Cultural Devotees and Commitee Members', year: '2025' },
  { url: '/SAN_8728.jpg.jpeg', alt: 'Local Residents,Cultural Devotees and Commitee Members', year: '2025' },
  { url: '/SAN_8740.jpg.jpeg', alt: 'The Junior Team of Uttar Kalikata Sarbojanin Durgotsav Samity', year: '2025' },
  { url: '/SAN_8750.jpg.jpeg', alt: 'The Team of Uttar Kalikata Sarbojanin Durgotsav Samity', year: '2025' },
  { url: '/SAN_8760.jpg.jpeg', alt: 'The Team of Mohila Commitee of Uttar Kalikata Sarbojanin Durgotsav Samity', year: '2025' },
]

const SCHEDULE = [
  { day: 'Mahalaya', date: 'Sept 25, 2026', events: ['Live Mahishasura Mardini broadcast', 'Pratima Chokh Daan (Ritual Painting of Devi Durga\'s Eyes)'] },
  { day: 'Dwitiya', date: 'Oct 13, 2026', events: ['Subho Suchona - Grand Pandal Inauguration & Ribbon Cutting Ceremony of 95th Year of Uttar Kalikata Sarbojanin Durgotsav', 'Senior Veteran Committee Members & Artisans Felicitations', 'Art Competition and Exhibition', 'Cultural Inauguration Function', 'Special Preview Show for Delegates'] },
  { day: 'Tritiya', date: 'Oct 14, 2026', events: ['Unveiling of Pandal Installation Art & Theme Lighting for General Devotees', 'Pujor Upohar- Bastrabitoron', 'Opening of Sonajhurir Hat'] },
  { day: 'Choturthi', date: 'Oct 15, 2026', events: ['Grand Theme Pandal and Light Preview for General Devotees'] },
  { day: 'Panchami', date: 'Oct 16, 2026', events: ['Mahapanchami Pujo'] },
  { day: 'Shashthi', date: 'Oct 17, 2026', events: [' Kalparambha & Bodhon ceremony', ' Amontron & Adhivas puja', 'Grand Evening Aarti & Dhak performance'] },
  { day: 'Saptami', date: 'Oct 18, 2026', events: [' Navpatrika Snan & Puja (Kola Bou)', 'MahaSaptami Puja & Pushpanjali'] },
  { day: 'Ashtami', date: 'Oct 19, 2026', events: ['Ashtami Mahapuja & Morning Pushpanjali', 'Sacred Kumari Puja ceremony', ' Sandhi Puja (Lighting of 108 sacred lamps)', 'Traditional Dhunuchi Nach Competition with Heritage Dhaak Music', 'Grand Sandhya Aarti with 108 Diyas'] },
  { day: 'Navami', date: 'Oct 19, 2026', events: ['Mahanavami Puja', 'Sacred Hom & Maha Havan ritual', 'Special Navami Bhog distribution', 'Musical Extravaganza'] },
  { day: 'Dashami', date: 'Oct 20, 2026', events: ['MahaDashami Puja & Darpan Bisarjan', ' Vijaya Dashami rituals & Peace Prayers', ' Grand Sindoor Utsav & Devi Baran Procession', ' Grand Bisarjan Shobhayatra (Immersion Procession)', ' Immersion at Ganga Ghat & Vijaya Sammelani'] },
]

const TICKER_ITEMS = [
  '🔱 Durga Puja 2026 Celebrations — October 14–20, 2026',
  '✨ Theme 2026: "Jol Chhaper Kolikata" · জল ছাপের কলিকাতা — 95th Year',
  '🎭 Cultural Programmes Every Evening During Puja Days',
  '🏆 Best Pandal Award — North Zone 2025 Winner',
  '📸 Follow Us on Instagram @uttar_kalikata_sarbojanin',
  '🎵 Live Dhak & Baul Music Performances Nightly',
  '🙏 All Are Welcome — Entry Free During All Puja Days',
]

const SOCIAL_PLATFORMS = [
  { platform: 'Facebook', icon: 'f', handle: 'Uttar Kalikata Sarbojanin Durgatsav Samity', followers: '620+', desc: 'Daily updates, live event streams, announcements, and community discussions. Stay connected with our growing community of devotees.', color: '#1877F2', bg: 'rgba(24,119,242,0.08)', border: 'rgba(24,119,242,0.25)', cta: 'Like Our Page', url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/' },
  { platform: 'Instagram', icon: '◉', handle: '@uttar_kalikata_sarbojanin', followers: '420+', desc: 'Exclusive behind-the-scenes, idol-making process, Reels, and festive moments from North Kolkata.', color: '#E1306C', bg: 'rgba(225,48,108,0.08)', border: 'rgba(225,48,108,0.25)', cta: 'Follow Now', url: 'https://www.instagram.com/uttar_kalikata_sarbojanin' },
  { platform: 'YouTube', icon: '▶', handle: 'UttarKalikataSarbojanin', followers: '50', desc: 'Full aarti livestreams, pandal-making documentaries, and cultural programme recordings.', color: '#FF3B30', bg: 'rgba(255,59,48,0.08)', border: 'rgba(255,59,48,0.25)', cta: 'Subscribe', url: 'https://www.youtube.com/@UttarKalikataSarbojanin' },
]

const VIDEOS = [
  {
    title: 'ওরাও মায়ের সন্তান ( পর্ব ০১ ) ☺️',
    views: '67 views · 7 days ago',
    time: '0:35',
    img: '/thumbnails/yt_thumb_1.jpg',
    url: 'https://www.youtube.com/watch?v=DmfU-FauKgk'
  },
  {
    title: 'খুঁটি পুজো ২০২৬। 🌸 💗',
    views: '95 views · 11 days ago',
    time: '0:52',
    img: '/thumbnails/yt_thumb_2.jpg',
    url: 'https://www.youtube.com/watch?v=sqxfYSp0LmA'
  },
  {
    title: 'মহা আলয়ে মা ( এবার শুধু ভদ্র কথা ) 🌸 🪔',
    views: '60 views · 11 days ago',
    time: '1:18',
    img: '/thumbnails/yt_thumb_3.jpg',
    url: 'https://www.youtube.com/watch?v=BU1ogDynB4U'
  },
]

const FACEBOOK_POSTS = [
  {
    title: 'Independence Day Greeting — Shubho 80th Independence Day (Aug 15, 2026)',
    date: 'Aug 15',
    likes: '412 Likes · 89 Comments',
    img: '/thumbnails/ig_post_12.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Shubh Rakhi Bandhan Utsav Greeting (Aug 2026)',
    date: 'Aug 9',
    likes: '350 Likes · 74 Comments',
    img: '/thumbnails/ig_post_3.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Shubh Manasa Puja Festival Greeting (Aug 2026)',
    date: 'Aug 7',
    likes: '285 Likes · 51 Comments',
    img: '/thumbnails/ig_post_5.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: '50 Days Countdown Blackboard Graphic (Mid Aug 2026)',
    date: 'Aug 5',
    likes: '298 Likes · 62 Comments',
    img: '/thumbnails/ig_post_4.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Theme & Sculpture Artist Dhiman Sutar 95th Year Poster (Aug 2026)',
    date: 'Aug 1',
    likes: '310 Likes · 67 Comments',
    img: '/thumbnails/ig_post_6.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Khuti Puja Bamboo Pole Ritual Ceremony (Aug 2026)',
    date: 'Jul 28',
    likes: '215 Likes · 45 Comments',
    img: '/thumbnails/ig_post_7.jpg',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Artist Dhiman Sutar & Mangal Ghat Installation (July 2026)',
    date: 'Jul 20',
    likes: '188 Likes · 32 Comments',
    img: '/thumbnails/ig_post_9.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Khuti Puja Celebrations with Artist Dhiman Sutar & Devotees (July 2026)',
    date: 'Jul 15',
    likes: '142 Likes · 28 Comments',
    img: '/thumbnails/ig_post_2.jpg',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Dhiman Sutar Theme & Sculpture Artist 2026 Official Card (July 2026)',
    date: 'Jul 10',
    likes: '165 Likes · 38 Comments',
    img: '/thumbnails/ig_post_1.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Decorated Kula Mask & Marigold Garland Reel (July 2026)',
    date: 'Jul 5',
    likes: '220 Likes · 49 Comments',
    img: '/thumbnails/ig_post_10.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Kumartuli Artisan Clay Preparation in Workshop Studio (June 2026)',
    date: 'Jun 28',
    likes: '195 Likes · 41 Comments',
    img: '/thumbnails/ig_post_13.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Devi Durga Clay Idol Face Sculpting Reel (June 2026)',
    date: 'Jun 20',
    likes: '340 Likes · 78 Comments',
    img: '/thumbnails/ig_post_8.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Birendra Krishna Bhadra Statue Tribute Installation Reel (2026)',
    date: 'Jun 12',
    likes: '280 Likes · 55 Comments',
    img: '/thumbnails/ig_post_11.png',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  },
  {
    title: 'Ora O Mayer Shontan Official Theme Graphic (2025/2026)',
    date: 'May 30',
    likes: '410 Likes · 92 Comments',
    img: '/thumbnails/yt_thumb_1.jpg',
    url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/'
  }
]

const NORTH_KOLKATA_PUJAS = [
  {
    id: 'uksd',
    name: 'Uttar Kalikata Sarbojanin Durgotsav Samity',
    bengaliName: 'উত্তর কলিকাতা সার্বজনীন দুর্গোৎসব সমিতি',
    estYear: '1932 (95th Year)',
    dist: '0 m (Ground Zero Hub)',
    walkTime: '0 min walk',
    route: '5/1 Balaram Ghosh Street, Shyambazar (Nearest Landmark: Shyampukur Police Station)',
    highlights: [
      '95th Year Heritage North Kolkata Puja',
      'Theme 2026: "Jol Chhaper Kolikata" (জল ছাপের কলিকাতা)',
      'Traditional Clay Protima & Fine Craftsmanship',
      'Atmospheric Dhak Performances & Cultural Stage'
    ],
    bestTime: 'Anytime during Puja days',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=5%2F1+Balaram+Ghosh+Street,+Kolkata+-+700+004'
  },
  {
    id: 'bagbazar',
    name: 'Bagbazar Sarbojanin Durgotsav',
    bengaliName: 'বাগবাজার সার্বজনীন দুর্গোৎসব',
    estYear: '1919 (108th Year)',
    dist: '600 m from Shyambazar Metro',
    walkTime: '7–8 mins walk',
    route: 'Walk north via Balaram Ghosh St ➔ Turn right on Bagbazar Street to Bagbazar Ground',
    highlights: [
      'Iconic Traditional Ekchala Protima with Pure White Shola Work',
      'One of the Oldest Heritage Sarbojanin Pujas of Kolkata',
      'Famous Morning Anjali & Traditional Dashami Sindoor Khela',
      'Huge Festive Fair & Local Bengali Food Stalls'
    ],
    bestTime: 'Early Morning (6:30 AM – 9:30 AM) or Midnight (1:00 AM – 3:30 AM)',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bagbazar+Sarbojanin+Durgotsav+Kolkata'
  },
  {
    id: 'kumartuli',
    name: 'Kumartuli Park Durgotsav',
    bengaliName: 'কুমোরটুলি পার্ক দুর্গোৎসব',
    estYear: 'Established 1993',
    dist: '1.1 km from Shyambazar Metro',
    walkTime: '12–14 mins walk',
    route: 'Walk west via BK Paul Avenue ➔ Turn towards Abhay Mitra Street & Kumartuli Park',
    highlights: [
      'Heart of Kolkata Sculpture Artisans Hub (Kumartuli Colony)',
      'Grand Theme Pandal Architecture & Innovative Illumination',
      'Intricate Sculptural Detailing by Master Potters',
      'Scenic Proximity to Hooghly Riverbank'
    ],
    bestTime: 'Evening (6:00 PM – 10:00 PM) for Chandannagar Lighting Displays',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kumartuli+Park+Durgotsav+Kolkata'
  },
  {
    id: 'ahiritola',
    name: 'Ahiritola Sarbojanin Durgotsav',
    bengaliName: 'আহিরীটোলা সার্বজনীন দুর্গোৎসব',
    estYear: 'Established 1940',
    dist: '1.6 km from Shyambazar Metro',
    walkTime: '18–20 mins walk',
    route: 'Walk along BK Paul Avenue towards Strand Bank Road & Ahiritola Ghat',
    highlights: [
      'Renowned for Large Scale Social & Cultural Theme Installations',
      'Artistic Street Alpana Paintings & Heritage Ambiance',
      'Close to Ahiritola Launch Ghat & Ganges River',
      'Spectacular Evening Illumination Canopy'
    ],
    bestTime: 'Late Night (11:00 PM – 2:00 AM) for Light Shows',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ahiritola+Sarbojanin+Durgotsav+Kolkata'
  },
  {
    id: 'sovabazar',
    name: 'Sovabazar Rajbari Durga Puja',
    bengaliName: 'শোভাবাজার রাজবাড়ি দুর্গোৎসব',
    estYear: 'Established 1757',
    dist: '1.4 km from Shyambazar Metro',
    walkTime: '15–16 mins walk',
    route: 'Walk south along Rabindra Sarani ➔ Enter Raja Nabakrishna Street to Sovabazar Rajbari',
    highlights: [
      '269-Year-Old Historic Aristocratic Rajbari Puja (Founded by Raja Nabakrishna Deb)',
      'Sacred Natmandap Architecture & Traditional Rituals',
      'Authentic Bonedi Bari Chandi Path & Canon Firing Tradition (Sandhi Puja)',
      'Immersion Processions with Two Boats on Ganges'
    ],
    bestTime: 'Afternoon (11:00 AM – 3:00 PM) for Heritage Courtyard Darshan',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sovabazar+Rajbari+Durga+Puja+Kolkata'
  },
  {
    id: 'jagat-mukherjee',
    name: 'Jagat Mukherjee Park Durgotsav',
    bengaliName: 'জগৎ মুখার্জি পার্ক দুর্গোৎসব',
    estYear: 'Established 1936 (91st Year)',
    dist: '750 m from Shyambazar Metro',
    walkTime: '8–9 mins walk',
    route: 'Walk towards Sovabazar / Girish Park via Rabindra Sarani or Jatindra Mohan Avenue ➔ Turn onto Jagat Mukherjee Park lane',
    highlights: [
      'Iconic Theme Pandal with Innovative Artistic Installations & Kinetic Illumination',
      'Famous Historical Heritage Community Durgotsav of North Kolkata',
      'Artistic Devi Pratima with Deeply Immersive Environmental Concepts',
      'Seamless Walking Connectivity to UKSD & Kumartuli Circuit'
    ],
    bestTime: 'Night (8:00 PM – 1:00 AM) for Light & Atmospheric Theme Effects',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jagat+Mukherjee+Park+Durga+Puja+Kolkata'
  },
  {
    id: 'hatibagan',
    name: 'Hatibagan Sarbojanin Durgotsav',
    bengaliName: 'হাতিবাগান সার্বজনীন দুর্গোৎসব',
    estYear: 'Established 1935 (92nd Year)',
    dist: '450 m from Shyambazar Metro',
    walkTime: '5–6 mins walk',
    route: 'Walk south from Shyambazar 5-point crossing along Bidhan Sarani ➔ Enter Nalin Sarkar Street / Hatibagan Market area',
    highlights: [
      'Famous Heritage North Kolkata Puja on Historic Bidhan Sarani',
      'Renowned for Creative Theme Craftsmanship & Traditional Festive Charm',
      'Short Walking Distance from Shyambazar Metro & Hatibagan Market Hub',
      'Vibrant Festive Food & Cultural Street Stall Extravaganza'
    ],
    bestTime: 'Evening (5:30 PM – 9:30 PM) or Night for Festive Street Atmosphere',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hatibagan+Sarbojanin+Durgotsav+Kolkata'
  },
  {
    id: 'kashi-bose-lane',
    name: 'Kashi Bose Lane Durgotsav',
    bengaliName: 'কাশী বোস লেন সার্বজনীন দুর্গোৎসব',
    estYear: 'Established 1937 (90th Year)',
    dist: '900 m from Shyambazar / Hatibagan',
    walkTime: '10–12 mins walk',
    route: 'From Hatibagan Junction walk along Bidhan Sarani ➔ Turn into Kashi Bose Lane towards Maniktala',
    highlights: [
      'Multi-Award Winning Monumental Theme Pandal & Conceptual Sculptures',
      'Mesmerizing Original Soundscapes & World-Class Architectural Illumination',
      'Renowned Art Direction & Intricate Clay & Alternative Material Artistry',
      'One of the Most Popular & Visited Big-Budget North Kolkata Durgotsavs'
    ],
    bestTime: 'Late Night (11:00 PM – 3:30 AM) to experience lighting & bypass queues',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kashi+Bose+Lane+Durga+Puja+Kolkata'
  }
]

const INITIAL_WISHES = [
  {
    id: 'w-1',
    name: 'Sourav & Swati Banerjee',
    location: 'Shyambazar, Kolkata',
    message: 'উত্তর কলিকাতা সার্বজনীন দুর্গোৎসব সমিতির সকলকে শারদীয়ার প্রীতি ও শুভেচ্ছা! মা দুর্গার আশীষে সকলের জীবন মঙ্গলময় হোক।',
    date: 'Aug 29, 2026',
    likes: 42,
    isNri: false
  },
  {
    id: 'w-2',
    name: 'Dr. Debolina Roy',
    location: 'London, United Kingdom 🇬🇧',
    message: 'Sending warmest Sharadiya Shubhechha from London! Even miles away, hearing the Dhak beats on this site brings back fond memories of Shyambazar Pandal hopping.',
    date: 'Aug 28, 2026',
    likes: 38,
    isNri: true
  },
  {
    id: 'w-3',
    name: 'Subhashish & Anindita Mukherjee',
    location: 'New Jersey, USA 🇺🇸',
    message: 'May Maa Durga bring peace, happiness, and prosperity to all our Kolkata brothers & sisters. Subho Saptami and Ashtami in advance to UKSD Samity!',
    date: 'Aug 27, 2026',
    likes: 29,
    isNri: true
  },
  {
    id: 'w-4',
    name: 'Ritam & Gargi Ganguly',
    location: 'Bagbazar, North Kolkata',
    message: '৯৫তম বর্ষে পদার্পণে উত্তর কলিকাতা সার্বজনীন দুর্গোৎসব সমিতিকে আন্তরিক অভিনন্দন। জয় মা দুর্গা!',
    date: 'Aug 26, 2026',
    likes: 51,
    isNri: false
  },
  {
    id: 'w-5',
    name: 'Dr. Arnab Sen',
    location: 'Tokyo, Japan 🇯🇵',
    message: 'Distance cannot fade the emotions of North Kolkata Pujo! Best wishes for the 2026 "Jol Chhaper Kolikata" theme. Joy Maa Durga!',
    date: 'Aug 25, 2026',
    likes: 34,
    isNri: true
  },
  {
    id: 'w-6',
    name: 'Sutapa & Tanmoy Das',
    location: 'Sydney, Australia 🇦🇺',
    message: 'Lighted a virtual pradip from Sydney! Wishing every devotee a blessed Sharad Utsav filled with joy, Dhunuchi Naach, and delicious Bhog Prasad.',
    date: 'Aug 24, 2026',
    likes: 27,
    isNri: true
  }
]

const INSTAGRAM_POSTS = [
  {
    url: '/thumbnails/ig_post_12.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Independence Day Greeting — Shubho 80th Independence Day (Aug 15, 2026)'
  },
  {
    url: '/thumbnails/ig_post_3.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Shubh Rakhi Bandhan Utsav Greeting (Aug 2026)'
  },
  {
    url: '/thumbnails/ig_post_5.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Shubh Manasa Puja Festival Greeting (Aug 2026)'
  },
  {
    url: '/thumbnails/ig_post_4.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: '50 Days Countdown Blackboard Graphic (Mid Aug 2026)'
  },
  {
    url: '/thumbnails/ig_post_6.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Theme & Sculpture Artist Dhiman Sutar 95th Year Poster (Aug 2026)'
  },
  {
    url: '/thumbnails/ig_post_7.jpg',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Khuti Puja Bamboo Pole Ritual Ceremony (Aug 2026)'
  },
  {
    url: '/thumbnails/ig_post_9.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Artist Dhiman Sutar & Mangal Ghat Installation (July 2026)'
  },
  {
    url: '/thumbnails/ig_post_2.jpg',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Khuti Puja Celebrations with Artist Dhiman Sutar & Devotees (July 2026)'
  },
  {
    url: '/thumbnails/ig_post_1.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Dhiman Sutar Theme & Sculpture Artist 2026 Official Card (July 2026)'
  },
  {
    url: '/thumbnails/ig_post_10.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Decorated Kula Mask & Marigold Garland Reel (July 2026)'
  },
  {
    url: '/thumbnails/ig_post_13.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Kumartuli Artisan Clay Preparation in Workshop Studio (June 2026)'
  },
  {
    url: '/thumbnails/ig_post_8.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Devi Durga Clay Idol Face Sculpting Reel (June 2026)'
  },
  {
    url: '/thumbnails/ig_post_11.png',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Birendra Krishna Bhadra Statue Tribute Installation Reel (2026)'
  },
  {
    url: '/thumbnails/yt_thumb_1.jpg',
    postUrl: 'https://www.instagram.com/uttar_kalikata_sarbojanin/',
    alt: 'Ora O Mayer Shontan Official Theme Graphic (2025/2026)'
  },
]

const EXPERTISE_OPTIONS = [
  'Idol Making / Sculpture Design (Clay, Fiber, Alternative Materials)',
  'Theme Concept & Art Direction',
  'Pandal Construction & Carpentry',
  'Decorative Craftwork (Shola, Fabric, Metal, Eco-friendly art)',
  'Sound & Lighting Design',
  'Electrical Work & Execution',
  'Logistics, Site Management & Manual Labor',
]

const FESTIVE_PLAYLIST = [
  {
    id: 1,
    title: 'Traditional Dhak Rhythm & Beats',
    subtitle: 'Kolkata Festival Dhakis · Festive Percussion',
    category: 'Dhak',
    src: dhakMusic
  },
  {
    id: 2,
    title: 'Mahishasura Mardini — Mahalaya Chandi Path',
    subtitle: 'Birendra Krishna Bhadra · Dawn Chanting',
    category: 'Agamoni',
    src: '/mahalaya-chandi-path.mp3'
  },
  {
    id: 3,
    title: 'Bajlo Tomar Alor Benu',
    subtitle: 'Classic Agamoni · Devotional',
    category: 'Agamoni',
    src: '/bajlo-tomar-alor-benu.mp3'
  },
  {
    id: 4,
    title: 'Dhaker Taley',
    subtitle: 'Dev · Subhashree · Jeet Gannguli · Abhijeet',
    category: 'Festive',
    src: '/dhaker-taley.mp3'
  },
  {
    id: 5,
    title: 'Dugga Elo',
    subtitle: 'Festive Celebration · Agamoni Song',
    category: 'Agamoni',
    src: '/dugga-elo.mp3'
  },
  {
    id: 6,
    title: 'Elo Je Maa — এলো যে মা',
    subtitle: 'Abhijeet · Shreya Ghoshal · Jeet Gannguli',
    category: 'Devotional',
    src: '/elo-je-maa.mp3'
  },
  {
    id: 7,
    title: 'Jago Tumi Jago',
    subtitle: 'Mahalaya Special · Bengali Devotional',
    category: 'Agamoni',
    src: '/jago-tumi-jago.mp3'
  }
]

// Palette rebased around the committee's terracotta-and-gold emblem —
// a warm, weathered clay backdrop with gilded devanagari/bengali linework
// and a single crimson bindu accent.
const C = {
  bg: '#170F08',
  bgDark: '#0F0904',
  crimson: '#C41E3A',
  crimsonDeep: '#8B0000',
  gold: '#D4A017',
  saffron: '#E8721C',
  terracotta: '#8B5A2B',
  terracottaDeep: '#5C3A1E',
  clay: '#3A2412',
  cream: '#FDF6E3',
  creamFaint: 'rgba(253,246,227,0.75)',
  creamMuted: 'rgba(253,246,227,0.45)',
  border: 'rgba(212,160,23,0.2)',
  borderBright: 'rgba(212,160,23,0.4)',
}

const FONT_DISPLAY = "'Cinzel Decorative', serif"
const FONT_SERIF = "'Cinzel', serif"
const FONT_BODY = "'Poppins', sans-serif"
const FONT_BENGALI = "'Baloo Da 2', 'Hind Siliguri', 'Anek Bangla', sans-serif"

function navHref(item: string): string {
  if (item === 'Social Media') return '#social'
  if (item === 'Work With Us') return '#work-with-us'
  if (item === 'Sponsorship') return '#sponsorship'
  if (item === 'Advertise With Us') return '#advertise-with-us'
  if (item === 'Priviledge Form') return '#priviledge-form'
  if (item === 'Pandal Route') return '#pandal-route'
  if (item === 'Subhechha Wall') return '#subhechha'
  if (item === 'Awards & Achievements') return '#awards'
  return `#${item.toLowerCase()}`
}

async function sendSubmissionToEmail(formName: string, data: Record<string, any>) {
  try {
    await fetch('https://formsubmit.co/ajax/uksd1932@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[UKSD 1932 Durga Puja] New ${formName} Submission`,
        _template: 'table',
        _captcha: 'false',
        'Form Type': formName,
        'Submitted Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        ...data
      })
    })
  } catch (err) {
    console.warn('Submission forwarding to uksd1932@gmail.com error:', err)
  }
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
      <div style={{ width: 36, height: 1, background: C.gold }} />
      <span style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.28em', color: C.saffron, textTransform: 'uppercase' as const }}>{children}</span>
      <div style={{ width: 36, height: 1, background: C.gold }} />
    </div>
  )
}

function SectionLabelLeft({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <div style={{ width: 36, height: 1, background: C.gold }} />
      <span style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.28em', color: C.saffron, textTransform: 'uppercase' as const }}>{children}</span>
    </div>
  )
}

/** Placeholder section for tabs that don't have content yet — keeps the
 *  nav link and page anchor working while content is filled in later. */
function PlaceholderSection({ id, eyebrow, title, accent }: { id: string; eyebrow: string; title: string; accent: string }) {
  return (
    <section id={id} style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}`, minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <SectionLabel>{eyebrow}</SectionLabel>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700, marginBottom: 20 }}>
          {title.split(' ').slice(0, -1).join(' ')} <span style={{ color: accent }}>{title.split(' ').slice(-1)}</span>
        </h2>
        <div style={{ width: 44, height: 1, background: C.gold, margin: '0 auto 20px' }} />
        <p style={{ fontSize: 14, color: C.creamMuted, letterSpacing: '0.04em' }}>Content coming soon.</p>
      </div>
    </section>
  )
}

const inputStyle = {
  padding: '12px 16px',
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${C.border}`,
  color: C.cream,
  fontSize: 14,
  outline: 'none',
  fontFamily: FONT_BODY,
  width: '100%',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.2s',
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDay, setActiveDay] = useState(4)
  const [galleryYear, setGalleryYear] = useState('All')
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [logoZoomed, setLogoZoomed] = useState(false)
  const [showStreetView, setShowStreetView] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [curtainRaised, setCurtainRaised] = useState(false)
  const [wwuExpertise, setWwuExpertise] = useState<string[]>([])
  const [wwuExperience, setWwuExperience] = useState('')
  const [wwuTeamSize, setWwuTeamSize] = useState('')
  const [wwuOther, setWwuOther] = useState('')
  const [wwuSubmitted, setWwuSubmitted] = useState(false)

  const [sponsorshipSubmitted, setSponsorshipSubmitted] = useState(false)
  const [privilegeSubmitted, setPrivilegeSubmitted] = useState(false)
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const [adFormSubmitted, setAdFormSubmitted] = useState(false)
  const [isBrochureUnlocked, setIsBrochureUnlocked] = useState(false)
  const [showQrScannerModal, setShowQrScannerModal] = useState(false)
  const [isScanningActive, setIsScanningActive] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState<string>('/brochure-qr.png')
  const [adSector, setAdSector] = useState('')
  const [adSectorOther, setAdSectorOther] = useState('')
  const [adMediaFormats, setAdMediaFormats] = useState<string[]>([])
  const [adDuration, setAdDuration] = useState('')
  const [adDurationSpecific, setAdDurationSpecific] = useState('')
  const [adFileName, setAdFileName] = useState('')

  useEffect(() => {
    const brochureUrl = typeof window !== 'undefined' ? `${window.location.origin}/Brochure_UKSD_2026.pdf` : '/Brochure_UKSD_2026.pdf'
    QRCode.toDataURL(brochureUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#170F08',
        light: '#FFFFFF'
      }
    }).then(url => {
      setQrDataUrl(url)
    }).catch(() => {
      setQrDataUrl('/brochure-qr.png')
    })
  }, [])

  const handleWwuSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: Record<string, any> = {
      'Applicant Name': formData.get('fullName'),
      'Email Address': formData.get('email'),
      'Phone Number': formData.get('phone'),
      'City / Region': formData.get('city'),
      'Areas of Expertise': wwuExpertise.join(', '),
      'Experience Level': wwuExperience,
      'Team Size': wwuTeamSize,
      'Other Skills': wwuOther,
      'Availability Timeline': formData.get('timeline'),
      'Estimated Budget': formData.get('budget'),
      'Additional Comments': formData.get('comments'),
    }
    sendSubmissionToEmail('Work With Us Application', data)
    setWwuSubmitted(true)
  }

  const handleSponsorshipSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: Record<string, any> = {
      'Full Name': formData.get('name'),
      'Email Address': formData.get('email'),
      'Phone Number': formData.get('phone'),
      'Company / Brand Name': formData.get('company'),
      'Message / Sponsorship Interest': formData.get('message'),
    }
    sendSubmissionToEmail('Sponsorship Inquiry', data)
    setSponsorshipSubmitted(true)
  }

  const handleAdFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: Record<string, any> = {
      'Company / Brand Name': formData.get('companyName'),
      'Contact Person Name': formData.get('contactPerson'),
      'Designation / Title': formData.get('designation'),
      'Phone Number': formData.get('phone'),
      'Email Address': formData.get('email'),
      'Business Address / City': formData.get('address'),
      'Business Sector': adSector === 'Other' ? `Other: ${adSectorOther}` : adSector,
      'Preferred Media Formats': adMediaFormats.join(', '),
      'Placement Duration': adDuration === 'Specific Days Only' ? `Specific Days: ${adDurationSpecific}` : adDuration,
      'Estimated Budget': formData.get('budgetRange'),
      'Uploaded File': adFileName || 'No file attached',
      'Special Requests / Notes': formData.get('specialRequests'),
    }
    sendSubmissionToEmail('Festival Advertisement Booking', data)
    setAdFormSubmitted(true)
  }

  const handlePrivilegeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: Record<string, any> = {
      'Applicant Name': formData.get('name'),
      'Email Address': formData.get('email'),
      'Phone Number': formData.get('phone'),
      'Address': formData.get('address'),
      'No. of Guests': formData.get('guests'),
      'Date of Visit': formData.get('visitDate'),
      'Time Slot': formData.get('timeSlot'),
      'Priority Reason': formData.get('reason'),
    }
    sendSubmissionToEmail('Privileged Entry Request', data)
    setPrivilegeSubmitted(true)
  }

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('newsletterEmail') as string
    if (email) {
      sendSubmissionToEmail('Newsletter Subscriber', { 'Subscriber Email': email })
      setNewsletterSubmitted(true)
    }
  }

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [playlistOpen, setPlaylistOpen] = useState(false)
  const [volume, setVolume] = useState(0.85)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const tick = () => {
      const dist = PUJA_DATE.getTime() - Date.now()
      if (dist < 0) return
      setTimeLeft({ days: Math.floor(dist / 86400000), hours: Math.floor((dist % 86400000) / 3600000), minutes: Math.floor((dist % 3600000) / 60000), seconds: Math.floor((dist % 60000) / 1000) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])



  useEffect(() => {
    if (lightbox || logoZoomed) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox, logoZoomed])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLogoZoomed(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) return
    if (audioPlaying) {
      audioRef.current.pause()
      setAudioPlaying(false)
    } else {
      audioRef.current.volume = volume
      audioRef.current.play().catch(() => { })
      setAudioPlaying(true)
    }
  }

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index)
    setAudioPlaying(true)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume
        audioRef.current.play().catch(() => { })
      }
    }, 50)
  }

  const handleTrackEnded = () => {
    if (currentTrackIndex !== 0) {
      nextTrack()
    }
  }

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % FESTIVE_PLAYLIST.length
    playTrack(nextIdx)
  }

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + FESTIVE_PLAYLIST.length) % FESTIVE_PLAYLIST.length
    playTrack(prevIdx)
  }

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol)
    if (audioRef.current) {
      audioRef.current.volume = newVol
    }
  }

  const toggleExpertise = (item: string) => {
    setWwuExpertise(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item])
  }

  const filtered = galleryYear === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(g => g.year === galleryYear)
  const NAV_ITEMS = ['About', 'Schedule', 'Gallery', 'Pandal Route', 'Subhechha Wall', 'Social Media', 'Work With Us', 'Sponsorship', 'Advertise With Us', 'Priviledge Form', 'Awards & Achievements', 'Contact']

  const [selectedPujaId, setSelectedPujaId] = useState('uksd')
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('uksd_digital_wishes')
      return saved ? JSON.parse(saved) : INITIAL_WISHES
    } catch (err) {
      return INITIAL_WISHES
    }
  })
  const [wishName, setWishName] = useState('')
  const [wishLocation, setWishLocation] = useState('')
  const [wishMessage, setWishMessage] = useState('')
  const [wishFilter, setWishFilter] = useState<'All' | 'Kolkata' | 'NRI'>('All')
  const [likedWishIds, setLikedWishIds] = useState<string[]>([])

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!wishName.trim() || !wishMessage.trim()) {
      alert('Please enter your name and festive wish message.')
      return
    }

    const newWish = {
      id: 'w-' + Date.now(),
      name: wishName.trim(),
      location: wishLocation.trim() || 'Kolkata, West Bengal',
      message: wishMessage.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 1,
      isNri: /usa|uk|japan|australia|canada|germany|london|york|singapore|dubai/i.test(wishLocation)
    }

    const updated = [newWish, ...wishes]
    setWishes(updated)
    try {
      localStorage.setItem('uksd_digital_wishes', JSON.stringify(updated))
    } catch (err) { }

    sendSubmissionToEmail('Digital Wishbook Greeting', {
      Name: wishName,
      Location: wishLocation || 'Kolkata',
      Message: wishMessage
    })

    setWishName('')
    setWishLocation('')
    setWishMessage('')
    alert('🪔 Subho Sharadiya! Your festive greeting has been lit on the Digital Wishbook Wall!')
  }

  const handleLikeWish = (id: string) => {
    if (likedWishIds.includes(id)) return
    setLikedWishIds(prev => [...prev, id])
    const updated = wishes.map((w: any) => w.id === id ? { ...w, likes: w.likes + 1 } : w)
    setWishes(updated)
    try {
      localStorage.setItem('uksd_digital_wishes', JSON.stringify(updated))
    } catch (err) { }
  }

  return (
    <div style={{ fontFamily: FONT_BODY, backgroundColor: C.bg, color: C.cream, minHeight: '100vh' }}>

      {/* Hidden audio */}
      <audio ref={audioRef} src={FESTIVE_PLAYLIST[currentTrackIndex].src} loop={currentTrackIndex === 0} onEnded={handleTrackEnded} preload="auto" />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        transition: 'background 0.35s, border-color 0.35s',
        background: scrolled ? 'rgba(15,9,4,0.97)' : 'rgba(15,9,4,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${C.border}`
      }}>
        {/* Top Header Row */}
        <div className="navbar-header-row" style={{ maxWidth: 1400, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo & Stacked Title */}
          <div onClick={() => setLogoZoomed(true)} title="Click to view full logo" style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}>
            <img src={logoImg} alt="Uttar Kalikata Sarbojanin Durgotsav Samity logo" style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 0 20px rgba(196,30,58,0.55), 0 0 10px rgba(212,160,23,0.3)', border: `2px solid ${C.borderBright}`, transition: 'transform 0.25s, box-shadow 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.15 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: '0.08em' }}>UTTAR</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: '0.08em' }}>KALIKATA</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: '0.08em' }}>SARBOJANIN</span>
              <span style={{ fontFamily: FONT_SERIF, fontSize: 10, fontWeight: 600, color: C.saffron, letterSpacing: '0.14em' }}>DURGOTSAV</span>
              <span style={{ fontFamily: FONT_SERIF, fontSize: 10, fontWeight: 600, color: C.saffron, letterSpacing: '0.14em' }}>SAMITY</span>
            </div>
          </div>

          {/* Dynamic Flex Bengali Welcome Header Banner (Hidden on small mobile screens to prevent overflow) */}
          <div className="hidden lg:flex" style={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            flex: '1 1 auto',
            maxWidth: 580,
            margin: '0 12px',
            padding: '6px 16px',
            borderRadius: 30,
            background: 'linear-gradient(90deg, rgba(196,30,58,0.18) 0%, rgba(212,160,23,0.22) 50%, rgba(196,30,58,0.18) 100%)',
            border: `1px solid ${C.borderBright}`,
            boxShadow: '0 0 16px rgba(212,160,23,0.2), inset 0 0 10px rgba(196,30,58,0.1)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: 16, filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.6))' }}>🪔</span>
            <span style={{
              fontFamily: FONT_BENGALI,
              fontSize: 'clamp(14px, 1.6vw, 20px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FDF6E3 0%, #D4A017 45%, #E8721C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.04em',
              lineHeight: 1.25,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>
              উত্তর কলিকাতা সার্বজনীনে আপনাদের স্বাগত
            </span>
            <span style={{ fontSize: 16, filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.6))' }}>🌺</span>
          </div>

          {/* Social Icons & Mobile Toggle */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="hidden sm:flex" style={{ gap: 8, alignItems: 'center' }}>
              {[
                { sym: 'f', title: 'Facebook', url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/' },
                { sym: '◉', title: 'Instagram', url: 'https://www.instagram.com/uttar_kalikata_sarbojanin' },
                { sym: '▶', title: 'YouTube', url: 'https://www.youtube.com/@UttarKalikataSarbojanin' }
              ].map(s => (
                <a key={s.title} href={s.url} target="_blank" rel="noopener noreferrer" title={s.title} style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${C.border}`, background: 'transparent', color: C.gold, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.gold; (e.currentTarget as HTMLAnchorElement).style.color = C.bg }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = C.gold }}
                >{s.sym}</a>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="xl:hidden"
              aria-label="Toggle Menu"
              style={{
                background: 'rgba(212,160,23,0.12)',
                border: `1px solid ${C.borderBright}`,
                borderRadius: 8,
                color: C.gold,
                fontSize: 20,
                cursor: 'pointer',
                padding: '6px 12px',
                marginRight: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                transition: 'all 0.2s'
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Header Row: Dynamic Bengali Welcome Banner */}
        <div className="flex lg:hidden" style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: '6px 14px 8px',
          borderTop: '1px solid rgba(212,160,23,0.15)',
          background: 'rgba(10,5,2,0.85)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            maxWidth: 420,
            padding: '5px 12px',
            borderRadius: 24,
            background: 'linear-gradient(90deg, rgba(196,30,58,0.2) 0%, rgba(212,160,23,0.25) 50%, rgba(196,30,58,0.2) 100%)',
            border: `1px solid ${C.borderBright}`,
            boxShadow: '0 0 14px rgba(212,160,23,0.18), inset 0 0 8px rgba(196,30,58,0.1)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: 14, filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.6))' }}>🪔</span>
            <span style={{
              fontFamily: FONT_BENGALI,
              fontSize: 'clamp(12px, 3.8vw, 15px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FDF6E3 0%, #D4A017 45%, #E8721C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.02em',
              lineHeight: 1.25,
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap'
            }}>
              উত্তর কলিকাতা সার্বজনীনে আপনাদের স্বাগত
            </span>
            <span style={{ fontSize: 14, filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.6))' }}>🌺</span>
          </div>
        </div>

        {/* Dedicated Bottom Navigation Bar for Desktop (xl screens) */}
        <div className="hidden xl:block" style={{ borderTop: `1px solid ${C.border}`, background: 'rgba(10,5,2,0.92)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, height: 42 }}>
            {NAV_ITEMS.map(item => (
              <a key={item} href={navHref(item)} style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.12em', color: C.creamFaint, textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap', position: 'relative', padding: '10px 0' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.gold }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.creamFaint }}
              >{item.toUpperCase()}</a>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {menuOpen && (
          <div style={{ background: 'rgba(15,9,4,0.98)', borderTop: `1px solid ${C.border}`, padding: '12px 24px 24px', maxHeight: '80vh', overflowY: 'auto' }}>
            {NAV_ITEMS.map(item => (
              <a key={item} href={navHref(item)} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0', fontFamily: FONT_SERIF, fontSize: 13, letterSpacing: '0.12em', color: C.creamFaint, textDecoration: 'none', borderBottom: `1px solid ${C.border}` }}>
                {item.toUpperCase()}
              </a>
            ))}
            <div style={{ display: 'flex', gap: 12, marginTop: 18, alignItems: 'center' }}>
              {[
                { sym: 'f', title: 'Facebook', url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/' },
                { sym: '◉', title: 'Instagram', url: 'https://www.instagram.com/uttar_kalikata_sarbojanin' },
                { sym: '▶', title: 'YouTube', url: 'https://www.youtube.com/@UttarKalikataSarbojanin' }
              ].map(s => (
                <a key={s.title} href={s.url} target="_blank" rel="noopener noreferrer" title={s.title} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${C.border}`, background: 'transparent', color: C.gold, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.sym}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        <div className="hero-backdrop-container">
          {/* Desktop Backdrop: Keeps existing desktop backdrop intact */}
          <img src="/onebg.jpeg" alt="Elaborate Durga Puja idol" className="hero-backdrop-img hero-backdrop-desktop hidden sm:block" />
          {/* Mobile Backdrop: Dedicated mobile composition */}
          <img src="/mobile_hero_bg.png" alt="Durga Puja Pratima mobile backdrop" className="hero-backdrop-img hero-backdrop-mobile block sm:hidden" />
        </div>
        {/* Terracotta-clay vignette */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 15%, rgba(212,160,23,0.18) 0%, rgba(139,90,43,0.12) 40%, transparent 70%)` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,9,4,0.3) 0%, rgba(15,9,4,0.12) 30%, rgba(15,9,4,0.65) 70%, rgba(15,9,4,0.98) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.045, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='72' height='72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 4 L68 36 L36 68 L4 36 Z' fill='none' stroke='%23D4A017' stroke-width='1'/%3E%3C/svg%3E\")", backgroundSize: '72px 72px' }} />

        {/* ── 2-HALF HORIZONTAL PARTING THEATRE CURTAIN OVERLAY ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 40,
          pointerEvents: curtainRaised ? 'none' : 'auto',
          overflow: 'hidden',
          cursor: curtainRaised ? 'default' : 'pointer'
        }} onClick={() => !curtainRaised && setCurtainRaised(true)}>

          {/* Top Stage Pelmet Decorative Header */}
          <div className="theater-pelmet-header" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 75,
            zIndex: 44,
            transform: curtainRaised ? 'translateY(-100%)' : 'translateY(0%)',
            transition: 'transform 5.5s cubic-bezier(0.25, 1, 0.4, 1)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 6
          }}>
            <div style={{ display: 'flex', gap: 16 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ width: 14, height: 18, background: 'linear-gradient(180deg, #FCE205 0%, #D4A017 100%)', clipPath: 'polygon(50% 100%, 0 0, 100% 0)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.7))' }} />
              ))}
            </div>
          </div>

          {/* Dual Parting Curtain Panels (Left Half & Right Half) */}
          <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
            {/* Left Curtain Half (0% to 50%) */}
            <div className="curtain-panel-left" style={{
              width: '50.05%',
              height: '100%',
              position: 'relative',
              zIndex: 42,
              transform: curtainRaised ? 'translateX(-100%)' : 'translateX(0%)',
              transition: 'transform 6.5s cubic-bezier(0.25, 1, 0.4, 1)',
              borderRight: '3px solid #D4A017',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              {/* Vertical Gold Fringe Seam on the Right edge */}
              <div className="gold-fringe-bottom" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 6 }} />
              {/* Bottom Gold Fringe */}
              <div className="gold-fringe-bottom" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 16 }} />
            </div>

            {/* Right Curtain Half (50% to 100%) */}
            <div className="curtain-panel-right" style={{
              width: '50.05%',
              height: '100%',
              position: 'relative',
              zIndex: 42,
              transform: curtainRaised ? 'translateX(100%)' : 'translateX(0%)',
              transition: 'transform 6.5s cubic-bezier(0.25, 1, 0.4, 1)',
              borderLeft: '3px solid #D4A017',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              {/* Vertical Gold Fringe Seam on the Left edge */}
              <div className="gold-fringe-bottom" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6 }} />
              {/* Bottom Gold Fringe */}
              <div className="gold-fringe-bottom" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 16 }} />
            </div>

            {/* Center Golden Badge Motif */}
            {!curtainRaised && (
              <div className="curtain-center-badge" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 45,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14
              }}>
                <div style={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #FFF 0%, #FCE205 30%, #D4A017 70%, #8B6508 100%)',
                  border: '4px solid #8B0000',
                  boxShadow: '0 0 45px rgba(212,160,23,0.95), 0 0 25px rgba(196,30,58,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 44,
                  animation: 'shimmer 1.8s infinite ease-in-out'
                }}>
                  🔱
                </div>
                <span style={{
                  fontFamily: FONT_SERIF,
                  color: C.gold,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  background: 'rgba(15,9,4,0.94)',
                  padding: '10px 24px',
                  borderRadius: 30,
                  border: `1.5px solid ${C.gold}`,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.95)',
                  textTransform: 'uppercase'
                }}>
                  ✨ TAP TO OPEN CURTAINS ✨
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="hero-content-wrapper" style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '140px 24px 0', width: '100%' }}>
          <SectionLabelLeft>Est. 1932 · North Kolkata · West Bengal</SectionLabelLeft>
          <h1 style={{
            fontFamily: FONT_BENGALI,
            fontSize: 'clamp(36px, 7.5vw, 84px)',
            fontWeight: 800,
            color: C.gold,
            lineHeight: 1.1,
            margin: '0 0 8px',
            textShadow: '0 4px 28px rgba(0,0,0,0.95), 0 0 35px rgba(212,160,23,0.5)',
            animation: 'fadeInUp 0.9s ease both'
          }}>
            উত্তর কলিকাতা সার্বজনীন
          </h1>
          <div style={{
            fontFamily: FONT_BENGALI,
            fontSize: 'clamp(22px, 4vw, 44px)',
            fontWeight: 800,
            margin: '0 0 20px',
            textShadow: '0 4px 22px rgba(0,0,0,0.9)',
            animation: 'fadeInUp 1s ease 0.1s both'
          }}>
            <span style={{ color: C.cream, textShadow: '0 0 20px rgba(253,246,227,0.4)' }}>দুর্গোৎসব</span>{' '}
            <span style={{ color: C.crimson, filter: 'drop-shadow(0 2px 10px rgba(196,30,58,0.7))' }}>সমিতি</span>
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(11px, 2vw, 16px)', color: C.saffron, marginBottom: 22, letterSpacing: '0.06em', animation: 'fadeInUp 1s ease 0.2s both' }}>95th Year Celebrations · Mahalaya Special 2026</div>
          <p style={{ fontSize: 15, color: C.creamFaint, lineHeight: 1.85, maxWidth: 520, marginBottom: 36, animation: 'fadeInUp 1s ease 0.3s both' }}>
            Over nine decades of devotion, art, and community spirit. One of North Kolkata&#39;s most celebrated Durga Puja committees, bringing the divine to every heart since 1932.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48, animation: 'fadeInUp 1s ease 0.4s both' }}>
            <a href="#about" style={{ display: 'inline-block', padding: '13px 36px', background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`, color: C.cream, fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.18em', textDecoration: 'none', boxShadow: '0 4px 24px rgba(196,30,58,0.45)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 36px rgba(196,30,58,0.65)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 24px rgba(196,30,58,0.45)' }}
            >OUR LEGACY</a>
            <a href="#gallery" style={{ display: 'inline-block', padding: '12px 36px', background: 'transparent', color: C.gold, fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.18em', textDecoration: 'none', border: `1px solid ${C.gold}`, transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.gold; (e.currentTarget as HTMLAnchorElement).style.color = C.bg }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = C.gold }}
            >VIEW GALLERY</a>
          </div>

          {/* Home page craft pointers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, maxWidth: 640, animation: 'fadeInUp 1s ease 0.5s both' }}>
            {[
              { icon: '🏺', title: 'Encouraging Craftsmanship', desc: 'We champion traditional Bengali artisans — from clay modellers to shola craftsmen — ensuring their ancient skills are preserved, celebrated, and passed to the next generation.' },
              { icon: '🎨', title: 'Promotion of Installation Art', desc: 'Every Puja, our committee transforms the neighbourhood into an open-air gallery, commissioning large-scale installations that redefine what a pandal can be as a living artwork.' },
            ].map(pt => (
              <div key={pt.title} style={{ background: 'rgba(20,12,6,0.75)', border: `1px solid ${C.border}`, backdropFilter: 'blur(10px)', padding: '20px 22px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{pt.icon}</span>
                <div>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 12, color: C.gold, letterSpacing: '0.1em', marginBottom: 6 }}>{pt.title.toUpperCase()}</div>
                  <p style={{ fontSize: 13, color: C.creamMuted, lineHeight: 1.7, margin: 0 }}>{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown bar */}
        <div style={{ position: 'relative', marginTop: 48, background: 'linear-gradient(135deg, rgba(92,58,30,0.94), rgba(139,0,0,0.9), rgba(196,30,58,0.86))', backdropFilter: 'blur(10px)', borderTop: `1px solid ${C.borderBright}` }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.22em', color: C.gold }}>🔱 &nbsp;MAHA PANCHAMI · OCT 16, 2026</div>
            <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
              {[{ v: timeLeft.days, l: 'Days' }, { v: timeLeft.hours, l: 'Hours' }, { v: timeLeft.minutes, l: 'Min' }, { v: timeLeft.seconds, l: 'Sec' }].map(({ v, l }, i) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: i < 3 ? 28 : 0 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, color: C.cream, lineHeight: 1 }}>{String(v).padStart(2, '0')}</div>
                    <div style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(253,246,227,0.55)', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
                  </div>
                  {i < 3 && <span style={{ color: C.gold, fontSize: 22, opacity: 0.6, marginLeft: -14 }}>:</span>}
                </div>
              ))}
            </div>
            <a href="#schedule" style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.18em', color: C.gold, textDecoration: 'none', borderBottom: `1px solid ${C.border}`, paddingBottom: 2, transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.cream }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.gold }}
            >VIEW SCHEDULE →</a>
          </div>
        </div>
      </section>

      {/* ── NEWS TICKER ── */}
      <div style={{ background: C.gold, padding: '9px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 40s linear infinite' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((text, i) => (
            <span key={i} style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.1em', color: C.bg, whiteSpace: 'nowrap', paddingRight: 80, flexShrink: 0 }}>{text}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '100px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 72, alignItems: 'center' }}>
          <div>
            <SectionLabelLeft>Our Story</SectionLabelLeft>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 26 }}>
              Nine Decades of<br /><span style={{ color: C.crimson }}>Devotion & Art</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: C.creamFaint, marginBottom: 18 }}>
              Founded in 1932 by the passionate residents of North Kolkata, Uttar Kalikata Sarbojanin Durgotsav Samity has grown from a humble neighbourhood gathering into one of the city&#39;s most prestigious Durga Puja committees.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: C.creamFaint, marginBottom: 36 }}>
              Our pandal is renowned not just for its spectacular artistic installations but for the warmth of community it fosters — where every visitor becomes family. Over 94 years, we have received numerous state-level awards for pandal decoration, idol artistry, and cultural programming.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 36 }}>
              {[{ n: '94+', l: 'Years of Celebration', h: '#' }, { n: '6', l: 'State Awards Won', h: '#awards' }, { n: '50K+', l: 'Daily Visitors', h: '#' }, { n: '50+', l: 'Volunteers', h: '#' }].map(({ n, l, h }) => (
                <a key={l} href={h} style={{ textDecoration: 'none', borderLeft: `2px solid ${C.crimson}`, paddingLeft: 16, display: 'block', transition: 'transform 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(0)' }}
                >
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 12, color: C.creamMuted, marginTop: 4 }}>{l}</div>
                </a>
              ))}
            </div>
            <a href="#schedule" style={{ display: 'inline-block', padding: '12px 32px', border: `1px solid ${C.crimson}`, color: C.crimson, fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.18em', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.crimson; (e.currentTarget as HTMLAnchorElement).style.color = C.cream }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = C.crimson }}
            >SEE THIS YEAR&#39;S PROGRAMME</a>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', overflow: 'hidden', background: C.crimsonDeep }}>
              <img src="https://images.unsplash.com/photo-1760344654401-43c9fac457ff?w=600&h=780&fit=crop&auto=format" alt="Devotees offering prayers to Goddess Durga during Puja" style={{ width: '100%', display: 'block', transition: 'transform 0.5s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,9,4,0.6) 0%, transparent 50%)' }} />
            </div>
            <div style={{ position: 'absolute', bottom: -18, right: -18, background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`, padding: '18px 22px', textAlign: 'center', boxShadow: '0 8px 32px rgba(196,30,58,0.55)' }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700, color: C.gold }}>1932</div>
              <div style={{ fontSize: 10, letterSpacing: '0.22em', color: C.cream, textTransform: 'uppercase' }}>Est. Since</div>
            </div>
            <div style={{ position: 'absolute', top: -18, left: -18, border: `1px solid ${C.border}`, width: 80, height: 80 }} />
          </div>
        </div>
      </section>

      {/* ── AWARDS & ACHIEVEMENTS ── */}
      <section id="awards" style={{ padding: '90px 24px', borderTop: `1px solid ${C.border}`, background: 'rgba(139,0,0,0.03)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>Honours & Recognition</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(26px, 4.5vw, 44px)', fontWeight: 700 }}>
              Awards & <span style={{ color: C.gold }}>Achievements</span>
            </h2>
            <p style={{ fontSize: 15, color: C.creamFaint, maxWidth: 680, margin: '14px auto 0', lineHeight: 1.85 }}>
              Recognized state-wide for extraordinary artistic installations, traditional craftsmanship, cultural heritage, and exemplary community service.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              {
                img: '/IMG_20260827_161347.jpg.jpeg',
                icon: '🏆',
                year: 'Bishesh Sanman',
                title: 'ABP ANANDA SHARAD ANANDA SANMAN 2025-BISHESH SANMAN',
              },
              {
                img: '/IMG_20260827_162254.jpg.jpeg',
                icon: '🏆',
                year: 'Media & Excellence',
                title: 'R.BANGLA DASHABHUJA 2025',
              },
              {
                img: '/IMG_20260827_161555.jpg.jpeg',
                icon: '🏆',
                year: 'Sera Bhabna Honor',
                title: 'ONKAR SHREE SHARAD SANMAN 2025-SERA BHABNA',
              },
              {
                img: '/IMG_20260827_161954.jpg.jpeg',
                icon: '🏆',
                year: 'Bochor Er Sera Pujo',
                title: 'UTKARSHANI SANMAN-2025-BOCHOR ER SERA PUJO',
              },
              {
                img: '/IMG_20260827_161750.jpg.jpeg',
                icon: '🏆',
                year: 'Bochor Er Sera Pujo',
                title: 'UTKARSHANI SANMAN-2025-BOCHOR ER SERA PUJO',
              },
              {
                img: '/IMG_20260827_162347.jpg.jpeg',
                icon: '🏆',
                year: 'Sustainable Honor',
                title: 'ROTARY INTERNATIONAL DISTRICT - SHARAD UTSAV SUSTAINABLE AWARD 2025',
              },
              {
                img: '/IMG_20260827_162112.jpg.jpeg',
                icon: '🏆',
                year: 'Artistic Excellence',
                title: 'GALAXY OF ART SHARAD SANMAN 2025',
              },
            ].map((award) => (
              <div key={award.img} style={{
                border: `1px solid ${C.border}`,
                background: 'rgba(15,9,4,0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: 12,
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s, border-color 0.3s',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.gold; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
              >
                {/* Award Photo Banner */}
                {award.img && (
                  <div
                    onClick={() => setLightbox(award.img!)}
                    style={{
                      position: 'relative',
                      height: 260,
                      width: '100%',
                      overflow: 'hidden',
                      cursor: 'zoom-in',
                      background: 'radial-gradient(circle at center, #1f0b07 0%, #0a0304 100%)',
                      borderBottom: `1px solid ${C.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 12
                    }}
                    title="Click to view full high-resolution award photo"
                  >
                    <img
                      src={award.img}
                      alt={award.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: 6,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'rgba(15,9,4,0.85)',
                      border: `1px solid ${C.gold}`,
                      color: C.gold,
                      fontSize: 10,
                      fontFamily: FONT_SERIF,
                      letterSpacing: '0.12em',
                      padding: '4px 10px',
                      borderRadius: 20,
                      backdropFilter: 'blur(6px)',
                      gap: 5,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.6)'
                    }}>
                      <span>🔍</span> ENLARGE
                    </div>
                  </div>
                )}

                {/* Card Content Body */}
                <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 24 }}>{award.icon}</span>
                    <span style={{ fontFamily: FONT_SERIF, fontSize: 10, letterSpacing: '0.16em', color: C.saffron, textTransform: 'uppercase', background: 'rgba(232,114,28,0.12)', border: '1px solid rgba(232,114,28,0.3)', padding: '3px 9px', borderRadius: 4 }}>
                      {award.year}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: C.gold, lineHeight: 1.4, fontWeight: 700 }}>
                    {award.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRAND THEMES SUBSECTION ── */}
      <section style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}`, background: 'linear-gradient(180deg, rgba(92,58,30,0.10), rgba(15,9,4,0.65))' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>Our Art</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700 }}>
              Grand <span style={{ color: C.crimson }}>Themes</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32 }}>

            {/* 2025 Theme Card */}
            <div style={{ border: `1px solid ${C.border}`, overflow: 'hidden', background: 'rgba(255,255,255,0.015)', position: 'relative' }}>
              <div style={{ background: `linear-gradient(135deg, ${C.crimsonDeep}, #3A0010)`, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.22em', color: C.gold, textTransform: 'uppercase' }}>Puja 2025 · Grand Theme</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: C.saffron }}>94th Year</div>
              </div>

              {/* Artist image — aspect-ratio keeps face fully framed */}
              <div style={{ position: 'relative', aspectRatio: '4 / 5', background: C.crimsonDeep, overflow: 'hidden' }}>
                <img src={shambhuImg} alt="Artist Shambhu Saha" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,9,4,0.85) 0%, rgba(15,9,4,0.2) 60%, transparent 100%)' }} />
                {/* Artist caption block */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', borderTop: `2px solid ${C.gold}`, background: 'rgba(15,9,4,0.7)' }}>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 10, letterSpacing: '0.22em', color: C.gold, marginBottom: 3 }}>ARTIST</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: C.cream, letterSpacing: '0.05em' }}>SHAMBHU SAHA</div>
                </div>
              </div>

              <div style={{ padding: '28px 24px 32px' }}>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 900, color: C.gold, marginBottom: 6, lineHeight: 1.2 }}>
                  মহা আলয়ে মা
                </h3>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 13, color: C.saffron, marginBottom: 4, letterSpacing: '0.05em' }}>[ এবার শুধু ভদ্র কথা ]</div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 12, color: C.creamMuted, marginBottom: 16, letterSpacing: '0.08em' }}>Maha Aloy -e Maa</div>
                <div style={{ width: 32, height: 1, background: C.crimson, marginBottom: 16 }} />
                <p style={{ fontSize: 14, lineHeight: 1.85, color: C.creamFaint }}>
                  For the first time in North Kolkata, this celebration pays a heartfelt tribute to the legendary Birendra Krishna Bhadra right in his own neighbourhood. Reimagining his timeless legacy and nostalgic era, the theme honours the iconic voice that defines Mahalaya, surrounding the divine homecoming of Maa Durga with reverence, elegance, and pure cultural heritage.
                </p>
              </div>
            </div>

            {/* 2026 Theme Card */}
            <div style={{ border: `1px solid ${C.borderBright}`, overflow: 'hidden', background: 'rgba(212,160,23,0.03)', position: 'relative', boxShadow: `0 0 40px rgba(212,160,23,0.08)` }}>
              <div style={{ background: `linear-gradient(135deg, #2A1800, #4A2800)`, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.22em', color: C.gold, textTransform: 'uppercase' }}>Puja 2026 · Grand Theme</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: C.saffron }}>95th Year</div>
              </div>

              {/* Artist image */}
              <div style={{ position: 'relative', aspectRatio: '4 / 5', background: '#1A0C00', overflow: 'hidden' }}>
                <img src="/thumbnails/Gemini_Generated_Image_uy7i7euy7i7euy7i.png" alt="Artist Dhiman Sutar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,9,4,0.85) 0%, rgba(15,9,4,0.2) 60%, transparent 100%)' }} />
                {/* Artist caption block */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', borderTop: `2px solid ${C.gold}`, background: 'rgba(15,9,4,0.7)' }}>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 10, letterSpacing: '0.22em', color: C.gold, marginBottom: 3 }}>ARTIST</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: C.cream, letterSpacing: '0.05em' }}>DHIMAN SUTAR</div>
                </div>
              </div>

              <div style={{ padding: '28px 24px 32px' }}>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 900, color: C.gold, marginBottom: 6, lineHeight: 1.2 }}>
                  জল ছাপের কলিকাতা
                </h3>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 12, color: C.creamMuted, marginBottom: 16, letterSpacing: '0.08em' }}>Jol Chhaper Kolikata</div>
                <div style={{ width: 32, height: 1, background: C.gold, marginBottom: 16 }} />
                <div style={{ display: 'inline-block', border: `1px solid ${C.borderBright}`, padding: '10px 22px', textAlign: 'center' }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: C.saffron, letterSpacing: '0.05em' }}>COMING SOON... TO BE ANNOUNCED</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}`, background: 'linear-gradient(180deg, rgba(139,0,0,0.05), rgba(92,58,30,0.06))' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>Our Purpose</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700 }}>
              Vision & <span style={{ color: C.crimson }}>Mission</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`, padding: 36, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: `linear-gradient(to bottom, ${C.crimson}, ${C.gold})` }} />
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: C.gold, letterSpacing: '0.18em', marginBottom: 16, paddingLeft: 12 }}>OUR VISION</div>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: C.creamFaint, paddingLeft: 12 }}>
                To uphold the sanctity, cultural grandeur, and inclusive spirit of Maa Durga&#39;s worship in North Kolkata — ensuring that every resident, irrespective of age, background, or belief, can experience the divine joy of our community celebration.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 12, marginTop: 20 }}>
                <div style={{ width: 28, height: 1, background: C.gold }} />
                <span style={{ fontFamily: FONT_SERIF, fontSize: 11, color: C.gold, letterSpacing: '0.2em' }}>COMMUNITY · CULTURE · DEVOTION</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`, padding: 36, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: `linear-gradient(to bottom, ${C.gold}, ${C.saffron})` }} />
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: C.gold, letterSpacing: '0.18em', marginBottom: 20, paddingLeft: 12 }}>OUR MISSION</div>
              <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: '🏛️', text: 'Preserve and promote the authentic Bengali cultural traditions of Durga Puja as recognised by UNESCO Intangible Cultural Heritage.' },
                  { icon: '🤝', text: 'Remain entirely apolitical and non-partisan — our Puja is organised purely by local residents, free from any political affiliation or influence.' },
                  { icon: '👨‍👩‍👧‍👦', text: 'Empower both junior and senior members of our locality to actively participate in planning, organisation, and celebration.' },
                  { icon: '🌿', text: 'Celebrate responsibly with eco-friendly pandal construction, natural idol materials, and minimal environmental impact.' },
                  { icon: '❤️', text: 'Serve the underprivileged — distributing free bhog prasad, supporting local artisans, and donating to charitable causes.' },
                ].map((pt, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.4 }}>{pt.icon}</span>
                    <p style={{ fontSize: 14, lineHeight: 1.75, color: C.creamFaint, margin: 0 }}>{pt.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: `linear-gradient(135deg, rgba(196,30,58,0.08), rgba(212,160,23,0.05))`, border: `1px solid ${C.border}`, padding: 36, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: `linear-gradient(to bottom, ${C.saffron}, ${C.crimson})` }} />
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: C.gold, letterSpacing: '0.18em', marginBottom: 20, paddingLeft: 12 }}>CORE VALUES</div>
              <div style={{ paddingLeft: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { val: 'Inclusivity', desc: 'Open to all — no barriers of religion, caste, or creed' },
                  { val: 'Transparency', desc: 'Community-led accounts and open committee meetings' },
                  { val: 'Apolitical', desc: 'Zero political influence in all decisions and events' },
                  { val: 'Youth First', desc: 'Junior members lead key roles in every Puja' },
                  { val: 'Heritage', desc: 'Authentic rituals observed with full devotion' },
                  { val: 'Solidarity', desc: 'Residents united as one family for five days' },
                ].map(({ val, desc }) => (
                  <div key={val} style={{ borderLeft: '2px solid rgba(212,160,23,0.3)', paddingLeft: 12 }}>
                    <div style={{ fontFamily: FONT_SERIF, fontSize: 13, color: C.gold, marginBottom: 4 }}>{val}</div>
                    <div style={{ fontSize: 12, color: C.creamMuted, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section id="schedule" style={{ padding: '100px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <SectionLabel>Programme</SectionLabel>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700 }}>
            Puja <span style={{ color: C.crimson }}>Schedule</span> 2026
          </h2>
        </div>
        <div className="schedule-tabs-container" style={{ display: 'flex', gap: 3, marginBottom: 36, overflowX: 'auto', paddingBottom: 6 }}>
          {SCHEDULE.map((d, i) => (
            <button key={d.day} onClick={() => setActiveDay(i)} style={{ flexShrink: 0, padding: '9px 18px', border: 'none', cursor: 'pointer', fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.12em', transition: 'all 0.2s', background: activeDay === i ? C.crimson : 'rgba(255,255,255,0.04)', color: activeDay === i ? C.cream : C.creamMuted, borderBottom: `2px solid ${activeDay === i ? C.gold : 'transparent'}` }}>
              {d.day}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32, alignItems: 'start' }}>
          <div style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: C.gold, marginBottom: 6 }}>{SCHEDULE[activeDay].day}</div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 13, color: C.saffron, marginBottom: 20 }}>{SCHEDULE[activeDay].date}</div>
            <div style={{ width: 32, height: 1, background: C.crimson, marginBottom: 18 }} />
            <p style={{ fontSize: 13, color: C.creamMuted, lineHeight: 1.8 }}>All events open to the public. Traditional dress encouraged. Bhog prasad served from 1 PM daily at no charge.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SCHEDULE[activeDay].events.map((evt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 20px', background: 'rgba(255,255,255,0.02)', borderLeft: '2px solid rgba(212,160,23,0.15)', transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = C.crimson; (e.currentTarget as HTMLDivElement).style.background = 'rgba(196,30,58,0.07)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'rgba(212,160,23,0.15)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)' }}
              >
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.gold, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: C.creamFaint, lineHeight: 1.5 }}>{evt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={{ padding: '100px 24px', background: 'rgba(255,255,255,0.01)', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <SectionLabel>Memories</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700, marginBottom: 28 }}>Photo <span style={{ color: C.crimson }}>Gallery</span></h2>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['All', '2026', '2025'].map(y => (
                <button key={y} onClick={() => setGalleryYear(y)} style={{ padding: '7px 22px', border: '1px solid', borderColor: galleryYear === y ? C.crimson : C.border, background: galleryYear === y ? C.crimson : 'transparent', color: galleryYear === y ? C.cream : C.creamMuted, fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.2s' }}>{y}</button>
              ))}
            </div>
          </div>
          <div style={{ columns: 'auto 260px', gap: 12 }}>
            {filtered.map((img, i) => (
              <div key={img.url + i} onClick={() => setLightbox(img.url)} className="gallery-item-card" style={{ breakInside: 'avoid', marginBottom: 12, position: 'relative', overflow: 'hidden', cursor: 'zoom-in', background: C.crimsonDeep, display: 'block', borderRadius: 8 }}>
                <img src={img.url} alt={img.alt} style={{ width: '100%', display: 'block', transition: 'transform 0.45s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                <div className="gallery-caption-overlay" style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(15,9,4,0.95) 0%, rgba(15,9,4,0.7) 65%, transparent 100%)',
                  padding: '28px 14px 12px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  transition: 'opacity 0.3s'
                }}>
                  <div>
                    <div style={{ fontSize: 10, color: C.gold, fontFamily: FONT_SERIF, letterSpacing: '0.15em', fontWeight: 600 }}>{img.year}</div>
                    <div style={{ fontSize: 12, color: C.cream, marginTop: 2, lineHeight: 1.35, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{img.alt}</div>
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(196,30,58,0.88)', padding: '2px 9px', fontSize: 10, fontFamily: FONT_SERIF, color: C.cream, letterSpacing: '0.1em', borderRadius: 4 }}>{img.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox with Caption Display */}
      {lightbox && (() => {
        const currentItem = GALLERY_IMAGES.find(img => img.url === lightbox)
        return (
          <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,9,4,0.97)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, cursor: 'zoom-out' }}>
            <div style={{ position: 'relative', maxWidth: '92vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={lightbox.replace(/w=\d+/, 'w=1400').replace(/h=\d+/, 'h=900')} alt={currentItem?.alt || ''} style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.8)' }} />
              {currentItem && (
                <div style={{ marginTop: 12, textAlign: 'center', maxWidth: 600 }}>
                  <div style={{ color: C.gold, fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.15em' }}>{currentItem.year} ARCHIVE</div>
                  <div style={{ color: C.cream, fontSize: 14, marginTop: 4, fontWeight: 500 }}>{currentItem.alt}</div>
                </div>
              )}
            </div>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 22, right: 22, width: 42, height: 42, background: C.crimson, border: 'none', color: C.cream, fontSize: 18, cursor: 'pointer', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
        )
      })()}

      {/* ── QR CODE CAMERA SCANNER MODAL ── */}
      {showQrScannerModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,5,2,0.92)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div className="qr-scanner-modal-content" style={{
            background: 'rgba(20,12,6,0.98)',
            border: `2px solid ${C.gold}`,
            borderRadius: 16,
            padding: 32,
            maxWidth: 460,
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 0 50px rgba(212,160,23,0.4)',
            position: 'relative'
          }}>
            <button onClick={() => setShowQrScannerModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: C.creamMuted, fontSize: 20, cursor: 'pointer' }}>✕</button>

            <div style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.2em', color: C.saffron, textTransform: 'uppercase', marginBottom: 6 }}>
              LIVE QR SCANNER
            </div>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: C.gold, fontWeight: 700, marginBottom: 18 }}>
              Brochure Verification
            </h3>

            {/* Viewfinder Frame with laser scanner animation */}
            <div style={{
              position: 'relative',
              width: 240,
              height: 240,
              margin: '0 auto 24px',
              borderRadius: 14,
              border: `2px solid ${isScanningActive ? C.saffron : '#52C41A'}`,
              overflow: 'hidden',
              background: '#ffffff',
              padding: 14,
              boxShadow: isScanningActive ? '0 0 25px rgba(212,160,23,0.5)' : '0 0 25px rgba(82,196,26,0.5)'
            }}>
              {/* Reticle brackets */}
              <div style={{ position: 'absolute', top: 8, left: 8, width: 20, height: 20, borderTop: `3px solid ${C.crimson}`, borderLeft: `3px solid ${C.crimson}`, zIndex: 10 }} />
              <div style={{ position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderTop: `3px solid ${C.crimson}`, borderRight: `3px solid ${C.crimson}`, zIndex: 10 }} />
              <div style={{ position: 'absolute', bottom: 8, left: 8, width: 20, height: 20, borderBottom: `3px solid ${C.crimson}`, borderLeft: `3px solid ${C.crimson}`, zIndex: 10 }} />
              <div style={{ position: 'absolute', bottom: 8, right: 8, width: 20, height: 20, borderBottom: `3px solid ${C.crimson}`, borderRight: `3px solid ${C.crimson}`, zIndex: 10 }} />

              <img
                src={qrDataUrl || '/brochure-qr.png'}
                alt="UKSD 2026 Brochure QR Code"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />

              {/* Laser line overlay */}
              {isScanningActive && (
                <div
                  className="scan-laser-line"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: 3,
                    background: '#52C41A',
                    boxShadow: '0 0 12px #52C41A, 0 0 20px #52C41A'
                  }}
                />
              )}
            </div>

            {/* Status & Unlocking Actions */}
            {isScanningActive ? (
              <div>
                <div style={{ fontSize: 13, color: C.saffron, fontFamily: FONT_SERIF, marginBottom: 16 }}>
                  🔍 Scanning camera stream... Aligning QR code...
                </div>
                <div style={{ fontSize: 12, color: C.creamFaint }}>
                  Please hold camera steady over the QR Code.
                </div>
              </div>
            ) : (
              <div>
                <div style={{ background: 'rgba(82,196,26,0.15)', border: '1px solid rgba(82,196,26,0.4)', borderRadius: 8, padding: '10px 14px', color: '#52C41A', fontSize: 13, fontWeight: 600, marginBottom: 18 }}>
                  ✅ QR CODE DETECTED: Official 2026 Brochure PDF
                </div>
                <button
                  onClick={() => {
                    setIsBrochureUnlocked(true)
                    setShowQrScannerModal(false)
                  }}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`,
                    border: `1px solid ${C.gold}`,
                    color: C.cream,
                    fontFamily: FONT_SERIF,
                    fontSize: 12,
                    letterSpacing: '0.15em',
                    borderRadius: 8,
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(196,30,58,0.5)'
                  }}
                >
                  🔓 UNLOCK & ACCESS BROCHURE PDF
                </button>
              </div>
            )}
          </div>
        </div>
      )}



      {/* ── NORTH KOLKATA PANDAL HOPPING ROUTE MAP ── */}
      <section id="pandal-route" style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}`, background: 'rgba(15,9,4,0.7)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <SectionLabel>Pandal Hopping Assistant</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700, marginBottom: 14 }}>
              North Kolkata Heritage <span style={{ color: C.crimson }}>Route Map</span>
            </h2>
            <p style={{ fontSize: 15, color: C.creamMuted, maxWidth: 680, margin: '0 auto', lineHeight: 1.7 }}>
              Starting Hub: <strong style={{ color: C.gold }}>Shyambazar Metro Station (Gate 3 & 4)</strong> & <strong style={{ color: C.saffron }}>Uttar Kalikata Sarbojanin Durgotsav Samity</strong>. Plan your North Kolkata heritage pandal trail with walking times & route guidance.
            </p>
          </div>

          {/* Hub banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(196,30,58,0.15) 0%, rgba(212,160,23,0.1) 100%)',
            border: `1px solid ${C.borderBright}`,
            borderRadius: 12,
            padding: '20px 28px',
            marginBottom: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 28 }}>📍</span>
              <div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.2em', color: C.gold, textTransform: 'uppercase' }}>Ground Zero Hub</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.cream }}>Shyambazar Metro Station ➔ Uttar Kalikata Sarbojanin (5/1 Balaram Ghosh St)</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 14px', borderRadius: 20, fontSize: 12, color: C.creamMuted }}>🚶 Walking Friendly Trail</span>
              <span style={{ background: 'rgba(196,30,58,0.2)', padding: '6px 14px', borderRadius: 20, fontSize: 12, color: C.saffron }}>🚇 2 Mins from Metro</span>
            </div>
          </div>

          {/* Interactive Puja Selector Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 10, marginBottom: 36 }}>
            {NORTH_KOLKATA_PUJAS.map(p => {
              const isSelected = selectedPujaId === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPujaId(p.id)}
                  style={{
                    padding: '14px 12px',
                    textAlign: 'left',
                    background: isSelected ? 'linear-gradient(135deg, rgba(196,30,58,0.9), rgba(139,0,0,0.95))' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? C.gold : C.border}`,
                    borderRadius: 8,
                    color: C.cream,
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    boxShadow: isSelected ? '0 4px 16px rgba(196,30,58,0.4)' : 'none'
                  }}
                >
                  <div style={{ fontSize: 10, color: isSelected ? C.cream : C.gold, fontFamily: FONT_SERIF, letterSpacing: '0.12em', marginBottom: 4 }}>{p.dist}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: isSelected ? C.creamFaint : C.creamMuted, marginTop: 4, fontFamily: FONT_BENGALI }}>{p.bengaliName}</div>
                </button>
              )
            })}
          </div>

          {/* Selected Puja Details Card */}
          {(() => {
            const activePuja = NORTH_KOLKATA_PUJAS.find(p => p.id === selectedPujaId) || NORTH_KOLKATA_PUJAS[0]
            return (
              <div style={{
                background: 'linear-gradient(180deg, rgba(28,16,8,0.95) 0%, rgba(15,9,4,0.98) 100%)',
                border: `1px solid ${C.gold}`,
                borderRadius: 14,
                padding: '36px 32px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                marginBottom: 50
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 24, borderBottom: `1px solid ${C.border}`, paddingBottom: 20 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.2em', color: C.saffron, textTransform: 'uppercase' }}>{activePuja.estYear}</span>
                      <span style={{ background: 'rgba(212,160,23,0.15)', color: C.gold, fontSize: 11, padding: '2px 10px', borderRadius: 12 }}>🚶 {activePuja.walkTime}</span>
                    </div>
                    <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, color: C.cream, marginBottom: 4 }}>
                      {activePuja.name}
                    </h3>
                    <div style={{ fontFamily: FONT_BENGALI, fontSize: 17, color: C.gold }}>{activePuja.bengaliName}</div>
                  </div>

                  <a
                    href={activePuja.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 22px',
                      background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`,
                      color: C.cream,
                      fontFamily: FONT_SERIF,
                      fontSize: 11,
                      letterSpacing: '0.15em',
                      textDecoration: 'none',
                      borderRadius: 6,
                      boxShadow: '0 4px 16px rgba(196,30,58,0.4)',
                      transition: 'opacity 0.2s'
                    }}
                  >
                    🗺️ OPEN IN GOOGLE MAPS ↗
                  </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
                  <div>
                    <div style={{ fontSize: 12, color: C.gold, fontFamily: FONT_SERIF, letterSpacing: '0.15em', marginBottom: 8, textTransform: 'uppercase' }}>📍 Route & Direction</div>
                    <div style={{ fontSize: 14, color: C.cream, lineHeight: 1.7, background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 8, border: `1px solid ${C.border}` }}>
                      {activePuja.route}
                    </div>

                    <div style={{ fontSize: 12, color: C.gold, fontFamily: FONT_SERIF, letterSpacing: '0.15em', marginTop: 20, marginBottom: 8, textTransform: 'uppercase' }}>🕒 Recommended Darshan Time</div>
                    <div style={{ fontSize: 13, color: C.creamFaint, background: 'rgba(212,160,23,0.05)', padding: '12px 16px', borderRadius: 8, border: `1px solid rgba(212,160,23,0.2)` }}>
                      {activePuja.bestTime}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, color: C.gold, fontFamily: FONT_SERIF, letterSpacing: '0.15em', marginBottom: 12, textTransform: 'uppercase' }}>🌟 Key Highlights & Attractions</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {activePuja.highlights.map((h, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: C.cream, lineHeight: 1.5 }}>
                          <span style={{ color: C.saffron, fontSize: 16 }}>🌺</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Sequential Heritage Walking Route Circuit Visualizer */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.22em', color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>North Kolkata Heritage Walking Circuit</div>
            <div className="pandal-circuit-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
              {[
                '🚇 Shyambazar Metro',
                '🏛️ Uttar Kalikata Sarbojanin',
                '🚩 Bagbazar Sarbojanin',
                '🗿 Kumartuli Park',
                '🏮 Ahiritola Sarbojanin',
                '👑 Sovabazar Rajbari',
                '🌳 Jagat Mukherjee Park',
                '🎪 Hatibagan Sarbojanin',
                '✨ Kashi Bose Lane'
              ].map((step, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="pandal-circuit-pill" style={{ background: i === 1 ? C.crimson : 'rgba(255,255,255,0.06)', border: `1px solid ${i === 1 ? C.gold : C.border}`, color: C.cream, padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: i === 1 ? 700 : 400 }}>
                    {step}
                  </span>
                  {i < arr.length - 1 && <span style={{ color: C.gold, fontSize: 13 }}>➔</span>}
                </div>
              ))}
            </div>
          </div>
          {/* Kolkata Police Durga Puja Safety Advisory & Traffic Guidelines Card */}
          <div style={{
            marginTop: 44,
            background: 'linear-gradient(180deg, rgba(10,25,47,0.95) 0%, rgba(5,15,30,0.98) 100%)',
            border: `1px solid rgba(64,169,255,0.4)`,
            borderRadius: 14,
            padding: '32px 28px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            position: 'relative'
          }}>
            {/* Header Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, borderBottom: '1px solid rgba(64,169,255,0.2)', paddingBottom: 18, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 32 }}>👮‍♂️</span>
                <div>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 10, letterSpacing: '0.22em', color: '#40A9FF', textTransform: 'uppercase', fontWeight: 700 }}>
                    Official Advisory · North Kolkata Division
                  </div>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700, color: C.cream, margin: '2px 0 0' }}>
                    Kolkata Police Visitor Guidelines & Traffic Safety
                  </h3>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(64,169,255,0.12)', border: '1px solid rgba(64,169,255,0.3)', padding: '6px 14px', borderRadius: 20 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#52C41A', display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: C.cream, fontWeight: 600 }}>Active Puja Advisory 2026</span>
              </div>
            </div>

            {/* Emergency Helplines Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
              {[
                { label: '🚨 Police Emergency', num: '100 / 112' },
                { label: '🏢 Police Control Room', num: '033-2214-3024' },
                { label: '👮 Shyampukur PS (Local)', num: '033-2555-5200' },
                { label: '🌸 Pink Booth (Women Safety)', num: '1090' },
                { label: '🚑 Ambulance & Medical', num: '102 / 108' }
              ].map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(64,169,255,0.2)', padding: '10px 14px', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#40A9FF', fontFamily: FONT_SERIF, letterSpacing: '0.08em' }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.gold, marginTop: 2 }}>{item.num}</div>
                </div>
              ))}
            </div>

            {/* 4 Guidelines Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: 18, borderRadius: 8, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🚶</span> Queue & Pedestrian Rules
                </div>
                <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13, color: C.creamFaint, lineHeight: 1.7 }}>
                  <li>Keep strictly to the left in pedestrian queue barricades.</li>
                  <li>Follow designated Entry and Exit arches for all North Kolkata pandals.</li>
                  <li>Do not stop or gather in narrow connector lanes (*e.g., Balaram Ghosh St*).</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: 18, borderRadius: 8, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🚘</span> Traffic & Parking Regulations
                </div>
                <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13, color: C.creamFaint, lineHeight: 1.7 }}>
                  <li>One-way traffic restrictions apply on Bagbazar St & Rabindra Sarani from 4 PM.</li>
                  <li>Strictly NO PARKING near Shyambazar 5-Point Crossing.</li>
                  <li>Park cars at authorized zones near Tala Park or Shyambazar Metro Hub.</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: 18, borderRadius: 8, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>👶</span> Children & Elderly Safety
                </div>
                <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13, color: C.creamFaint, lineHeight: 1.7 }}>
                  <li>Ensure children carry name & emergency contact badges in pockets.</li>
                  <li>Kolkata Police Lost & Found Booths are stationed at Shyambazar Metro & Bagbazar.</li>
                  <li>Senior citizen wheelchairs & assistance available at UKSD Puja Gate.</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: 18, borderRadius: 8, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🚇</span> Special Metro & Security Alert
                </div>
                <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13, color: C.creamFaint, lineHeight: 1.7 }}>
                  <li>Kolkata Metro runs all-night special trains till 4:00 AM (Saptami to Navami).</li>
                  <li>Report any suspicious/unattended baggage to Civic Volunteers immediately.</li>
                  <li>CCTV & Police Watchtowers active 24/7 across the Shyambazar sector.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHARADIYA SUBHECHHA / DIGITAL WISHBOOK WALL ── */}
      <section id="subhechha" style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}`, background: 'rgba(139,0,0,0.04)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <SectionLabel>Community & Devotion</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700, marginBottom: 14 }}>
              Sharadiya <span style={{ color: C.crimson }}>Subhechha Wall</span>
            </h2>
            <p style={{ fontSize: 15, color: C.creamMuted, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
              Light a digital pradip and share your warm Durga Puja blessings, greetings, and memories with devotees across Kolkata and worldwide.
            </p>

            {/* Dynamic Flex Bengali Festive Greeting Header Banner */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginTop: 24,
              padding: '12px 24px',
              borderRadius: 30,
              background: 'linear-gradient(90deg, rgba(196,30,58,0.22) 0%, rgba(212,160,23,0.28) 50%, rgba(196,30,58,0.22) 100%)',
              border: `1px solid ${C.borderBright}`,
              boxShadow: '0 0 24px rgba(212,160,23,0.25), inset 0 0 12px rgba(196,30,58,0.15)',
              maxWidth: '92%'
            }}>
              <span style={{ fontSize: 22, filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.6))' }}>🪔</span>
              <span style={{
                fontFamily: FONT_BENGALI,
                fontSize: 'clamp(16px, 2.2vw, 24px)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FDF6E3 0%, #D4A017 40%, #E8721C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.03em',
                lineHeight: 1.4,
                textShadow: '0 2px 12px rgba(0,0,0,0.6)'
              }}>
                উত্তর কলিকাতা সার্বজনীনের পক্ষ থেকে সকলকে জানাই শারদীয়ার প্রীতি শুভেচ্ছা ও আন্তরিক অভিনন্দন
              </span>
              <span style={{ fontSize: 22, filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.6))' }}>🌺</span>
            </div>
          </div>

          {/* Interactive Wish Submission Form */}
          <div style={{
            background: 'linear-gradient(180deg, rgba(28,16,8,0.92) 0%, rgba(15,9,4,0.96) 100%)',
            border: `1px solid ${C.borderBright}`,
            borderRadius: 14,
            padding: '36px 32px',
            marginBottom: 50,
            boxShadow: '0 8px 36px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ fontSize: 24 }} className="pradip-flame-animated">🪔</div>
              <div>
                <h3 style={{ fontFamily: FONT_SERIF, fontSize: 18, color: C.gold, margin: 0 }}>Light a Pradip & Send Your Sharadiya Wish</h3>
                <div style={{ fontSize: 12, color: C.creamMuted }}>Your message will be displayed live on the wall for all devotees to read.</div>
              </div>
            </div>

            <form onSubmit={handlePostWish}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontFamily: FONT_SERIF, letterSpacing: '0.15em', color: C.gold, marginBottom: 8, textTransform: 'uppercase' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    value={wishName}
                    onChange={e => setWishName(e.target.value)}
                    placeholder="e.g. Sourav Banerjee"
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.cream, fontSize: 14, outline: 'none', borderRadius: 6 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontFamily: FONT_SERIF, letterSpacing: '0.15em', color: C.gold, marginBottom: 8, textTransform: 'uppercase' }}>City / Country</label>
                  <input
                    type="text"
                    value={wishLocation}
                    onChange={e => setWishLocation(e.target.value)}
                    placeholder="e.g. Shyambazar, Kolkata or London, UK"
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.cream, fontSize: 14, outline: 'none', borderRadius: 6 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 11, fontFamily: FONT_SERIF, letterSpacing: '0.15em', color: C.gold, marginBottom: 8, textTransform: 'uppercase' }}>Festive Greeting / Wish Message *</label>
                <textarea
                  required
                  rows={3}
                  value={wishMessage}
                  onChange={e => setWishMessage(e.target.value)}
                  placeholder="Share your prayers, Subho Sharadiya greetings, or fond Durga Puja memories..."
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.cream, fontSize: 14, outline: 'none', borderRadius: 6, resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ fontSize: 12, color: C.creamFaint, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>✨ Total {wishes.length} Pradips Lighted Today</span>
                </div>
                <button
                  type="submit"
                  style={{
                    padding: '13px 30px',
                    background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`,
                    border: 'none',
                    color: C.cream,
                    fontFamily: FONT_SERIF,
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    cursor: 'pointer',
                    borderRadius: 6,
                    boxShadow: '0 4px 18px rgba(196,30,58,0.4)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'transform 0.2s'
                  }}
                >
                  🪔 LIGHT A PRADIP & POST GREETING ↗
                </button>
              </div>
            </form>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 30 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['All', 'Kolkata', 'NRI'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setWishFilter(tab)}
                  style={{
                    padding: '7px 20px',
                    border: '1px solid',
                    borderColor: wishFilter === tab ? C.gold : C.border,
                    background: wishFilter === tab ? 'rgba(212,160,23,0.15)' : 'transparent',
                    color: wishFilter === tab ? C.gold : C.creamMuted,
                    fontFamily: FONT_SERIF,
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    borderRadius: 20
                  }}
                >
                  {tab === 'All' ? 'All Wishes' : tab === 'Kolkata' ? '📍 Kolkata Devotees' : '🌍 Global & NRI Devotees'}
                </button>
              ))}
            </div>

            <div style={{ fontSize: 12, color: C.gold, fontFamily: FONT_SERIF }}>
              Showing {wishes.filter((w: any) => wishFilter === 'All' ? true : wishFilter === 'Kolkata' ? !w.isNri : w.isNri).length} Wishes
            </div>
          </div>

          {/* Wishes Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {wishes
              .filter((w: any) => wishFilter === 'All' ? true : wishFilter === 'Kolkata' ? !w.isNri : w.isNri)
              .map((w: any) => (
                <div
                  key={w.id}
                  style={{
                    background: 'rgba(20,12,6,0.85)',
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    padding: 24,
                    position: 'relative',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.3s, border-color 0.3s'
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.gold; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ fontSize: 22 }} className="pradip-flame-animated">🪔</div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: C.cream }}>{w.name}</div>
                          <div style={{ fontSize: 11, color: C.gold, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span>📍</span> {w.location}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: 10, color: C.creamFaint, fontFamily: FONT_SERIF }}>{w.date}</span>
                    </div>

                    <p style={{ fontSize: 14, color: C.creamFaint, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20, fontFamily: FONT_BENGALI }}>
                      "{w.message}"
                    </p>
                  </div>

                  <div style={{ borderTop: `1px solid rgba(255,255,255,0.06)`, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: C.creamMuted }}>Sharad Utsav Blessing</span>
                    <button
                      onClick={() => handleLikeWish(w.id)}
                      style={{
                        background: likedWishIds.includes(w.id) ? 'rgba(212,160,23,0.2)' : 'transparent',
                        border: `1px solid ${likedWishIds.includes(w.id) ? C.gold : C.border}`,
                        color: likedWishIds.includes(w.id) ? C.gold : C.creamMuted,
                        padding: '4px 12px',
                        borderRadius: 16,
                        fontSize: 11,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.2s'
                      }}
                    >
                      <span>🪔</span> {w.likes} Warmth
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL MEDIA ── */}
      <section id="social" style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>Connect With Us</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700, marginBottom: 14 }}>Social <span style={{ color: C.crimson }}>Media Hub</span></h2>
            <p style={{ fontSize: 15, color: C.creamMuted, maxWidth: 440, margin: '0 auto' }}>Follow us for live updates, behind-the-scenes moments, and the heartbeat of the community</p>
          </div>


          {/* Facebook Page provision */}
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700, fontFamily: FONT_SERIF }}>f</div>
              <div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 14, color: '#1877F2', letterSpacing: '0.08em', fontWeight: 700 }}>Uttar Kalikata Sarbojanin Durgatsav Samity</div>
                <div style={{ fontSize: 12, color: C.creamMuted }}>Official Facebook Page · 620+ Devotees</div>
              </div>
              <a href="https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', padding: '7px 20px', background: '#1877F2', border: 'none', color: '#fff', fontFamily: FONT_SERIF, fontSize: 10, letterSpacing: '0.15em', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>LIKE PAGE</a>
            </div>
            <div className="facebook-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {FACEBOOK_POSTS.map((post, i) => (
                <a key={i} href={post.url} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.025)', border: `1px solid ${C.border}`, textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'transform 0.25s, border-color 0.25s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1877F2' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border }}
                >
                  <div style={{ position: 'relative', paddingBottom: '60%', overflow: 'hidden' }}>
                    <img src={post.img} alt={post.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 10, left: 10, background: '#1877F2', color: '#fff', padding: '2px 8px', fontSize: 10, fontFamily: FONT_SERIF, letterSpacing: '0.1em' }}>FACEBOOK</div>
                  </div>
                  <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ fontSize: 13, color: C.cream, fontWeight: 500, lineHeight: 1.5, marginBottom: 10 }}>{post.title}</div>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: C.creamMuted, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
                      <span>👍 {post.likes}</span>
                      <span style={{ color: '#1877F2' }}>{post.date}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Instagram grid */}
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>◉</div>
              <div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 14, color: '#E1306C', letterSpacing: '0.08em' }}>@uttar_kalikata_sarbojanin</div>
                <div style={{ fontSize: 12, color: C.creamMuted }}>Latest on Instagram</div>
              </div>
              <a href="https://www.instagram.com/uttar_kalikata_sarbojanin" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', padding: '7px 20px', background: '#E1306C', border: 'none', color: '#fff', fontFamily: FONT_SERIF, fontSize: 10, letterSpacing: '0.15em', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>FOLLOW</a>
            </div>
            <div className="instagram-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))', gap: 4 }}>
              {INSTAGRAM_POSTS.map((post, i) => (
                <a key={i} href={post.postUrl} target="_blank" rel="noopener noreferrer" title={post.alt} style={{ position: 'relative', paddingBottom: '100%', background: C.crimsonDeep, overflow: 'hidden', cursor: 'pointer', display: 'block' }}>
                  <img src={post.url} alt={post.alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.1)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                  />
                  <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.65)', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <span style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>◉</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* YouTube videos */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
              <div style={{ width: 36, height: 36, background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>▶</div>
              <div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 14, color: '#FF4444', letterSpacing: '0.08em' }}>UttarKalikataSarbojanin</div>
                <div style={{ fontSize: 12, color: C.creamMuted }}>Featured Videos</div>
              </div>
              <a href="https://www.youtube.com/@UttarKalikataSarbojanin" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', padding: '7px 20px', background: '#FF0000', border: 'none', color: '#fff', fontFamily: FONT_SERIF, fontSize: 10, letterSpacing: '0.15em', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>SUBSCRIBE</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
              {VIDEOS.map((vid, i) => (
                <a key={i} href={vid.url || 'https://www.youtube.com/@UttarKalikataSarbojanin'} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', background: '#0E0306', textDecoration: 'none', display: 'block' }}
                  onMouseEnter={e => { const img = (e.currentTarget as HTMLAnchorElement).querySelector('img'); if (img) img.style.transform = 'scale(1.04)' }}
                  onMouseLeave={e => { const img = (e.currentTarget as HTMLAnchorElement).querySelector('img'); if (img) img.style.transform = 'scale(1)' }}
                >
                  <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden' }}>
                    <img src={vid.img} alt={vid.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,9,4,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#fff' }}>▶</div>
                    </div>
                    <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.85)', padding: '2px 8px', fontSize: 11, color: C.cream, fontFamily: FONT_SERIF }}>{vid.time}</div>
                  </div>
                  <div style={{ padding: '12px 14px 16px' }}>
                    <div style={{ fontSize: 13, color: C.cream, fontWeight: 500, lineHeight: 1.45, marginBottom: 6 }}>{vid.title}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK WITH US ── */}
      <section id="work-with-us" style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}`, background: 'rgba(212,160,23,0.03)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionLabel>Collaborate</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700, marginBottom: 14 }}>
              Work <span style={{ color: C.crimson }}>With Us</span>
            </h2>
            <p style={{ fontSize: 15, color: C.creamMuted, maxWidth: 560, margin: '0 auto' }}>
              Join our creative team for Durga Puja 2026 — we welcome traditional artisans, modern artists, sculptors, lighting experts, and skilled workers.
            </p>
          </div>

          {/* Art process preview */}
          <div className="art-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8, marginBottom: 60 }}>
            {[
              { img: '/artisan_sculpture_work.jpg', label: 'Straw & Bamboo Armature Sculpting' },
              { img: '/IMG_20260827_200727.jpg.jpeg', label: 'Idol Sculpting & Clay Art' },
              { img: '/IMG_20260826_175113.jpg.jpeg', label: 'Metalwork & Lighting Fabrication' },
              { img: '/IMG_20260827_200926.jpg.jpeg', label: 'Deity Ornamentation & Shola Art' },
              { img: '/IMG_20260826_174937.jpg.jpeg', label: 'Pandal Carpentry & Structure' },
            ].map((item, i) => (
              <div key={i} onClick={() => setLightbox(item.img)} style={{ position: 'relative', paddingBottom: '75%', overflow: 'hidden', background: C.crimsonDeep, cursor: 'zoom-in', borderRadius: 4, border: `1px solid ${C.border}` }} title="Click to view full photo">
                <img src={item.img} alt={item.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 8px 6px', background: 'linear-gradient(to top, rgba(0,0,0,0.88), transparent)', fontSize: 11, color: C.cream, fontFamily: FONT_SERIF, textAlign: 'center', pointerEvents: 'none' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 48 }}>

            {/* Form */}
            <div style={{ gridColumn: 'span 2' } as React.CSSProperties}>
              <div style={{ border: `1px solid ${C.border}`, padding: 40, background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: C.gold, marginBottom: 6 }}>Durga Puja Committee – Artist & Artisan Collaboration Form</div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 12, color: C.saffron, letterSpacing: '0.1em', marginBottom: 8 }}>JOIN OUR CREATIVE TEAM FOR DURGA PUJA 2026</div>
                <p style={{ fontSize: 14, color: C.creamMuted, lineHeight: 1.75, marginBottom: 36 }}>
                  We are inviting traditional artisans, modern artists, sculptors, lighting experts, and skilled workers to collaborate with us in building an unforgettable Puja experience. Fill out the form below to showcase your work and get associated with our committee.
                </p>

                {wwuSubmitted ? (
                  <div style={{ border: `1px solid ${C.gold}`, padding: 36, textAlign: 'center', background: 'rgba(212,160,23,0.06)' }}>
                    <div style={{ fontSize: 36, marginBottom: 16 }}>🙏</div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: C.gold, marginBottom: 12 }}>Application Received!</div>
                    <p style={{ fontSize: 15, color: C.creamFaint, lineHeight: 1.8 }}>
                      Thank you for reaching out! Our art direction and organizing committee will review your submission and contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleWwuSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                    {/* Section 1 */}
                    <div>
                      <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.2em', color: C.gold, marginBottom: 20, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>1. PERSONAL & BUSINESS INFORMATION</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                        {[
                          { ph: 'Full Name / Representative Name *', type: 'text', req: true },
                          { ph: 'Organization (if applicable)', type: 'text', req: false },
                          { ph: 'Phone Number (WhatsApp preferred) *', type: 'tel', req: true },
                          { ph: 'Current Location / Base City *', type: 'text', req: true },
                        ].map(f => (
                          <input key={f.ph} type={f.type} placeholder={f.ph} required={f.req} style={inputStyle}
                            onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                            onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                      <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.2em', color: C.gold, marginBottom: 8, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>2. AREA OF EXPERTISE & WORK CATEGORY</div>
                      <p style={{ fontSize: 13, color: C.creamMuted, marginBottom: 16 }}>Select all that apply</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {EXPERTISE_OPTIONS.map(opt => (
                          <label key={opt} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                            <input type="checkbox" checked={wwuExpertise.includes(opt)} onChange={() => toggleExpertise(opt)}
                              style={{ width: 16, height: 16, marginTop: 2, accentColor: C.crimson, flexShrink: 0 }}
                            />
                            <span style={{ fontSize: 14, color: C.creamFaint, lineHeight: 1.5 }}>{opt}</span>
                          </label>
                        ))}
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                          <input type="checkbox" checked={wwuExpertise.includes('Other')} onChange={() => toggleExpertise('Other')}
                            style={{ width: 16, height: 16, marginTop: 2, accentColor: C.crimson, flexShrink: 0 }}
                          />
                          <span style={{ fontSize: 14, color: C.creamFaint, lineHeight: 1.5 }}>Other:</span>
                          {wwuExpertise.includes('Other') && (
                            <input type="text" placeholder="Please specify" value={wwuOther} onChange={e => setWwuOther(e.target.value)} style={{ ...inputStyle, flex: 1, padding: '6px 12px' }}
                              onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                              onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                            />
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div>
                      <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.2em', color: C.gold, marginBottom: 20, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>3. EXPERIENCE</div>
                      <p style={{ fontSize: 13, color: C.creamMuted, marginBottom: 12 }}>Years of Experience in Durga Puja / Festive Projects:</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                        {['0–2 years (Emerging Artist/Worker)', '3–5 years', '6–10 years', '10+ years (Veteran)'].map(opt => (
                          <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                            <input type="radio" name="experience" value={opt} checked={wwuExperience === opt} onChange={() => setWwuExperience(opt)} style={{ accentColor: C.crimson }} />
                            <span style={{ fontSize: 14, color: C.creamFaint }}>{opt}</span>
                          </label>
                        ))}
                      </div>
                      <textarea placeholder="Notable Past Projects / Committees Worked With" rows={3} style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = C.crimson }}
                        onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = C.border }}
                      />
                      <div style={{ marginTop: 14 }}>
                        <label style={{ fontFamily: FONT_SERIF, fontSize: 12, color: C.creamMuted, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>UPLOAD WORK SAMPLES (JPG, PNG, PDF — Max 10MB, Optional)</label>
                        <input type="file" accept=".jpg,.jpeg,.png,.pdf" multiple style={{ color: C.creamMuted, fontSize: 13, fontFamily: FONT_BODY, cursor: 'pointer' }} />
                      </div>
                    </div>

                    {/* Section 4 */}
                    <div>
                      <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.2em', color: C.gold, marginBottom: 20, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>4. ENGAGEMENT & OPERATIONAL DETAILS</div>
                      <p style={{ fontSize: 13, color: C.creamMuted, marginBottom: 12 }}>Team Size:</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                        {['Individual Artist', 'Small Group (2–5 members)', 'Large Crew / Contractor (6+ members)'].map(opt => (
                          <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                            <input type="radio" name="teamSize" value={opt} checked={wwuTeamSize === opt} onChange={() => setWwuTeamSize(opt)} style={{ accentColor: C.crimson }} />
                            <span style={{ fontSize: 14, color: C.creamFaint }}>{opt}</span>
                          </label>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                        <input type="text" name="timeline" placeholder="Availability Timeline (e.g. July to October)" style={inputStyle}
                          onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                          onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                        />
                        <input type="text" name="budget" placeholder="Estimated Budget / Quotation Range (Optional)" style={inputStyle}
                          onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                          onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                        />
                      </div>
                    </div>

                    {/* Section 5 */}
                    <div>
                      <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.2em', color: C.gold, marginBottom: 16, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>5. ADDITIONAL COMMENTS</div>
                      <textarea name="comments" placeholder="Any additional information you would like to share..." rows={4} style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = C.crimson }}
                        onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = C.border }}
                      />
                    </div>

                    <button type="submit" style={{ padding: '16px 40px', background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`, border: 'none', color: C.cream, fontFamily: FONT_SERIF, fontSize: 13, letterSpacing: '0.2em', cursor: 'pointer', boxShadow: '0 4px 24px rgba(196,30,58,0.4)', transition: 'opacity 0.2s', alignSelf: 'flex-start' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                    >APPLY FOR COLLABORATION</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPONSORSHIP ── */}
      <section id="sponsorship" style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}`, background: 'rgba(212,160,23,0.02)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>Partner With Us</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700 }}>
              Sponsorship & <span style={{ color: C.gold }}>Brand Partnerships</span>
            </h2>
            <p style={{ fontSize: 15, color: C.creamFaint, maxWidth: 640, margin: '14px auto 0', lineHeight: 1.8 }}>
              Partner with North Kolkata&#39;s iconic 95-year celebration. Connect your brand with 500,000+ devotees, visitors, and global audience.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 64 }}>
            {[
              { title: 'Title Sponsor', desc: 'Prime branding across pandal entrance, main stage, TV broadcasts, and official festival merchandise.', tag: 'Exclusive' },
              { title: 'Gold Partner', desc: 'Prominent banner displays, VIP seating passes, social media features, and logo on all official banners.', tag: 'Featured' },
              { title: 'Outdoor & Gate Branding', desc: 'High-visibility archway branding, street hoardings in Shyambazar, and entrance gate naming rights.', tag: 'High Footfall' },
              { title: 'Digital & Live Broadcast Partner', desc: 'Exclusive sponsorship on 24/7 live stream, YouTube channel, and official social media videos.', tag: 'Global Reach' },
            ].map(tier => (
              <div key={tier.title} style={{ padding: '28px 24px', border: `1px solid ${C.border}`, background: 'rgba(15,9,4,0.7)', backdropFilter: 'blur(8px)', position: 'relative' }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 10, letterSpacing: '0.2em', color: C.saffron, textTransform: 'uppercase', marginBottom: 8 }}>{tier.tag}</div>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: C.gold, marginBottom: 12 }}>{tier.title}</h3>
                <p style={{ fontSize: 13, color: C.creamMuted, lineHeight: 1.75 }}>{tier.desc}</p>
              </div>
            ))}
          </div>

          {/* Sponsorship Form Section */}
          <div style={{ maxWidth: 720, margin: '0 auto', background: 'rgba(23,15,8,0.9)', border: `1px solid ${C.borderBright}`, padding: '40px 32px', boxShadow: '0 8px 36px rgba(0,0,0,0.5)' }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 14, color: C.gold, marginBottom: 24, letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: 'center' }}>
              SEND US A SPONSORSHIP INQUIRY
            </div>

            {sponsorshipSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🎉</div>
                <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: C.gold, marginBottom: 10 }}>Inquiry Received!</h4>
                <p style={{ fontSize: 14, color: C.creamFaint, lineHeight: 1.8, marginBottom: 20 }}>
                  Thank you for your interest! Our team will review your sponsorship details and contact you shortly.
                </p>
                <button onClick={() => setSponsorshipSubmitted(false)} style={{ padding: '10px 24px', background: C.crimson, border: 'none', color: C.cream, fontFamily: FONT_SERIF, fontSize: 11, cursor: 'pointer' }}>
                  SEND ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSponsorshipSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input type="text" name="name" required placeholder="Your Full Name *" style={inputStyle}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                />
                <input type="email" name="email" required placeholder="Your Email Address *" style={inputStyle}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                />
                <input type="tel" name="phone" required placeholder="Your Phone Number *" style={inputStyle}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                />
                <input type="text" name="company" placeholder="Company / Brand Name *" required style={inputStyle}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                />
                <textarea name="message" placeholder="Your Message / Sponsorship Interest *" required rows={5} style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = C.crimson }}
                  onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = C.border }}
                />
                <button type="submit" style={{ padding: '16px 32px', background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`, border: 'none', color: C.cream, fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.22em', cursor: 'pointer', boxShadow: '0 4px 20px rgba(196,30,58,0.4)', transition: 'opacity 0.2s', marginTop: 8 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                >SEND SPONSORSHIP INQUIRY</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── ADVERTISE WITH US ── */}
      <section id="advertise-with-us" style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}`, background: 'rgba(23,15,8,0.6)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionLabel>Partner With Us</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 700 }}>
              Advertise <span style={{ color: C.crimson }}>With Us</span>
            </h2>
            <p style={{ fontSize: 15, color: C.creamFaint, maxWidth: 700, margin: '14px auto 0', lineHeight: 1.85 }}>
              Amplify your brand during North Kolkata&#39;s premier festival. Reach half a million on-ground visitors and millions across digital channels.
            </p>
          </div>

          {/* 4 Generic Pillars Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 72 }}>
            {[
              {
                icon: '🚀',
                title: 'Brand Promotion',
                desc: 'High-impact physical hoardings, entrance arches, LED displays, and promotional booth setups across Shyambazar Street to engage 500,000+ visitors.'
              },
              {
                icon: '👑',
                title: 'Brand Identity',
                desc: 'Align your business with 95 years of heritage, cultural prestige, and artistic excellence, establishing deep community trust and emotional resonance.'
              },
              {
                icon: '🤝',
                title: 'Sponsorship Options',
                desc: 'Flexible partnership tiers — from Title & Presenting Sponsorships to Category Exclusivity, Stage Branding, and Souvenir Magazine placements.'
              },
              {
                icon: '📺',
                title: 'Media Visibility',
                desc: 'Extensive coverage across regional news channels, live 24/7 digital streaming, social media reels, and official press releases.'
              },
            ].map(pillar => (
              <div key={pillar.title} style={{
                padding: '32px 24px',
                border: `1px solid ${C.border}`,
                background: 'rgba(15,9,4,0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: 8,
                transition: 'transform 0.3s, border-color 0.3s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.gold; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{pillar.icon}</div>
                <h3 style={{ fontFamily: FONT_SERIF, fontSize: 16, color: C.gold, letterSpacing: '0.08em', marginBottom: 12 }}>
                  {pillar.title.toUpperCase()}
                </h3>
                <p style={{ fontSize: 13, color: C.creamMuted, lineHeight: 1.8 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* OFFICIAL BROCHURE QR CODE & SCANNER SECTION */}
          <div className="brochure-qr-card" style={{
            background: 'linear-gradient(180deg, rgba(28,16,8,0.95) 0%, rgba(15,9,4,0.98) 100%)',
            border: `1px solid ${C.borderBright}`,
            borderRadius: 14,
            padding: '44px 32px',
            boxShadow: '0 8px 36px rgba(0,0,0,0.5)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background glowing radial accent */}
            <div style={{
              position: 'absolute', top: '-20%', right: '-10%', width: 350, height: 350,
              background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.25em', color: C.saffron, textTransform: 'uppercase', marginBottom: 8 }}>
                OFFICIAL FESTIVAL PUBLICATION
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, color: C.gold }}>
                ADVERTISEMENT BROCHURE 2026
              </h3>
              <p style={{ fontSize: 14, color: C.creamMuted, maxWidth: 640, margin: '10px auto 0', lineHeight: 1.8 }}>
                Scan the official QR Code below using any mobile camera or scanner app to access, copy, download, and view the full 2026 Brochure Edition.
              </p>
            </div>

            {/* QR Code Container with Animated Glowing Gold Frame */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 32 }}>
              <div style={{
                position: 'relative',
                padding: 22,
                background: '#ffffff',
                borderRadius: 16,
                border: `3px solid ${C.gold}`,
                boxShadow: '0 0 40px rgba(212,160,23,0.35), 0 0 15px rgba(196,30,58,0.5)',
                display: 'inline-block'
              }}>
                {/* Corner reticle decorations */}
                <div style={{ position: 'absolute', top: -6, left: -6, width: 24, height: 24, borderTop: `3px solid ${C.crimson}`, borderLeft: `3px solid ${C.crimson}` }} />
                <div style={{ position: 'absolute', top: -6, right: -6, width: 24, height: 24, borderTop: `3px solid ${C.crimson}`, borderRight: `3px solid ${C.crimson}` }} />
                <div style={{ position: 'absolute', bottom: -6, left: -6, width: 24, height: 24, borderBottom: `3px solid ${C.crimson}`, borderLeft: `3px solid ${C.crimson}` }} />
                <div style={{ position: 'absolute', bottom: -6, right: -6, width: 24, height: 24, borderBottom: `3px solid ${C.crimson}`, borderRight: `3px solid ${C.crimson}` }} />

                <img
                  src={qrDataUrl || '/brochure-qr.png'}
                  alt="UKSD 2026 Brochure QR Code"
                  style={{ width: 220, height: 220, display: 'block', borderRadius: 6 }}
                />

                <button
                  type="button"
                  onClick={() => {
                    setShowQrScannerModal(true)
                    setIsScanningActive(true)
                    setTimeout(() => setIsScanningActive(false), 1400)
                  }}
                  style={{
                    position: 'absolute',
                    bottom: -14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`,
                    color: C.cream,
                    fontFamily: FONT_SERIF,
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    padding: '4px 16px',
                    borderRadius: 14,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.6)',
                    border: `1px solid ${C.gold}`,
                    cursor: 'pointer'
                  }}
                >
                  📱 SCAN WITH CAMERA
                </button>
              </div>

              {/* Direct Target Link Display */}
              <div style={{ fontSize: 13, color: C.creamMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span>Brochure Link:</span>
                <code style={{ background: 'rgba(255,255,255,0.06)', padding: '5px 12px', borderRadius: 4, color: C.gold, fontSize: 13 }}>
                  /Brochure_UKSD_2026.pdf
                </code>
              </div>
            </div>

            {/* Trigger buttons for Scanner & Copy Link */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
              <button
                className="brochure-action-btn"
                onClick={() => {
                  setShowQrScannerModal(true)
                  setIsScanningActive(true)
                  setTimeout(() => setIsScanningActive(false), 1400)
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 26px',
                  background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`,
                  color: C.cream,
                  fontFamily: FONT_SERIF,
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  border: `1px solid ${C.gold}`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(196,30,58,0.4)',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
              >
                📷 LAUNCH QR CODE SCANNER
              </button>

              <button
                className="brochure-action-btn"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + '/Brochure_UKSD_2026.pdf')
                  setIsBrochureUnlocked(true)
                  alert('📋 Official Brochure Link copied to clipboard!\n\nBrochure PDF buttons are now unlocked.')
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: 'rgba(255,255,255,0.04)',
                  color: C.gold,
                  fontFamily: FONT_SERIF,
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  border: `1px solid ${C.gold}`,
                  cursor: 'pointer',
                  borderRadius: 6,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.gold; (e.currentTarget as HTMLButtonElement).style.color = C.bg }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = C.gold }}
              >
                📋 COPY & VERIFY BROCHURE LINK
              </button>
            </div>

            {/* Locked or Unlocked Access Area */}
            {!isBrochureUnlocked ? (
              <div style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px dashed ${C.borderBright}`,
                borderRadius: 12,
                padding: '24px 20px',
                maxWidth: 580,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: C.saffron }}>
                  <span style={{ fontSize: 24 }}>🔒</span>
                  <span style={{ fontFamily: FONT_SERIF, fontSize: 13, letterSpacing: '0.15em', fontWeight: 600 }}>PDF BUTTONS RESTRICTED</span>
                </div>
                <p style={{ fontSize: 13, color: C.creamMuted, margin: 0, lineHeight: 1.6 }}>
                  The <strong>View Full PDF</strong> and <strong>Download Brochure</strong> buttons are hidden until verified. Scan the QR code above with your phone camera, tap <strong>Launch QR Code Scanner</strong>, or click <strong>Copy & Verify Link</strong>.
                </p>
              </div>
            ) : (
              <div>
                <div style={{ background: 'rgba(82,196,26,0.15)', border: '1px solid rgba(82,196,26,0.4)', padding: '10px 22px', borderRadius: 8, color: '#52C41A', fontSize: 12, fontFamily: FONT_SERIF, letterSpacing: '0.1em', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <span>✅</span> QR CODE VERIFIED — BROCHURE PDF UNLOCKED
                </div>

                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    className="brochure-action-btn"
                    href="/Brochure_UKSD_2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '13px 26px',
                      background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`,
                      color: C.cream,
                      fontFamily: FONT_SERIF,
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      textDecoration: 'none',
                      borderRadius: 6,
                      boxShadow: '0 4px 18px rgba(196,30,58,0.4)',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
                  >
                    📖 VIEW FULL PDF BROCHURE ↗
                  </a>

                  <a
                    className="brochure-action-btn"
                    href="/Brochure_UKSD_2026.pdf"
                    download="Brochure_UKSD_2026.pdf"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 24px',
                      background: 'transparent',
                      color: C.gold,
                      fontFamily: FONT_SERIF,
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      textDecoration: 'none',
                      border: `1px solid ${C.gold}`,
                      borderRadius: 6,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.gold; (e.currentTarget as HTMLAnchorElement).style.color = C.bg }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = C.gold }}
                  >
                    ⬇ DOWNLOAD BROCHURE PDF
                  </a>
                </div>
              </div>
            )}
          </div>



          {/* Festival Advertisement Booking Form */}
          <div style={{
            marginTop: 60,
            background: 'rgba(15,9,4,0.95)',
            border: `1px solid ${C.borderBright}`,
            borderRadius: 12,
            padding: '44px 32px',
            boxShadow: '0 8px 36px rgba(0,0,0,0.5)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.25em', color: C.gold, textTransform: 'uppercase', marginBottom: 8 }}>
                DURGA PUJA COMMITTEE
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, color: C.cream }}>
                Advertise With Us This Durga Puja 2026
              </h3>
              <p style={{ fontSize: 14, color: C.creamFaint, maxWidth: 740, margin: '10px auto 0', lineHeight: 1.8 }}>
                Maximize your brand&#39;s visibility and reach thousands of visitors daily during the grand festive celebrations. Book your advertisement slots, display spaces, and promotional media below.
              </p>
            </div>

            {adFormSubmitted ? (
              <div style={{
                background: 'rgba(212,160,23,0.06)',
                border: `1px solid ${C.gold}`,
                borderRadius: 8,
                padding: '40px 28px',
                textAlign: 'center',
                boxShadow: '0 4px 24px rgba(212,160,23,0.15)'
              }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>🎉</div>
                <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: C.gold, marginBottom: 12 }}>
                  Booking Request Received!
                </h4>
                <p style={{ fontSize: 15, color: C.creamFaint, maxWidth: 640, margin: '0 auto 24px', lineHeight: 1.8 }}>
                  Thank you for your interest! Our media and marketing team will review your selection and contact you with our ad rates and inventory layout within 24–48 hours.
                </p>
                <button
                  onClick={() => setAdFormSubmitted(false)}
                  style={{
                    padding: '12px 28px',
                    background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`,
                    border: 'none',
                    color: C.cream,
                    fontFamily: FONT_SERIF,
                    fontSize: 12,
                    letterSpacing: '0.16em',
                    cursor: 'pointer'
                  }}
                >
                  SUBMIT ANOTHER AD REQUEST
                </button>
              </div>
            ) : (
              <form onSubmit={handleAdFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                {/* Section 1: Advertiser Details */}
                <div>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.2em', color: C.gold, marginBottom: 18, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                    1. ADVERTISER DETAILS
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    <input type="text" name="companyName" required placeholder="Company / Brand Name *" style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                    <input type="text" name="contactPerson" required placeholder="Contact Person Name *" style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                    <input type="text" name="designation" placeholder="Designation / Title" style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                    <input type="tel" name="phone" required placeholder="Phone Number (WhatsApp preferred) *" style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                    <input type="email" name="email" required placeholder="Email Address *" style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                    <input type="text" name="address" placeholder="Business Address / City *" required style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                  </div>
                </div>

                {/* Section 2: Type of Business / Sector */}
                <div>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.2em', color: C.gold, marginBottom: 18, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                    2. TYPE OF BUSINESS / SECTOR
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                    {[
                      'Retail & Fashion',
                      'Food & Beverage / FMCG',
                      'Real Estate & Home Decor',
                      'Electronics & Appliances',
                      'Banking & Financial Services',
                      'Education & Healthcare',
                      'Local Business / Service',
                      'Other'
                    ].map(sec => (
                      <label key={sec} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '8px 12px', background: adSector === sec ? 'rgba(196,30,58,0.15)' : 'rgba(255,255,255,0.02)', border: `1px solid ${adSector === sec ? C.crimson : C.border}`, borderRadius: 4, transition: 'all 0.2s' }}>
                        <input
                          type="radio"
                          name="adSector"
                          value={sec}
                          checked={adSector === sec}
                          onChange={() => setAdSector(sec)}
                          style={{ accentColor: C.crimson }}
                        />
                        <span style={{ fontSize: 13, color: C.creamFaint }}>{sec}</span>
                      </label>
                    ))}
                  </div>
                  {adSector === 'Other' && (
                    <div style={{ marginTop: 12 }}>
                      <input
                        type="text"
                        placeholder="Please specify your business sector *"
                        value={adSectorOther}
                        onChange={e => setAdSectorOther(e.target.value)}
                        required
                        style={inputStyle}
                      />
                    </div>
                  )}
                </div>

                {/* Section 3: Preferred Media & Placement Formats */}
                <div>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.2em', color: C.gold, marginBottom: 14, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                    3. PREFERRED MEDIA & PLACEMENT FORMATS <span style={{ fontSize: 11, color: C.creamMuted, textTransform: 'none' }}>(Select all that apply)</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
                    {[
                      'Physical Hoardings / Gate Arches (Pandal Entry/Exit)',
                      'Outdoor Banners / Flex Displays (Approach Roads)',
                      'LED Digital Screen Ads (Inside Pandal Area)',
                      'Souvenir / Festival Magazine Print Ads (Full Page / Half Page / Back Cover)',
                      'Audio Announcements (Pandal Sound System Intervals)',
                      'Digital & Social Media Branding (Committee\'s Official Channels)',
                      'Sample Distribution / Kiosk Space',
                      'Customized Branding Options'
                    ].map(formatOption => {
                      const isChecked = adMediaFormats.includes(formatOption)
                      return (
                        <label key={formatOption} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '10px 14px', background: isChecked ? 'rgba(212,160,23,0.12)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isChecked ? C.gold : C.border}`, borderRadius: 6, transition: 'all 0.2s' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setAdMediaFormats(adMediaFormats.filter(f => f !== formatOption))
                              } else {
                                setAdMediaFormats([...adMediaFormats, formatOption])
                              }
                            }}
                            style={{ accentColor: C.gold, marginTop: 3 }}
                          />
                          <span style={{ fontSize: 13, color: C.creamFaint, lineHeight: 1.5 }}>{formatOption}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Section 4: Campaign Specs & Budget */}
                <div>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.2em', color: C.gold, marginBottom: 18, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                    4. CAMPAIGN SPECS & BUDGET
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 13, color: C.creamMuted, marginBottom: 10 }}>Desired Placement Duration:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        'All 5 Days of Puja',
                        'Entire Month (Pre-Puja Setup to Immersion)',
                        'Specific Days Only'
                      ].map(dur => (
                        <label key={dur} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="adDuration"
                            value={dur}
                            checked={adDuration === dur}
                            onChange={() => setAdDuration(dur)}
                            style={{ accentColor: C.crimson }}
                          />
                          <span style={{ fontSize: 14, color: C.creamFaint }}>{dur}</span>
                        </label>
                      ))}
                    </div>
                    {adDuration === 'Specific Days Only' && (
                      <div style={{ marginTop: 10 }}>
                        <input
                          type="text"
                          placeholder="Specify days (e.g. Saptami & Navami only) *"
                          value={adDurationSpecific}
                          onChange={e => setAdDurationSpecific(e.target.value)}
                          required
                          style={inputStyle}
                        />
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, color: C.creamMuted, marginBottom: 6 }}>
                        Estimated Advertising Budget:
                      </label>
                      <select name="budgetRange" style={{ ...inputStyle, color: C.cream, cursor: 'pointer', background: 'rgba(255,255,255,0.06)' }}>
                        <option value="" disabled selected style={{ background: '#170F08', color: '#999' }}>Select Budget Range...</option>
                        <option value="under-25k" style={{ background: '#170F08' }}>Under ₹25,000</option>
                        <option value="25k-50k" style={{ background: '#170F08' }}>₹25,000 – ₹50,000</option>
                        <option value="50k-1l" style={{ background: '#170F08' }}>₹50,000 – ₹1,00,000</option>
                        <option value="1l-2.5l" style={{ background: '#170F08' }}>₹1,00,000 – ₹2,50,000</option>
                        <option value="2.5l-5l" style={{ background: '#170F08' }}>₹2,50,000 – ₹5,00,000</option>
                        <option value="5l-plus" style={{ background: '#170F08' }}>₹5,00,000+ (Premium Partner)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 13, color: C.creamMuted, marginBottom: 6 }}>
                        Upload Brand Logo / Sample Ad Artwork (Optional):
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="file"
                          id="ad-artwork-upload"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={e => setAdFileName(e.target.files?.[0]?.name || '')}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="ad-artwork-upload"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                            padding: '12px 18px',
                            border: `1px dashed ${C.borderBright}`,
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 6,
                            cursor: 'pointer',
                            color: C.gold,
                            fontFamily: FONT_SERIF,
                            fontSize: 12,
                            letterSpacing: '0.08em',
                            transition: 'all 0.2s'
                          }}
                        >
                          {adFileName ? `📎 ${adFileName}` : '📁 Choose File (JPG, PNG, PDF max 10MB)'}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5: Special Requests or Inquiries */}
                <div>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.2em', color: C.gold, marginBottom: 14, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                    5. SPECIAL REQUESTS OR INQUIRIES
                  </div>
                  <textarea
                    name="specialRequests"
                    placeholder="Additional Customization Needs (Specific locations, dimensions, custom installation ideas, etc.)"
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = C.crimson }}
                    onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = C.border }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '16px 44px',
                    background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`,
                    border: 'none',
                    color: C.cream,
                    fontFamily: FONT_SERIF,
                    fontSize: 13,
                    letterSpacing: '0.2em',
                    cursor: 'pointer',
                    boxShadow: '0 4px 24px rgba(196,30,58,0.4)',
                    transition: 'opacity 0.2s',
                    alignSelf: 'flex-start'
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                >
                  SUBMIT AD REQUEST
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── PRIVILEGE FORM (Privileged Entry) ── */}
      <section id="priviledge-form" style={{ padding: '90px 24px', borderTop: `1px solid ${C.border}`, background: 'rgba(15,9,4,0.95)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Banner / Header */}
          <div style={{
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 56,
            border: `1px solid ${C.borderBright}`,
            boxShadow: '0 8px 36px rgba(0,0,0,0.5)',
            background: C.bgDark,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src="/Picsart_26-08-11_14-59-06-466.jpg.jpeg"
              alt="Privileged Entry Banner"
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 64 }}>
            {/* Left Column: Form */}
            <div>
              <h3 style={{ fontFamily: FONT_SERIF, fontSize: 18, color: C.gold, marginBottom: 24, letterSpacing: '0.06em' }}>
                Fill & Submit
              </h3>

              {privilegeSubmitted ? (
                <div style={{ background: 'rgba(212,160,23,0.06)', border: `1px solid ${C.gold}`, borderRadius: 8, padding: '30px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🙏</div>
                  <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: C.gold, marginBottom: 10 }}>Pass Request Submitted!</h4>
                  <p style={{ fontSize: 13, color: C.creamFaint, lineHeight: 1.7, marginBottom: 20 }}>
                    Thank you! Your privileged entry request has been recorded and sent to our team. We will review your details and confirm your pass status via email/SMS.
                  </p>
                  <button onClick={() => setPrivilegeSubmitted(false)} style={{ padding: '10px 20px', background: C.crimson, border: 'none', color: C.cream, fontFamily: FONT_SERIF, fontSize: 11, cursor: 'pointer' }}>
                    SUBMIT ANOTHER REQUEST
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePrivilegeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <input type="text" name="name" placeholder="Name *" required style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <input type="email" name="email" placeholder="Email*" required style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                    <input type="tel" name="phone" placeholder="Number*" required style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                  </div>

                  <div>
                    <input type="text" name="address" placeholder="Address*" required style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                  </div>

                  <div>
                    <select name="guests" required defaultValue="" style={{ ...inputStyle, color: C.cream, cursor: 'pointer', background: 'rgba(255,255,255,0.06)' }}>
                      <option value="" disabled style={{ background: '#170F08', color: '#999' }}>No. of Guests</option>
                      <option value="1" style={{ background: '#170F08' }}>1 Guest</option>
                      <option value="2" style={{ background: '#170F08' }}>2 Guests</option>
                      <option value="3" style={{ background: '#170F08' }}>3 Guests</option>
                      <option value="4" style={{ background: '#170F08' }}>4 Guests</option>
                      <option value="5+" style={{ background: '#170F08' }}>5+ Guests</option>
                    </select>
                  </div>

                  <div>
                    <input type="date" name="visitDate" required style={{ ...inputStyle, color: C.cream }}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.crimson }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = C.border }}
                    />
                  </div>

                  <div>
                    <select name="timeSlot" required defaultValue="" style={{ ...inputStyle, color: C.cream, cursor: 'pointer', background: 'rgba(255,255,255,0.06)' }}>
                      <option value="" disabled style={{ background: '#170F08', color: '#999' }}>Select Time</option>
                      <option value="morning" style={{ background: '#170F08' }}>Morning Slot (8:00 AM – 12:00 PM)</option>
                      <option value="afternoon" style={{ background: '#170F08' }}>Afternoon Slot (12:00 PM – 4:00 PM)</option>
                      <option value="evening" style={{ background: '#170F08' }}>Evening Slot (4:00 PM – 8:00 PM)</option>
                      <option value="night" style={{ background: '#170F08' }}>Night Slot (8:00 PM – 12:00 AM)</option>
                      <option value="midnight" style={{ background: '#170F08' }}>Midnight Slot (12:00 AM – 8:00 AM)</option>
                    </select>
                  </div>

                  <div>
                    <select name="reason" required defaultValue="" style={{ ...inputStyle, color: C.cream, cursor: 'pointer', background: 'rgba(255,255,255,0.06)' }}>
                      <option value="" disabled style={{ background: '#170F08', color: '#999' }}>Select Reason</option>
                      <option value="aged" style={{ background: '#170F08' }}>Aged Person with Restricted Movement</option>
                      <option value="differently-abled" style={{ background: '#170F08' }}>Differently Abled Person</option>
                      <option value="pregnant" style={{ background: '#170F08' }}>Pregnant Woman</option>
                      <option value="foreigner" style={{ background: '#170F08' }}>Foreigner / International Visitor</option>
                      <option value="researcher" style={{ background: '#170F08' }}>Art Researcher / Art Curator</option>
                      <option value="nri" style={{ background: '#170F08' }}>NRI (Non-Resident Indian)</option>
                      <option value="other" style={{ background: '#170F08' }}>Other Priority Reason</option>
                    </select>
                  </div>

                  <button type="submit" style={{
                    alignSelf: 'flex-start',
                    marginTop: 10,
                    padding: '14px 44px',
                    borderRadius: 24,
                    background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`,
                    border: 'none',
                    color: C.cream,
                    fontFamily: FONT_SERIF,
                    fontSize: 13,
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(196,30,58,0.4)',
                    transition: 'opacity 0.2s'
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Rules & Terms */}
            <div style={{ paddingTop: 10 }}>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: 20,
                color: C.creamFaint,
                fontSize: 14,
                lineHeight: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              }}>
                <li>The entire proceeds of ticket will be utilised for livelihood development of the working artisans.</li>
                <li>Viewers must be present before 20 minutes of the scheduled time slot.</li>
                <li>You need to carry your original Govt. Photo ID card(as Aadhaar,Voter,Passport at the time of entry).</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '80px 20px', borderTop: `1px solid ${C.border}`, background: 'rgba(139,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>
          <div>
            <SectionLabelLeft>Find Us</SectionLabelLeft>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 36 }}>
              Contact &<br /><span style={{ color: C.crimson }}>Location</span>
            </h2>
            {[
              { icon: '📍', label: 'Address', value: '5/1 Balaram Ghosh Street, Kolkata - 700 004 [ Shyambazar ]', link: 'https://www.google.com/maps/search/?api=1&query=5%2F1+Balaram+Ghosh+Street,+Kolkata+-+700+004' },
              { icon: '🏛️', label: 'Nearest Landmark', value: 'Shyampukur Police Station', link: 'https://www.google.com/maps/search/?api=1&query=Shyampukur+Police+Station,+Kolkata' },
              {
                icon: '📞', label: 'Phone', links: [
                  { text: '+91 79806 64217', href: 'tel:+917980664217' },
                  { text: '+91 98302 14010', href: 'tel:+919830214010' }
                ]
              },
              { icon: '✉', label: 'Email', value: 'uksd1932@gmail.com', link: 'mailto:uksd1932@gmail.com' },
              { icon: '🕐', label: 'Pandal Hours', value: 'Open 24 Hours During Puja Days' },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <div style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', color: C.gold, fontFamily: FONT_SERIF, marginBottom: 5, textTransform: 'uppercase' }}>{c.label}</div>
                  {c.links ? (
                    <div style={{ fontSize: 14, lineHeight: 1.65, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      {c.links.map((p, i) => (
                        <span key={p.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          <a href={p.href} style={{ color: C.saffron, textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.gold; (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.saffron; (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none' }}
                          >
                            {p.text}
                          </a>
                          {i < c.links.length - 1 && <span style={{ color: C.creamMuted }}>·</span>}
                        </span>
                      ))}
                    </div>
                  ) : c.link ? (
                    <a href={c.link} target={c.link.startsWith('mailto:') ? '_self' : '_blank'} rel="noopener noreferrer" style={{ fontSize: 14, color: C.saffron, textDecoration: 'none', lineHeight: 1.65, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.gold; (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.saffron; (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none' }}
                    >
                      {c.value} <span style={{ fontSize: 12 }}>↗</span>
                    </a>
                  ) : (
                    <div style={{ fontSize: 14, color: C.creamFaint, lineHeight: 1.65 }}>{c.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Interactive Google Map & 360° View Container */}
            <div style={{ border: `1px solid ${C.border}`, background: '#120508', borderRadius: 8, overflow: 'hidden', marginTop: 16 }}>
              <div style={{ position: 'relative', height: 230, width: '100%' }}>
                <iframe
                  title="Uttar Kalikata Sarbojanin Durgotsav Location Map"
                  src="https://maps.google.com/maps?q=5/1+Balaram+Ghosh+Street,+Kolkata+-+700+004&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.85)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div style={{ padding: '12px 16px', background: 'rgba(15,9,4,0.95)', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=5%2F1+Balaram+Ghosh+Street,+Kolkata+-+700+004"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`, color: C.cream, fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.14em', textDecoration: 'none', boxShadow: '0 4px 16px rgba(196,30,58,0.35)', transition: 'all 0.2s', border: `1px solid ${C.borderBright}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)' }}
                >
                  🌐 360° STREET VIEW
                </a>
              </div>
            </div>
          </div>

          <div>
            <div style={{ padding: 24, border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.02)', marginBottom: 24 }}>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 13, color: C.gold, marginBottom: 10, letterSpacing: '0.12em' }}>Stay Updated</div>
              <p style={{ fontSize: 13, color: C.creamMuted, lineHeight: 1.7, marginBottom: 16 }}>Subscribe to receive Puja updates, event alerts, and community news directly in your inbox.</p>
              {newsletterSubmitted ? (
                <div style={{ fontSize: 13, color: C.gold, padding: '8px 0' }}>
                  ✓ Thank you! You have been subscribed to UKSD updates.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form-container" style={{ display: 'flex', width: '100%', maxWidth: '100%' }}>
                  <input type="email" name="newsletterEmail" required placeholder="your@email.com" className="newsletter-input" style={{ flex: 1, minWidth: 0, padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, borderRight: 'none', color: C.cream, fontSize: 13, outline: 'none', fontFamily: FONT_BODY }} />
                  <button type="submit" className="newsletter-btn" style={{ padding: '11px 18px', background: C.crimson, border: 'none', color: C.cream, fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.12em', cursor: 'pointer', flexShrink: 0 }}>SUBSCRIBE</button>
                </form>
              )}
            </div>

            {/* Unified Location & Transit Snapshots Collage */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 12, letterSpacing: '0.22em', color: C.gold, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: C.saffron }}>📍</span> Location & Transit Collage
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 8,
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: `1px solid ${C.borderBright}`,
                  background: C.bgDark,
                  padding: 8,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                  transition: 'border-color 0.3s, box-shadow 0.3s'
                }}
              >
                {[
                  { id: 'map-snapshot', img: '/puja_area_map.jpg', alt: 'Puja Area Map Snapshot' },
                  { id: 'crossing-snapshot', img: '/shyambazar_crossing.png', alt: 'Shyambazar 5-Point Crossing' },
                  { id: 'metro-gate-snapshot', img: '/shyambazar_metro_gate.jpg', alt: 'Shyambazar Metro Station Gate' },
                  { id: 'bus-snapshot', img: '/kolkata_bus.jpg', alt: 'Public Bus Hub' }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setLightbox(item.img)}
                    style={{
                      position: 'relative',
                      height: 160,
                      borderRadius: 8,
                      overflow: 'hidden',
                      cursor: 'zoom-in',
                      background: '#100804'
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s'
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '56px 24px 28px', background: C.bgDark, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
            <div>
              <div onClick={() => setLogoZoomed(true)} title="Click to view full logo" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, cursor: 'pointer', userSelect: 'none' }}>
                <img src={logoImg} alt="Uttar Kalikata Sarbojanin Durgotsav Samity logo" style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `2px solid ${C.borderBright}`, boxShadow: '0 0 16px rgba(196,30,58,0.45)', transition: 'transform 0.25s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.15 }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 700, color: C.gold, letterSpacing: '0.08em' }}>UTTAR</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 700, color: C.gold, letterSpacing: '0.08em' }}>KALIKATA</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 700, color: C.gold, letterSpacing: '0.08em' }}>SARBOJANIN</span>
                  <span style={{ fontFamily: FONT_SERIF, fontSize: 9, fontWeight: 600, color: C.saffron, letterSpacing: '0.14em' }}>DURGOTSAV</span>
                  <span style={{ fontFamily: FONT_SERIF, fontSize: 9, fontWeight: 600, color: C.saffron, letterSpacing: '0.14em' }}>SAMITY</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.creamMuted, lineHeight: 1.8 }}>Celebrating devotion, art, and community spirit since 1932. North Kolkata&#39;s pride and joy.</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                {[
                  { sym: 'f', title: 'Facebook', url: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/' },
                  { sym: '◉', title: 'Instagram', url: 'https://www.instagram.com/uttar_kalikata_sarbojanin' },
                  { sym: '▶', title: 'YouTube', url: 'https://www.youtube.com/@UttarKalikataSarbojanin' }
                ].map(s => (
                  <a key={s.title} href={s.url} target="_blank" rel="noopener noreferrer" title={s.title} style={{ width: 32, height: 32, border: `1px solid ${C.border}`, background: 'transparent', color: C.creamMuted, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', textDecoration: 'none' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.gold; (e.currentTarget as HTMLAnchorElement).style.color = C.gold }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border; (e.currentTarget as HTMLAnchorElement).style.color = C.creamMuted }}
                  >{s.sym}</a>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Quick Navigation',
                links: NAV_ITEMS.map(item => ({
                  l: item === 'About' ? 'About Us' : item === 'Contact' ? 'Contact Us' : item,
                  h: navHref(item)
                }))
              },
              {
                title: 'Community & Services',
                links: [
                  { l: 'Work With Us', h: '#work-with-us' },
                  { l: 'Sponsorship Inquiry', h: '#sponsorship' },
                  { l: 'Festival Advertisement', h: '#advertise-with-us' },
                  { l: 'Privileged Entry Pass', h: '#priviledge-form' },
                  { l: 'Subhechha Wishbook Wall', h: '#subhechha' },
                  { l: 'Awards & Honors', h: '#awards' },
                  { l: 'Press & Media Contact', h: '#contact' },
                ]
              },
              {
                title: 'Archives & Media',
                links: [
                  { l: '2026 Theme: Jol Chhaper Kolikata', h: '#about' },
                  { l: '2025 Heritage Photo Archive', h: '#gallery' },
                  { l: '2025 Best Pandal Award Winner', h: '#awards' },
                  { l: 'Official Facebook Page', h: 'https://www.facebook.com/people/Uttar-Kalikata-Sarbojanin-Durgatsav-Samity/61578144026365/' },
                  { l: 'Official Instagram Channel', h: 'https://www.instagram.com/uttar_kalikata_sarbojanin' },
                  { l: 'Official YouTube Channel', h: 'https://www.youtube.com/@UttarKalikataSarbojanin' },
                ]
              },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.22em', color: C.gold, marginBottom: 18, textTransform: 'uppercase' }}>{col.title}</div>
                {col.links.map(({ l, h }) => (
                  <a key={l} href={h} target={h.startsWith('http') ? '_blank' : '_self'} rel={h.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ display: 'block', fontSize: 13, color: C.creamMuted, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.saffron }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.creamMuted }}
                  >{l}</a>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
            <div style={{ fontSize: 12, color: 'rgba(253,246,227,0.28)' }}>© 2026 Uttar Kalikata Sarbojanin Durgotsav Samity. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(item => (
                <a key={item} href="#" style={{ fontSize: 12, color: 'rgba(253,246,227,0.28)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.gold }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(253,246,227,0.28)' }}
                >{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── FESTIVE AUDIO PLAYER & PLAYLIST DRAWER ── */}
      {playlistOpen && (
        <div className="playlist-drawer-card" style={{
          position: 'fixed',
          bottom: 98,
          right: 24,
          zIndex: 350,
          width: 'min(90vw, 360px)',
          background: 'rgba(15, 9, 4, 0.96)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${C.borderBright}`,
          borderRadius: 16,
          padding: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.85), 0 0 25px rgba(212,160,23,0.25)',
          animation: 'zoomInModal 0.25s ease-out'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, borderBottom: `1px solid ${C.border}`, paddingBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🔱</span>
              <span style={{ fontFamily: FONT_SERIF, fontSize: 11, letterSpacing: '0.14em', color: C.gold, fontWeight: 700, textTransform: 'uppercase' }}>
                Festive Audio Playlist
              </span>
            </div>
            <button
              onClick={() => setPlaylistOpen(false)}
              style={{ background: 'none', border: 'none', color: C.creamMuted, fontSize: 18, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}
              title="Close Playlist"
            >
              ✕
            </button>
          </div>

          {/* Now Playing Banner */}
          <div style={{ background: 'rgba(196,30,58,0.12)', border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.18em', color: C.saffron, fontFamily: FONT_SERIF, textTransform: 'uppercase', fontWeight: 700 }}>
                NOW PLAYING · TRACK {currentTrackIndex + 1}/{FESTIVE_PLAYLIST.length}
              </span>
              <span style={{ background: C.crimson, color: C.cream, fontSize: 9, padding: '2px 8px', borderRadius: 10, fontFamily: FONT_SERIF, fontWeight: 600 }}>
                {FESTIVE_PLAYLIST[currentTrackIndex].category}
              </span>
            </div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 13, fontWeight: 700, color: C.cream, lineHeight: 1.3, marginBottom: 4 }}>
              {FESTIVE_PLAYLIST[currentTrackIndex].title}
            </div>
            <div style={{ fontSize: 11, color: C.creamMuted, lineHeight: 1.4 }}>
              {FESTIVE_PLAYLIST[currentTrackIndex].subtitle}
            </div>
          </div>

          {/* Playback Controls & Volume Slider */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 16, background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={prevTrack}
                title="Previous Track"
                style={{ background: 'none', border: 'none', color: C.gold, fontSize: 16, cursor: 'pointer', padding: 4 }}
              >
                ⏮
              </button>
              <button
                onClick={toggleAudio}
                title={audioPlaying ? 'Pause' : 'Play'}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})`,
                  border: `1.5px solid ${C.gold}`,
                  color: C.cream,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(196,30,58,0.5)'
                }}
              >
                {audioPlaying ? '⏸' : '▶'}
              </button>
              <button
                onClick={nextTrack}
                title="Next Track"
                style={{ background: 'none', border: 'none', color: C.gold, fontSize: 16, cursor: 'pointer', padding: 4 }}
              >
                ⏭
              </button>
            </div>

            {/* Volume Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: C.gold }}>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={e => handleVolumeChange(parseFloat(e.target.value))}
                style={{ width: 65, accentColor: C.gold, cursor: 'pointer' }}
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
            </div>
          </div>

          {/* Song Track List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 180, overflowY: 'auto', paddingRight: 2 }}>
            {FESTIVE_PLAYLIST.map((track, idx) => {
              const isActive = currentTrackIndex === idx
              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: isActive ? 'rgba(212,160,23,0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive ? C.gold : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12, color: isActive ? C.gold : C.creamMuted, fontWeight: isActive ? 700 : 400, width: 14 }}>
                      {isActive && audioPlaying ? '▶' : `${idx + 1}`}
                    </span>
                    <div>
                      <div style={{ fontFamily: FONT_SERIF, fontSize: 12, fontWeight: isActive ? 700 : 500, color: isActive ? C.gold : C.creamFaint }}>
                        {track.title}
                      </div>
                      <div style={{ fontSize: 10, color: C.creamMuted }}>
                        {track.subtitle}
                      </div>
                    </div>
                  </div>

                  <span style={{ fontSize: 9, background: isActive ? C.crimson : 'rgba(255,255,255,0.06)', color: isActive ? C.cream : C.creamMuted, padding: '2px 6px', borderRadius: 4 }}>
                    {track.category}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── FLOATING AUDIO & PLAYLIST CONTROLS ── */}
      <div className="floating-dhaki-btn" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 300, display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Playlist Toggle Pill Button */}
        <button
          className="floating-playlist-pill"
          onClick={() => setPlaylistOpen(o => !o)}
          title="Open Festive Songs Playlist"
          style={{
            padding: '8px 14px',
            borderRadius: 20,
            background: playlistOpen ? C.crimson : 'rgba(15,9,4,0.92)',
            border: `1px solid ${C.gold}`,
            color: C.cream,
            fontFamily: FONT_SERIF,
            fontSize: 10,
            letterSpacing: '0.14em',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
        >
          🎵 PLAYLIST ({FESTIVE_PLAYLIST.length})
        </button>

        {/* Dhaki Drum Player Button */}
        <button onClick={toggleAudio} title={audioPlaying ? 'Pause Audio' : 'Play Audio'} style={{
          width: 58, height: 58, borderRadius: '50%',
          background: audioPlaying ? `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDeep})` : `linear-gradient(135deg, ${C.gold}, #a07010)`,
          border: `2px solid ${audioPlaying ? C.gold : '#FFF'}`, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: audioPlaying ? '0 0 0 4px rgba(196,30,58,0.45), 0 8px 25px rgba(0,0,0,0.6)' : '0 0 0 4px rgba(212,160,23,0.4), 0 8px 25px rgba(0,0,0,0.6)',
          transition: 'all 0.3s',
          position: 'relative'
        }}>
          {/* Traditional Dhaki playing Dhak SVG Icon */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34 }}>
            <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 22C18 17 46 17 46 22L42 46C42 50 22 50 22 46L18 22Z" fill="#D4A017" stroke="#FFF" strokeWidth="2" />
              <ellipse cx="32" cy="19" rx="14" ry="4" fill="#FCE205" stroke="#8B0000" strokeWidth="1.5" />
              <ellipse cx="32" cy="46" rx="10" ry="3" fill="#8B6508" stroke="#FFF" strokeWidth="1" />
              <path d="M20 22L24 46M28 20L28 47M36 20L36 47M44 22L40 46" stroke="#8B0000" strokeWidth="1.5" />
              <path d="M14 17C9 11 5 13 3 19C7 19 11 19 15 20" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M15 15C10 8 6 9 3 14C8 15 12 16 16 18" stroke="#FCE205" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M21 11L30 20" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M43 11L34 20" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="32" cy="9" r="4.5" fill="#FFF" />
              <path d="M25 15C27 13 37 13 39 15L41 20H23L25 15Z" fill="#FFF" />
            </svg>
            {audioPlaying && (
              <span style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#FCE205',
                boxShadow: '0 0 10px #FCE205',
                animation: 'shimmer 1s infinite'
              }} />
            )}
          </div>
        </button>
      </div>

      {/* ── LOGO ZOOM LIGHTBOX MODAL ── */}
      {logoZoomed && (
        <div
          onClick={() => setLogoZoomed(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(10, 5, 2, 0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            cursor: 'zoom-out',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, rgba(139,90,43,0.3) 0%, rgba(15,9,4,0.96) 80%)',
              border: `2px solid ${C.borderBright}`,
              borderRadius: 20,
              padding: '36px 28px 28px',
              boxShadow: '0 0 60px rgba(196,30,58,0.5), 0 0 120px rgba(212,160,23,0.3)',
              cursor: 'default',
              animation: 'zoomInModal 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Cross Close Button */}
            <button
              onClick={() => setLogoZoomed(false)}
              aria-label="Close zoomed logo"
              title="Close (Esc)"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 42,
                height: 42,
                borderRadius: '50%',
                border: `1px solid ${C.gold}`,
                background: 'rgba(23, 15, 8, 0.9)',
                color: C.gold,
                fontSize: 20,
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = C.crimson
                e.currentTarget.style.color = C.cream
                e.currentTarget.style.borderColor = C.crimson
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(23, 15, 8, 0.9)'
                e.currentTarget.style.color = C.gold
                e.currentTarget.style.borderColor = C.gold
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              ✕
            </button>

            {/* High-Res Center Zoomed Logo */}
            <img
              src={logoImg}
              alt="Uttar Kalikata Sarbojanin Durgotsav Samity logo"
              style={{
                maxWidth: 'min(82vw, 560px)',
                maxHeight: 'min(68vh, 560px)',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '50%',
                boxShadow: '0 0 50px rgba(212,160,23,0.5), 0 0 25px rgba(196,30,58,0.7)',
                border: `3px solid ${C.gold}`
              }}
            />

            {/* Title / Emblem Label */}
            <div style={{ marginTop: 22, textAlign: 'center' }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(14px, 2.5vw, 20px)', fontWeight: 700, color: C.gold, letterSpacing: '0.06em' }}>
                UTTAR KALIKATA SARBOJANIN DURGOTSAV SAMITY
              </div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 12, color: C.saffron, letterSpacing: '0.16em', marginTop: 4 }}>
                OFFICIAL EMBLEM · EST. 1932
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
