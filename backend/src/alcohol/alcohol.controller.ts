import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AlcoholService } from './alcohol.service';
import { CreateAlcoholDto } from './dto/create-alcohol.dto';
import { FilterAlcoholDto } from './dto/filter-alcohol.dto';
// import { UpdateAlcoholDto } from './dto/update-alcohol.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('alcohol')
export class AlcoholController {
  constructor(private readonly alcoholService: AlcoholService) { }

  @UseInterceptors(FileInterceptor('file', { dest: './uploads/' }))
  @Post()
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAlcoholDto: CreateAlcoholDto
  ) {
    if (file) {
      createAlcoholDto.file = file.path;
    }
    console.log(createAlcoholDto);

    return this.alcoholService.create(createAlcoholDto);
  }

  // @Post('/:id/upload-file')
  // uploadPhoto(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
  // console.log(file);
  // }

  @Get()
  findAll() {
    return this.alcoholService.findAll();
  }

  @Get('filter')
  findAlcoholByFilter(@Query() filterAlcoholDto: FilterAlcoholDto) {
    return this.alcoholService.findAlcoholByFilter(filterAlcoholDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alcoholService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAlcoholDto: UpdateAlcoholDto) {
  //   return this.alcoholService.update(+id, updateAlcoholDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alcoholService.remove(+id);
  }
}
