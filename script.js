
// hide banner
const getStartBtn= ()=>{
    const name= document.getElementById("name").value
    const id= document.getElementById("id").value
    
   if(id==12345){
    const mainBanner= document.getElementById("mainBanner").classList.add("hidden")
   }
}

// show Vocabularies btn
const loadVocabularies= ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=> res.json())
    .then(data=> displayVocabulariesBtn(data.data))
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
    console.log(data)
    if(data.length > 0){
        data.forEach(item=>{
            const div= document.createElement("div")
            div.innerHTML=`
      <div class="card-body card bg-base-100 ">
        <h2 class="card-title ">${item.word}</h2>
        <p class="" >Meaning /Pronounciation</p>
        <h2 class="card-title ">${item.meaning} / ${item.pronunciation}</h2>
        
      </div>`
        
            
            VocabulariescardShow.append(div)
        })
    }
    else{
        const div= document.createElement("div")
            div.innerHTML=`
      <div class="card-body card bg-base-100">
        <h2 class="card-title">No data</h2>
        
        
      </div>`
      VocabulariescardShow.append(div)
    

    }
    
}


loadVocabularies()