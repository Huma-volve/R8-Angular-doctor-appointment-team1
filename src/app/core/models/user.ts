export interface User {
     name:string,
    email:string,
    phone:string,
    password:string
    password_confirmation:string
}

export interface userLoginResponse {
     phone: string;
     password: string;
}

export interface userProfileReponse {
      name: string,
        email: string,
        phone: string,
         extra_data: ExtraData;
         address: string;
         image: string;
}

export interface ExtraData {
  birthdate : BirthData;
}
export interface BirthData {
    Day: number;
    Month: number;
    Year: number; 
}

export interface editProfileRequest {
       name: string,
        email: string,
        phone: string,
         address: string;
         image: string;
         birthDay:number,
         birthMonth:number,
         birthYear:number,
}
export interface updatePasswordResponse {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}