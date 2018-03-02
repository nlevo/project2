//const charactersAPI = new APIHandler("http://localhost:8000");
var neighborhoods = [
];



var markers = [];
var map;
var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    'south west of the nearest large town, Alice Springs; 450&#160;km '+
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    '(last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';

// var infowindow = new google.maps.InfoWindow({
//   content: '<div id="content">'+
//   '<div id="siteNotice">'+
//   '</div>'+
//   '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
//   '<div id="bodyContent">'+
//   '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
//   'sandstone rock formation in the southern part of the '+
//   'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
//   'south west of the nearest large town, Alice Springs; 450&#160;km '+
//   '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
//   'features of the Uluru - Kata Tjuta National Park. Uluru is '+
//   'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
//   'Aboriginal people of the area. It has many springs, waterholes, '+
//   'rock caves and ancient paintings. Uluru is listed as a World '+
//   'Heritage Site.</p>'+
//   '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
//   'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
//   '(last visited June 22, 2009).</p>'+
//   '</div>'+
//   '</div>'
// });

function getFullList() {
  console.log("Running inside getFullList()");
  let selectedLanguage = $( "#select-language option:selected" ).text();
  let selectedCategory = $( "#select-category option:selected" ).text();
  console.log("Selected Lang: " + selectedLanguage);
  console.log("Selected Category: " + selectedCategory);
  axios.post("/search2", { category: selectedCategory, language:  selectedLanguage})
  .then(response => {
      console.log("INSIDE AXIOS");
      //$(".characters-container").empty();
      // console.log("Response: ");
      // console.log(response);
      response.data.forEach(oneResponse => {
        console.log(oneResponse.name);
        console.log(oneResponse.loc.coordinates);
        neighborhoods.push(
          {
            lat: oneResponse.loc.coordinates[0],
            lng: oneResponse.loc.coordinates[1],
            name: oneResponse.name,
            description: oneResponse.description,
            phone: oneResponse.phone,
            website: oneResponse.website,
            category: oneResponse.category,
          }
        )
      });
      console.log(neighborhoods);
      updateMap();
      //drop();
  })
  .catch(error => {
      console.log('Oh No! Error!');  
      console.log(error);
  })
};


  
 

  // function updateMap() {
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 12,
  //     center: {lat: 52.520, lng: 13.410}
  //   });
  // }

  // function drop() {
  //   clearMarkers();
  //   for (var i = 0; i < neighborhoods.length; i++) {
  //     addMarkerWithTimeout(neighborhoods[i], i * 200);
  //   }
  // }

  // function addMarkerWithTimeout(position, timeout) {
  //   window.setTimeout(function() {
  //     markers.push(new google.maps.Marker({
  //       position: position,
  //       map: map,
  //       animation: google.maps.Animation.DROP
  //     }));
  //   }, timeout);
  // }

  // function clearMarkers() {
  //   for (var i = 0; i < markers.length; i++) {
  //     markers[i].setMap(null);
  //   }
  //   markers = [];
  // }


  // center: {lat: 52.520, lng: 13.410}
  
  // function updateMap() {
    
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 12,
  //   });
    
  //   if (navigator.geolocation && neighborhoods.length <= 4) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       const user_location = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
  
  //       // Center map with user location
  //       map.setCenter(user_location);
  //     })
  //   } else {
  //     //map.setCenter({lat: neighborhoods[5].lat, lng: neighborhoods.lng[4] });
  //   }

  //   ////////////////////////////// test code

    
  //   ////////////////////////////// end test code
  // }

  // function drop() {
  //   clearMarkers();
  //   console.log("The length of neighborhoods: "  + neighborhoods.length);
  //   map.setCenter(neighborhoods[0]);
  //   for (var i = 0; i < neighborhoods.length; i++) {
  //     addMarkerWithTimeout(neighborhoods[i], i * 200);
      
  //   }
  // }

  // function addMarkerWithTimeout(position, timeout) {
  //   window.setTimeout(function() {
  //     markers.push(new google.maps.Marker({
  //       position: position,
  //       title: "TEST",
  //       map: map,
  //       animation: google.maps.Animation.DROP
  //     }));
      
  //     var infowindow = new google.maps.InfoWindow({
  //       content: '<div id="content">'+
  //       '<div id="siteNotice">'+
  //       '</div>'+
  //       '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
  //       '<div id="bodyContent">'+
  //       '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
  //       'sandstone rock formation in the southern part of the '+
  //       'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
  //       'south west of the nearest large town, Alice Springs; 450&#160;km '+
  //       '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
  //       'features of the Uluru - Kata Tjuta National Park. Uluru is '+
  //       'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
  //       'Aboriginal people of the area. It has many springs, waterholes, '+
  //       'rock caves and ancient paintings. Uluru is listed as a World '+
  //       'Heritage Site.</p>'+
  //       '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
  //       'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
  //       '(last visited June 22, 2009).</p>'+
  //       '</div>'+
  //       '</div>'
  //     });
      
  //     ///////////// end test code 
  //     google.maps.event.addListener(markers[0],'click', (function(marker,content,infowindow){ 
  //       return function() {
  //           infowindow.setContent(content);
  //           infowindow.open(map,marker);
  //       };
  //   })(marker,content,infowindow)); ; 
  //     //////////// end test code



  //     // markers[markers.length-1].addListener('click', function() {
  //     //   infowindow.open(map, markers[markers.length-1]);
  //     //   console.log("INSIDE add market, length: ");
  //     //   console.log(markers.length-1);
        
  //     // });
      
  //     //markers.setMap(map);
  //   }, timeout);
  // }

  // function clearMarkers() {
  //   for (var i = 0; i < markers.length; i++) {
  //     markers[i].setMap(null);
  //   }
  //   markers = [];
  // }

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

  // var updateMap = function() {

  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 10
  //   });
  
  //   // if brower support available, ask user for location data and set the map view
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       var initialLocation = new google.maps.LatLng(
  //         position.coords.latitude,
  //         position.coords.longitude
  //       );
  //       map.setCenter(initialLocation);
  //     });
  //   }
  
  //   // for each marker passed through, add it to the map with a popup
  //   markers.forEach(function(marker) {
  //     console.log(marker);
  //     var position = new google.maps.LatLng(marker.lat, marker.lng);
  //     var googleMarker = new google.maps.Marker({
  //       position: position,
  //       title: marker.name,
  //       map: map
  //     });
  //     // Bind a popup to the marker
  //     googleMarker.addListener('click', function() {
  //       var infoWindow = new google.maps.InfoWindow({
  //         content: '<h3>' + marker.name + '</h3>'
  //       });
  //       infoWindow.open(map, googleMarker);
  //     });
  //   });
  // };



  // var neighborhoods = [
  //   {name: "Test1", lat: 52.511, lng: 13.447},
  //   {name: "Test2", lat: 52.549, lng: 13.422},
  //   {name: "Test3", lat: 52.497, lng: 13.396},
  //   {name: "Test4", lat: 52.517, lng: 13.394}
  // ];

  // var locations = [
  //   ['loan 1', 52.511, 13.447, 'address 1'],
  //   ['loan 2', 33.923036, 151.259052, 'address 2'],
  //   ['loan 3', 34.028249, 151.157507, 'address 3'],
  //   ['loan 4', 33.80010128657071, 151.28747820854187, 'address 4'],
  //   ['loan 5', 33.950198, 151.259302, 'address 5']
  //   ];
  
  //center: new google.maps.LatLng(neighborhoods[0].lat, locations[0][0].lng),
    function updateMap() {
  
      var myOptions = {
        
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
  
      };
      var map = new google.maps.Map(document.getElementById("map"),
          myOptions);
          
      if (navigator.geolocation && neighborhoods.length === 0) {
            navigator.geolocation.getCurrentPosition(function (position) {
              const user_location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
        
              // Center map with user location
              map.setCenter(user_location);
            })
          }


      setMarkers(map,neighborhoods)
  
    }
  
  
  
    function setMarkers(map,locations){
  
        var marker, i
  
  for (i = 0; i < locations.length; i++)
   {  
  
   var loan = locations[i].name
   var lat = locations[i],lat
   var long = locations[i].lng
   var add =  locations[i].name;
  
   latlngset = new google.maps.LatLng(lat, long);
  
    var marker = new google.maps.Marker({  
            map: map, title: loan , position: latlngset  
          });
          map.setCenter(marker.getPosition())
  
          var content = `<div class="card border-secondary mb-3" style="max-width: 20rem;">
                            <div class="card-header">${locations[i].category}</div>
                            <div class="card-body">
                              <h5 class="card-title">${locations[i].name}</h5>
                              <p class="card-title">${locations[i].website}</p>
                              <p class="card-title">${locations[i].phone}</p>
                              <p class="card-text">${locations[i].description}</p>
                            </div>
                        </div>
                        `   
  
    var infowindow = new google.maps.InfoWindow()
  
  google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
          return function() {
             infowindow.setContent(content);
             infowindow.open(map,marker);
          };
      })(marker,content,infowindow)); 
  
    }
    }