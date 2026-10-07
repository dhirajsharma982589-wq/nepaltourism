export const nepalMapCenter = [28.3949, 84.124];

export const destinationLocations = {
  pokhara: { name: 'Pokhara', coordinates: [28.2096, 83.9856], province: 'Gandaki', directionsLink: 'https://www.openstreetmap.org/?mlat=28.2096&mlon=83.9856#map=13/28.2096/83.9856' },
  everest: { name: 'Everest Region', coordinates: [27.9881, 86.9250], province: 'Koshi', directionsLink: 'https://www.openstreetmap.org/?mlat=27.9881&mlon=86.9250#map=10/27.9881/86.9250' },
  kathmandu: { name: 'Kathmandu', coordinates: [27.7172, 85.3240], province: 'Bagmati', directionsLink: 'https://www.openstreetmap.org/?mlat=27.7172&mlon=85.3240#map=12/27.7172/85.3240' },
  chitwan: { name: 'Chitwan', coordinates: [27.5749, 84.3466], province: 'Madhesh', directionsLink: 'https://www.openstreetmap.org/?mlat=27.5749&mlon=84.3466#map=11/27.5749/84.3466' },
  bandipur: { name: 'Bandipur', coordinates: [27.9485, 84.4179], province: 'Gandaki', directionsLink: 'https://www.openstreetmap.org/?mlat=27.9485&mlon=84.4179#map=13/27.9485/84.4179' },
  'rara-lake': { name: 'Rara Lake', coordinates: [29.5302, 82.0894], province: 'Karnali', directionsLink: 'https://www.openstreetmap.org/?mlat=29.5302&mlon=82.0894#map=11/29.5302/82.0894' },
  lumbini: { name: 'Lumbini', coordinates: [27.4874, 83.2747], province: 'Lumbini', directionsLink: 'https://www.openstreetmap.org/?mlat=27.4874&mlon=83.2747#map=12/27.4874/83.2747' },
  annapurna: { name: 'Annapurna Region', coordinates: [28.5954, 83.9309], province: 'Gandaki', directionsLink: 'https://www.openstreetmap.org/?mlat=28.5954&mlon=83.9309#map=10/28.5954/83.9309' },
  patan: { name: 'Patan Durbar Square', coordinates: [27.6710, 85.3247], province: 'Bagmati', directionsLink: 'https://www.openstreetmap.org/?mlat=27.6710&mlon=85.3247#map=15/27.6710/85.3247' },
  bhaktapur: { name: 'Bhaktapur', coordinates: [27.6713, 85.4292], province: 'Bagmati', directionsLink: 'https://www.openstreetmap.org/?mlat=27.6713&mlon=85.4292#map=14/27.6713/85.4292' },
  janakpur: { name: 'Janakpur', coordinates: [26.7300, 85.9250], province: 'Madhesh', directionsLink: 'https://www.openstreetmap.org/?mlat=26.7300&mlon=85.9250#map=12/26.7300/85.9250' },
  ilam: { name: 'Ilam', coordinates: [26.9104, 87.9299], province: 'Koshi', directionsLink: 'https://www.openstreetmap.org/?mlat=26.9104&mlon=87.9299#map=12/26.9104/87.9299' },
  mustang: { name: 'Mustang', coordinates: [28.9183, 83.8699], province: 'Gandaki', directionsLink: 'https://www.openstreetmap.org/?mlat=28.9183&mlon=83.8699#map=10/28.9183/83.8699' },
  gosaikunda: { name: 'Gosaikunda', coordinates: [28.0485, 85.4016], province: 'Bagmati', directionsLink: 'https://www.openstreetmap.org/?mlat=28.0485&mlon=85.4016#map=12/28.0485/85.4016' },
  'pashupatinath-temple': { name: 'Pashupatinath Temple', coordinates: [27.7100, 85.3480], province: 'Bagmati', directionsLink: 'https://www.openstreetmap.org/?mlat=27.7100&mlon=85.3480#map=16/27.7100/85.3480' },
};

export function getDestinationLocation(destination) {
  if (!destination) return null;

  const destinationName = typeof destination === 'string' ? destination : destination.name || destination.id;
  const normalized = String(destinationName).trim().toLowerCase();

  if (!normalized) return null;

  const directMatch = destinationLocations[normalized] || Object.values(destinationLocations).find((entry) => {
    const matchName = entry.name.toLowerCase();
    return matchName === normalized || matchName.includes(normalized) || normalized.includes(matchName);
  });

  if (!directMatch) return null;

  return {
    ...directMatch,
    latitude: directMatch.coordinates[0],
    longitude: directMatch.coordinates[1],
    coordinates: directMatch.coordinates,
  };
}

export function getMapMarkers(destinations = []) {
  return destinations
    .map((destination) => {
      const location = getDestinationLocation(destination);
      if (!location) return null;
      return {
        ...destination,
        ...location,
      };
    })
    .filter(Boolean);
}
