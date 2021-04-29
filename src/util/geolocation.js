export const haversine = (loc1, loc2) => {
  // radius of earth in yards
  const R = 6967410.324;

  // first set of locinates (converted to radians)
  const φ1 = (loc1[0] * Math.PI) / 180;
  const λ1 = (loc1[1] * Math.PI) / 180;

  // second set of locinates
  const φ2 = (loc2[0] * Math.PI) / 180;
  const λ2 = (loc2[1] * Math.PI) / 180;

  // pythagorean version of the Haversine Method
  // used for relatively short distances
  const x = (λ2 - λ1) * Math.cos((φ1 + φ2) / 2);
  const y = φ2 - φ1;
  const d = Math.sqrt(x * x + y * y) * R;

  return Math.round(d);
};

export const getLocation = (setLocation) => {
  const success = (position) => {
    setLocation([position.coords.latitude, position.coords.longitude]);
  };
  
  const fail = (error) => {
    console.error(error);
  };
  navigator.geolocation.getCurrentPosition(success, fail, {
    enableHighAccuracy: true,
  });
};
