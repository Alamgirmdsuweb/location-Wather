
const wrapper= document.querySelector(".wrapper"),
inputPart= wrapper.querySelector(".input-part"),
infoTxt= inputPart.querySelector(".info-text"),
inputField= inputPart.querySelector("input"),
locationBtn=inputPart.querySelector("button")
let api;


inputField.addEventListener('keyup',e =>{
    if(e.key =='Enter' && inputField.value !=""){
        // console.log('hello')
        requestApi(inputField.value)

    }
})

// locationBtn

locationBtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError)

    }else{
        alert('Your browser does not support geolocation api')
    }
})
// // onSucess

// // latitude,longitude(Api)

function onSuccess(position){
    console.log(position)
    const{latitude,longitude}= position.coords
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=c0e8e60b57fc1c1ca52f1896e09d078b`;
    fetchData()
}


// error 
function onError(error){
    infoTxt.innerText= error.message;
    infoTxt.classList.add("error")
   
}




function requestApi(city){
  console.log(city)
  api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c0e8e60b57fc1c1ca52f1896e09d078b`;

 fetchData()

 
}
function fetchData(){
    infoTxt.innerText= "Getting weather details...";
    infoTxt.classList.add("pending")
    fetch(api).then(response=>response.json()).then(result => weatherDetailes(result))
    
}

function weatherDetailes(info){
    infoTxt.classList.replace("pending","error")
         if(info.cod =="404"){
             infoTxt.innerText=`${inputField.value} isn't a valid city name`
        }else{
            const city = info.name
            const country= info.sys.country
            console.log(country)
            const {description,id} = info.weather[0]
            console.log(description)
             const {feels_like,humidity,temp} = info.main
             console.log(feels_like,humidity,temp)
             console.log(wrapper)



                 wrapper.querySelector(".temp .numb").innerText= Math.floor(temp);
                 wrapper.querySelector(".weather").innerText= description;
                 wrapper.querySelector(".location span").innerText= `${city},${country}`;
                 wrapper.querySelector(".temp .numb-2").innerText= Math.floor(feels_like);
                 wrapper.querySelector(".humidity span").innerText=`${humidity}%`;


            infoTxt.classList.remove("pending", "error")
             wrapper.classList.add("active");
             console.log(info)
        }

    
}




