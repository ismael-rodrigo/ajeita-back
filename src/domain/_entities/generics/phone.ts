import { BadRequestException } from '@nestjs/common';



export class PhoneEntity {
  private readonly phone: string

  private constructor (phone: string) {
    this.phone = phone
    Object.freeze(this)
  }

  static create (phone: string): PhoneEntity {
    if (!PhoneEntity.validate(phone)) {
        throw new BadRequestException()
    }
    return new PhoneEntity(phone)
  }

  get value (): string {
    return this.phone
  }

  static validate (phone: string): boolean {
    var tester = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
    if(!phone) return false
    if(!tester.test(phone)) return false
    return true
  }
}