import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { ArticleMetadataEntity } from "./article.entity";

@Entity({
    name: "category"
})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 80
    })
    name: string
    
    @ManyToOne(() => CategoryEntity, (v) => v.children, {
        onDelete: "SET NULL"
    })
    parent: CategoryEntity

    @OneToMany(() => CategoryEntity, (v) => v.parent)
    children: CategoryEntity[]

    @OneToMany(() => ArticleMetadataEntity, (articles) => articles.category)
    articles: ArticleMetadataEntity[]
}