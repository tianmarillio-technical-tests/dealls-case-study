import { PrismaClient } from '@prisma/client';
import users from './data/users.json';

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    const { UserProfile, ...rest } = user;

    await prisma.user.create({
      data: {
        ...rest,
        UserProfile: {
          create: {
            ...UserProfile,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
