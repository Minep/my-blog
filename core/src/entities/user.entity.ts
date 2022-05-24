import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArticleMetadataEntity } from "./article.entity";

@Entity({
    name: "user"
})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 25
    })
    name: string

    @Column()
    password: string

    @OneToMany(() => ArticleMetadataEntity, (articles) => articles.author)
    articles: ArticleMetadataEntity[]
}