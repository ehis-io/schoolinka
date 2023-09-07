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

  async findAll() {
    return await this.articleRepository.findAll();
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
