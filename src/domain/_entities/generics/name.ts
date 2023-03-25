import { BadRequestException } from '@nestjs/common';


export class NameEntity {
  private readonly name: string

  private constructor (name: string) {
    this.name = name
    Object.freeze(this)
  }

  static create (name: string):NameEntity {
    if(NameEntity.validate(name)) {
      return new NameEntity(name)
    }

    throw new BadRequestException()
  }

  get value (): string {
    return this.name
  }

  static validate (name: string): boolean {
    if (
      !name || 
      name.trim().length < 2 || 
      name.trim().length > 70 || 
      !/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/gm
      ) return false

    return true
  }
}