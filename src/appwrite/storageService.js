import conf from "../conf/conf";

import {Client,Databases,ID,Storage,Query} from "appwrite";

export class StorageService
{
   client=new Client();
   bucket;
   database;
   constructor()
   {
     this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId);
     this.bucket=new Storage(this.client);
     this.database=new Databases(this.client);
     
   }
   //Post Services
   async createPost({title,content,featuredImage,status,userId})
   {
      try
      {
        return await this.database.createDocument(conf.appwriteDBId,conf.appwriteCollectionId,ID.unique(),{
            title,
            content,
            featuredImage,
            status,
            userId})
      }
      catch(err)
      {
        console.log(`Create Post error : ${err}`)
      }
   }
   async updatePost(slug,{title,content,featuredImage,status})
   {
      try
      {
        return await this.database.updateDocument(conf.appwriteDBId,conf.appwriteCollectionId,slug,{
            title,
            content,
            featuredImage,
            status
        })
      }
      catch(err)
      {
        console.log(`Update Post error : ${err}`)
      }
   }
   async deletePost(slug)
   {
      try
      {
        await this.database.deleteDocument(conf.appwriteDBId,conf.appwriteCollectionId,slug);
        return true;  
    }
      catch(err)
      {
        console.log(`Delete Post error : ${err}`)
      }
   }

   async getPost(slug)
   {
      try
      {
        return await this.database.getDocument(conf.appwriteDBId,conf.appwriteCollectionId,slug);
        
    }
      catch(err)
      {
        console.log(`Get Post error : ${err}`)
      }
   }
  async getPosts(queries=[Query.equal("status","active")])
  {
    try
    {
       return await this.database.listDocuments(
        conf.appwriteDBId,
        conf.appwriteCollectionId,
        queries
        )
    }
    catch(err)
    {
        console.log(`Get all posts error : ${err}`)
    }
  }
  //File Services
  async uploadFile(file)
  {
    try
    {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    }
    catch(err)
    {
        console.log(`Upload fil error : ${err}`)
    }
  }
  async deleteFile(fileId)
  {
    try
    {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
    return true
    }
    catch(err)
    {
      console.log(`Delete File error : ${err}`)
      return false
    }
  }
  getFilePreview(fileId)
  {
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
    )
  }
}
const AppwriteServices=new StorageService()
export  default AppwriteServices