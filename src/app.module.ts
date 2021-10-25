import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MqttService } from './mqtt/mqtt.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MqttService],
})
export class AppModule {}
