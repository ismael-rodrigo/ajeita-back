import { BadRequestException } from '@nestjs/common';


export class TitleEntity {
  private readonly title: string

  private constructor (title: string) {
    this.title = title
    Object.freeze(this)
  }

  static create (title: string):TitleEntity {
    if(TitleEntity.validate(title)) {
      return new TitleEntity(title)
    }

    throw new BadRequestException()
  }

  get value (): string {
    return this.title
  }

  static validate (title: string): boolean {
    if (
      !title || 
      title.trim().length < 4 || 
      title.trim().length > 100
      ) return false

    return true
  }
}