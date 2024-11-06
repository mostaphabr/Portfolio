
const sentence = "Welcome to my Portfolio";
const outputElement = document.getElementById("output");
let index = 0;

function writeLetterByLetter() {
  if (index < sentence.length) {
    outputElement.textContent += sentence.charAt(index);
    index++;
    setTimeout(writeLetterByLetter, 130);
  }
 else {
    setTimeout(() => {
        outputElement.textContent = "";
       
      index = 0;
      writeLetterByLetter();
    }, 2000); 
}}

writeLetterByLetter();

let about = document.getElementById('about')
let Description = document.getElementById('Description')
about.addEventListener('click' ,()=>{
    Description.scrollIntoView({
        block : "center" , 
        behavior :"smooth"
       })     
  
  
  
})

function popup(para){ 
    let target =  document.getElementById(`${para}`)
    if (target) {
        document.getElementById(`${para}`).classList.add('popup')
    }
    else{
        document.querySelector(`.${para}`).classList.add('popup')

    }
    
}

function popupend(para){
    let target =  document.getElementById(`${para}`)
    if (target) {
        document.getElementById(`${para}`).classList.remove('popup')
    }
    else{
        document.querySelector(`.${para}`).classList.remove('popup')

    }
    }    

// (cards Hover)
document.getElementById('Projects').addEventListener('click' ,hover )
let i = 1
function hover(){
    if(i <= 4)
    {
        card_position(i)
        document.querySelector(`.card${i}`).classList.add('popup')
        if (i >1 ) {
        document.querySelector(`.card${i-1}`).classList.remove('popup')
        }
        if(i==1){
        document.querySelector(`.card4`).classList.remove('popup')
            
        }
        i++
    }else{
        i = 1
        hover()
    }

}
let skillslink =document.getElementById('skillslink')
skillslink.addEventListener('click' , ()=>{document.getElementById('skills').scrollIntoView({block :'center' , behavior :'smooth'})} )

// END  (cards Hover)

colors = ['gold' , 'aqua' ,  , 'orange' , 'rgb(00, 173, 235)' ]
let c = 0
document.querySelectorAll('.Title').forEach(
    element=>
    {
         ;element.style.color = colors[i] ; i++
    }) 



function card_position(c){
    document.querySelector(`.card${c}`).scrollIntoView({
      
        block : "center" , behavior : "smooth"
            })
   
    
  
}
// Responsive NAV
let icon = document.getElementById('navicon')
document.getElementById('navicon').addEventListener('click' ,()=>{
    document.querySelector('.navlinks').classList.toggle('shown')
   

    if(icon.classList.contains('fa-xmark')){
        icon.classList.remove('fa-xmark')
        icon.classList.add('fa-bars-staggered')
    }else{
        icon.classList.add('fa-xmark')
        icon.classList.remove('fa-bars-staggered')
    }

})

document.getElementById('up').addEventListener("click" , ()=>{window.scrollTo({ top : 0 , behavior : "smooth"})} ); 
document.querySelectorAll('.link').forEach((element)=>{
    element.addEventListener('click' , ()=>{
       
        document.querySelector('.navlinks').classList.remove('shown')
        icon.classList.remove('fa-xmark')
        icon.classList.add('fa-bars-staggered')




    })
})


// Prevent triggering the modal

document.querySelectorAll(".myLink").forEach(element => {
   element.addEventListener("click", function(event) {
        event.stopPropagation();  
      });
});


// Prevent triggering the modal



function stars() {
    let e = document.createElement("div");
    let size = Math.random() * 12;
    let duration = Math.random() * 3;
  
    e.setAttribute("class", "star");
    document.body.appendChild(e);
    
    if (screen.width >= 1000) {
        e.style.left = Math.random() * (innerWidth-100) + "px";
 
    }else{
        e.style.left = Math.random() * (innerWidth - 40 ) + 40  + "px";

    }
    e.style.fontSize = 12 + size + "px";
    e.style.animationDuration = 4 + duration + "s";
  
    setTimeout(function () {
      document.body.removeChild(e);
    }, 5000);
  }
  
  setInterval(function () {
    stars();
  }, 130);
  
