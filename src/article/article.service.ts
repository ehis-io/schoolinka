import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './repository/article.repository';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}
  logger = new Logger(ArticleService.name);
  async create(createArticleDto: CreateArticleDto) {
    try {
      return await this.articleRepository.createArticle(createArticleDto);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll(take?: number, skip?: number) {
    try {
      if (take == null || undefined) {
        take = 20;
        skip = 0;
      }

      return await this.articleRepository.findAll(take, skip);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.articleRepository.findArticle(id);
      if (data == null) {
        throw new NotFoundException();
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  update(id: String, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
