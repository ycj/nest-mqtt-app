import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect('mqtt://localhost:1883', {
      clean: true,
      protocolVersion: 5,
      reconnectPeriod: 5 * 1000,
      clientId: 'nestjs-client',
      username: 'tomas',
    });
  }
}
