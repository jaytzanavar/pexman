import { Client, Account, Avatars, ID, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jaytzan.pexam',
    projectId: '66265122c166b38b73ef',
    databaseId: '662652a6cdf5b21505d3',
    userCollectionId: '662652d9c41abb07e7dc',
    expensesCollectionId: '662652f5b9f86f3b7bf7',
    storageId: '66265bcfe71044b4bf2a'

}


// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    // Default Code
    // account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    //     .then(function (response) {
    //         console.log(response);
    //     }, function (error) {
    //         console.log(error);
    //     });
    try {
        const newAccount = await account.create(
            ID.unique(),
            email, password, username
        )
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                password,
                avatar: avatarUrl
            }

        )
        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


export const signIn = async (email, password) => {

    try {
        const session = await account.createEmailSession(email, password)
        return session
    } catch (error) {
        throw new Error(error);
    }

}

export const getCurrentUser = async () => {
    try {
        const currentLoggedInUser = await account.get();
        if (!currentLoggedInUser) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentLoggedInUser.$id)]

        )

        if (!currentUser) {
            throw Error;
        }

        return currentUser.documents[0];

    } catch (error) {

        console.log(error)
    }
}

// Register User
