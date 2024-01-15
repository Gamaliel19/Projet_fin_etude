import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6596777f4d588053c2a1');
    
    export const account = new Account(client)

export default client;