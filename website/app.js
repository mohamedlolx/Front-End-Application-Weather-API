/* Global Variables */
//Personal API
const apiKey = "698a6dc54b92732d290f2b3f3913358d&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// okay let us get an event to know when the client  give us somedata
document.getElementById("generate").addEventListener("click", async () => {
  //as an async function we should use  try and carch to know if there is error or not and this is a ch/s related to async fun
  //similar to if else
  //here we got the zipcode that the client  write in the zipcode area to send it to the site through the api key
  const zip = document.getElementById("zip").value;
  if (!zip) {
    alert("Please enter a zip code");
  } else if (!content) {
    alert("Please enter your feeling about the temperature");
  } else {
    try {
      //here we got the data of the client  and put it in const throug the id in html of feelings
      const content = document.getElementById("feelings").value;
      //let us fetch the base url using await so if they is a problem with teh server of the api we are waiting till the server respond not excuting the other steps and got errors in the software
      const baseUrl = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${apiKey}`
      );
      //let's translate the data into json to understand it clearly
      const temporal = await baseUrl.json();
      const temp = await temporal.main.temp;
      //after trying testing this output we got this our needing result of temp
      console.log(temp);
      //lets make the post request url and its option related to the post method
      await fetch("/addWeather", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, content, temp }),
      });
      //let's make the get request related to the url  then make it json
      const getData = await fetch("/getWeather").then((getData) =>
        getData.json()
      );
      console.log("the get data is", getData);
      //now let's insert the goten data from the client into the web html page
      document.getElementById("date").innerHTML = getData.date;
      document.getElementById("temp").innerHTML = getData.temp;
      document.getElementById("content").innerHTML = getData.content;
      //for error side we use catch in replace of else of the if condition
    } catch (error) {
      console.log("Error found", error);
    }
  }
});
