
// XMLHttpRequest
// https://developer.mozilla.org/en -US/docs/Web/API/XMLHttpRequest#open%28%29
function printWeather(cityname){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cityname + ',us');
    xhr.onreadystatechange = function () {
        //console.log(xhr.readyState);
        if (xhr.readyState === 4) {
            //console.log('Ready to start processing');
            // console.log(xhr.responseText);
            var obj = JSON.parse(xhr.responseText);
            // weather = obj.weather[0].description;
            // console.log(weather);
            var temp = cityname.toUpperCase();
            if(document.getElementById(temp)  || document.getElementById(obj.name))
            {
                return;
            }

            /*
             * Had to do this as the name field in the weather object received from the API is sometimes null.
             * The logic of my entire project is based on using this field as the id for the HTML elements created.
             \         * Hence, if absent, i am setting that field to the cityname entered by the user so that the program
             * does not break.
             * */
            if(obj.name ==="")
            {
                obj.name = cityname.toUpperCase();
                //console.log("NAme updated to: "+obj.name)

            }

            addResult(cityname, obj);

        }
    };
    xhr.send();

}

function addResult(city, weatherObj){


    //console.log(div.id);
    //console.log(div.innerHTML);
    //return div;
    var div = document.createElement('div');
    div.id = weatherObj.name;
    div.className = "weather_container";
    document.body.appendChild(div);
    // console.log(div);

    var elems_arr = getElems(weatherObj);

    elems_arr.forEach(function(elem){
        document.getElementById(weatherObj.name).appendChild(elem);
    });

    var br1 = document.createElement('br');
    var br2 = document.createElement('br');
    document.body.appendChild(br1);
    document.body.appendChild(br2);
}


getElems = function (weatherObj){

    var elem_array = [];

    var cont1 = document.createElement('div');
    cont1.id = weatherObj.name;
    cont1.className = "container_1";

    //CITY
    var city = document.createElement('div');
    city.id = weatherObj.name;
    city.className = "city";
    //city.innerHTML = weatherObj.name;
    // anchor tag <a> pointing to the location of the city
    // https://www.google.com/maps/@67.3,45.2,12z - replace the coordinates
    // <a>Link to Google Maps</a>
    var anch = document.createElement('a');
    var ref = 'https://www.google.com/maps/@' + weatherObj.coord.lat + ','  + weatherObj .coord.lon + ',12z';
    anch.href = ref;
    // console.log(ref);
    anch.id = weatherObj.name+'_anchor';
    anch.innerHTML = weatherObj.name.toUpperCase();
    //document.getElementById(city).appendChild(anch);
    city.appendChild(anch);
    cont1.appendChild(city);

    //CURRENT DATE & TIME
    var dte = document.createElement('div');
    dte.id = weatherObj.name;
    dte.className = "date";
    var currtime = getRealDate(weatherObj.dt);
    dte.innerHTML = currtime.toString();
    cont1.appendChild(dte);

    //Get weather description for cities
    var w_desc = weatherObj.weather[0].description;
    var  weather_desc = document.createElement('div');
    weather_desc.innerHTML = w_desc;
    weather_desc.id = weatherObj.name;
    weather_desc.className = "weather_desc";
    cont1.appendChild(weather_desc);


    elem_array.push(cont1);


    var cont1 = document.createElement('div');
    cont1.id = weatherObj.name;
    cont1.className = "container_2";

    var left = document.createElement('div');
    left.id = weatherObj.name;
    left.className = "left";

    var right = document.createElement('div');
    right.id = weatherObj.name;
    right.className = "right";
    // image representing the weather
    // add an image element
    // set the src attribute to http://openweathermap.org/img/w/01d.png
    // replace it with the icon code: weatherObj.weather[0].icon

    var pic = document.createElement('img');
    var link = 'http://openweathermap.org/img/w/' + weatherObj.weather[0].icon + '.png';
    //console.log(link);
    pic.src = link;
    pic.alt = weatherObj.name + 'weather';
    pic.id = weatherObj.name;
    pic.className ="pic"
    // document.getElementById(city).appendChild(img);
    //console.log(link);

    left.appendChild(pic);


    var temp = document.createElement('div');
    temp.id = weatherObj.name;
    temp.className = "temp";
    temp.innerHTML = getCelTemperature(weatherObj);
    //var f = getFarTemperature(weatherObj);
    //console.log("F temp: "+f);

    //console.log(temp.innerHTML);

    left.appendChild(temp);


    var s1 = document.createElement('div');
    var sr = getRealDate(weatherObj.sys.sunrise);
    s1.innerHTML = ' Sunrise: ' + sr.toString();
    s1.id = weatherObj.name;
    //span_array.push(s1);
    right.appendChild(s1);

    var s2 = document.createElement('div');
    var ss = getRealDate(weatherObj.sys.sunset);
    s2.innerHTML = ' Sunset: ' + ss.toString();
    s2.id = weatherObj.name;
    right.appendChild(s2);

    var ws = document.createElement('div');
    // var speed = Math.round(weatherObj.wind.speed * 3600 / 1610.3*1000)/1000; // / 3600;
    ws.id = weatherObj.name;
    ws.innerHTML = "Wind Speed: " + weatherObj.wind.speed + " mps" ;
    right.appendChild(ws);

    var s3 = document.createElement('div');
    s3.innerHTML = ' Humidity: ' + weatherObj.main.humidity+"%";
    s3.id = weatherObj.name;
    right.appendChild(s3);


    var s4 = document.createElement('div');
    s4.innerHTML = ' Pressure: ' + weatherObj.main.pressure+' hPa';
    s4.id = weatherObj.name;
    right.appendChild(s4);

    var cont2 = document.createElement('div');
    cont2.id = weatherObj.name;
    cont2.className = "container_2";

    cont2.appendChild(left);
    cont2.appendChild(right);
    elem_array.push(cont2);



    //

    /*

     span_array.push(s2);
     var s3 = document.createElement('span');
     s3.innerHTML = ' Max temp: ' + weatherObj.main.temp_max;
     span_array.push(s3);
     var s4 = document.createElement('span');
     s4.innerHTML = ' Min temp: ' + weatherObj.main.temp_min;
     span_array.push(s4);


     */



    return elem_array;
}

getRealDate = function (epochtime){
    // var sr_time =  weatherObj.sys.sunrise;
    //var ss_time =  weatherObj.sys.sunset;

    var mydate = new Date(epochtime * 1000);


    return mydate.toLocaleString();

}


getCelTemperature = function (weatherObj){

    var c_temp = weatherObj.main.temp - 273.15;

    //console.log("Celcius temp: "+c_temp);

    return c_temp.toFixed(1);

}

getFarTemperature = function (weatherObj){
    var c_temp = weatherObj.main.temp - 273.15;

    //console.log("Celcius temp: "+c_temp);

    var f_temp =  c_temp * 9 / 5 + 32;

    return f_temp.toFixed(1);
}

document.addEventListener('DOMContentLoaded', function () {
    var inpval = document.getElementById("inp");
    // cities.forEach(printWeather);
    document.getElementById('btn').addEventListener('click', function (event) {
        // console.log(event);
        //console.log(inpval.value);
        var arr_strings = inpval.value.split(',');
        //console.log(arr_strings);
        inpval.value = '';
        arr_strings.forEach(function (city) {
            console.log('Printing for: ' + city);
            city.trim();

            //if(document.getElementById(city.toUpperCase()))

            printWeather(city);

            //printWeather(arr_strings);
        });

    });
});