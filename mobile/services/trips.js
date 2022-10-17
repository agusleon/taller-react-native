
const createDestination = async (jwt, address, longitude, latitude) => {

    const body = JSON.stringify({
        address,
        latitude,
        longitude
    });

    console.log("Sending this body: ",body);
    const url = 'https://fiuber-back-fastapi-dev-g10.herokuapp.com/destinations';
    const bearer = 'Bearer '+jwt;
    console.log("with authentication ",bearer);
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
        console.log("Receiving this json: ",json);
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }
  };

const getDefaultDestination = async (jwt,uid) => {

    const url = 'https://fiuber-back-fastapi-dev-g10.herokuapp.com/destinations/'+uid;
    const bearer = 'Bearer '+jwt;
    const not_found = {
        detail:"Not Found"
    }
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
        if (json.detail == not_found.detail){
            return '';
        }
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }

};

export {createDestination, getDefaultDestination}