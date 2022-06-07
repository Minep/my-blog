import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { UserEntity } from "./user.entity";

@Entity({
    name: "article"
})
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column("mediumtext")
    text: string
}

@Entity({
    orderBy: {
        "date": "DESC"
    },
    name: "article_metadata"
})
export class ArticleMetadataEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
        length: 150
    })
    title: string

    @Column({
        nullable: true
    })
    categoryId: number
    
    @ManyToOne(() => CategoryEntity, (category) => category.articles, {
        onDelete: "SET NULL",
        nullable: true,
        cascade: true
    })
    @JoinColumn({ name: "categoryId" })
    category: CategoryEntity
    
    @Column("text")
    desc: string

    @Column({
        type: "bigint",
        unsigned: true
    })
    date: number

    @Column()
    pinned: boolean

    @Column()
    visible: boolean

    @ManyToOne(() => UserEntity, (author) => author.articles)
    author: UserEntity

    @OneToOne(() => ArticleEntity, {
        onDelete: "CASCADE",
        cascade: true
    })
    @JoinColumn()
    content: ArticleEntity
}