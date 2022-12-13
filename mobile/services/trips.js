import { URL_VIAJES, URL_BACKOFFICE } from "../utils/vars";

const createDefaultDestination = async (jwt, address, longitude, latitude) => {

    const body = JSON.stringify({
        address,
        latitude,
        longitude
    });

    const url =  URL_VIAJES + '/destinations/';
    const bearer = 'Bearer '+jwt;
    try {
        const response = await fetch(url,
        {
            method:'POST',
            body:body,
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }
  };

  const createCustomDestination = async (jwt, address, name, latitude, longitude) => {

    const body = JSON.stringify({
        address,
        custom_name:name,
        latitude,
        longitude
    });
    console.log(body);
    const url = URL_VIAJES + '/destinations/name';
    const bearer = 'Bearer '+jwt;
    try {
        const response = await fetch(url,
        {
            method:'POST',
            body:body,
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }
  };

  const deleteCustomDestination = async (jwt, name) => {

    const url = URL_VIAJES + '/destinations/name/?destination_name=' + name;
    console.log(url)
    const bearer = 'Bearer '+jwt;
    try {
        const response = await fetch(url,
        {
            method:'DELETE',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }
  };

const getDefaultDestination = async (jwt) => {

    const url = URL_VIAJES + '/destinations/';
    const bearer = 'Bearer '+jwt;

    try {
        const response = await fetch(url,
        {
            method:'GET',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        });
        const json = await response.json();
        if (json.detail){
            return '';
        }
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }

};

const getFavoriteDestinations = async (jwt) => {

    const url = URL_VIAJES + '/destinations/name/';
    const bearer = 'Bearer '+jwt;
    console.log
    try {
        const response = await fetch(url,
        {
            method:'GET',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        });
        console.log(response);
        const json = await response.json();
        if (json.detail){
            return '';
        }
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }

};

const createTrip = async (jwt, source, destination ) => {

    const url = URL_VIAJES + '/trips/';
    
    const bearer = 'Bearer '+jwt;

    const body = JSON.stringify({
        source_address: source.description,
        source_latitude: source.latitude,
        source_longitude: source.longitude,
        destination_address: destination.description,
        destination_latitude: destination.latitude,
        destination_longitude: destination.longitude,
    })

    console.log(body)

    try {
        const response = await fetch(url,
        {
            method:'POST',
            body:body,
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }
}

// const getAvailableTrips = async (distanceInMeters) => {
//     const url = 'https://fiuber-back-fastapi-dev-g10.herokuapp.com/trips/';
//     try {
//         const response = await fetch(url,
//         {
//             method:'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//               },
//         });
//         const json = await response.json();
//         return json;
//     } catch (err) {
//       console.error(err);
//       alert("error",err.message);
//     }
// }

const estimateFee = async (distanceInMeters) => {

    const url = URL_BACKOFFICE + '/rules/execute?tripLengthMeters=' + distanceInMeters;

    try {
        const response = await fetch(url,
        {
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        });
        const json = await response.json();
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }
}

const getTrip = async (trip_id, jwt) => {

    const url = URL_VIAJES + '/trips/' + trip_id;

    const bearer = 'Bearer '+jwt;

    try {
        const response = await fetch(url,
            {
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': bearer,
                    'Content-Type': 'application/json',
                  },
            });
        const json = await response.json();
        return json;
    } catch (err) {
        console.error(err);
        alert("error", err.message)
    }
}

const getStatus = async (trip_id, jwt) => {

    const url = URL_VIAJES + '/trips/' + trip_id;

    const bearer = 'Bearer '+jwt;

    try {
        const response = await fetch(url,
            {
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': bearer,
                    'Content-Type': 'application/json',
                  },
            });
        const json = await response.json();
        return json.trip_state;
    } catch (err) {
        console.error(err);
        alert("error", err.message)
    }
}

const getDriverLocation = async (trip_id, jwt) => {

    const url = URL_VIAJES + '/trips/' + trip_id;

    const bearer = 'Bearer '+jwt;

    try {
        const response = await fetch(url,
            {
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': bearer,
                    'Content-Type': 'application/json',
                  },
            });
        const json = await response.json();
        const driver_locations = {
            latitude: json.driver_latitude,
            longitude: json.driver_longitude
        }
        return driver_locations;
    } catch (err) {
        console.error(err);
        alert("error", err.message)
    }
}

export {createDefaultDestination, getDefaultDestination, createCustomDestination, getFavoriteDestinations, deleteCustomDestination, estimateFee, createTrip, getTrip, getStatus, getDriverLocation}