import React, { StrictMode, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { buildApiUrl, fetchApi } from './apiConfig';

const destinations = [
  {
    id: 'pokhara',
    name: 'Pokhara',
    location: 'Gandaki Province, Nepal',
    category: 'Lakes & Nature',
    description: 'A peaceful lakeside city with mountain views, paragliding and sunrise adventures.',
    rating: '4.9',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Phewa_Lake_of_Pokhara_city.jpg',
    region: 'Gandaki',
    filterCategory: 'Lakes',
    difficulty: 'Easy',
    budget: 'Mid-range',
    popularity: 'Popular',
    season: 'Autumn',
  },
  {
    id: 'everest',
    name: 'Everest Region',
    location: 'Solukhumbu',
    category: 'Trekking',
    description: 'Walk through legendary Sherpa villages towards the foot of the world’s highest peak.',
    rating: '5.0',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Everest%2C_Himalayas.jpg',
    region: 'Koshi',
    filterCategory: 'Mountains',
    difficulty: 'Challenging',
    budget: 'Premium',
    popularity: 'Trending',
    season: 'Spring',
  },
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    location: 'Bagmati Province',
    category: 'Culture & Heritage',
    description: 'Explore living heritage, golden temples and centuries of stories in every courtyard.',
    rating: '4.8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Three_saddhus_at_Kathmandu_Durbar_Square.jpg',
    region: 'Bagmati',
    filterCategory: 'Kathmandu Valley',
    difficulty: 'Easy',
    budget: 'Budget',
    popularity: 'Popular',
    season: 'Autumn',
  },
  {
    id: 'chitwan',
    name: 'Chitwan',
    location: 'Chitwan',
    category: 'Wildlife',
    description: 'Meet rhinos, crocodiles and jungle birds on a memorable Terai safari.',
    rating: '4.8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/White-rumped_vulture_in_Chitwan_National_Park.jpg',
    region: 'Madhesh',
    filterCategory: 'National Parks',
    difficulty: 'Easy',
    budget: 'Mid-range',
    popularity: 'Popular',
    season: 'Winter',
  },
  {
    id: 'bandipur',
    name: 'Bandipur',
    location: 'Tanahun',
    category: 'Culture & Heritage',
    description: 'A beautifully preserved hilltop town with timeless architecture and warm local life.',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1000&q=85',
    region: 'Gandaki',
    filterCategory: 'Villages',
    difficulty: 'Moderate',
    budget: 'Budget',
    popularity: 'Recommended',
    season: 'Spring',
  },
  {
    id: 'rara-lake',
    name: 'Rara Lake',
    location: 'Mugu',
    category: 'Lakes & Nature',
    description: 'Find stillness beside Nepal’s deepest lake, surrounded by pine forests and wild hills.',
    rating: '4.9',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/The_Heavenly_Rara_Lake_-_edited_2.jpg',
    region: 'Karnali',
    filterCategory: 'Lakes',
    difficulty: 'Moderate',
    budget: 'Budget',
    popularity: 'Hidden gem',
    season: 'Summer',
  },
  {
    id: 'lumbini',
    name: 'Lumbini',
    location: 'Rupandehi',
    category: 'Culture & Heritage',
    description: 'Visit the birthplace of Buddha and walk through peaceful monastic gardens.',
    rating: '4.8',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Maya%20Devi%20Temple%2C%20Lumbini.jpg',
    region: 'Lumbini',
    filterCategory: 'Religious Sites',
    difficulty: 'Easy',
    budget: 'Budget',
    popularity: 'Recommended',
    season: 'Winter',
  },
  {
    id: 'annapurna',
    name: 'Annapurna Region',
    location: 'Kaski',
    category: 'Trekking',
    description: 'A scenic ridge trek with intimate mountain views and quiet forest trails.',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1000&q=85',
    region: 'Gandaki',
    filterCategory: 'Adventure',
    difficulty: 'Moderate',
    budget: 'Mid-range',
    popularity: 'Trending',
    season: 'Spring',
  },
  {
    id: 'swayambhunath',
    name: 'Swayambhunath Stupa',
    location: 'Kathmandu',
    category: 'Culture & Heritage',
    description: 'Climb to the hilltop stupa for panoramic valley views and timeless ritual.',
    rating: '4.7',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Swayambhunath_Stupa_-Kathmandu_Nepal-0336.jpg',
    region: 'Bagmati',
    filterCategory: 'Temples',
    difficulty: 'Easy',
    budget: 'Budget',
    popularity: 'Popular',
    season: 'Autumn',
  },
  {
    id: 'sagarmatha',
    name: 'Sagarmatha National Park',
    location: 'Solukhumbu',
    category: 'Wildlife',
    description: 'Discover rare Himalayan wildlife, glacial valleys and Sherpa mountain culture.',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1000&q=85',
    region: 'Koshi',
    filterCategory: 'Wildlife',
    difficulty: 'Challenging',
    budget: 'Premium',
    popularity: 'Recommended',
    season: 'Spring',
  },
  {
    id: 'poon-hill',
    name: 'Poon Hill',
    location: 'Myagdi',
    category: 'Trekking',
    description: 'Catch one of Nepal’s most rewarding sunrise views on a classic short trek.',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=85',
    region: 'Gandaki',
    filterCategory: 'Scenic Places',
    difficulty: 'Moderate',
    budget: 'Budget',
    popularity: 'Popular',
    season: 'Autumn',
  },
  {
    id: 'patan',
    name: 'Patan Durbar Square',
    location: 'Lalitpur',
    category: 'Culture & Heritage',
    description: 'Admire Newari craftsmanship, courtyards and temples in a living museum.',
    rating: '4.8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Nepal_Patan_Mangal.jpg',
    region: 'Bagmati',
    filterCategory: 'Heritage Sites',
    difficulty: 'Easy',
    budget: 'Budget',
    popularity: 'Popular',
    season: 'Winter',
  },
  {
    id: 'bhaktapur',
    name: 'Bhaktapur',
    location: 'Bhaktapur, Bagmati Province',
    category: 'Culture & Heritage',
    description: 'A preserved Newari city known for brick courtyards, carved wood and timeless squares.',
    rating: '4.8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Bhaktapur_Durbar_Square_2018_13.jpg',
    region: 'Bagmati',
    filterCategory: 'Heritage Sites',
    difficulty: 'Easy',
    budget: 'Budget',
    popularity: 'Recommended',
    season: 'Autumn',
  },
  {
    id: 'mustang',
    name: 'Mustang',
    location: 'Gandaki Province, Nepal',
    category: 'Scenic Places',
    description: 'A high-desert landscape of red cliffs, ancient caves and Tibetan-influenced villages.',
    rating: '4.9',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Mustang_Valley%2C_Nepal.jpg',
    region: 'Gandaki',
    filterCategory: 'Mountains',
    difficulty: 'Challenging',
    budget: 'Premium',
    popularity: 'Trending',
    season: 'Summer',
  },
  {
    id: 'langtang',
    name: 'Langtang',
    location: 'Bagmati Province, Nepal',
    category: 'Trekking',
    description: 'A close-to-Kathmandu Himalayan valley with forests, yak pastures and mountain views.',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=85',
    region: 'Bagmati',
    filterCategory: 'Trekking',
    difficulty: 'Moderate',
    budget: 'Mid-range',
    popularity: 'Recommended',
    season: 'Spring',
  },
  {
    id: 'janakpur',
    name: 'Janakpur',
    location: 'Madhesh Province, Nepal',
    category: 'Religious Sites',
    description: 'A vibrant pilgrimage city known for Janaki Temple, Mithila art, religious heritage and living local traditions.',
    rating: '4.7',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Janaki_Temple%2C_Janakpur-September_22%2C_2016-IMG_7493.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/f/f7/Janaki_Temple%2C_Janakpur-September_22%2C_2016-IMG_7493.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7b/Janaki_Temple%2C_Janakpur-September_22%2C_2016-IMG_7502.jpg',
    ],
    region: 'Madhesh',
    filterCategory: 'Religious Sites',
    difficulty: 'Easy',
    budget: 'Budget',
    popularity: 'Recommended',
    season: 'Winter',
  },
  {
    id: 'ilam',
    name: 'Ilam',
    location: 'Koshi Province, Nepal',
    category: 'Scenic Places',
    description: 'Rolling tea gardens, misty hills and quiet viewpoints in eastern Nepal.',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85',
    region: 'Koshi',
    filterCategory: 'Scenic Places',
    difficulty: 'Easy',
    budget: 'Budget',
    popularity: 'Hidden gem',
    season: 'Spring',
  },
  {
    id: 'dolpo',
    name: 'Dolpo',
    location: 'Karnali Province, Nepal',
    category: 'Scenic Places',
    description: 'Remote valleys, ancient monasteries and an extraordinary silence beyond the main trails.',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    region: 'Karnali',
    filterCategory: 'Scenic Places',
    difficulty: 'Challenging',
    budget: 'Premium',
    popularity: 'Hidden gem',
    season: 'Summer',
  },
];

const additionalDestinations = [
  ['manang', 'Manang', 'Manang, Gandaki Province', 'A high Himalayan valley of dramatic trails, blue skies and traditional mountain villages.', 'Trekking', 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1000&q=85', 'mountain', '4.8', 'Spring / Autumn', ['Annapurna Circuit', 'Gangapurna Lake', 'Manang villages'], ['Trekking', 'Photography', 'Acclimatization']],
  ['gosaikunda', 'Gosaikunda', 'Rasuwa, Bagmati Province', 'A sacred alpine lake reached through rhododendron forests and high Himalayan ridges.', 'Trekking', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=85', 'mountain', '4.8', 'Spring / Autumn', ['Gosaikunda Lake', 'Lauribina Pass', 'Himalayan views'], ['Trekking', 'Pilgrimage', 'Photography']],
  ['makalu', 'Makalu Region', 'Sankhuwasabha, Koshi Province', 'A remote wilderness beneath Makalu, Nepal’s fifth-highest mountain.', 'Mountains', 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1000&q=85', 'mountain', '4.7', 'Spring / Autumn', ['Mount Makalu', 'Makalu-Barun Valley', 'High mountain wilderness'], ['Trekking', 'Mountaineering', 'Wildlife']],
  ['kanchenjunga', 'Kanchenjunga Region', 'Taplejung, Koshi Province', 'A far-eastern mountain region with pristine trails and views of Kanchenjunga.', 'Mountains', 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1000&q=85', 'mountain', '4.7', 'Spring / Autumn', ['Kanchenjunga massif', 'Glacial valleys', 'Limbu culture'], ['Trekking', 'Mountaineering', 'Photography']],
  ['nagarkot', 'Nagarkot', 'Bhaktapur, Bagmati Province', 'A peaceful ridge town known for sunrise panoramas across the Himalayan range.', 'Scenic Places', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=85', 'hill', '4.6', 'Autumn / Spring', ['Himalayan sunrise', 'View tower', 'Pine forests'], ['Sunrise viewing', 'Hiking', 'Photography']],
  ['dhulikhel', 'Dhulikhel', 'Kavrepalanchok, Bagmati Province', 'A historic hill town blending Newari heritage with wide Himalayan views.', 'Culture & Heritage', 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1000&q=85', 'hill', '4.6', 'Autumn / Spring', ['Old town', 'Himalayan panorama', 'Namo Buddha nearby'], ['Hiking', 'Cultural tours', 'Photography']],
  ['tansen', 'Tansen / Palpa', 'Palpa, Lumbini Province', 'A graceful hill town of winding lanes, traditional houses and Magar heritage.', 'Culture & Heritage', 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1000&q=85', 'hill', '4.6', 'Autumn / Spring', ['Tansen bazaar', 'Rani Mahal', 'Srinagar Hill'], ['Heritage walks', 'Hiking', 'Local crafts']],
  ['gorkha', 'Gorkha', 'Gorkha, Gandaki Province', 'A historic hill destination where Nepal’s unification story meets mountain scenery.', 'Heritage Sites', 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1000&q=85', 'hill', '4.6', 'Autumn / Spring', ['Gorkha Durbar', 'Gorakhnath Temple', 'Himalayan views'], ['Heritage walks', 'Hiking', 'History']],
  ['sarangkot', 'Sarangkot', 'Kaski, Gandaki Province', 'Pokhara’s famous ridge for sunrise, paragliding and Annapurna panoramas.', 'Adventure', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85', 'hill', '4.8', 'Autumn / Spring', ['Annapurna sunrise', 'Phewa Lake views', 'Paragliding launch'], ['Paragliding', 'Sunrise viewing', 'Photography']],
  ['bardiya', 'Bardiya', 'Bardiya, Lumbini Province', 'A quiet western wilderness with rich wildlife and immersive jungle experiences.', 'Wildlife', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=85', 'terai', '4.7', 'Winter', ['Bardiya National Park', 'Wild elephants', 'Tharu villages'], ['Jungle safari', 'Birdwatching', 'Cultural tours']],
  ['koshi-tappu', 'Koshi Tappu', 'Sunsari / Saptari, Koshi Province', 'A wetland sanctuary famous for birdlife, river landscapes and wild water buffalo.', 'Wildlife', 'https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=1000&q=85', 'terai', '4.6', 'Winter', ['Koshi Tappu Wildlife Reserve', 'Migratory birds', 'Arna buffalo'], ['Birdwatching', 'Boat rides', 'Wildlife photography']],
  ['birgunj', 'Birgunj', 'Parsa, Madhesh Province', 'A lively gateway city with markets, local flavors and access to southern Nepal.', 'Cultural Places', 'https://upload.wikimedia.org/wikipedia/commons/8/84/Birgunj_Ghantaghar.jpg', 'terai', '4.4', 'Winter', ['Ghantaghar', 'Local markets', 'Terai cuisine'], ['Food tours', 'Shopping', 'Cultural walks']],
  ['nepalgunj', 'Nepalgunj', 'Banke, Lumbini Province', 'A diverse western hub and gateway to Bardiya and remote mountain journeys.', 'Cultural Places', 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=1000&q=85', 'terai', '4.4', 'Winter', ['Local bazaars', 'Tharu culture', 'Gateway to Bardiya'], ['Food tours', 'Shopping', 'Cultural tours']],
  ['dharan', 'Dharan', 'Sunsari, Koshi Province', 'A green eastern city framed by foothills, temples and diverse cultural traditions.', 'Cultural Places', 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85', 'terai', '4.5', 'Winter / Spring', ['Buddha Subba Temple', 'Vijayapur hills', 'Eastern culture'], ['Hiking', 'Cultural tours', 'Food tours']],
].map(([id, name, location, description, category, image, region, rating, season, famousFor, activities]) => ({
  id, name, location, description, category, image, region, rating, season,
  filterCategory: category, difficulty: 'Easy', budget: 'Budget', popularity: 'Recommended',
  bestSeason: season, famousFor, activities,
}));

const kathmanduValleyPlaces = [
  ['pashupatinath-temple', 'Pashupatinath Temple', 'Kathmandu, Nepal', 'Temple / Hindu Heritage', 'A sacred Hindu temple complex beside the Bagmati River and one of Kathmandu’s most important religious heritage sites.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Pashupatinath_Temple.jpg?width=1000', ['Sacred Hindu temple complex', 'Bagmati River', 'Shiva worship', 'Maha Shivaratri'], ['Temple visits', 'Heritage walks', 'Photography'], ['Maha Shivaratri', 'Tihar'], 'Kathmandu'],
  ['boudhanath', 'Boudhanath Stupa', 'Kathmandu, Nepal', 'Buddhist Stupa', 'A vast Buddhist stupa surrounded by Tibetan Buddhist monasteries, prayer flags and a lively devotional community.', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Boudha_Stupa_2018_04.jpg', ['Large Buddhist stupa', 'Tibetan Buddhist culture', 'Prayer flags', 'Monasteries'], ['Circumambulation', 'Monastery visits', 'Cultural walks'], ['Tihar'], 'Kathmandu'],
  ['kathmandu-durbar-square', 'Kathmandu Durbar Square', 'Kathmandu, Nepal', 'UNESCO Heritage', 'A historic palace complex of temples, courtyards and Newari architecture at the heart of old Kathmandu, including Hanuman Dhoka and Kumari Ghar.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Kathmandu_Durbar_Square.jpg?width=1000', ['Historic palace complex', 'Temples', 'Newari architecture', 'Kumari Ghar and Hanuman Dhoka'], ['Heritage walks', 'Architecture tours', 'Museum visits'], ['Indra Jatra', 'Tihar'], 'Kathmandu'],
  ['budhanilkantha', 'Budhanilkantha Temple', 'Kathmandu, Nepal', 'Hindu Temple', 'A revered shrine known for its large reclining Vishnu statue resting in a sacred pond at the foot of the hills.', 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Young_priests_at_the_Budhanilkantha_Temple_in_Nepal-070A7872.jpg', ['Reclining Vishnu statue', 'Religious heritage', 'Sacred pond'], ['Temple visit', 'Quiet observation', 'Photography from permitted areas'], [], 'Kathmandu'],
  ['dakshinkali', 'Dakshinkali Temple', 'Kathmandu Valley, Nepal', 'Hindu Temple', 'A pilgrimage temple complex dedicated to Goddess Kali in a wooded valley south of Kathmandu.', 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Dakshinkali_Temple_Kathmandu_Nepal.jpg', ['Goddess Kali', 'Religious pilgrimage', 'Temple complex'], ['Pilgrimage', 'Temple visits', 'Nature walks'], [], 'Kathmandu'],
  ['kirtipur', 'Kirtipur', 'Kathmandu Valley, Nepal', 'Historic Site', 'A hilltop historic town with Newari culture, traditional streets, temples and broad valley views.', 'https://upload.wikimedia.org/wikipedia/commons/7/77/Kirtipur_city_gate.jpg', ['Newari culture', 'Historic architecture', 'Temples', 'Hilltop views'], ['Old-town walks', 'Temple visits', 'Local food'], [], 'Kathmandu'],
  ['patan-durbar-square', 'Patan Durbar Square', 'Lalitpur, Nepal', 'UNESCO Heritage', 'A celebrated royal square filled with Newari craftsmanship, temples, courtyards and the stone Krishna Mandir.', 'https://upload.wikimedia.org/wikipedia/commons/4/40/Nepal_Patan_Mangal.jpg', ['Newari architecture', 'Royal palace', 'Temples', 'Krishna Mandir'], ['Heritage walks', 'Museum visits', 'Architecture tours'], ['Rato Machhindranath Jatra', 'Tihar'], 'Lalitpur'],
  ['krishna-mandir-patan', 'Krishna Mandir', 'Patan, Lalitpur, Nepal', 'Hindu Temple', 'A finely carved stone temple dedicated to Krishna and a focal point of Patan Durbar Square.', 'https://upload.wikimedia.org/wikipedia/commons/0/05/Krishna_mandir_patan_nepal.jpg', ['Krishna worship', 'Stone architecture', 'Patan Durbar Square'], ['Temple visits', 'Architecture study', 'Heritage walks'], ['Krishna Janmashtami'], 'Lalitpur'],
  ['golden-temple-patan', 'Golden Temple / Hiranya Varna Mahavihar', 'Patan, Lalitpur, Nepal', 'Buddhist Heritage', 'A historic Buddhist monastery with traditional Newari architecture, courtyards and richly decorated metalwork.', 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Patan%2C_Nepal_%2823022734263%29.jpg', ['Buddhist monastery', 'Newari architecture', 'Golden decorations'], ['Monastery visit', 'Courtyard walks', 'Cultural photography'], [], 'Lalitpur'],
  ['kumbheshwar', 'Kumbheshwar Temple', 'Patan, Lalitpur, Nepal', 'Hindu Temple', 'A traditional Shiva temple and important part of Patan’s living religious heritage.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Kumbheshwar_Temple_%2816800%29.jpg?width=800', ['Shiva temple', 'Traditional architecture', 'Religious heritage'], ['Temple visits', 'Heritage walks', 'Local observation'], [], 'Lalitpur'],
  ['mahaboudha', 'Mahaboudha Temple', 'Patan, Lalitpur, Nepal', 'Buddhist Heritage', 'A distinctive Buddhist temple inspired by Bodh Gaya and known for its many Buddha images and terracotta craftsmanship.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Mahaboudha_Sundhara_Patan_Lalitpur_Rajesh_Dhungana_%281%29.jpg?width=800', ['Buddhist architecture', 'Many Buddha images', 'Traditional craftsmanship'], ['Architecture tours', 'Photography', 'Quiet observation'], [], 'Lalitpur'],
  ['bhaktapur-durbar-square', 'Bhaktapur Durbar Square', 'Bhaktapur, Nepal', 'UNESCO Heritage', 'A historic square of palace buildings, temples, courtyards and carefully preserved Newari urban heritage.', 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Bhaktapur_Durbar_Square_2018_13.jpg', ['Newari architecture', 'Historic palace', 'Temples', 'Traditional squares'], ['Heritage walks', 'Museum visits', 'Food tours'], ['Bisket Jatra', 'Tihar'], 'Bhaktapur'],
  ['nyatapola-temple', 'Nyatapola Temple', 'Bhaktapur, Nepal', 'Hindu Temple', 'A landmark five-story pagoda at Taumadhi Square and one of Bhaktapur’s most recognizable architectural symbols.', 'https://upload.wikimedia.org/wikipedia/commons/3/33/Bisket_Jatra_festival_2018_at_the_Nyatapola_temple%2C_Bhaktapur.jpg', ['Five-story pagoda architecture', 'Newari architecture', 'Taumadhi Square'], ['Architecture tours', 'Square walks', 'Photography'], ['Bisket Jatra'], 'Bhaktapur'],
  ['dattatreya', 'Dattatreya Temple', 'Bhaktapur, Nepal', 'Hindu Temple', 'A historic temple in Dattatreya Square associated with Dattatreya tradition and Bhaktapur’s wood-carved architecture.', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Dattatreya_temple_Bhaktapur_Nepal.jpg', ['Historic temple', 'Dattatreya tradition', 'Traditional architecture'], ['Temple visits', 'Square walks', 'Cultural tours'], [], 'Bhaktapur'],
  ['55-windows-palace', '55 Windows Palace', 'Bhaktapur, Nepal', 'Historic Site', 'A celebrated palace façade known for traditional palace architecture, intricate wood carving and historic heritage.', 'https://commons.wikimedia.org/wiki/Special:FilePath/55_windows_Palace.jpg?width=800', ['Traditional palace architecture', 'Wood carving', 'Historic heritage'], ['Architecture tours', 'Heritage walks', 'Photography'], [], 'Bhaktapur'],
  ['pottery-square', 'Pottery Square', 'Bhaktapur, Nepal', 'Traditional Craft', 'A working square where visitors can observe traditional pottery, local craft and everyday Newari cultural life.', 'https://commons.wikimedia.org/wiki/Special:FilePath/In_and_around_Bhaktapur_Pottery_Square_28.jpg?width=800', ['Traditional pottery', 'Newari culture', 'Local crafts'], ['Craft observation', 'Cultural walks', 'Responsible shopping'], [], 'Bhaktapur'],
  ['kumari-ghar', 'Kumari Ghar', 'Kathmandu Durbar Square, Kathmandu, Nepal', 'Cultural Site', 'The elaborately carved residence associated with Kathmandu’s Kumari tradition, located in Kathmandu Durbar Square.', 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Kathmandu_Darbar0606_Kumari.JPG', ['Kumari tradition', 'Wood carving', 'Kathmandu Durbar Square'], ['Heritage walks', 'Architecture viewing', 'Respectful photography'], ['Indra Jatra'], 'Kathmandu'],
  ['changu-narayan', 'Changu Narayan Temple', 'Bhaktapur District, Kathmandu Valley, Nepal', 'Hindu Temple', 'An important Vishnu temple and heritage monument on a hilltop in Bhaktapur District, known for its historic stone and wood inscriptions.', 'https://upload.wikimedia.org/wikipedia/commons/9/99/Changu_Narayan-Garuda_Narayana-10-ost-2013-gje.jpg', ['Vishnu worship', 'Ancient inscriptions', 'Kathmandu Valley heritage'], ['Temple visits', 'Heritage walks', 'Village views'], [], 'Bhaktapur'],
  ['rato-machhindranath', 'Rato Machhindranath Temple', 'Patan, Lalitpur, Nepal', 'Hindu Temple', 'A revered Patan temple associated with the Rato Machhindranath tradition and one of the valley’s major chariot festivals.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Rato_Machindranath_Temple%2C_Patan.jpg?width=1000', ['Rato Machhindranath tradition', 'Patan heritage', 'Religious architecture'], ['Temple visits', 'Festival learning', 'Heritage walks'], ['Rato Machhindranath Jatra'], 'Lalitpur'],
  ['patan-museum', 'Patan Museum', 'Patan Durbar Square, Lalitpur, Nepal', 'Cultural Site', 'A museum in the former royal palace complex presenting Himalayan Buddhist and Hindu art in its historic Patan setting.', 'https://upload.wikimedia.org/wikipedia/commons/4/47/Woman_Sitting_at_the_Entrance_of_the_Patan_Museum-IMG_4106.jpg', ['Himalayan art', 'Royal palace complex', 'Patan heritage'], ['Museum visit', 'Art appreciation', 'Courtyard walks'], [], 'Lalitpur'],
  ['bungamati', 'Bungamati', 'Lalitpur, Nepal', 'Historic Site', 'A traditional Newari settlement south of Patan with historic courtyards, shrines and living craft traditions.', 'https://upload.wikimedia.org/wikipedia/commons/7/76/Bungamati-72-Hauptplatz-kleine_Pagode-2014-gje.jpg', ['Newari settlement', 'Traditional courtyards', 'Local crafts'], ['Village walks', 'Cultural observation', 'Photography'], [], 'Lalitpur'],
  ['khokana', 'Khokana', 'Lalitpur, Nepal', 'Historic Site', 'A historic Newari village known for traditional streets, community life and heritage architecture.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Khokana%2C_Nepal.jpg?width=1000', ['Newari village life', 'Heritage architecture', 'Traditional streets'], ['Village walks', 'Cultural tours', 'Responsible shopping'], [], 'Lalitpur'],
  ['taumadhi-square', 'Taumadhi Square', 'Bhaktapur, Nepal', 'Cultural Site', 'A celebrated Bhaktapur square framed by Nyatapola Temple, Bhairabnath Temple and traditional Newari urban life.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Taumadhi_Square%2C_Bhaktapur.jpg?width=1000', ['Nyatapola Temple', 'Newari urban heritage', 'Bisket Jatra setting'], ['Square walks', 'Architecture tours', 'Festival learning'], ['Bisket Jatra'], 'Bhaktapur'],
  ['dattatreya-square', 'Dattatreya Square', 'Bhaktapur, Nepal', 'Cultural Site', 'A historic Bhaktapur square centered on Dattatreya Temple and surrounded by traditional architecture and wood-carved details.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Dattatreya_Square%2C_Bhaktapur.jpg?width=1000', ['Dattatreya Temple', 'Traditional architecture', 'Bhaktapur heritage'], ['Square walks', 'Temple visits', 'Photography'], [], 'Bhaktapur'],
  ['garden-of-dreams', 'Garden of Dreams', 'Kathmandu, Nepal', 'Cultural Site', 'A restored historic garden near Kaiser Mahal offering a quiet urban space of pavilions, terraces and formal landscaping.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Garden_of_Dreams%2C_Kathmandu.jpg?width=1000', ['Historic garden', 'Kaiser Mahal setting', 'Urban heritage'], ['Garden walks', 'Quiet rest', 'Photography'], [], 'Kathmandu'],
  ['rani-pokhari', 'Rani Pokhari', 'Kathmandu, Nepal', 'Historic Site', 'A historic pond and landmark in central Kathmandu with a temple pavilion and strong civic and cultural significance.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Rani_Pokhari%2C_Kathmandu.jpg?width=1000', ['Historic pond', 'Temple pavilion', 'Kathmandu heritage'], ['Heritage walks', 'Photography', 'City sightseeing'], ['Tihar'], 'Kathmandu'],
  ['kopan-monastery', 'Kopan Monastery', 'Kathmandu, Nepal', 'Buddhist Heritage', 'A Tibetan Buddhist monastery on a hill north of Kathmandu known for its study, meditation and valley views.', 'https://upload.wikimedia.org/wikipedia/commons/1/14/Kopan_01.JPG', ['Tibetan Buddhism', 'Meditation', 'Hilltop views'], ['Monastery visit', 'Quiet reflection', 'Cultural learning'], [], 'Kathmandu'],
  ['chabahil-stupa', 'Chabahil Stupa', 'Kathmandu, Nepal', 'Buddhist Stupa', 'A historic Buddhist stupa and neighborhood landmark along Kathmandu’s ancient cultural routes.', 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Chabahil_Stupa_eyes_%2803%29.jpg', ['Buddhist heritage', 'Historic stupa', 'Local neighborhood'], ['Stupa visit', 'Heritage walks', 'Cultural observation'], [], 'Kathmandu'],
  ['seto-machindranath', 'Seto Machindranath Temple', 'Kathmandu, Nepal', 'Hindu Temple', 'A historic temple in central Kathmandu associated with the Seto Machindranath tradition and local chariot festival.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Seto_Machindranath_Temple%2C_Kathmandu.jpg?width=1000', ['Seto Machindranath tradition', 'Kathmandu heritage', 'Temple architecture'], ['Temple visits', 'Heritage walks', 'Festival learning'], ['Seto Machindranath Jatra'], 'Kathmandu'],
  ['gokarneshwar', 'Gokarneshwar Temple', 'Kathmandu, Nepal', 'Hindu Temple', 'A riverside temple complex dedicated to Shiva in the Gokarna area of Kathmandu Valley.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Gokarneshwar_Temple%2C_Kathmandu.jpg?width=1000', ['Shiva worship', 'Riverside heritage', 'Temple complex'], ['Temple visits', 'Heritage walks', 'Local observation'], [], 'Kathmandu'],
  ['sankhu', 'Sankhu', 'Kathmandu Valley, Nepal', 'Historic Site', 'A historic Newari town in the northeastern valley known for traditional streets, shrines and cultural festivals.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Sankhu%2C_Nepal.jpg?width=1000', ['Newari town', 'Traditional streets', 'Valley heritage'], ['Town walks', 'Cultural tours', 'Photography'], [], 'Kathmandu'],
  ['vajrayogini-temple', 'Vajrayogini Temple', 'Sankhu, Kathmandu Valley, Nepal', 'Buddhist Heritage', 'A significant hill shrine near Sankhu associated with Vajrayogini worship and Kathmandu Valley Buddhist heritage.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Vajrayogini_Temple%2C_Sankhu.jpg?width=1000', ['Vajrayogini tradition', 'Buddhist heritage', 'Sankhu pilgrimage'], ['Pilgrimage', 'Temple visits', 'Hill walks'], [], 'Kathmandu'],
].map(([id, name, location, type, description, image, famousFor, activities, festivals, area]) => ({
  id, name, location, type, category: type, valleyCategory: 'Kathmandu Valley', filterCategory: type, description, image, famousFor, activities, festivals,
  region: 'hill', area: area.toLowerCase().replace(' / ', '-'), province: 'Bagmati', rating: '4.8',
  difficulty: 'Easy', budget: 'Budget', popularity: 'Recommended', season: 'Autumn', bestSeason: 'Autumn and spring',
}));

const regionById = {
  pokhara: 'hill', everest: 'mountain', kathmandu: 'hill', chitwan: 'terai', bandipur: 'hill',
  'rara-lake': 'mountain', lumbini: 'terai', annapurna: 'mountain', swayambhunath: 'hill',
  sagarmatha: 'mountain', 'poon-hill': 'mountain', patan: 'hill', bhaktapur: 'hill',
  mustang: 'mountain', langtang: 'mountain', janakpur: 'terai', ilam: 'hill', dolpo: 'mountain',
};
const provinceById = Object.fromEntries(destinations.map((destination) => [destination.id, destination.region]));
destinations.forEach((destination) => {
  destination.province = provinceById[destination.id];
  destination.region = regionById[destination.id];
  destination.bestSeason = destination.season;
  destination.famousFor = destination.famousFor || [destination.name, destination.category, destination.location];
  destination.activities = destination.activities || ['Sightseeing', 'Photography', 'Local experiences'];
});
const destinationExperienceData = {
  pokhara: { famousFor: ['Phewa Lake', 'Sarangkot', 'Davis Falls', 'World Peace Pagoda', 'Annapurna views'], activities: ['Boating', 'Paragliding', 'Sightseeing', 'Photography'] },
  kathmandu: { famousFor: ['Pashupatinath Temple', 'Boudhanath Stupa', 'Swayambhunath', 'Kathmandu Durbar Square'], activities: ['Heritage walks', 'Temple visits', 'Food tours', 'Photography'] },
  chitwan: { famousFor: ['Chitwan National Park', 'Jungle safari', 'One-horned rhinoceros', 'Tharu culture'], activities: ['Jungle safari', 'Canoe rides', 'Birdwatching', 'Cultural tours'] },
  lumbini: { famousFor: ['Birthplace of Gautama Buddha', 'Maya Devi Temple', 'Monasteries', 'Buddhist heritage'], activities: ['Pilgrimage', 'Meditation', 'Cycling', 'Cultural tours'] },
  bhaktapur: { famousFor: ['Bhaktapur Durbar Square', 'Nyatapola Temple', 'Newari architecture', 'Traditional culture'], activities: ['Heritage walks', 'Craft workshops', 'Food tours', 'Photography'] },
  patan: { famousFor: ['Patan Durbar Square', 'Golden Temple', 'Newari craftsmanship', 'Living heritage'], activities: ['Heritage walks', 'Museum visits', 'Architecture tours', 'Photography'] },
  mustang: { famousFor: ['Red cliffs', 'Ancient caves', 'Lo Manthang', 'High-desert landscapes'], activities: ['Trekking', 'Jeep tours', 'Photography', 'Cultural tours'] },
  everest: { famousFor: ['Mount Everest', 'Sherpa villages', 'Everest Base Camp', 'Himalayan panoramas'], activities: ['Trekking', 'Mountaineering', 'Photography', 'Scenic flights'] },
  annapurna: { famousFor: ['Annapurna massif', 'Mountain villages', 'Rhododendron forests', 'Classic trekking routes'], activities: ['Trekking', 'Photography', 'Village walks', 'Mountaineering'] },
  langtang: { famousFor: ['Langtang Valley', 'Kyanjin Gompa', 'Yak pastures', 'Himalayan views'], activities: ['Trekking', 'Village walks', 'Photography', 'Pilgrimage'] },
  bandipur: { famousFor: ['Preserved Newari town', 'Siddha Gufa', 'Thani Mai Temple', 'Hilltop views'], activities: ['Heritage walks', 'Hiking', 'Cultural tours', 'Photography'] },
  'rara-lake': { famousFor: ['Rara Lake', 'Pine forests', 'Karnali wilderness', 'Blue mountain waters'], activities: ['Boating', 'Hiking', 'Camping', 'Photography'] },
  janakpur: { famousFor: ['Janaki Temple', 'Mithila culture', 'Religious tourism', 'Mithila art', 'Vivaha Panchami', 'Local traditions'], activities: ['Pilgrimage', 'Mithila art tours', 'Cultural walks', 'Local food experiences'] },
  ilam: { famousFor: ['Tea gardens', 'Misty hills', 'Kanyam', 'Eastern Nepal landscapes'], activities: ['Tea garden walks', 'Hiking', 'Photography', 'Food tours'] },
};
destinations.forEach((destination) => Object.assign(destination, destinationExperienceData[destination.id]));
additionalDestinations.forEach((destination) => {
  destination.province = {
    manang: 'Gandaki', gosaikunda: 'Bagmati', makalu: 'Koshi', kanchenjunga: 'Koshi',
    nagarkot: 'Bagmati', dhulikhel: 'Bagmati', tansen: 'Lumbini', gorkha: 'Gandaki',
    sarangkot: 'Gandaki', bardiya: 'Lumbini', 'koshi-tappu': 'Koshi', birgunj: 'Madhesh',
    nepalgunj: 'Lumbini', dharan: 'Koshi',
  }[destination.id];
});

const destinationDetailData = {
  janakpur: {
    experience: 'Janakpur brings together the Ram-Janaki tradition, the grand Janaki Temple and the creative life of Mithila. Visitors can explore religious heritage, local food and neighborhood art at a respectful pace.',
    highlights: ['Janaki Temple / Janaki Mandir', 'Mithila culture and painting', 'Ram-Janaki tradition', 'Vivaha Panchami celebrations', 'Religious heritage'],
    activities: ['Visit Janaki Temple', 'Meet Mithila artists', 'Explore sacred ponds and old neighborhoods', 'Sample local sweets and regional food'],
    bestTime: 'Autumn to spring; festival dates vary yearly',
    reach: 'Janakpur Airport has domestic connections, and the city is also reachable by road from Kathmandu and the southern plains.',
    nearby: ['Ram Mandir', 'Dhanush Sagar and nearby sacred ponds', 'Mithila art workshops', 'Dhanushadham'],
    food: ['Mithila thali and seasonal tarkari', 'Thekua and khaja during festivals', 'Local sweets and lassi'],
    responsible: 'Dress respectfully at temples, ask before photographing people or artwork, and buy directly from local artists where possible.',
  },
};
kathmanduValleyPlaces.forEach((place) => {
  destinationDetailData[place.id] = {
    experience: `${place.description} Its place in Kathmandu Valley’s living Hindu, Buddhist and Newari heritage makes it especially rewarding for visitors who take time to observe local customs.`,
    highlights: place.famousFor,
    activities: place.activities,
    bestTime: 'Autumn and spring; festival dates vary each year',
    reach: `Reach ${place.name} by taxi, local bus or a guided heritage transfer from the ${place.area} area. Allow extra time for traffic and walking.`,
    nearby: place.area === 'kathmandu' ? ['Boudhanath Stupa', 'Kathmandu Durbar Square', 'Garden of Dreams', 'Bagmati heritage sites'] : place.area === 'lalitpur' ? ['Patan Durbar Square', 'Golden Temple', 'Patan Museum', 'Local courtyards'] : ['Bhaktapur Durbar Square', 'Taumadhi Square', 'Dattatreya Square', 'Pottery Square'],
    food: ['Dal bhat and seasonal tarkari', 'Newari khaja and local snacks', 'Tea or lassi from neighborhood cafés'],
    responsible: 'Dress modestly, follow photography rules, avoid touching sacred objects, and support local museums, guides, artisans and community businesses.',
  };
});

const destinationFilters = {
  regions: ['All regions', 'Mountain', 'Hill', 'Terai'],
  categories: ['All categories', 'Kathmandu Valley', 'Mountains', 'Trekking', 'Temples', 'Lakes', 'National Parks', 'Wildlife', 'Adventure', 'Heritage Sites', 'Cultural Places', 'Religious Sites', 'Villages', 'Scenic Places'],
  areas: ['All areas', 'Kathmandu', 'Lalitpur', 'Bhaktapur'],
  types: ['All types', 'Hindu Temple', 'Buddhist Stupa', 'Buddhist Heritage', 'UNESCO Heritage', 'Historic Site', 'Traditional Craft', 'Cultural Site'],
  difficulties: ['All difficulties', 'Easy', 'Moderate', 'Challenging'],
  budgets: ['All budgets', 'Budget', 'Mid-range', 'Premium'],
  seasons: ['All seasons', 'Spring', 'Summer', 'Autumn', 'Winter'],
};

let destinationCatalog = [...destinations, ...additionalDestinations, ...kathmanduValleyPlaces];
let destinationById = Object.fromEntries(destinationCatalog.map((destination) => [destination.id, destination]));

function normalizeBackendDestination(destination) {
  const metadata = destinationCatalog.find((item) => item.name.toLowerCase() === destination.name.toLowerCase() || item.id === destination.slug);
  const image = destination.images?.[0] || metadata?.image || fallbackDestinationImage;
  const region = destination.region?.toLowerCase() || metadata?.region || 'hill';
  return {
    ...metadata,
    ...destination,
    id: destination.id,
    image,
    gallery: destination.images?.length ? destination.images : metadata?.gallery,
    description: destination.description || destination.shortDescription || metadata?.description || '',
    category: destination.category || metadata?.category || 'Travel',
    filterCategory: metadata?.filterCategory || destination.category || 'Travel',
    region,
    province: metadata?.province || destination.region,
    difficulty: metadata?.difficulty || 'Moderate',
    budget: metadata?.budget || 'Mid-range',
    popularity: metadata?.popularity || 'Recommended',
    season: destination.bestSeason || metadata?.season || 'Autumn',
    famousFor: metadata?.famousFor || [destination.name, destination.category, destination.location].filter(Boolean),
    activities: metadata?.activities || ['Sightseeing', 'Photography', 'Local experiences'],
  };
}

function applyBackendDestinations(data) {
  const legacyDestinationById = destinationById;
  destinationCatalog = data.map(normalizeBackendDestination);
  const backendDestinationById = Object.fromEntries(destinationCatalog.flatMap((destination) => {
    const metadata = destinations.find((item) => item.name.toLowerCase() === destination.name.toLowerCase())
      || additionalDestinations.find((item) => item.name.toLowerCase() === destination.name.toLowerCase())
      || kathmanduValleyPlaces.find((item) => item.name.toLowerCase() === destination.name.toLowerCase());
    return [[destination.id, destination], ...(metadata ? [[metadata.id, destination]] : [])];
  }));
  destinationById = { ...legacyDestinationById, ...backendDestinationById };
}

const regions = [
  ['Kathmandu Valley', 'Ancient cities, sacred courtyards and living Newari heritage.', 'Bagmati', 'kathmandu'],
  ['Pokhara', 'Lakeside calm, mountain panoramas and easy adventure.', 'Gandaki', 'pokhara'],
  ['Chitwan', 'Jungle trails, rare wildlife and warm Terai culture.', 'Madhesh', 'chitwan'],
  ['Everest Region', 'Sherpa villages, high passes and the roof of the world.', 'Koshi', 'everest'],
  ['Annapurna Region', 'Classic trails, diverse landscapes and mountain villages.', 'Gandaki', 'annapurna'],
  ['Lumbini', 'A peaceful pilgrimage through the birthplace of Buddha.', 'Lumbini', 'lumbini'],
  ['Mustang', 'Wind-carved cliffs, ancient caves and high desert horizons.', 'Gandaki', 'mustang'],
  ['Langtang', 'Quiet valleys, yak pastures and close Himalayan encounters.', 'Bagmati', 'langtang'],
  ['Ilam', 'Rolling tea gardens and soft green hills in eastern Nepal.', 'Koshi', 'ilam'],
  ['Janakpur', 'Colorful temples, Mithila art and a deep spiritual history.', 'Madhesh', 'janakpur'],
  ['Bandipur', 'A timeless hilltop town filled with architecture and stories.', 'Gandaki', 'bandipur'],
  ['Rara', 'An untouched blue lake surrounded by quiet mountain wilderness.', 'Karnali', 'rara-lake'],
  ['Dolpo', 'Remote valleys, ancient monasteries and an extraordinary silence.', 'Karnali', 'dolpo'],
];

const experienceImageByName = {
  Trekking: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nepal%20Yak%20-%20Himalaya%20trekking.jpg',
  'Mountaineering': 'https://commons.wikimedia.org/wiki/Special:FilePath/Mount%20Everest%20-%20Kukuczka%20Czok.jpg',
  'Paragliding': 'https://commons.wikimedia.org/wiki/Special:FilePath/%27Tandem%20Paragliding%27%20over%20Pokhara.%28Tuesday%2022-11-2011%29.JPG',
  'Rafting': 'https://commons.wikimedia.org/wiki/Special:FilePath/Demonstration%20Before%20Raft-Rafting%20in%20Trishuli%20River%2C%20Nepal-3060.jpg',
  'Bungee Jumping': 'https://commons.wikimedia.org/wiki/Special:FilePath/Amritpaudelphoto3.png',
  'Jungle Safari': 'https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20rhinoceros%20%28Rhinoceros%20unicornis%29%201.jpg',
  'Mountain Flight': 'https://commons.wikimedia.org/wiki/Special:FilePath/8%2C848m%20Everest%208%2C516m%20Lhotse%20Himalaya%20Mountain%20Flights%20Nepal%20-%20panoramio.jpg',
  'Camping': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/The_Heavenly_Rara_Lake_-_edited_2.jpg',
  'Rock Climbing': 'https://commons.wikimedia.org/wiki/Special:FilePath/Rock%20Climbing%20In%20Nepal%20%28128592639%29.jpeg',
  'Zipline': 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?auto=format&fit=crop&w=1200&q=80',
  'Cycling': 'https://commons.wikimedia.org/wiki/Special:FilePath/Welcoming%20Participants%20of%20Nepal%20Cycle%20Festival%20in%20Bhaktpur.jpg',
  'Cultural Tours': 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Bhaktapur_Durbar_Square_2018_13.jpg',
  'Spiritual Experiences': 'https://commons.wikimedia.org/wiki/Special:FilePath/Swayambhunath%20Stupa%20-Kathmandu%20Nepal-0336.jpg',
};

const fallbackExperiences = [
  { id: 0, name: 'Trekking', description: 'Follow ancient footpaths through rhododendron forests, villages and high mountain passes.', location: 'Annapurna & Everest', difficulty: 'Moderate', duration: '5–18 days', cost: 'NPR 45,000+', season: 'Spring / Autumn', safety: 'Use a registered guide, pack layers and acclimatize gradually.', image: experienceImageByName['Trekking'], locations: [] },
  { id: 1, name: 'Mountaineering', description: 'Test your limits on Nepal’s legendary summits with an experienced expedition team.', location: 'Khumbu & Manaslu', difficulty: 'Expert', duration: '18–60 days', cost: 'NPR 250,000+', season: 'Spring / Autumn', safety: 'Expedition permits, technical training and a certified climbing team are essential.', image: experienceImageByName['Mountaineering'], locations: [] },
  { id: 2, name: 'Paragliding', description: 'Float above Phewa Lake with a close-up view of the Annapurna skyline.', location: 'Sarangkot, Pokhara', difficulty: 'Easy', duration: '2–3 hours', cost: 'NPR 8,000–12,000', season: 'October – May', safety: 'Fly with a licensed pilot and confirm wind conditions before takeoff.', image: experienceImageByName['Paragliding'], locations: [] },
  { id: 3, name: 'Rafting', description: 'Ride lively Himalayan rivers through forested gorges and wide-open valleys.', location: 'Trishuli & Seti rivers', difficulty: 'Moderate', duration: '1–3 days', cost: 'NPR 6,000–18,000', season: 'October – May', safety: 'Wear a fitted life jacket and helmet and follow your river guide’s commands.', image: experienceImageByName['Rafting'], locations: [] },
  { id: 4, name: 'Bungee Jumping', description: 'Take the leap above a dramatic Himalayan gorge for an unforgettable rush.', location: 'The Last Resort, Sindhupalchok', difficulty: 'Moderate', duration: 'Half day', cost: 'NPR 9,000–12,000', season: 'All year', safety: 'Use the certified operator, follow weight limits and secure all loose items.', image: experienceImageByName['Bungee Jumping'], locations: [] },
  { id: 5, name: 'Jungle Safari', description: 'Search for rhinos, crocodiles and colorful birds among the Terai grasslands.', location: 'Chitwan National Park', difficulty: 'Easy', duration: '1–3 days', cost: 'NPR 8,000–20,000', season: 'October – March', safety: 'Stay with your naturalist and never approach or feed wildlife.', image: experienceImageByName['Jungle Safari'], locations: [] },
  { id: 6, name: 'Mountain Flight', description: 'See Everest and the Himalayan range from the comfort of a scenic morning flight.', location: 'Kathmandu Airport', difficulty: 'Easy', duration: '1 hour', cost: 'NPR 25,000–35,000', season: 'October – May', safety: 'Keep your passport ready and allow flexibility for weather-related delays.', image: experienceImageByName['Mountain Flight'], locations: [] },
  { id: 7, name: 'Camping', description: 'Sleep beneath clear skies beside lakes, forests and quiet mountain trails.', location: 'Rara & Shivapuri', difficulty: 'Moderate', duration: '2–5 days', cost: 'NPR 12,000–30,000', season: 'Spring / Autumn', safety: 'Camp only in permitted areas and carry warm layers, water and a first-aid kit.', image: experienceImageByName['Camping'], locations: [] },
  { id: 8, name: 'Rock Climbing', description: 'Learn movement, balance and focus on natural rock faces around the valley.', location: 'Nagarjun, Kathmandu', difficulty: 'Moderate', duration: 'Half day', cost: 'NPR 3,000–8,000', season: 'October – May', safety: 'Check harnesses and ropes with your instructor before every climb.', image: experienceImageByName['Rock Climbing'], locations: [] },
  { id: 9, name: 'Zipline', description: 'Race above rivers and forested hills on one of Nepal’s fastest adventures.', location: 'Pokhara', difficulty: 'Easy', duration: '2–3 hours', cost: 'NPR 7,000–10,000', season: 'All year', safety: 'Listen to the launch team and use all supplied protective equipment.', image: experienceImageByName['Zipline'], locations: [] },
  { id: 10, name: 'Cycling', description: 'Discover back roads, lakeside paths and villages at a slower, more personal pace.', location: 'Pokhara & Kathmandu Valley', difficulty: 'Moderate', duration: 'Half day – 3 days', cost: 'NPR 2,000–8,000', season: 'Spring / Autumn', safety: 'Wear a helmet, carry water and check the bike before leaving.', image: experienceImageByName['Cycling'], locations: [] },
  { id: 11, name: 'Cultural Tours', description: 'Meet artisans, explore old cities and learn the stories behind Nepal’s traditions.', location: 'Kathmandu & Bhaktapur', difficulty: 'Easy', duration: 'Half day – 2 days', cost: 'NPR 2,000–10,000', season: 'All year', safety: 'Dress respectfully and ask permission before photographing people or ceremonies.', image: experienceImageByName['Cultural Tours'], locations: [] },
  { id: 12, name: 'Spiritual Experiences', description: 'Make space for stillness through meditation, monasteries and sacred places.', location: 'Lumbini & Kathmandu', difficulty: 'Easy', duration: '1–3 days', cost: 'NPR 3,000–15,000', season: 'All year', safety: 'Observe quiet zones, temple etiquette and local guidance at sacred sites.', image: experienceImageByName['Spiritual Experiences'], locations: [] },
];

const categories = [
  ['◈', 'Mountains & trekking', '48 destinations', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80'],
  ['✦', 'Culture & heritage', '32 destinations', 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Pashupatinath_Temple-2020.jpg'],
  ['♧', 'Wildlife & safari', '16 destinations', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=700&q=80'],
  ['◌', 'Lakes & nature', '27 destinations', 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=80'],
];

let travelGuideSections = [
  ['Visa information', 'Visa rules and fees can change. Check the official Nepal immigration or embassy website for your nationality before booking.', 'Verify before travel'],
  ['Currency', 'Nepalese Rupee (NPR) is the local currency. Keep small notes for local transport and rural areas; card acceptance varies.', 'Verify current rates'],
  ['Language & time zone', 'Nepali is the national language. English is common in tourist areas. Nepal Time is UTC+5:45.', 'General guidance'],
  ['Weather', 'Nepal has distinct seasons and conditions vary greatly by altitude. Check a current forecast for your exact route.', 'Check current forecast'],
  ['Internet & connectivity', 'Wi-Fi is common in cities and tourist hubs. Remote treks may have limited service; consider a local SIM or eSIM.', 'Coverage varies'],
  ['Transportation', 'Tourist buses, domestic flights, taxis and hired vehicles connect major destinations. Timetables can change with weather.', 'Verify schedules'],
  ['Accommodation', 'Choose registered hotels, homestays or teahouses and confirm what is included before paying.', 'Check current availability'],
  ['Health & safety', 'Consider travel insurance, water safety and altitude advice. Consult a clinician about personal health needs.', 'Personal advice required'],
  ['Travel etiquette', 'Dress modestly at religious sites, remove shoes when requested, ask before photography and use both hands when giving or receiving.', 'Respect local guidance'],
];

const cultureTopics = [
  ['Languages & cultural diversity', 'Nepal is home to many communities, languages, beliefs and local traditions shaped by mountains, hills and the Terai plains.'],
  ['Festivals', 'Festivals are shared across Nepal while retaining strong local expressions. Chhath is especially prominent in the Terai/Madhesh; Dashain, Tihar and Holi are celebrated widely across the country.'],
  ['Food', 'Dal bhat, momo, Newari dishes, Mithila foods and seasonal pickles reflect hospitality and regional ingredients.'],
  ['Traditional clothing', 'Daura suruwal, gunyo cholo, saris and locally woven textiles are worn for identity, ceremony and celebration.'],
  ['Music & dance', 'Folk instruments, devotional music and community dances carry stories across generations.'],
  ['Art & architecture', 'Wood carving, paubha painting, pagodas, stupas and palace squares show Nepal’s enduring craft traditions.'],
  ['Heritage sites', 'Hindu and Buddhist traditions often share public spaces, festivals and rituals with deep local meaning, from Kathmandu Valley to Lumbini and Janakpur.'],
  ['Mithila culture', 'Janakpur is an important cultural destination for Mithila painting, local architecture, music, dance, clothing, cuisine and crafts.'],
  ['Local traditions', 'Ask local hosts how to participate respectfully in ceremonies, markets and family celebrations.'],
  ['Responsible tourism', 'Support local businesses, reduce plastic, respect sacred places and leave natural areas better than you found them.'],
];

const festivals = [
  ['Chhath', 'Especially prominent in the Terai/Madhesh: devotees give thanks to the Sun, gathering at rivers, ponds and other clean water bodies for offerings and prayer.', 'Usually Oct–Nov; lunar dates vary yearly.'],
  ['Dashain', 'Celebrated widely across Nepal through family gatherings, blessings, tika, jamara and shared festive meals.', 'Usually Sep–Oct; lunar dates vary yearly.'],
  ['Tihar / Diwali', 'Celebrated widely across Nepal with lamps, Laxmi Puja, Deusi-Bhailo, family rituals and Bhai Tika.', 'Usually Oct–Nov; verify the annual calendar.'],
  ['Holi', 'Celebrated across Nepal with strong regional traditions, bringing communities together through color, music and springtime gatherings.', 'Usually Feb–Mar; date changes annually.'],
  ['Ram Navami', 'Observed at Hindu temples and communities across Nepal, with devotional worship and readings associated with Ram-Janaki traditions.', 'Usually Mar–Apr; lunar dates vary.'],
  ['Vivaha Panchami', 'A major Janakpur/Mithila celebration recalling the wedding of Sita and Ram through processions, worship and cultural gatherings.', 'Usually Nov–Dec; lunar dates vary.'],
  ['Maha Shivaratri', 'Observed widely at Shiva temples, especially with pilgrimages and night worship at Pashupatinath and other shrines.', 'Usually Feb–Mar; lunar dates vary.'],
  ['Krishna Janmashtami', 'Celebrated by Hindu communities with devotional singing, temple visits and vigils marking the birth of Krishna.', 'Usually Aug–Sep; lunar dates vary.'],
  ['Buddha Jayanti', 'Observed across Nepal, with special significance in Lumbini and Buddhist communities, through prayer and peaceful gatherings.', 'Usually Apr–May; verify the annual date.'],
  ['Maghi', 'A harvest and seasonal festival with particular importance among Tharu communities and other groups in the western and southern plains.', 'Usually Jan; regional customs vary.'],
  ['Eid celebrations', 'Observed by Muslim communities across Nepal, including Terai towns, through communal prayers, visits, food and generosity.', 'Dates follow the Islamic lunar calendar.'],
  ['Indra Jatra', 'A Kathmandu Valley celebration with chariot processions, masked dances and living Newar heritage.', 'Usually Aug–Sep; verify local dates.'],
  ['Losar', 'New year celebrations observed by several Himalayan communities with prayer, food and gatherings.', 'Dates vary by tradition and lunar calendar.'],
  ['Teej', 'Women gather for devotional singing, dance and fasting in honor of tradition and family.', 'Usually Aug–Sep; lunar dates vary.'],
];

let festivalCards = [
  ['Chhath', 'A respectful, community-centered festival of gratitude to the Sun. Devotees prepare offerings, fast according to tradition and gather at rivers, ponds and other water bodies for evening and morning prayers. In Nepal, Janakpur, Birgunj, Biratnagar, Rajbiraj and other Terai/Madhesh towns are well-known places to experience its public rituals.', 'Terai / Madhesh cultural prominence', 'Offerings include fruits, sugarcane, thekua and other carefully prepared foods; baskets are carried to decorated ghats and placed near the water during arghya rituals.', 'https://upload.wikimedia.org/wikipedia/commons/0/0f/JanakpurChhathParvaFestival.jpg'],
  ['Dashain', 'Nepal’s major national festival is a time for family reunions, blessings and renewal. Households visit elders for tika and jamara, share festive food and observe rituals according to their family and community traditions.', 'Celebrated widely across Nepal', 'Family gatherings, temple visits, flying kites in some communities, tika, jamara and meals such as meat, sel roti and seasonal dishes.', 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Soaring_High_in_Dashain.jpg'],
  ['Tihar / Diwali', 'The festival of lights honors relationships, animals and prosperity across five days of local observances. Homes and streets glow with lamps, rangoli and marigold garlands.', 'Celebrated widely across Nepal', 'Laxmi Puja, Deusi-Bhailo songs, offerings to crows, dogs and cows, and Bhai Tika shared between siblings.', 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Sister_lighting_traditional_lamp_during_Tihar_festival_%28edited%29.jpg'],
  ['Holi', 'The festival of colors brings neighbors and visitors together in lively community celebrations. Customs differ by place, but the shared themes are spring, goodwill and renewal.', 'Celebrated across Nepal with regional traditions', 'Colored powders and water, music, family visits and public gatherings; ask before applying color and protect cultural or religious spaces.', 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Holi_Colors.jpg'],
];

let foods = [
  ['Dal Bhat', 'Rice, lentils, vegetables and pickles: a nourishing everyday meal across Nepal.', 'Nationwide', 'Vegetarian-friendly', 'A symbol of everyday hospitality and regional variety.', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'],
  ['Momo', 'Steamed or fried dumplings filled with vegetables, chicken or other seasoned fillings.', 'Nationwide', 'Vegetarian or non-vegetarian', 'A beloved shared snack influenced by Himalayan and Tibetan foodways.', 'https://images.unsplash.com/photo-1626776876729-bab4369c5a5a?auto=format&fit=crop&w=800&q=80'],
  ['Thukpa', 'A warming noodle soup with vegetables, herbs and optional meat.', 'Himalayan regions', 'Vegetarian or non-vegetarian', 'A comforting highland dish suited to cool mountain evenings.', 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80'],
  ['Sel Roti', 'A crisp, ring-shaped rice bread prepared for festivals and special occasions.', 'Hills & Kathmandu Valley', 'Vegetarian', 'Often prepared at home during celebrations such as Tihar.', 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80'],
  ['Newari cuisine', 'A celebrated spread including bara, choila, yomari and seasonal dishes.', 'Kathmandu Valley', 'Varies by dish', 'Newa food culture is closely tied to festivals, gatherings and hospitality.', 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'],
  ['Gundruk', 'Fermented leafy greens served as a soup, pickle or accompaniment.', 'Hills & mountain regions', 'Vegetarian', 'A traditional preservation method that makes seasonal greens last longer.', 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80'],
  ['Yomari', 'A steamed rice-flour delicacy filled with molasses and sesame or other fillings.', 'Kathmandu Valley', 'Vegetarian', 'Especially associated with the Yomari Punhi festival and Newa heritage.', 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80'],
  ['Chowmein', 'Stir-fried noodles with vegetables, egg or meat and a Nepali street-food style.', 'Nationwide', 'Vegetarian or non-vegetarian', 'A popular everyday adaptation enjoyed in homes, cafés and roadside stalls.', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80'],
];

function applyBackendInformation({ guide, festivals: festivalRecords, food: foodRecords }) {
  travelGuideSections = guide.map((item) => [item.title, item.content, item.verificationNote || 'General guidance']);
  festivalCards = festivalRecords.map((item) => [
    item.name,
    item.description,
    item.region?.name || item.season || 'Nepal',
    item.culturalSignificance || item.season || 'Dates vary yearly; verify the local calendar.',
    item.imageUrl || '',
  ]);
  foods = foodRecords.map((item) => [
    item.name,
    item.description,
    item.region?.name || 'Nepal',
    item.vegetarian ? 'Vegetarian' : 'Vegetarian or non-vegetarian',
    item.description,
    item.imageUrl || '',
  ]);
}

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

function AuthPanel({ onClose, onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ fullName: '', email: '', password: '', country: '', preferredTravelStyle: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (mode === 'register') {
        await fetchApi('/api/auth/register', { method: 'POST', body: JSON.stringify(form) });
        setMode('login');
        setMessage('Registration successful. You can now log in.');
        setForm((current) => ({ ...current, password: '' }));
      } else {
        const result = await fetchApi('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: form.email, password: form.password }) });
        localStorage.setItem('nepal-tourism-token', result.token);
        const profile = await fetchApi('/api/profile');
        localStorage.setItem('nepal-tourism-user', JSON.stringify(profile));
        onAuthenticated(profile);
        onClose();
      }
    } catch (requestError) {
      if (requestError.status === 401) setError('Invalid email or password.');
      else if (requestError.status === 400) setError(requestError.message || 'Please check the form fields.');
      else if (requestError.status === 403) setError('You do not have permission to complete this request.');
      else setError('The authentication service is unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="auth-panel" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="auth-close" onClick={onClose} aria-label="Close authentication panel">×</button>
        <p className="eyebrow">Welcome to Nepal</p>
        <h2 id="auth-title">{mode === 'login' ? 'Log in.' : 'Join the journey.'}</h2>
        <div className="auth-tabs"><button className={mode === 'login' ? 'selected' : ''} onClick={() => { setMode('login'); setError(''); setMessage(''); }}>Log in</button><button className={mode === 'register' ? 'selected' : ''} onClick={() => { setMode('register'); setError(''); setMessage(''); }}>Register</button></div>
        <form onSubmit={submit} className="auth-form">
          {mode === 'register' && <label>Full name<input required value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} autoComplete="name" /></label>}
          <label>Email<input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} autoComplete="email" /></label>
          <label>Password<input required minLength={8} type="password" value={form.password} onChange={(event) => updateField('password', event.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>
          {mode === 'register' && <><label>Country<input value={form.country} onChange={(event) => updateField('country', event.target.value)} autoComplete="country-name" /></label><label>Travel style<select value={form.preferredTravelStyle} onChange={(event) => updateField('preferredTravelStyle', event.target.value)}><option value="">Choose a style</option><option>Adventure</option><option>Cultural</option><option>Nature</option><option>Family</option></select></label></>}
          {message && <p className="auth-message" role="status">{message}</p>}
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="button button-primary auth-submit" disabled={loading}>{loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'} <ArrowIcon /></button>
        </form>
      </section>
    </div>
  );
}

const fallbackDestinationImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1000" height="700" viewBox="0 0 1000 700"%3E%3Crect width="1000" height="700" fill="%23dfe8e4"/%3E%3Cpath d="M0 600 280 310 450 470 610 250 1000 600V700H0Z" fill="%2398b8ad"/%3E%3Cpath d="m80 610 210-180 115 110 190-220 260 290Z" fill="%233e806d"/%3E%3C/svg%3E';

function DestinationImage({ destination, className, alt = destination.name }) {
  const [src, setSrc] = useState(destination.image);
  return <img className={className} src={src} alt={alt} onError={() => setSrc(fallbackDestinationImage)} />;
}

function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {action && <a className="text-link" href={action.href}>{action.label} <ArrowIcon /></a>}
    </div>
  );
}

function DestinationCard({ destination, favorite, onFavorite }) {
  const [favoriteBusy, setFavoriteBusy] = useState(false);
  const handleFavorite = async () => {
    setFavoriteBusy(true);
    try { await onFavorite(destination.id); } finally { setFavoriteBusy(false); }
  };
  return (
    <article className="destination-card dashboard-card">
      <div className="card-image-wrap">
        <DestinationImage destination={destination} />
        <span className="category-pill">{destination.category}</span>
        <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={handleFavorite} disabled={favoriteBusy} aria-label={`${favorite ? 'Remove' : 'Save'} ${destination.name} favorite`}>
          {favoriteBusy ? '…' : favorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="destination-card-body">
        <div className="destination-meta"><span>⌖ {destination.location}</span><strong>★ {destination.rating}</strong></div>
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <div className="destination-famous"><strong>Famous for</strong><span>{(destination.famousFor || []).slice(0, 2).join(' · ')}</span></div>
        <div className="destination-famous"><strong>Activities</strong><span>{(destination.activities || []).slice(0, 2).join(' · ')}</span></div>
        <div className="destination-tags"><span>{destination.difficulty}</span><span>{destination.budget}</span><span>{destination.season}</span></div>
        <button className="explore-button" onClick={() => destination.onExplore(destination)}>Explore <ArrowIcon /></button>
      </div>
    </article>
  );
}

function ValleyAreaCard({ area, destination, count, onExplore }) {
  return (
    <article className="region-explore-card">
      <DestinationImage destination={destination} alt={`${area} Kathmandu Valley`} />
      <div className="region-explore-shade" />
      <div className="region-explore-copy">
        <span>✦</span>
        <p>{area}</p>
        <h3>{area === 'Kathmandu' ? 'Sacred temples, Buddhist stupas and the historic heart of the valley.' : area === 'Lalitpur / Patan' ? 'Fine Newari craftsmanship, courtyards and living Buddhist and Hindu heritage.' : 'Preserved squares, pagodas, palace architecture and traditional crafts.'}</h3>
        <small>{count} famous places</small>
        <button onClick={onExplore}>Explore places <ArrowIcon /></button>
      </div>
    </article>
  );
}

function DestinationDetails({ destination, favorite, onFavorite, onBack, onAddToTrip, isAuthenticated = Boolean(localStorage.getItem('nepal-tourism-token')), authenticatedUser = (() => { try { return JSON.parse(localStorage.getItem('nepal-tourism-user') || 'null'); } catch { return null; } })(), onAuthRequired = () => window.dispatchEvent(new Event('nepal-tourism-auth-required')) }) {
  const [activeImage, setActiveImage] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviewWasEdited, setReviewWasEdited] = useState(false);
  const gallery = destination.gallery || [destination.image];
  const isPokhara = destination.name === 'Pokhara';
  const destinationGuide = destinationDetailData[destination.id];
  const details = {
    highlights: destinationGuide?.highlights || destination.famousFor,
    activities: destinationGuide?.activities || destination.activities,
    bestTime: destinationGuide?.bestTime || destination.bestSeason,
    budget: destination.budget === 'Premium' ? 'NPR 12,000 – 25,000 per day' : destination.budget === 'Budget' ? 'NPR 3,000 – 7,000 per day' : 'NPR 7,000 – 14,000 per day',
    reach: destinationGuide?.reach || (isPokhara ? 'A 25-minute flight or a scenic 6–8 hour drive from Kathmandu.' : 'Connect through Kathmandu by domestic flight, tourist bus or private transfer.'),
    nearby: destinationGuide?.nearby || (isPokhara ? ['Sarangkot', 'World Peace Pagoda', 'Begnas Lake', 'Davis Falls'] : ['Local viewpoint', 'Nearby heritage landmark', 'Community market', 'Regional nature trail']),
    food: destinationGuide?.food || (isPokhara ? ['Thakali set', 'Momo with local achar', 'Fresh lake-side coffee'] : ['Dal bhat and seasonal tarkari', 'Newari or regional khaja set', 'Local tea and handmade sweets']),
  };

  useEffect(() => {
    let active = true;
    fetchApi(`/api/destinations/${destination.id}/reviews`).then((data) => {
      if (active) setReviews(data);
    }).catch(() => {
      if (active) setReviews([]);
    });
    return () => { active = false; };
  }, [destination.id]);

  const submitReview = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) { onAuthRequired(); return; }
    setReviewLoading(true);
    setReviewError('');
    try {
      const review = await fetchApi(editingReviewId ? `/api/reviews/${editingReviewId}` : `/api/destinations/${destination.id}/reviews`, { method: editingReviewId ? 'PUT' : 'POST', body: JSON.stringify({ rating: reviewRating, comment: reviewText }) });
      setReviews((current) => editingReviewId ? current.map((item) => item.id === editingReviewId ? review : item) : [...current, review]);
      setReviewSubmitted(true);
      setReviewWasEdited(Boolean(editingReviewId));
      setReviewText('');
      setEditingReviewId(null);
    } catch (error) {
      setReviewError(error.message || 'Your review could not be submitted.');
    } finally {
      setReviewLoading(false);
    }
  };

  const editReview = (review) => {
    setEditingReviewId(review.id);
    setReviewRating(review.rating);
    setReviewText(review.comment);
    setReviewSubmitted(false);
    setReviewError('');
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return;
    setReviewLoading(true);
    setReviewError('');
    try {
      await fetchApi(`/api/reviews/${reviewId}`, { method: 'DELETE' });
      setReviews((current) => current.filter((review) => review.id !== reviewId));
      if (editingReviewId === reviewId) {
        setEditingReviewId(null);
        setReviewText('');
      }
    } catch (error) {
      setReviewError(error.message || 'Your review could not be deleted.');
    } finally {
      setReviewLoading(false);
    }
  };

  const shareDestination = async () => {
    const shareData = { title: `${destination.name} | Nepal Tourism Guide`, text: `Explore ${destination.name} in Nepal.`, url: window.location.href };
    if (navigator.share) await navigator.share(shareData);
    else {
      await navigator.clipboard?.writeText(window.location.href);
      alert('Destination link copied to your clipboard.');
    }
  };

  return (
    <main className="destination-detail">
      <div className="page-container detail-breadcrumb"><button onClick={onBack}>← Back to destinations</button><span>Destinations / {destination.name}</span></div>
      <section className="page-container detail-hero">
        <div className="detail-gallery">
          <img className="detail-main-image" src={gallery[activeImage]} alt={`${destination.name} view ${activeImage + 1}`} onError={(event) => { event.currentTarget.src = fallbackDestinationImage; }} />
          <button className="gallery-arrow gallery-prev" onClick={() => setActiveImage((activeImage + gallery.length - 1) % gallery.length)} aria-label="Previous image">←</button>
          <button className="gallery-arrow gallery-next" onClick={() => setActiveImage((activeImage + 1) % gallery.length)} aria-label="Next image">→</button>
          <div className="gallery-thumbnails">{gallery.map((image, index) => <button className={activeImage === index ? 'active' : ''} key={image} onClick={() => setActiveImage(index)}><img src={image} alt="" onError={(event) => { event.currentTarget.src = fallbackDestinationImage; }} /></button>)}</div>
        </div>
        <div className="detail-intro">
          <span className="category-pill detail-pill">{destination.category}</span>
          <h1>{destination.name}</h1>
          <div className="detail-location">⌖ {destination.location} <strong>★ {destination.rating}</strong><span>128 traveler reviews</span></div>
          <p>{destination.description} Discover the character of this place at your own pace, with thoughtful experiences for curious travelers.</p>
          <div className="detail-actions"><button className={`button ${favorite ? 'button-primary' : 'button-dark'}`} onClick={() => onFavorite(destination.id)}>{favorite ? '♥ Saved' : '♡ Add to favorites'}</button><button className="button button-outline" onClick={() => onAddToTrip(destination.name)}>＋ Add to trip</button><button className="share-button" onClick={shareDestination} aria-label="Share destination">↗</button></div>
          <div className="detail-facts"><div><span>Best season</span><strong>{details.bestTime}</strong></div><div><span>Difficulty</span><strong>{destination.difficulty}</strong></div><div><span>Typical stay</span><strong>{isPokhara ? '2–4 days' : '1–3 days'}</strong></div></div>
        </div>
      </section>

      <section className="page-container detail-content-grid">
        <div className="detail-main-column">
          <section className="detail-block"><p className="eyebrow">The experience</p><h2>Why visit <em>{destination.name}?</em></h2><p>{destinationGuide?.experience || `${destination.description} From the first morning light to the last cup of tea, this destination brings together Nepal’s generous spirit, beautiful landscapes and layers of history.`}</p></section>
          <section className="detail-block"><h3>Highlights</h3><ul className="detail-list">{details.highlights.map((item) => <li key={item}>✦ {item}</li>)}</ul></section>
          <section className="detail-block"><h3>Things to do</h3><div className="activity-grid">{details.activities.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></section>
          <section className="detail-block info-columns"><div><h3>How to reach</h3><p>{details.reach}</p></div><div><h3>Estimated budget</h3><p>{details.budget}<br /><small>Including food, local transport and activities.</small></p></div></section>
          <section className="detail-block"><h3>Nearby attractions</h3><div className="nearby-list">{details.nearby.map((item) => <span key={item}>⌖ {item}</span>)}</div></section>
          <section className="detail-block info-columns"><div><h3>Where to stay</h3><p>Choose from welcoming guesthouses, boutique stays and comfortable hotels near the main town.</p></div><div><h3>What to eat</h3><ul className="simple-list">{details.food.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
          <section className="detail-block safety-block"><h3>{destinationGuide ? 'Responsible tourism' : 'Safety tips'}</h3><p>{destinationGuide?.responsible || 'Keep valuables secure, respect local customs, carry water and check local weather before heading outdoors. For treks, use a registered guide and allow time to acclimatize.'}</p></section>
          <section className="detail-block review-section"><div className="review-heading"><div><p className="eyebrow">Traveler voices</p><h2>User <em>reviews.</em></h2></div><strong>★ {destination.rating}<small> / 5.0 average</small></strong></div>{reviews.length ? reviews.map((review) => { const isOwnReview = isAuthenticated && authenticatedUser?.name === review.userEmail; return <article className="review-card" key={review.id}><div className="review-avatar">{review.user?.slice(0, 2).toUpperCase() || 'TR'}</div><div><strong>{review.user}</strong><span>★ {review.rating}</span><p>{review.comment}</p>{isOwnReview && <div className="review-actions"><button type="button" onClick={() => editReview(review)}>Edit</button><button type="button" onClick={() => deleteReview(review.id)} disabled={reviewLoading}>Delete</button></div>}</div></article>; }) : <p className="review-empty">No reviews yet. Be the first to share your experience.</p>}<form className="review-form" onSubmit={submitReview}><label>Rating<select value={reviewRating} onChange={(event) => setReviewRating(Number(event.target.value))}><option value="5">★★★★★</option><option value="4">★★★★</option><option value="3">★★★</option><option value="2">★★</option><option value="1">★</option></select></label><label>{editingReviewId ? 'Edit your experience' : 'Share your experience'}<textarea value={reviewText} onChange={(event) => setReviewText(event.target.value)} placeholder="Tell future travelers what you loved..." required /></label><button className="button button-dark" type="submit" disabled={reviewLoading}>{reviewLoading ? 'Saving…' : editingReviewId ? 'Save changes' : isAuthenticated ? 'Post review' : 'Log in to review'}</button>{editingReviewId && <button type="button" className="button button-outline" onClick={() => { setEditingReviewId(null); setReviewText(''); }}>Cancel edit</button>}{reviewSubmitted && <span className="review-success">{reviewWasEdited ? 'Your review was updated.' : 'Your review was added.'}</span>}{reviewError && <span className="auth-error" role="alert">{reviewError}</span>}</form></section>
        </div>
        <aside className="detail-sidebar"><div className="weather-card"><p className="eyebrow light">Live travel snapshot</p><span className="weather-icon">☼</span><strong>18°</strong><span>Partly cloudy</span><small>Good conditions for exploring</small></div><div className="map-card"><div className="map-art"><span>⌖</span><i /><i /><i /></div><div><p className="eyebrow">Find your way</p><h3>{destination.name} map</h3><p>View this destination and nearby places on a map.</p><a href={`https://www.google.com/maps/search/${encodeURIComponent(destination.name + ' Nepal')}`} target="_blank" rel="noreferrer">Open in Maps <ArrowIcon /></a></div></div></aside>
      </section>
    </main>
  );
}

const tourismRegions = {
  mountain: {
    name: 'Mountain Region',
    icon: '🏔️',
    description: 'High Himalayan trails, sacred alpine lakes and unforgettable mountain horizons.',
    bestTime: 'Spring and autumn offer the clearest mountain views.',
    tips: 'Acclimatize gradually, carry layers and use registered guides on high-altitude routes.',
    destinationId: 'everest',
  },
  hill: {
    name: 'Hill Region',
    icon: '🏞️',
    description: 'Heritage cities, peaceful ridges, lakeside escapes and green middle hills.',
    bestTime: 'Autumn and spring bring comfortable weather and clear viewpoints.',
    tips: 'Allow time for winding roads, support local communities and respect living heritage.',
    destinationId: 'pokhara',
  },
  terai: {
    name: 'Terai Region',
    icon: '🌾',
    description: 'Wildlife reserves, pilgrimage cities and vibrant cultural landscapes across the plains.',
    bestTime: 'Winter is generally the most comfortable season for plains and wildlife travel.',
    tips: 'Carry sun protection, drink safe water and follow naturalist guidance around wildlife.',
    destinationId: 'chitwan',
  },
};

function RegionPage({ regionKey, favorites, onFavorite, onExploreDestination, onBack }) {
  const region = tourismRegions[regionKey];
  const regionDestinations = destinationCatalog.filter((destination) => destination.region === regionKey);
  const heroDestination = destinationById[region.destinationId];

  return (
    <main className="explore-page region-page">
      <section className="explore-hero region-page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5, 29, 40, .88), rgba(12, 66, 78, .4)), url(${heroDestination.image})` }}>
        <div className="page-container">
          <button className="explore-back" onClick={onBack}>← Home</button>
          <p className="eyebrow light">{region.icon} Explore Nepal by region</p>
          <h1>{region.name}</h1>
          <p>{region.description}</p>
        </div>
      </section>
      <section className="page-container explore-content">
        <div className="explore-heading"><div><p className="eyebrow">A landscape of stories</p><h2>Popular <em>{regionKey} destinations.</em></h2></div><span>{regionDestinations.length} destinations</span></div>
        <div className="destination-grid dashboard-grid">{regionDestinations.map((destination) => <DestinationCard key={destination.id} destination={{ ...destination, onExplore: onExploreDestination }} favorite={favorites.includes(destination.id)} onFavorite={onFavorite} />)}</div>
        <div className="region-guide-panels">
          <article><p className="eyebrow">Best time to visit</p><h3>{region.bestTime}</h3></article>
          <article><p className="eyebrow">Travel tips</p><h3>{region.tips}</h3></article>
        </div>
      </section>
    </main>
  );
}

function ExploreNepal({ selectedRegion, onSelectRegion, onExploreDestination, onBack, favorites, onFavorite }) {
  const regionDestinations = selectedRegion
    ? destinationCatalog.filter((destination) => destination.province === selectedRegion[2])
    : [];

  return (
    <main className="explore-page">
      <section className="explore-hero">
        <div className="page-container">
          <button className="explore-back" onClick={onBack}>← Home</button>
          <p className="eyebrow light">One country, many worlds</p>
          <h1>Explore <em>Nepal.</em></h1>
          <p>From high Himalayan trails to subtropical forests, find the region that feels like your next story.</p>
        </div>
      </section>
      <section className="page-container explore-content">
        <div className="explore-heading"><div><p className="eyebrow">Choose your region</p><h2>Where will you<br /><em>begin?</em></h2></div><span>{regions.length} regions to discover</span></div>
        <div className="region-grid">
          {regions.map((region) => <button className={`region-card ${selectedRegion?.[0] === region[0] ? 'selected' : ''}`} key={region[0]} onClick={() => onSelectRegion(region)}><DestinationImage destination={destinationById[region[3]]} alt={region[0]} /><span className="region-shade" /><span className="region-number">{String(regions.indexOf(region) + 1).padStart(2, '0')}</span><span className="region-card-copy"><strong>{region[0]}</strong><small>{region[1]}</small><i>Explore region ↗</i></span></button>)}
        </div>
        {selectedRegion && <section className="region-destinations"><div className="region-destination-heading"><div><p className="eyebrow">Inside {selectedRegion[0]}</p><h2>Places to <em>see.</em></h2></div><button onClick={() => onSelectRegion(null)}>Close region ×</button></div>{regionDestinations.length > 0 ? <div className="destination-grid dashboard-grid">{regionDestinations.map((destination) => <DestinationCard key={destination.id} destination={{ ...destination, onExplore: onExploreDestination }} favorite={favorites.includes(destination.id)} onFavorite={onFavorite} />)}</div> : <div className="region-empty">More places for this region are being mapped. Browse the region guide for inspiration.</div>}</section>}
      </section>
    </main>
  );
}

function ExperienceCard({ experience, index }) {
  const locations = experience.locations || [];

  return (
    <article className="experience-detail-card">
      <div className="experience-detail-image"><img src={experience.image} alt={experience.name} /><span>{String(index + 1).padStart(2, '0')}</span><button aria-label={`Save ${experience.name}`}>♡</button></div>
      <div className="experience-detail-body">
        <p className="eyebrow">{experience.difficulty} experience</p>
        <h3>{experience.name}</h3>
        <p className="experience-description">{experience.description}</p>
        <div className="experience-facts"><div><span>Location</span><strong>⌖ {experience.location}</strong></div><div><span>Duration</span><strong>{experience.duration}</strong></div><div><span>Estimated cost</span><strong>{experience.cost}</strong></div><div><span>Best season</span><strong>{experience.season}</strong></div></div>
        {locations.length > 0 && (
          <div className="experience-locations">
            <span>Real Nepal locations</span>
            <ul>
              {locations.map((location) => <li key={location.id || location.name}>{location.name}</li>)}
            </ul>
          </div>
        )}
        <div className="experience-safety"><span>Safety note</span><p>{experience.safety}</p></div>
        <button className="experience-detail-link">View experience <ArrowIcon /></button>
      </div>
    </article>
  );
}

function ExperiencesPage({ onBack, experiences: initialExperiences = [] }) {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [loadingExperiences, setLoadingExperiences] = useState(true);
  const [experienceError, setExperienceError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All experiences');

  useEffect(() => {
    const controller = new AbortController();

    const resolveExperienceImage = (experience) => {
      const title = experience?.name;
      const mappedImage = title ? experienceImageByName[title] : null;
      return mappedImage || experience?.image || experience?.imageUrl || fallbackExperiences.find((item) => item.name === title)?.image || fallbackExperiences[0].image;
    };

    const loadExperiences = async () => {
      try {
        setLoadingExperiences(true);
        const data = await fetchApi('/api/experiences', { signal: controller.signal });
        setExperiences(data.map((experience) => ({ ...experience, image: resolveExperienceImage(experience), locations: experience.locations || [] })));
        setExperienceError('');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setExperiences([]);
          setExperienceError('Experiences could not be loaded. Please try again shortly.');
        }
      } finally {
        setLoadingExperiences(false);
      }
    };

    loadExperiences();
    return () => controller.abort();
  }, []);

  const categories = ['All experiences', ...new Set(experiences.map((experience) => experience.name))];
  const visibleExperiences = activeCategory === 'All experiences' ? experiences : experiences.filter((experience) => experience.name === activeCategory);

  return (
    <main className="experiences-page">
      <section className="experiences-hero">
        <div className="page-container">
          <button className="explore-back" onClick={onBack}>← Home</button>
          <p className="eyebrow light">Adventure begins where comfort ends</p>
          <h1>Find your<br /><em>experience.</em></h1>
          <p>From a quiet monastery morning to a pulse-quickening Himalayan flight, choose the way you want to meet Nepal.</p>
        </div>
      </section>
      <section className="page-container experiences-content">
        <div className="explore-heading"><div><p className="eyebrow">Make it memorable</p><h2>Adventure &<br /><em>experiences.</em></h2></div><span>{loadingExperiences ? 'Loading...' : `${experiences.length} ways to explore`}</span></div>
        {experienceError && <div className="empty-state" role="alert">{experienceError}</div>}
        <div className="experience-category-tabs">{categories.map((category) => <button key={category} className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
        <div className="experience-detail-grid">{visibleExperiences.map((experience, index) => <ExperienceCard experience={experience} index={index} key={experience.id || experience.name} />)}</div>
      </section>
    </main>
  );
}

function TripPlanner({ onBack, initialPlaces = [], isAuthenticated = Boolean(localStorage.getItem('nepal-tourism-token')), onAuthRequired = () => window.dispatchEvent(new Event('nepal-tourism-auth-required')), destinationLookup = (name) => destinationCatalog.find((destination) => destination.name.toLowerCase() === name.toLowerCase()) }) {
  const travelStyles = ['Budget', 'Standard', 'Luxury', 'Adventure', 'Family', 'Cultural', 'Nature'];
  const interests = ['Mountains', 'Trekking', 'Culture', 'Food', 'Wildlife', 'Photography', 'Adventure', 'Spirituality', 'History'];
  const plannerDestinations = ['Kathmandu Valley', 'Pokhara', 'Chitwan National Park', 'Everest Base Camp', 'Bandipur', 'Lumbini', 'Rara Lake', 'Mardi Himal'];
  const [selectedPlaces, setSelectedPlaces] = useState(initialPlaces.length ? initialPlaces : ['Kathmandu Valley', 'Pokhara']);
  const [dates, setDates] = useState({ start: '', end: '' });
  const [budget, setBudget] = useState('NPR 50,000 – 100,000');
  const [style, setStyle] = useState('Standard');
  const [selectedInterests, setSelectedInterests] = useState(['Mountains', 'Culture']);
  const [itinerary, setItinerary] = useState([]);
  const [saved, setSaved] = useState(false);
  const [newPlace, setNewPlace] = useState('Everest Base Camp');
  const [savedTrips, setSavedTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState('');
  const [plannerLoading, setPlannerLoading] = useState(false);
  const [plannerError, setPlannerError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    fetchApi('/api/trips').then(setSavedTrips).catch(() => setPlannerError('Saved trips could not be loaded.'));
    return undefined;
  }, [isAuthenticated]);

  const parseDateValue = (value) => {
    if (!value) return null;
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  };

  const formatDateValue = (date) => new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

  const addDays = (date, days) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  };

  const getDayCount = (start, end) => {
    const startDate = parseDateValue(start);
    const endDate = parseDateValue(end);

    if (!startDate || !endDate) return 0;
    if (endDate < startDate) return 0;

    const diffInMs = endDate.getTime() - startDate.getTime();
    return Math.max(1, Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1);
  };

  const getBudgetProfile = (selectedBudget) => {
    if (selectedBudget.includes('200,000') || selectedBudget.includes('200000')) return 'luxury';
    if (selectedBudget.includes('100,000') || selectedBudget.includes('100000')) return 'comfort';
    if (selectedBudget.includes('25,000') || selectedBudget.includes('25000')) return 'budget';
    return 'comfort';
  };

  const getDestinationMealRecommendation = (place, budgetProfile, interestsSet) => {
    const normalized = place.toLowerCase();
    const foodPreferences = ['Dal Bhat', 'Momo', 'Thukpa', 'Newari cuisine', 'Sel Roti'];

    if (normalized.includes('kathmandu') || normalized.includes('bhaktapur') || normalized.includes('lalitpur')) {
      return budgetProfile === 'luxury' ? 'Newari fine dining and rooftop coffee in Kathmandu Valley' : budgetProfile === 'budget' ? 'Momo, dal bhat and local tea houses in the old streets' : 'Newari cuisine and neighborhood cafés around the heritage squares';
    }

    if (normalized.includes('pokhara')) {
      if (interestsSet.includes('food')) return budgetProfile === 'luxury' ? 'Lake-view dining and Thakali cuisine in Pokhara' : 'Momo, dal bhat and local lakeside cafés';
      return budgetProfile === 'budget' ? 'Local eateries near Lakeside and simple thali spots' : 'Comfortable lakeside dining and Thakali meals';
    }

    if (normalized.includes('chitwan')) {
      return budgetProfile === 'luxury' ? 'Wildlife lodge dining and riverside restaurant experiences' : 'Local Tharu-inspired meals and simple lodge dining';
    }

    if (normalized.includes('everest') || normalized.includes('mardi') || normalized.includes('rara')) {
      return budgetProfile === 'budget' ? 'Simple teahouse meals, soups and warm local staples' : 'Warm mountain meals, teahouse dinners and Sherpa-style cooking';
    }

    if (normalized.includes('bandipur') || normalized.includes('lumbini')) {
      return budgetProfile === 'budget' ? 'Local cafés, regional snacks and simple family-run meals' : 'Traditional local dishes and relaxed sit-down dining';
    }

    return foodPreferences[Math.min(foodPreferences.length - 1, Math.max(0, Math.abs(place.length) % foodPreferences.length))];
  };

  const getDestinationActivityPlan = (place, dayIndex, totalDays, styleProfile, budgetProfile, interestSet) => {
    const normalizedPlace = place.toLowerCase();
    const isRelaxed = styleProfile === 'relaxed' || styleProfile === 'family';
    const wantsCulture = interestSet.includes('culture') || interestSet.includes('history') || interestSet.includes('spirituality');
    const wantsNature = interestSet.includes('nature') || interestSet.includes('mountains') || interestSet.includes('photography');
    const wantsAdventure = interestSet.includes('adventure') || interestSet.includes('trekking') || interestSet.includes('wildlife');
    const wantsWildlife = interestSet.includes('wildlife');
    const wantsSpirituality = interestSet.includes('spirituality');
    const wantsFood = interestSet.includes('food');

    let morning = 'Start with a slow breakfast and a walk around the local neighborhood.';
    let afternoon = 'Enjoy a well-paced local highlight and some time to take in the setting.';
    let evening = 'End the day with a relaxed meal or a scenic viewpoint before rest.';
    let travelNote = 'Local transport and short transfers are planned to keep the day comfortable.';

    if (normalizedPlace.includes('kathmandu')) {
      morning = wantsCulture ? 'Visit a heritage square, temple complex or old neighborhood with time for local stories.' : 'Begin with a gentle city walk and a landmark that best matches your pace.';
      afternoon = wantsNature ? 'Spend time at a peaceful viewpoint or quiet cultural garden outside the busiest streets.' : 'Explore a key heritage circle, market or monastery area.';
      evening = wantsFood ? 'Enjoy a local Newari or Nepali dinner with a relaxed evening walk.' : 'Take it easy with a quiet dinner and a short evening stroll.';
    }

    if (normalizedPlace.includes('pokhara')) {
      morning = wantsNature ? 'Head to a scenic viewpoint or lakeside path for the best sunrise and mountain atmosphere.' : 'Begin with a calm lakeside route and easy city exploration.';
      afternoon = wantsAdventure ? 'Choose a short adventure activity or viewpoint outing suited to your energy level.' : 'Enjoy a gentle activity and a slow lunch by the lake.';
      evening = wantsFood ? 'Sample lakeside dining with a relaxed sunset experience.' : 'Wind down with a scenic evening overlooking the water.';
    }

    if (normalizedPlace.includes('chitwan')) {
      morning = wantsNature || wantsWildlife ? 'Do a structured wildlife or nature activity early when the park is most active.' : 'Take a slow start with a local nature walk.';
      afternoon = 'Continue with a guided experience aligned to your interest profile and keep the pace realistic.';
      evening = 'Have dinner near your lodge or a local riverside place and rest well for the next day.';
    }

    if (normalizedPlace.includes('everest') || normalizedPlace.includes('mardi')) {
      morning = wantsAdventure || wantsNature ? 'Start early with the most scenic or physically engaging part of the route.' : 'Have a gentle start with a scenic walk and a slower pace.';
      afternoon = isRelaxed ? 'Keep the midday block lighter with a scenic break and rest.' : 'Continue with a meaningful viewpoint or trekking segment matched to your comfort.';
      evening = 'Enjoy a hearty local meal and early recovery before the next stage.';
      travelNote = budgetProfile === 'budget' ? 'Shared or local transport is used to keep the route economical.' : 'Private or pre-arranged transport can be used to reduce travel friction.';
    }

    if (normalizedPlace.includes('bandipur')) {
      morning = wantsCulture ? 'Explore the historic lanes, windows, local architecture and heritage corners.' : 'Take a relaxed walk through the hill town and settle into the atmosphere.';
      afternoon = wantsFood ? 'Stop for a café break and sample local flavors in a relaxed setting.' : 'Spend a slow afternoon enjoying the views and town atmosphere.';
      evening = 'Wrap up with dinner and a calm sunset moment.';
    }

    if (normalizedPlace.includes('lumbini')) {
      morning = wantsCulture || wantsSpirituality ? 'Visit the key sacred sites and reflection spaces with time for quiet observation.' : 'Begin with a peaceful historic walk around the area.';
      afternoon = 'Explore the local heritage and take time for a slower lunch.';
      evening = 'Keep the evening calm with dinner and a reflective finish to the day.';
    }

    if (isRelaxed) {
      morning = morning.includes('Start') ? 'Keep the morning slow with breakfast, a short walk and time to settle in.' : morning;
      afternoon = 'Leave room for rest, coffee, or a short local browse rather than a packed schedule.';
      evening = 'Use the evening for unhurried dining and recovery.';
    }

    if (styleProfile === 'luxury') {
      morning = `Luxury morning: ${morning}`;
      afternoon = `Luxury afternoon: ${afternoon}`;
      evening = `Luxury evening: ${evening}`;
      travelNote = 'Private transfers and premium service timing are preferred for maximum comfort.';
    }

    if (styleProfile === 'budget' || budgetProfile === 'budget') {
      travelNote = 'Use local transport and lower-cost food options where practical.';
    }

    if (styleProfile === 'adventure') {
      morning = wantsAdventure ? 'Begin with your most active experience while energy and conditions are best.' : morning;
      afternoon = wantsAdventure ? 'Continue the active component and keep the rest of the day lighter.' : afternoon;
    }

    return { morning, afternoon, evening, travelNote };
  };

  const distributeSelectedPlaces = (places, totalDays) => {
    if (!places.length) return Array.from({ length: totalDays }, () => 'Kathmandu Valley');
    if (totalDays <= 0) return [];
    if (places.length === 1) return Array.from({ length: totalDays }, () => places[0]);

    const flow = [];
    for (let dayIndex = 0; dayIndex < totalDays; dayIndex += 1) {
      const placeIndex = dayIndex % places.length;
      flow.push(places[placeIndex]);
    }

    if (totalDays > places.length) {
      const longestStay = Math.max(2, Math.ceil(totalDays / places.length));
      const withStays = [];
      for (let placeIndex = 0; placeIndex < places.length; placeIndex += 1) {
        const remaining = totalDays - withStays.length;
        const stayLength = placeIndex === places.length - 1 ? remaining : Math.min(longestStay, Math.max(1, Math.ceil((totalDays - placeIndex) / (places.length - placeIndex))));
        for (let i = 0; i < stayLength; i += 1) {
          if (withStays.length >= totalDays) break;
          withStays.push(places[placeIndex]);
        }
      }
      return withStays.slice(0, totalDays);
    }

    return flow;
  };

  const togglePlace = (place) => {
    setSelectedPlaces((current) => current.includes(place) ? current.filter((item) => item !== place) : [...current, place]);
  };
  const toggleInterest = (interest) => {
    setSelectedInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
  };
  const generateItinerary = () => {
    const startDateValue = parseDateValue(dates.start);
    const endDateValue = parseDateValue(dates.end);
    const dateCount = getDayCount(dates.start, dates.end);

    if (!startDateValue || !endDateValue || dateCount === 0) {
      setItinerary([]);
      return;
    }

    const places = selectedPlaces.length ? selectedPlaces : ['Kathmandu Valley'];
    const daySequence = distributeSelectedPlaces(places, dateCount);
    const budgetProfile = getBudgetProfile(budget);
    const styleProfile = style.toLowerCase();
    const interestSet = selectedInterests.length ? selectedInterests.map((item) => item.toLowerCase()) : ['culture'];

    const generatedItinerary = daySequence.map((place, index) => {
      const currentDate = addDays(startDateValue, index);
      const recommendations = getDestinationActivityPlan(place, index, daySequence.length, styleProfile, budgetProfile, interestSet);
      const mealRecommendation = getDestinationMealRecommendation(place, budgetProfile, interestSet);

      return {
        day: index + 1,
        date: formatDateValue(currentDate),
        place,
        activity: [
          `Date: ${formatDateValue(currentDate)}`,
          `Location: ${place}`,
          `Morning: ${recommendations.morning}`,
          `Afternoon: ${recommendations.afternoon}`,
          `Evening: ${recommendations.evening}`,
          `Eating: ${mealRecommendation}`,
          `Travel: ${recommendations.travelNote}`,
        ].join('\n'),
      };
    });

    setItinerary(generatedItinerary);
    setSaved(false);
  };
  const addPlace = () => {
    if (newPlace && !selectedPlaces.includes(newPlace)) setSelectedPlaces((current) => [...current, newPlace]);
  };
  const removeDay = (day) => setItinerary((current) => current.filter((item) => item.day !== day).map((item, index) => ({ ...item, day: index + 1 })));
  const moveDay = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= itinerary.length) return;
    const next = [...itinerary];
    [next[index], next[target]] = [next[target], next[index]];
    setItinerary(next.map((item, itemIndex) => ({ ...item, day: itemIndex + 1 })));
  };
  const updateActivity = (day, activity) => setItinerary((current) => current.map((item) => item.day === day ? { ...item, activity } : item));

  const saveTrip = async () => {
    if (!isAuthenticated) { onAuthRequired(); return; }
    if (!itinerary.length) { setPlannerError('Generate an itinerary before saving it.'); return; }
    setPlannerLoading(true);
    setPlannerError('');
    try {
      const tripRequest = { name: `${selectedPlaces[0] || 'Nepal'} journey`, startDate: dates.start || null, endDate: dates.end || null, budget, travelStyle: style };
      const trip = selectedTripId ? await fetchApi(`/api/trips/${selectedTripId}`, { method: 'PUT', body: JSON.stringify(tripRequest) }) : await fetchApi('/api/trips', { method: 'POST', body: JSON.stringify(tripRequest) });
      const tripId = trip.id || selectedTripId;
      const existingItems = savedTrips.find((savedTrip) => String(savedTrip.id) === String(tripId))?.items || [];
      for (const item of itinerary) {
        const destination = destinationLookup(item.place);
        if (!destination?.id) continue;
        const itemRequest = { destinationId: destination.id, dayNumber: item.day, notes: item.date, activities: item.activity };
        const existingItem = existingItems.find((savedItem) => savedItem.dayNumber === item.day);
        if (existingItem?.id) await fetchApi(`/api/trip-items/${existingItem.id}`, { method: 'PUT', body: JSON.stringify(itemRequest) });
        else await fetchApi(`/api/trips/${tripId}/items`, { method: 'POST', body: JSON.stringify(itemRequest) });
      }
      const refreshed = await fetchApi('/api/trips');
      setSavedTrips(refreshed);
      setSelectedTripId(String(tripId));
      setSaved(true);
    } catch (error) {
      setPlannerError(error.message || 'The trip could not be saved.');
    } finally {
      setPlannerLoading(false);
    }
  };

  const loadTrip = async (tripId) => {
    if (!tripId) return;
    setPlannerLoading(true);
    setPlannerError('');
    try {
      const trip = await fetchApi(`/api/trips/${tripId}`);
      setSelectedTripId(String(trip.id));
      setDates({ start: trip.startDate || '', end: trip.endDate || '' });
      setBudget(trip.budget || budget);
      setStyle(trip.travelStyle || style);
      setItinerary((trip.items || []).map((item) => ({ day: item.dayNumber, date: item.notes || '', place: item.destination?.name || 'Nepal', activity: item.activities || '' })));
      setSaved(true);
    } catch (error) {
      setPlannerError(error.message || 'The saved trip could not be loaded.');
    } finally {
      setPlannerLoading(false);
    }
  };

  const deleteSavedTrip = async () => {
    if (!selectedTripId) { setItinerary([]); return; }
    setPlannerLoading(true);
    try {
      await fetchApi(`/api/trips/${selectedTripId}`, { method: 'DELETE' });
      setSavedTrips((current) => current.filter((trip) => String(trip.id) !== String(selectedTripId)));
      setSelectedTripId('');
      setItinerary([]);
      setSaved(false);
    } catch (error) {
      setPlannerError(error.message || 'The saved trip could not be deleted.');
    } finally {
      setPlannerLoading(false);
    }
  };

  return (
    <main className="planner-page">
      <section className="planner-hero">
        <div className="page-container"><button className="explore-back" onClick={onBack}>← Home</button><p className="eyebrow light">Your Nepal, your way</p><h1>Plan a journey<br /><em>that feels like you.</em></h1><p>Choose your places, pace and passions. We’ll turn them into a thoughtful Nepal itinerary.</p></div>
      </section>
      <section className="page-container planner-content">
        <div className="planner-heading"><div><p className="eyebrow">The trip builder</p><h2>Shape your<br /><em>journey.</em></h2></div><span>Step 1 of 1 · Personalize everything</span></div>
        {isAuthenticated && savedTrips.length > 0 && <div className="saved-trip-bar"><label>Saved trips<select value={selectedTripId} onChange={(event) => { setSelectedTripId(event.target.value); loadTrip(event.target.value); }}><option value="">Choose a saved trip</option>{savedTrips.map((trip) => <option key={trip.id} value={trip.id}>{trip.name}</option>)}</select></label></div>}
        {plannerError && <div className="auth-error" role="alert">{plannerError}</div>}
        <div className="planner-layout">
          <div className="planner-form">
            <section className="planner-panel"><h3>1. Choose destinations</h3><p>Select the places you want to include.</p><div className="place-check-grid">{plannerDestinations.map((place) => <label key={place} className={selectedPlaces.includes(place) ? 'checked' : ''}><input type="checkbox" checked={selectedPlaces.includes(place)} onChange={() => togglePlace(place)} /><span>{place}</span></label>)}</div><div className="add-place-row"><select value={newPlace} onChange={(event) => setNewPlace(event.target.value)}>{plannerDestinations.map((place) => <option key={place}>{place}</option>)}</select><button onClick={addPlace}>＋ Add destination</button></div></section>
            <section className="planner-panel"><h3>2. When are you going?</h3><p>Dates help us pace your itinerary.</p><div className="date-fields"><label>Start date<input type="date" value={dates.start} onChange={(event) => setDates((current) => ({ ...current, start: event.target.value }))} /></label><label>End date<input type="date" value={dates.end} onChange={(event) => setDates((current) => ({ ...current, end: event.target.value }))} /></label></div></section>
            <section className="planner-panel"><h3>3. Choose your style</h3><div className="choice-pills">{travelStyles.map((item) => <button className={style === item ? 'selected' : ''} key={item} onClick={() => setStyle(item)}>{item}</button>)}</div><label className="planner-select-label">Estimated budget<select value={budget} onChange={(event) => setBudget(event.target.value)}><option>NPR 25,000 – 50,000</option><option>NPR 50,000 – 100,000</option><option>NPR 100,000 – 200,000</option><option>NPR 200,000+</option></select></label></section>
            <section className="planner-panel"><h3>4. What are you into?</h3><p>Pick as many interests as you like.</p><div className="interest-grid">{interests.map((item) => <button className={selectedInterests.includes(item) ? 'selected' : ''} key={item} onClick={() => toggleInterest(item)}>{selectedInterests.includes(item) ? '✓ ' : ''}{item}</button>)}</div></section>
            <button className="button button-primary generate-button" onClick={generateItinerary}>Generate my itinerary <ArrowIcon /></button>
          </div>
          <aside className="itinerary-panel"><div className="itinerary-panel-head"><div><p className="eyebrow">Your Nepal itinerary</p><h3>{itinerary.length ? `${itinerary.length} day journey` : 'Your trip, ready to shape'}</h3></div>{itinerary.length > 0 && <button className="delete-itinerary" onClick={deleteSavedTrip}>Delete itinerary</button>}</div>{itinerary.length === 0 ? <div className="itinerary-empty"><span>✦</span><h4>Your route starts here.</h4><p>Select at least one destination and generate a suggested itinerary. You can edit every day afterwards.</p></div> : <><div className="trip-summary"><span>{style} trip</span><span>{budget}</span><span>{selectedInterests.length} interests</span></div><div className="itinerary-days">{itinerary.map((item, index) => <article className="itinerary-day" key={`${item.place}-${item.day}`}><div className="day-number">Day {item.day}</div><div className="day-content"><strong>{item.place}</strong><textarea value={item.activity} onChange={(event) => updateActivity(item.day, event.target.value)} aria-label={`Activities for day ${item.day}`} /><div className="day-controls"><button onClick={() => moveDay(index, -1)} disabled={index === 0}>↑ Move earlier</button><button onClick={() => moveDay(index, 1)} disabled={index === itinerary.length - 1}>↓ Move later</button><button onClick={() => removeDay(item.day)}>Remove</button></div></div></article>)}</div><button className={`save-itinerary ${saved ? 'saved' : ''}`} onClick={saveTrip} disabled={plannerLoading}>{plannerLoading ? 'Saving…' : saved ? '✓ Trip saved' : isAuthenticated ? 'Save this trip' : 'Log in to save this trip'}</button></>}</aside>
        </div>
      </section>
    </main>
  );
}

function FavoritesPage({ favorites, onRemove, onOpen, onAddToTrip, onBack }) {
  const savedDestinations = destinationCatalog.filter((destination) => favorites.includes(destination.id));

  return (
    <main className="favorites-page">
      <section className="favorites-hero">
        <div className="page-container">
          <button className="explore-back" onClick={onBack}>← Home</button>
          <p className="eyebrow light">Your saved Nepal</p>
          <h1>My <em>favorites.</em></h1>
          <p>Keep the places that call to you close, then turn them into your next journey.</p>
        </div>
      </section>
      <section className="page-container favorites-content">
        <div className="favorites-heading">
          <div><p className="eyebrow">Saved for later</p><h2>{savedDestinations.length ? 'Places you want to remember.' : 'Your collection is waiting.'}</h2></div>
          <span>{savedDestinations.length} saved {savedDestinations.length === 1 ? 'place' : 'places'}</span>
        </div>
        {savedDestinations.length ? (
          <div className="favorites-grid">
            {savedDestinations.map((destination) => (
              <article className="favorite-card" key={destination.name}>
                <DestinationImage destination={destination} />
                <div className="favorite-card-body">
                  <div className="destination-meta"><span>⌖ {destination.location}</span><strong>★ {destination.rating}</strong></div>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <div className="favorite-card-actions">
                    <button className="favorite-open" onClick={() => onOpen(destination)}>Open destination <ArrowIcon /></button>
                    <button onClick={() => onAddToTrip(destination.name)}>＋ Add to trip</button>
                    <button className="remove-favorite" onClick={() => onRemove(destination.id)}>Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="favorites-empty">
            <span>♡</span>
            <h3>Nothing saved yet.</h3>
            <p>Tap the heart on any destination card or destination detail page to build your personal Nepal shortlist.</p>
            <button className="button button-dark" onClick={onBack}>Explore destinations <ArrowIcon /></button>
          </div>
        )}
      </section>
    </main>
  );
}

function InformationHub({ onBack, onOpenDestination, guideData = [], festivalData = [], foodData = [] }) {
  const [activeTab, setActiveTab] = useState('guide');
  const [festivalRegion, setFestivalRegion] = useState('All regions');
  const [festivalTheme, setFestivalTheme] = useState('All themes');
  const [weatherPlace, setWeatherPlace] = useState('Pokhara');
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const loadWeather = async (place) => {
    setWeatherPlace(place);
    const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
    if (!apiUrl) {
      setWeather(null);
      return;
    }
    setWeatherLoading(true);
    try {
      const response = await fetch(`${apiUrl}?city=${encodeURIComponent(place)}`);
      if (!response.ok) throw new Error('Weather service unavailable');
      setWeather(await response.json());
    } catch {
      setWeather(null);
    } finally {
      setWeatherLoading(false);
    }
  };

  const mapDestinations = destinationCatalog.slice(0, 8);
  const tabs = [['guide', 'Travel guide'], ['culture', 'Nepal culture'], ['food', 'Food guide'], ['weather', 'Weather'], ['map', 'Tourism map']];

  return (
    <main className="information-page">
      <section className="information-hero"><div className="page-container"><button className="explore-back" onClick={onBack}>← Home</button><p className="eyebrow light">Travel deeper</p><h1>Know Nepal<br /><em>before you go.</em></h1><p>Practical guidance, cultural context and useful planning tools for a more thoughtful journey.</p></div></section>
      <section className="page-container information-content">
        <div className="info-tabbar">{tabs.map(([key, label]) => <button key={key} className={activeTab === key ? 'selected' : ''} onClick={() => setActiveTab(key)}>{label}</button>)}</div>
        {activeTab === 'guide' && <section className="info-view"><div className="info-view-heading"><div><p className="eyebrow">Plan with confidence</p><h2>Travel <em>guide.</em></h2></div><span>Always verify time-sensitive details with official sources.</span></div><div className="guide-card-grid">{guideData.map(([title, text, note]) => <article className="guide-info-card" key={title}><span className="info-card-icon">✦</span><h3>{title}</h3><p>{text}</p><small>{note}</small></article>)}</div><div className="verification-note">Information here is general travel guidance, not legal, medical or emergency advice. Visa rules, fares, weather, opening hours and health requirements can change.</div></section>}
        {activeTab === 'culture' && <section className="info-view"><div className="info-view-heading"><div><p className="eyebrow">Stories, rituals and living heritage</p><h2>Nepal <em>culture.</em></h2></div><span>Dates shown below are approximate and change each year.</span></div><div className="culture-topic-grid">{cultureTopics.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div><section className="terai-heritage-panel"><p className="eyebrow">People, places and living traditions</p><h2>Cultural Heritage <em>of Terai.</em></h2><p>The Terai is culturally diverse, with many communities, languages, foods, festivals, arts and religious practices. Chhath has particular prominence in the Terai/Madhesh, while Dashain, Tihar, Holi, Ram Navami, Maha Shivaratri, Krishna Janmashtami, Buddha Jayanti and other festivals are also celebrated widely across Nepal, with local expressions. Janakpur’s Mithila heritage, Tharu traditions, Muslim communities and many other local cultures make the plains a rich place to travel slowly and respectfully.</p></section><h3 className="subsection-title">Mithila Culture</h3><div className="culture-topic-grid"><article><span>01</span><h3>Janakpur as a cultural destination</h3><p>Explore Janaki Temple, Ram-Janaki traditions, sacred ponds, neighborhood celebrations and local cultural experiences.</p></article><article><span>02</span><h3>Art, architecture and crafts</h3><p>Mithila painting, decorated homes, textiles, pottery and other local crafts connect artistic practice with everyday life.</p></article><article><span>03</span><h3>Music, dance and cuisine</h3><p>Regional music and dance, festive clothing, Mithila foods, sweets and hospitality offer a grounded way to experience local culture.</p></article></div><h3 className="subsection-title">Explore Festivals</h3><div className="advanced-filters festival-filters"><label>Region<select value={festivalRegion} onChange={(event) => setFestivalRegion(event.target.value)}><option>All regions</option><option>Terai / Madhesh</option><option>Janakpur / Mithila</option><option>Kathmandu Valley</option><option>Across Nepal</option><option>Himalayan communities</option></select></label><label>Cultural theme<select value={festivalTheme} onChange={(event) => setFestivalTheme(event.target.value)}><option>All themes</option><option>Family and community</option><option>Religious observance</option><option>Arts and heritage</option><option>Seasonal celebration</option></select></label></div><div className="food-grid cultural-festival-grid">{festivalCards.filter(([name, description, region, ritual]) => (festivalRegion === 'All regions' || region.includes(festivalRegion) || (festivalRegion === 'Across Nepal' && region.includes('widely')) || (festivalRegion === 'Terai / Madhesh' && region.includes('Terai'))) && (festivalTheme === 'All themes' || (festivalTheme === 'Family and community' && ['Dashain', 'Tihar / Diwali', 'Holi'].includes(name)) || (festivalTheme === 'Religious observance' && !['Holi'].includes(name)) || (festivalTheme === 'Seasonal celebration' && ['Chhath', 'Holi'].includes(name)) || (festivalTheme === 'Arts and heritage' && ['Tihar / Diwali'].includes(name)))).map(([name, description, region, ritual, image]) => <article className="food-card" key={name}><img src={image} alt={`${name} festival`} /><div><span>{region}</span><h3>{name}</h3><p>{description}</p><small>{ritual}</small></div></article>)}</div><h3 className="subsection-title">Festival calendar</h3><div className="festival-guide-list">{festivals.map(([name, description, season]) => <article key={name}><div><h3>{name}</h3><strong>{season}</strong></div><p>{description}</p></article>)}</div></section>}
        {activeTab === 'food' && <section className="info-view"><div className="info-view-heading"><div><p className="eyebrow">Taste the journey</p><h2>Nepal <em>food guide.</em></h2></div><span>Ask about ingredients when dietary needs matter.</span></div><div className="food-grid">{foodData.map(([name, description, region, diet, culture, image]) => <article className="food-card" key={name}><img src={image || fallbackDestinationImage} alt={name} /><div><span>{region}</span><h3>{name}</h3><p>{description}</p><small>{diet}</small><em>{culture}</em></div></article>)}</div></section>}
        {activeTab === 'weather' && <section className="info-view"><div className="info-view-heading"><div><p className="eyebrow">Plan for the conditions</p><h2>Nepal <em>weather.</em></h2></div><span>Live data requires an optional weather API configuration.</span></div><div className="weather-tool"><div className="weather-selector"><label>Select a destination<select value={weatherPlace} onChange={(event) => loadWeather(event.target.value)}>{destinationCatalog.slice(0, 8).map((destination) => <option key={destination.name}>{destination.name}</option>)}</select></label><p>Best travel season: <strong>{destinationCatalog.find((destination) => destination.name === weatherPlace)?.season || 'Autumn / Spring'}</strong></p></div><div className="weather-result">{weatherLoading ? <p>Loading current weather…</p> : weather ? <><span>Current weather</span><strong>{weather.temperature}°</strong><p>{weather.condition}</p><small>Forecast data supplied by the configured provider.</small></> : <><span>Current weather unavailable</span><strong>—</strong><p>Configure <code>VITE_WEATHER_API_URL</code> to enable live weather for this destination.</p><small>Use official weather information before departure.</small></>}</div></div><div className="season-grid"><div><strong>Spring</strong><span>Clear mountain views and rhododendron blooms.</span></div><div><strong>Summer / monsoon</strong><span>Green landscapes; rain can affect roads and flights.</span></div><div><strong>Autumn</strong><span>Popular trekking season with generally clear skies.</span></div><div><strong>Winter</strong><span>Cool cities and cold high-altitude conditions.</span></div></div></section>}
        {activeTab === 'map' && <section className="info-view"><div className="info-view-heading"><div><p className="eyebrow">Find your way</p><h2>Nepal <em>on the map.</em></h2></div><span>Map markers are an overview; confirm routes locally.</span></div><div className="tourism-map"><div className="map-landscape"><span className="map-label">NEPAL</span>{mapDestinations.map((destination, index) => <button key={destination.id} className={`map-marker marker-${index + 1}`} onClick={() => onOpenDestination(destination)} title={destination.name}>●<span>{destination.name}</span></button>)}</div><div className="map-destination-list">{mapDestinations.map((destination) => <button key={destination.id} onClick={() => onOpenDestination(destination)}><DestinationImage destination={destination} alt="" /><span><strong>{destination.name}</strong><small>{destination.description}</small></span><ArrowIcon /></button>)}</div></div><div className="verification-note">For routing, boundaries and live transport conditions, use an official map provider and local advisories. No map API key is required for this lightweight overview.</div></section>}
      </section>
    </main>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [authPanelOpen, setAuthPanelOpen] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nepal-tourism-user') || 'null');
    } catch {
      return null;
    }
  });
  const [experiences, setExperiences] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [favoriteLoading, setFavoriteLoading] = useState(null);
  const isAuthenticated = Boolean(authenticatedUser && localStorage.getItem('nepal-tourism-token'));
  const [filters, setFilters] = useState({
    region: 'All regions',
    category: 'All categories',
    area: 'All areas',
    type: 'All types',
    difficulty: 'All difficulties',
    budget: 'All budgets',
    season: 'All seasons',
  });
  const [sortBy, setSortBy] = useState('Recommended');
  const [page, setPage] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [experiencesOpen, setExperiencesOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerPlaces, setPlannerPlaces] = useState([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [informationOpen, setInformationOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(null);
  const pageSize = 6;

  useEffect(() => {
    const token = localStorage.getItem('nepal-tourism-token');
    if (!token) return undefined;
    fetchApi('/api/profile').then((profile) => {
      localStorage.setItem('nepal-tourism-user', JSON.stringify(profile));
      setAuthenticatedUser(profile);
    }).catch(() => {
      localStorage.removeItem('nepal-tourism-token');
      localStorage.removeItem('nepal-tourism-user');
      setAuthenticatedUser(null);
    });
    return undefined;
  }, []);

  useEffect(() => {
    const expire = () => setAuthenticatedUser(null);
    window.addEventListener('nepal-tourism-auth-expired', expire);
    const requireAuth = () => setAuthPanelOpen(true);
    window.addEventListener('nepal-tourism-auth-required', requireAuth);
    return () => {
      window.removeEventListener('nepal-tourism-auth-expired', expire);
      window.removeEventListener('nepal-tourism-auth-required', requireAuth);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) { setFavorites([]); return undefined; }
    fetchApi('/api/favorites').then((items) => setFavorites(items.map((item) => item.destinationId))).catch(() => setFavorites([]));
    return undefined;
  }, [isAuthenticated]);

  useEffect(() => {
    const controller = new AbortController();
    const loadCatalog = async () => {
      try {
        setCatalogLoading(true);
        const [destinationData, experienceData, guideData, festivalData, foodData] = await Promise.all([
          fetchApi('/api/destinations', { signal: controller.signal }),
          fetchApi('/api/experiences', { signal: controller.signal }),
          fetchApi('/api/travel-guide', { signal: controller.signal }),
          fetchApi('/api/festivals', { signal: controller.signal }),
          fetchApi('/api/foods', { signal: controller.signal }),
        ]);
        applyBackendDestinations(destinationData);
        applyBackendInformation({ guide: guideData, festivals: festivalData, food: foodData });
        setExperiences(experienceData.map((experience) => ({
          ...experience,
          image: experienceImageByName[experience.name] || experience.image || fallbackExperiences[0].image,
          locations: experience.locations || [],
        })));
        setCatalogError('');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setCatalogError('Tourism data could not be loaded from the local API.');
        }
      } finally {
        if (!controller.signal.aborted) setCatalogLoading(false);
      }
    };
    loadCatalog();
    return () => controller.abort();
  }, []);

  const filteredDestinations = useMemo(() => {
    const search = query.trim().toLowerCase();
    const results = destinationCatalog.filter((destination) => {
      const matchesCategory = category === 'All' || destination.category === category || (category === 'Kathmandu Valley' && destination.valleyCategory === category);
      const matchesSearch = !search || `${destination.name} ${destination.location} ${destination.category} ${(destination.famousFor || []).join(' ')} ${(destination.activities || []).join(' ')}`.toLowerCase().includes(search);
      const matchesRegion = filters.region === 'All regions' || destination.region === filters.region.toLowerCase();
      const matchesFilterCategory = filters.category === 'All categories' || destination.filterCategory === filters.category;
      const matchesArea = filters.area === 'All areas' || destination.area === filters.area.toLowerCase();
      const matchesType = filters.type === 'All types' || destination.type === filters.type || destination.filterCategory === filters.type;
      const matchesDifficulty = filters.difficulty === 'All difficulties' || destination.difficulty === filters.difficulty;
      const matchesBudget = filters.budget === 'All budgets' || destination.budget === filters.budget;
      const matchesSeason = filters.season === 'All seasons' || destination.season === filters.season;
      return matchesCategory && matchesSearch && matchesRegion && matchesFilterCategory && matchesArea && matchesType && matchesDifficulty && matchesBudget && matchesSeason;
    });
    return [...results].sort((a, b) => {
      if (sortBy === 'Rating') return Number(b.rating) - Number(a.rating);
      if (sortBy === 'Name') return a.name.localeCompare(b.name);
      if (sortBy === 'Popularity') return b.popularity.localeCompare(a.popularity);
      return 0;
    });
  }, [category, filters, query, sortBy]);

  const visibleDestinations = filteredDestinations.slice(0, page * pageSize);

  const toggleFavorite = async (id) => {
    if (!isAuthenticated) { setAuthPanelOpen(true); return; }
    setFavoriteLoading(id);
    try {
      if (favorites.includes(id)) {
        await fetchApi(`/api/favorites/${id}`, { method: 'DELETE' });
        setFavorites((current) => current.filter((item) => item !== id));
      } else {
        await fetchApi(`/api/favorites/${id}`, { method: 'POST' });
        setFavorites((current) => [...current, id]);
      }
    } catch (error) {
      setCatalogError(error.message || 'Favorite could not be updated.');
    } finally {
      setFavoriteLoading(null);
    }
  };

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const updateQuery = (value) => {
    setQuery(value);
    setPage(1);
  };

  const openValleyArea = (area) => {
    setFilters((current) => ({ ...current, region: 'Hill', area, category: 'All categories', type: 'All types' }));
    setCategory('All');
    setQuery('');
    setPage(1);
    window.setTimeout(() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' }), 0);
  };

  const openDestination = (destination) => {
    const canonicalDestination = destinationById[destination.id];
    if (!canonicalDestination) return;
    setSelectedDestination(canonicalDestination);
    window.history.pushState({}, '', `#destination-${canonicalDestination.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDestination = () => {
    setSelectedDestination(null);
    window.history.pushState({}, '', '#destinations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openExplore = () => {
    setRegionOpen(null);
    setExploreOpen(true);
    setSelectedDestination(null);
    window.history.pushState({}, '', '#explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openRegion = (regionKey) => {
    setRegionOpen(regionKey);
    setSelectedDestination(null);
    setExploreOpen(false);
    setExperiencesOpen(false);
    setPlannerOpen(false);
    setFavoritesOpen(false);
    setInformationOpen(false);
    window.history.pushState({}, '', `#destinations/${regionKey}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openExperiences = () => {
    setRegionOpen(null);
    setExperiencesOpen(true);
    setExploreOpen(false);
    setSelectedDestination(null);
    window.history.pushState({}, '', '#experiences');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openPlanner = () => {
    setRegionOpen(null);
    setPlannerOpen(true);
    setFavoritesOpen(false);
    setExperiencesOpen(false);
    setExploreOpen(false);
    setSelectedDestination(null);
    window.history.pushState({}, '', '#planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openPlannerWithPlace = (name) => {
    setPlannerPlaces([name]);
    openPlanner();
  };

  const openFavorites = () => {
    setRegionOpen(null);
    setFavoritesOpen(true);
    setPlannerOpen(false);
    setExperiencesOpen(false);
    setExploreOpen(false);
    setSelectedDestination(null);
    window.history.pushState({}, '', '#favorites');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openInformation = () => {
    setRegionOpen(null);
    setInformationOpen(true);
    setFavoritesOpen(false);
    setPlannerOpen(false);
    setExperiencesOpen(false);
    setExploreOpen(false);
    setSelectedDestination(null);
    window.history.pushState({}, '', '#guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('nepal-tourism-token');
    localStorage.removeItem('nepal-tourism-user');
    setAuthenticatedUser(null);
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={() => scrollTo('top')} aria-label="Nepal Tourism Guide home">
          <span className="brand-mark">✦</span>
          <span><strong>Nepal</strong><small>Tourism Guide</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen}><span /><span /><span /></button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          <a className="active" href="#top" onClick={() => scrollTo('top')}>Home</a>
          <a href="#destinations" onClick={() => scrollTo('destinations')}>Destinations</a>
          <a href="#explore" onClick={openExplore}>Explore Nepal</a>
          <a href="#experiences" onClick={openExperiences}>Experiences</a>
          <a href="#planner" onClick={openPlanner}>Trip planner</a>
          <a href="#favorites" onClick={openFavorites}>My favorites{favorites.length > 0 && <span className="nav-count">{favorites.length}</span>}</a>
          <a href="#categories" onClick={() => scrollTo('categories')}>Categories</a>
          <a href="#guide" onClick={openInformation}>Travel guide</a>
        </nav>
        <div className="header-actions">
          <label className="language-select"><span className="globe">◎</span><select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Choose language"><option value="EN">EN</option><option value="NE">नेपाली</option><option value="DE">DE</option></select></label>
          {authenticatedUser ? <button className="login-link" onClick={logout} title="Log out">{authenticatedUser.name || 'Account'} · Log out</button> : <button className="login-link" onClick={() => setAuthPanelOpen(true)}>Log in <ArrowIcon /></button>}
        </div>
      </header>

      {authPanelOpen && <AuthPanel onClose={() => setAuthPanelOpen(false)} onAuthenticated={setAuthenticatedUser} />}

      {catalogError && <div className="page-container empty-state" role="alert">{catalogError} Check that the Spring Boot backend is running on port 8080.</div>}

      <main id="top">
        {selectedDestination ? <DestinationDetails destination={selectedDestination} favorite={favorites.includes(selectedDestination.id)} onFavorite={toggleFavorite} onBack={closeDestination} onAddToTrip={openPlannerWithPlace} /> : regionOpen ? <RegionPage regionKey={regionOpen} favorites={favorites} onFavorite={toggleFavorite} onExploreDestination={openDestination} onBack={() => { setRegionOpen(null); window.history.pushState({}, '', '#top'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} /> : exploreOpen ? <ExploreNepal selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} favorites={favorites} onFavorite={toggleFavorite} onExploreDestination={(destination) => { setExploreOpen(false); openDestination(destination); }} onBack={() => { setExploreOpen(false); window.history.pushState({}, '', '#top'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} /> : experiencesOpen ? <ExperiencesPage experiences={experiences} onBack={() => { setExperiencesOpen(false); window.history.pushState({}, '', '#top'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} /> : plannerOpen ? <TripPlanner initialPlaces={plannerPlaces} onBack={() => { setPlannerOpen(false); window.history.pushState({}, '', '#top'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} /> : favoritesOpen ? <FavoritesPage favorites={favorites} onRemove={toggleFavorite} onOpen={(destination) => { setFavoritesOpen(false); openDestination(destination); }} onAddToTrip={openPlannerWithPlace} onBack={() => { setFavoritesOpen(false); window.history.pushState({}, '', '#top'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} /> : informationOpen ? <InformationHub guideData={travelGuideSections} festivalData={festivalCards} foodData={foods} onBack={() => { setInformationOpen(false); window.history.pushState({}, '', '#top'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} onOpenDestination={(destination) => { setInformationOpen(false); openDestination(destination); }} /> : <>
        <section className="dashboard-hero">
          <div className="hero-image" /><div className="hero-overlay" />
          <div className="page-container hero-dashboard-content">
            <div className="hero-copy-block">
              <p className="eyebrow light">Your next great story starts here</p>
              <h1>Discover<br /><em>Nepal</em></h1>
              <p>Explore the Himalayas, experience ancient culture, and find unforgettable places made for your kind of adventure.</p>
              <div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo('destinations')}>Explore Nepal <ArrowIcon /></button><button className="button button-ghost" onClick={openPlanner}>Plan your trip <ArrowIcon /></button></div>
            </div>
            <div className="hero-stats"><div><strong>8</strong><span>UNESCO sites</span></div><div><strong>14</strong><span>Highest peaks</span></div><div><strong>100+</strong><span>Ways to wander</span></div></div>
          </div>
          <form className="dashboard-search page-container" onSubmit={(event) => event.preventDefault()}><span className="search-icon">⌕</span><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search destinations, activities or regions" aria-label="Search destinations, activities or regions" /><button type="submit">Search <ArrowIcon /></button></form>
        </section>

        <section className="region-explore-section page-container" id="regions">
          <SectionTitle eyebrow="One country, three landscapes" title={<>Explore Nepal <em>by region.</em></>} />
          <p className="region-explore-intro">From the world's highest mountains to beautiful hills and fertile Terai plains, discover the diversity of Nepal.</p>
          <div className="region-explore-grid">{Object.entries(tourismRegions).map(([key, region]) => <article className={`region-explore-card region-${key}`} key={key}><DestinationImage destination={destinationById[region.destinationId]} alt={region.name} /><div className="region-explore-shade" /><div className="region-explore-copy"><span>{region.icon}</span><p>{region.name}</p><h3>{region.description}</h3><small>{destinationCatalog.filter((destination) => destination.region === key).length} destinations</small><button onClick={() => openRegion(key)}>Explore region <ArrowIcon /></button></div></article>)}</div>
        </section>

        <section className="region-explore-section page-container" id="kathmandu-valley">
          <SectionTitle eyebrow="Temples, heritage & famous places" title={<>Discover <em>Kathmandu Valley.</em></>} />
          <p className="region-explore-intro">Explore the historic Kathmandu Valley, home to ancient temples, sacred sites, UNESCO heritage areas, traditional Newari architecture, courtyards, stupas and vibrant cultural life.</p>
          <div className="region-explore-grid">
            <ValleyAreaCard area="Kathmandu" destination={destinationById['pashupatinath-temple']} count={kathmanduValleyPlaces.filter((place) => place.area === 'kathmandu').length} onExplore={() => openValleyArea('Kathmandu')} />
            <ValleyAreaCard area="Lalitpur / Patan" destination={destinationById['patan-durbar-square']} count={kathmanduValleyPlaces.filter((place) => place.area === 'lalitpur').length} onExplore={() => openValleyArea('Lalitpur')} />
            <ValleyAreaCard area="Bhaktapur" destination={destinationById['bhaktapur-durbar-square']} count={kathmanduValleyPlaces.filter((place) => place.area === 'bhaktapur').length} onExplore={() => openValleyArea('Bhaktapur')} />
          </div>
        </section>

        <section className="dashboard-section page-container" id="destinations">
          <SectionTitle eyebrow="Start exploring" title={<>Popular <em>destinations.</em></>} action={{ label: 'View all places', href: '#destinations' }} />
          <div className="destination-toolbar">
            <div className="filter-tabs">{['All', 'Kathmandu Valley', 'Trekking', 'Culture & Heritage', 'Wildlife', 'Lakes & Nature'].map((item) => <button key={item} className={category === item ? 'selected' : ''} onClick={() => { setCategory(item); setPage(1); }}>{item}</button>)}</div>
            <label className="sort-control">Sort by <select value={sortBy} onChange={(event) => { setSortBy(event.target.value); setPage(1); }}><option>Recommended</option><option>Popularity</option><option>Rating</option><option>Name</option></select></label>
          </div>
          <div className="advanced-filters">
            <label>Region<select value={filters.region} onChange={(event) => updateFilter('region', event.target.value)}>{destinationFilters.regions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Area<select value={filters.area} onChange={(event) => updateFilter('area', event.target.value)}>{destinationFilters.areas.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Type<select value={filters.type} onChange={(event) => updateFilter('type', event.target.value)}>{destinationFilters.types.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Category<select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}>{destinationFilters.categories.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Difficulty<select value={filters.difficulty} onChange={(event) => updateFilter('difficulty', event.target.value)}>{destinationFilters.difficulties.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Budget<select value={filters.budget} onChange={(event) => updateFilter('budget', event.target.value)}>{destinationFilters.budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Season<select value={filters.season} onChange={(event) => updateFilter('season', event.target.value)}>{destinationFilters.seasons.map((item) => <option key={item}>{item}</option>)}</select></label>
            <button className="clear-filters" onClick={() => { setFilters({ region: 'All regions', category: 'All categories', area: 'All areas', type: 'All types', difficulty: 'All difficulties', budget: 'All budgets', season: 'All seasons' }); setCategory('All'); setSortBy('Recommended'); setQuery(''); setPage(1); }}>Clear all</button>
          </div>
          <div className="results-bar"><span className="results-count">Showing {visibleDestinations.length} of {filteredDestinations.length} destinations</span><span className="results-hint">Filter by region, experience or travel style</span></div>
          <div className="destination-grid dashboard-grid">{visibleDestinations.map((destination) => <DestinationCard key={destination.id} destination={{ ...destination, onExplore: openDestination }} favorite={favorites.includes(destination.id)} onFavorite={toggleFavorite} />)}</div>
          {filteredDestinations.length === 0 && <div className="empty-state">No destinations match that search yet. Try another region or category.</div>}
          {visibleDestinations.length < filteredDestinations.length && <button className="load-more" onClick={() => setPage((current) => current + 1)}>Load more destinations <ArrowIcon /></button>}
        </section>

        <section className="dashboard-section page-container" id="kathmandu-valley-places">
          <SectionTitle eyebrow="Living heritage in three historic cities" title={<>Kathmandu Valley <em>places.</em></>} action={{ label: 'View all Kathmandu Valley places', href: '#destinations' }} />
          <p className="region-explore-intro">Explore ancient temples, sacred stupas, historic squares and living Newari heritage.</p>
          <div className="destination-grid dashboard-grid">{kathmanduValleyPlaces.slice(0, 8).map((destination) => <DestinationCard key={destination.id} destination={{ ...destination, onExplore: openDestination }} favorite={favorites.includes(destination.id)} onFavorite={toggleFavorite} />)}</div>
          <button className="load-more" onClick={() => { setCategory('Kathmandu Valley'); setPage(1); document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' }); }}>View All Kathmandu Valley Places <ArrowIcon /></button>
        </section>

        <section className="experiences-section" id="experiences"><div className="page-container"><SectionTitle eyebrow="Go beyond the postcard" title={<>Top <em>experiences.</em></>} /><div className="experience-grid">{catalogLoading ? <div className="empty-state">Loading experiences...</div> : experiences.slice(0, 3).map((experience, index) => <article className="experience-tile" key={experience.id || experience.name}><span className="experience-number">{String(index + 1).padStart(2, '0')}</span><span className="experience-icon">↗</span><p>{experience.difficulty}</p><h3>{experience.name}</h3><span>{experience.description}</span><button onClick={openExperiences}>Discover <ArrowIcon /></button></article>)}</div></div></section>

        <section className="dashboard-section page-container" id="categories"><SectionTitle eyebrow="Find your way" title={<>Explore by <em>category.</em></>} /><div className="category-grid">{categories.map(([icon, name, count, image]) => <a className="category-tile" href="#destinations" key={name}><img src={image} alt="" /><div className="category-shade" /><span className="category-icon">{icon}</span><div><h3>{name}</h3><p>{count} <ArrowIcon /></p></div></a>)}</div></section>

        <section className="recommendation-section"><div className="page-container"><SectionTitle eyebrow="Picked for curious travelers" title={<>Recommended <em>for you.</em></>} action={{ label: 'See recommendations', href: '#destinations' }} /><div className="recommendation-layout"><article className="featured-place"><DestinationImage destination={destinationById.everest} alt="Everest Base Camp" /><div><span className="category-pill">Editor’s choice</span><h3>Everest Base Camp</h3><p>A once-in-a-lifetime walk through the heart of the Khumbu.</p><button className="button button-primary" onClick={() => openDestination(destinationById.everest)}>View journey <ArrowIcon /></button></div></article><div className="mini-place-list">{destinations.slice(2, 5).map((destination) => <div className="mini-place" key={destination.id} onClick={() => openDestination(destination)}><DestinationImage destination={destination} alt={destination.name} /><div><span>{destination.category}</span><h3>{destination.name}</h3><strong>★ {destination.rating}</strong></div><ArrowIcon /></div>)}</div></div></div></section>

        <section className="split-section page-container" id="planner"><article className="split-feature trekking-feature"><div><p className="eyebrow light">For the wild at heart</p><h2>Trekking &<br /><em>adventure.</em></h2><p>From gentle foothills to high Himalayan passes, choose the trail that matches your pace.</p><button className="button button-light" onClick={openPlanner}>Plan this adventure <ArrowIcon /></button></div></article><article className="split-feature culture-feature"><div><p className="eyebrow light">Stories in every stone</p><h2>Culture &<br /><em>heritage.</em></h2><p>Step into sacred courtyards, timeless towns and living traditions.</p><button className="button button-light" onClick={openPlanner}>Build your journey <ArrowIcon /></button></div></article></section>

        <section className="nature-section page-container"><div className="nature-heading"><p className="eyebrow">Wild and wonderful</p><h2>National parks,<br /><em>lakes & wonders.</em></h2><p>Nepal is more than the mountains. Make time for the deep green, the quiet blue and everything in between.</p></div><div className="nature-cards"><article><DestinationImage destination={destinationById.chitwan} alt="National parks and wildlife" /><div><span>National parks & wildlife</span><h3>Into the wild</h3><a href="#destinations">Explore safari <ArrowIcon /></a></div></article><article><DestinationImage destination={destinationById['rara-lake']} alt="Lakes and natural wonders" /><div><span>Lakes & natural wonders</span><h3>Find stillness</h3><a href="#destinations">See natural escapes <ArrowIcon /></a></div></article></div></section>

        <section className="guide-strip" id="guide"><div className="page-container guide-dashboard"><div><p className="eyebrow">Travel well</p><h2>Good to know<br /><em>before you go.</em></h2></div><div className="guide-facts"><span>Best time</span><strong>Oct — Nov</strong><span>Currency</span><strong>NPR</strong><span>Emergency</span><strong>100 / 102</strong><span>Altitude range</span><strong>1,350m+</strong></div><div className="tips-list"><h3>Travel tips</h3><p>Carry layers, drink plenty of water and always pack curiosity.</p><a className="text-link" href="#guide">Open travel guide <ArrowIcon /></a></div></div></section>

        <section className="festival-section page-container"><div><p className="eyebrow">A calendar of color</p><h2>Nepal <em>festivals.</em></h2><p>Join the celebrations that bring neighborhoods, families and travelers together.</p></div><div className="festival-list"><div><strong>Sep / Oct</strong><h3>Dashain</h3><span>Nepal’s biggest celebration of family, blessings and new beginnings.</span></div><div><strong>Oct / Nov</strong><h3>Tihar</h3><span>Five luminous days of lights, music and honoring every living soul.</span></div><div><strong>Feb / Mar</strong><h3>Holi</h3><span>Welcome spring with color, laughter and an open heart.</span></div></div></section>

        <section className="cta-section"><div className="page-container cta-inner"><p className="eyebrow light">Your story is waiting</p><h2>Ready to find your<br /><em>Nepal?</em></h2><p>Save your favorite places and start building a journey that feels like yours.</p><button className="button button-primary" onClick={() => scrollTo('destinations')}>Start exploring <ArrowIcon /></button></div></section>
        </>}
      </main>
      <footer className="site-footer"><div className="page-container footer-inner"><a className="brand footer-brand" href="#top"><span className="brand-mark">✦</span><span><strong>Nepal</strong><small>Tourism Guide</small></span></a><p>Go gently. Go further.</p><span className="footer-copy">© 2026 Nepal Tourism Guide</span></div></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
