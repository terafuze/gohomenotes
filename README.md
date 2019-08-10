# Go Home Notes

## Development

### Initial Setup

Here's a summary of the main things that are required in order to build and run the code locally...

- Install Node.js
- Install Java JDK 1.8
- Get a copy of the source code from Bitbucket. More specifically, clone the BitBucket git repository where we keep the code. We will need to give you access to the repository before we give you access as well.
- Configure the database

#### Mac OSX operating system (i.e. Mackbook Pro or Mac Air) specific Initial Setup

1. Install [Node.js](https://nodejs.org/en/). Install the reccomended version (10.16.0), _not_ the most current version.
2. Install [Homebrew](https://brew.sh/). Just execute the command shown on the Homebrew web page from a command line, i.e. terminal window.
3. Install Yarn using [Homebrew](https://brew.sh/).
   - Execute the following command `brew install yarn`. This will also install Node.js if it is not already installed as well as install yarn.
4. Install Java JDK 1.8 (i.e. Java 8).
   - Either install from the [Oracle website](https://www.oracle.com/technetwork/java/javase/downloads)
   - Or Use [SDK Man](https://sdkman.io/install) to install the Java JDK 1.8 (i.e. Java 8) Be sure to open a new terminal window after installing the JDK.
   - You can check if the correct verison is installed by executing `java -version` in a command line. The version should be 1.8 something.

Configuring the Database

1. Download the [Postgres app](https://postgresapp.com/downloads.html) and make sure to move it to your applications folder.
2. Open the Postgres application, there should be a server already created. If not, click on the 'plus' icon to create a new server.
   - Make sure it is on the port 5444. This can be viewed and edited under 'Server Settings'.
3. Download [PGAdmin4](https://www.pgadmin.org/) and open it.
4. Create a new server. Give it a name (anything you want) under the general tab.
   - Under the connection tag, enter 'localhost' in the host name section
   - Change the port from 5432 to 5444
   - Make sure the username is 'postgres' and input 'password' as the password.
5. Create a new database within the server you just created by right clicking on the server name and clicking create -> database.
   - Make sure to name your database 'lendwithconfidence'
6. Execute `./mvnw liquibase:update` in a terminal. This should connect your database.
7. To make sure you are connected, try logging in:
   - Shut down the server by quitting PGAdmin4 and selecting 'stop' in Postgres.
   - Restart your servers.
   - See below for application start instructions. Use 'admin' 'admin' as the username and password logins.

The following are optional initial setup steps specific to Mac OSX systems. You will likely want to perform most of these at some point, but you don't necessarily need them to get started...

1. Install [iterm2](https://www.iterm2.com/) if you don't already have it (a better command line terminal program).

#### Windows Operating System specific initial setup

1. Download and install [Node.js][]
2. Install the Java JDK 1.8 (i.e. Java 8).
   1. If you know that you already have JDK 1.8 already installed, then you are good and don't need to install it again. You can check if it is installed and configured correctly on your machine by the following commnad in a command line window: `java -version`
   2. Use [SDK Man](https://sdkman.io/install) to install the Java JDK 1.8 (i.e. Java 8) Be sure to open a new terminal window after installing the JDK.

The following are optional initial setup steps specific to Windows systems. You will likely want to perform most of these at some point, but you don't necessarily need them to get started...

1. Download and install [nodepad++][]

#### Common Initial Setup Steps

1. Clone the BitBucket Repo
   - Execute the command line argument found at the top of the BitBucket repo in a terminal. The argument should follow the form `git clone https://...@bitbucket.org/...`.
2. Run `npm install` to install Angular development tools. Execute this command from the top-level directory of the software baseline.

e.g.

```
cd dev/gohomenotes3
npm install
```

npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

The following are optional initial setup steps that are not operating system specific. You will likely want to perform most of these at some point, but you don't necessarily need them to get started...

1. Download and install [Visual Studio Code](https://code.visualstudio.com/docs/setup/mac)
   - Install the **Markdown All In One** Visual Studio Code Extension.
2. Download and install Spring Tools Suite (STS).
3. Download and install [SourceTree](https://www.sourcetreeapp.com/)

#### Install Postgres Database

Install Postgres database and also PG Admin (PG Admin is a GUI to manage Posgres). These should be pretty easy installations. Just download and install them.

https://www.postgresql.org/

https://www.pgadmin.org/

**Note:** for the mac operating system, the download from the Postgres link above is commonly corrupt. It is better to download using [the Postgres app](https://www.postgresql.org/download/macosx/)

## Running the code locally on your computer

Run the following command in a terminal command line to start the Spring Boot Java web application.

#### Start the Spring Boot web application using Maven

`$ ./mvnw spring-boot:run` from a command line on Linux/Mac OS, `$ mvnw.cmd spring-boot:run` on Windows.

This command is the **Maven Wrapper** command. It is a command line script, which is a file in the current directory. [Maven](https://maven.apache.org/) is a Java based build tool. The Maven Wrapper is a utility that manages the version of the Maven build tool so that the same version of Maven will be used across different machines where when different people build the software. Maven uses a file named `pom.xml` that is located in the same directory to know how to build the project. All you really need to remember though is the command shown above and you will eventually want to undersatnd Maven and the `pom.xml` file, but for now, it will just work.

On Linux or Mac OS terminal command lines, the `./<filename>` tells the operating system to execute the specified filename as a command where the `./` tells the operating system that this file is in the current directory. The dot means _the current directory_ and the slash just means the path from the current directory. It is just a Linux nuance.

A bunch of log messages will scroll by. The Spring Boot web application is running when the following is displayed in the terminal window. The web application is now runing as a "server" and is waiting for JSON API requests from the user interface over HTTP.

```
----------------------------------------------------------
	Application 'go-home-notes' is running! Access URLs:
	Local: 		http://localhost:8080
	External: 	http://192.168.0.4:8080
	Profile(s): 	[dev, swagger]
----------------------------------------------------------
```

Execute the following commnand in a separate terminal command line window to start the Angular web application, which provides the user interface.

    npm start

A browser window will automatically be opened in your browser and the main web page for the user interface will be displayed in the browser window. Notice that the web address in the browser window is `localhost:9000`. This will mean more to you later as you work with the code more.

The `npm run` command will list all of the scripts available to run for this project.

### Technologies and Frameworks

You should or will need to know at least what each of the following are for and how they are used in the web application. You do not need to know hardly any of these comprehensively. Learn them as you go and hit the books and videos on related topics as needed as you try to work with the code. Collaborate and ask others for help first. Must faster to learn from others than watching videos and books for the most part.

- Angular
- Bootstrap 4
- CSS and SASS (SASS is an extension of CSS)
- Javascript (don't need to know it that much)
- Typescript, a programming language that extends javascript and gets converted to javascript as part of the build process.
- Java
- Spring Boot
- Spring Framework
- Spring Data
- Map Struct (java object mapping framework)

**Tools:**

- Yarn (javascript/angular build tool)
- git (version control tool)
- Visual Studio Code
- Spring Tool Suite
- SourceTree
- Beyond Compare
- BitBucket

### Core Recommended reading and videos

1. Ready and and re-read the [Fundamentals](https://angular.io/guide/architecture) section on the [Angular website](https://angular.io)
2. Angular Development with Typescript, 2nd Ed on Safari Online Books
3. Pro Angular 6 on Safari Online Books
4. Angular - The Complete Guide by Maximilian Schwarzmuller on Udemy.com
   1. You don't have to watch all of it to start with. Just enough to feel like you are getting the concepts. I think that Maximilian is a great instructor/presenter. I'd watch any course by him (and I have watched most of his videos).
5. Angular: First Look by John Papa video training on pluralsight.com
6. Angular: Getting Started by Deborah Kurata on pluralsight.com
   1. This one is optional. Good info, but might put you to sleep. Not necessary to watch until you have worked with Angulr for a while.

### Other Recommended reading and videos

- HTML 5 courses on pluralsight.com
  - not sure which one to recommend. I haven't watched much of them since I've picked up HTML other ways over time. Just so you know HTML though.
- All courses by Maximillian Schwarzmuller on Udemy.com (Undrstanding Typescript, CSS - The Complete Guide, Accelerated JavaScript Trainng)
- Visual Studio Code video training on pluralsight.com by John Papa
- Master Hibernate and JPA with Spring Boot in 100 Steps by Ranga Karanam (video on Safari Online Books)

### Logging Configuration

Logging configuration for dev is configured in `src/main/resources/application-dev.yaml`.

### Database Configuration

The code is configured to use Liquibase for managing database changes. There is a Maven Liquibase plug-in that can use the JPA annotations in the application as the source for
the database definition rather than a database when you are using Postgres, but doesn't work if you are using H2 DB for development.

To start the application and drop the database onstartup (so that all previous data and table definitions will be removed), use the following command:

    ./mvnw -Dspring.liquibase.drop-first=true

(replace `./mnnw` with `mvnw.cmd` on windows)

To generate a new Liquibase change log after making changes to the JPA mappings in the Spring Boot entity classes (i.e. domain objects), run the following Maven command:

```
./mvnw liquibase:diff
```

If you have any Date (LocalDate, etc.) fields in the Java entity classes, check the generated liquibase script for `BYTEA` and chance them to `date`. This appears to be a bug.

e.g.

```
            <column name="consent_start_date" type="BYTEA">
                <constraints nullable="false"/>
            </column>
```

Manual change to...

```
            <column name="consent_start_date" type="BYTEA">
                <constraints nullable="false"/>
            </column>
```

To apply any new Liquibase change sets to an existin database, run the following Maven command:

```
./mvnw liquibase:update
```

#### Liquibase Troubleshooting

##### Waiting for changlog lock Message

If you get the following messages repeatedly when running the `liquibase:update` command...

```
liquibase: Waiting for changelog lock...
liquibase: Waiting for changelog lock...
liquibase: Waiting for changelog lock...
```

Then run the following Maven command: `./mvnw liquibase:releaseLocks`

See the [Maven Liuibase Plugin documentation](https://www.liquibase.org/documentation/maven/index.html) for more about Liquibase Maven commands.

See the [Liquibase Bundled Changes](https://www.liquibase.org/documentation/changes/index.html) for details of the content of Liquibase Change Log files.

See the [Liquibase Website](www.liquibase.org) for general information about Liqubase.

## Building for production

```
./mvnw -Pprod clean verify
```

This will concatenate and minify the client CSS and Javascript files. It will also modify `index.html` so that `index.html` references these newly gnerated minified client CSS and Javascript files.

To ensure everything worked, run:

    java -jar target/go-home-notes-0.0.1-SNAPSHOT.jar

(Or whatever the current version of the webapp rather than `0.0.1-SNAPSHOT` per the pom.xml file)

And then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

## Deploying to AWS using BoxFuse

The following assumes that the **Build for Production** steps covered earlier in this document has been performed.

To confirm that the boxfuse maven plugin is working, execute: `./mvnw boxfuse:ls` _from the top-level directory of your project._

To create a boxfuse image from the current project build, (i.e. the jar file in the `/target` directory)...

```
./mvnw boxfuse:fuse
```

To run the boxfuse image on VirtualBox on your laptop...

```
./mvnw boxfuse:run -Dboxfuse.env=dev
```

To stop a deployed image on the local VirtualBox/your laptop...

```
$ ./mvnw boxfuse:kill -Dboxfuse.image=nward1234/go-home-notes:0.0.0.1562522814356 -Dboxfuse.env=dev
```

Where the `boxfuse.image` property is the name of the image that was deployed (use `./mvnw boxfuse:ls` to see the possible images)

To deploy the boxfuse image on AWS account associated with the Boxfuse username and secret specified in the `pom.xml` file...

```
./mvnw boxfuse:run -Dboxfuse.env=prod
```

To remote a deployment image from AWS...

```
./mvnw boxfuse:kill -Dboxfuse.env=prod
```

In order to change the Boxfuse account that boxfuse uses to deploy, create a file named **settings.xml** in <user home directory>/.m2 directory, where "<user home directory> is your _home_ directory when you login to your computer, e.g. /Users/nathanward on my laptop. So, `/Users/nathanward/.m2/settings.xml` would be the file location and name. Maven creates the `.m2` directory when you install Maven.

Put the following in the new **settings.xml** file in the `.m2` directory replacing the **username** and **password** values with your Boxfuse username and Boxfuse **secret** (not your actual Boxfuse password) found on the **Boxfuse Downloads** page when you are logged into the Boxfuse Console website.

```
<settings>
    <servers>
        <server>
            <id>boxfuse</id>
            <username>3d166a47cd8d4d54a8e50496981b8d52</username>
            <password>FbmiSrwxWwQkjD6baaDx5BuBcLpDqyyN0MyAcnyqgO2WwWlUPqaxJzE2hRjZLKnp</password>
        </server>
    </servers>
</settings>
```

See also:

- https://maven.apache.org/guides/mini/guide-configuring-maven.html
- https://boxfuse.com/docs/maven/
- [Deployment Notes on Terafuse Confluence](https://terafuze.atlassian.net/wiki/spaces/~nward/pages/178421773/Deploying+Notes?atlOrigin=eyJpIjoiYmEwN2VlNWIwMDk1NGJiYzljMDg5N2Q2OGFkMGE3NTAiLCJwIjoiYyJ9)
- https://www.jhipster.tech/production/
- https://www.jhipster.tech/profiles/
- https://boxfuse.com/docs/payloads/springboot

### BoxFuse Initial Setup

Create an account at [boxfuse.com](boxfuse.com) and sign in. Once in the console, navigate to the 'Get Started' tab and follow the directions, skipping creating a new app.

In the Boxfuse console, make sure in the listed AWS region in the **Overview** section is **us-east-1**.

When downloading the Boxfuse client, navigate to the directory on your hard disk. Move the `boxfuse.cmd` file into your lend-with-confidence directory.

Execute `./boxfuse -v` in the lend-with-confidence directory to ensure everything is working.

Link your AWS account to your Boxfuse account. You must give Boxfuse the necessary privileges (see below). In the 'Get Started' tab, scroll down to 'Connect your AWS account' and click on the link.

- Navigate to IAM in your AWS console and create a new policy. Click on the 'JSON' and paste the JSON provided in the Boxfuse console after clicking on the 'Connect your AWS account' link. This will automatically configure the necessary premissions. Finish creating the policy.
- In IAM in the AWS console, create a new Role. Click on the 'Another AWS account' tab. Copy the Account ID from the Boxfuse console and paste it in the 'Account ID' entry in the AWS console. Check the 'Require external ID' under the Options tab in the AWS console and paste the External ID provided in the Boxfuse console. Do not check the 'Require MFA' tab. Click 'Next: Permissions' and attach the policy just created. Finish creating the role.
- Under the Roles list in the AWS console, click on the role you just created. Make sure the policy you created before is attached. Copy the 'Role ARN' and paste it in the Boxfuse console. Select 'Connect' in the Boxfuse console.

- https://boxfuse.com/docs/commandline/run#envvars

## Connecting to PGAdmin

When setting up the application with Boxfuse, it will configure the RDS database in AWS for you.

To connect this database to PGAdmin, navigat to your PGAdmin console and follow the steps below:

- Execute `./boxfuse info lend-with-confidence -env=prod` in your lend-with confidence directory. The 'prod' in the command refers to the name of the enviornment the application is running in. this can be checked under the lend-with-confidence tab in the Boxfuse console.
- Create a new server in PGAdmin. Give it any name.
- Copy the 'DB Host' from the terminal after the info execution and past it in the 'Host' section under the 'Connection' tab in PGAdmin.
- Copy the 'DB User' from the terminal and paste it in the 'Username' section in PGAdmin.
- Copy the 'DB password' from the terminal and paste it in the 'Password' section in PGAdmin.
- Click save and this should configure the database in PGAdmin.

## Testing

To launch your application's tests, run:

    ./mvnw clean test

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    npm test

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in [src/test/javascript/e2e](src/test/javascript/e2e)
and can be run by starting Spring Boot in one terminal (`./mvnw spring-boot:run`) and running the tests (`yarn run e2e`) in a second one.

For more information, refer to the [Running tests page][].

# FAQs

### How can I test user registration locally considering that it requires sending an e-mail?

Use the [MailDev](https://github.com/djfarrelly/MailDev). MailDev is a simple way to test your project's generated emails during development with an easy to use web interface that runs on your machine built on top of Node.js.

Install maildev using the command: `npm install -g maildev`

Once installed, you can run maildev by just typing the command: `maildev`

e.g.

```
$ maildev
MailDev webapp running at http://0.0.0.0:1080
MailDev SMTP Server running at 0.0.0.0:1025
```

You can then check e-mail by going to `http://localhost:1080` in a browser.

The Spring Boot web application has been configured to send e-mail to the port 1025, which is where maildev is listening and waiting for e-mail to be sent, which maildev will then display on the maildev web page at `http://localhost:1080`. The configuration for this is in the `application-dev.yaml` file in the `src/main/resources` directory.

Here's the relevent settings in the `application-dev.yaml` file...

```
mail:
    host: localhost
    port: 1025
```
