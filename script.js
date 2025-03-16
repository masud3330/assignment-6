
// hide banner
const getStartBtn= ()=>{
    const name= document.getElementById("name").value
    const id= document.getElementById("id").value
   
    
   if(id==123456){
    const mainBanner= document.getElementById("mainBanner").classList.add("hidden")
    // pore uncomment korte hobe
    const faq= document.getElementById("faq").classList.remove("hidden")
    const navbar= document.getElementById("navbar").classList.remove("hidden")
    const VocabulariesSection= document.getElementById("VocabulariesSection").classList.remove("hidden")
    const beforeTheLessonSelectMsg= document.getElementById("beforeTheLessonSelectMsg").classList.remove("hidden")

   }
   else{
    Swal.fire({
        title: "Give Code 123456",
        icon: "error",
        draggable: true
      });
   }
}

// show Vocabularies btn
const loadVocabularies= ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=> res.json())
    .then(data=> {
        if(data.data){
            displayVocabulariesBtn(data.data)
        }
        
    })
    .catch(err => console.log(err))
}
const displayVocabulariesBtn =(levels)=>{
// console.log(levels)
levels.forEach(item => {
    const button= document.createElement("button")
    button.classList= "btn btn-primary btn-outline"
  
    button.innerHTML= `<p>lesson ${item.level_no}</p>`
    button.onclick= ()=>loadLevelWiseData(item.level_no)
    // show btn
    const lavel= document.getElementById("VocabulariesBtnShow").append(button)
    
});
}

const loadLevelWiseData=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res=> res.json())
    .then(data=> displayLevelWiseData(data.data))
    .catch(err=> console.log(err))
}

const displayLevelWiseData =(data)=>{
    const VocabulariescardShow= document.getElementById("VocabulariescardShow")
    
    VocabulariescardShow.innerHTML=""
    // console.log(data)
     if(data.length > 0){
        data.forEach(item=>{
            
            const div= document.createElement("div")
            div.innerHTML=`
      <div class="card-body card bg-base-100 shadow-md">
        <h2 class="card-title ">${item.word}</h2>
        <p class="" >Meaning /Pronounciation</p>
        <h2 class="text-semibold ">${item.meaning} / ${item.pronunciation}</h2>
        <div class="flex justify-between">
        <a class=" btn" onclick="wordInfo('${item.id}')"><i class="fa-solid fa-circle-info"></i></a>
        <a class=" btn"><i class="fa-solid fa-volume-high"></i></a>
        </div>
        
      </div>`
        
            
            VocabulariescardShow.append(div)
        })
    }
  
    else{
        const div= document.createElement("div")
            div.innerHTML=`
      <div class="card-body card bg-base-100">
      <img src="/assets/alert-error.png" class="w-20">
      <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="card-title">নেক্সট Lesson এ যান</h2>
        
        
      </div>`
      VocabulariescardShow.append(div)
    

    }
    
}
const wordInfo= (id)=>{
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res=> res.json())
    .then(data=>{
        console.log(data.data)
    // {word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার', level: 1, sentence: 'The kids were eager to open their gifts.', …}
    const word= data.data   
    if(data.data){
        Swal.fire({
            title: `${word.word}`,
            
            html:`
            <p>meaning</p>
    <p>${word.meaning}</p>
    <p>Example</p>
    <p>${word.sentence }</p>
    <p>synonyms</p>
  <button>
  ${(word.synonyms) }.
  </button>
            `,
            
            
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            
          })
       }
    })
    .catch(err=>{
        console.log(err)
    })
}


loadVocabularies()