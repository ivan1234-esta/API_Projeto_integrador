//DTO responsável por receber dados de criação de um novo usuário
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados

import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class criaPessoaDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    nome: string;

    @IsNumber()
    @IsNotEmpty({message: "nascimento não pode ser vazio"})

    nascimento: number;

    @IsString()
    @IsNotEmpty({message: "pais não pode ser vazio"})
    pais: string;

}