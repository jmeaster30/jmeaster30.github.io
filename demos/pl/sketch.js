var cvs_width = 1000;
var cvs_height = 800;
var half_width = cvs_width / 2;
var half_height = cvs_height / 2;

var particles = [];
var particle_num = 120; //the number of particles to add to the simulation

var particle_radius = 10; //the radius of the particle
var friction = 0.95; //the world friction

var max_force = 1; //the maximum amount of force between two particles
var repel_force = 4; //the amount of repeling force

var min_type = 3; //the minimum number of types
var max_type = 15; //the maximum number of types
var particle_types;
var rules = []; //2d array that is of size particle_types^2

//i recommend these are in ascending order but i'm also not your mom
var min_min = 3;  //minimum minimum distance in multiple of particle_radius
var max_min = 7;  //maximum minimum distance
var min_max = 8;  //minimum maximum distance
var max_max = 15; //maximum maximum distance

function getRule(type_1, type_2){
  return rules[type_1 * particle_types + type_2];
}

function setRule(type_1, type_2, rule){
  rules[type_1 * particle_types + type_2] = rule;
}

class Rule {
  constructor(min_dist, max_dist, force){
    this.min_dist = min_dist;
    this.max_dist = max_dist;
    this.force = force;
  }
}

class Particle {
  constructor(type){
    this.type = type;
    this.x = random(0, cvs_width);
    this.y = random(0, cvs_height);
    this.fx = 0; //x-component of force (Note: force is equal to acceleration if mass is 1kg)
    this.fy = 0; //y-component of force
    this.vx = random(-2, 2); //x-component of velocity
    this.vy = random(-2, 2); //y-component of velocity
  }

  update(){
    this.vx += this.fx;
    this.vy += this.fy;
    this.vx *= friction;
    this.vy *= friction;
    this.x += this.vx;
    this.y += this.vy;
    
    if(this.x < -particle_radius){
      this.x = cvs_width + particle_radius + this.x;
    }
    else if(this.x > cvs_width + particle_radius){
      this.x = this.x - (cvs_width + particle_radius);
    }

    if(this.y < -particle_radius){
      this.y = cvs_height + particle_radius + this.y;
    }
    else if(this.y > cvs_height + particle_radius){
      this.y = this.y - (cvs_height + particle_radius);
    }
    this.fx = 0;
    this.fy = 0;
  }

  draw(){
    fill(this.type * 100 / particle_types, 100, 100);
    circle(this.x, this.y, particle_radius);
  }

  applyForce(fx, fy)
  {
    this.fx += fx;
    this.fy += fy;
  }
}

function generate()
{
  particles = [];
  particle_types = floor(random(min_type, max_type));

  for(var a = 0; a < particle_types; a++){
    for(var b = 0; b < particle_types; b++){
      var min_dist = random(particle_radius * min_min, particle_radius * max_min);
      var max_dist = random(particle_radius * min_max, particle_radius * max_max);
      var force = random(-max_force, max_force);
      setRule(a, b, new Rule(min_dist, max_dist, force));
    }
  }

  for(var i = 0; i < particle_num; i++){
    particles.push(new Particle(floor(random(0, particle_types))));
  }
}

function setup() {
  var canvas = createCanvas(cvs_width, cvs_height, WEBGL);
  canvas.parent("cvs-container");
  colorMode(HSB, 100);

  generate();
}

function keyReleased()
{
  if(key == ' '){
    generate();
  }
}
  
function draw() {
  background(22);
  translate(-width / 2, -height / 2); //webgl makes the origin the center of the screen but we want it at the top left corner
  
  particles.forEach((p, idx)=>{
    for(var i = 0; i < particles.length; i++)
    {
      if(i == idx) continue; //skip the particle if it is itself
      stroke(p.type * 100 / particle_types, 100, 100);
      var q = particles[i];
      
      //to account for the screen wrap take the regular screen x distance mod half_width (for x) and 
      //then flip the sign if the original x distance was more than half_width
      var dx = p.x - q.x;
      var dy = p.y - q.y;
      var tdx = (dx % half_width) * ((dx > half_width) ? -1 : 1);
      var tdy = (dy % half_height) * ((dy > half_height) ? -1 : 1);
      var distsq = tdx * tdx + tdy * tdy; 
      
      //get a normalized vector for the direction
      var v = createVector(tdx, tdy); //tbh i should use vectors everywhere but whatev
      v.normalize();
      var ndx = v.x;
      var ndy = v.y;
      
      //get the rule for these particles
      var rule = getRule(p.type, q.type);
      var min_distsq = rule.min_dist * rule.min_dist;
      var max_distsq = rule.max_dist * rule.max_dist;

      //calculate the force
      var fx = 0;
      var fy = 0;
      if(distsq >= min_distsq && distsq <= max_distsq){
        var a = (max_distsq - min_distsq) / 2;
        force_mag = -(rule.force / a) * abs(distsq - a - min_distsq) + rule.force;
        fx = ndx * force_mag;
        fy = ndy * force_mag;
      }
      else if(distsq < min_distsq){
        fx = ndx * repel_force / distsq;
        fy = ndy * repel_force / distsq;
      }

      //apply the force
      p.applyForce(fx, fy);
    }
  });

  noStroke();
  particles.forEach((p, idx)=>{
    p.update();
    p.draw();
  });
}