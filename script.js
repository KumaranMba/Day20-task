function getData(url){                                                         // function                                                
    return new Promise((resolve,reject)=>{                                     // using new promise constructor and return the value 
        fetch(url)                                                             // fetch the data 
        .then(response=>{                                                      // getting response
            if(!response.ok){                                                  // if the condition get true means it will throw the error 
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();                                             // response the data in json format
        })
       .then(data=>resolve(data))                                               // if  successful, resolve promise with data
       .catch(error=>reject(error))                                             // if rejected throw the error
    })
}


let form = document.querySelector('.formdata');                                 // getting the form  element from HTML file
let dropdown = document.querySelector('.country');                             // getting the droupdown list of country from the HTML file
let date = document.querySelector('.date');                                    // gettig the date from the HTML file
let button = document.querySelector('.button');                                // getting the button from the HTML file

button.addEventListener('click',(e)=>{                                         // add event listener to button click
    e.preventDefault();                                                        // preventing default action of the form
    let country = dropdown.value;                                              // Assigning the values to the country          
    let year= date.value.split(/\D/)[0]; //[2021] [9] [30]                     // gettig the year  month and day from input value
    let month= date.value.split(/\D/)[1];
    let day = date.value.split(/\D/)[2];
  
    
    
    const  apiUrl =`https://holidays.abstractapi.com/v1/?api_key=ccd6a137bfa745638c1be2e1e20b3371&country=${country}&year=${year}&month=${month}&day=${day}`
    
    getData(apiUrl)                                                               // calling the function                                                                               
    .then((data)=>{                                                               // getting the data from the function 
        console.log(data);

        let card = document.querySelector('.card');                                  // select the card element in HTML
        for(let details of data){                                                    // iterating the data to get details
            card.innerHTML = `<h5 class="text-light m-2">Name: ${details.name}</h5>        
            <h5 class="text-light m-2">Location: ${details.location}</h5>
            <h5 class="text-light m-2">Country: ${details.country}</h5>
            <h5 class="text-light m-2">Date: ${details.date}</h5>
            <h5 class="text-light m-2">Year: ${details.date_year}</h5>
            <h5 class="text-light m-2">Month: ${details.date_month}</h5>
            <h5 class="text-light m-2">Day: ${details.date_day}</h5>
            <h5 class="text-light m-2">Type: ${details.type}</h5>
            <h5 class="text-light m-2">Week day: ${details.week_day}</h5>`;            // displaying the card  with all the information
        }
       form.reset();                                                                   // reseting the form to the default condition
       
    })
    .catch(error=>{                                                                    //   if there is an error with the request, show it in the console and on the page
        console.log(`Error fetching Data:${error}`)
    }); 
    

})









