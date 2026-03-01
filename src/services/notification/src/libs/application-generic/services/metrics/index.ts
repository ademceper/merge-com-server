import { MetricsService, NewRelicMetricsService } from './metrics.service';

export const metricsServiceList = {
  provide: 'MetricsServices',
  useFactory: (newRelicMetricsService: NewRelicMetricsService) => {
    const allMetricsServices = [newRelicMetricsService];

    const activeMetricsServices = allMetricsServices.filter((service) => service.isActive(process.env as Record<string, string>));

    return activeMetricsServices;
  },
  inject: [NewRelicMetricsService],
};

export { MetricsService };
