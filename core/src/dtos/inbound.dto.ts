
import { Transform, Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsPositive, Length } from "class-validator";

export class CategoryUpdateParam {
    @Length(1, 80)
    name: string;

    @IsOptional()
    @IsNumber()
    @Transform((params) => parseInt(params.value))
    parent?: number;
}

export class UserLoginParam {
    @Length(1,50)
    name: string;
    @Length(1,25)
    password: string;
}

export class ArticleUploadMetadata {
    
    @Type(() => Number)
    @Transform((params) => parseInt(params.value))
    category: number;

    @Type(() => String)
    content: string;
    
    @Length(1, 150)
    title: string;

    @Length(1, 500)
    desc: string;
    
    @Type(() => Boolean)
    pinned: boolean;

    @IsOptional()
    @Type(() => Boolean)
    visible?: boolean

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    time: number;
}


export class ArticleQueryFilter {
    @IsNumber()
    @Transform((params) => parseInt(params.value))
    offset: number;

    @IsOptional()
    @IsNumber()
    @Transform((params) => parseInt(params.value))
    limit?: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, {
        each: true
    })
    @Transform((params) => {
        return (params.value as string).split(',').map(v => parseInt(v))
    })
    cid?: number[];
}