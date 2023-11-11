import conf from "../conf/conf";

import {Client,Account,ID} from "appwrite";

export class AuthService{
    client=new Client();
    account;
    constructor()
    {
        this.client=new Client().setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }
    async login({email,password})
    {
        try
        {
           const user=await this.account.createEmailSession(email,password);
           return user;
        }
        catch(err)
        {
            console.log(`Login Error: ${err}`);
        }
    }
    async createAccount({name,email,password})  
    {
        try
        {
            const user=await this.account.create(ID.unique(),email,password,name);
            if(user)
            {
                // call another method
                return this.login({email,password});
            }
            else
            {
                return user;
            }
        }
        catch(error)
        {
            throw error;
        }
        
    }

  
    async getCurrentUser()
    {
        try
        {
          return await this.account.get();
        }
        catch(err)
        {
            console.log(`Get User error : ${err}`)
        }
        return null;
    }
    async logout()
    {
        try
        {
          await this.account.deleteSessions();
        }
        catch(err)
        {
            console.log(`Logout error : ${err}`)
        }
    }
}

const authService=new AuthService();

export default authService;