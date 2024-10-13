const conf ={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    RTE_ApiKey:String(import.meta.env.VITE_RTE_API_KEY),
    appwriteDocumentId:String(import.meta.env.VITE_APPWRITE_DOCUMENT_ID)
}
//  using string here because it can be the case that if we forgot to put the variables in strings in the env file then our app can crash
//  so for that to not happen we are doing this to play safe.

export default conf