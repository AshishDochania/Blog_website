import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    const newSlug="a"+slug;
    try {
      console.log(slug);
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        newSlug,
        {                                  
          title: title,
          content: content,
          featured_image: featuredImage,
          status: status,
          userId: userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: creatPost :: error ",error);
    }
  }

  async updatePost(slug ,{title,content,featuredImage,status}){
    try {
        return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
            {title,content,featuredImage,status}
        )
    } catch (error) {
        throw error;
    }
  }

  async deletePost(slug){
    try {
        await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
        return true;
    } catch (error) {
        console.log("Appwrite service :: deletepost :: error" ,error);
        return false;
    }
  }

  async getPost(slug){
    try {
        return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
    } catch (error) {
        console.log("Appwrite service :: getpost :: error",error);
    }
  }

  async getPosts(queries=[Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries);
    } catch (error) {
        console.log("Appwrite service :: getposts :: error",error);
    }
  }

  async uploadFile(file){
    try {
        return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
    } catch (error) {
        console.log("Appwrite service :: uploadfile :: error", error);
        return false;
    }
  }

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(conf.appwriteBucketId,fileId);
        return true;
    } catch (error) {
        console.log("Appwrite service :: delete File :: error",error);
        return false;
    }
  }

//   getfilepreview can also be put in async but its response is very fast so not needed
  getFilePreview(fileId){
    try{
      // console.log(fileId);
    return this.bucket.getFilePreview(conf.appwriteBucketId,fileId);
    } catch(er){
        console.log("Appwrite service :: getfilepreview :: error", er);
        return false;
    }
  }
}

const service = new Service();
export default service;
