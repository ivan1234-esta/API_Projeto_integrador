//classe de modulo do aplicativo, responsável por administrar todos os modulos da aplicação

import { Module } from '@nestjs/common';
import { CadastroModule } from './cadastro/cadastro.module';



@Module({
  imports: [CadastroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
