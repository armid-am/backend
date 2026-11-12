import * as migration_20250815_145302_initial from './20250815_145302_initial';
import * as migration_20260408_084344_add_order_to_donors from './20260408_084344_add_order_to_donors';

export const migrations = [
  {
    up: migration_20250815_145302_initial.up,
    down: migration_20250815_145302_initial.down,
    name: '20250815_145302_initial',
  },
  {
    up: migration_20260408_084344_add_order_to_donors.up,
    down: migration_20260408_084344_add_order_to_donors.down,
    name: '20260408_084344_add_order_to_donors'
  },
];
