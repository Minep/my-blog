import { ArticleMetadata } from "@/dtos";
import { ArticleEntity, ArticleMetadataEntity, CategoryEntity } from "@/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, TreeRepository } from "typeorm";

@Injectable()
export default class SeedingService {
    constructor (
        @InjectRepository(CategoryEntity)
        private categoryRepo: Repository<CategoryEntity>,
        @InjectRepository(ArticleMetadataEntity)
        private articleRepo: Repository<ArticleMetadataEntity>,
        @InjectRepository(ArticleEntity)
        private articleContentRepo: Repository<ArticleEntity>
    ) { }

    public async seed() {
        await this.categoryRepo.createQueryBuilder().delete().execute()
        await this.articleRepo.createQueryBuilder().delete().execute()
        const root = this.categoryRepo.create({
            name: "root"
        })
        await this.categoryRepo.save(root)

        const ch1 = this.categoryRepo.create({
            name: "c1",
            parent: root
        })
        await this.categoryRepo.save(ch1)
        
        const ch2 = this.categoryRepo.create({
            name: "c2",
            parent: root
        })
        await this.categoryRepo.save(ch2)
        
        const ch3 = this.categoryRepo.create({
            name: "c3",
            parent: root
        })
        await this.categoryRepo.save(ch3)
        
        const ch11 = this.categoryRepo.create({
            name: "c11",
            parent: ch1
        })
        await this.categoryRepo.save(ch11)
        
        const ch12 = this.categoryRepo.create({
            name: "c12",
            parent: ch1
        })

        await this.categoryRepo.save(ch12)

        const contents: Partial<ArticleEntity>[] = [
            this.articleContentRepo.create({
                text: "This is content"
            }),
            this.articleContentRepo.create({
                text: "This is content2"
            }),
            this.articleContentRepo.create({
                text: "This is content3"
            }),
        ]

        await this.articleContentRepo.save(contents[0])
        await this.articleContentRepo.save(contents[1])
        await this.articleContentRepo.save(contents[2])
        
        const metadata = this.articleRepo.create({
            title: "Test Article",
            desc: "This is test article",
            pinned: true,
            date: 1234567890,
            category: ch12,
            visible: true,
            content: contents[0]
        })

        const metadata2 = this.articleRepo.create({
            title: "Test Article2",
            desc: "This is test article2",
            pinned: true,
            date: 3234567890,
            category: ch11,
            visible: true,
            content: contents[1]
        })

        const metadata3 = this.articleRepo.create({
            title: "Test Article3",
            desc: "This is test article3",
            pinned: false,
            date: 126789,
            category: ch1,
            visible: false,
            content: contents[2]
        })

        await this.articleRepo.save(metadata)

        await this.articleRepo.save(metadata2)

        await this.articleRepo.save(metadata3)
    }
}