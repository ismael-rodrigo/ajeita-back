import { Exclude, Expose } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class RegisterUserInputDto {
    
    @IsEmail()
    @IsString()
    public email: string

    @IsNotEmpty()
    @IsString()
    public name: string

    @IsNotEmpty()
    @IsString()
    public password: string

    @IsNotEmpty()
    @IsString()
    public phone: string;

    @IsNotEmpty()
    @IsString()
    public cpf: string;


}

export class RegisterUserOutputDto {
    
    @Expose()
    public email: string
    @Expose()
    public name: string
    @Expose()
    public phone: string;
    @Expose()
    public cpf: string;

    @Exclude()
    public password: string

    @Exclude()
    public id: string

}