import {Test, TestingModule} from '@nestjs/testing'
import {LoggerModule} from 'nestjs-pino'
import {AppController} from './app.controller'
import {AppService} from './app.service'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = await module.resolve(AppController)
    appService = await module.resolve(AppService)
  })

  describe('root', () => {
    it('should return home json', () => {
      expect(appController.root()).toEqual(appService.home())
    })
  })
})
