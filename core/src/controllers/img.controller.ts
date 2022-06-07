import { Public } from "@/common/decorator/auth.decorator";
import { OSSClientService } from "@3rd/oss/oss.service";
import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";

@Controller({
    version: '1',
    path: 'admin/img'
})
export default class ImageController {
    constructor (
        private oss: OSSClientService
    ){ }

    @Get()
    public async getImageList( 
        @Query("kw") keyword: string,
        @Query("offset") offset: string 
    ) {
        return this.oss.listObjects(keyword ?? '', offset ?? '')
    }
        
    @Post()
    public async requestUpload(
        @Body() nameLists: string[]
    ) {
        return this.oss.generatePostObjectCredentials(nameLists.map(v => ({
            name: v,
            path: ''
        })))
    }
}