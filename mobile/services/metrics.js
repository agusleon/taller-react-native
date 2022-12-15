import { URL_USUARIOS, URL_VIAJES } from "../utils/vars";

const rateDriver = async ( uid, jwt, rating, comment) => {
    const body = JSON.stringify({
        uid,
        rating,
        text: comment,
        
      });
    
      console.log("Sending this body rating: ",body);
      const url = URL_USUARIOS+'/ratings/driver/';
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
}


const ratePassenger = async ( uid, jwt, rating, comment) => {
  const body = JSON.stringify({
      uid,
      rating,
      text: comment,
      
    });
  
    console.log("Sending this body rating: ",body);
    const url = URL_USUARIOS+'/ratings/passenger/';

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
}

const getUserInfo = async (uid, jwt) => {

  const url = URL_USUARIOS + '/ratings/'+uid;
  const bearer = 'Bearer '+jwt;
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

};

const getTripCount = async (uid, jwt, role) => {

  let url;

  if (role == 'passenger') {
    url = URL_VIAJES + '/metrics/tripcount/passenger/' + uid + '?time_window=999999';
  } else {
    url = URL_VIAJES + '/metrics/tripcount/driver/' + uid+ '?time_window=999999';
  }

  const bearer = 'Bearer ' + jwt;
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

}


export  {rateDriver,ratePassenger, getUserInfo, getTripCount}

