# PetCalendar

A calendar application that refreshes you with cute pet images. Go to the site: https://petcalendar.azurewebsites.net/

PROD Build (release build): [![Build Status](https://dev.azure.com/msa-devop-anran/PetCalendar/_apis/build/status/niuniuanran.PetCalendar-PROD?branchName=master)](https://dev.azure.com/msa-devop-anran/PetCalendar/_build/latest?definitionId=3&branchName=master)

QA Build: [![Build Status](https://dev.azure.com/msa-devop-anran/PetCalendar/_apis/build/status/niuniuanran.PetCalendar-QA?branchName=master)](https://dev.azure.com/msa-devop-anran/PetCalendar/_build/latest?definitionId=4&branchName=master)

## NZMSA/2020-Phase-1

This project is finished as the assignment for two sections of NZMSA/2020-Phase-1:

- [DevOps - Azure Pipeline](https://github.com/niuniuanran/2020-Phase-1/tree/master/DevOps%20-%20Azure%20Pipeline).
- [Web-App](https://github.com/NZMSA/2020-Phase-1/tree/master/Web%20App)

Detailed responses are as follows:

### DevOps - Azure Pipeline

In response to the DevOps - Azure Pipeline requirements:

- [x] Azure build pipeline: Enable a continuous deployment to create releases on new commits to develop and master branches.
  - I created a QA Pipeline, [niuniuanran.PetCalendar-QA](https://dev.azure.com/msa-devop-anran/PetCalendar/_build?definitionId=4), which automatically runs upon new commits to BOTH develop and master branches.
  - The pipeline is defined at [azure-pipelines-QA.yml](https://github.com/niuniuanran/PetCalendar/blob/master/azure-pipelines-QA.yml).
- [x] Azure release pipeline - Enable a continuous deployment to deploy your release to Azure for new commits to master branch.
  - I created a production Pipeline, [niuniuanran.PetCalendar-PROD](https://dev.azure.com/msa-devop-anran/PetCalendar/_build?definitionId=3), which automatically runs upon new commits to master branch only.
  - The pipeline is defined at [azure-pipelines-PROD.yml](https://github.com/niuniuanran/PetCalendar/blob/master/azure-pipelines-PROD.yml).
- [x] A deployed website on Azure
  - The link to the deployed website is https://petcalendar.azurewebsites.net/
- [x] A short description of your build and release pipelines in your project README:
  - QA Pipeline and PROD Pipeline follow the same steps: Install Node.js -> npm install and build -> archieve files -> publish build artifacts. Therefore, I used a template, [azure-template.yml](https://github.com/niuniuanran/PetCalendar/blob/master/azure-template.yml) to reuse code.
  - Unsplash requires a secret ACCESS KEY for authorization. I created a Variable Group, [Unsplash](https://dev.azure.com/msa-devop-anran/PetCalendar/_library?itemType=VariableGroups&view=VariableGroupView&variableGroupId=1&path=Unsplash) to make the secret available to the application.

### Web-App

In response to the Web-App requirements:

- [x] Create a new typescript and react web app
- [x] Connect this application to a different 3rd party REST API
  - This application is connected to [Unsplash Image API](https://unsplash.com/developers) to fetch HD pet images for the user.
- [x] Allow users to input information that will be utilised by the API
  - User will be able to choose from six pets, which the API uses to search for pet images.
- [x] Make use of a UI library like Material-UI.
  - A range of Material-UI components are used to improve the visual expression and responsiveness of the Application.
- [x] Utilise source control through GitHub.

## Screen Shot

<img src="./docs/demo.gif" alt="pet-calendar-demo" width="800px">

## Run the APP

You could access the application through https://petcalendar.azurewebsites.net/, or alternatively you can build up the application on your machine following these three steps:

### Step 1: Unsplash API credential

To run the app on your local machine, you will first need to have an Unsplash API credential.
Go to the [Unsplash Image API](https://unsplash.com/developers) page and create a new Application.
Save the `Access Key` and the `Application Name`:

<img src="./docs/unsplash.png" alt="unsplash api" width="700px">

### Step 2: Create .env.development file

Create `pet-calendar/.env.development` file. Follow the format of (`pet-calendar/.env.development`)[https://github.com/niuniuanran/PetCalendar/blob/develop/pet-calendar/env.example] and paste the strings from Step 1 into it.

### Step 3: Run the Application

Run the following steps to start the application:

```
$ cd pet-calendar
$ npm install
$ npm run start
```

Now enjoy your pet calendar at http://localhost:3000/.
