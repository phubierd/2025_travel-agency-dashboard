import { ID, OAuthProvider, Query } from 'appwrite';
import { account, database, appwriteConfig } from './client';
import { redirect } from 'react-router';

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(OAuthProvider.Google);
  } catch (error) {
    console.log('loginWithGoogle', error);
  }
};

export const getUser = async () => {
  try {
    const user = await account.get();

    if (!user) return redirect('/sign-in');

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal('accountId', user.$id),
        Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId']),
      ]
    );
  } catch (error) {
    console.log('getUser', error);
  }
};
export const getGooglePicture = async () => {
  try {
    // get the current user session
    const session = await account.getSession('current');

    //get the OAuth2 token from the session
    const oAuthToken = session.providerAccessToken;

    if (!oAuthToken) {
      console.log('no oAuth token available');
      return null;
    }

    //make a request to the google people api to get the profile photo
    const response = await fetch(
      'https://people.googleapis.com/v1/people/me?personFields=photos',
      { headers: { Authorization: `Bearer ${oAuthToken}` } }
    );

    if (!response.ok) {
      console.log('failed to fetch profile photo from google people api');
      return null;
    }

    const data = await response.json();

    const photoUrl =
      data.photos && data.photos.length > 0 ? data.photos[0].url : null;

    return photoUrl;
  } catch (error) {
    console.log('getGooglePicture', error);
  }
};
export const storeUserData = async () => {
  try {
    const user = await account.get();

    if (!user) return null;

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', user.$id)]
    );

    if (documents.length > 0) return documents[0];

    //get phofile photo from google
    const imageUrl = await getGooglePicture();

    //create new user document
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: imageUrl || '',
        joinedAt: new Date().toISOString(),
      }
    );

    return newUser;
  } catch (error) {
    console.log('storeUserData', error);
  }
};
export const getExistingUser = async (id: string) => {
  try {
    const { documents, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', id)]
    );

    if (documents.length === 0) return null;
    return total > 0 ? documents[0] : null;
  } catch (error) {
    console.log('error get exist user', error);
  }
};
export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.log('logout error:', error);
    return false;
  }
};
