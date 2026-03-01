import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import mailin from './mailin';

const LOG_CONTEXT = 'InboundMailServerModule';

@Module({
  imports: [SharedModule],
})
export class InboundMailServerModule implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    const port = process.env.INBOUND_MAIL_PORT || 25;
    const host = process.env.INBOUND_MAIL_HOST || '127.0.0.1';

    try {
      await mailin.start(
        {
          port,
          host,
          disableDkim: process.env.disableDkim,
          disableSpf: process.env.disableSpf,
          disableSpamScore: process.env.disableSpamScore,
          verbose: process.env.verbose,
          debug: process.env.debug,
          profile: process.env.profile,
          disableDNSValidation: !process.env.enableDnsValidation,
          smtpOptions: process.env.smtpOptions,
        },
        (err) => {
          if (err) {
            Logger.error('Failed to start inbound mail SMTP server', err, LOG_CONTEXT);

            return;
          }

          Logger.log(`Inbound mail SMTP server started on ${host}:${port}`, LOG_CONTEXT);
        }
      );
    } catch (e) {
      Logger.warn(`Inbound mail SMTP server failed to start: ${e.message}`, LOG_CONTEXT);
    }
  }

  async onModuleDestroy() {
    Logger.log('Stopping inbound mail SMTP server', LOG_CONTEXT);
  }
}
