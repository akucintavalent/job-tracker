import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { AuthUser } from '../auth/user.decorator';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto, @AuthUser() user: AuthUserDto) {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get('/:id')
  getCompany(@Param('id', ParseUUIDPipe) companyId: string, @AuthUser() user: AuthUserDto) {
    return this.companiesService.findOne(companyId, user);
  }

  @Put('/:id')
  updateCompany(
    @Param('id', ParseUUIDPipe) companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @AuthUser() user: AuthUserDto,
  ) {
    return this.companiesService.update(companyId, updateCompanyDto, user);
  }

  @Delete('/:id')
  deleteCompany(@Param('id', ParseUUIDPipe) companyId, @AuthUser() user: AuthUserDto) {
    return this.companiesService.remove(companyId, user);
  }
}
