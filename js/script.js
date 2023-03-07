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
let grassblades = [];
let particles = [];
let images = [];
let pokemons = ["bulbasaur", "charmander", "squirtle", "pikachu", "jigglypuff", "geodude", "magikarp", "gyarados", "lapras", "eevee", "vaporeon", "jolteon", 
"flareon", "porygon", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew", "chikorita", "cyndaquil", "totodile",
 "togepi", "ampharos", "espeon", "umbreon", "wobbuffet", "snubbull", "teddiursa", "hoothoot", "togekiss", "lucario", "riolu", "gible", "gabite", "garchomp", 
 "piplup", "prinplup", "empoleon", "buneary", "lopunny", "munchlax", "croagunk", "toxicroak", "starly", "staravia", "staraptor","abra", "kadabra", "alakazam", 
 "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", 
 "arbok", "pikipek", "trumbeak", "toucannon", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaaffy", "ampharos", "azurill", 
 "marill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow", 
 "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew", 
 "chikorita", "bayleef", "meganium", "cyndaquil", "quilava", "typhlosion", "totodile", "croconaw", "feraligatr", "sentret", "furret", "hoothoot", "noctowl", "ledyba",
  "ledian", "spinarak", "ariados", "crobat", "chinchou", "lanturn", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaaffy", "ampharos",
   "azurill", "marill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow",
    "slowking", "unown", "wobbuffet", "girafarig", "pineco", "forretress", "dunsparce", "gligar", "steelix", "snubbull", "granbull", "qwilfish", "scizor", "shuckle", "heracross", 
    "sneasel", "teddiursa", "ursaring", "slugma", "magcargo", "swinub", "piloswine", "corsola", "remoraid", "octillery", "delibird", "mantine", "skarmory", "houndour", "houndoom", 
    "phanpy", "donphan", "stantler", "smeargle", "tyrogue", "hitmontop", "smoochum", "elekid", "magby", "miltank","slowking", "unown", "wobbuffet" ];
function preload() {
   for(let i= 0; i < pokemons.length; i++){
   pokemon = loadJSON("https://pokeapi.co/api/v2/pokemon/" + pokemons[i],function (pokemontemp){ 
      images[i] = loadImage(pokemontemp.sprites.front_default);
      particles.push(new pParticles(images[i], random(800), random(800)));

   })
}
   

}


function setup() {
   
   createCanvas(800, 800);
   background(50);
   print(images);
   image(images[0], width/2, height/2, 100, 100);


}


function draw() {
   background(50);
 for(let i = 0; i< particles.length; i++){
   particles[i].draw();
   particles[i].update();
 }

 for(let i =0; i < 50; i++){
   grassblades[i].drawgrass();
   grassblades[i].updategrass();
 }

 
}



class grassy {
   constructor(){
      this.grass = grass;
      this.roff = roff;
      this.rwave = rwave;
      this.size = size;
      this.seg = seg;
      this.index = index;
      this.population = 150; 
   }

   drawgrass(){
      for( let x = 0; x < width; x+= width/population){
         this.index +=1;
         this.grass = x;
         this.roff = ((this.index * 0.065) + 0.015);
         this.rwave = 0;
         this.size = random(35, 55);
         this.seg = 0.85;

      }

   }

   updategrass(){
      for(let i = 0; i < this.index; i++){
         let len = this.size;
         push();
         translate(this.grass, height * 0.65);
         this.blade(len, i);
         pop();
      }
   }


}


class pParticles {
   constructor(pokemonImage, x, y){
      this.x = x;
      this.y = y;
      this.pokemonImage = pokemonImage;

      this.homeX = x;
      this.homeY = y;
   }

   draw(){
      image(this.pokemonImage, this.x, this.y);
   }

   update() {
    
      // calculates the distance between particles and the mouse
      let mouseD = dist(this.x, this.y, mouseX, mouseY);
      let mouseA = atan2(this.y - mouseY, this.x - mouseX);
      
      // calculates the distance between the particle and where its home value is
      let homeD = dist(this.x, this.y, this.homeX, this.homeY);
      let homeA = atan2(this.homeY - this.y, this.homeX - this.x);
      
      //onstrains the amount the particles disperse as well as the velocity and force 
      let mouseF = constrain(map(mouseD, 0, 70, 10, 0), 0, 20);
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
}