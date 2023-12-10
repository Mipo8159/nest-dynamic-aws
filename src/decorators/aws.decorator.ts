import { Inject } from '@nestjs/common';

export const InjectAwsService = (service) => Inject(service.serviceIdentifier);
