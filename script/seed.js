'use strict'

const db = require('../server/db')
const {User, Category, Comment, Item, Project, Vote} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  var randString = (starter_string)=>{
  	return starter_string + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'asdas@email.com', password: '123'}),
    User.create({email: 'ertert@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const home_appliance_category = await Category.create({title: "Home Appliance"})
  const electronics_category = await Category.create({title: "Electronics"})
  const furniture_category = await Category.create({title: "Furniture"})
  const tool_category = await Category.create({title: "Tools"})
  console.log('seeded categories')

  var test_description = "this is a test description for an initiative"
  
  var item1a =	await Item.create({title: "Toaster", description: "Hey we should all make an open source toaster"})
  var item2a =	await Item.create({title: "Coffee Machine", description: "Hey we should all make an open source coffee machine"})
  var item3a =	await Item.create({title: "Dishwasher", description: "Hey we should all make an open source dishwasher"})

  var item1b =	await Item.create({title: "Laptop", description: "Hey we should all make an open source laptop"})
  var item2b =	await Item.create({title: "Arduino", description: "Hey we should all make an open source arduino"})
  var item3b =	await Item.create({title: "Smartphone", description: "Hey we should all make an open source smartphone"})
  var item4b =	await Item.create({title: "Drone", description: "Hey we should all make an open source drone"})

  var item1c =	await Item.create({title: "Chair", description: "Hey we should all make an open source chair"})
  var item2c =	await Item.create({title: "Couch", description: "Hey we should all make an open source couch"})
  var item3c =	await Item.create({title: "Coffee Table", description: "Hey we should all make an open source coffee table"})
  var item4c =	await Item.create({title: "Standing Lamp", description: "Hey we should all make an open source standing lamp"})

  var item1d =	await Item.create({title: "Power Screwdriver", description: "Hey we should all make an open source power screwdriver"})
  var item2d =	await Item.create({title: "CNC Machine", description: "Hey we should all make an open source CNC Machine"})

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
  	var proj1 = await Project.create({title:item.title+1, description: randString("item_description"), version_control_url:randString("https://www.")+".com"})
  	var proj2 = await Project.create({title:item.title+2, description: randString("item_description"), version_control_url:randString("https://www.")+".com"})
  	var proj3 = await Project.create({title:item.title+3, description: randString("item_description"), version_control_url:randString("https://www.")+".com"})
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
  	await vote3.setUser(users[1])
  	await vote4.setUser(users[1])
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
