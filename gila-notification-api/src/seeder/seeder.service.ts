import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { NotificationTypesService } from '../notification-types/notification-types.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class SeederService {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
    private readonly notificationTypesService: NotificationTypesService,
  ) {}

  async seed() {
    await this.seedUsers();
    await this.seedCategories();
    await this.seedNotificationTypes();
  }

  async seedUsers() {
    const users: User[] = [
      {
        password: await bcrypt.hash('richard123', 10),
        name: 'Richard Hendrix',
        email: 'richard@siliconvalley.com',
        phone: '+5214444909090',
        subscribed: ['finance', 'movies'],
        channels: ['sms', 'email'],
      },
      {
        password: await bcrypt.hash('dinesh123', 10),
        name: 'Dinesh Chugtai',
        email: 'dinesh@siliconvalley.com',
        phone: '+5214444909091',
        subscribed: ['movies'],
        channels: ['sms', 'push_notification'],
      },
      {
        password: await bcrypt.hash('gylfoyle123', 10),
        name: 'Bertram Gylfoyle',
        email: 'gylfoyle@siliconvalley.com',
        phone: '+5214444909092',
        subscribed: ['finance', 'sports'],
        channels: ['email', 'push_notification'],
      },
    ];

    for await (const user of users) {
      const userExists = await this.usersService.findByEmail(user.email);
      if (userExists) {
        continue;
      }

      await this.usersService.create(user);
    }
  }

  async seedCategories() {
    const categories = [
      { tag: 'sports', name: 'Sports' },
      { tag: 'finance', name: 'Finance' },
      { tag: 'movies', name: 'Movies' },
    ];

    for await (const category of categories) {
      const categoryExists = await this.categoriesService.findByTag(
        category.tag,
      );
      if (categoryExists) {
        continue;
      }

      await this.categoriesService.create(category);
    }
  }

  async seedNotificationTypes() {
    const notificationTypes = [
      { tag: 'sms', name: 'SMS' },
      { tag: 'email', name: 'E-Mail' },
      { tag: 'push_notification', name: 'Push Notification' },
    ];

    for (const notificationType of notificationTypes) {
      const notificationTypeExists =
        await this.notificationTypesService.findByTag(notificationType.tag);
      if (notificationTypeExists) {
        continue;
      }
      await this.notificationTypesService.create(notificationType);
    }
  }
}
