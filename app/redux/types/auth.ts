export interface  registerDto {
  name : string ;
  email : string ;
  password : string ;
}

export interface loginDto {
  email : string ;
  password : string 
}



export interface IResponse{
    data : object | null | any;
    message : string ;
    success : boolean;
}