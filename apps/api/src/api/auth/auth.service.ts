import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {HttpService} from '@nestjs/axios'
import {JwtService} from '@nestjs/jwt'
import {map} from 'rxjs'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  sign(payload: any) {
    return this.jwtService.sign(payload)
  }
}
