
const sentence = "Welcome to my Portfolio";
const project_sentense =" Projects comming soon"
const outputElement = document.getElementById("output");
const output_p = document.getElementById("output_p");
let index = 0;

function writeLetterByLetter() {
  if (index < sentence.length) {
    outputElement.textContent += sentence.charAt(index);
    output_p.textContent += project_sentense.charAt(index);
    index++;
    setTimeout(writeLetterByLetter, 130);
  }
 else {
    setTimeout(() => {
        outputElement.textContent = "";
        output_p.textContent = "";
      index = 0;
      writeLetterByLetter();
    }, 2000); 
}}

writeLetterByLetter();

let about = document.getElementById('about')
let description = document.getElementById('description')
about.addEventListener('click' ,()=>{
    description.scrollIntoView({
        block : "end" , 
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
document.getElementById('skills').addEventListener('click' ,hover )
let i = 1
function hover(){
    if(i <= 5)
    {
        card_position(i)
        document.querySelector(`.card${i}`).classList.add('popup')
        if (i >1 ) {
        document.querySelector(`.card${i-1}`).classList.remove('popup')
        }
        if(i==1){
        document.querySelector(`.card5`).classList.remove('popup')
            
        }
        i++
    }else{
        i = 1
        hover()
    }

}
// END  (cards Hover)



function card_position(c){
    document.querySelector(`.card${c}`).scrollIntoView({
      
        block : "center" , behavior : "smooth"
            })
   
    
  
}

document.getElementById('navicon').addEventListener('click' ,()=>{
    document.querySelector('.navlinks').classList.toggle('shown')
    let icon = document.getElementById('navicon')

    if(icon.classList.contains('fa-xmark')){
        icon.classList.remove('fa-xmark')
        icon.classList.add('fa-bars-staggered')
    }else{
        icon.classList.add('fa-xmark')
        icon.classList.remove('fa-bars-staggered')
    }

})

document.getElementById('up').addEventListener("click" , ()=>{window.scrollTo({ top : 0 , behavior : "smooth"}) ; console.log("rrr");} ) 
document.querySelectorAll('.link').forEach((element)=>{
    element.addEventListener('click' , ()=>{
       
        document.querySelector('.navlinks').classList.remove('shown')
        icon.classList.remove('fa-xmark')
        icon.classList.add('fa-bars-staggered')


    })
})
