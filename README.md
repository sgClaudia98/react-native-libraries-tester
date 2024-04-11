# React Native Libraries Tester

This project is a React Native application designed to test various React Native libraries with the New React Native Architecture. 

### Evaluating now 

`rtn-smartad`

## Getting Started

To get started with this project, you'll need to ensure you have React Native set up on your development machine. For more information on setting up React Native, refer to the [official React Native documentation](https://reactnative.dev/docs/environment-setup).

### Prerequisites

Before you can run the application, you'll need:

- Node.js (version 20.12.0)
- React Native CLI (version 12.3.6)
- React Native 
- Android Studio and Android SDK
- An Android emulator or physical device

### Installation

1. Clone the repository to your local machine:

`git clone https://github.com/sgclaudia98/react-native-libraries-tester.git`
`cd react-native-libraries-tester`


2. Install the dependencies:

`npm install` or `yarn`


3. Navigate to the Android folder to perform further setup:

`cd android`


### Running the Project

#### Generating Codegen Artifacts

Before running the app, you need to generate codegen artifacts from the schema. This is necessary for the New React Native Architecture. Run the following command from the `android` folder:

`./gradlew generateCodegenArtifactsFromSchema`


#### Building the Project

To build the project without launching the emulator and app, use:

`./gradlew build`


#### Updating Java Dependencies

If you need to update Java dependencies, run:

`./gradlew build --refresh-dependencies`


### Testing with `rtn-smartad`

1. Clone the `rtn-smartad` repository to your local machine in the same folder as `react-native-library-tester`:

`git clone https://github.com/sgclaudia98/rtn-smartad.git`

2. Add it to the tester app

`cd react-native-library-tester`

`npm add ../rtn-smartad` or `yarn add ../rtn-smartad`

3. Run `gradlew` commands explained in the section **Running the project**


## Contributing

We welcome contributions from the community! Whether it's adding new tests, improving documentation, or reporting bugs, please feel free to make a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.