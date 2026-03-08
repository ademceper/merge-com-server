import { Injectable } from '@nestjs/common';
import type { PipeTransform, Type } from '@nestjs/common';
import type { MetricOptions, SpanOptions, Tracer } from '@opentelemetry/api';
import {
  Span,
  MetricService as setMetricService,
  OtelCounter as setOtelCounter,
  OtelHistogram as setOtelHistogram,
  OtelInstanceCounter as setOtelInstanceCounter,
  OtelObservableCounter as setOtelObservableCounter,
  OtelObservableGauge as setOtelObservableGauge,
  OtelObservableUpDownCounter as setOtelObservableUpDownCounter,
  OtelUpDownCounter as setOtelUpDownCounter,
  TraceService as setTraceService,
} from 'nestjs-otel';

type OtelDataOrPipe = string | PipeTransform<any, any> | Type<PipeTransform<any, any>>;

export function OtelSpan(name?: string, options?: SpanOptions) {
  return Span(name, options);
}

function OtelInstanceCounter(options?: MetricOptions) {
  return setOtelInstanceCounter(options);
}

function OtelUpDownCounter(name: string, options?: MetricOptions) {
  return setOtelUpDownCounter(name, options);
}

function OtelHistogram(name: string, options?: MetricOptions) {
  return setOtelHistogram(name, options);
}

function OtelObservableGauge(name: string, options?: MetricOptions) {
  return setOtelObservableGauge(name, options);
}

function OtelObservableCounter(name: string, options?: MetricOptions) {
  return setOtelObservableCounter(name, options);
}

function OtelObservableUpDownCounter(name: string, options?: MetricOptions) {
  return setOtelObservableUpDownCounter(name, options);
}

function OtelCounter(name: string, options?: MetricOptions) {
  return setOtelCounter(name, options);
}

@Injectable()
class TraceService extends setTraceService {
  getTracer() {
    return super.getTracer();
  }

  getSpan() {
    return super.getSpan();
  }

  startSpan(name: string) {
    return super.startSpan(name);
  }
}

@Injectable()
class MetricService extends setMetricService {
  getCounter(name, options) {
    return super.getCounter(name, options);
  }

  getUpDownCounter(name, options) {
    return super.getUpDownCounter(name, options);
  }

  getHistogram(name, options) {
    return super.getHistogram(name, options);
  }

  getObservableCounter(name, options) {
    return super.getObservableCounter(name, options);
  }

  getObservableGauge(name, options) {
    return super.getObservableGauge(name, options);
  }

  getObservableUpDownCounter(name, options) {
    return super.getObservableUpDownCounter(name, options);
  }
}
