import { Controller, Get } from '@nestjs/common';
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
    chdir('../qingzhi-web')
    const sp = shell.exec('pnpm build', {async: true})
    sp.stdout.on('data', data=>{
      this.appService.client.publish('echo', data)
    })
    return { message: 'dev begin...', topic: 'echo' };
  }

  @Get('build')
  build() {
    return { message: 'build begin...' , topic: 'echo' };
  }

  @Get('dist')
  dist() {
    return { message: 'dist begin...' , topic: 'echo' };
  }
}
