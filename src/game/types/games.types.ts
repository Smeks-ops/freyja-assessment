import { Group } from '../../group/entities/group.entity';
import { Provider } from '../../provider/entities/provider.entity';

export interface GamePayload {
  name: string;
  cover: string;
  provider: Provider;
  group: Group;
}
