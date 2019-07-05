import deviceinfo from 'react-native-device-info';
export default async function Fetch(params) {
    const local = await deviceinfo.getIPAddress();
    console.log('@@@@@@@@@@@@@@@@@@@@@@@', local);
    return fetch(`http://${local}:3666/wantMsg`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(params)
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return Promise.reject('something went wrong!')
        }
    });
}