import { URL_USUARIOS } from "../utils/vars";

const createUser = async (name, wallet, role, uid, jwt, car_description,plate) => {
    let body;
    if(role == 'passenger'){
        body = JSON.stringify({
              name,
              wallet,
              roles:[role]
    })}
    else{
      body = JSON.stringify({
        name,
        roles:[role],
        car_description,
        plate

    })}

    console.log("Sending this body: ",body);
    
 
    const url = URL_USUARIOS + '/users/'+uid;
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
        console.log("EL RESPONDE DE CREATE USER CON DRIVER ", json)
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }
  };

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

export {createUser, getUser, updateUserInfo,updateDriverInfo}