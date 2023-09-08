import { DataSource, Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async createArticle(article: CreateArticleDto) {
    const payload = this.create(article);
    return await this.save(payload);
  }

  async findAll(take?: number, skip?: number) {
    const articles = await this.createQueryBuilder('article')
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return articles;
  }
  async findArticle(id: string) {
    const article = await this.createQueryBuilder('article')
      .where('article.id =:id', { id: id })
      .getOne();

    if (article) return article;
    return null;
  }
}
