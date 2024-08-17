//classe de usuário, utilizado para manter padrão dos usuários armazenados
export class PessoaEntity{
    id: string;
    nome: string;
    nascimento: number;
    pais: string;
    
    constructor(id: string,nome: string,nascimento: number,pais: string){
        this.id = id;
        this.nome = nome;
        this.nascimento = nascimento;
        this.pais = pais;
    }
}