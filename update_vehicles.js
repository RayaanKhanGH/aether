const fs = require('fs');

const locations = ["Miami", "Monaco", "Dubai", "Los Angeles", "London", "Paris", "New York", "Tokyo", "Geneva", "Singapore"];

const baseCars = [
  { name: "Toyota Camry HEV Premium", tier: "Budget", specialty: "Sedan", basePrice: 85, seats: 5, transmission: "Automatic", fuel: "Hybrid", desc: "Reliable, comfortable, and highly efficient.", specs: { horsepower: "208 hp", acceleration: "7.4s", topSpeed: "115 mph"} },
  { name: "Tesla Model 3 Long Range", tier: "Economy", specialty: "Electric", basePrice: 120, seats: 5, transmission: "Automatic", fuel: "Electric", desc: "The benchmark for modern electric driving.", specs: { horsepower: "346 hp", acceleration: "4.2s", topSpeed: "145 mph"} },
  { name: "Mercedes-Benz E-Class", tier: "Economy+", specialty: "Sedan", basePrice: 220, seats: 5, transmission: "Automatic", fuel: "Petrol", desc: "A masterful blend of luxury, technology, and performance.", specs: { horsepower: "255 hp", acceleration: "6.1s", topSpeed: "130 mph"} },
  { name: "BMW X5 xDrive40i", tier: "Premium", specialty: "SUV", basePrice: 280, seats: 5, transmission: "Automatic", fuel: "Hybrid", desc: "Versatile luxury SUV built for both comfort and presence.", specs: { horsepower: "335 hp", acceleration: "5.3s", topSpeed: "150 mph"} },
  { name: "Porsche 911 Carrera S", tier: "Executive", specialty: "Sports", basePrice: 650, seats: 2, transmission: "Automatic", fuel: "Petrol", desc: "Timeless sports car silhouette with precision engineering.", specs: { horsepower: "443 hp", acceleration: "3.5s", topSpeed: "191 mph"} },
  { name: "Rolls-Royce Phantom VIII", tier: "Elite", specialty: "Sedan", basePrice: 1800, seats: 4, transmission: "Automatic", fuel: "Petrol", desc: "The absolute pinnacle of handcrafted automotive luxury.", specs: { horsepower: "563 hp", acceleration: "5.1s", topSpeed: "155 mph"} },
  { name: "Mercedes-AMG GT", tier: "Executive", specialty: "Sports", basePrice: 700, seats: 2, transmission: "Automatic", fuel: "Petrol", desc: "Aggressive styling meets uncompromising power on the track and road.", specs: { horsepower: "523 hp", acceleration: "3.7s", topSpeed: "193 mph"} },
  { name: "Mercedes-Benz SLS AMG", tier: "Elite", specialty: "Sports", basePrice: 1200, seats: 2, transmission: "Automatic", fuel: "Petrol", desc: "Gullwing doors and a roaring V8 define this modern classic.", specs: { horsepower: "563 hp", acceleration: "3.7s", topSpeed: "197 mph"} },
  { name: "Range Rover Autobiography", tier: "Executive", specialty: "SUV", basePrice: 550, seats: 5, transmission: "Automatic", fuel: "Petrol", desc: "Command the road with ultimate British luxury and capability.", specs: { horsepower: "523 hp", acceleration: "4.4s", topSpeed: "155 mph"} },
  { name: "Lamborghini Huracán EVO", tier: "Elite", specialty: "Hypercar", basePrice: 1500, seats: 2, transmission: "Automatic", fuel: "Petrol", desc: "A naturally aspirated V10 screaming masterpiece.", specs: { horsepower: "631 hp", acceleration: "2.9s", topSpeed: "202 mph"} },
  { name: "Honda Accord Touring", tier: "Budget", specialty: "Sedan", basePrice: 90, seats: 5, transmission: "Automatic", fuel: "Petrol", desc: "Spacious, responsive, and incredibly practical.", specs: { horsepower: "252 hp", acceleration: "5.7s", topSpeed: "130 mph"} },
  { name: "Lexus RX 350", tier: "Economy+", specialty: "SUV", basePrice: 180, seats: 5, transmission: "Automatic", fuel: "Petrol", desc: "Smooth, quiet, and reliable daily luxury.", specs: { horsepower: "295 hp", acceleration: "7.2s", topSpeed: "124 mph"} },
  { name: "Audi e-tron GT", tier: "Premium", specialty: "Electric", basePrice: 350, seats: 4, transmission: "Automatic", fuel: "Electric", desc: "Sleek, aerodynamic, and shockingly fast electric grand tourer.", specs: { horsepower: "522 hp", acceleration: "3.9s", topSpeed: "152 mph"} },
  { name: "Ferrari F8 Tributo", tier: "Elite", specialty: "Hypercar", basePrice: 1900, seats: 2, transmission: "Automatic", fuel: "Petrol", desc: "The ultimate expression of the legendary Ferrari V8.", specs: { horsepower: "710 hp", acceleration: "2.8s", topSpeed: "211 mph"} }
];

let idCounter = 1;
const vehicles = [];

locations.forEach(location => {
  const numCars = 5 + (location.length % 3); 
  let startIndex = location.charCodeAt(0) % baseCars.length;
  
  for(let i=0; i<numCars; i++) {
    const car = baseCars[(startIndex + i) % baseCars.length];
    const priceModifier = 1.0 + (((location.charCodeAt(0) + i) % 20) - 10) / 100;
    const price = Math.round(car.basePrice * priceModifier);
    
    vehicles.push({
      id: "v" + idCounter++,
      name: car.name,
      tier: car.tier,
      specialty: car.specialty,
      location: location,
      price: price,
      seats: car.seats,
      transmission: car.transmission,
      fuel: car.fuel,
      desc: car.desc,
      specs: car.specs
    });
  }
});

const fileStr = fs.readFileSync('app/fleet/page.tsx', 'utf8');
const regex = /const VEHICLES: Vehicle\[\] = \[[\s\S]*?\];/;
const replacement = "const VEHICLES: Vehicle[] = [\n" + vehicles.map(v => JSON.stringify(v)).join(',\n') + "\n];";

const newFileStr = fileStr.replace(regex, replacement);

fs.writeFileSync('app/fleet/page.tsx', newFileStr);
console.log('Successfully updated vehicles! Total:', vehicles.length);
