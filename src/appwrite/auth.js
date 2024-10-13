import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// const client = new Client()
//   .setEndpoint(conf.appwriteUrl)
//   .setProject(conf.appwriteProjectId);

// const account =new Account(client);

// const user = await account.create(
//     ID.unique(),

// );

export class AuthService{
    client= new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account= new Account(this.client);
        
    }
    
    async creatAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password})
            } else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
        return null;
    }
    
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}
const authservice= new AuthService();

export default authservice;