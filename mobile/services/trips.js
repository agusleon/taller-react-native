
const createDefaultDestination = async (jwt, address, longitude, latitude) => {

    const body = JSON.stringify({
        address,
        latitude,
        longitude
    });

    const url = 'https://fiuber-back-fastapi-dev-g10.herokuapp.com/destinations/';
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

  const createCustomDestination = async (jwt, address, name) => {

    const body = JSON.stringify({
        address,
        custom_name:name,
    });
    console.log(body);
    const url = 'https://fiuber-back-fastapi-dev-g10.herokuapp.com/destinations/name';
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

const getDefaultDestination = async (jwt) => {

    const url = 'https://fiuber-back-fastapi-dev-g10.herokuapp.com/destinations/';
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

export {createDefaultDestination, getDefaultDestination, createCustomDestination}