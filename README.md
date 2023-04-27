# Community on Demand 
<p align="center">
<a href="https://github.com/Hailiax/Junior-Design-Team-2121-COD#how-to-build" ><img src="https://img.shields.io/badge/install-guide-blue" /></a> <a href="https://github.com/Hailiax/Junior-Design-Team-2121-COD#version-100-customer-delivery" ><img src="https://img.shields.io/badge/version%20release-notes-green" /></a>
</p>
Community on Demand is a mobile application designed to help users understand their current skillsets as well as the skills they need to get in order to achieve their career goals. A user would be someone interested in understanding more about their current employability as well as someone who is interested in tracking their career growth overtime. Community on Demand offers resume-building assistance, a card skills assessment, as well as a project and achievement domain dashboard, which together help to organize a user's skills and projects as they relate to their career goals. The deliverables of this application provide players with a unique opportunity to track their employability and career goals overtime.
<p align="center">
<img src=https://user-images.githubusercontent.com/91431295/206930407-9eba3a4d-e198-4ad4-baa3-77393f424ec8.png width="600" height="500"/>
</p>

# Release Notes

## Version 1.0.0 (Customer Delivery)

### Overview of Current State
Currently, all screens are fully implemented and all features seen are implemented in the front and backend. This means that the game, projects, and resume system are fully feature complete. The only major problem remaining is that the card game does not work on Andriod.
### Features
* As a player, I want to be able to automatically generate a resume with my saved projects and skills, so that I can see my experience and skills organized in a professional manner.
* As a player, I want to be able to see a summary of all my skills organized by acheivement domain, so that I can see my skills as they relate to a specific employable domain.
* As a player, I want to see a tutorial when it is the first time I start a game, so that I understand how to begin the card skills assessment.
* As the organizer, I want to be able to redirect players to specific hyperlinks like a calendar of events, so that I can become more connected with the community.
### Bug Fixes
* Fixed all bugs with the projects system in terms of the frontend of adding and deleting projects.
* Fixed all navigation paths so user cannot get into a weird navigation state.
### Known Issues
* The card swiping feature does not work on Andriod.
* Must visit project dashboard before updating a newly created project.

## Version 0.4.0

### Features
* As a player, I want to see my previous game results displayed in a capability report so that I can track my progress in each achievement domain overtime.
* As a player, I want to be able to add projects to my game, so that I can track my progress in each achievement domain with real-life projects.
* As a player, I want to be able to add descriptions to projects within my game, so that I can display my project in a portfolio-manner.
* As a player, I want to be able to see an Event and Calender option on the game dashboard, so that I can see where to navigate to learn more about Community on Demand events.
* As a player, I want to see a capability report with graphs and progress bars, so that I can see my progress in each achievement domain on a visual level.
### Bug Fixes
* Fixed the card swiping delay that we noticed after testing the app on the Test Flight simulator. We used another card swiping approach which minimized the delay between being able to swipe cards.
* Rather than having hardcoded values for history, we added backend capability of saving game data overtime. Thus, we can see the actual progress in each achievement domain overtime, rather than hard-coded test values.
### Known Issues
* The new card swiping approach does not work on the Android Emulator.
* There appears to be possible import issues on the Android side. Specifically, a deprecated import issue regarding the ViewProps import found within node modules under react-native-svg. We can explore this as we fix the android card swiping bug.

## Version 0.3.0

### Features
* As a player, I want to see a "Congrats!" page once I have swiped through all cards so that I know when I have finished my assessment.
* As a player, I want to select which achievement domains that I would like to see my results in once I have swiped through all cards so that I can view my progress in a specific domain.
* As a player, I want to view an Achievement Domains dashboard so that I can see the different domains that I will track my growth in.
* As a player, I want to navigate to a specific Achievement Domain screen from the Achievement Domain dashboard so that I can learn more about my progress in a specific domain and view my project history in a specific domain.
* As a player, I want the app to look visually appealing on any size screen that I use, so that I can use difference devices and still have an enjoyable experience.

### Bug Fixes
* Fixed difference in Android/iOS UI on the login page. The sign-in with google button now looks the same on both Android and iOS.
* A user is properly signed-out when they navigate to the login page from the settings icon. A user must sign-in everytime they open the app, so AsyncStorage no longer remembers that a user is signed-in once you close the app.
* Added responsive sizing and enhanced the UI of scrolling.
### Known Issues
* Drawer Screen component sizing on Android is not the same as the sizing on iOS. We have created an issue to address this in the next sprint. Specifically, when you press the settings icon on the Android application, there is a lot of orange-space that should be white-space. Thus, the height of the drawer component needs to be fixes.
* Need to add all cards to the cards skills assessment, currently there are just a few to test the swiping.
* Console warnings appear when we swipe through the cards, need to address these warnings so that they no longer appear.



## Version 0.2.0
### Features
* Implemented a reusable drawer screen component.
* Display the user's name and user's profile pic, both pulled from their gmail account, on the dashboard.
* Implement the settings component.
* Implement card-swiping functionality.
* Implemented portions of the dashboard, such as history.
### Bug fixes
* We fixed the AsyncStorage issue where the name and profile pic were not being stored upon signing in.
* Fixed Unresolvable Promise Issue by replacing the Web ClientId with the ClientId from the Firebase Console.
### Known Issues
* Android UI differs from the iOS UI, and we want these UI to match.
* Bundle URL missing sometimes when runnning the app.
* There is another Unresolvable Promise Warning that exists, but does not interfere with app functionality.
* We should clear AsyncStorage upon navigation to Login page, so that when the user presses "logout" from the settings page, or when the user exits the app and reopens it, they are actually logged out.


## Version 0.1.0
### Features
* Basic login page that includes Community on Demand text and enhanced UI
* Google sign-in button that authenticates user on press
* Link that routes to dashboard from the login page
* Basic dashboard page that contains sections that we will implement in the next sprint
### Bug fixes
* We did not have bugs during this sprint since we just started implementation. We focused on getting our enviornments set up and incorporating google authentication within the app
### Known Issues
* Dimensions/styles for components on the front-end are currently hard coded


# How to build (Install Guide)

In order to build the project, you will need to follow the following steps:
1. Install NodeJS Version: [LTS 16.17.0](https://nodejs.org/download/release/v16.17.0/)  
2. Verify installed by checking version for nodeJS and npm by running `node -v` in the terminal.
3. git clone this project. If you do not have git, make sure to [install Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) from the Mac App Store for iOS development, or install git [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. cd into project directory by typing `cd Junior-Design-Team-2121-COD` in the terminal. 
5. Then, run `npm install`, which is a command that will install all of the necessary node packages.
6. Then, run `npm run ios`  or `npm run android` in order to run the application on an emulator or USB/wireless connected device.


Setting up your android development environment:
1. Install [Android Studio](https://developer.android.com/studio)
2. Set up an emulator from the device manager tab, such as Pixel 2 API 30
3. When setting up the emulator, install Android Studio SDK with Platform 31
4. When setting up the emulator, install Android NDK version 21.4.7075529
5. When setting up the emulator, install CMake, which can be found under sdk tools in Android Studio
6. run `npm run android` and make sure you are connected to the internet



