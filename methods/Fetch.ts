import deviceinfo from 'react-native-device-info';
export default async function Fetch(params) {
    const local = await deviceinfo.getIPAddress();
    return fetch(`http://169.254.166.121:3666/wantMsg`, {
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