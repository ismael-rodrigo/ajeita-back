import { BadRequestException } from '@nestjs/common';
import { cpf } from 'cpf-cnpj-validator'; 


export class CpfEntity {
  private readonly cpf: string
  private constructor (cpf: string) {
    this.cpf = cpf
    Object.freeze(this)
  }

  static create (name: string): CpfEntity  {
    if (!CpfEntity.validate(name)) {
      throw new BadRequestException()
    }
    return new CpfEntity(name)
  }

  get value (): string {
    return this.cpf
  }

  static validate (_cpf: string): boolean {
    if (!_cpf) return false
    if(!cpf.isValid(_cpf)) return false
    return true
  }
}