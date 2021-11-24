import { Controller, Get } from '@nestjs/common';
import { MqttService } from './mqtt/mqtt.service';
import { spawn, execSync, spawnSync, exec } from 'child_process';
import { chdir, stderr } from 'process';

import * as shell from 'shelljs'

@Controller()
export class AppController {
  constructor(private readonly appService: MqttService) {}

  @Get()
  index() {
    return {
      version: '1.0.0',
      mqtt: this.appService.client.connected
    }
  }

  @Get('dev')
  dev() {
    chdir('../qingzhi-web')
    return { message: 'dev begin...', topic: 'echo' };
  }

  @Get('build')
  build() {
    chdir('../qingzhi-web')
    console.log(shell.exec('git checkout .').stdout)
    console.log(shell.exec('git pull').stdout)
    console.log(shell.exec('pnpm install').stdout)
    console.log(shell.exec('node version.js').stdout)
    console.log(shell.exec('pnpm build').stdout)
    // console.log(shell.exec('git pull'))

    // const sp = shell.exec('pnpm build', {async: true})
    // sp.stdout.on('data', data=>{
    //   console.log(data)
    //   this.appService.client.publish('echo', data)
    // })

    return '编译打包...'
  }

  @Get('dist')
  dist() {
    return 'dist';
  }
}
