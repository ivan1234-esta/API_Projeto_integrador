//classe controller do módulo de usuário
//Classe controller é responsável por receber as requisições de fora da API, ele adminstra as requisições recebendo e respondendo elas.

import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { criaPessoaDTO } from "./dto/pessoa.dto";
import { PessoaEntity } from "./pessoa.entity";
import {v4  as uuid} from 'uuid'
import { PessoaArmazenados } from "./pessoa.dm";
import { RetornoPessoaDTO } from "./dto/retornoPessoa.dto";
import { ListaPessoaDTO } from "./dto/listaPessoa.dto";
import { alteraPessoaDTO } from "./dto/alteraPessoa.dto";

//decorator responsável por definir que essa classe é um controller, dentro do parenteses é necessário informar o URL desse controller
@Controller('/pessoas')
export class PessoaController{
    //controller com injeção de dependencia da classe de usuários armazenados
    constructor(private Pessoas : PessoaArmazenados){

    }

    //POST - Recebe dados, pode ou não retornar informações, mas em geral recebe dados e retorna uma resposta
    //GET - Recebe apenas parametros, mas retorna dados variados, normalmente utilizado para consulta de dados
    //PUT - recebe dados, utilizado para fazer alterações de registros
    //DELETE - recebe dados, utilizado para remover registros


    @Post()//essa linha, seria um decorator para definir que a função é um metodo POST
    //Para receber dados do body da requisição, deve utilizar o decorator de "Body", especificando depois a variavel
    async criaPessoa(@Body() dadosPessoa: criaPessoaDTO){       
        //criação do objeto de usuário, aqui é criado um objeto específico desse usuário 
        var novoPessoa = new PessoaEntity(uuid(), dadosPessoa.nome, dadosPessoa.nascimento, 
                                            dadosPessoa.pais
        )
        //gravação do usuário, aqui é inserido no DM o usuário criado anteriormente
        this.Pessoas.AdicionarPessoa(novoPessoa);

        //criação do padrão de retorno, para depois ser retornado como resposta do método, também é retornado os dados do usuário logado
        var retorno = new RetornoPessoaDTO('Pessoa criada',novoPessoa);        
        return retorno        
    }

   

    @Put('/:id')//linha que define o método vai ser de alteração (put), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    async alteraUsuario(@Body() dadosNovos: alteraPessoaDTO,@Param('id') id: string){//aqui é definido que vai receber dados tanto do body quanto da URL(param)
        //aqui é chamada a função de alteração de usuário, onde ja é feita toda a modificação do usuário
        var retornoAlteracao = this.Pessoas.alteraPessoa(id,dadosNovos)
        //criação do padrão de retorno
        var retorno = new RetornoPessoaDTO('Alteração Efetuada',retornoAlteracao);        
        return retorno;       
        
    }

    @Delete('/:id')//linha que define o método vai ser de exclusão (delete), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    async removeUsuario(@Param('id') id: string){//aqui é definido que vai receber dados da URL(param)
        //aqui é chamada a função de exclusão de usuário, onde ja é feita toda a exclusão do usuário
        var retornoExclusao = await this.Pessoas.removePessoa(id)
        //criação do padrão de retorno
        var retorno = new RetornoPessoaDTO('Exclusão Efetuada',retornoExclusao);        
        return retorno;       
        
    }

    @Get('/:ID')//criação de método GET, para retornar usuários filtrados pelo ID, onde é necessário passar o ID do usuário pelo url 
    async retornaUsuarioId(@Param('ID') ID:string){
        //aqui é feita a pesquisa do usuário, depois é criado mapeado os dados desse usuário para um retorno padrão (lista usuario DTO)
        var usuariosListados = this.Pessoas.pesquisaId(ID);
        const ListaRetorno = new ListaPessoaDTO(usuariosListados.id,
                                                usuariosListados.nome,
                                                usuariosListados.nascimento,
                                                usuariosListados.pais,)

        return {
                Usuario: ListaRetorno
            };
    }

    @Get()//aqui é criado um método GET sem nenhum tipo de recepção de dados, onde é retornada uma lista de uusários
    async retornaUsuario(){
        //Aqui são pesquisados os usuários a serem listados, depois é feito um mapeamento de dados para retornar as informações no padrão de resposta esperado (listaUsuarioDTO)
        var usuariosListados = this.Pessoas.Pessoas;
        const ListaRetorno = usuariosListados.map(
            usuario => new ListaPessoaDTO(
                usuario.id,
                usuario.nome,
                usuario.nascimento,
                usuario.pais

            )
        );



        return {
                Usuarios: ListaRetorno
            };
    }

       @Get('/ano/1990')
       async retornaPessoasPorAno(@Param('ano') ano: number) {
           // Filtra a lista de pessoas que nasceram no ano especificado
           var pessoasNoAno = this.Pessoas.Pessoas.filter(pessoa => pessoa.nascimento === 1990);
           
           // Mapeia os dados para o DTO de lista
           const ListaRetorno = pessoasNoAno.map(
               pessoa => new ListaPessoaDTO(
                   pessoa.id,
                   pessoa.nome,
                   pessoa.nascimento,
                   pessoa.pais
               )
           );
   
           return {
               Pessoas: ListaRetorno
           };
       }
}