import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './repository/article.repository';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}
  async create(createArticleDto: CreateArticleDto) {
    return await this.articleRepository.createArticle(createArticleDto);
  }

  async findAll(take?: number, skip?: number) {
    if (take == null || undefined) {
      take = 20;
      skip = 0;
    }
    console.log(take, skip);
    return await this.articleRepository.findAll(take, skip);
  }

  async findOne(id: string) {
    return await this.articleRepository.findArticle(id);
  }

  update(id: String, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
