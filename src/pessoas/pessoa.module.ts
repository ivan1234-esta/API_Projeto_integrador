//classe de modulo do usuário, responsável por administrar todo o modulo de usuário, incluindo controller, DM, e validators, 
//tudo o que o modulo de usuário contem, é adinistrado pela classe de módulo

import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { PessoaArmazenados } from './pessoa.dm';

@Module({  
  controllers: [PessoaController],  
  providers: [PessoaArmazenados],
})
export class PessoaModule {}
