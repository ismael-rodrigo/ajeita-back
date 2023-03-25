import { BadRequestException } from '@nestjs/common';


export class ContentEntity {
  private readonly content: string

  private constructor (content: string) {
    this.content = content
    Object.freeze(this)
  }

  static create (content: string):ContentEntity {
    if(ContentEntity.validate(content)) {
      return new ContentEntity(content)
    }

    throw new BadRequestException()
  }

  get value (): string {
    return this.content
  }

  static validate (content: string): boolean {
    if (
      !content || 
      content.trim().length < 4 || 
      content.trim().length > 200
      ) return false

    return true
  }
}