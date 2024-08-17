//classe de modulo do aplicativo, responsável por administrar todos os modulos da aplicação

import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import {PessoaModule} from './pessoas/pessoa.module'



@Module({
  imports: [UsuarioModule,PessoaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
