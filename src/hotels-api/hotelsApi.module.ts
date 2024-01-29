import { Module } from '@nestjs/common';
import { HotelsModule } from '../hotels/hotels.module';
import { HotelsApiCommonController } from './hotelsApiCommon.controller';
import { HotelsApiAdminController } from './hotelsApiAdmin.controller';

import { HotelsApiService } from './hotelsApi.service';

@Module({
  imports: [HotelsModule],
  controllers: [HotelsApiAdminController, HotelsApiCommonController],
  providers: [HotelsApiService],
})
export class HotelsApiModule {}
