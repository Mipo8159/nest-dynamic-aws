import {
  DynamicModule,
  FactoryProvider,
  Global,
  Module,
  ModuleMetadata,
} from '@nestjs/common';
import { ConfigurationOptions } from 'aws-sdk';

type AWSModuleOptions = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
};

type AWSAsyncModuleOptions = {
  useFactory: (...args: any[]) => Promise<AWSModuleOptions> | AWSModuleOptions;
  inject: any[];
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;

@Global()
@Module({})
export class AwsModule {
  static forRootAsync(options: AWSAsyncModuleOptions): DynamicModule {
    const providers = [this.createProviders(options)];
    return {
      module: AwsModule,
      providers,
      exports: providers,
    };
  }

  private static createProviders(
    options: AWSAsyncModuleOptions,
  ): FactoryProvider {
    return {
      provide: 'AWS_TOKEN',
      useFactory: options.useFactory,
      inject: options.inject,
    };
  }

  static forFeature(...services: unknown[]) {
    const providers = services.map(this.createServiceProvider);
    return {
      module: AwsModule,
      providers,
      exports: providers,
    };
  }

  private static createServiceProvider(service: any) {
    return {
      provide: service.serviceIdentifier,
      useFactory: (options: ConfigurationOptions) => new service(options),
      inject: ['AWS_TOKEN'], // injects credentials (Provider)
    };
  }
}
