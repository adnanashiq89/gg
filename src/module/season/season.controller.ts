import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { SeasonService } from './season.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('season')
@UseGuards(AuthGuard)
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Post()
  async create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonService.create(createSeasonDto);
  }

  @Get()
  findAll() {
    return this.seasonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seasonService.findOne(id);
  }
  @Get('/aggregate/:id')
  aggregate(@Param('id') id: string) {
    return this.seasonService.aggregation(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeasonDto: UpdateSeasonDto) {
    return this.seasonService.update(id, updateSeasonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seasonService.remove(id);
  }
}
