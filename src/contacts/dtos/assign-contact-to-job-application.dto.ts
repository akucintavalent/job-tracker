import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AssignContactToJobApplication {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  contactId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  jobApplicationId: string;
}
