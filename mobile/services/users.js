import { URL_USUARIOS } from "../utils/vars";

const createDriver = async (name, role, uid, jwt, car_description, plate) => {
    
    const body = JSON.stringify({
        name,
        roles:[role],
        car_description,
        plate
      })

    console.log("Sending this body: ",body);
 
    const url = URL_USUARIOS + '/users/'+uid;
    const bearer = 'Bearer ' + jwt;

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

  };

const createPassenger = async (name, role, uid, jwt) => {
  
  const body = JSON.stringify({
            name,
            roles:[role]
      })


  console.log("Sending this body: ",body);

  const url = URL_USUARIOS + '/users/'+uid;
  const bearer = 'Bearer ' + jwt;

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
}

const getUser = async (uid, jwt) => {

    const url = URL_USUARIOS + '/users/'+uid;
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
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }

};

const updateUserInfo = async( uid, jwt,name, role) => {

  const body = JSON.stringify({
    name,
    roles: [role],
  });

  console.log("Sending this body: ",body);
  const url = URL_USUARIOS + '/users/'+uid;
  const bearer = 'Bearer '+jwt;
  try {
    const response = await fetch(url,
    {
        method:'PUT',
        body:body,
        headers: {
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
    });
    const json = await response.json();
    console.log("el put response", json);
    return json;
  } catch (err) {
    console.error(err);
    alert("error",err.message);
  }
}

const updateDriverInfo = async( uid, jwt,name, role, car_description, plate) => {

  const body = JSON.stringify({
    name: name,
    roles: [role],
    car_description,
    plate: plate,
  });

  console.log("Sending this body: ",body);
  const url = URL_USUARIOS + '/users/'+uid;
  const bearer = 'Bearer '+jwt;
  try {
    const response = await fetch(url,
    {
        method:'PUT',
        body:body,
        headers: {
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
    });
    const json = await response.json();
    console.log("el put response", json);
    return json;
  } catch (err) {
    console.error(err);
    alert("error",err.message);
  }
}

export {createPassenger, createDriver, getUser, updateUserInfo,updateDriverInfo}