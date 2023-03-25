import { BadRequestException } from '@nestjs/common';


export class EmailEntity {
  private readonly email: string

  private constructor (email: string) {
    this.email = email
    Object.freeze(this)
  }

  static create (email: string):  EmailEntity {
    if (!EmailEntity.validate(email)) {
        throw new BadRequestException()
    }
    return new EmailEntity(email)
  }

  get value (): string {
    return this.email
  }

  static validate (email: string): boolean {
    var tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!email) {
      return false
    }
    if (email.length > 256) {
      return false
    }
    if (!tester.test(email)) {
      return false
    }
    var [account, address] = email.split('@')
    if (account.length > 64) {
      return false
    }
    var domainParts = address.split('.')
    if (domainParts.some(function (part) {
      return part.length > 63
    })) {
      return false
    }
    return true
  }
}