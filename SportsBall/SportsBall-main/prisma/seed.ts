import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';


const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 50; i++) {
    await prisma.player.create({
      data: {
        name: faker.person.fullName(),
        goalCount: faker.number.int({min: 0, max: 15}),
        birthDate: faker.date.birthdate(),
        
        team: {
          create: {
            country: faker.location.country()
          
          }
        },
      }
    })
  }
  for(let i = 0; i<10;  i++){
   await prisma.player.create({
      data: {
        name: faker.person.fullName(),
        goalCount: faker.number.int({min: 0, max: 15}),
        birthDate: faker.date.birthdate(),
        team:{
          connect: {id: i+1}
        }
      }
    })
  }
 await prisma.team.update({
    where: {id:2},
    data: {
      players: {
      connect:[
      {id: 1},
      {id: 4},
      {id: 5},
      {id: 14},
      ]
    }}
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
