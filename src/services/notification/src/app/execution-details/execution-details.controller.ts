import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExecutionDetailsResponseDto, ExternalApiAccessible } from 'libs/application-generic';
import type { UserSessionData } from 'libs/shared';
import { ApiCommonResponses, ApiResponse } from '../shared/framework/response.decorator';
import { UserSession } from '../shared/framework/user.decorator';
import { ExecutionDetailsRequestDto } from './dtos/execution-details-request.dto';
import { GetExecutionDetails, GetExecutionDetailsCommand } from './usecases/get-execution-details';

@ApiCommonResponses()
@Controller('/execution-details')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Execution Details')
@ApiExcludeController()
export class ExecutionDetailsController {
  constructor(private getExecutionDetails: GetExecutionDetails) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get execution details',
  })
  @ApiResponse(ExecutionDetailsResponseDto, 200, true)
  @ExternalApiAccessible()
  async getExecutionDetailsForNotification(
    @UserSession() user: UserSessionData,
    @Query() query: ExecutionDetailsRequestDto
  ): Promise<ExecutionDetailsResponseDto[]> {
    return this.getExecutionDetails.execute(
      GetExecutionDetailsCommand.create({
        organizationId: user.organizationId,
        environmentId: user.environmentId,
        userId: user._id,
        notificationId: query.notificationId,
        subscriberId: query.subscriberId,
      })
    );
  }
}
