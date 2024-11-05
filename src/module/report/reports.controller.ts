import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Roles } from 'src/common/role/decorator/roles.decorator';
import { Role } from 'src/common/role/enums/role.enum';
import { RolesGuard } from 'src/common/role/guard/roles.guard';

@Controller('reports')
@UseGuards(RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('analytics')
  getAnalytics() {
    return this.reportsService.getAnalytics();
  }
}