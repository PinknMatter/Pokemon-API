/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


/**
Description of preload
*/
let pokemon;
let pokemonImage;
let grass = [];
let particles = [];
let images = [];
let pokemons = ["bulbasaur", "charmander", "squirtle", "pikachu", "jigglypuff", "geodude", "magikarp", "gyarados", "lapras", "eevee", "vaporeon", "jolteon",
   "flareon", "porygon", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew", "chikorita", "cyndaquil", "totodile",
   "togepi", "ampharos", "espeon", "umbreon", "wobbuffet", "snubbull", "teddiursa", "hoothoot", "togekiss", "lucario", "riolu", "gible", "gabite", "garchomp",
   "piplup", "prinplup", "empoleon", "buneary", "lopunny", "munchlax", "croagunk", "toxicroak", "starly", "staravia", "staraptor", "abra", "kadabra", "alakazam",
   "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans",
   "arbok", "pikipek", "trumbeak", "toucannon", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaaffy", "ampharos", "azurill",
   "marill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow",
   "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew",
   "chikorita", "bayleef", "meganium", "cyndaquil", "quilava", "typhlosion", "totodile", "croconaw", "feraligatr", "sentret", "furret", "hoothoot", "noctowl", "ledyba",
   "ledian", "spinarak", "ariados", "crobat", "chinchou", "lanturn", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaaffy", "ampharos",
   "azurill", "marill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow",
   "slowking", "unown", "wobbuffet", "girafarig", "pineco", "forretress", "dunsparce", "gligar", "steelix", "snubbull", "granbull", "qwilfish", "scizor", "shuckle", "heracross",
   "sneasel", "teddiursa", "ursaring", "slugma", "magcargo", "swinub", "piloswine", "corsola", "remoraid", "octillery", "delibird", "mantine", "skarmory", "houndour", "houndoom",
   "phanpy", "donphan", "stantler", "smeargle", "tyrogue", "hitmontop", "smoochum", "elekid", "magby", "miltank", "slowking", "unown", "wobbuffet"];
//Preload functions makes sure that all pokemon images are loaded before continuing 
function preload() {
   for (let i = 0; i < pokemons.length; i++) {
      pokemon = loadJSON("https://pokeapi.co/api/v2/pokemon/" + pokemons[i], function (pokemontemp) {
         let pokemonname = pokemons[i];
         images[i] = loadImage(pokemontemp.sprites.front_default);
         particles.push(new pParticles(images[i], random(800), random(800), pokemonname));

      })
   }


}


function setup() {
   //setsup the canvas creates grass particles

   createCanvas(800, 800);

   for (let i = 0; i < 6000; i++) {
      grass.push(new Grass(i));


   }


}


function draw() {
   //refreshed the background draws the amount of particles for grass and images
   background(0, 150, 0);
   for (let i = 0; i < particles.length; i++) {
      particles[i].draw();

      // particles[i].update();
   }
   for (let i = 0; i < grass.length; i++) {
      grass[i].update();
      grass[i].place();
   }




}

//constructor for pokemon images 
class pParticles {
   constructor(pokemonImage, x, y, name) {
      this.x = x;
      this.y = y;
      this.name = name;

      this.pokemonImage = pokemonImage;


      this.homeX = x;
      this.homeY = y;
   }

   draw() {
      image(this.pokemonImage, this.x, this.y);
   }

}

//constructor for grass 
class Grass {

   constructor(x, y) {
      this.x = random(height);
      this.y = random(width);
      this.color = random(100, 200);

      this.homeX = this.x;
      this.homeY = this.y;
      this.angle = random(-PI / 4, PI / 4);
      this.len = random(10, 30);

   }


   update() {

      // calculates the distance between particles and the mouse
      let mouseD = dist(this.x, this.y, mouseX, mouseY);
      let mouseA = atan2(this.y - mouseY, this.x - mouseX);

      // calculates the distance between the particle and where its home value is
      let homeD = dist(this.x, this.y, this.homeX, this.homeY);
      let homeA = atan2(this.homeY - this.y, this.homeX - this.x);


      //constrains the amount the particles disperse as well as the velocity and force 
      let mouseF = constrain(map(mouseD, 10, 180, 10, 0), 0, 20);
      let homeF = map(homeD, 0, 100, 0, 4);

      //velocity of the particles
      let vx = cos(mouseA) * mouseF;
      vx += cos(homeA) * homeF;

      let vy = sin(mouseA) * mouseF;
      vy += sin(homeA) * homeF;

      //add the particles position to the velocity
      this.x += vx;
      this.y += vy;


   }

   //draws grass shapehover() {

   if(this.name = charzard) {
      alert("You found him");
   }
}
place() {
   push();
   translate(this.x, this.y);
   rotate(this.angle + HALF_PI);
   noStroke();
   fill(50, this.color, 50);
   beginShape();
   vertex(0, 0);
   quadraticVertex(this.len / 2, -this.len / 2, this.len, 0);
   quadraticVertex(this.len / 2, this.len / 2, 0, 0);
   endShape();
   pop();

}


}