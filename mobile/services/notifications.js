import { URL_NOTIFICATIONS_SEND, URL_NOTIFICATIONS_PUSH } from "../utils/vars";

const sendPushNotification = async (targetExpoPushToken, titleMessage, message) => {



    let body;

        body = JSON.stringify({
            "to": targetExpoPushToken,
            "title":titleMessage,
            "body":message
    })

    console.log("Sending this body: ",body);


    const url = URL_NOTIFICATIONS_SEND;
   
    try {
        const response = await fetch(url,
        {
            method:'POST',
            body:body,
            headers: {
                'host': 'exp.host',
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'content-type': 'application/json'
            },
        });
        const json = await response.json();
        console.log("EL RESPONDE de requets notis ", json)
        return json;
    } catch (err) {
    console.error(err);
    alert("error",err.message);
    }
}



const getReceipts = async (id) => {



    let body;

        body = JSON.stringify({
            "ids": [id]
    })

    console.log("Sending this body: ",body);


    const url = URL_NOTIFICATIONS_PUSH;
   
    try {
        const response = await fetch(url,
        {
            method:'POST',
            body:body,
            headers: {
                'host': 'exp.host',
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'content-type': 'application/json'
            },
        });
        const json = await response.json();
        console.log("EL RESPONDE de recepts notis ", json)
        return json;
    } catch (err) {
    console.error(err);
    alert("error",err.message);
    }
}

export {sendPushNotification,getReceipts}