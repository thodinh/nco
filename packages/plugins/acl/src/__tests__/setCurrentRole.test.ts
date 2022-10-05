import Database from '@nocobase/database';
import UsersPlugin from '@nocobase/plugin-users';
import { MockServer } from '@nocobase/test';
import { setCurrentRole } from '../middlewares/setCurrentRole';
import { prepareApp } from './prepare';

describe('role', () => {
  let api: MockServer;
  let db: Database;

  let usersPlugin: UsersPlugin;
  let ctx;

  beforeEach(async () => {
    api = await prepareApp();

    db = api.db;
    usersPlugin = api.getPlugin('@nocobase/plugin-users');

    ctx = {
      db,
      cache: api.cache,
      state: {
        currentRole: '',
        roleNames:['root','admin','member']
      }
    }
  });

  afterEach(async () => {
    await api.destroy();
  });

  it('should set role with X-Role when exists', async () => {
    const currentUser = await db.getRepository('users').findOne({
      appends: ['roles'],
    });
    ctx.state.currentUserId = currentUser.get('id')
    ctx.get = function(name) {
      if (name === 'X-Role') {
        return 'admin';
      }
    };
    await setCurrentRole(ctx, () => {});
    expect(ctx.state.currentRole).toBe('admin');
  });

  it('should set role with default', async () => {
    const currentUser = await db.getRepository('users').findOne({
      appends: ['roles'],
    });
    ctx.state.currentUserId = currentUser.get('id')
    ctx.get = function (name) {
      if (name === 'X-Role') {
        return '';
      }
    };
    await setCurrentRole(ctx, () => {});
    expect(ctx.state.currentRole).toBe('root');
  });

  it('should set role with default when x-role does not exist', async () => {
    const currentUser = await db.getRepository('users').findOne({
      appends: ['roles'],
    });
    ctx.state.currentUserId = currentUser.get('id')
    ctx.get = function (name) {
      if (name === 'X-Role') {
        return 'abc';
      }
    };
    await setCurrentRole(ctx, () => {});
    expect(ctx.state.currentRole).toBe('root');
  });

  it('should set role with anonymous', async () => {
    const currentUser = await db.getRepository('users').findOne({
      appends: ['roles'],
    });
    ctx.state.currentUserId = currentUser.get('id')
    ctx.get = function (name) {
      if (name === 'X-Role') {
        return 'anonymous';
      }
    };
    await setCurrentRole(ctx, () => {});
    expect(ctx.state.currentRole).toBe('anonymous');
  });
});
