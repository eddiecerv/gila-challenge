import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LogsService } from './logs.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLogDto } from './dto/create-log.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('logs')
@Controller('logs')
@UseGuards(JwtAuthGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new log for the message to sent of notification',
  })
  async create(@Body() data: CreateLogDto) {
    return this.logsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all logs' })
  async findAll() {
    return this.logsService.findAll();
  }
}
