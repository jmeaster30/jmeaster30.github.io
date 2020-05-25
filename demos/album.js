class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Quad{
  constructor(top_left, top_right, bottom_left, bottom_right){
    this.top_left = top_left;
    this.top_right = top_right;
    this.bottom_left = bottom_left;
    this.bottom_right = bottom_right;
  }
}

class Album{
  constructor(bounding_quad, image)
  {
    this.b_quad = bounding_quad;
    if(image){
      this.image = image;
    } else {
      this.backup = createImage(2, 2);
      this.backup.set(0, 0, color(255, 0, 0));
      this.backup.set(1, 1, color(255, 0, 0));
      this.backup.set(0, 1, color(0, 0, 255));
      this.backup.set(1, 0, color(0, 0, 255));
    }
  }
  
  setImage(image)
  {
    this.image = image;
  }
  
  draw(scale)
  {
    noStroke();
    if(this.image){
      texture(this.image);
    }else{
      texture(this.backup);
    }
    quad(this.b_quad.top_left.x * scale, this.b_quad.top_left.y * scale,
         this.b_quad.top_right.x * scale, this.b_quad.top_right.y * scale, 
         this.b_quad.bottom_right.x * scale, this.b_quad.bottom_right.y * scale, 
         this.b_quad.bottom_left.x * scale, this.b_quad.bottom_left.y * scale);
  }
}
