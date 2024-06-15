/* always first select relevant elements */
const addbtn = document.querySelector(".add-btn")
const modalcont = document.querySelector(".modal-cont")
const maincont = document.querySelector(".main")
const textarea = document.querySelector(".textarea-cont")
const allcolors = document.querySelectorAll(".size")
let ticketcont = document.querySelectorAll('.ticket-cont')
let selectedticket = ''
const removebtn = document.querySelector('.remove-btn')
const allprio = document.querySelectorAll(".prio")
let ticketlock = document.querySelector('.ticket-lock')
let ticketid = 1001
const savebtn = document.querySelector('.save')
let prioselectedcolor = ''
let selectedcolor = 'black'
let popupflag = false
let ticketsarr = []
addbtn.addEventListener('click',( ) => {
    /* popupflag = !popupflag
    above line is used to swap bw true and false */
    if (!popupflag){
        modalcont.style.display = "flex"
        popupflag = true
    } else{
        modalcont.style.display = "none"
        textarea.value = ''
        popupflag = false
    }
})
if(localStorage.getItem('ticketsarr')){
    // console.log('ok')
    ticketsarr = JSON.parse(localStorage.getItem('ticketsarr'))
    for(let i = 0; i<ticketsarr.length; i++){
        ticketid = ticketsarr[i].ticketid
        createticket(ticketsarr[i].ticketcolor, ticketsarr[i].textarea,ticketsarr[i].ticketid)
        
    }
}

/* creating a functions for adding task */
function createticket(selectedcolor, textarea, ticketid){
    
    const newdiv = document.createElement("div")
    newdiv.setAttribute("class", "ticket-cont")
    /* now ticket-cont div is created, to add all child divs
    no need to follow same process, we can use innerhtml */
    // console.log(selectedcolor)
    newdiv.innerHTML = `
            <div class = 'ticket-color ${selectedcolor} 'style = 'color: white'>locked</div>
            <div class = 'ticket-id'>${ticketid}</div>
            <textarea class="task-area" readOnly = 'true'> ${textarea}</textarea>
            <div class="ticket-lock">
                <i class = 'fa-solid fa-lock'></i>
            </div>
    `
    /* now new div is created but not added to main container
    append child is used to add child divs if we know the parent container */
    
    maincont.appendChild(newdiv)
    
    newdiv.addEventListener('click',() =>{
        ticketcont = document.querySelectorAll('.ticket-cont')
        for(let i = 0; i < ticketcont.length; i++){
            ticketcont[i].classList.remove('active')
        }
        newdiv.classList.add('active')
        selectedticket = newdiv
        
    })
        newdiv.children[3].children[0].addEventListener('click', ()=>{
        if(newdiv.children[3].children[0].classList.contains('fa-lock') ){
            newdiv.children[3].children[0].classList.remove('fa-lock')
            newdiv.children[3].children[0].classList.add('fa-unlock')
            // newdiv.children[0].setAttribute('innerHTML','locked')
            // newdiv.children[0].removeAttribute('innerHTML')
            newdiv.children[0].innerHTML = 'unlocked'
            newdiv.children[2].removeAttribute('readOnly')
            // newdiv.children[2].innerHTML = textarea.innerHTML
        }else{
            newdiv.children[3].children[0].classList.remove('fa-unlock')
            newdiv.children[3].children[0].classList.add('fa-lock')
            
            newdiv.children[0].innerHTML = 'locked'
            newdiv.children[2].setAttribute('readOnly', 'true')
        }
    }
        )


}

/* task has to be created, when we click on shift key in modal container only */
/* keydown and keyup are used if we want to capture
key presses in keyborad, in callback function attribute
contains all the actions performed like which button is pressed*/
modalcont.addEventListener('keydown',(e) => {
    if(e.key == 'Shift'){  
        
        createticket(selectedcolor, textarea.value, ++ticketid)
        modalcont.style.display = 'none'
        popupflag = !popupflag
        textarea.value = ''
        
        
    }
    
})
// adding event listner for all color boxes

for(let i = 0; i < allcolors.length; i++){
    const currentele = allcolors[i]
    currentele.addEventListener('click', ()=>{
        /* remove active class from all boxes */
        for(let j = 0; j <allcolors.length; j++){
            const currentelej = allcolors[j]
            if(currentelej.classList.contains('active')){
                currentelej.classList.remove('active')
            }
        }
        currentele.classList.add('active')
        /* passing selected color to new ticket */
        selectedcolor = currentele.classList[1];
    })
}
for(let i = 0; i<ticketcont.length;i++){
    
    ticketcont[i].addEventListener('click',() =>{
        ticketcont = document.querySelectorAll('.ticket-cont')
        for(let j = 0; j < ticketcont.length;j++){
            ticketcont[j].classList.remove('active')
        }
        ticketcont[i].classList.add('active')
        selectedticket = ticketcont[i]
    })
}
removebtn.addEventListener('click',()=>{
    // maincont.removeChild(selectedticket)
    selectedticket.remove()
    
})


for(let i = 0; i<allprio.length; i++){
    allprio[i].addEventListener('click',()=>{
        prioselectedcolor = allprio[i].classList[2]
        ticketcont = document.querySelectorAll('.ticket-cont')
        for(let j = 0; j <ticketcont.length; j++){
            
            ticketcont[j].style.display = 'none'
            // for(let k =0; k <ticketsArr.length; k++){
            
            //     if(ticketsArr[i].ticketColor == selectedcolor){
            //         const selectedticketdetails = document.getElementsByClassName()
            //     }
            // }
            if(ticketcont[j].children[0].classList[1] == prioselectedcolor){
                ticketcont[j].style.display = 'block'
            }
        }
        
    }
    
)    
allprio[i].addEventListener('dblclick',()=>{
    for(let j = 0; j <ticketcont.length; j++){
        ticketcont[j].style.display = 'block'
    }
})
}
savebtn.addEventListener('click',()=>{
    ticketsarr = []
    ticketcont = document.querySelectorAll('.ticket-cont')
    for(let i = 0;i<ticketcont.length;i++){
        ticketsarr.push({
            'ticketcolor' : ticketcont[i].children[0].classList[1],
            'ticketid' : ticketcont[i].children[1].innerHTML,
            'textarea' : ticketcont[i].children[2].value
        
        })
       
    }
    localStorage.removeItem('ticketsarr')
    localStorage.setItem('ticketsarr', JSON.stringify(ticketsarr))
})












