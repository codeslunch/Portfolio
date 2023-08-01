/** Declare Important Variables ( Some variables cannot be declared here ) */
let question = document.getElementById("question")
let answers = document.getElementById("answers")
const time = document.getElementById("timer")
const next = document.getElementById("btn-next")
const previous = document.getElementById("btn-previous")
const submit = document.getElementById("submitExam")

/** Check if Exam has ended  */
let EXAM_HAS_ENDED = false

/** Fetch the Exam from the Database in JSON Format */
const promise = new Promise((resolve, reject) => {
      fetch("./json/exams.json")
      .then((result)=> {
        resolve(result.json())
      })
      .then((exam) => {
        resolve(exam)
      })
      .catch((error)=> {
        reject(error)
      })
})


/** Use the Database results to generate the questions, answers anc correct answer */
promise 
.then((myExam)=> {
 
   /* Answers Storage  */
    const yourAnswers = []

    /*Default Index */
    let index = 0

    /** Create Exam Defaults  */
    const loadDefault = function () {

      /** Check if Exam has Ended  */
    if(EXAM_HAS_ENDED){
      console.log("Exam has Ended")
      window.location.href = "./cascade/index.css"
    }
      if(!EXAM_HAS_ENDED){


        /** Show the Question if Exam has not ended */
        question.textContent = myExam[index].question

      /**  Create Exam Options  */
      const loadOptions = function () {
        let i = 0
        let options = myExam[index].options
        const form = document.createElement("form")
        form.method = "post"

        /** Loop Through Given Options  */
        while(i < options.length){

          /** Create a label element */
          const label = document.createElement("label")

          /** Create an input element */
          const input = document.createElement("input")

          /** Give the input a name, type and a class */
          input.setAttribute("name", "question")
          input.setAttribute("type", "radio")
          input.setAttribute("class", "question"+index)

          /** Create a Text Node  */
          const textNode = document.createTextNode(options[i])

          /** Append the input to the Label  */
          label.appendChild(input)

          /** Append the text node to the label  */
          label.appendChild(textNode)

          /** Append the label to the form */
          form.append(label)

          /** Append the Exam Box to the Options  */
          answers.append(form)

          i++
          
        }
        
      }

      loadOptions()

      /** Get Users Input */
     const alloWUserSelection = function () {
       const questionIndex = "question" + index
      const userSelection = document.getElementsByClassName(questionIndex)

      /** Loop through the possible user selections */
      for(let x = 0; x < userSelection.length; x++){
        userSelection[x].onchange = () => {
          /** Select User Chosen Option */
          userSelection[x].checked = true
            const updateUserAnswers = () => {
              /**Add User Selections to the Answers Array */
              yourAnswers[index] = userSelection[x].parentElement.textContent
             
            }

            updateUserAnswers()
        }
      }
     }
   
     alloWUserSelection()
   
      }
    }

    /* Load Exam Defaults  */
    loadDefault()
   
      /** Allow the Previous Button Feature */
    previous.addEventListener("click", function(){

     if(!EXAM_HAS_ENDED && index > 0) {
       /** Decrement the Current Index  */
      index-=1

      /** Clear the Answers  */
      answers.innerHTML = ""

      /** Load the Current Question and Answers */
      loadDefault()
     }
    })

    /** Allow the Next Button Feature */
    next.addEventListener("click", function(){


      /**  */
     if(!EXAM_HAS_ENDED && index < myExam.length-1) {
       /** Increment the Current Index  */
      index+=1

      /** Clear the Options  */
      answers.innerHTML = ""

      /** Load the Current Question and Answers */
      loadDefault()
     }
    })
 
    /* Timer */
 const timer = () => {
  let hrString = ""
  let minString = ""
  let secString = ""

  /** Set the Timer Limit in Hrs, Minutes and Seconds  */
  let hr = 0; 
  let mins = 1; 
  let secs = 00;

  /** Initiate The Timer Feature */
  const timerFeature = setInterval(function() {
    secs--
    if(secs < 0){
      secs= 59
    }
    if(secs == 59 && mins > 0){
      mins--
    }
    if(mins == 0 && hr > 0){
      mins = 59
      hr--
    }
    /** Check if Timer is UP */
    if(hr == 0 && mins == 0 && secs == 0){
      clearInterval(timerFeature)
      EXAM_HAS_ENDED = true
    }
    
    if(secs < 10) {
      secString = "0" + secs
    }
    else {
      secString = secs
    }

     if(mins < 10) {
      minString = "0" + mins
    }
    else {
      minString = mins
    }

     if(hr < 10) {
     hrString = "0" + hr
    }
    else {
     hrString = hr
    }
    /** Show the current time in the Browser */
    time.textContent = hrString + ":" + minString + ":" + secString

  }, 1000)
  }

  timer()


  


})
.catch((anyError)=> {
  console.log("Error : " + anyError)
})


 