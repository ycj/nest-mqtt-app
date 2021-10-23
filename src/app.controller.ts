import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MqttService } from './mqtt/mqtt.service';
import { spawn, execSync, spawnSync, exec } from 'child_process';
import { chdir, stderr } from 'process';

import * as shell from 'shelljs'

@Controller()
export class AppController {
  constructor(private readonly appService: MqttService) {}

  @Get()
  getHello(): string {
    return 'hylink DevOps system';
  }

  @Get('dev')
  dev() {
    chdir('C:\\Users\\John\\Documents\\qingzhi-web')
    const sp = shell.exec('pnpm build', {async: true})
    sp.stdout.on('data', data=>{
      this.appService.client.publish('echo', data)
    })
    return { message: 'dev begin...' };
  }

  @Get('build')
  build() {
    chdir('C:\\Users\\John\\Documents\\qingzhi-web')
    exec('pnpm build', (error, stdout, stderr) => {
      console.log(stdout);
    });

    return { message: 'build begin...' };
  }

  @Get('dist')
  dist() {
    return { message: 'success' };
  }
}
