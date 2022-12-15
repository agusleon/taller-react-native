import { URL_USUARIOS } from "../utils/vars";

const postEvent = async ( event, jwt) => {

    const body = JSON.stringify({
        event,
        info:''
    });

    console.log("Sending this body: ",body);
    const url = URL_USUARIOS+'/events/';
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

export {postEvent}