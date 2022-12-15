import { URL_PAGOS, URL_VIAJES } from "../utils/vars"

const createTransaction = async (fee, trip_id, driver_id, jwt) => {

    const url = URL_PAGOS + '/transaction';

    const bearer = 'Bearer ' + jwt;

    const body = JSON.stringify({
        trip_id,
        receiver_id:driver_id,
        amount:fee
    })

    console.log(body)

    const response = await fetch(url,
        {
            method:'POST',
            body:body,
            headers: {
                'Accept': 'application/json',
                'Authorization': bearer,
                'Content-Type': 'application/json',
              },
        });
    console.log(JSON.stringify(response));
    const json = await response.json();
    return json;

}

const makeDeposit = async (trip_id, jwt) => {

    const url = URL_PAGOS + '/deposit';

    const bearer = 'Bearer ' + jwt;

    const body = JSON.stringify({
        trip_id,
    })

    const response = await fetch(url,
        {
            method:'POST',
            body:body,
            headers: {
                'Accept': 'application/json',
                'Authorization': bearer,
                'Content-Type': 'application/json',
              },
        });
    return response; 
}   

const makeWithdrawal = async (trip_id, jwt) => {

    const url = URL_PAGOS + '/withdrawal';
    
    const bearer = 'Bearer ' + jwt;

    const body = JSON.stringify({
        trip_id,
    })

    console.log(body)
    const response = await fetch(url,
        {
            method:'POST',
            body:body,
            headers: {
                'Accept': 'application/json',
                'Authorization': bearer,
                'Content-Type': 'application/json',
              },
        });
    return await response.json();
}

const createWallet = async (jwt, user_id) => {

    const url = URL_PAGOS + '/wallet/' + user_id;

    const bearer = 'Bearer ' + jwt;

    const response = await fetch(url,
    {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': bearer,
            },
    });
    console.log(JSON.stringify(response))
    const json = await response.json();
    return json;

}

const putPayment = async (jwt, trip_id, amount, paid, collected) => {

    const url = URL_VIAJES + '/payment/';

    const bearer = 'Bearer ' + jwt;

    const body = JSON.stringify({
        trip_id,
        amount,
        paid,
        collected
    })

    console.log("sending this body: ", body )

    const response = await fetch(url,
        {
            method:'PUT',
            body:body,
            headers: {
                'Accept': 'application/json',
                'Authorization': bearer,
                'Content-Type': 'application/json',
              },
        });
    console.log(response)
    return response.json();
}


export {createTransaction, makeDeposit, createWallet, putPayment, makeWithdrawal}