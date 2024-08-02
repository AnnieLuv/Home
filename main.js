function menu_click(){
 const myelemt = document.getElementById("menu");
 let y = 100;
 let x = 50;
 for(const child of myelemt.children){
   console.log(child);
     child.setAttribute('style',
      `color: blue; position:absolute; transition-duration: 2s; color: blue;  transform: translate(${ y }px, ${ x }px) rotate(360deg); opacity: 1;`);
      x+=50;  y+=50;
 }
}

function pythagorean(a, b){
  //use the pythagorean theorem to get our hypotenuse
  //so we can use the new bar width to form our cross since we are
  //rotating the bars diagonally
  // a(a) + b(b) = c(c) parseInt removes any nondecimal characters and returns an integar
  a = parseInt(a, 10); 
  b = parseInt(b, 10);
  a = a * a;
  b = b * b;
  //get the hypotenuse
  let c = a + b;
  return Math.sqrt(c);
}

function show_sidebar(root){
  let elm_sidebar = root.querySelector(".side.bar");
  let sidebar_width =  getComputedStyle(root).getPropertyValue('--sidebar-width');
  elm_sidebar.style.setProperty('width', sidebar_width);
  elm_sidebar.style.setProperty('opacity', '1');
  elm_sidebar.style.setProperty('left', '0px');
}
function hide_sidebar(root){
  let elm_sidebar = root.querySelector(".side.bar");
  console.log(elm_sidebar);
  elm_sidebar.style.setProperty('width', '0px');
  elm_sidebar.style.setProperty('opacity', '0');
  elm_sidebar.style.setProperty('left', '-250px');
}

function isclicked(){
  //functions in javascript are also objects. so we can create our
  //own variables to persist between calls
  isclicked.flag = !isclicked.flag;
  let root = document.documentElement;
  //returns an array-like collection
  let layers = document.querySelector(".hamburger").children;

  if(isclicked.flag) {
    // get our css variables from the :root
    let hamb_width =  getComputedStyle(root).getPropertyValue('--hamb-width');
    let hamb_height =  getComputedStyle(root).getPropertyValue('--hamb-height');
    isclicked.width = hamb_width;
    //store the original hamburger width before modifying it cuz we will need it later
    const x_width = pythagorean(hamb_width, hamb_height);

    root.style.setProperty('--hamb-width', String(x_width) + 'px');   
    //make the middle layer disappear
    layers[1].style.opacity = '0';
    layers[1].style.width = '0';
    //offset the bars based on the thickness of the bar itself, bc when we rotate it
    //the thickness isnt accounted for and makes the X look uneven
    layers[0].style.setProperty('transform', 'translateY(-2.5px) rotate(45deg)');
    layers[2].style.setProperty('transform', 'translateY(2.5px) rotate(-45deg)');

     show_sidebar(root);
  }
  else{
    //reset the width to its original
    layers[0].style.setProperty('transform', 'none');
    layers[2].style.setProperty('transform', 'none');
    root.style.setProperty('--hamb-width', isclicked.width);
    layers[1].style.opacity = '1';
    layers[1].style.width = 'var(--hamb-width)';

    hide_sidebar(root);
  }   

}