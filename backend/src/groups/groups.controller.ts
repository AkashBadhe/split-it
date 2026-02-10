import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('groups')
@Controller('groups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, description: 'List of groups' })
  findAll() {
    return this.groupsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiBody({ schema: { type: 'object', properties: { name: { type: 'string' }, members: { type: 'array', items: { type: 'string' } } } } })
  @ApiResponse({ status: 201, description: 'Group created' })
  create(@Body() createGroupDto: Partial<any>) {
    return this.groupsService.create(createGroupDto);
  }
}