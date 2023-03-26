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

@Exclude()
export class UserAuthenticatedResponse {
    @Expose() email: string
    @Expose() name: string
    @Expose() phone: string;
    @Expose() cpf: string;
    @Expose() id: string
    @Exclude() password: string
}

@Exclude()
export class UserPublicResponse {
    @Expose() email: string
    @Expose() name: string
    @Expose() phone: string;
    @Exclude() id: string
    @Exclude() cpf: string;
    @Exclude() password: string
}