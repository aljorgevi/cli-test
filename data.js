#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms))

async function welcome() {
	const rainbowTitle = chalkAnimation.rainbow('Welcome to Data Loader CLI! \n')

	await sleep()
	rainbowTitle.stop()

	console.log(`
    ${chalk.bgBlue('HOW TO USE')}
    Load data, models, flows, control tables, singletons, policy, run jobs and more.
  `)
}

function winner() {
	console.clear()
	figlet(`Congrats , \nall   loaded !`, (err, data) => {
		console.log(gradient.pastel.multiline(data) + '\n')

		console.log(chalk.green(`Start now by running a job, run: node run.js`))
		process.exit(0)
	})
}

async function loadAllData() {
	const spinner = createSpinner('Loading all data...').start()
	await sleep()
	spinner.success({ text: `All data loaded successfully!` })
	winner()
	// await mainMenu()
}

async function loadData(type) {
	const spinner = createSpinner(`Loading ${type} data...`).start()
	await sleep()

	// TODO: fetch data to services in promise all and then show success message if all data loaded successfully, otherwise show error message
	spinner.success({ text: `${type} data loaded successfully!` })
	// spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` })

	await loadDataMenu()
}

async function mainMenu() {
	const answers = await inquirer.prompt([
		{
			type: 'list',
			name: 'loadOption',
			message: 'What do you want to do?',
			choices: ['init local data', 'data', 'models', 'flow', 'run a job', 'Exit']
		}
	])

	if (answers.loadOption === 'init local data') {
		await loadAllData()
	} else if (answers.loadOption === 'data') {
		await loadDataMenu()
	} else {
		process.exit(0)
	}
}

async function loadDataMenu() {
	const answers = await inquirer.prompt([
		{
			type: 'list',
			name: 'dataType',
			message: 'Select the type of data to load:',
			choices: [
				'Default rates',
				'Bookshape',
				'Models',
				'Flows',
				'Inputs',
				'Control tables',
				'Singletons',
				'Policy',
				'Back to main menu'
			]
		}
	])

	if (answers.dataType === 'Back to main menu') {
		await mainMenu()
	} else {
		await loadData(answers.dataType)
	}
}

// Run it with top-level await
console.clear()
await welcome()
await mainMenu()
