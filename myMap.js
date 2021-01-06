
function GetMap() {

    let URL = 'http://api.open-notify.org/iss-now.json';

    let request = new XMLHttpRequest();
    request.open('GET',URL);
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        const response = request.response;
        let position = response['iss_position'];
        let currLat = position['latitude'];
        let currLong = position['longitude'];
        console.log(`Current Latitude: ${currLat}`);
        console.log(`Current Longitude: ${currLong}`);

        let map = new Microsoft.Maps.Map('#myMap',{
            credentials: 'ApTzNqu_CGdI76eh9jlrNCKzXIKNbNI8bFAozGiP5u2oRUzhwvs3OUPPdasj6W8s', 
            center: new Microsoft.Maps.Location(currLat, currLong)
        });

        let center = map.getCenter();
        let pin = new Microsoft.Maps.Pushpin(center, { 
            text: 'ISS'
        });

        map.entities.push(pin);

        map.setView({
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            center: new Microsoft.Maps.Location(currLat, currLong),
            zoom: 2
        });

        document.querySelector('#p_long').textContent = `Longitude: ${currLong}`;
        document.querySelector('#p_lat').textContent = `Latitude: ${currLat}`;
    }
}

setInterval(GetMap, 60000);