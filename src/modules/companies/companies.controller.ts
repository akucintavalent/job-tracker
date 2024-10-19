import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { AuthUser } from '../auth/user.decorator';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';
import { CompanyDto } from './dtos/company.dto';
import { CompanyMapper } from './companies.mapper';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly mapper: CompanyMapper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create company' })
  @ApiResponse({
    status: 201,
    description: 'Company created',
    type: CompanyDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 404,
    description: 'JobApplication not found',
  })
  async createCompany(@Body() createCompanyDto: CreateCompanyDto, @AuthUser() user: AuthUserDto) {
    const company = await this.companiesService.create(createCompanyDto, user);
    return this.mapper.toDto(company);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch company.' })
  @ApiResponse({
    status: 200,
    description: 'Company record',
    type: CompanyDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 404,
    description: 'Company not found',
  })
  async getCompany(@Param('id', ParseUUIDPipe) companyId: string, @AuthUser() user: AuthUserDto) {
    const company = await this.companiesService.findOne(companyId, user);
    return this.mapper.toDto(company);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Updates company' })
  @ApiResponse({
    status: 201,
    description: 'Company updated',
    type: CompanyDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 404,
    description: 'Company or JobApplication not found',
  })
  async updateCompany(
    @Param('id', ParseUUIDPipe) companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const company = await this.companiesService.update(companyId, updateCompanyDto, user);
    return this.mapper.toDto(company);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete company' })
  @ApiResponse({
    status: 201,
    description: 'Company deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 404,
    description: 'Company or JobApplication not found',
  })
  deleteCompany(@Param('id', ParseUUIDPipe) companyId, @AuthUser() user: AuthUserDto) {
    return this.companiesService.remove(companyId, user);
  }
}
