import { DataTypes, Model, Sequelize } from "sequelize";
import { db } from "../config";

type Saving = {
    id: string;
    amount: number;
  };

export type IACCOUNT = {
    id:string,
    firstName:string,
    lastName:string,
    accountNumber:string,
    savingsWallet:Saving,
    email:string,
    password:string,
    otp:string,
    token:string,
    accountBalance:number,
    verify: boolean,
    phoneNumber: string, 
    address: string, 
    country: string
}

class Account extends Model<IACCOUNT>{
     email: any
     id: any
     otp: any
}

Account.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    accountNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    savingsWallet:{
        type:DataTypes.JSON,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
   otp:{
        type:DataTypes.STRING,
        allowNull:true
   },
   token:{
        type:DataTypes.STRING,
        allowNull:true
        },
    accountBalance:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    verify:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    address:{
        type:DataTypes.STRING,
        allowNull:true
    },
    country:{
        type:DataTypes.STRING,
        allowNull:true
    },
    
}, {
    sequelize:db,
    tableName:"Account",
    modelName:"Account"
})

export default Account

