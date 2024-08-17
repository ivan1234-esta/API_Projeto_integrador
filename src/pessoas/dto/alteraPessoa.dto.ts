//classe responsável por definir padrão para alteração de usuários
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class alteraPessoaDTO{

    //decorators de tipo e validação, são responsáveis por darem padrão e validar informações importantes nos DTOs
    //podem ser prédefinidos ou podem ser criados de forma customizada(exemplo email unico)
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @IsNumber()
    @IsNotEmpty({message: "nascimento não pode ser vazio"})
    nascimento: number;

    @IsString()
    @IsNotEmpty({message: "pais não pode ser vazio"})
    pais: string;
}