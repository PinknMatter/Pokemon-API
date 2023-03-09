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
function preload() {
   for (let i = 0; i < pokemons.length; i++) {
      pokemon = loadJSON("https://pokeapi.co/api/v2/pokemon/" + pokemons[i], function (pokemontemp) {
         images[i] = loadImage(pokemontemp.sprites.front_default);
         particles.push(new pParticles(images[i], random(800), random(800)));

      })
   }


}


function setup() {

   createCanvas(800, 800);

   print(images);
   image(images[0], width / 2, height / 2, 100, 100);
   for (let i = 0; i < height / 7; i++) {
      for (let y = 0; y < width / 7; y++) {
         grass.push(new Grass());
      }

   }


}


function draw() {
   background(0, 150, 0);
   for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
      // particles[i].update();
   }
   for (let i = 0; i < grass.length; i++) {
      grass[i].move();
      grass[i].display();
   }




}
class Grass {
   constructor() {
      this.start = createVector(random(width), random(height));
      this.len = random(10, 30);
      this.curvature = random(0.1, 0.5);
      this.angle = random(-PI / 4, PI / 4);
      this.hovered = false;
      this.initialPos = this.start.copy();
      this.hitboxRadius = this.len * 2;
      this.color = random(100, 200);
   }

   move() {
      if (this.hovered) {
         let direction = p5.Vector.sub(this.start, createVector(mouseX, mouseY)).normalize();
         let distance = p5.Vector.dist(this.start, createVector(mouseX, mouseY));
         let force = map(distance, 0, 100, 0, 20);
         let movement = direction.mult(force * 5);
         this.start.add(movement);
         this.angle += random(-0.01, 0.01);
         if (this.start.x > width + this.len) {
            this.start.x = -this.len;
         }
         if (this.start.x < -this.len) {
            this.start.x = width + this.len;
         }
         if (this.start.y < -this.len) {
            this.start.y = height + this.len;
            this.angle = random(-PI / 4, PI / 4);
         }
      } else {
         let returnSpeed = 0.1;
         let dx = this.initialPos.x - this.start.x;
         let dy = this.initialPos.y - this.start.y;
         this.start.x += dx * returnSpeed;
         this.start.y += dy * returnSpeed;
      }
   }

   display() {
      push();
      translate(this.start.x, this.start.y);
      rotate(this.angle + HALF_PI);
      noStroke();

      fill(0, this.color, 0);
      beginShape();
      vertex(0, 0);
      quadraticVertex(this.len / 2, -this.len / 2, this.len, 0);
      quadraticVertex(this.len / 2, this.len / 2, 0, 0);
      endShape();
      pop();
   }

   checkHovered() {
      let mousePos = createVector(mouseX, mouseY);
      let distToMouse = p5.Vector.dist(this.start, mousePos);
      if (distToMouse < this.hitboxRadius) {
         this.hovered = true;
      } else {
         this.hovered = false;
      }
   }
}

function mouseMoved() {
   for (let i = 0; i < grass.length; i++) {
      grass[i].checkHovered();
   }
}






class pParticles {
   constructor(pokemonImage, x, y) {
      this.x = x;
      this.y = y;
      this.pokemonImage = pokemonImage;

      this.homeX = x;
      this.homeY = y;
   }

   draw() {
      image(this.pokemonImage, this.x, this.y);
   }

   // update() {

   //    // calculates the distance between particles and the mouse
   //    let mouseD = dist(this.x, this.y, mouseX, mouseY);
   //    let mouseA = atan2(this.y - mouseY, this.x - mouseX);

   //    // calculates the distance between the particle and where its home value is
   //    let homeD = dist(this.x, this.y, this.homeX, this.homeY);
   //    let homeA = atan2(this.homeY - this.y, this.homeX - this.x);

   //    //onstrains the amount the particles disperse as well as the velocity and force 
   //    let mouseF = constrain(map(mouseD, 0, 70, 10, 0), 0, 20);
   //    let homeF = map(homeD, 0, 100, 0, 4);

   //    //velocity of the particles
   //    let vx = cos(mouseA) * mouseF;
   //    vx += cos(homeA) * homeF;

   //    let vy = sin(mouseA) * mouseF;
   //    vy += sin(homeA) * homeF;

   //    //add the particles position to the velocity
   //    this.x += vx;
   //    this.y += vy;
   // }
}