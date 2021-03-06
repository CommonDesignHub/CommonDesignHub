'use strict'

const db = require('../server/db')
const {User, Category, Comment, Item, Project, Vote} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  var randString = (starter_string)=>{
    return starter_string + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  var randColor = ()=>{
    const d = 185
    const a = Math.ceil(Math.random() * 80 + d)
    const b = Math.ceil(Math.random() * 80 + d)
    const c = Math.ceil(Math.random() * 80 + d)
    const color = `rgb(${a},${b},${c})`
    return color
  }

  const users = await Promise.all([
    User.create({email: 'will@pix.com', username:'wmccrac', password: '1234'}),
    User.create({email: 'cody@email.com', username:'thrashcody', password: '123'}),
    User.create({email: 'murphy@email.com', username:'dmurph', password: '123'}),
    User.create({email: 'asdas@email.com', username:'asdasaa', password: '123'}),
    User.create({email: 'ertert@email.com', username:'ertyman', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const home_appliance_category = await Category.create({title: "Home Appliance"})
  const electronics_category = await Category.create({title: "Electronics"})
  const furniture_category = await Category.create({title: "Furniture"})
  const tool_category = await Category.create({title: "Tools"})
  console.log('seeded categories')
  
  var item1a =  await Item.create({title: "Toaster"})
  var item2a =  await Item.create({title: "Coffee Machine"})
  var item3a =  await Item.create({title: "Dishwasher"})

  var item1b =  await Item.create({title: "Laptop"})
  var item2b =  await Item.create({title: "Microcontroller"})
  var item3b =  await Item.create({title: "Smartphone"})
  var item4b =  await Item.create({title: "Drone"})

  var item1c =  await Item.create({title: "Chair"})
  var item2c =  await Item.create({title: "Couch"})
  var item3c =  await Item.create({title: "Coffee Table"})
  var item4c =  await Item.create({title: "Standing Lamp"})

  var item1d =  await Item.create({title: "Power Screwdriver"})
  var item2d =  await Item.create({title: "CNC Machine"})

  await item1a.addCategory(home_appliance_category)
  await item2a.addCategory(home_appliance_category)
  await item3a.addCategory(home_appliance_category)

  await item1b.addCategory(electronics_category)
  await item2b.addCategory(electronics_category)
  await item3b.addCategory(electronics_category)
  await item4b.addCategory(electronics_category)

  await item1c.addCategory(furniture_category)
  await item2c.addCategory(furniture_category)
  await item3c.addCategory(furniture_category)
  await item4c.addCategory(furniture_category)

  await item1d.addCategory(tool_category)
  await item2d.addCategory(tool_category)

  var items = [item1a, item2a, item3a, item1b, item2b, item3b, item4b, item1c, item2c, item3c, item4c, item1d, item2d]
  console.log('seeded items')

  var projects = []
  for (let item of items){
    var proj1 = await Project.create({title:item.title+randString("project title "), image_url:'/assets/placeholder.png', description: randString("project description "), color:randColor(), version_control_url:randString("https://www.")+".com"})
    var proj2 = await Project.create({title:item.title+randString("project title "), image_url:'/assets/placeholder.png', description: randString("project description "), color:randColor(), version_control_url:randString("https://www.")+".com"})
    var proj3 = await Project.create({title:item.title+randString("project title "), image_url:'/assets/placeholder.png', description: randString("project description "), color:randColor(), version_control_url:randString("https://www.")+".com"})
    await proj1.setItem(item)
    await proj2.setItem(item)
    await proj3.setItem(item)
    await proj1.setUser(users[0])
    await proj2.setUser(users[1])
    await proj3.setUser(users[0])
    projects = projects.concat([proj1, proj2, proj3])
  }

  console.log('seeded projects')
  var comments = []
  for (let project of projects){
    var comm1 = await Comment.create({ project:project, user:users[0], content:randString("random comment by user")})
    var comm2 = await Comment.create({ project:project, user:users[1], content:randString("random comment by user")})
    var comm3 = await Comment.create({ project:project, user:users[0], content:randString("random comment by user")})
    await comm1.setProject(project)
    await comm2.setProject(project)
    await comm3.setProject(project)
    await comm1.setUser(users[0])
    await comm2.setUser(users[1])
    await comm3.setUser(users[0])
    comments = comments.concat([comm1, comm2, comm3])
  }

  console.log('seeded comments')

  for (let project of projects){
    var vote1 = await Vote.create({ dir: 1 })
    var vote2 = await Vote.create({ dir: 1  })
    var vote3 = await Vote.create({ dir: -1  })
    var vote4 = await Vote.create({ dir: 1  })
    await vote1.setProject(project)
    await vote2.setProject(project)
    await vote3.setProject(project)
    await vote4.setProject(project)
    await vote1.setUser(users[0])
    await vote2.setUser(users[1])
    await vote3.setUser(users[2])
    await vote4.setUser(users[3])
  }

  console.log('seeded votes')


  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
