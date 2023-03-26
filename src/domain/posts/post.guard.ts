import { PostRepository } from 'src/domain/_ports/repository/post-repository/post-repository';

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class OwnerPostGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private postRepository:PostRepository
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const postId = request.params.id
    const userId = request.user.id;
    console.log(postId , userId)
    const postRequired = await this.postRepository.findById(postId)
    if(!postRequired || !userId ) return false
    return postRequired.authorId == userId
  }
}