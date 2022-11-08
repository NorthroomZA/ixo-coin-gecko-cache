import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CacheModule.register({ ttl: 20000, max: 1000 })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
