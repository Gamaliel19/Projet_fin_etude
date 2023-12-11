 
import httpClient from '../../httpClient'

export const Liste = async () => {
    try {
        const res = await httpClient.get("http://127.0.0.1:5000/listUser", {
            headers: {
                'TRN-Api-Key': 'XXX',
                'Access-Control-Allow-Origin': true,
            }
        });
        const listeUsers = res.data;
        console.log(listeUsers)
        return { listeUsers };
    } catch (error) {
        return { error };
    }
}

export const ListeCl = async () => {
    try {
        const res = await httpClient.get("http://127.0.0.1:5000/listClient", {
            headers: {
                'TRN-Api-Key': 'XXX',
                'Access-Control-Allow-Origin': true,
            }
        });
        const listeClients = res.data;
        console.log(listeClients)
        return { listeClients };
    } catch (error) {
        return { error };
    }
}

