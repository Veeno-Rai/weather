import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
export default function Main() {
    const [city,setCity]=useState(" ");
    const [search,setSearch]=useState("delhi");
    const [progress, setProgress] = useState(0);
  

    useEffect(()=>{
        const fetchApi=async ()=>{
            setProgress(5);
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=898027285478f088242c8d6461358dc8`
           setProgress(10);
            const response=await fetch(url);
            setProgress(30);
            const resJson=await response.json();
            setProgress(70)
            console.log(resJson)
            setCity(resJson);
            setProgress(100);
        }
        fetchApi();
    },[search])
    
    const changeimage =()=>{
        if(city.weather[0].description ==="clear sky")  return 1;
        else if(city.weather[0].description ==="haze")  return 2;  
      
    }

    const dateBuild=(d)=>{
        let months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let days=["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
      let day=days[d.getDay()];
      let date=d.getDate();
      let month=months[d.getMonth()];
      let year=d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    }
    const Capitalize = (word)=>{
        let lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1) ;
    }
    
    return (
        <>
           <div>
               <main>
               <LoadingBar
                    color='#f11946'
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                 />
               <div className="search-box">
               <input type="search"
               placeholder='SEARCH..' 
               className='search-bar'
               onChange={(event)=>{setSearch(event.target.value)}}
               value={search}
               />
               </div>
               {! city.main ?('') :(
                <>
                <div className={`${(changeimage()===1)?'warm':(changeimage()===2)?'app':'cloud'}`}>
               <div className="location-box">
                   <div className="location">{Capitalize(search)},{city.sys.country}</div>
                   <div className="date">{dateBuild(new Date())}</div>
               </div>
               <div className="weather-box">
                   <div className="temp">{city.main.temp} &deg;C</div>
                   <div className="weather">{Capitalize(city.weather[0].description)}</div>
                   <div className="humidity" >Humidity : {city.main.humidity}</div>
                   <div className="min-max">Min-Temp : {city.main.temp_min} &deg;C | Max-Temp: {city.main.temp_max} &deg;C</div>
               </div>
               </div>
               </>
                 )}
               </main>
           </div>
         
        </>
    )
}
