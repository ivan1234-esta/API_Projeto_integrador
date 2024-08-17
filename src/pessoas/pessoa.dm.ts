//data module do modulo de usuário, responsável por guardar os dados de usuários e manipular os dados armazenados
import { Injectable } from "@nestjs/common";
import { PessoaEntity } from "./pessoa.entity";
import { alteraPessoaDTO } from "./dto/alteraPessoa.dto";

//Decorator responsável por informar que essa classe pode ser injetada em outras classes, podendo assim ser administrada pelo modulo
@Injectable()
export class PessoaArmazenados{
    //Criação de vetor para armazenar os usuários (apenas em memoria, quando reiniciar a API perde tudo)
    #pessoas: PessoaEntity[] = [];  
  

    //funçaço responsável por guardar o usuário no vetor
    AdicionarPessoa(pessoa: PessoaEntity){
        this.#pessoas.push(pessoa);
    }

    //função responsável por remover o usuário
    async removePessoa(id:string){
        //pesquisa usuário pelo id passado para retornar ele 
        const pessoa = this.pesquisaId(id);

        //filtra removendo o usário informado
        this.#pessoas = this.#pessoas.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )

        return pessoa
    }
    //função responsável por pesquisar usuário que tenham o ID especificado
    pesquisaId(id:string){
        const possivelPessoa = this.#pessoas.find(
            usuarioSalvo => usuarioSalvo.id === id
        );

        if(!possivelPessoa){
            throw new Error('Usuario não encontrado');//cria um erro quando o usuário não é encontrado
        }

        return possivelPessoa
    }

    //função responsável por alterar o usuário
    alteraPessoa(id:string,dadosNovos: alteraPessoaDTO){
        //pesquisa o usuário que vai ser alterado
        const pessoa = this.pesquisaId(id);

        //aqui os dados que são recebidos no JSon são convertidos para uma tabela de chave e valor, para isolar os dados recebidos
        Object.entries(dadosNovos).forEach(
            ([chave,valor]) => {
                //aqui é validado se o campo a ser alterado vai ser o ID, se for ele ignora, pois não se pode alterar o ID
                if(chave === 'id'){
                    return
                }

                //caso não seja nenhum campo especial, é feito só a alteração direta do valor do campo com base no valor passado 
                pessoa[chave] = valor;
            }
        )

        return pessoa;
        
    }

    //função para retornar todos os usuarios
    get Pessoas(){        
        return this.#pessoas;
    }
}